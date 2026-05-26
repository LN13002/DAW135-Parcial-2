interface SidebarProps {
  sortBy: string
  onSortChange: (sort: string) => void
  subjects: string[]
  onSubjectsChange: (subjects: string[]) => void
  decade: string
  onDecadeChange: (decade: string) => void
  onApply: () => void
}

const SUBJECT_OPTIONS = [
  { label: 'Literatura',  query: 'literature' },
  { label: 'Historia',    query: 'history' },
  { label: 'Ciencias',   query: 'science' },
  { label: 'Filosofía',  query: 'philosophy' },
  { label: 'Arte',       query: 'art' },
]

const DECADE_OPTIONS = [
  { label: 'Todos los años',      value: '' },
  { label: '2020 – 2024',         value: 'first_publish_year:[2020 TO 2024]' },
  { label: '2010 – 2019',         value: 'first_publish_year:[2010 TO 2019]' },
  { label: '2000 – 2009',         value: 'first_publish_year:[2000 TO 2009]' },
  { label: '1990 – 1999',         value: 'first_publish_year:[1990 TO 1999]' },
  { label: '1980 – 1989',         value: 'first_publish_year:[1980 TO 1989]' },
  { label: 'Antes de 1980',       value: 'first_publish_year:[* TO 1979]' },
]

function Sidebar({ sortBy, onSortChange, subjects, onSubjectsChange, decade, onDecadeChange, onApply }: SidebarProps) {
  const toggleSubject = (query: string) => {
    onSubjectsChange(
      subjects.includes(query) ? subjects.filter((s) => s !== query) : [...subjects, query]
    )
  }

  return (
    <aside className="app-sidebar">
      <p className="sidebar-title">Filtros</p>
      <p className="sidebar-subtitle">Refina tu búsqueda</p>

      {/* Temas */}
      <div className="sidebar-section">
        <div className="sidebar-section-header active">
          <span className="material-symbols-outlined">category</span>
          Temas
        </div>
        <div className="sidebar-items">
          {SUBJECT_OPTIONS.map(({ label, query }) => (
            <label key={query}>
              <input
                type="checkbox"
                checked={subjects.includes(query)}
                onChange={() => toggleSubject(query)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Período */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span className="material-symbols-outlined">calendar_month</span>
          Período
        </div>
        <div className="sidebar-items">
          <select value={decade} onChange={(e) => onDecadeChange(e.target.value)}>
            {DECADE_OPTIONS.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ordenar por */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span className="material-symbols-outlined">sort_by_alpha</span>
          Ordenar por
        </div>
        <div className="sidebar-items">
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="new">Más recientes</option>
            <option value="old">Más antiguos</option>
            <option value="rating">Más populares</option>
            <option value="title">Título A-Z</option>
          </select>
        </div>
      </div>

      <button
        className="btn-primary"
        style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem 0' }}
        onClick={onApply}
      >
        Aplicar filtros
      </button>
    </aside>
  )
}

export default Sidebar
