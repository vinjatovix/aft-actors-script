import { Typography } from "@mui/material"
import { Book } from "../../../redux/interfaces/bookInterfaces"
import { getTimeAgo } from "../../../utils/getTimeAgo"

export const BookCard = (book: Book) => {
    return (
        <div key={book.id} className="card">
            <h2>{book.title}</h2>
            <Typography variant="body2" color="textSecondary">
                actualizado por {book.metadata.updatedBy} {getTimeAgo(book.metadata.updatedAt)}
            </Typography>
            <p>Autor: {book.author.name}</p>
            <p>Pages: {book.pages}</p>
        </div>
    )
}
