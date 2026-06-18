import { useNavigate } from "react-router-dom";
import "./index.css";
import NavLink from "./navLink";
import { navLinksIcons } from "./navLinksIcons";

const NavBar = () => {
  const navigate = useNavigate();

  const reddirect = (link: string) => {
    navigate(`/${link}`);
  };

  return (
    <aside className="navbar">
      <div className="logo-content">
        <img src="./logo.png" />
        <h1>Alpine Osais</h1>
      </div>
      <ul className="nav-links">
        {navLinksIcons.map((icon) => {
          return <NavLink key={icon.id} icon={icon} reddirect={reddirect}/>;
        })}
      </ul>
    </aside>
  );
};
export default NavBar;
