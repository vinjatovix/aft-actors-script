import { Grid, Typography } from '@mui/material';
import { getTimeAgo } from '../../../utils/getTimeAgo';
import { useTranslation } from 'react-i18next';

export const CharacterBuildingHeader = ({
  name,
  description,
  updatedAt
}: {
  name: string;
  description: string;
  updatedAt: string | null;
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { t } = useTranslation('characterBuilding');

  return (
    <Grid>
      <Typography fontSize={39} fontWeight="light" color="primary.main">
        {name} {t('at')} {description}
      </Typography>
      {updatedAt && (
        <Typography variant="body2" color="textSecondary">
          {t('updated')} {getTimeAgo(updatedAt, currentLanguage)}
        </Typography>
      )}
    </Grid>
  );
};
