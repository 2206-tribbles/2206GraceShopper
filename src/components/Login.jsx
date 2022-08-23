import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginUser } from "../api_adapter";
import "./components_css/Login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    const changed = event.target.id;

    if (changed === "username") {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    try {
      const user = { username, password };
      event.preventDefault();
      const result = await loginUser(user);
      props.setUser(result.user);
      console.log("THIS IS THE RESULT ", result);
      const token = result.token;
      localStorage.setItem("token", token);

      if (token !== undefined) {
        setLoggedIn("You are now logged in");
        navigate("/");
      } else {
        throw new Error("username or password is incorrect");
      }
    } catch (err) {
      setErrorMessage("Username or password is incorrect");
    }
  };
  return (
    <div className="fullPage">
      <div className="formContainer">
        <div className="tabs">
          <h2 className="activeTab">Log In</h2>
          <h2 className="otherTab">
            <Link className="tabText" to="/Register">
              Sign Up
            </Link>
          </h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputs">
            <div>
              Username:
              <input
                className="textBox"
                id="username"
                onChange={handleOnChange}
                placeholder="Username"
                value={username}
                type="text"
              />
            </div>
            <div>
              Password:
              <input
                className="textBox"
                id="password"
                onChange={handleOnChange}
                placeholder="Password"
                value={password}
                type="password"
              />
            </div>
          </div>
          <button className="button" type="submit">
            Login
          </button>
          <p className="errorMessage">{errorMessage}</p>
          <p className="yourLoggedIn">{loggedIn}</p>
        </form>
      </div>
    </div>
  );
};
export default Login;
