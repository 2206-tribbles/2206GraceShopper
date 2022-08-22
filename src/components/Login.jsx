
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
        const user = {username, password}
        console.log("USER: ", user)
      event.preventDefault();
      const result = await loginUser(user);
      console.log("THIS IS THE RESULT ",result);
      const token = result.token;
      console.log(token, "token inside of login");
      localStorage.setItem("token", token);
      

      if(token !== undefined ){
        setLoggedIn("You are now logged in")
      navigate("/");}
      else{throw new Error("username or password is incorrect");}
    } catch (err) {
      setErrorMessage(
        "Username or password is incorrect"
      );
    }
  };
  return (<div className="form-Container">
    
      <h2 className="plsLogin">Please Login To Begin</h2>
      <h2 className="plsSignUp"><Link className="signUpButton" to="/Register">Sign Up</Link></h2>
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div className="">
        <div className="">
          <label className=""></label>
          <input
          className="username"
            id="username"
            onChange={handleOnChange}
            placeholder="Username"
            value={username}
            type="text"
          />
        </div>
        <label className=""></label>
        <input
        className="password"
          id="password"
          onChange={handleOnChange}
          placeholder="Password Here"
          value={password}
          type="password"
        />
        <button className="LoginButton" type="submit">
          Login
        </button>
        <p className="errorMessage">{errorMessage}</p>
        <p className="yourLoggedIn">{loggedIn}</p>
      </div>
    </form>
    
    </div>
  );
};
export default Login;