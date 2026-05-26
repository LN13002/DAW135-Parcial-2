import BookCard, { type Book } from './BookCard'

interface BookGridProps {
  books: Book[]
}

function BookGrid({ books }: BookGridProps) {
  return (
    <div className="columns is-multiline">
      {books.map((book) => (
        <div key={book.key} className="column is-3-desktop is-4-tablet is-6-mobile">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  )
}

export default BookGrid
