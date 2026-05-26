import { useState } from 'react'

interface NavbarProps {
  onSearch: (q: string) => void
  onHome: () => void
  loading: boolean
}

function Navbar({ onSearch, onHome, loading }: NavbarProps) {
  const [draft, setDraft] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (draft.trim()) onSearch(draft.trim())
  }

  const handleHome = (e: React.MouseEvent) => {
    e.preventDefault()
    setDraft('')
    onHome()
  }

  return (
    <nav className="navbar app-navbar">
      <div className="navbar-brand">
        <a href="#" className="app-logo" onClick={handleHome}>OpenLibrary</a>
        <a href="#" className="nav-link is-active" onClick={handleHome}>Explorar</a>
      </div>

      <div className="navbar-menu">
        <div
          className="navbar-end"
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <form onSubmit={handleSubmit} style={{ flex: 1, maxWidth: '420px' }}>
            <div className="search-wrapper">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                className="search-input"
                type="text"
                placeholder="Buscar libros, autores..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                disabled={loading}
              />
              {draft.trim() && (
                <button type="submit" className="search-submit-btn" aria-label="Buscar">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
