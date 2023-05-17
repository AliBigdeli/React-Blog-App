import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

function Header() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const email = useSelector((store) => store.auth.email)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestLogout = () => {
    dispatch(logout());
    toast.info("you have logged out");
    navigate("/");
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link
            to="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <img alt="icon" src={logo}></img>
          </Link>
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
              <h6>{email }</h6>
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
