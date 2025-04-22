import { Typography } from '@mui/material';
import { Scene } from '../../../redux/interfaces/sceneInterfaces';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { useTranslation } from 'react-i18next';
import React from 'react';

export const SceneCard = React.memo((scene: Scene) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { t } = useTranslation('common');

  return (
    <div key={scene.id} className="card">
      <h5> {scene.characters?.[0]?.book?.author?.name ?? 'Unknown Author'}</h5>
      <h1>
        {scene.characters?.[0]?.book?.title ?? 'Unknown Title'} -{' '}
        {scene.description}
      </h1>

      <ul>
        {scene.characters.map((character) => (
          <li key={character.id}>
            <span>{character.name}</span>
          </li>
        ))}
      </ul>
      {scene.metadata && (
        <Typography variant="body2" color="textSecondary">
          {t('updatedBy')} {scene.metadata.updatedBy}{' '}
          {getTimeAgo(scene.metadata.updatedAt, currentLanguage)}
        </Typography>
      )}
    </div>
  );
});
