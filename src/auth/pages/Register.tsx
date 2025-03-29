import { useDispatch, useSelector } from "react-redux";
import Loader from "../../actorsScript/components/Loader";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { autoClearError, registerUser } from "../../redux/slices/authSlice";
import "./authPages.css";
import { isInjectionFree } from "../../utils/isInjectionFree";

const initialFormData = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const initialErrors = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const validateForm = () => {
    const newErrors = { ...initialErrors };
    let valid = true;

    if (!formData.username.trim()) {
      newErrors.username = "O nome é obrigatorio";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "O correo é obrigatorio";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "O correo non é válido";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "O contrasinal é obrigatorio";
      valid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "O contrasinal debe ter polo menos 8 caracteres, unha maiúscula, unha minúscula, un número e un carácter especial (@$!%*?&)";
      valid = false;
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Os contrasinais non coinciden";
      valid = false;
    }

    for (const key in formData) {
      if (!isInjectionFree(formData[key as keyof typeof formData])) {
        newErrors[key as keyof typeof formData] = "-9000 -.-";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const id = uuidv4();
    dispatch(registerUser({ ...formData, id }));
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
