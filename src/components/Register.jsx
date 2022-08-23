import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api_adapter"
import "./components_css/Login.css";

const Register = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [first_name, setFirst_Name] = useState();
  const [last_name, setLast_Name] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [registeredIn, setRegisteredIn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    const changed = event.target.id;
    if (changed === "username") {
      setUsername(event.target.value);
    }
    else if (changed === "password") {
      setPassword(event.target.value);
    }
    else if (changed === "first_name") {
      setFirst_Name(event.target.value);
    }
    else if (changed === "last_name") {
      setLast_Name(event.target.value);
    }
    else if (changed === "email") {
      setEmail(event.target.value);
    }
    else if (changed === "address") {
      setAddress(event.target.value);
    }

  };

  const handleSubmit = async (event) => {
    try {
      const user = { username, password, first_name, last_name, email, address }
      event.preventDefault();
      const result = await registerUser(user);
      const token = result.token;
      localStorage.setItem("token", token);
      if (token !== undefined) {
        setRegisteredIn("You are now registered");
        navigate("/");
      }
      else { throw new Error("Username Already Registered"); }
    } catch (err) {
      setErrorMessage(
        "Username Already Exists, Please Use Login Option Instead"
      );
    }
  };
  return (
    <div className="fullPage">
      <div className="form-Container">
      <div className="tabs">
        <h2 className="otherTab"><Link className="tabText" to="/Login">Log In</Link></h2>
        <h2 className="activeTab">Sign Up</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputs">

            <div>First Name:<input
              className="textBox"
              id="first_name"
              onChange={handleOnChange}
              placeholder="First Name"
              value={first_name}
              type="input"
            /></div>

            <div>Last Name:<input
              className="textBox"
              id="last_name"
              onChange={handleOnChange}
              placeholder="Last Name"
              value={last_name}
              type="input"
            /></div>

            <div>Email:<input
              className="textBox"
              id="email"
              onChange={handleOnChange}
              placeholder="Email"
              value={email}
              type="input"
            /></div>

            <div>Address:<input
              className="textBox"
              id="address"
              onChange={handleOnChange}
              placeholder="Address"
              value={address}
              type="input"
            /></div>

            <div>Username:<input
              className="textBox"
              id="username"
              onChange={handleOnChange}
              placeholder="Username"
              value={username}
              type="input"
            /></div>

            <div>Password:<input
              className="textBox"
              id="password"
              onChange={handleOnChange}
              placeholder="Password"
              value={password}
              type="password"
            /></div>
          </div>
          <button className="button" type="submit">
            Register
          </button>
          <p className="errorMessage">{errorMessage}</p>
          <p className="registered">{registeredIn}</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
