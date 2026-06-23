import React, { useState } from "react";
import "./index.css";
import type { ActiveIconType } from "#/types/header.types.ts/ActiveIconType";
import { USER } from "#/config/userConfig";
import { TbLogout } from "react-icons/tb";
import { RiMoonLine } from "react-icons/ri";
import { RiSunLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";

const Header = () => {
  const [theme, setTheme] = useState<boolean>(false);
  const [activeIcon, setActiveIcon] = useState<ActiveIconType>({
    user: false,
    theme: false,
    logout: false,
  });
  const changeTheme = (e: React.MouseEvent<HTMLLIElement>) => {
    setTheme((prev) => !prev);
    handleActiveIcon(e);
  };
  const handleActiveIcon = (e: React.MouseEvent<HTMLLIElement>) => {
    const name = e.currentTarget.dataset.name;
    setActiveIcon((prev) => {
      const active = Object.fromEntries(
        Object.entries(prev).map(([icon]) =>
          icon === name ? [name, true] : [icon, false],
        ),
      );
      return active as typeof activeIcon;
    });
  };

  return (
    <header className="main-header">
      <img className="profile-photo" src={USER.photo} alt="" />
      <h1>{USER.name}</h1>
      <ul className="icons">
        <li data-name="user" onClick={handleActiveIcon}>
          <RiUser3Line className={`icon secondary ${activeIcon.user && "active"}`}/>
        </li>
        <li data-name="theme" onClick={changeTheme}>
          {theme ? (
            <RiSunLine
              className={`icon secondary ${activeIcon.theme && "active"}`}
            />
          ) : (
            <RiMoonLine
              className={`icon secondary ${activeIcon.theme && "active"}`}
            />
          )}
        </li>
        <li data-name="logout" onClick={handleActiveIcon}>
          <TbLogout
            className={`icon secondary ${activeIcon.logout && "active"}`}
          />
        </li>
      </ul>
    </header>
  );
};
export default Header;
