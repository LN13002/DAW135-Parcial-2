import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bulma/css/bulma.min.css'
import './App.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import BookGrid from './components/BookGrid'
import Pagination from './components/Pagination'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import type { Book } from './components/BookCard'

const API_BASE = 'https://openlibrary.org/search.json'
const FETCH_LIMIT = 24

const CATEGORIES = [
  { label: 'Literatura',  query: 'literature',  icon: 'auto_stories',    color: '#4355b9', bg: '#dee0ff' },
  { label: 'Historia',    query: 'history',     icon: 'history_edu',     color: '#795300', bg: '#ffdeac' },
  { label: 'Ciencias',   query: 'science',     icon: 'science',         color: '#006a6a', bg: '#90efef' },
  { label: 'Filosofía',  query: 'philosophy',  icon: 'psychology',      color: '#5b3d00', bg: '#ffd7a3' },
  { label: 'Arte',       query: 'art',         icon: 'palette',         color: '#ba1a1a', bg: '#ffdad6' },
  { label: 'Tecnología', query: 'technology',  icon: 'computer',        color: '#24389c', bg: '#e8ebff' },
  { label: 'Geografía',  query: 'geography',   icon: 'public',          color: '#006a6a', bg: '#90efef' },
  { label: 'Drama',      query: 'drama',       icon: 'theater_comedy',  color: '#795300', bg: '#ffdeac' },
]

const STATS = [
  { icon: 'menu_book', value: '20M+', label: 'libros' },
  { icon: 'person',    value: '6M+',  label: 'autores' },
  { icon: 'language',  value: '100+', label: 'idiomas' },
]

interface SearchResponse {
  numFound: number
  docs: Book[]
}

function App() {
  const [books, setBooks]               = useState<Book[]>([])
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [query, setQuery]               = useState('')
  const [page, setPage]                 = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [sortBy, setSortBy]             = useState('new')
  const [subjects, setSubjects]         = useState<string[]>([])
  const [decade, setDecade]             = useState('')

  const PAGE_SIZE  = 8
  const totalPages = Math.ceil(totalResults / PAGE_SIZE)
  const hasSearched = query.trim() !== ''

  useEffect(() => {
    if (!hasSearched) return

    const fetchBooks = async () => {
      setLoading(true)
      setError(null)

      try {
        const subjectPart = subjects.map((s) => `subject:${s}`).join(' ')
        const fullQuery   = [query, subjectPart, decade].filter(Boolean).join(' ')

        const response = await axios.get<SearchResponse>(API_BASE, {
          params: { q: fullQuery, limit: FETCH_LIMIT, page, sort: sortBy, lang: 'spa' },
        })

        const withCovers = response.data.docs.filter((b) => b.cover_i)
        setBooks(withCovers)
        setTotalResults(response.data.numFound)
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? `No se pudo conectar con la API: ${err.message}`
            : 'Ocurrió un error inesperado.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [query, page, sortBy, subjects, decade, hasSearched])

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery)
    setPage(1)
  }

  const handleHome = () => {
    setQuery('')
    setBooks([])
    setTotalResults(0)
    setPage(1)
  }

  const handlePageChange = (p: number) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleApplyFilters = () => setPage(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Navbar onSearch={handleSearch} onHome={handleHome} loading={loading} />

      <div style={{ flex: 1 }}>
        {!hasSearched ? (
          /* ── Hero ───────────────────────────────────────── */
          <div className="hero-screen">
            <div className="hero-content">
              <span className="material-symbols-outlined hero-icon">menu_book</span>
              <h1 className="hero-title">Explora millones de libros</h1>
              <p className="hero-sub">Busca por título, autor o cualquier tema que te interese.</p>

              {/* Stats */}
              <div className="hero-stats">
                {STATS.map(({ icon, value, label }) => (
                  <div key={label} className="hero-stat">
                    <span className="material-symbols-outlined hero-stat-icon">{icon}</span>
                    <span className="hero-stat-value">{value}</span>
                    <span className="hero-stat-label">{label}</span>
                  </div>
                ))}
              </div>

              {/* Search */}
              <form
                className="hero-search-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  const val = (e.currentTarget.querySelector('input') as HTMLInputElement).value.trim()
                  if (val) handleSearch(val)
                }}
              >
                <div className="search-wrapper hero-search-wrapper">
                  <span className="material-symbols-outlined search-icon">search</span>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Ej: Harry Potter, Gabriel García Márquez..."
                    autoFocus
                  />
                </div>
                <button type="submit" className="btn-primary">Buscar</button>
              </form>

              {/* Categories */}
              <div className="hero-categories">
                {CATEGORIES.map(({ label, query: q, icon, color, bg }) => (
                  <button
                    key={q}
                    className="category-card"
                    style={{ '--cat-color': color, '--cat-bg': bg } as React.CSSProperties}
                    onClick={() => handleSearch(q)}
                  >
                    <span
                      className="material-symbols-outlined category-icon"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 300" }}
                    >
                      {icon}
                    </span>
                    <span className="category-label">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── Results ─────────────────────────────────────── */
          <div className="app-container">
            {!loading && <Sidebar
              sortBy={sortBy}
              onSortChange={setSortBy}
              subjects={subjects}
              onSubjectsChange={setSubjects}
              decade={decade}
              onDecadeChange={setDecade}
              onApply={handleApplyFilters}
            />}

            <main style={{ flex: 1, minWidth: 0 }}>
              <div className="results-header">
                <div>
                  <h1 className="results-title">Resultados de búsqueda</h1>
                  <p className="results-subtitle">
                    {totalResults.toLocaleString()} libros encontrados para &ldquo;{query}&rdquo;
                  </p>
                </div>
                {subjects.length > 0 && (
                  <div className="results-tags">
                    {subjects.map((s) => (
                      <span key={s} className="result-tag teal">{s}</span>
                    ))}
                  </div>
                )}
              </div>

              {loading && <LoadingSpinner />}
              {error   && <ErrorMessage message={error} />}
              {!loading && !error && books.length === 0 && (
                <div className="empty-state">
                  <span className="material-symbols-outlined empty-icon">search_off</span>
                  <p className="empty-title">Sin resultados</p>
                  <p className="empty-sub">Intenta con otro término o ajusta los filtros.</p>
                </div>
              )}
              {!loading && !error && books.length > 0 && (
                <>
                  <BookGrid books={books} />
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
              )}
            </main>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <div className="footer-inner">
          <div>
            <p className="footer-brand">OpenLibrary</p>
            <p className="footer-copy">© 2026 OpenLibrary · Conocimiento libre y accesible</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p className="footer-credit">Made with ♥ by LN13002 (Kevin Lemus)</p>
            <p style={{ marginTop: '0.25rem', fontSize: '0.8125rem', color: 'var(--cl-on-surface-variant)' }}>
              Para la asignatura de Desarrollo de Aplicaciones Web – 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
