import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Auth.css"


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const submitLoginForm = (e) => {
    e.preventDefault();
    login({ email, password })
    .then(navigate("/"))
  };

  return (
    <>
      <div className="loginForm">
        <h2>Log In</h2>
        <form>
          <p>Email</p>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />

          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <button className="btn btn-primary" type="submit" onClick={submitLoginForm}>
            Log In
          </button>
          <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
        </form>
      </div>
    </>
  );
};
