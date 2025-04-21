import { Add } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const RelationshipCircumstancesHeader = ({
  handleAddRelation
}: {
  handleAddRelation: () => void;
}) => {
  const { t } = useTranslation('characterBuilding');

  return (
    <Grid container spacing={2} alignItems="baseline">
      <Button
        data-testid="add-relation"
        size="small"
        variant="contained"
        color="primary"
        onClick={handleAddRelation}
      >
        <Add />
      </Button>
      <Typography variant="h6">{t('relationshipCircumstances')}</Typography>
    </Grid>
  );
};
