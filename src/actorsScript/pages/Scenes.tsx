import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/types';
import { useEffect, useMemo } from 'react';
import { getAllScenes } from '../../redux/thunks/sceneThunks';
import { Scene } from '../../redux/interfaces/sceneInterfaces';
import { SceneCard } from '../components/scenes/SceneCard';
import CollectionsIcon from '@mui/icons-material/Collections';
import { PageHeader } from '../components/PageHeader';
import { useTranslation } from 'react-i18next';

export const Scenes = () => {
  const { t } = useTranslation('common');

  const dispatch = useDispatch<AppDispatch>();

  const { scenes, loading, error } = useSelector(
    (state: RootState) => state.scene,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getAllScenes());
  }, [dispatch]);

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
    </div>
  );
};
