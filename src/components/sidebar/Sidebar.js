import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const feather = require("feather-icons");

const Sidebar = ({ children }) => {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <div className="main">
      <div className="flex">
        {/* Side Menu */}
        <nav className="side-nav">
          <a href="" className="intro-x flex items-center pl-5 pt-4">
            <img
              alt="Rubick Tailwind HTML Admin Template"
              className="w-6"
              src="dist/images/logo.svg"
            />
            <span className="hidden xl:block text-white text-lg ml-3">
              <span className="font-medium">WIN</span> POS{" "}
            </span>
          </a>
          <div className="side-nav__devider my-6"></div>
          <ul>
            <li>
              <Link to="/pos" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="credit-card"></i>{" "}
                </div>
                <div className="side-menu__title"> POS </div>
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="trello"></i>{" "}
                </div>
                <div className="side-menu__title"> Dashboard </div>
              </Link>
            </li>
            <li>
              <Link to="/products" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="shopping-cart"></i>{" "}
                </div>
                <div className="side-menu__title"> Product </div>
              </Link>
            </li>
            <li>
              <Link to="/stat" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="pie-chart"></i>{" "}
                </div>
                <div className="side-menu__title"> Statistics </div>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="clipboard"></i>{" "}
                </div>
                <div className="side-menu__title"> Employee </div>
              </Link>
            </li>
            <li>
              <Link to="/" href="side-menu-light-chat.html" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="users"></i>{" "}
                </div>
                <div className="side-menu__title"> Profile </div>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="box"></i>{" "}
                </div>
                <div className="side-menu__title"> Package </div>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="calendar"></i>{" "}
                </div>
                <div className="side-menu__title"> Wait </div>
              </Link>
            </li>
            <li className="side-nav__devider my-6"></li>
          </ul>
        </nav>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
