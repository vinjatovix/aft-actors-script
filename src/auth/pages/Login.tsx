import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoClearError, } from "../../redux/slices/authSlice";
import Loader from "../../actorsScript/components/Loader";
import { CallToAction } from '../../components/CallToAction';
import { InputTextField } from "../../components/InputTextField";
import { useFormValidation } from "../hooks/useFormValidation";
import { AppDispatch, RootState } from "../../redux/store";
import { loginUser } from "../../redux/thunks/authThunks";
import "./authPages.css";
import { loginTranslationMap } from "./translationMap";
import { LoginPayload } from "../../redux/interfaces/authInterfaces";

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

  const currentLanguage = localStorage.getItem("language") ?? "GL";
  const translationMap = loginTranslationMap[currentLanguage]

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <h2>{translationMap.header}</h2>
        <CallToAction callToAction={translationMap.callToAction} linkText={translationMap.action} linkPath="/register" />

        {["email", "password"].map((field) => (
          <InputTextField
            key={field}
            field={field}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            translationMap={translationMap}
          />
        ))}
        {loading
          ? <Loader />
          : <button type="submit">{translationMap.submit}</button>
        }
        {error && <p className="error-message fade-out4s">{error}</p>}
      </form>
    </div >
  );
};

export default Login;
