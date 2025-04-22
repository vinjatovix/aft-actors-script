import { Typography } from '@mui/material';
import { Book } from '../../../redux/interfaces/bookInterfaces';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { useTranslation } from 'react-i18next';
import React from 'react';

export const BookCard = React.memo((book: Book) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { t } = useTranslation('common');
  
  return (
    <div className="card">
      <h2>{book.title}</h2>
      <p>{book.author.name}</p>
      {book.metadata && (
        <Typography variant="body2" color="textSecondary">
          {t('updatedBy')} {book.metadata.updatedBy}{' '}
          {getTimeAgo(book.metadata.updatedAt, currentLanguage)}
        </Typography>
      )}
    </div>
  );
});
