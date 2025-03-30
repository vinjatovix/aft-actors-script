import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Book } from "../../redux/interfaces/bookInterfaces";
import { getAllBooks } from "../../redux/thunks/bookThunks";
import { AppDispatch, RootState } from "../../redux/store";
import { BookCard } from "../components/books/BookCard";

export const Books = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { books, loading, error } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  if (loading) {
    return <div>Cargando libros...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <img src="/assets/script.svg" alt="Icono dun pergamino" width="50" height="50" />
      <h1>Books</h1>
      {books.length === 0 ? (
        <p>No hay libros disponibles</p>
      ) : (
        books.map((book: Book) => (
          <BookCard
            key={book.id}
            {...book}
          />
        ))
      )}
    </div>
  );
};