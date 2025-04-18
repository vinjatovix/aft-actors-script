import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { RootState } from "../redux/types";

import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const navItems = [
  { to: "/authors", icon: <AssignmentIndIcon />, alt: "Autores", label: "DramaturgX" },
  { to: "/plays", icon: <AutoStoriesIcon />, alt: "Obras", label: "Obras" },
  {
    to: "/characters",
    icon: <Groups3OutlinedIcon />,
    alt: "Personajes",
    label: "Persoaxes",
  },
  {
    to: "/scenes", icon:
      <CollectionsIcon />
    , alt: "Escenas", label: "Esceas"
  },
  {
    to: "/character-buildings",
    icon: <EngineeringIcon />,
    alt: "Construcciones de personajes",
    label: "Construccións",
  },
];

const NavItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;

  label: string;
}) => (
  <NavLink
    className={({ isActive }) =>
      isActive ? "nav-item active-link" : "nav-item"
    }
    to={to}
  >

    {icon}
    <span>{label}</span>
  </NavLink>
);

export const NavBar = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="nav-bar">
      <div className="nav-links-left">
        <NavItem to="/home" label="Fogar" icon={<HomeIcon />} />
        {token && navItems.map((item) => <NavItem key={item.to} {...item} />)}
      </div>

      {token ? (
        <div className="nav-links-right">
          <NavItem
            to="/settings"
            icon={<SettingsIcon />}
            label="Axustes"
          />
          <button className="nav-item" onClick={() => {
            dispatch(logout())
            localStorage.removeItem("token");
          }}>
            <LogoutIcon />
            <span>{user?.username} Sair</span>
          </button>
        </div>
      ) : (
        <NavItem
          to="/login"
          icon={<LoginIcon />}
          label="Acceder"
        />
      )}
    </nav>
  );
};
