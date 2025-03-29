import { useDispatch, useSelector } from "react-redux";
import Loader from "../../actorsScript/components/Loader";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { autoClearError, registerUser } from "../../redux/slices/authSlice";
import "./authPages.css";
import { FormData, FormErrors, useFormValidation } from "../hooks/useFormValidation";

const initialFormData: FormData = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const initialErrors: FormErrors = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    validateForm,
    handleInputChange,
    formData,
    errors,
  } = useFormValidation(initialFormData, initialErrors);
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const id = uuidv4();
    dispatch(registerUser({
      id,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }));
  };

  useEffect(() => {
    if (error) {
      dispatch(autoClearError());
    }
  }, [error, dispatch]);

  const translationMap = {
    username: "Nome",
    email: "Correo",
    password: "Contrasinal",
    repeatPassword: "Confirma contrasinal",
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <h2>Rexistro</h2>
        <p>
          Xa tes conta? <a href="/login">Entra</a>
        </p>

        {["username", "email", "password", "repeatPassword"].map((field) => (
          <div key={field}>
            <input
              type={/password/i.test(field) ? "password" : "text"}
              placeholder={translationMap[field as keyof typeof translationMap]}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
            />
            {errors[field as keyof typeof errors] && (
              <p className="error-message">
                {errors[field as keyof typeof errors]}
              </p>
            )}
          </div>
        ))}

        {loading ? <Loader /> : <button type="submit">Rexístrate</button>}
        {error && <p className="error-message fade-out4s">{error}</p>}
      </form>
    </div>
  );
};
