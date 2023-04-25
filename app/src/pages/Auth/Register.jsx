import React from "react";
import logo from "../../assets/react.svg";
import "./Auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-container">
      <main className="form-auth w-100 m-auto">
        <form>
          <img className="mb-4" src={logo} alt="" width="100" height="100" />
          <h1 className="h3 mb-3 fw-normal">Registration Form</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
            />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <label>Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
            />
            <label>Confirm Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Register
          </button>

          <p className="mt-5 text-body-secondary">
            if you already have an account,
            <Link to="/login">Login</Link>
            
          </p>
          <p className=" text-body-secondary">
            or else <Link to="/">go home</Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Register;
