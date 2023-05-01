import React, { useState } from "react";
import logo from "../../assets/react.svg";
import "./Auth.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../redux/features/authSlice";
import {api} from "../../utils/api";

const authService = {

  login: async (email, password) => {
    const response = await api.post("/accounts/api/v1/user/login/", {
      email: email,
      password: password,
    });
    return response;
  },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      response.data &&
        dispatch(
          login({
            user_id: response.data.user_id,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            email: email,
          })
        );
      response.data?.email &&
        toast.success(`successfully logged in as ${response.data.email}`);
      navigate("/");
    } catch (error) {
      console.log(error);
      error.response.data?.detail && toast.error(error.response.data.detail);
      error.response.data?.details && toast.error(error.response.data.details);
    }
  };

  return (
    <div className="auth-container">
      <main className="form-auth w-100 m-auto">
        <form onSubmit={loginRequest}>
          <img className="mb-4" src={logo} alt="" width="100" height="100" />
          <h1 className="h3 mb-3 fw-normal">Login Form</h1>

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
