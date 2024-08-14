import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons for the theme toggle

function Header() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const email = useSelector((store) => store.auth.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const requestLogout = () => {
    dispatch(logout());
    toast.info("You have logged out");
    navigate("/");
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0 d-flex align-items-center">
          <Link
            to="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <img alt="icon" src={logo} width="40" height="40"></img>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="btn btn-outline-secondary ms-3"
          >
            {darkMode ? <FaSun /> : <FaMoon />}{" "}
            {/* Icon changes based on theme */}
          </button>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary">
              Home
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="nav-link px-2">
              Blog
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/posts-management" className="nav-link px-2">
                Posts Management
              </Link>
            </li>
          )}
        </ul>

        {!isAuthenticated && (
          <div className="col-md-3 text-end">
            <Link to="/login" className="btn btn-outline-primary me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Sign-up
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="row">
            <div className="col-md-8 d-flex align-items-center justify-content-center">
              <h6>{email}</h6>
            </div>
            <div className="col-md-3 d-flex align-items-center justify-content-center">
              <button className="btn btn-primary" onClick={requestLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
