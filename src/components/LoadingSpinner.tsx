function LoadingSpinner() {
  return (
    <div className="loading-section">
      <span className="material-symbols-outlined loading-spinner-icon">autorenew</span>
      <p className="loading-title">Cargando libros...</p>
      <p className="loading-sub">Consultando Open Library</p>
    </div>
  )
}

export default LoadingSpinner
