import { useState, useMemo } from 'react'
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  Sparkles, 
  Building2, 
  Users, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Layers, 
  GraduationCap, 
  Tag, 
  Image as ImageIcon,
  Filter,
  RotateCcw
} from 'lucide-react'
import { useTranslation, useLanguage } from '../i18n'

const INNOVATION_SCHEMAS = [
  { id: 'all', name: 'Semua Skema' },
  { id: 'High School', name: 'High School' },
  { id: 'College', name: 'College' }
]

const INNOVATION_SUB_THEMES = [
  { id: 'all', name: 'Semua Sub-tema' },
  { id: 'Pharmacy, Health, Medicine, and Humanistic Therapy', name: '1. Pharmacy, Health, Medicine, and Humanistic Therapy' },
  { id: 'Hospitality & Tourism, Culinary & Food (Only University Student)', name: '2. Hospitality & Tourism, Culinary & Food (Only University Student)' },
  { id: 'Engineering, Information, Communication, and Technology (ICT)', name: '3. Engineering, Information, Communication, and Technology (ICT)' },
  { id: 'Entrepreneurship (Economic, Business, Management, Education, Media, Design, Advertising, Arts, Publishing)', name: '4. Entrepreneurship (Economic, Business, Management, Education, Media, Design, Advertising, Arts, Publishing)' }
]

const INNOVATION_PRODUCT_CATEGORIES = [
  { id: 'all', name: 'Semua Kategori Produk' },
  { id: 'Ready-Made Product', name: 'Ready-Made Product' },
  { id: 'Prototype Product', name: 'Prototype Product' },
  { id: 'Potential Product', name: 'Potential Product' }
]

export default function AwardsPage({ theme }) {
  const t = useTranslation()
  const { language } = useLanguage()
  const awardsData = t.pages?.awards || {}

  const categories = useMemo(() => {
    return awardsData.categories || [
      { id: 'all', name: language === 'id' ? 'Semua Kategori' : 'All Categories' }
    ]
  }, [awardsData, language])

  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedWinner, setSelectedWinner] = useState(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  // Sub-filters for Innovation Competition
  const [selectedSchema, setSelectedSchema] = useState('all')
  const [selectedSubTheme, setSelectedSubTheme] = useState('all')
  const [selectedProductCategory, setSelectedProductCategory] = useState('all')

  const allWinners = useMemo(() => {
    return awardsData.winners || []
  }, [awardsData])

  const filteredWinners = useMemo(() => {
    let list = allWinners
    if (activeCategory !== 'all') {
      list = list.filter(w => w.categoryId === activeCategory)
    }

    if (activeCategory === 'innovation') {
      if (selectedSchema !== 'all') {
        list = list.filter(w => (w.schema || '').toLowerCase() === selectedSchema.toLowerCase())
      }
      if (selectedSubTheme !== 'all') {
        list = list.filter(w => w.subTheme === selectedSubTheme)
      }
      if (selectedProductCategory !== 'all') {
        list = list.filter(w => w.productCategory === selectedProductCategory)
      }
    }

    return list
  }, [allWinners, activeCategory, selectedSchema, selectedSubTheme, selectedProductCategory])

  // Extract Podium 1, 2, 3
  const rank1 = useMemo(() => filteredWinners.find(w => Number(w.rank) === 1), [filteredWinners])
  const rank2 = useMemo(() => filteredWinners.find(w => Number(w.rank) === 2), [filteredWinners])
  const rank3 = useMemo(() => filteredWinners.find(w => Number(w.rank) === 3), [filteredWinners])

  // Honorable mentions (Rank > 3 or others)
  const honorableMentions = useMemo(() => {
    return filteredWinners.filter(w => Number(w.rank) > 3)
  }, [filteredWinners])

  const getCategoryName = (catId) => {
    const found = categories.find(c => c.id === catId)
    return found ? found.name : catId
  }

  const handleOpenWinnerModal = (winner) => {
    setSelectedWinner(winner)
    setActiveSlideIndex(0)
  }

  // Selected winner images array
  const modalImages = useMemo(() => {
    if (!selectedWinner) return []
    if (Array.isArray(selectedWinner.images) && selectedWinner.images.length > 0) {
      return selectedWinner.images.filter(Boolean)
    }
    if (selectedWinner.image) {
      return [selectedWinner.image]
    }
    return []
  }, [selectedWinner])

  const isSubFilterActive = selectedSchema !== 'all' || selectedSubTheme !== 'all' || selectedProductCategory !== 'all'

  const resetSubFilters = () => {
    setSelectedSchema('all')
    setSelectedSubTheme('all')
    setSelectedProductCategory('all')
  }

  return (
    <div className={`relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 overflow-hidden ${
      theme === 'dark' ? 'bg-iite-dark text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-amber-500/15 via-indigo-600/15 to-iite-cyan/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm animate-pulse">
            <Trophy className="h-4 w-4 text-amber-400" />
            {awardsData.badge || 'IITE 2026 Awards & Honors'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {awardsData.title || 'Product Winners Exhibition'}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {awardsData.subtitle || (language === 'id' 
              ? 'Merayakan karya inovasi terbaik dari para inovator, peneliti muda, dan pelaku usaha berkelanjutan di panggung IITE 2026.' 
              : 'Celebrating outstanding green technology, technological research, and sustainable innovation at IITE 2026.')}
          </p>
        </div>

        {/* Filter Categories Pill Navigation */}
        <div className="flex items-center justify-center">
          <div className={`inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl border backdrop-blur-xl ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            {categories.map(cat => {
              const isActive = activeCategory === cat.id
              const count = cat.id === 'all' 
                ? allWinners.length 
                : allWinners.filter(w => w.categoryId === cat.id).length

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    if (cat.id !== 'innovation') {
                      resetSubFilters()
                    }
                  }}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat.id === 'all' && <Trophy className="h-3.5 w-3.5" />}
                  <span>{cat.name}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : theme === 'dark' ? 'bg-white/10 text-slate-400' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Innovation Competition Sub-Filters Bar (Schema, Sub-Theme, Category) */}
        {activeCategory === 'innovation' && (
          <div className={`max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl border backdrop-blur-xl animate-fade-in ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {language === 'id' ? 'Filter Khusus Innovation Competition' : 'Innovation Competition Sub-Filters'}
                </span>
              </div>
              {isSubFilterActive && (
                <button
                  onClick={resetSubFilters}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold transition"
                >
                  <RotateCcw className="h-3 w-3" />
                  {language === 'id' ? 'Reset Filter' : 'Reset Filters'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Skema */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {language === 'id' ? 'Skema' : 'Schema'}
                </label>
                <select
                  value={selectedSchema}
                  onChange={(e) => setSelectedSchema(e.target.value)}
                  className={`w-full text-xs font-semibold rounded-xl px-3 py-2 border transition ${
                    theme === 'dark' 
                      ? 'bg-slate-900 border-white/10 text-white focus:border-indigo-400' 
                      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500'
                  }`}
                >
                  {INNOVATION_SCHEMAS.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Sub-Tema */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {language === 'id' ? 'Sub-Tema' : 'Sub-Theme'}
                </label>
                <select
                  value={selectedSubTheme}
                  onChange={(e) => setSelectedSubTheme(e.target.value)}
                  className={`w-full text-xs font-semibold rounded-xl px-3 py-2 border transition truncate ${
                    theme === 'dark' 
                      ? 'bg-slate-900 border-white/10 text-white focus:border-indigo-400' 
                      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500'
                  }`}
                >
                  {INNOVATION_SUB_THEMES.map(st => (
                    <option key={st.id} value={st.id} title={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kategori Produk */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {language === 'id' ? 'Kategori Produk' : 'Product Category'}
                </label>
                <select
                  value={selectedProductCategory}
                  onChange={(e) => setSelectedProductCategory(e.target.value)}
                  className={`w-full text-xs font-semibold rounded-xl px-3 py-2 border transition ${
                    theme === 'dark' 
                      ? 'bg-slate-900 border-white/10 text-white focus:border-indigo-400' 
                      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500'
                  }`}
                >
                  {INNOVATION_PRODUCT_CATEGORIES.map(pc => (
                    <option key={pc.id} value={pc.id}>{pc.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* PODIUM 1, 2, 3 SECTION */}
        <div key={`${activeCategory}-${selectedSchema}-${selectedSubTheme}-${selectedProductCategory}`} className="pt-6 pb-4">
          {(!rank1 && !rank2 && !rank3) ? (
            <div className={`rounded-3xl border p-12 text-center max-w-lg mx-auto backdrop-blur-xl ${
              theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white shadow-sm'
            }`}>
              <Award className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-bold text-slate-200">
                {language === 'id' ? 'Belum Ada Data Juara' : 'No Winners Data Yet'}
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                {language === 'id' 
                  ? 'Data pemenang untuk kategori atau kriteria filter ini belum dimasukkan atau sedang dalam proses rekap.' 
                  : 'Winners data for this criteria has not been uploaded yet or is being verified.'}
              </p>
              {isSubFilterActive && (
                <button
                  onClick={resetSubFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {language === 'id' ? 'Tampilkan Semua Pemenang' : 'Show All Winners'}
                </button>
              )}
            </div>
          ) : (
            <div className="relative max-w-5xl mx-auto">
              {/* Podium Visual Deck */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-end justify-center">

                {/* ================= JUARA 2 (SILVER - LEFT) ================= */}
                <div className="order-2 md:order-1 transition-all duration-700 ease-out transform translate-y-0 opacity-100 animate-slide-up-delay-1">
                  {rank2 ? (
                    <PodiumCard 
                      winner={rank2} 
                      rank={2} 
                      theme={theme}
                      categoryName={getCategoryName(rank2.categoryId)}
                      onSelect={() => handleOpenWinnerModal(rank2)}
                    />
                  ) : (
                    <EmptyPodiumStep rank={2} theme={theme} label="2nd Place" />
                  )}
                  {/* Podium Step Pillar */}
                  <div className={`hidden md:flex flex-col items-center justify-center h-48 rounded-t-2xl border-t-4 border-x border-t-slate-300 backdrop-blur-2xl relative overflow-hidden shadow-lg ${
                    theme === 'dark' 
                      ? 'border-white/10 bg-gradient-to-b from-slate-400/20 via-slate-800/60 to-slate-900/90 text-slate-200 shadow-slate-900/50' 
                      : 'border-slate-300 bg-gradient-to-b from-slate-200/90 via-slate-100/90 to-white text-slate-700 shadow-slate-200'
                  }`}>
                    <div className="text-6xl font-black tracking-tighter opacity-30 select-none">2</div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">Silver Medal</span>
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                </div>

                {/* ================= JUARA 1 (GOLD - CENTER HIGHEST) ================= */}
                <div className="order-1 md:order-2 transition-all duration-700 ease-out transform translate-y-0 opacity-100 animate-slide-up-center z-10">
                  {rank1 ? (
                    <PodiumCard 
                      winner={rank1} 
                      rank={1} 
                      theme={theme}
                      categoryName={getCategoryName(rank1.categoryId)}
                      onSelect={() => handleOpenWinnerModal(rank1)}
                      isHighest
                    />
                  ) : (
                    <EmptyPodiumStep rank={1} theme={theme} label="1st Place Champion" isHighest />
                  )}
                  {/* Podium Step Pillar */}
                  <div className={`hidden md:flex flex-col items-center justify-center h-64 rounded-t-2xl border-t-4 border-x border-t-amber-400 backdrop-blur-2xl relative overflow-hidden shadow-2xl ${
                    theme === 'dark' 
                      ? 'border-amber-500/30 bg-gradient-to-b from-amber-500/25 via-amber-950/60 to-slate-900/90 text-amber-200 shadow-amber-500/20' 
                      : 'border-amber-300 bg-gradient-to-b from-amber-100/90 via-amber-50/90 to-white text-amber-800 shadow-amber-100'
                  }`}>
                    <Crown className="h-8 w-8 text-amber-400 animate-bounce mb-1" />
                    <div className="text-7xl font-black tracking-tighter text-amber-400/50 select-none">1</div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400 mt-1">Gold Champion</span>
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                  </div>
                </div>

                {/* ================= JUARA 3 (BRONZE - RIGHT) ================= */}
                <div className="order-3 md:order-3 transition-all duration-700 ease-out transform translate-y-0 opacity-100 animate-slide-up-delay-2">
                  {rank3 ? (
                    <PodiumCard 
                      winner={rank3} 
                      rank={3} 
                      theme={theme}
                      categoryName={getCategoryName(rank3.categoryId)}
                      onSelect={() => handleOpenWinnerModal(rank3)}
                    />
                  ) : (
                    <EmptyPodiumStep rank={3} theme={theme} label="3rd Place" />
                  )}
                  {/* Podium Step Pillar */}
                  <div className={`hidden md:flex flex-col items-center justify-center h-36 rounded-t-2xl border-t-4 border-x border-t-amber-600 backdrop-blur-2xl relative overflow-hidden shadow-md ${
                    theme === 'dark' 
                      ? 'border-white/10 bg-gradient-to-b from-amber-700/20 via-slate-800/60 to-slate-900/90 text-amber-300 shadow-slate-900/50' 
                      : 'border-amber-300 bg-gradient-to-b from-amber-50/90 via-slate-100/90 to-white text-amber-900 shadow-slate-200'
                  }`}>
                    <div className="text-5xl font-black tracking-tighter opacity-30 select-none">3</div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-600/80 mt-1">Bronze Medal</span>
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* HONORABLE MENTIONS / JUARA HARAPAN SECTION */}
        {honorableMentions.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {language === 'id' ? 'Juara Harapan & Finalis Khusus' : 'Honorable Mentions & Special Finalists'}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'id' 
                    ? 'Apresiasi karya terpuji dengan penilaian tinggi dari dewan juri.' 
                    : 'Commended submissions with high evaluation scores from the judges.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {honorableMentions.map(w => {
                const wImgs = Array.isArray(w.images) && w.images.length > 0 ? w.images : (w.image ? [w.image] : [])
                return (
                  <div
                    key={w.id}
                    onClick={() => handleOpenWinnerModal(w)}
                    className={`group cursor-pointer rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${
                      theme === 'dark' 
                        ? 'border-white/10 bg-white/5 hover:border-indigo-500/40 hover:bg-white/10' 
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {w.badge || `Peringkat #${w.rank}`}
                      </span>
                      <div className="flex items-center gap-2">
                        {wImgs.length > 1 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                            <ImageIcon className="h-3 w-3" /> {wImgs.length}
                          </span>
                        )}
                        {w.score && (
                          <span className="text-xs font-bold text-amber-400">★ {w.score}</span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition line-clamp-2">
                      {w.title}
                    </h4>

                    {/* Metadata tags */}
                    {(w.schema || w.productCategory) && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {w.schema && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            {w.schema}
                          </span>
                        )}
                        {w.productCategory && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {w.productCategory}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-3 space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 font-medium text-slate-300">
                        <Users className="h-3.5 w-3.5 text-indigo-400" />
                        <span>{w.team}</span>
                      </div>
                      {w.institution && (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 text-slate-500" />
                          <span className="truncate">{w.institution}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* DETAIL MODAL WINNER WITH MULTI-IMAGE SLIDER */}
      {selectedWinner && (
        <div 
          onClick={() => setSelectedWinner(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl backdrop-blur-2xl scrollbar-thin ${
              theme === 'dark' ? 'bg-slate-900/95 border-white/20 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedWinner(null)}
              className="absolute top-5 right-5 z-20 p-2 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 transition text-slate-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 pr-10">
              <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider ${
                Number(selectedWinner.rank) === 1
                  ? 'bg-amber-400 text-amber-950 shadow-md shadow-amber-400/20'
                  : Number(selectedWinner.rank) === 2
                    ? 'bg-slate-300 text-slate-900 shadow-md'
                    : 'bg-amber-700 text-amber-100 shadow-md'
              }`}>
                {selectedWinner.badge || `Juara #${selectedWinner.rank}`}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {getCategoryName(selectedWinner.categoryId)}
              </span>
              {selectedWinner.score && (
                <span className="ml-auto text-sm font-bold text-amber-400">
                  ★ Skor: {selectedWinner.score}
                </span>
              )}
            </div>

            {/* Modal Title */}
            <h2 className="text-xl sm:text-2xl font-black mb-3 leading-snug">
              {selectedWinner.title}
            </h2>

            {/* Innovation Competition Specific Badges */}
            {(selectedWinner.schema || selectedWinner.productCategory || selectedWinner.subTheme) && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {selectedWinner.schema && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    <GraduationCap className="h-3.5 w-3.5 text-indigo-400" />
                    Skema: {selectedWinner.schema}
                  </span>
                )}
                {selectedWinner.productCategory && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    <Layers className="h-3.5 w-3.5 text-amber-400" />
                    {selectedWinner.productCategory}
                  </span>
                )}
                {selectedWinner.subTheme && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 max-w-full">
                    <Tag className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{selectedWinner.subTheme}</span>
                  </span>
                )}
              </div>
            )}

            {/* INTERACTIVE IMAGE SLIDER */}
            {modalImages.length > 0 && (
              <div className="relative w-full mb-6">
                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950/70 border border-white/10 group flex items-center justify-center">
                  <img 
                    src={modalImages[activeSlideIndex]} 
                    alt={`${selectedWinner.title} - Foto ${activeSlideIndex + 1}`}
                    className="w-full h-full object-contain sm:object-cover transition-all duration-300"
                  />

                  {/* Gradient shadow */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Counter Badge */}
                  {modalImages.length > 1 && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                      {activeSlideIndex + 1} / {modalImages.length}
                    </div>
                  )}

                  {/* Next / Prev Nav Arrows */}
                  {modalImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveSlideIndex(prev => (prev === 0 ? modalImages.length - 1 : prev - 1))
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveSlideIndex(prev => (prev === modalImages.length - 1 ? 0 : prev + 1))
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      {/* Dots Indicators */}
                      <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                        {modalImages.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveSlideIndex(idx)
                            }}
                            className={`transition-all duration-300 rounded-full ${
                              idx === activeSlideIndex 
                                ? 'w-6 h-2 bg-amber-400' 
                                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails row */}
                {modalImages.length > 1 && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin">
                    {modalImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`relative shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          idx === activeSlideIndex 
                            ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/20' 
                            : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Team & Institution Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-5">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">Tim / Inovator</span>
                <span className="text-sm font-bold text-slate-200">{selectedWinner.team}</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-bold">Asal Institusi</span>
                <span className="text-sm font-bold text-slate-200">{selectedWinner.institution || '-'}</span>
              </div>
            </div>

            {/* Description */}
            {selectedWinner.description && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Deskripsi Inovasi</span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedWinner.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Subcomponent: Podium Card on top of pillar
function PodiumCard({ winner, rank, theme, categoryName, onSelect, isHighest }) {
  const isRank1 = rank === 1
  const isRank2 = rank === 2

  const badgeTheme = isRank1 
    ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-amber-500/20 shadow-lg'
    : isRank2
      ? 'border-slate-300 bg-slate-400/20 text-slate-200 shadow-slate-400/20 shadow-lg'
      : 'border-amber-600 bg-amber-700/20 text-amber-300 shadow-amber-700/20 shadow-lg'

  const borderHighlight = isRank1
    ? 'border-amber-400/60 ring-2 ring-amber-400/30 bg-gradient-to-b from-amber-500/10 via-white/5 to-transparent'
    : isRank2
      ? 'border-slate-300/40 bg-gradient-to-b from-slate-300/10 via-white/5 to-transparent'
      : 'border-amber-600/40 bg-gradient-to-b from-amber-700/10 via-white/5 to-transparent'

  const winnerImages = Array.isArray(winner.images) && winner.images.length > 0 
    ? winner.images 
    : (winner.image ? [winner.image] : [])

  const coverImage = winnerImages[0] || null

  return (
    <div 
      onClick={onSelect}
      className={`group cursor-pointer rounded-3xl border p-5 backdrop-blur-2xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 relative mb-3 shadow-xl ${borderHighlight} ${
        theme === 'dark' ? 'bg-slate-900/80 text-white' : 'bg-white/95 text-slate-900 shadow-slate-200'
      }`}
    >
      {/* Crown / Trophy Floating Icon */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${badgeTheme}`}>
          {isRank1 ? <Crown className="h-3.5 w-3.5 text-amber-400" /> : <Medal className="h-3.5 w-3.5" />}
          <span>{winner.badge || `Juara #${rank}`}</span>
        </div>
        {winner.score && (
          <span className="text-xs font-bold text-amber-400 font-mono">
            ★ {winner.score}
          </span>
        )}
      </div>

      {/* Winner Photo / Avatar */}
      {coverImage && (
        <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-slate-950/40 border border-white/10 mb-4 group-hover:border-amber-400/50 transition">
          <img 
            src={coverImage} 
            alt={winner.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {winnerImages.length > 1 && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/20 flex items-center gap-1">
              <ImageIcon className="h-3 w-3" />
              <span>{winnerImages.length} Foto</span>
            </div>
          )}
        </div>
      )}

      {/* Title & Team */}
      <h3 className={`font-black text-sm sm:text-base leading-snug line-clamp-2 transition ${
        isRank1 ? 'text-amber-300 group-hover:text-amber-200' : 'group-hover:text-iite-cyan'
      }`}>
        {winner.title}
      </h3>

      {/* Innovation Badges if present */}
      {(winner.schema || winner.productCategory) && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {winner.schema && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
              {winner.schema}
            </span>
          )}
          {winner.productCategory && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/25">
              {winner.productCategory}
            </span>
          )}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-white/10 space-y-1 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-bold text-slate-200 truncate">
          <Users className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
          <span className="truncate">{winner.team}</span>
        </div>
        {winner.institution && (
          <div className="flex items-center gap-1.5 text-[11px] truncate">
            <Building2 className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{winner.institution}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyPodiumStep({ rank, theme, label, isHighest }) {
  return (
    <div className={`rounded-3xl border border-dashed p-6 text-center mb-3 backdrop-blur-md ${
      theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-400' : 'border-slate-300 bg-slate-50 text-slate-500'
    }`}>
      <Medal className="h-8 w-8 mx-auto mb-2 opacity-30" />
      <span className="text-xs font-bold block">{label}</span>
      <span className="text-[11px] opacity-60">Belum ada data</span>
    </div>
  )
}
