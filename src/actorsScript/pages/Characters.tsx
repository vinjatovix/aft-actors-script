import { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/types';
import {
  getAllCharacters,
  getCharactersByBookId
} from '../../redux/thunks/characterThunks';
import { Character } from '../../redux/interfaces/characterInterfaces';
import { CharacterCard } from '../components/characters/CharacterCard';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import { PageHeader } from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const Characters = () => {
  const { t } = useTranslation('common');

  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookId = params.get('book');
  const navigate = useNavigate();

  const { characters, loading, error } = useSelector(
    (state: RootState) => state.character,
    shallowEqual
  );

  useEffect(() => {
    if (bookId) {
      dispatch(getCharactersByBookId(bookId));
    } else {
      dispatch(getAllCharacters());
    }
  }, [dispatch, bookId]);

  const characterCards = useMemo(
    () =>
      characters.map((character: Character) => (
        <CharacterCard key={character.id} {...character} />
      )),
    [characters]
  );

  return (
    <div className="page">
      <PageHeader icon={<Groups3OutlinedIcon />} title={t('characters')} />

      {loading && (
        <p>
          {t('loading')} {t('characters')}...
        </p>
      )}

      {error && <p>Error: {error}</p>}

      {!loading && !characters.length && <p>{t('noAvailable')}</p>}

      {/* {bookId && (
        <Button
          variant="outlined"
          color="info"
          onClick={() => navigate('/characters')}
          className="reset-filter-button"
          size="small"
          sx={{ ml: '1rem' }}
        >
          {t('seeAll')}
        </Button>
      )} */}

      {!loading && !!characters.length && (
        <div className="card-container">{characterCards}</div>
      )}
    </div>
  );
};
