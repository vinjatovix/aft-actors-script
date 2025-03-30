import { Book } from "../../../redux/interfaces/bookInterfaces"

export const BookCard = (book: Book) => {
    return (
        <div key={book.id} className="card">
            <h2>{book.title}</h2>
            <small>{new Date(book.metadata.updatedAt).toLocaleDateString()} - {book.metadata.updatedBy}</small>
            <p>Autor: {book.author.name}</p>
            <p>Pages: {book.pages}</p>
        </div>
    )
}
