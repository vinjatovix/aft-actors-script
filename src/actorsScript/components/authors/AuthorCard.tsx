import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Author } from '../../../redux/interfaces/authorInterfaces';
import { Typography } from '@mui/material';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { useTranslation } from 'react-i18next';

export const AuthorCard = React.memo((author: Author) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/plays?author=${author.id}`);
  };

  return (
    <button
      className="card"
      onClick={handleClick}
      tabIndex={0}
      style={{
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <h2>{author.name}</h2>
      {author.metadata && (
        <Typography variant="body2" color="textSecondary">
          {t('updatedBy')} {author.metadata.updatedBy}{' '}
          {getTimeAgo(author.metadata.updatedAt, currentLanguage)}
        </Typography>
      )}
    </button>
  );
});
