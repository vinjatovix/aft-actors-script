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
    { code: 'es-GL', label: 'Galego', flag: 'es-GL.svg' },
    { code: 'es', label: 'Castellano', flag: 'es.svg' },
    { code: 'en', label: 'English', flag: 'en.svg' },
    { code: 'ca', label: 'Català', flag: 'ca.svg' },
    { code: 'eu', label: 'Euskara', flag: 'eu.svg' },
    { code: 'fr', label: 'Français', flag: 'fr.svg' },
    { code: 'pt', label: 'Português', flag: 'pt.svg' },
    { code: 'it', label: 'Italiano', flag: 'it.svg' },
    { code: 'ro', label: 'Română', flag: 'ro.svg' }
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{ mt: 2, p: 2 }}
    >
      <Grid size={{ xs: 12 }}>
        <PageHeader icon={<SettingsIcon />} title={t('header')} />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 9, md: 6 }}
        sx={{
          border: '1px solid #e0e0e0',
          p: 2,
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">{t('selectLanguage')}</FormLabel>
          <RadioGroup
            name="language"
            value={currentLanguage}
            onChange={(e) => handleChangeLanguage(e.target.value)}
            sx={{ width: '100%' }}
          >
            <Grid container spacing={2}>
              {languages.map(({ code, label, flag }) => (
                <Grid key={code} size={{ xs: 6, sm: 4, md: 4 }}>
                  <FormControlLabel
                    value={code}
                    control={<Radio />}
                    sx={{
                      m: 0,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    label={
                      <Grid
                        container
                        alignItems="center"
                        spacing={1}
                        wrap="nowrap"
                      >
                        <Grid size="auto">
                          <img
                            src={`/assets/flags/${flag}`}
                            alt={label}
                            width={24}
                            height={16}
                            style={{
                              borderRadius: '2px',
                              objectFit: 'cover',
                              marginRight: '8px',
                              verticalAlign: 'middle'
                            }}
                          />
                        </Grid>
                        <Grid size="auto">
                          <span>{label}</span>
                        </Grid>
                      </Grid>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="body2">{t('wip')}</Typography>
      </Grid>
    </Grid>
  );
};
