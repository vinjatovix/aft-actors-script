import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { PageHeader } from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/types';
import { useEffect, useMemo, useState } from 'react';
import { getAllAuthors } from '../../redux/thunks/authorThunks';
import { Author } from '../../redux/interfaces/authorInterfaces';
import { AuthorCard } from '../components/authors/AuthorCard';
import { Button } from '@mui/material';
import { AddButton } from '../components/buttons/AddButton';
import { CreateAuthorModal } from '../components/authors/CreateAuthorModal';

export const Authors = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');
  const { authors, loading, error } = useSelector(
    (state: RootState) => state.author,
    shallowEqual
  );

  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    dispatch(getAllAuthors());
  }, [dispatch]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const filteredAuthors = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return authors;
    return authors.filter((author) => author.name.toLowerCase().includes(term));
  }, [authors, searchTerm]);

  const authorCards = filteredAuthors.map((author: Author) => (
    <AuthorCard key={author.id} {...author} />
  ));

  return (
    <div className="page">
      <PageHeader icon={<AssignmentIndIcon />} title={t('authors')} />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`${t('search')} ${t('author')}`}
        className="search-input"
      />

      <Button
        variant="outlined"
        color="info"
        onClick={() => setSearchTerm('')}
        className="reset-filter-button"
        size="small"
        sx={{ ml: '1rem' }}
      >
        {t('seeAll')}
      </Button>

      {loading && (
        <p>
          {t('loading')} {t('authors')}...
        </p>
      )}
      {error && <p>Error: {error}</p>}
      {!loading && !filteredAuthors.length && <p>{t('noAvailable')}</p>}

      {!loading && !!filteredAuthors.length && (
        <div className="card-container">{authorCards}</div>
      )}

      <AddButton
        icon={<AssignmentIndIcon />}
        handleClick={handleModalOpen}
      />
      {modalOpen && (

        <CreateAuthorModal
          open={modalOpen}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};
