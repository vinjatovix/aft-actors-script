import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/types';
import { useEffect, useMemo, useState } from 'react';
import {
  getAllScenes,
  getScenesByBookId,
  getScenesByCharacterId
} from '../../redux/thunks/sceneThunks';
import { Scene } from '../../redux/interfaces/sceneInterfaces';
import { SceneCard } from '../components/scenes/SceneCard';
import CollectionsIcon from '@mui/icons-material/Collections';
import { PageHeader } from '../components/PageHeader';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddButton } from '../components/buttons/AddButton';
import { CreateSceneModal } from '../components/scenes/CreateSceneModal';

export const Scenes = () => {
  const { t } = useTranslation('common');

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookId = params.get('book');
  const characterId = params.get('character');
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const { books } = useSelector((state: RootState) => state.book, shallowEqual);
  const { authors } = useSelector(
    (state: RootState) => state.author,
    shallowEqual
  );

  const { scenes, loading, error } = useSelector(
    (state: RootState) => state.scene,
    shallowEqual
  );

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (bookId) {
      dispatch(getScenesByBookId(bookId));
    } else if (characterId) {
      dispatch(getScenesByCharacterId(characterId));
    } else {
      dispatch(getAllScenes());
    }
  }, [dispatch, bookId, characterId]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (bookId) {
      dispatch(getScenesByBookId(bookId));
    } else if (characterId) {
      dispatch(getScenesByCharacterId(characterId));
    } else {
      dispatch(getAllScenes());
    }
  };

  // const filteredScenes = useMemo(() => {
  //   const term = searchTerm.toLowerCase().trim();
  //   if (!term) return scenes;

  //   return scenes.filter((scene) =>
  //     scene.description.toLowerCase().includes(term)
  //   );
  // }, [scenes, searchTerm]);

  const sceneCards = useMemo(
    () => scenes.map((scene: Scene) => <SceneCard key={scene.id} {...scene} />),
    [scenes]
  );

  return (
    <div className="page">
      <PageHeader icon={<CollectionsIcon />} title={t('scenes')} />

      {loading && (
        <p>
          {t('loading')} {t('scenes')}...
        </p>
      )}

      {error && <p>Error: {error}</p>}

      {!loading && !scenes.length && <p>{t('noAvailable')}</p>}

      {!loading && !!scenes.length && (
        <div className="card-container">{sceneCards}</div>
      )}

      <AddButton icon={<CollectionsIcon />} handleClick={handleModalOpen} />
      {modalOpen && (
        <CreateSceneModal
          open={modalOpen}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};
