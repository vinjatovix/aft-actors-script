import { Book } from "../../../redux/interfaces/bookInterfaces"

export const BookCard = (book: Book) => {
    return (
        <div key={book.id}>
            <h2>{book.title}</h2>
            <p>Autor: {book.author.name}</p>
            <p>Pages: {book.pages}</p>
            <p>Creado por: {book.metadata.createdBy}</p>
            <p>Actualizado por: {book.metadata.updatedBy}</p>
            <p>Creado en: {new Date(book.metadata.createdAt).toLocaleDateString()}</p>
            <p>Actualizado en: {new Date(book.metadata.updatedAt).toLocaleDateString()}</p>
        </div>
    )
}
