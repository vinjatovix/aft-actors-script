import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/types';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../auth/layout/AuthLayout';
import { useFormValidation } from '../../auth/hooks/useFormValidation';
import Loader from '../components/Loader';
import { updatePassword } from '../../redux/thunks/authThunks';
import { useEffect } from 'react';
import { autoClearError } from '../../redux/slices/authSlice';

export const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { validateForm, handleInputChange, formData, errors } =
    useFormValidation({
      password: '',
      oldPassword: '',
      repeatPassword: ''
    });
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(updatePassword(formData));
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
        {userRole === 'admin' ? 'Perfil de administrador' : 'Perfil de usuario'}
      </Typography>

      <AuthLayout title={user.username ?? 'Perfil'}>
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
              <TextField
                key="password"
                name="password"
                label="novo contrasinal"
                type="password"
                placeholder="***********"
                fullWidth
                onChange={handleInputChange}
                value={formData.password}
              />
              {errors?.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField
                key="repeatPassword"
                name="repeatPassword"
                label="repita o novo contrasinal"
                type="password"
                placeholder="***********"
                fullWidth
                onChange={handleInputChange}
                value={formData.repeatPassword}
              />
              {errors?.repeatPassword && (
                <p className="error-message">{errors.repeatPassword}</p>
              )}
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <TextField
                key="oldPassword"
                name="oldPassword"
                label="contrasinal actual"
                type="password"
                placeholder="***********"
                fullWidth
                onChange={handleInputChange}
                value={formData.oldPassword}
              />
              {errors?.oldPassword && (
                <p className="error-message">{errors.oldPassword}</p>
              )}
            </Grid>

            <Grid container spacing={2} size={{ xs: 12 }} sx={{ padding: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                {loading ? (
                  <Loader />
                ) : (
                  <Button variant="contained" fullWidth type="submit">
                    Actualizar
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          {error && <p className="error-message fade-out4s">{error}</p>}
        </form>
      </AuthLayout>
    </>
  );
};
