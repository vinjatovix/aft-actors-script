import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/types';
import { Typography } from '@mui/material';
import { refreshAuthToken } from './redux/thunks/authThunks';
import { AppRouter } from './router/AppRouter';
import { getEnv } from './helpers/getEnv';
import { AppTheme } from './theme';
import i18n from './i18n';

export const ActorsScriptApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    dispatch(refreshAuthToken());
  }, [dispatch]);

  const { ENVIRONMENT } = getEnv();
  const isDev = ENVIRONMENT !== 'production';

  return (
    <AppTheme>
      <AppRouter />
      {isDev && (
        <div className="dev-stripe">
          <Typography variant="h6">
            ENVIRONMENT: {ENVIRONMENT.toUpperCase()}
          </Typography>
        </div>
      )}
    </AppTheme>
  );
};
