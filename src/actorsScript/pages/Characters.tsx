import { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/types';
import { getAllCharacters } from '../../redux/thunks/characterThunks';
import { Character } from '../../redux/interfaces/characterInterfaces';
import { CharacterCard } from '../components/characters/CharacterCard';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import { PageHeader } from '../components/PageHeader';
import { useTranslation } from 'react-i18next';

export const Characters = () => {
  const { t } = useTranslation('common');

  const dispatch = useDispatch<AppDispatch>();

  const { characters, loading, error } = useSelector(
    (state: RootState) => state.character,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getAllCharacters());
  }, [dispatch]);

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
      {!loading && !!characters.length && (
        <div className="card-container">{characterCards}</div>
      )}
    </div>
  );
};
