import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { autoClearError } from "../../redux/slices/authSlice";
import Loader from "../../actorsScript/components/Loader";
import { PasswordField } from "../../components/PasswordField";
import { useFormValidation } from "../hooks/useFormValidation";
import { AppDispatch, RootState } from "../../redux/types";
import { loginUser } from "../../redux/thunks/authThunks";
import { loginTranslationMap } from "../../i18n/translationMap";
import { LoginPayload } from "../../redux/interfaces/authInterfaces";
import { AuthLayout } from "../layout/AuthLayout";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    validateForm,
    handleInputChange,
    formData,
    errors,
  } = useFormValidation<LoginPayload>({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (error) {
      dispatch(autoClearError());
    }
  }, [error, dispatch]);

  const currentLanguage = localStorage.getItem("language") ?? "es_gl";
  const translationMap = loginTranslationMap[currentLanguage];

  return (
    <AuthLayout title={translationMap.header}>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems={"center"} sx={{ border: "1px solid #e0e0e0", borderRadius: 2, padding: 2, mt: 2 }}>
          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <TextField
              name="email"
              label={translationMap.email}
              type="email"
              placeholder="aaron@swartz.com"
              fullWidth
              autoComplete="username"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors?.email && <p className="error-message">{errors.email}</p>}
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
            <PasswordField
              name="password"
              label={translationMap.password}
              value={formData.password}
              onChange={handleInputChange}
              error={errors?.password}
              placeholder="***********"
              autoComplete="current-password"
            />
          </Grid>

          <Grid container spacing={2} size={{ xs: 12 }} sx={{ mb: 2, padding: 2, mt: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
              <Button variant="contained" fullWidth disabled>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
              {loading ? <Loader /> : <Button variant="contained" fullWidth type="submit">{translationMap.submit}</Button>}
            </Grid>
          </Grid>

          <Grid container size={{ xs: 12 }} direction="row" justifyContent="end" sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {translationMap.callToAction}
              <Link component={RouterLink} to="/register" sx={{ ml: 1, color: 'red', fontWeight: 'bold' }}>
                {translationMap.action}
              </Link>
            </Typography>
          </Grid>
        </Grid>

        {error && <p className="error-message fade-out4s">{error}</p>}
      </form>
    </AuthLayout>
  );
};

export default Login;
