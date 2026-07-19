import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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
  LayoutGrid,
  FileText,
  Image as ImageIcon,
  Users,
  TrendingUp,
  Newspaper,
  X,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  ExternalLink,
  Edit3,
  Layers,
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react'
import { useLanguage, defaultTranslations } from '../i18n'

// Rich Text Editor Component for News Content (Inertia Filament Style)
function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  const execCommand = (command, val = null) => {
    document.execCommand(command, false, val)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  return (
    <div className="border border-slate-300 rounded-xl bg-white overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 bg-slate-50 border-b border-slate-200 p-2 text-slate-600">
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h2>')}
          className="p-1 px-2.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded font-semibold text-xs transition"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h3>')}
          className="p-1 px-2.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded font-semibold text-xs transition"
          title="Heading 3"
        >
          H3
        </button>
        <div className="w-[1px] bg-slate-200 my-1 mx-1" />
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-1 px-2.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded font-bold text-xs transition"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-1 px-2.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded italic text-xs transition"
          title="Italic"
        >
          I
        </button>
        <div className="w-[1px] bg-slate-200 my-1 mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = prompt('Masukkan URL Link:')
            if (url) execCommand('createLink', url)
          }}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Tambah Link"
        >
          <LinkIcon className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Bullet List"
        >
          <List className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Numbered List"
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<blockquote>')}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Kutipan"
        >
          <Quote className="h-3.5 w-3.5" />
        </button>
        <div className="w-[1px] bg-slate-200 my-1 mx-1" />
        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Rata Kiri"
        >
          <AlignLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Rata Tengah"
        >
          <AlignCenter className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Rata Kanan"
        >
          <AlignRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyFull')}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Rata Kiri Kanan"
        >
          <AlignJustify className="h-3.5 w-3.5" />
        </button>
        <div className="w-[1px] bg-slate-200 my-1 mx-1" />
        <button
          type="button"
          onClick={() => execCommand('undo')}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Batal (Undo)"
        >
          <Undo className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('redo')}
          className="p-1.5 hover:text-indigo-600 hover:bg-slate-200/60 rounded transition"
          title="Ulangi (Redo)"
        >
          <Redo className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Writing Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[200px] outline-none text-sm text-slate-800 prose max-w-none focus:ring-0"
        placeholder={placeholder}
      />
    </div>
  )
}

// Navigation structure matching Laravel Inertia Sidebar style
const SIDEBAR_GROUPS = [
  {
    category: 'MENU UTAMA',
    items: [
      {
        id: 'overview',
        title: 'Ringkasan Dashboard',
        desc: 'Ringkasan performa website, statistik pengunjung, dan status server.',
        icon: LayoutGrid,
        badge: 'Status'
      },
      {
        id: 'proceeding',
        title: 'Galeri Poster Prosiding',
        desc: 'Kelola koleksi poster penelitian, deskripsi expo, biaya pendaftaran, dan narahubung.',
        icon: ImageIcon,
        badge: 'Expo',
        sections: ['proceeding']
      },
      {
        id: 'news',
        title: 'Manajer Berita & CMS',
        desc: 'Tulis dan kelola publikasi berita, artikel inovasi, dan meta SEO.',
        icon: Newspaper,
        badge: 'Berita',
        sections: ['news_meta', 'news_articles']
      }
    ]
  },
  {
    category: 'PROGRAM & HAKIM',
    items: [
      {
        id: 'competition',
        title: 'Kompetisi Inovasi',
        desc: 'Kelola kategori kompetisi, biaya, persyaratan, dan timeline.',
        icon: Sparkles,
        sections: ['competition']
      },
      {
        id: 'proceeding',
        title: 'Poster & Proceeding',
        desc: 'Kelola galeri poster, deskripsi expo, biaya pendaftaran, dan narahubung.',
        icon: ImageIcon,
        badge: 'Expo',
        sections: ['proceeding']
      },
      {
        id: 'seminar',
        title: 'Seminar Internasional',
        desc: 'Atur keynote speakers, sub-tema, biaya, dan rekening pembayaran.',
        icon: Users,
        sections: ['seminar']
      },
      {
        id: 'greenyouth',
        title: 'Program Pemuda Hijau',
        desc: 'Atur kompetisi ide usaha Greenpreneur mahasiswa.',
        icon: Layers,
        sections: ['greenyouth']
      },
      {
        id: 'msme',
        title: 'Penghargaan UMKM',
        desc: 'Kelola ketentuan UMKM Award, aspek penilaian, dan link form.',
        icon: Tag,
        sections: ['msme']
      }
    ]
  },
  {
    category: 'PENGATURAN WEBSITE',
    items: [
      {
        id: 'home',
        title: 'Halaman Beranda',
        desc: 'Edit hero banner, slider agenda, deskripsi IITE, dan hitung mundur.',
        icon: FileText,
        sections: ['hero', 'about', 'activities', 'timeline', 'contact', 'countdown', 'home']
      },
      {
        id: 'nav_footer',
        title: 'Navigasi & Footer',
        desc: 'Ubah menu header, tombol kontak, dan teks hak cipta.',
        icon: Settings,
        sections: ['nav', 'footer']
      }
    ]
  }
]

// Technical section path mapping
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

// Technical field labels to Indonesian
const FIELD_LABELS = {
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
  posterImage: 'Gambar Banner / Poster Utama',
  badge: 'Label Badge Atas',
  description: 'Deskripsi Singkat',
  time: 'Waktu Pelaksanaan',
  location: 'Lokasi Acara',
  organizer: 'Penyelenggara',
  summary: 'Ringkasan Acara',
  cta: 'Teks Tombol Pendaftaran',
  countdown: 'Hitung Mundur',
  speakersTag: 'Tag Pembicara',
  speakersTitle: 'Judul Sesi Pembicara',
  clickToEnlarge: 'Petunjuk Perbesar Gambar',
  registrationFeeTag: 'Label Biaya Registrasi',
  registrationFeeTitle: 'Judul Biaya Call Paper',
  paymentTitle: 'Judul Informasi Pembayaran',
  contactPerson: 'Label Narahubung',
  sliderLabel: 'Label Sorotan',
  sliderHeading: 'Judul Sampul Agenda',
  tag: 'Tag Bagian',
  heading: 'Judul Utama',
  programTitle: 'Judul Fokus Program',
  programText: 'Deskripsi Fokus Program',
  benefitTitle: 'Judul Manfaat Peserta',
  benefitText: 'Deskripsi Manfaat Peserta',
  latestNews: 'Judul Berita Terbaru',
  readMore: 'Teks Baca Selengkapnya',
  publishedAt: 'Teks Dipublikasikan',
  category: 'Teks Kategori',
  allCategories: 'Teks Semua Kategori',
  searchPlaceholder: 'Placeholder Cari Berita',
  posters: 'Daftar Poster Prosiding',
  author: 'Penulis & Institusi',
  desc: 'Abstrak / Deskripsi Poster',
  title: 'Judul Utama / Nama',
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

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const { translations, updateTranslations, resetTranslations } = useLanguage()

  const [selectedLang, setSelectedLang] = useState('en')
  const [activeItem, setActiveItem] = useState(SIDEBAR_GROUPS[0].items[0]) // default: overview
  const [editableTranslations, setEditableTranslations] = useState(null)
  
  const [toast, setToast] = useState(null)
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingImageKey, setUploadingImageKey] = useState(null)

  // News editing state
  const [editingArticleIndex, setEditingArticleIndex] = useState(null)
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false)

  // Posters editing state
  const [editingPosterIndex, setEditingPosterIndex] = useState(null)
  const [isPosterFormOpen, setIsPosterFormOpen] = useState(false)
  const [posterForm, setPosterForm] = useState({
    title: '',
    author: '',
    desc: '',
    image: ''
  })

  const [articleForm, setArticleForm] = useState({
    title: '',
    date: '',
    category: '',
    summary: '',
    image: '',
    slug: '',
    content: '',
    additionalImages: [],
    isPublished: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    tags: ''
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
    setActiveItem(SIDEBAR_GROUPS[0].items[0])
    showToast('Berhasil keluar dari sesi admin', 'info')
  }

  // Save changes to localStorage & Server File API
  const handleSave = async () => {
    setIsSaving(true)
    try {
      updateTranslations(editableTranslations)

      const endpoint = import.meta.env.DEV ? '/api/save-translations' : '/api/save-translations.php'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editableTranslations)
      })
      const result = await res.json()
      
      if (result.success) {
        showToast('Perubahan berhasil disimpan permanen ke database!')
      } else {
        showToast('Tersimpan di local browser. Status server: ' + result.error, 'warning')
      }
    } catch (err) {
      console.error(err)
      showToast('Perubahan tersimpan di browser Anda.', 'info')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = async () => {
    try {
      resetTranslations()
      setEditableTranslations(JSON.parse(JSON.stringify(defaultTranslations)))
      setShowConfirmReset(false)
      
      const endpoint = import.meta.env.DEV ? '/api/save-translations' : '/api/save-translations.php'
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(defaultTranslations)
      })

      showToast('Semua data berhasil di-reset ke pengaturan awal!', 'info')
    } catch (e) {
      showToast('Reset lokal selesai.', 'info')
    }
  }

  // Upload image
  const handleImageUpload = async (e, pathArray, indexOrKey, fieldName) => {
    const file = e.target.files[0]
    if (!file) return

    const uploadKey = `${pathArray.join('.')}.${indexOrKey}.${fieldName}`
    setUploadingImageKey(uploadKey)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const endpoint = import.meta.env.DEV ? '/api/upload-image' : '/api/upload-image.php'
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        const targetPath = [selectedLang, ...pathArray]
        let currentSectionVal = getNestedValue(editableTranslations, targetPath)
        
        if (typeof indexOrKey === 'number') {
          currentSectionVal[indexOrKey][fieldName] = data.url
        } else if (indexOrKey) {
          currentSectionVal[indexOrKey] = data.url
        } else {
          currentSectionVal[fieldName] = data.url
        }

        const updated = setNestedValue(editableTranslations, targetPath, currentSectionVal)
        setEditableTranslations(updated)
        showToast('File gambar berhasil diunggah!')
      } else {
        showToast('Gagal upload gambar: ' + data.error, 'danger')
      }
    } catch (err) {
      console.error(err)
      showToast('Gagal mengunggah file. Pastikan server aktif.', 'danger')
    } finally {
      setUploadingImageKey(null)
    }
  }

  const updateSectionValue = (sectionId, key, value) => {
    const path = SECTION_PATH_MAP[sectionId]
    let updated = setNestedValue(editableTranslations, ['en', ...path, key], value)
    updated = setNestedValue(updated, ['id', ...path, key], value)
    setEditableTranslations(updated)
  }

  const addArrayItem = (sectionId, key, template) => {
    const path = SECTION_PATH_MAP[sectionId]
    const arr = getNestedValue(editableTranslations.en || editableTranslations.id, [...path, key]) || []
    const updatedArr = [...arr, JSON.parse(JSON.stringify(template))]
    updateSectionValue(sectionId, key, updatedArr)
    showToast('Data baru berhasil ditambahkan')
  }

  const removeArrayItem = (sectionId, key, index) => {
    const path = SECTION_PATH_MAP[sectionId]
    const arr = getNestedValue(editableTranslations.en || editableTranslations.id, [...path, key]) || []
    const updatedArr = arr.filter((_, i) => i !== index)
    updateSectionValue(sectionId, key, updatedArr)
    showToast('Item berhasil dihapus', 'warning')
  }

  const moveArrayItem = (sectionId, key, index, direction) => {
    const path = SECTION_PATH_MAP[sectionId]
    const arr = [...(getNestedValue(editableTranslations.en || editableTranslations.id, [...path, key]) || [])]
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
  const handleSaveArticle = async (e) => {
    e.preventDefault()
    const path = SECTION_PATH_MAP['news_articles']
    const idArticles = getNestedValue(editableTranslations, ['id', ...path]) || []
    const enArticles = getNestedValue(editableTranslations, ['en', ...path]) || []
    const currentList = getNestedValue(editableTranslations[selectedLang], path) || (idArticles.length > 0 ? idArticles : enArticles)
    
    let updatedArticles = [...currentList]
    if (editingArticleIndex !== null) {
      updatedArticles[editingArticleIndex] = articleForm
      showToast('Artikel berita berhasil diperbarui')
    } else {
      updatedArticles.unshift(articleForm)
      showToast('Artikel berita baru berhasil diterbitkan')
    }

    let updated = setNestedValue(editableTranslations, ['id', ...path], updatedArticles)
    updated = setNestedValue(updated, ['en', ...path], updatedArticles)

    setEditableTranslations(updated)
    await persistChanges(updated)

    setEditingArticleIndex(null)
    setIsArticleFormOpen(false)
    setArticleForm({
      title: '',
      date: '',
      category: '',
      summary: '',
      image: '',
      slug: '',
      content: '',
      additionalImages: [],
      isPublished: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      tags: ''
    })
  }

  const handleStartEditArticle = (index, article) => {
    setEditingArticleIndex(index)
    setArticleForm({
      title: article.title || '',
      date: article.date || '',
      category: article.category || '',
      summary: article.summary || '',
      image: article.image || '',
      slug: article.slug || '',
      content: article.content || '',
      additionalImages: article.additionalImages || [],
      isPublished: article.isPublished !== undefined ? article.isPublished : true,
      metaTitle: article.metaTitle || '',
      metaDescription: article.metaDescription || '',
      metaKeywords: article.metaKeywords || '',
      tags: article.tags || ''
    })
    setIsArticleFormOpen(true)
  }

  const handleDeleteArticle = async (index) => {
    const path = SECTION_PATH_MAP['news_articles']
    const idArticles = getNestedValue(editableTranslations, ['id', ...path]) || []
    const updatedArticles = idArticles.filter((_, i) => i !== index)
    
    let updated = setNestedValue(editableTranslations, ['id', ...path], updatedArticles)
    updated = setNestedValue(updated, ['en', ...path], updatedArticles)

    setEditableTranslations(updated)
    await persistChanges(updated)
    showToast('Artikel berita berhasil dihapus', 'warning')
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    setArticleForm(prev => ({
      ...prev,
      title,
      slug: editingArticleIndex !== null ? prev.slug : slug,
      metaTitle: prev.metaTitle || title
    }))
  }

  // Helper to persist translations immediately to context, localStorage, & server
  const persistChanges = async (newTranslations) => {
    updateTranslations(newTranslations)
    try {
      const endpoint = import.meta.env.DEV ? '/api/save-translations' : '/api/save-translations.php'
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTranslations)
      })
    } catch (err) {
      console.error('Failed to sync server:', err)
    }
  }

  // Poster Managers
  const handleSavePoster = async (e) => {
    e.preventDefault()
    const path = ['pages', 'proceeding', 'posters']
    const idPosters = getNestedValue(editableTranslations, ['id', ...path]) || []
    const enPosters = getNestedValue(editableTranslations, ['en', ...path]) || []
    const currentList = getNestedValue(editableTranslations[selectedLang], path) || (idPosters.length > 0 ? idPosters : enPosters)

    let updatedPosters = [...currentList]
    if (editingPosterIndex !== null) {
      updatedPosters[editingPosterIndex] = posterForm
      showToast('Data poster berhasil diperbarui')
    } else {
      updatedPosters.push(posterForm)
      showToast('Poster penelitian baru berhasil ditambahkan!')
    }

    // Sync poster list to both ID and EN so it renders in all language modes
    let updated = setNestedValue(editableTranslations, ['id', ...path], updatedPosters)
    updated = setNestedValue(updated, ['en', ...path], updatedPosters)

    setEditableTranslations(updated)
    await persistChanges(updated)

    setEditingPosterIndex(null)
    setIsPosterFormOpen(false)
    setPosterForm({ title: '', author: '', desc: '', image: '' })
  }

  const handleStartEditPoster = (index, poster) => {
    setEditingPosterIndex(index)
    setPosterForm({
      title: poster.title || '',
      author: poster.author || '',
      desc: poster.desc || '',
      image: poster.image || ''
    })
    setIsPosterFormOpen(true)
  }

  const handleDeletePoster = async (index) => {
    const path = ['pages', 'proceeding', 'posters']
    const idPosters = getNestedValue(editableTranslations, ['id', ...path]) || []
    const updatedPosters = idPosters.filter((_, i) => i !== index)
    
    let updated = setNestedValue(editableTranslations, ['id', ...path], updatedPosters)
    updated = setNestedValue(updated, ['en', ...path], updatedPosters)

    setEditableTranslations(updated)
    await persistChanges(updated)
    showToast('Poster penelitian dihapus dari galeri', 'warning')
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-4">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Admin Portal IITE 2026</h1>
            <p className="mt-2 text-sm text-slate-500">Masuk untuk mengelola konten dan galeri website</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            {loginError && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username admin"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!editableTranslations) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Menyiapkan Dashboard Admin...
      </div>
    )
  }

  const currentPosters = getNestedValue(editableTranslations[selectedLang], ['pages', 'proceeding', 'posters']) || []
  const currentArticles = getNestedValue(editableTranslations[selectedLang], ['pages', 'news', 'articles']) || []

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold shadow-2xl transition-all duration-300 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' :
          toast.type === 'warning' ? 'bg-amber-500 text-white' :
          toast.type === 'info' ? 'bg-indigo-600 text-white' :
          'bg-rose-600 text-white'
        }`}>
          {toast.type === 'success' && <CheckCircle className="h-5 w-5" />}
          {toast.type === 'warning' && <AlertCircle className="h-5 w-5" />}
          {toast.type === 'info' && <Settings className="h-5 w-5" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* TOP INERTIA HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-indigo-200">
              I
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-base leading-tight">Dashboard Admin IITE</h1>
              <p className="text-[11px] text-slate-500 font-medium">Laravel Inertia Management Portal</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Terhubung Database
          </span>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
            Website Utama
          </a>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            {isSaving ? 'Menyimpan...' : 'Simpan Database'}
          </button>

          <button
            onClick={() => setShowConfirmReset(true)}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
            title="Reset Database"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
            title="Keluar Admin"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT INERTIA SIDEBAR */}
        <aside className="w-64 lg:w-72 bg-white border-r border-slate-200 shrink-0 hidden md:flex flex-col justify-between overflow-y-auto p-4 space-y-6">
          <div className="space-y-6">
            {SIDEBAR_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {group.category}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon
                    const isActive = activeItem.id === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveItem(item)}
                        className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <ItemIcon className={`h-4 w-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                          <span className="truncate">{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Admin User info footer */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xs">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 truncate">Admin PKL / IITE</p>
              <p className="text-[10px] text-slate-500 truncate">admin@poltekindonusa.ac.id</p>
            </div>
          </div>
        </aside>

        {/* RIGHT WORKSPACE AREA */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          {/* Header Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{activeItem.title}</h2>
              <p className="text-xs text-slate-500 mt-1">{activeItem.desc}</p>
            </div>

            {/* Quick Action Button for Poster / News */}
            {activeItem.id === 'proceeding' && (
              <button
                onClick={() => {
                  setEditingPosterIndex(null)
                  setPosterForm({ title: '', author: '', desc: '', image: '' })
                  setIsPosterFormOpen(true)
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition"
              >
                <Plus className="h-4 w-4" />
                Tambah Poster Baru
              </button>
            )}

            {activeItem.id === 'news' && (
              <button
                onClick={() => {
                  setEditingArticleIndex(null)
                  setArticleForm({
                    title: '',
                    date: '',
                    category: '',
                    summary: '',
                    image: '',
                    slug: '',
                    content: '',
                    additionalImages: [],
                    isPublished: true,
                    metaTitle: '',
                    metaDescription: '',
                    metaKeywords: '',
                    tags: ''
                  })
                  setIsArticleFormOpen(true)
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition"
              >
                <Plus className="h-4 w-4" />
                Tambah Artikel Berita
              </button>
            )}
          </div>

          {/* SECTION 1: OVERVIEW DASHBOARD */}
          {activeItem.id === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Poster Expo</span>
                    <ImageIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{currentPosters.length}</div>
                  <p className="text-[11px] text-slate-500 mt-1">Ditampilkan di Galeri Poster</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Berita</span>
                    <Newspaper className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{currentArticles.length}</div>
                  <p className="text-[11px] text-slate-500 mt-1">Artikel Berita Terbit</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Pengunjung Hari Ini</span>
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">184</div>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">+12.4% dari kemarin</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Status Database</span>
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-lg font-bold text-emerald-600">Aktif (Live JSON)</div>
                  <p className="text-[11px] text-slate-500 mt-1">Tersimpan di file server</p>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Pintas Pengelolaan Konten Website</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveItem(SIDEBAR_GROUPS[0].items[1])}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left hover:border-indigo-400 hover:bg-indigo-50/50 transition group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Galeri Poster Prosiding</h4>
                      <p className="text-xs text-slate-500">Tambah, edit & upload gambar poster expo</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveItem(SIDEBAR_GROUPS[0].items[2])}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left hover:border-indigo-400 hover:bg-indigo-50/50 transition group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <Newspaper className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Manajer Berita & CMS</h4>
                      <p className="text-xs text-slate-500">Tulis artikel baru & editor rich text</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveItem(SIDEBAR_GROUPS[1].items[0])}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left hover:border-indigo-400 hover:bg-indigo-50/50 transition group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">Kompetisi & Seminar</h4>
                      <p className="text-xs text-slate-500">Kelola sub-tema, biaya & narahubung</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: GALERI POSTER PROSIDING (Dedicated Expo Section) */}
          {activeItem.id === 'proceeding' && (
            <div className="space-y-6">
              {/* Poster List Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Daftar Poster Expo Penelitian ({currentPosters.length})</h3>
                    <p className="text-xs text-slate-500">Poster yang ada di daftar ini akan otomatis tampil pada Galeri Poster di Halaman Poster Prosiding.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingPosterIndex(null)
                      setPosterForm({ title: '', author: '', desc: '', image: '' })
                      setIsPosterFormOpen(true)
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Poster
                  </button>
                </div>

                {currentPosters.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500 space-y-3">
                    <ImageIcon className="h-10 w-10 text-slate-400 mx-auto" />
                    <p className="text-sm font-medium">Belum ada poster di dalam galeri.</p>
                    <button
                      onClick={() => {
                        setEditingPosterIndex(null)
                        setPosterForm({ title: '', author: '', desc: '', image: '' })
                        setIsPosterFormOpen(true)
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 text-indigo-600 px-4 py-2 text-xs font-bold hover:bg-indigo-100 transition"
                    >
                      <Plus className="h-4 w-4" /> Tambah Poster Pertama
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosters.map((poster, index) => (
                      <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 flex flex-col justify-between hover:shadow-md transition">
                        <div className="space-y-3">
                          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-slate-200 border border-slate-300 relative group">
                            <img
                              src={poster.image || '/images/proceeding-poster.png'}
                              alt={poster.title}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleStartEditPoster(index, poster)}
                                className="p-2 rounded-lg bg-white text-indigo-600 hover:bg-slate-100 transition text-xs font-bold flex items-center gap-1 shadow"
                              >
                                <Edit3 className="h-3.5 w-3.5" /> Edit
                              </button>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{poster.title}</h4>
                            <p className="text-xs text-indigo-600 font-semibold mt-1 truncate">{poster.author}</p>
                            <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{poster.desc}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() => moveArrayItem('proceeding', 'posters', index, 'up')}
                              disabled={index === 0}
                              className="p-1.5 rounded bg-white border border-slate-200 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                              title="Geser Kiri/Atas"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => moveArrayItem('proceeding', 'posters', index, 'down')}
                              disabled={index === currentPosters.length - 1}
                              className="p-1.5 rounded bg-white border border-slate-200 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                              title="Geser Kanan/Bawah"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleStartEditPoster(index, poster)}
                              className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 font-semibold text-xs hover:bg-indigo-100 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePoster(index)}
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                              title="Hapus Poster"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Poster Form Modal */}
              {isPosterFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                  <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <h3 className="font-bold text-slate-900 text-base">
                        {editingPosterIndex !== null ? 'Edit Poster Penelitian' : 'Tambah Poster Baru'}
                      </h3>
                      <button
                        onClick={() => setIsPosterFormOpen(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSavePoster} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Judul Poster / Penelitian</label>
                        <input
                          type="text"
                          required
                          value={posterForm.title}
                          onChange={(e) => setPosterForm({ ...posterForm, title: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                          placeholder="misal: Optimalisasi Panel Surya Pada Industri Hijau"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Penulis / Presenter & Institusi</label>
                        <input
                          type="text"
                          required
                          value={posterForm.author}
                          onChange={(e) => setPosterForm({ ...posterForm, author: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                          placeholder="misal: Dr. Ahmad Fauzi - Universitas Indonesia"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Abstrak / Deskripsi Ringkas</label>
                        <textarea
                          rows={4}
                          required
                          value={posterForm.desc}
                          onChange={(e) => setPosterForm({ ...posterForm, desc: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                          placeholder="Ringkasan abstrak atau deskripsi karya poster..."
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Gambar Poster</label>
                        <div className="flex gap-3 items-center rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <div className="h-16 w-12 rounded bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                            {posterForm.image ? (
                              <img src={posterForm.image} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                              <ImageIcon className="h-5 w-5 text-slate-400 m-auto mt-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <input
                              type="text"
                              value={posterForm.image}
                              onChange={(e) => setPosterForm({ ...posterForm, image: e.target.value })}
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800"
                              placeholder="/images/proceeding-poster.png atau URL"
                            />
                          </div>
                          <label className="inline-flex items-center gap-1 bg-indigo-600 text-white rounded-lg px-3 py-2 cursor-pointer text-xs font-bold hover:bg-indigo-700 transition shrink-0">
                            <Upload className="h-3.5 w-3.5" />
                            Upload
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
                                  const res = await fetch(import.meta.env.DEV ? '/api/upload-image' : '/api/upload-image.php', {
                                    method: 'POST',
                                    body: formData
                                  })
                                  const data = await res.json()
                                  if (data.success) {
                                    setPosterForm(prev => ({ ...prev, image: data.url }))
                                    showToast('Gambar poster berhasil diunggah!')
                                  }
                                } catch (err) {
                                  showToast('Gagal upload gambar', 'danger')
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsPosterFormOpen(false)}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200"
                        >
                          {editingPosterIndex !== null ? 'Simpan Perubahan' : 'Tambah Poster'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: MANAJER BERITA & CMS (Dedicated News CMS Section) */}
          {activeItem.id === 'news' && (
            <div className="space-y-6">
              {/* News Articles List */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Daftar Artikel Berita ({currentArticles.length})</h3>
                    <p className="text-xs text-slate-500">Kelola artikel publikasi untuk Portal Berita & Informasi IITE 2026.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingArticleIndex(null)
                      setArticleForm({
                        title: '',
                        date: '',
                        category: '',
                        summary: '',
                        image: '',
                        slug: '',
                        content: '',
                        additionalImages: [],
                        isPublished: true,
                        metaTitle: '',
                        metaDescription: '',
                        metaKeywords: '',
                        tags: ''
                      })
                      setIsArticleFormOpen(true)
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Artikel
                  </button>
                </div>

                {currentArticles.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500 space-y-3">
                    <Newspaper className="h-10 w-10 text-slate-400 mx-auto" />
                    <p className="text-sm font-medium">Belum ada artikel berita.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase">
                          <th className="py-3 px-3">Artikel</th>
                          <th className="py-3 px-3">Kategori</th>
                          <th className="py-3 px-3">Tanggal</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {currentArticles.map((article, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-14 rounded bg-slate-200 overflow-hidden shrink-0 border border-slate-200">
                                  <img src={article.image || '/images/conference-poster.png'} alt={article.title} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 line-clamp-1">{article.title}</p>
                                  <p className="text-[11px] text-slate-400 line-clamp-1">{article.summary}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-semibold text-indigo-600">{article.category || 'Umum'}</td>
                            <td className="py-3 px-3 text-slate-500">{article.date}</td>
                            <td className="py-3 px-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                article.isPublished !== false ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {article.isPublished !== false ? 'Terbit' : 'Draft'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleStartEditArticle(idx, article)}
                                  className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 font-bold hover:bg-indigo-100 transition"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteArticle(idx)}
                                  className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* News Article Modal */}
              {isArticleFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
                  <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <h3 className="font-bold text-slate-900 text-base">
                        {editingArticleIndex !== null ? 'Edit Artikel Berita' : 'Tulis Artikel Berita Baru'}
                      </h3>
                      <button
                        onClick={() => setIsArticleFormOpen(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveArticle} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Judul Artikel Berita</label>
                        <input
                          type="text"
                          required
                          value={articleForm.title}
                          onChange={handleTitleChange}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                          placeholder="Judul artikel berita..."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Kategori</label>
                          <input
                            type="text"
                            required
                            value={articleForm.category}
                            onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800"
                            placeholder="Pengumuman, Pembicara, Panduan..."
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Tanggal Rilis</label>
                          <input
                            type="text"
                            required
                            value={articleForm.date}
                            onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800"
                            placeholder="20 Maret 2026"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Ringkasan Singkat</label>
                        <textarea
                          rows={2}
                          required
                          value={articleForm.summary}
                          onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800"
                          placeholder="Ringkasan singkat untuk kartu berita..."
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Isi Lengkap Artikel (Rich Text Editor)</label>
                        <RichTextEditor
                          value={articleForm.content}
                          onChange={(content) => setArticleForm(prev => ({ ...prev, content }))}
                          placeholder="Tuliskan berita secara lengkap di sini..."
                        />
                      </div>

                      <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsArticleFormOpen(false)}
                          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200"
                        >
                          {editingArticleIndex !== null ? 'Simpan Artikel' : 'Terbitkan Artikel'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: GENERIC FORM FOR ALL OTHER PAGES (Competition, Proceeding, Seminar, Greenyouth, MSME, Home, Nav/Footer) */}
          {activeItem.sections && activeItem.id !== 'news' && (
            <div className="space-y-6">
              {activeItem.sections.map((secId) => {
                const secPath = SECTION_PATH_MAP[secId]
                const sectionData = getNestedValue(editableTranslations?.[selectedLang], secPath) || getNestedValue(editableTranslations?.en, secPath) || getNestedValue(editableTranslations?.id, secPath)
                if (!sectionData) return null

                return (
                  <div key={secId} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                    <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 uppercase tracking-wider text-xs">
                      Form Pengaturan: {formatFieldName(secId)}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.keys(sectionData).map((fieldKey) => {
                        const fieldValue = sectionData[fieldKey]

                        // Skip posters or news articles array if handled elsewhere
                        if (fieldKey === 'posters' || fieldKey === 'articles') return null

                        // String inputs / images
                        if (typeof fieldValue === 'string') {
                          const isImg = fieldKey.toLowerCase().includes('image') || fieldKey.toLowerCase().includes('poster') || fieldValue.startsWith('/') || fieldValue.startsWith('http')
                          const isLong = fieldValue.length > 50

                          return (
                            <div key={fieldKey} className={isImg || isLong ? 'sm:col-span-2 space-y-1.5' : 'space-y-1.5'}>
                              <label className="text-xs font-bold text-slate-700 block">{formatFieldName(fieldKey)}</label>

                              {isImg ? (
                                <div className="flex gap-4 items-center rounded-xl border border-slate-200 bg-slate-50 p-3">
                                  <div className="h-16 w-20 rounded bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                                    {fieldValue ? (
                                      <img src={fieldValue} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                      <ImageIcon className="h-5 w-5 text-slate-400 m-auto mt-5" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <input
                                      type="text"
                                      value={fieldValue}
                                      onChange={(e) => updateSectionValue(secId, fieldKey, e.target.value)}
                                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800 truncate"
                                    />
                                  </div>
                                  <label className="inline-flex items-center gap-1 bg-indigo-600 text-white rounded-lg px-3 py-2 cursor-pointer text-xs font-bold hover:bg-indigo-700 transition shrink-0">
                                    <Upload className="h-3.5 w-3.5" />
                                    Pilih Gambar
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleImageUpload(e, secPath, null, fieldKey)}
                                    />
                                  </label>
                                </div>
                              ) : isLong ? (
                                <textarea
                                  rows={3}
                                  value={fieldValue}
                                  onChange={(e) => updateSectionValue(secId, fieldKey, e.target.value)}
                                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={fieldValue}
                                  onChange={(e) => updateSectionValue(secId, fieldKey, e.target.value)}
                                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                              )}
                            </div>
                          )
                        }

                        // Array of strings (e.g. Requirements, Fees list, etc.)
                        if (Array.isArray(fieldValue) && fieldValue.length > 0 && typeof fieldValue[0] === 'string') {
                          return (
                            <div key={fieldKey} className="sm:col-span-2 space-y-2 pt-2 border-t border-slate-100">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-700">{formatFieldName(fieldKey)}</label>
                                <button
                                  type="button"
                                  onClick={() => addArrayItem(secId, fieldKey, 'Item Baru')}
                                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                                >
                                  <Plus className="h-3.5 w-3.5" /> Tambah Baris
                                </button>
                              </div>
                              <div className="space-y-2">
                                {fieldValue.map((itemStr, idx) => (
                                  <div key={idx} className="flex gap-2 items-center">
                                    <input
                                      type="text"
                                      value={itemStr}
                                      onChange={(e) => {
                                        const updatedArr = [...fieldValue]
                                        updatedArr[idx] = e.target.value
                                        updateSectionValue(secId, fieldKey, updatedArr)
                                      }}
                                      className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeArrayItem(secId, fieldKey, idx)}
                                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        }

                        // Array of objects (e.g. Speakers, Timeline, Payments, Categories)
                        if (Array.isArray(fieldValue) && fieldValue.length > 0 && typeof fieldValue[0] === 'object') {
                          const templateObj = Object.keys(fieldValue[0]).reduce((acc, k) => {
                            acc[k] = ''
                            return acc
                          }, {})

                          return (
                            <div key={fieldKey} className="sm:col-span-2 space-y-3 pt-3 border-t border-slate-100">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Daftar {formatFieldName(fieldKey)}</label>
                                <button
                                  type="button"
                                  onClick={() => addArrayItem(secId, fieldKey, templateObj)}
                                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                                >
                                  <Plus className="h-3.5 w-3.5" /> Tambah Data Baru
                                </button>
                              </div>

                              <div className="space-y-3">
                                {fieldValue.map((objItem, idx) => (
                                  <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                      <span className="text-xs font-bold text-slate-600">Item #{idx + 1}</span>
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          onClick={() => moveArrayItem(secId, fieldKey, idx, 'up')}
                                          disabled={idx === 0}
                                          className="p-1 rounded bg-white border border-slate-200 text-slate-500 disabled:opacity-30"
                                        >
                                          <ArrowUp className="h-3 w-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => moveArrayItem(secId, fieldKey, idx, 'down')}
                                          disabled={idx === fieldValue.length - 1}
                                          className="p-1 rounded bg-white border border-slate-200 text-slate-500 disabled:opacity-30"
                                        >
                                          <ArrowDown className="h-3 w-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => removeArrayItem(secId, fieldKey, idx)}
                                          className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {Object.keys(objItem).map((itemProp) => (
                                        <div key={itemProp}>
                                          <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">{formatFieldName(itemProp)}</label>
                                          <input
                                            type="text"
                                            value={objItem[itemProp] || ''}
                                            onChange={(e) => {
                                              const updated = [...fieldValue]
                                              updated[idx] = { ...objItem, [itemProp]: e.target.value }
                                              updateSectionValue(secId, fieldKey, updated)
                                            }}
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800"
                                          />
                                        </div>
                                      ))}
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
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>

      {/* CONFIRM RESET MODAL */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 text-rose-600">
              <AlertCircle className="h-5 w-5" />
              Reset Database ke Bawaan Pabrik?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tindakan ini akan mengembalikan seluruh teks, informasi acara, dan daftar poster ke data bawaan awal. Seluruh perubahan yang belum disimpan akan terhapus.
            </p>            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-700 shadow-md shadow-rose-200"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}