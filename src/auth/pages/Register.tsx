import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../actorsScript/components/Loader";
import { useFormValidation } from "../hooks/useFormValidation";
import { autoClearError } from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { registerUser } from "../../redux/thunks/authThunks";

import { CallToAction } from "../../components/CallToAction";
import { InputTextField } from "../../components/InputTextField";
import "./authPages.css";
import { registerTranslationMap } from "./translationMap";




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

  const currentLanguage = localStorage.getItem("language") ?? "GL";
  const translationMap = registerTranslationMap[currentLanguage];


  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} autoComplete="on">
        <h2>{translationMap.header}</h2>
        <CallToAction callToAction={translationMap.callToAction} linkText={translationMap.action} linkPath="/login" />

        {["username", "email", "password", "repeatPassword"].map((field) => (
          <InputTextField
            key={field}
            field={field}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            translationMap={translationMap}
            isNewPassword={field === "password"}
          />
        ))}

        {loading ? <Loader /> : <button type="submit">Rexístrate</button>}
        {error && <p className="error-message fade-out4s">{error}</p>}
      </form>
    </div>
  );
};
