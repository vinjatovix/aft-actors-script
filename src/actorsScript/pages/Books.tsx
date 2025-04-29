import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Book } from '../../redux/interfaces/bookInterfaces';
import { getAllBooks, getBooksByAuthorId } from '../../redux/thunks/bookThunks';
import { AppDispatch, RootState } from '../../redux/types';
import { BookCard } from '../components/books/BookCard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { PageHeader } from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

export const Books = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const authorId = params.get('author');
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const { books, loading, error } = useSelector(
    (state: RootState) => state.book,
    shallowEqual
  );
  const { authors } = useSelector(
    (state: RootState) => state.author,
    shallowEqual
  );

  useEffect(() => {
    if (authorId) {
      dispatch(getBooksByAuthorId(authorId));
    } else {
      dispatch(getAllBooks());
    }
  }, [dispatch, authorId]);

  const filteredBooks = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return books;

    return books.filter((book) => {
      const bookTitle = book.title?.toLowerCase() || '';
      const bookAuthor = book.author?.name?.toLowerCase() || '';
      return bookTitle.includes(term) || bookAuthor.includes(term);
    });
  }, [books, searchTerm]);

  const bookCards = useMemo(
    () =>
      filteredBooks.map((book: Book) => <BookCard key={book.id} {...book} />),
    [filteredBooks]
  );

  const authorName = useMemo(() => {
    if (!authorId) return null;
    const author = authors.find((a) => a.id === authorId);
    return author?.name ?? null;
  }, [authors, authorId]);

  return (
    <div className="page">
      <PageHeader
        icon={<AutoStoriesIcon />}
        title={authorName ? `${t('books')} - ${authorName}` : t('books')}
      />

      <input
        type="text"
        placeholder={`${t('search')} ${t('books')} / ${t('authors')}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading && (
        <p>
          {t('loading')} {t('books')}...
        </p>
      )}

      {error && <p>Error: {error}</p>}

      {!loading && !books.length && <p>{t('noAvailable')}</p>}

      {authorId && (
        <Button
          variant="outlined"
          color="info"
          onClick={() => navigate('/plays')}
          className="reset-filter-button"
          size="small"
          sx={{ ml: '1rem' }}
        >
          {t('seeAll')}
        </Button>
      )}

      {!loading && !!books.length && (
        <div className="card-container">{bookCards}</div>
      )}
    </div>
  );
};
