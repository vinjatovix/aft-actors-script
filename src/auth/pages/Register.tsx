import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Loader from '../../actorsScript/components/Loader';
import { PasswordField } from '../../components/PasswordField';
import { autoClearError } from '../../redux/slices/authSlice';
import { AppDispatch, RootState } from '../../redux/types';
import { registerUser } from '../../redux/thunks/authThunks';
import { useFormValidation } from '../hooks/useFormValidation';
import { AuthLayout } from '../layout/AuthLayout';

export const Register = () => {
  const { t } = useTranslation('register');
  const dispatch = useDispatch<AppDispatch>();
  const { validateForm, handleInputChange, formData, errors } =
    useFormValidation({
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    });

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(registerUser({ id: uuidv4(), ...formData }));
  };

  useEffect(() => {
    if (error) {
      dispatch(autoClearError());
    }
  }, [error, dispatch]);

  return (
    <AuthLayout title={t('header')}>
      <form onSubmit={handleSubmit} autoComplete="on">
        <Grid
          container
          alignItems={'center'}
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            padding: 2,
            mt: 2
          }}
        >
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              name="username"
              label={t('username')}
              placeholder="aaron9000"
              fullWidth
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="off"
            />
            {errors?.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              name="email"
              label={t('email')}
              placeholder="aaron@swartz.op"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="username"
            />
            {errors?.email && <p className="error-message">{errors.email}</p>}
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <PasswordField
              name="password"
              label={t('password')}
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              error={errors?.password}
              autoComplete="new-password"
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <PasswordField
              name="repeatPassword"
              label={t('repeatPassword')}
              placeholder="********"
              value={formData.repeatPassword}
              onChange={handleInputChange}
              error={errors?.repeatPassword}
              autoComplete="new-password"
            />
          </Grid>

          <Grid
            container
            spacing={2}
            size={{ xs: 12 }}
            sx={{ mb: 2, padding: 2, mt: 2 }}
          >
            <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
              {loading ? (
                <Loader />
              ) : (
                <Button variant="contained" fullWidth type="submit">
                  {t('submit')}
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            size={{ xs: 12 }}
            direction="row"
            justifyContent="end"
            sx={{ mt: 2 }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              {t('callToAction')}
              <Link
                component={RouterLink}
                to="/login"
                sx={{ ml: 1, color: 'red', fontWeight: 'bold' }}
              >
                {t('action')}
              </Link>
            </Typography>
          </Grid>
        </Grid>
        {error && <p className="error-message fade-out4s">{error}</p>}
      </form>
    </AuthLayout>
  );
};
