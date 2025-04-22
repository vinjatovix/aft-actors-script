import { authors } from '../../../tests/data';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { PageHeader } from '../components/PageHeader';
import { useTranslation } from 'react-i18next';

export const Authors = () => {
  const { t } = useTranslation('common');
  return (
    <div className="page">
      <PageHeader icon={<AssignmentIndIcon />} title={t('authors')} />

      {authors.map((author) => (
        <div key={author.id}>
          <h2>{author.name}</h2>
        </div>
      ))}
    </div>
  );
};
