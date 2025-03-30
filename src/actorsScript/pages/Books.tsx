import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Book } from "../../redux/interfaces/bookInterfaces";
import { getAllBooks } from "../../redux/thunks/bookThunks";
import { AppDispatch, RootState } from "../../redux/store";
import { BookCard } from "../components/books/BookCard";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { PageHeader } from "../components/PageHeader";


export const Books = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { books, loading, error } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);



  return (
    <div className="page">
      <PageHeader
        icon={<AutoStoriesIcon />}
        title="Obras"
      />

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