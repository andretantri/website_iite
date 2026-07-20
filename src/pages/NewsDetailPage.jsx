import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Newspaper, Calendar, Tag, ArrowLeft, Share2, Eye, User, Image as ImageIcon, X, Maximize2 } from 'lucide-react'
import { useTranslation } from '../i18n'
import PageLayout from '../components/PageLayout'

function generateSlug(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export default function NewsDetailPage({ theme }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const t = useTranslation()
  const p = t.pages.news
  const [previewImage, setPreviewImage] = useState(null)

  // Find article by slug or index
  const article = p.articles.find(a => (a.slug || generateSlug(a.title)) === slug || a.title === slug) || p.articles[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!article) {
    return (
      <PageLayout theme={theme} accentColor="cyan">
        {() => (
          <div className="py-24 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Artikel Tidak Ditemukan</h2>
            <Link to="/news" className="text-iite-cyan hover:underline inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Berita
            </Link>
          </div>
        )}
      </PageLayout>
    )
  }

  // Related articles (excluding current)
  const relatedArticles = p.articles.filter(a => a.title !== article.title).slice(0, 3)

  // Parse tags if available
  const tagList = article.tags
    ? article.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : [article.category, 'IITE 2026', 'Inovasi']

  return (
    <PageLayout theme={theme} accentColor="cyan">
      {(accent) => (
        <>
          {/* Lightbox for Full-screen Image Preview */}
          {previewImage && (
            <div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md animate-fade-in cursor-zoom-out"
              onClick={() => setPreviewImage(null)}
            >
              <button
                className="absolute top-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:scale-110 z-50"
                onClick={() => setPreviewImage(null)}
                aria-label="Tutup Preview"
              >
                <X className="h-6 w-6" />
              </button>
              <div
                className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-iite-dark/90 p-2 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={typeof previewImage === 'string' ? previewImage : previewImage.src}
                  alt={typeof previewImage === 'string' ? 'Preview Gambar' : previewImage.alt || 'Preview Gambar'}
                  className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl"
                />
                {typeof previewImage === 'object' && previewImage.alt && (
                  <p className="text-center text-xs text-slate-300 py-2 font-medium px-4">
                    {previewImage.alt}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Breadcrumb & Navigation */}
          <section className="px-4 pt-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-iite-cyan hover:text-cyan-300 transition group mb-6"
              >
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                Kembali ke Portal Berita
              </Link>
            </div>
          </section>

          {/* Main Article Banner Header */}
          <section className="fade-up px-4 pb-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="rounded-[32px] border border-white/10 bg-iite-dark/90 p-8 shadow-2xl backdrop-blur-xl sm:p-12 space-y-6">
                {/* Badge & Meta */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-iite-cyan/30 bg-iite-cyan/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-iite-cyan">
                    <Tag className="h-3.5 w-3.5" />
                    {article.category || 'Berita Utama'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <User className="h-3.5 w-3.5" />
                    Humas IITE 2026
                  </span>
                </div>

                {/* Article Title */}
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
                  {article.title}
                </h1>

                {/* Summary Lead */}
                {article.summary && (
                  <p className="text-lg leading-relaxed text-slate-300 font-normal border-l-2 border-iite-cyan/50 pl-4 py-1">
                    {article.summary}
                  </p>
                )}

                {/* Tags list */}
                {tagList.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                    <span className="text-xs text-slate-400 font-semibold mr-1">Tags:</span>
                    {tagList.map((tg, idx) => (
                      <span key={idx} className="rounded-full bg-white/5 border border-white/10 px-3 py-0.5 text-[11px] font-semibold text-slate-300">
                        #{tg}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Main Featured Image - Clickable for Fullscreen Preview */}
          <section className="fade-up px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div
                className="overflow-hidden rounded-[28px] border border-white/10 shadow-2xl bg-iite-dark cursor-pointer group relative"
                onClick={() => setPreviewImage({ src: article.image || '/images/conference-poster.png', alt: article.title })}
                title="Klik untuk memperbesar gambar"
              >
                <img
                  src={article.image || '/images/conference-poster.png'}
                  alt={article.title}
                  className="w-full max-h-[520px] object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white font-bold text-sm bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <Maximize2 className="h-6 w-6 text-iite-cyan" />
                  <span>Klik untuk Memperbesar Preview Gambar</span>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Images Gallery (If available) */}
          {article.additionalImages && article.additionalImages.length > 0 && (
            <section className="fade-up px-4 py-6 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-5xl space-y-4">
                <h3 className="text-sm uppercase tracking-widest text-iite-cyan font-bold flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" /> Galeri Foto Tambahan ({article.additionalImages.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {article.additionalImages.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setPreviewImage({ src: imgUrl, alt: `${article.title} - Foto ${i + 1}` })}
                      className="group cursor-pointer aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-iite-cyan/50 transition relative shadow"
                    >
                      <img src={imgUrl} alt={`Galeri ${i + 1}`} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Full Article Content - Clickable HTML embedded images */}
          <section className="fade-up px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="rounded-[32px] border border-white/10 bg-iite-dark/80 p-8 sm:p-12 shadow-xl backdrop-blur-xl">
                <div
                  className="prose prose-invert max-w-none text-slate-200 leading-relaxed text-base sm:text-lg space-y-6 news-content-html [&_img]:cursor-pointer [&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10 [&_img]:transition [&_img]:duration-300 hover:[&_img]:opacity-95 hover:[&_img]:scale-[1.01]"
                  dangerouslySetInnerHTML={{ __html: article.content || article.summary }}
                  onClick={(e) => {
                    if (e.target.tagName === 'IMG') {
                      setPreviewImage({ src: e.target.src, alt: e.target.alt || article.title })
                    }
                  }}
                />
              </div>
            </div>
          </section>

          {/* Related News Section */}
          {relatedArticles.length > 0 && (
            <section className="fade-up px-4 py-12 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-5xl space-y-6 border-t border-white/10 pt-12">
                <h3 className="text-xl font-bold text-white">Berita Terkait Lainnya</h3>
                <div className="grid gap-6 sm:grid-cols-3">
                  {relatedArticles.map((relArt, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigate(`/news/${relArt.slug || generateSlug(relArt.title)}`)}
                      className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.04] p-4 overflow-hidden hover:border-iite-cyan/30 transition space-y-3"
                    >
                      <div className="h-36 overflow-hidden rounded-xl bg-slate-800">
                        <img src={relArt.image} alt={relArt.title} className="h-full w-full object-cover group-hover:scale-105 transition" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-iite-cyan">{relArt.category}</span>
                      <h4 className="text-sm font-bold text-white line-clamp-2 group-hover:text-iite-cyan transition">{relArt.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </PageLayout>
  )
}
