import React, { useState } from "react";
import logo from "../../assets/react.svg";
import "./Auth.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  const registerRequest = (e) => {
    e.preventDefault();
    api
      .post("/accounts/api/v1/user/register/", {
        email: email,
        password: password,
        password1: password1,
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.detail);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        err.response.data.detail && toast.error(err.response.data.detail);
        err.response.data.details && toast.error(err.response.data.details);
      });
  };

  return (
    <div className="auth-container">
      <main className="form-auth w-100 m-auto">
        <form onSubmit={registerRequest}>
          <img className="mb-4" src={logo} alt="" width="100" height="100" />
          <h1 className="h3 mb-3 fw-normal">Registration Form</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              onChange={(e) => setPassword1(e.target.value)}
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
