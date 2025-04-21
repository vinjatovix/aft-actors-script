import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/types';
import { Button, Grid, Typography } from '@mui/material';
import { AuthLayout } from '../../auth/layout/AuthLayout';
import { useFormValidation } from '../../auth/hooks/useFormValidation';
import Loader from '../components/Loader';
import { updatePassword } from '../../redux/thunks/authThunks';
import { useEffect, useState } from 'react';
import { autoClearError } from '../../redux/slices/authSlice';
import { PasswordField } from '../../components/PasswordField';
import { useTranslation } from 'react-i18next';

export const Profile = () => {
  const { t } = useTranslation('profile');

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { validateForm, handleInputChange, formData, errors, resetForm } =
    useFormValidation({
      password: '',
      oldPassword: '',
      repeatPassword: ''
    });
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const action = await dispatch(updatePassword(formData));
    if (updatePassword.fulfilled.match(action)) {
      resetForm();
      setSuccessMessage(t('updatePasswordSuccess'));

      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(autoClearError());
    }
  }, [error, dispatch]);

  const userRole = user?.roles.includes('admin') ? 'admin' : 'user';
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 2 }}>
        {userRole === 'admin' ? t('adminProfile') : t('userProfile')}
      </Typography>

      <AuthLayout title={user.username ?? t('profile')}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems={'center'}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              padding: 2
            }}
          >
            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <PasswordField
                name="password"
                label={t('newPassword')}
                value={formData.password}
                onChange={handleInputChange}
                error={errors?.password}
                placeholder="***********"
                autoComplete="new-password"
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <PasswordField
                name="repeatPassword"
                label={t('repeatPassword')}
                value={formData.repeatPassword}
                onChange={handleInputChange}
                error={errors?.repeatPassword}
                placeholder="***********"
                autoComplete="new-password"
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <PasswordField
                name="oldPassword"
                label={t('currentPassword')}
                value={formData.oldPassword}
                onChange={handleInputChange}
                error={errors?.oldPassword}
                placeholder="***********"
                autoComplete="current-password"
              />
            </Grid>

            <Grid container spacing={2} size={{ xs: 12 }} sx={{ padding: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                {loading ? (
                  <Loader />
                ) : (
                  <Button variant="contained" fullWidth type="submit">
                    {t('updatePassword')}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          {error && <p className="error-message fade-out4s">{error}</p>}
          {successMessage && (
            <p className="success-message fade-out4s">{successMessage}</p>
          )}
        </form>
      </AuthLayout>
    </>
  );
};
