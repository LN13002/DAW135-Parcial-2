interface StarRatingProps {
  rating: number
  count?: number
}

function StarRating({ rating, count }: StarRatingProps) {
  const clamped = Math.max(0, Math.min(5, rating))
  const full = Math.floor(clamped)
  const hasHalf = clamped - full >= 0.25 && clamped - full < 0.75
  const empty = 5 - full - (hasHalf ? 1 : 0)

  return (
    <div className="star-row">
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      ))}
      {hasHalf && (
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          star_half
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
          star
        </span>
      ))}
      {count !== undefined && (
        <span className="rating-label">({rating.toFixed(1)})</span>
      )}
    </div>
  )
}

export default StarRating
