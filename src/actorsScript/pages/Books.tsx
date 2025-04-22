import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { Book } from '../../redux/interfaces/bookInterfaces';
import { getAllBooks } from '../../redux/thunks/bookThunks';
import { AppDispatch, RootState } from '../../redux/types';
import { BookCard } from '../components/books/BookCard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { PageHeader } from '../components/PageHeader';
import { useTranslation } from 'react-i18next';

export const Books = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch<AppDispatch>();

  const { books, loading, error } = useSelector(
    (state: RootState) => state.book,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const bookCards = useMemo(
    () => books.map((book: Book) => <BookCard key={book.id} {...book} />),
    [books]
  );

  return (
    <div className="page">
      <PageHeader icon={<AutoStoriesIcon />} title={t('books')} />

      {loading && (
        <p>
          {t('loading')} {t('books')}...
        </p>
      )}

      {error && <p>Error: {error}</p>}

      {!loading && !books.length && <p>{t('noAvailable')}</p>}

      {!loading && !!books.length && (
        <div className="card-container">{bookCards}</div>
      )}
    </div>
  );
};
