import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import homeIcon from "../assets/home.svg";
import authorsIcon from "../assets/author.svg";
import playsIcon from "../assets/script.svg";
import charactersIcon from "../assets/character.svg";
import scenesIcon from "../assets/scene.svg";
import characterBuildingsIcon from "../assets/character-building.svg";
import loginIcon from "../assets/login.svg";
import logoutIcon from "../assets/logout.svg";

const navItems = [
  { to: "/authors", icon: authorsIcon, alt: "Autores", label: "DramaturgX" },
  { to: "/plays", icon: playsIcon, alt: "Obras", label: "Obras" },
  {
    to: "/characters",
    icon: charactersIcon,
    alt: "Personajes",
    label: "Persoaxes",
  },
  { to: "/scenes", icon: scenesIcon, alt: "Escenas", label: "Esceas" },
  {
    to: "/character-buildings",
    icon: characterBuildingsIcon,
    alt: "Construcciones de personajes",
    label: "Construccións",
  },
];

const NavItem = ({
  to,
  icon,
  alt,
  label,
}: {
  to: string;
  icon: string;
  alt: string;
  label: string;
}) => (
  <NavLink
    className={({ isActive }) =>
      isActive ? "nav-item active-link" : "nav-item"
    }
    to={to}
  >
    <img src={icon} className="icon" alt={alt} />
    <span>{label}</span>
  </NavLink>
);

export const NavBar = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <NavItem to="/home" icon={homeIcon} alt="Home" label="Fogar" />
        {token && navItems.map((item) => <NavItem key={item.to} {...item} />)}
      </div>

      {token ? (
        <button className="nav-item" onClick={() => dispatch(logout())}>
          <img src={logoutIcon} className="icon" alt="Cerrar sesión" />
          <span>{user?.username} Sair</span>
        </button>
      ) : (
        <NavItem
          to="/login"
          icon={loginIcon}
          alt="Iniciar sesión"
          label="Acceder"
        />
      )}
    </nav>
  );
};
