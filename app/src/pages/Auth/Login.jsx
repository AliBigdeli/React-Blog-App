import React from "react";
import logo from "../../assets/react.svg";
import "./Auth.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-container">
      <main className="form-auth w-100 m-auto">
        <form>
          <img className="mb-4" src={logo} alt="" width="100" height="100" />
          <h1 className="h3 mb-3 fw-normal">Login Form</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label>Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>

          <p className="mt-5 mb-3 text-body-secondary">
            if you dont have an account,
            <Link to="/register">register</Link>
          </p>
          <p className="mt-1 mb-3 text-body-secondary">
            or else <Link to="/">go home</Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
