import { Grid, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useTranslation } from 'react-i18next';

export const NothingSelectedView = () => {
  const { t } = useTranslation('characterBuilding');

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        borderRadius: 5
      }}
    >
      <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', color: 'white' }}>
        <MenuBookIcon sx={{ fontSize: 100 }} />
        <Typography variant="h6" component="div" gutterBottom>
          {t('nothingSelected')}
        </Typography>
      </Grid>
    </Grid>
  );
};
