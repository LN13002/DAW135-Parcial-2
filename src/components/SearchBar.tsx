import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  loading: boolean
}

function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <section className="section pb-0">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form onSubmit={handleSubmit}>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Busca un libro, autor o tema..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="control">
                  <button
                    type="submit"
                    className={`button is-dark is-medium ${loading ? 'is-loading' : ''}`}
                    disabled={loading || !query.trim()}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBar
