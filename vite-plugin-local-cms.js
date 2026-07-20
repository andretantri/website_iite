import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default function localCmsPlugin() {
  return {
    name: 'vite-plugin-local-cms',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
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
            res.end(JSON.stringify({ success: true, message: 'Translations written to disk successfully!' }))
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
              message: 'Image uploaded successfully!' 
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
