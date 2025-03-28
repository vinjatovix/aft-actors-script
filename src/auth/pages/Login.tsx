import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoClearError, loginUser } from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Loader from "../../actorsScript/components/Loader";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (error) {
      dispatch(autoClearError());
    }
  }, [error, dispatch]);

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInputChange}
          required
          autoComplete="current-password"
        />
        {loading ? <Loader /> : <button type="submit">Login</button>}
        {error && <p className="error-message fade-out4s">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
