import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../actorsScript/components/Loader";
import { useFormValidation } from "../hooks/useFormValidation";
import { autoClearError } from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { registerUser } from "../../redux/thunks/authThunks";
import { registerTranslationMap } from "../../i18n/translationMap";
import { AuthLayout } from "../layout/AuthLayout";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


export const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    validateForm,
    handleInputChange,
    formData,
    errors,
  } = useFormValidation({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(registerUser({ id: uuidv4(), ...formData, }));
  };

  useEffect(() => {
    if (error) {
      dispatch(autoClearError());
    }
  }, [error, dispatch]);

  const currentLanguage = localStorage.getItem("language") ?? "es_gl";
  const translationMap = registerTranslationMap[currentLanguage];

  const getInputType = (field: string): React.HTMLInputTypeAttribute | undefined => {
    if (/password/i.test(field)) return "password";
    return field === "email" ? "email" : "text";
  };

  const getAutocompleteProps = (field: string, isNewPassword: boolean) => {
    let autoComplete: string;
    if (field === "email") {
      autoComplete = "username";
    } else if (/password/i.test(field)) {
      autoComplete = isNewPassword ? "new-password" : "current-password";
    } else {
      autoComplete = "off";
    }


    return autoComplete
  }


  return (
    <AuthLayout title={translationMap.header}>
      <form onSubmit={handleSubmit} autoComplete="on">
        <Grid container alignItems={"center"} sx={{ border: "1px solid #e0e0e0", borderRadius: 2, padding: 2, mt: 2 }}>
          {[["username", "aaron9000"], ["email", "aaron@swartz.op"], ["password", "********"], ["repeatPassword", "****"]].map(([field, placeholder]) => (
            <Grid key={field} size={{ xs: 12, }} sx={{ mt: 2 }}>
              <TextField name={field} label={translationMap[field as keyof typeof translationMap]} type={getInputType(field)} placeholder={placeholder} fullWidth value={formData[field as keyof typeof formData]} onChange={handleInputChange} autoComplete={
                getAutocompleteProps(field, field === "password")
              } />
              {errors?.[field] && <p className="error-message">{errors[field]}</p>}
            </Grid>
          ))}

          <Grid container spacing={2} size={{ xs: 12 }} sx={{ mb: 2, padding: 2, mt: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
              {loading
                ? <Loader />
                : <Button variant="contained" fullWidth type="submit" >{translationMap.submit}</Button>}
            </Grid>

          </Grid>

          <Grid container size={{ xs: 12 }} direction="row" justifyContent="end" sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {translationMap.callToAction}
              <Link component={RouterLink} to="/login" sx={{ ml: 1, color: 'red', fontWeight: 'bold' }}>

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

