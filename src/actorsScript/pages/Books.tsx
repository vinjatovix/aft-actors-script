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



  return (
    <div className="page">
      <img src="/assets/script.svg" alt="Icono dun pergamino" width="50" height="50" />
      <h1>Obras</h1>

      {loading && <p>Cargando obras...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !books.length && (
        <p>No hay obras disponibles</p>
      )}

      {!loading && !!books.length && (
        <div className="card-container">
          {books.map((book: Book) => (
            <BookCard
              key={book.id}
              {...book}
            />
          ))}
        </div>
      )}
    </div>
  );
};