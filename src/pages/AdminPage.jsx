import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Settings,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  LogOut,
  Globe,
  Lock,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Calendar,
  Tag,
  Upload,
  ArrowLeft,
  LayoutGrid,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Users,
  TrendingUp,
  Newspaper
} from 'lucide-react'
import { useLanguage, defaultTranslations } from '../i18n'

// Friendly Indonesian names for sections
const PAGE_CARDS = [
  {
    id: 'nav_footer',
    title: 'Navigasi & Footer',
    desc: 'Ubah teks menu navigasi, tombol kontak, dan hak cipta di bagian bawah website.',
    icon: Settings,
    sections: ['nav', 'footer']
  },
  {
    id: 'home',
    title: 'Halaman Beranda',
    desc: 'Kelola judul banner, hitung mundur, slider banner, deskripsi IITE, program utama, dan kontak.',
    icon: LayoutGrid,
    sections: ['hero', 'about', 'activities', 'timeline', 'contact', 'countdown', 'home']
  },
  {
    id: 'competition',
    title: 'Halaman Kompetisi Inovasi',
    desc: 'Edit kategori kompetisi, biaya pendaftaran, persyaratan, jadwal, dan narahubung.',
    icon: FileText,
    sections: ['competition']
  },
  {
    id: 'proceeding',
    title: 'Halaman Poster Prosiding',
    desc: 'Edit sub-tema poster, biaya, persyaratan masuk, timeline kegiatan, dan kontak admin.',
    icon: FileText,
    sections: ['proceeding']
  },
  {
    id: 'seminar',
    title: 'Halaman Seminar Internasional',
    desc: 'Atur detail pembicara, sub-tema konferensi, biaya, no rekening pembayaran, dan jadwal acara.',
    icon: FileText,
    sections: ['seminar']
  },
  {
    id: 'greenyouth',
    title: 'Halaman Pemuda Hijau',
    desc: 'Edit detail kompetisi Greenpreneur untuk mahasiswa Polinus Surakarta.',
    icon: FileText,
    sections: ['greenyouth']
  },
  {
    id: 'msme',
    title: 'Halaman UMKM Award',
    desc: 'Atur ketentuan penghargaan UMKM, aspek penilaian, timeline, dan link form pendaftaran.',
    icon: FileText,
    sections: ['msme']
  },
  {
    id: 'news',
    title: 'Manajer Berita & Informasi',
    desc: 'Tulis artikel berita baru, edit artikel berita yang sudah ada, atau hapus berita.',
    icon: Tag,
    sections: ['news_meta', 'news_articles']
  }
]

// Map technical section ID to path in translations
const SECTION_PATH_MAP = {
  nav: ['nav'],
  footer: ['footer'],
  hero: ['hero'],
  about: ['about'],
  activities: ['activities'],
  timeline: ['timeline'],
  contact: ['contact'],
  countdown: ['countdown'],
  home: ['home'],
  competition: ['pages', 'competition'],
  proceeding: ['pages', 'proceeding'],
  seminar: ['pages', 'seminar'],
  greenyouth: ['pages', 'greenyouth'],
  msme: ['pages', 'msme'],
  news_meta: ['pages', 'news'],
  news_articles: ['pages', 'news', 'articles']
}

// Convert technical keys to Indonesian
const FIELD_LABELS = {
  // Navigation
  home: 'Menu Beranda',
  about: 'Menu Tentang Kami',
  activities: 'Menu Kegiatan',
  timeline: 'Menu Timeline',
  contact: 'Menu Kontak',
  competition: 'Menu Kompetisi',
  proceeding: 'Menu Poster',
  seminar: 'Menu Prosiding',
  greenyouth: 'Menu Pemuda Hijau',
  msme: 'Menu UMKM',
  news: 'Menu Berita',
  adminLoginBtn: 'Teks Tombol Login Admin',
  languageLabel: 'Teks Label Bahasa',
  posterImage: 'Poster / Pamflet Utama Halaman',
  
  // Hero
  badge: 'Label/Badge Atas',
  description: 'Deskripsi Singkat',
  time: 'Waktu Pelaksanaan',
  location: 'Lokasi Acara',
  organizer: 'Penyelenggara',
  summary: 'Ringkasan Acara',
  cta: 'Teks Tombol Pendaftaran',
  countdown: 'Teks Info Hitung Mundur',
  speakersTag: 'Tag Pembicara',
  speakersTitle: 'Judul Sesi Pembicara',
  clickToEnlarge: 'Teks Petunjuk Perbesar Gambar',
  registrationFeeTag: 'Label Biaya Registrasi',
  registrationFeeTitle: 'Judul Biaya Call Paper',
  paymentTitle: 'Judul Informasi Pembayaran',
  contactPerson: 'Label Narahubung',
  sliderLabel: 'Label Sorotan/Slider',
  sliderHeading: 'Judul Sampul Agenda',
  
  // About
  tag: 'Tag Bagian',
  heading: 'Judul Utama',
  programTitle: 'Judul Fokus Program',
  programText: 'Deskripsi Fokus Program',
  benefitTitle: 'Judul Manfaat Peserta',
  benefitText: 'Deskripsi Manfaat Peserta',

  // News
  latestNews: 'Judul Berita Terbaru',
  readMore: 'Teks Baca Selengkapnya',
  publishedAt: 'Teks Dipublikasikan',
  category: 'Teks Kategori',
  allCategories: 'Teks Semua Kategori',
  searchPlaceholder: 'Teks Placeholder Cari Berita',
  
  // Countdown
  title: 'Judul Hitung Mundur',
}

function formatFieldName(key) {
  return FIELD_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

function getNestedValue(obj, path) {
  return path.reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined
  }, obj)
}

function setNestedValue(obj, path, value) {
  const newObj = JSON.parse(JSON.stringify(obj))
  let current = newObj
  for (let i = 0; i < path.length - 1; i++) {
    const part = path[i]
    if (current[part] === undefined) current[part] = {}
    current = current[part]
  }
  current[path[path.length - 1]] = value
  return newObj
}

export default function AdminPage({ theme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const { translations, updateTranslations, resetTranslations } = useLanguage()

  const [selectedLang, setSelectedLang] = useState('en')
  const [activeCard, setActiveCard] = useState(null) // selected PAGE_CARD
  const [editableTranslations, setEditableTranslations] = useState(null)
  
  const [toast, setToast] = useState(null)
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingImageKey, setUploadingImageKey] = useState(null)

  // News editing state
  const [editingArticleIndex, setEditingArticleIndex] = useState(null)
  const [articleForm, setArticleForm] = useState({
    title: '',
    date: '',
    category: '',
    summary: '',
    image: ''
  })

  useEffect(() => {
    const auth = sessionStorage.getItem('iite_admin_auth')
    if (auth === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (translations) {
      setEditableTranslations(JSON.parse(JSON.stringify(translations)))
    }
  }, [translations])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 4500)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'adminiite2026') {
      sessionStorage.setItem('iite_admin_auth', 'true')
      setIsLoggedIn(true)
      setLoginError('')
      showToast('Berhasil masuk sebagai Administrator!')
    } else {
      setLoginError('Username atau password salah!')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('iite_admin_auth')
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setActiveCard(null)
    showToast('Berhasil keluar', 'info')
  }

  // Save changes to localStorage & Disk Database
  const handleSave = async () => {
    setIsSaving(true)
    try {
      // 1. Update React Context (localStorage)
      updateTranslations(editableTranslations)

      // 2. Save directly to Disk JSON File (Vite server API middleware)
      const res = await fetch('/api/save-translations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editableTranslations)
      })
      const result = await res.json()
      
      if (result.success) {
        showToast('Perubahan berhasil disimpan permanen ke database disk!')
      } else {
        showToast('Tersimpan di local browser. Server error: ' + result.error, 'warning')
      }
    } catch (err) {
      console.error(err)
      showToast('Tersimpan secara lokal di browser Anda! (Untuk server production, pastikan untuk download i18n.js)', 'info')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = async () => {
    try {
      resetTranslations()
      setEditableTranslations(JSON.parse(JSON.stringify(defaultTranslations)))
      setShowConfirmReset(false)
      
      // Save default back to disk
      await fetch('/api/save-translations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(defaultTranslations)
      })

      showToast('Semua informasi di-reset kembali ke bawaan pabrik!', 'info')
    } catch (e) {
      showToast('Reset lokal berhasil.', 'info')
    }
  }

  // Upload poster / image
  const handleImageUpload = async (e, pathArray, indexOrKey, fieldName) => {
    const file = e.target.files[0]
    if (!file) return

    const uploadKey = `${pathArray.join('.')}.${indexOrKey}.${fieldName}`
    setUploadingImageKey(uploadKey)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        // Set value in our editable translations state
        const targetPath = [selectedLang, ...pathArray]
        
        let currentSectionVal = getNestedValue(editableTranslations, targetPath)
        
        if (typeof indexOrKey === 'number') {
          // It is inside an array (e.g. news articles array or speakers array)
          currentSectionVal[indexOrKey][fieldName] = data.url
        } else if (indexOrKey) {
          // It is inside a nested object (e.g. pages.news)
          currentSectionVal[indexOrKey] = data.url
        } else {
          // Simple field
          currentSectionVal[fieldName] = data.url
        }

        const updated = setNestedValue(editableTranslations, targetPath, currentSectionVal)
        setEditableTranslations(updated)
        showToast('Gambar poster berhasil diunggah!')
      } else {
        showToast('Gagal mengunggah gambar: ' + data.error, 'danger')
      }
    } catch (err) {
      console.error(err)
      showToast('Gagal mengunggah gambar. Pastikan server dev berjalan.', 'danger')
    } finally {
      setUploadingImageKey(null)
    }
  }

  // Generic setters
  const updateSectionValue = (sectionId, key, value) => {
    const path = SECTION_PATH_MAP[sectionId]
    const fullPath = [selectedLang, ...path, key]
    const updated = setNestedValue(editableTranslations, fullPath, value)
    setEditableTranslations(updated)
  }

  // Array Add/Delete/Move Helpers
  const addArrayItem = (sectionId, key, template) => {
    const path = SECTION_PATH_MAP[sectionId]
    const arr = getNestedValue(editableTranslations[selectedLang], [...path, key]) || []
    const updatedArr = [...arr, JSON.parse(JSON.stringify(template))]
    updateSectionValue(sectionId, key, updatedArr)
    showToast('Item baru ditambahkan')
  }

  const removeArrayItem = (sectionId, key, index) => {
    const path = SECTION_PATH_MAP[sectionId]
    const arr = getNestedValue(editableTranslations[selectedLang], [...path, key]) || []
    const updatedArr = arr.filter((_, i) => i !== index)
    updateSectionValue(sectionId, key, updatedArr)
    showToast('Item berhasil dihapus', 'warning')
  }

  const moveArrayItem = (sectionId, key, index, direction) => {
    const path = SECTION_PATH_MAP[sectionId]
    const arr = [...(getNestedValue(editableTranslations[selectedLang], [...path, key]) || [])]
    if (direction === 'up' && index > 0) {
      const temp = arr[index]
      arr[index] = arr[index - 1]
      arr[index - 1] = temp
    } else if (direction === 'down' && index < arr.length - 1) {
      const temp = arr[index]
      arr[index] = arr[index + 1]
      arr[index + 1] = temp
    }
    updateSectionValue(sectionId, key, arr)
  }

  // Article Managers
  const handleSaveArticle = (e) => {
    e.preventDefault()
    const path = SECTION_PATH_MAP['news_articles']
    const articles = getNestedValue(editableTranslations[selectedLang], path) || []
    
    let updatedArticles = [...articles]
    if (editingArticleIndex !== null) {
      updatedArticles[editingArticleIndex] = articleForm
      showToast('Artikel berhasil diperbarui')
    } else {
      updatedArticles.unshift(articleForm)
      showToast('Artikel berita baru ditambahkan')
    }

    const updated = setNestedValue(editableTranslations, [selectedLang, ...path], updatedArticles)
    setEditableTranslations(updated)
    setEditingArticleIndex(null)
    setArticleForm({ title: '', date: '', category: '', summary: '', image: '' })
  }

  const handleStartEditArticle = (index, article) => {
    setEditingArticleIndex(index)
    setArticleForm({ ...article })
  }

  const handleDeleteArticle = (index) => {
    const path = SECTION_PATH_MAP['news_articles']
    const articles = getNestedValue(editableTranslations[selectedLang], path) || []
    const updatedArticles = articles.filter((_, i) => i !== index)
    
    const updated = setNestedValue(editableTranslations, [selectedLang, ...path], updatedArticles)
    setEditableTranslations(updated)
    showToast('Artikel berita dihapus', 'warning')
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-iite-dark/60 p-8 shadow-glass backdrop-blur-xl sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-iite-cyan/30 bg-iite-cyan/10 text-iite-cyan mb-4">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Admin Portal</h1>
            <p className="mt-2 text-sm text-slate-400">Masukkan kredensial untuk mengakses editor website</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginError && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-400">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-iite-cyan/50 focus:ring-1 focus:ring-iite-cyan/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-iite-cyan/50 focus:ring-1 focus:ring-iite-cyan/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-iite-cyan px-4 py-3 text-sm font-semibold text-iite-dark shadow-lg shadow-iite-cyan/20 transition hover:bg-iite-cyan/90"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!editableTranslations) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
        Menyiapkan editor halaman...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-iite-dark text-white flex flex-col md:flex-row w-full">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold shadow-xl backdrop-blur-md transition-all duration-300 ${
          toast.type === 'success' ? 'bg-emerald-500/90 text-white border border-emerald-400/20' :
          toast.type === 'warning' ? 'bg-amber-500/90 text-white border border-amber-400/20' :
          toast.type === 'info' ? 'bg-cyan-500/90 text-iite-dark border border-cyan-400/20' :
          'bg-rose-500/90 text-white border border-rose-400/20'
        }`}>
          {toast.type === 'success' && <CheckCircle className="h-5 w-5" />}
          {toast.type === 'warning' && <AlertCircle className="h-5 w-5" />}
          {toast.type === 'info' && <Settings className="h-5 w-5" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* LEFT SIDEBAR (vertical sidebar menu) */}
      <aside className="w-full md:w-80 shrink-0 border-r border-white/10 bg-iite-dark/80 backdrop-blur-xl flex flex-col h-auto md:h-screen md:sticky md:top-0">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-iite-cyan/30 bg-iite-cyan/10 text-iite-cyan">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-white tracking-wide text-sm">IITE 2026</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Control Panel</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition md:hidden"
            title="Keluar"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin">
          <button
            onClick={() => setActiveCard(null)}
            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
              activeCard === null
                ? 'bg-iite-cyan text-iite-dark'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Dashboard & Statistik</span>
          </button>

          <div className="pt-4 pb-1 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Edit Halaman
          </div>

          {PAGE_CARDS.map((card) => {
            const CardIcon = card.icon
            const isActive = activeCard && activeCard.id === card.id
            return (
              <button
                key={card.id}
                onClick={() => setActiveCard(card)}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  isActive
                    ? 'bg-iite-cyan text-iite-dark'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <CardIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{card.title}</span>
              </button>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-white/[0.01]">
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-iite-cyan px-3 py-2 text-xs font-bold text-iite-dark shadow-lg shadow-iite-cyan/10 hover:bg-iite-cyan/95 transition disabled:opacity-55"
            >
              <Save className="h-3.5 w-3.5" />
              {isSaving ? 'Simpan...' : 'Simpan'}
            </button>

            <button
              onClick={() => setShowConfirmReset(true)}
              className="flex h-8.5 w-9.5 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition"
              title="Reset ke Bawaan"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleLogout}
              className="hidden md:flex h-8.5 w-9.5 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
              title="Keluar"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT CONTENT AREA */}
      <main className="flex-1 min-w-0 overflow-y-auto h-screen p-6 md:p-8 space-y-6">
        {/* Main Content Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/5">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">
              {activeCard ? activeCard.title : 'Dashboard Utama & Statistik'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {activeCard ? activeCard.desc : 'Statistik dan ringkasan sistem web IITE 2026'}
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeCard === null ? (
          /* dashboard statistics & system state */
          <div className="space-y-6 animate-admin-fade">
            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Statistic Card 1: Daily Visitors */}
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-4 top-4 text-iite-cyan/20 group-hover:scale-110 transition duration-300">
                  <Users className="h-10 w-10" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pengunjung Hari Ini</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">184</span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center">+12.4%</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Terakhir diperbarui: Baru saja</p>
              </div>

              {/* Statistic Card 2: Weekly Visitors */}
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-4 top-4 text-iite-purple/20 group-hover:scale-110 transition duration-300">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pengunjung Seminggu</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">1,248</span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center">+8.2%</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Rentang 7 hari terakhir</p>
              </div>

              {/* Statistic Card 3: Monthly Visitors */}
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-4 top-4 text-emerald-400/20 group-hover:scale-110 transition duration-300">
                  <Calendar className="h-10 w-10" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pengunjung Sebulan</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">4,820</span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center">+15.7%</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Periode bulan berjalan</p>
              </div>

              {/* Statistic Card 4: News Articles Count */}
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute right-4 top-4 text-amber-400/20 group-hover:scale-110 transition duration-300">
                  <Newspaper className="h-10 w-10" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Berita & Informasi</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">
                    {editableTranslations[selectedLang]?.pages?.news?.articles?.length || 0}
                  </span>
                  <span className="text-xs text-slate-400">Artikel Aktif</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Dapat diedit di Manajer Berita</p>
              </div>
            </div>

            {/* Main Stats Details (Countries & System Info) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Demographics Card */}
              <div className="lg:col-span-2 rounded-[24px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="h-5 w-5 text-iite-cyan" />
                    Asal Negara Pengunjung
                  </h3>
                  <span className="text-[10px] bg-iite-cyan/10 text-iite-cyan font-bold px-2 py-0.5 rounded-full uppercase">Geo IP Analytics</span>
                </div>
                
                <div className="space-y-4">
                  {/* Indonesia */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">🇮🇩 Indonesia</span>
                      <span className="text-white">74.2% <span className="text-slate-400 font-normal">(3,576 hits)</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-iite-cyan to-iite-purple rounded-full" style={{ width: '74.2%' }} />
                    </div>
                  </div>

                  {/* Malaysia */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">🇲🇾 Malaysia</span>
                      <span className="text-white">12.5% <span className="text-slate-400 font-normal">(602 hits)</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-iite-purple to-emerald-500 rounded-full" style={{ width: '12.5%' }} />
                    </div>
                  </div>

                  {/* Singapore */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">🇸🇬 Singapura</span>
                      <span className="text-white">6.8% <span className="text-slate-400 font-normal">(327 hits)</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full" style={{ width: '6.8%' }} />
                    </div>
                  </div>

                  {/* Australia */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">🇦🇺 Australia</span>
                      <span className="text-white">4.1% <span className="text-slate-400 font-normal">(198 hits)</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '4.1%' }} />
                    </div>
                  </div>

                  {/* Lainnya */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">🌐 Negara Lainnya</span>
                      <span className="text-white">2.4% <span className="text-slate-400 font-normal">(117 hits)</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full" style={{ width: '2.4%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* System & Active Logs Info Card */}
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Settings className="h-4.5 w-4.5 text-iite-purple animate-pulse" />
                    Informasi CMS & Sistem
                  </h3>
                </div>
                
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5 text-slate-400">
                    <span>Database CMS</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      JSON File (Terhubung)
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5 text-slate-400">
                    <span>Lokasi Data</span>
                    <span className="text-white font-mono text-[10px] bg-slate-950 px-1.5 py-0.5 rounded">translations-data.json</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5 text-slate-400">
                    <span>Bahasa Terdaftar</span>
                    <span className="text-white font-medium">INDONESIA (id), ENGLISH (en)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5 text-slate-400">
                    <span>Unggah Media</span>
                    <span className="text-white font-medium">Aktif (/public/uploads/)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5 text-slate-400">
                    <span>Vite CMS Dev Server</span>
                    <span className="text-iite-cyan font-semibold">Active Port 4175</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-400">
                    <span>Batas Ukuran File</span>
                    <span className="text-white font-medium">Maks. 10 MB / upload</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Editor form rendered inside Content Area */
          <div className="rounded-[24px] border border-white/10 bg-iite-dark/40 p-6 shadow-glass backdrop-blur-xl">
            {activeCard.sections.map((sectionId) => {
              const path = SECTION_PATH_MAP[sectionId]
              const sectionData = getNestedValue(editableTranslations[selectedLang], path)
              
              if (!sectionData) return null

              return (
                <div key={sectionId} className="space-y-8 border-b border-white/5 pb-8 mb-8 last:border-0 last:pb-0 last:mb-0">
                  <div className="border-l-2 border-iite-cyan pl-3">
                    <h2 className="text-lg font-bold text-white">Bagian: {sectionId.replace('_', ' ').toUpperCase()}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Kode path: {path.join('.')}</p>
                  </div>

                  {/* Special News Article List Editor inside Manager */}
                  {sectionId === 'news_articles' ? (
                    <div className="space-y-6">
                      {editingArticleIndex !== null || articleForm.title ? (
                        <form onSubmit={handleSaveArticle} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                          <h3 className="font-bold text-white text-sm">
                            {editingArticleIndex !== null ? '✏️ Edit Artikel Berita' : '➕ Tulis Artikel Berita Baru'}
                          </h3>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="text-xs font-semibold text-slate-400 block mb-1">Judul Artikel</label>
                              <input
                                type="text"
                                required
                                value={articleForm.title}
                                onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                                className="w-full rounded-xl border border-white/10 bg-iite-dark/60 px-4 py-2.5 text-sm text-white"
                              />
                            </div>
                            
                            <div>
                              <label className="text-xs font-semibold text-slate-400 block mb-1">Kategori Berita</label>
                              <input
                                type="text"
                                required
                                value={articleForm.category}
                                onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                                placeholder="Contoh: Pengumuman, Lomba, Event"
                                className="w-full rounded-xl border border-white/10 bg-iite-dark/60 px-4 py-2.5 text-sm text-white"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-slate-400 block mb-1">Tanggal Rilis</label>
                              <input
                                type="text"
                                required
                                value={articleForm.date}
                                onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                                placeholder="Contoh: 20 Maret 2026"
                                className="w-full rounded-xl border border-white/10 bg-iite-dark/60 px-4 py-2.5 text-sm text-white"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-slate-400 block mb-1">Upload Gambar Banner Berita</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={articleForm.image}
                                  onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                                  placeholder="/images/news-poster.png"
                                  className="flex-1 rounded-xl border border-white/10 bg-iite-dark/60 px-4 py-2.5 text-xs text-white"
                                />
                                <label className="flex items-center gap-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl px-3 py-2 cursor-pointer text-xs transition">
                                  <Upload className="h-4 w-4" /> Unggah File
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files[0]
                                      if (!file) return
                                      const formData = new FormData()
                                      formData.append('image', file)
                                      try {
                                        const response = await fetch('/api/upload-image', {
                                          method: 'POST',
                                          body: formData
                                        })
                                        const data = await response.json()
                                        if (data.success) {
                                          setArticleForm(prev => ({ ...prev, image: data.url }))
                                          showToast('Gambar berita diunggah!')
                                        }
                                      } catch (err) {
                                        showToast('Gagal upload', 'danger')
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-slate-400 block mb-1">Isi Singkat / Ringkasan Berita</label>
                            <textarea
                              required
                              rows={4}
                              value={articleForm.summary}
                              onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                              className="w-full rounded-xl border border-white/10 bg-iite-dark/60 px-4 py-2.5 text-sm text-white"
                            />
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="submit"
                              className="rounded-xl bg-iite-cyan px-4 py-2 text-xs font-semibold text-iite-dark hover:bg-iite-cyan/90"
                            >
                              Simpan Artikel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingArticleIndex(null)
                                setArticleForm({ title: '', date: '', category: '', summary: '', image: '' })
                              }}
                              className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                            >
                              Batal
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button
                          onClick={() => setArticleForm({ title: '', date: '2026-07-11', category: 'Pengumuman', summary: '', image: '/images/conference-poster.png' })}
                          className="flex items-center gap-2 rounded-xl border border-dashed border-white/20 hover:border-iite-cyan/50 hover:bg-white/5 py-4 px-6 w-full justify-center transition text-sm text-slate-400 hover:text-white"
                        >
                          <PlusCircle className="h-5 w-5 text-iite-cyan" />
                          Tulis Berita Baru
                        </button>
                      )}

                      <div className="space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Daftar Berita Aktif ({sectionData.length})</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {sectionData.map((art, idx) => (
                            <div key={idx} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 items-start hover:border-white/20 transition">
                              <img
                                src={art.image || '/images/conference-poster.png'}
                                alt={art.title}
                                className="h-20 w-28 rounded-lg object-cover bg-slate-800 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex gap-2 items-center text-xs mb-1">
                                  <span className="px-2 py-0.5 rounded bg-iite-cyan/10 text-iite-cyan font-semibold flex items-center gap-1">
                                    <Tag className="h-3 w-3" />
                                    {art.category}
                                  </span>
                                  <span className="text-slate-500 flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {art.date}
                                  </span>
                                </div>
                                <h4 className="font-semibold text-white truncate text-sm">{art.title}</h4>
                                <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">{art.summary}</p>
                              </div>
                              <div className="flex flex-col gap-1 text-slate-400 shrink-0">
                                <button
                                  onClick={() => handleStartEditArticle(idx, art)}
                                  className="p-2 hover:text-iite-cyan transition rounded hover:bg-white/5"
                                  title="Edit berita"
                                >
                                  <Settings className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteArticle(idx)}
                                  className="p-2 hover:text-rose-400 transition rounded hover:bg-rose-500/10"
                                  title="Hapus berita"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* General Fields inside sections */
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {Object.keys(sectionData).sort((a, b) => {
                        if (a === 'posterImage') return -1
                        if (b === 'posterImage') return 1
                        return 0
                      }).map((key) => {
                        const val = sectionData[key]
                        
                        // Card detail navigation lists (Scenario: Home.cards)
                        if (sectionId === 'home' && key === 'cards') {
                          return (
                            <div key={key} className="col-span-1 sm:col-span-2 space-y-4 pt-4 border-t border-white/5">
                              <h3 className="text-sm font-bold text-iite-cyan uppercase tracking-wider">Navigasi Kartu Halaman Utama</h3>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {Object.keys(val).map((cardKey) => (
                                  <div key={cardKey} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                                    <h4 className="text-xs font-semibold text-white uppercase tracking-wide pb-1 border-b border-white/5">
                                      Kartu: {formatFieldName(cardKey)}
                                    </h4>
                                    <div>
                                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Judul Kartu</label>
                                      <input
                                        type="text"
                                        value={val[cardKey].title}
                                        onChange={(e) => {
                                          const updatedCards = { ...val, [cardKey]: { ...val[cardKey], title: e.target.value } }
                                          updateSectionValue(sectionId, 'cards', updatedCards)
                                        }}
                                        className="w-full rounded-lg border border-white/10 bg-iite-dark/60 px-3 py-2 text-xs text-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Deskripsi Singkat</label>
                                      <textarea
                                        rows={3}
                                        value={val[cardKey].desc}
                                        onChange={(e) => {
                                          const updatedCards = { ...val, [cardKey]: { ...val[cardKey], desc: e.target.value } }
                                          updateSectionValue(sectionId, 'cards', updatedCards)
                                        }}
                                        className="w-full rounded-lg border border-white/10 bg-iite-dark/60 px-3 py-2 text-xs text-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Teks Tombol Detail</label>
                                      <input
                                        type="text"
                                        value={val[cardKey].cta}
                                        onChange={(e) => {
                                          const updatedCards = { ...val, [cardKey]: { ...val[cardKey], cta: e.target.value } }
                                          updateSectionValue(sectionId, 'cards', updatedCards)
                                        }}
                                        className="w-full rounded-lg border border-white/10 bg-iite-dark/60 px-3 py-2 text-xs text-white"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        }

                        // A. Input String (Teks biasa)
                        if (typeof val === 'string') {
                          const isImage = key.toLowerCase().includes('image') || 
                                          key.toLowerCase().includes('logo') || 
                                          val.startsWith('/') || 
                                          val.startsWith('http')
                          
                          const isLongText = val.length > 50

                          return (
                            <div key={key} className={isLongText || isImage ? "col-span-1 sm:col-span-2 space-y-2" : "space-y-2"}>
                              <label className="text-xs font-semibold text-slate-300 block">{formatFieldName(key)}</label>
                              
                              {isImage ? (
                                <div className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                                  <div className="flex gap-4 items-center">
                                    <div className="h-16 w-24 shrink-0 rounded-lg border border-white/10 bg-slate-900 overflow-hidden flex items-center justify-center">
                                      {val ? (
                                        <img src={val} alt="Preview" className="h-full w-full object-cover" />
                                      ) : (
                                        <ImageIcon className="h-5 w-5 text-slate-600" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-[10px] font-bold text-slate-400 block mb-1">Path Gambar Saat Ini:</span>
                                      <input
                                        type="text"
                                        value={val}
                                        onChange={(e) => updateSectionValue(sectionId, key, e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-iite-dark/60 px-3 py-2 text-xs text-white truncate"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <label className="inline-flex items-center gap-1.5 rounded-xl bg-iite-cyan px-4 py-2 text-xs font-semibold text-iite-dark hover:bg-iite-cyan/95 transition cursor-pointer">
                                      <Upload className="h-3.5 w-3.5" />
                                      {uploadingImageKey === `${sectionId}.${key}` ? 'Mengunggah...' : 'Upload Poster Baru'}
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        disabled={uploadingImageKey !== null}
                                        onChange={(e) => handleImageUpload(e, path, null, key)}
                                      />
                                    </label>
                                  </div>
                                </div>
                              ) : isLongText ? (
                                <textarea
                                  rows={4}
                                  value={val}
                                  onChange={(e) => updateSectionValue(sectionId, key, e.target.value)}
                                  className="w-full rounded-xl border border-white/10 bg-iite-dark/60 px-4 py-2.5 text-sm text-white"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => updateSectionValue(sectionId, key, e.target.value)}
                                  className="w-full rounded-xl border border-white/10 bg-iite-dark/60 px-4 py-2.5 text-sm text-white"
                                />
                              )}
                            </div>
                          )
                        }

                        // B. List Array Teks (Persyaratan, Kategori Lomba, dll.)
                        if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'string') {
                          return (
                            <div key={key} className="col-span-1 sm:col-span-2 space-y-3 pt-2">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-slate-300 block">{formatFieldName(key)}</label>
                                <button
                                  type="button"
                                  onClick={() => addArrayItem(sectionId, key, "Item Baru")}
                                  className="flex items-center gap-1 text-[11px] font-semibold text-iite-cyan hover:text-white transition"
                                >
                                  <Plus className="h-3.5 w-3.5" /> Tambah Baris
                                </button>
                              </div>
                              <div className="space-y-2">
                                {val.map((itemVal, idx) => (
                                  <div key={idx} className="flex gap-2 items-center">
                                    <input
                                      type="text"
                                      value={itemVal}
                                      onChange={(e) => {
                                        const updatedArr = [...val]
                                        updatedArr[idx] = e.target.value
                                        updateSectionValue(sectionId, key, updatedArr)
                                      }}
                                      className="flex-1 rounded-xl border border-white/10 bg-iite-dark/60 px-4 py-2.5 text-sm text-white"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeArrayItem(sectionId, key, idx)}
                                      className="h-9 w-9 rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 flex items-center justify-center shrink-0"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        }

                        // C. List Array Objek (Speakers, Milestones, Payments, dll.)
                        if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object') {
                          const objectTemplate = Object.keys(val[0]).reduce((acc, objKey) => {
                            acc[objKey] = ""
                            return acc
                          }, {})

                          return (
                            <div key={key} className="col-span-1 sm:col-span-2 space-y-4 pt-4 border-t border-white/5">
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Daftar {formatFieldName(key)}</label>
                                <button
                                  type="button"
                                  onClick={() => addArrayItem(sectionId, key, objectTemplate)}
                                  className="flex items-center gap-1 text-[11px] font-semibold text-iite-cyan hover:text-white transition"
                                >
                                  <Plus className="h-4 w-4" /> Tambah Data Baru
                                </button>
                              </div>
                              <div className="space-y-4">
                                {val.map((item, idx) => (
                                  <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 relative">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                      <span className="text-xs font-bold text-slate-400">Data #{idx + 1}</span>
                                      <div className="flex gap-1">
                                        <button
                                          type="button"
                                          onClick={() => moveArrayItem(sectionId, key, idx, 'up')}
                                          disabled={idx === 0}
                                          className="h-7 w-7 rounded border border-white/10 bg-white/5 text-slate-400 hover:text-white flex items-center justify-center disabled:opacity-20"
                                        >
                                          <ArrowUp className="h-3 w-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => moveArrayItem(sectionId, key, idx, 'down')}
                                          disabled={idx === val.length - 1}
                                          className="h-7 w-7 rounded border border-white/10 bg-white/5 text-slate-400 hover:text-white flex items-center justify-center disabled:opacity-20"
                                        >
                                          <ArrowDown className="h-3 w-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => removeArrayItem(sectionId, key, idx)}
                                          className="h-7 w-7 rounded border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 flex items-center justify-center"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                      {Object.keys(item).map((itemKey) => {
                                        const fieldLabel = formatFieldName(itemKey)
                                        const isTextArea = itemKey === 'detail' || itemKey === 'desc' || itemKey === 'subtitle' || itemKey === 'summary'
                                        const isObjImage = itemKey === 'image' || itemKey === 'photo'

                                        if (isObjImage) {
                                          return (
                                            <div key={itemKey} className="sm:col-span-2 space-y-2">
                                              <label className="text-[10px] uppercase font-bold text-slate-500 block">{fieldLabel}</label>
                                              <div className="flex gap-4 items-center rounded-xl bg-slate-900/50 border border-white/5 p-3">
                                                <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center">
                                                  {item[itemKey] ? (
                                                    <img src={item[itemKey]} alt="Preview" className="h-full w-full object-cover" />
                                                  ) : (
                                                    <ImageIcon className="h-4 w-4 text-slate-600" />
                                                  )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <input
                                                    type="text"
                                                    value={item[itemKey] || ''}
                                                    onChange={(e) => {
                                                      const updated = [...val]
                                                      updated[idx] = { ...item, [itemKey]: e.target.value }
                                                      updateSectionValue(sectionId, key, updated)
                                                    }}
                                                    className="w-full rounded-lg border border-white/10 bg-iite-dark/60 px-3 py-1.5 text-xs text-white truncate"
                                                  />
                                                </div>
                                                <label className="inline-flex items-center gap-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg px-2.5 py-1.5 cursor-pointer text-[10px] font-bold transition">
                                                  <Upload className="h-3 w-3" />
                                                  {uploadingImageKey === `${path.join('.')}.${idx}.${itemKey}` ? 'Uploading...' : 'Pilih File'}
                                                  <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleImageUpload(e, path, idx, itemKey)}
                                                  />
                                                </label>
                                              </div>
                                            </div>
                                          )
                                        }

                                        return (
                                          <div key={itemKey} className={isTextArea ? "sm:col-span-2" : ""}>
                                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{fieldLabel}</label>
                                            {isTextArea ? (
                                              <textarea
                                                rows={2}
                                                value={item[itemKey] || ''}
                                                onChange={(e) => {
                                                  const updated = [...val]
                                                  updated[idx] = { ...item, [itemKey]: e.target.value }
                                                  updateSectionValue(sectionId, key, updated)
                                                }}
                                                className="w-full rounded-lg border border-white/10 bg-iite-dark/60 px-3 py-1.5 text-xs text-white"
                                              />
                                            ) : (
                                              <input
                                                type="text"
                                                value={item[itemKey] || ''}
                                                onChange={(e) => {
                                                  const updated = [...val]
                                                  updated[idx] = { ...item, [itemKey]: e.target.value }
                                                  updateSectionValue(sectionId, key, updated)
                                                }}
                                                className="w-full rounded-lg border border-white/10 bg-iite-dark/60 px-3 py-1.5 text-xs text-white"
                                              />
                                            )}
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        }

                        return null
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Confirmation Reset Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full rounded-3xl border border-white/10 bg-iite-dark/95 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-rose-500" />
              Reset Konten ke Bawaan?
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Apakah Anda yakin ingin membatalkan semua perubahan dan mengembalikan seluruh isi website ke teks bawaan pabrik? Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Batal
              </button>
              <button
                onClick={handleReset}
                className="rounded-xl bg-rose-500 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-600"
              >
                Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}