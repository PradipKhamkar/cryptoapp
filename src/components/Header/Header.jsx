import React from "react";
import "./Header.css";
import { BiMoon, BiSun } from "react-icons/bi";
import { FcCurrencyExchange, FcHome, FcNews } from "react-icons/fc";
import { RiApps2Line } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const navMenu = useRef();
  const navToggle = useRef();
  const navClose = useRef();

  //Show Menu
  const showMenu = () => {
    navMenu.current.classList.add("show-menu");
  };
  //Hide Menu
  const hideMenu = () => {
    navMenu.current.classList.remove("show-menu");
  };

  //Play Sound
  //   const clickSound = () => {
  //     const sound = new Audio(Click);
  //     sound.play();
  //   };

  //Dark Light Theme
  const IsDarkMode = localStorage.getItem("dark-mode");
  const isDarkIcon = localStorage.getItem("moon-icon");

  const [iconTheme, setIconTheme] = useState(
    isDarkIcon === "true" ? <BiMoon /> : <BiSun />
  );

  if (IsDarkMode === "true") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  const toggleTheme = () => {
    const darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "true") {
      localStorage.setItem("dark-mode", false);
      localStorage.setItem("moon-icon", true);
      setIconTheme(<BiMoon />);
    } else if (darkMode === null) {
      localStorage.setItem("dark-mode", true);
      localStorage.setItem("moon-icon", false);
      setIconTheme(<BiSun />);
    } else if (darkMode === "false") {
      localStorage.setItem("dark-mode", true);
      localStorage.setItem("moon-icon", false);
      setIconTheme(<BiSun />);
    }
  };

  useEffect(() => {}, [iconTheme]);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link to={"/"} className="nav__logo">
          <i className="logo__icon">
            <GiTwoCoins />
          </i>{" "}
          Cryptoverse
        </Link>
        <div className="nav__menu" id="nav-menu" ref={navMenu}>
          <ul className="nav__list grid">
            <li className="nav__item">
              <Link to={"/"} className="nav__link" id="#">
                <i className="nav__icon">
                  <FcHome />
                </i>
                Home
              </Link>
            </li>

            <li className="nav__item">
              <Link to={"/currencies"} className="nav__link">
                <i className="nav__icon">
                  <FcCurrencyExchange />
                </i>
                Currencies
              </Link>
            </li>

            <li className="nav__item">
              <Link to={"/news"} className="nav__link" id="About">
                <i className="nav__icon">
                  <FcNews />
                </i>
                News
              </Link>
            </li>
          </ul>
          <i
            className="nav__close"
            id="nav-close"
            ref={navClose}
            onClick={hideMenu}
          >
            <GrFormClose />
          </i>
        </div>
        <div className="nav__btns">
          {/* Theme Change Btn */}
          <i className="change__theme" id="theme-button" onClick={toggleTheme}>
            {iconTheme}
          </i>
          <div
            className="nav__toggle"
            id="nav-toggle"
            ref={navToggle}
            onClick={showMenu}
          >
            <i className="toggle__menu__app__icon">
              <RiApps2Line />
            </i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
