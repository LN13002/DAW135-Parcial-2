interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (p: number) => void
}

function buildPages(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '…')[] = [1]
  if (current > 3) pages.push('…')
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p)
  if (current < total - 2) pages.push('…')
  pages.push(total)
  return pages
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null
  const pages = buildPages(currentPage, Math.min(totalPages, 50))

  return (
    <nav className="app-pagination" aria-label="paginación">
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Anterior"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="page-ellipsis">…</span>
        ) : (
          <button
            key={p}
            className={`page-btn${p === currentPage ? ' active' : ''}`}
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </button>
        )
      )}

      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= Math.min(totalPages, 50)}
        aria-label="Siguiente"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  )
}

export default Pagination
