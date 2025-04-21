import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/slices/langSlice';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/PageHeader';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Grid,
  Typography,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup
} from '@mui/material';
import { RootState } from '../../redux/types';

export const Settings = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const { t } = useTranslation('settings');

  const handleChangeLanguage = (lang: string) => {
    dispatch(setLanguage(lang));
  };

  const languages = [
    { code: 'es-GL', label: 'Galego' },
    { code: 'es', label: 'Castellano' },
    { code: 'en', label: 'English' },
    { code: 'ca', label: 'Català' },
    { code: 'eu', label: 'Euskara' },
    { code: 'fr', label: 'Français' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' },
    { code: 'ro', label: 'Română' }
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{ mt: 2 }}
    >
      <Grid size={{ xs: 12 }}>
        <PageHeader icon={<SettingsIcon />} title={t('header')} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{t('selectLanguage')}</FormLabel>
          <RadioGroup
            name="language"
            value={currentLanguage}
            onChange={(e) => handleChangeLanguage(e.target.value)}
          >
            {languages.map(({ code, label }) => (
              <FormControlLabel
                key={code}
                value={code}
                control={<Radio />}
                label={label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="body2">{t('wip')}</Typography>
      </Grid>
    </Grid>
  );
};
