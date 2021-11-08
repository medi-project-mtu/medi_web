import React from "react";
import "./navbar.css";
import Logo from "../Assets/Common/logo.png";
import { Link } from "react-router-dom";
import dood from "../Assets/Common/dood.png";
import { logout } from "../Components/Firebase";
import dashboardLogo from "../Assets/Common/dashboard.png";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export default function Navbar({ name }) {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
      if (location.pathname === "/dashboard") setCurrentPage("Dashboard");
      else if (location.pathname.includes("/profile"))
          setCurrentPage("Patient Profile");
  }, [location.pathname]);

  return (
    <div className="bg-nav">
      <div className="wrapper">
        <nav className="navbar navbar-dark">
          <div className="navbar-nav flex-row align-items-center">
            <Link className="" to="/dashboard">
              <img
                src={Logo}
                alt="Logo of mediweb"
                className="navbar-logo"
              ></img>
            </Link>
            <h3 className="ps-3 text-white">{currentPage}</h3>
          </div>
          <div className="navbar-nav flex-row align-items-center ps-5">
            <Link className="nav-link active" to="/dashboard">
              <img src={dood} alt="avatar" className="avatar-pic"></img>
            </Link>
            <Link className="nav-link active ps-3" to="/dashboard">
              <h3>{name}</h3>
            </Link>
            <div className="btn btn-light logout-button ms-3" onClick={logout}>
              Log out
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
