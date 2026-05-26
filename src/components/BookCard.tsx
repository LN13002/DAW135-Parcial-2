import StarRating from './StarRating'

export interface Book {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
  first_publish_year?: number
  subject?: string[]
  ratings_average?: number
  ratings_count?: number
  edition_count?: number
}

interface BookCardProps {
  book: Book
}

const COVER_BASE = 'https://covers.openlibrary.org/b/id'
const PLACEHOLDER = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='300'><rect fill='%23e6e8eb' width='200' height='300'/><text fill='%23757684' font-family='Inter,sans-serif' font-size='13' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'>Sin portada</text></svg>`

function BookCard({ book }: BookCardProps) {
  const cover = book.cover_i ? `${COVER_BASE}/${book.cover_i}-M.jpg` : PLACEHOLDER
  const authors = book.author_name?.slice(0, 2).join(', ') ?? 'Autor desconocido'
  const rating = book.ratings_average
    ? Math.min(5, book.ratings_average)
    : book.edition_count
    ? Math.min(5, Math.log10(book.edition_count + 1) * 2.5)
    : 0
  const displaySubject = book.subject
    ?.find((subject) => subject.length < 30 && !subject.toLowerCase().includes('accessible'))
    ?? book.subject?.[0]

  return (
    <div className="book-card">
      <div className="book-card-cover">
        <img
          src={cover}
          alt={book.title}
          onError={(e) => { ;(e.currentTarget as HTMLImageElement).src = PLACEHOLDER }}
        />
      </div>

      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{authors}</p>

        <div className="book-card-meta">
          {book.first_publish_year && (
            <span className="book-year-tag">{book.first_publish_year}</span>
          )}
          {displaySubject && (
            <span className="book-subject-chip">{displaySubject}</span>
          )}
        </div>

        {rating > 0 && <StarRating rating={rating} count={book.ratings_count} />}

        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noreferrer"
          className="book-card-btn"
        >
          Ver en Open Library
        </a>
      </div>
    </div>
  )
}

export default BookCard
