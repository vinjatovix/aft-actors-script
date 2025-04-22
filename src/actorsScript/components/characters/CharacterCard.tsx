import { Typography } from '@mui/material';
import { Character } from '../../../redux/interfaces/characterInterfaces';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const CharacterCard = React.memo((character: Character) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { t } = useTranslation('common');

  return (
    <div className="card">
      {character.metadata && (
        <Typography variant="body2" color="textSecondary">
          {t('updatedBy')} {character.metadata.updatedBy}{' '}
          {getTimeAgo(character.metadata.updatedAt, currentLanguage)}
        </Typography>
      )}

      <h2>{character.name}</h2>
      <p>Obra: {character.book?.title}</p>
      <p>Autor: {character.book?.author.name}</p>
    </div>
  );
});
