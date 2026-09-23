import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default function localCmsPlugin() {
  return {
    name: 'vite-plugin-local-cms',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 0. GET /api/status
        if ((req.url === '/api/status' || req.url === '/api/status.php') && req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({
            connected: false,
            storage: 'local_dev',
            message: 'Vite Local Development Mode (JSON File Storage)',
            details: 'Files saved to src/translations-data.json and public/uploads/'
          }))
          return
        }

        // 0.1 POST /api/track-visit
        if ((req.url === '/api/track-visit' || req.url === '/api/track-visit.php') && req.method === 'POST') {
          try {
            const today = new Date().toISOString().slice(0, 10)
            const statsPath = path.resolve(__dirname, 'public/api/visitor-stats.json')
            let stats = {
              todayDate: today,
              todayCount: 0,
              yesterdayCount: 0,
              totalCount: 0,
              todayIps: []
            }
            if (fs.existsSync(statsPath)) {
              try {
                const existing = JSON.parse(fs.readFileSync(statsPath, 'utf8'))
                stats = { ...stats, ...existing }
              } catch (e) {}
            }

            if (stats.todayDate !== today) {
              stats.yesterdayCount = stats.todayCount
              stats.todayCount = 0
              stats.todayDate = today
              stats.todayIps = []
            }

            const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1'
            if (!stats.todayIps.includes(clientIp)) {
              stats.todayIps.push(clientIp)
              stats.todayCount++
              stats.totalCount++
              const dir = path.dirname(statsPath)
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
              fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf8')
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: true, tracked: true, storage: 'local_dev' }))
            return
          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false, error: e.message }))
            return
          }
        }

        // 0.2 GET /api/visitor-stats
        if ((req.url === '/api/visitor-stats' || req.url === '/api/visitor-stats.php') && req.method === 'GET') {
          try {
            const today = new Date().toISOString().slice(0, 10)
            const statsPath = path.resolve(__dirname, 'public/api/visitor-stats.json')
            let todayCount = 0
            let yesterdayCount = 0
            let totalCount = 0

            if (fs.existsSync(statsPath)) {
              try {
                const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'))
                if (stats.todayDate === today) {
                  todayCount = Number(stats.todayCount) || 0
                  yesterdayCount = Number(stats.yesterdayCount) || 0
                } else {
                  todayCount = 0
                  yesterdayCount = Number(stats.todayCount) || 0
                }
                totalCount = Number(stats.totalCount) || todayCount
              } catch (e) {}
            }

            let percentChange = null
            if (yesterdayCount > 0) {
              percentChange = Number((((todayCount - yesterdayCount) / yesterdayCount) * 100).toFixed(1))
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
              today: todayCount,
              yesterday: yesterdayCount,
              percentChange,
              total: totalCount,
              storage: 'local_dev'
            }))
            return
          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false, error: e.message }))
            return
          }
        }

        // 1. POST /api/save-translations
        if (req.url === '/api/save-translations' && req.method === 'POST') {
          try {
            const body = await getBodyData(req)
            const jsonData = JSON.parse(body)
            
            const targetPath1 = path.resolve(__dirname, 'src/translations-data.json')
            const targetPath2 = path.resolve(__dirname, 'public/api/translations-data.json')
            const formattedJson = JSON.stringify(jsonData, null, 2)
            
            fs.writeFileSync(targetPath1, formattedJson, 'utf8')
            fs.writeFileSync(targetPath2, formattedJson, 'utf8')
            
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ 
              success: true, 
              storage: 'local_dev',
              message: 'Translations written to local JSON files successfully!' 
            }))
            return
          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false, error: e.message }))
            return
          }
        }

        // 3. GET /api/get-translations
        if (req.url === '/api/get-translations' && req.method === 'GET') {
          try {
            const targetPath = path.resolve(__dirname, 'src/translations-data.json')
            const content = fs.readFileSync(targetPath, 'utf8')
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(content)
            return
          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false, error: e.message }))
            return
          }
        }
        
        // 2. POST /api/upload-image
        if (req.url === '/api/upload-image' && req.method === 'POST') {
          try {
            const file = await parseMultipartFile(req)
            
            // Create uploads directory if not exists
            const uploadsDir = path.resolve(__dirname, 'public/uploads')
            if (!fs.existsSync(uploadsDir)) {
              fs.mkdirSync(uploadsDir, { recursive: true })
            }
            
            // Use timestamp + original name to avoid duplicates
            const cleanFileName = Date.now() + '_' + file.filename.replace(/[^a-zA-Z0-9.-]/g, '_')
            const targetPath = path.join(uploadsDir, cleanFileName)
            
            fs.writeFileSync(targetPath, file.data)
            
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ 
              success: true, 
              url: `/uploads/${cleanFileName}`, 
              original_name: file.filename,
              file_name: cleanFileName,
              recorded_in_db: false,
              storage: 'local_dev',
              message: 'Image uploaded to local public/uploads directory!' 
            }))
            return
          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false, error: e.message }))
            return
          }
        }
        
        next()
      })
    }
  }
}

function getBodyData(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      resolve(body)
    })
    req.on('error', err => reject(err))
  })
}

function parseMultipartFile(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => {
      const buffer = Buffer.concat(chunks)
      const contentType = req.headers['content-type']
      if (!contentType) {
        return reject(new Error('No Content-Type header provided'))
      }
      const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i)
      if (!boundaryMatch) {
        return reject(new Error('No boundary found in content-type'))
      }
      const boundary = boundaryMatch[1] || boundaryMatch[2]
      
      const boundaryBuffer = Buffer.from('--' + boundary)
      const parts = []
      let start = 0
      while (true) {
        const idx = buffer.indexOf(boundaryBuffer, start)
        if (idx === -1) break
        parts.push(idx)
        start = idx + boundaryBuffer.length
      }
      
      for (let i = 0; i < parts.length - 1; i++) {
        const partStart = parts[i] + boundaryBuffer.length + 2 // skip boundary and \r\n
        const partEnd = parts[i+1] - 2 // strip \r\n before next boundary
        const partBuffer = buffer.subarray(partStart, partEnd)
        
        const headerEndIdx = partBuffer.indexOf(Buffer.from('\r\n\r\n'))
        if (headerEndIdx === -1) continue
        
        const headerStr = partBuffer.subarray(0, headerEndIdx).toString('binary')
        const bodyBuffer = partBuffer.subarray(headerEndIdx + 4)
        
        const filenameMatch = headerStr.match(/filename="([^"]+)"/i)
        
        if (filenameMatch) {
          const filename = filenameMatch[1]
          return resolve({
            filename,
            data: bodyBuffer
          })
        }
      }
      reject(new Error('No file uploaded or file not detected'))
    })
    req.on('error', err => reject(err))
  })
}
