import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = async (event) => {
    const { name, value } = event.target;
    setuser({ ...user, [name]: value });
  };
  const loginSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstlogin", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          variant="standard"
          type="email"
          name="email"
          required
          placeholder="Enter Email Id"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          variant="standard"
          type="password"
          name="password"
          required
          placeholder="Enter password "
          value={user.password}
          onChange={onChangeInput}
        />
        <div className="row">
          <Button variant="contained" size="medium" type="submit">
            Login
          </Button>
          <Button variant="contained" color="secondary" size="medium">
            {" "}
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
