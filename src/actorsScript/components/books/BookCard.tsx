import { Typography } from '@mui/material';
import { Book } from '../../../redux/interfaces/bookInterfaces';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BookCard = React.memo((book: Book) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/characters?book=${book.id}`);
  };

  return (
    <button className="card" onClick={handleClick}>
      <h2>{book.title}</h2>
      <p>{book.author.name}</p>
      {book.metadata && (
        <Typography variant="body2" color="textSecondary">
          {t('updatedBy')} {book.metadata.updatedBy}{' '}
          {getTimeAgo(book.metadata.updatedAt, currentLanguage)}
        </Typography>
      )}
    </button>
  );
});
