import { useState } from 'react'
import { Newspaper, Search, Calendar, Tag, ArrowRight, X } from 'lucide-react'
import { useTranslation } from '../i18n'
import PageLayout from '../components/PageLayout'

export default function NewsPage({ theme }) {
  const t = useTranslation()
  const p = t.pages.news
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)

  const categories = [...new Set(p.articles.map(a => a.category))]

  const filteredArticles = p.articles.filter(article => {
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <PageLayout theme={theme} accentColor="cyan">
      {(accent) => (
        <>
          {/* Article Detail Modal */}
          {selectedArticle && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
              onClick={() => setSelectedArticle(null)}
            >
              <button
                className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div
                className="max-h-[90vh] max-w-3xl w-full overflow-y-auto rounded-[28px] border border-white/10 bg-iite-dark/95 p-8 shadow-2xl backdrop-blur-xl sm:p-12"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-iite-cyan/30 bg-iite-cyan/10 px-3 py-1 text-xs font-semibold text-iite-cyan">
                    <Tag className="h-3 w-3" />
                    {selectedArticle.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {selectedArticle.date}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">{selectedArticle.title}</h2>
                <p className="mt-6 text-base leading-8 text-slate-300">{selectedArticle.summary}</p>
              </div>
            </div>
          )}

          {/* Hero */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-[32px] border border-white/10 bg-iite-dark/80 p-8 shadow-glass backdrop-blur-xl sm:p-12">
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] ${accent.badge}`}>
                  <Newspaper className="h-4 w-4" />
                  {p.badge}
                </span>
                <h1 className={`mt-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl ${accent.heading}`}>
                  {p.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                  {p.description}
                </p>
              </div>
            </div>
          </section>

          {/* Search & Filter */}
          <section className="fade-up px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={p.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 backdrop-blur-sm transition focus:border-iite-cyan/50 focus:outline-none focus:ring-1 focus:ring-iite-cyan/30"
                  />
                </div>
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      !selectedCategory
                        ? 'bg-iite-cyan text-iite-dark'
                        : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {p.allCategories}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                        selectedCategory === cat
                          ? 'bg-iite-cyan text-iite-dark'
                          : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* News Grid */}
          <section className="fade-up px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-iite-cyan">{p.latestNews}</h2>
              <h3 className="mb-8 text-3xl font-semibold text-white">{p.title}</h3>

              {filteredArticles.length === 0 ? (
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-sm">
                  <Newspaper className="mx-auto h-12 w-12 text-slate-500 mb-4" />
                  <p className="text-slate-400 text-lg">No articles found</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredArticles.map((article, i) => (
                    <article
                      key={i}
                      className="group cursor-pointer rounded-[24px] border border-white/10 bg-white/[0.04] overflow-hidden backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-iite-cyan/30 hover:bg-white/[0.08]"
                      onClick={() => setSelectedArticle(article)}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-iite-dark/80 to-transparent" />
                        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-iite-cyan/30 bg-iite-dark/70 px-3 py-1 text-xs font-semibold text-iite-cyan backdrop-blur-sm">
                          <Tag className="h-3 w-3" />
                          {article.category}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-400">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{p.publishedAt}: {article.date}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white leading-snug line-clamp-2 group-hover:text-iite-cyan transition">
                          {article.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300 line-clamp-3">
                          {article.summary}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-iite-cyan opacity-0 transition group-hover:opacity-100">
                          {p.readMore}
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </PageLayout>
  )
}
