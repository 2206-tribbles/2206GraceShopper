import { Link ,useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api_adapter"
import "./components_css/SignUp.css";

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
      setUsername(event.target.value);}
      else if (changed === "password") {
      setPassword(event.target.value);}
      else if (changed === "first_name") {
      setFirst_Name(event.target.value);}
      else if (changed === "last_name") {
      setLast_Name(event.target.value);}
      else if (changed === "email") {
      setEmail(event.target.value);}
      else if (changed === "address") {
      setAddress(event.target.value);}
    
  };

  const handleSubmit = async (event) => {
    try {
    const user = {username, password, first_name, last_name, email, address}
      event.preventDefault();
      const result = await registerUser(user);
      const token = result.token;
      localStorage.setItem("token", token);
      if(token !== undefined){
        setRegisteredIn("You are now registered");
        navigate("/");}
        else {throw new Error("Username Already Registered");}
      } catch (err) {
        setErrorMessage(
          "Username Already Exists, Please Use Login Option Instead"
          );
        }
  };
  return (
    <div className="form">
      <h2 className="plsLogin2"><Link className="signUpButton" to="/Login">Log In</Link></h2>
      <h2 className="plsSignUp2">Please begin to Sign Up</h2>
      <form className="SignUpForm" onSubmit={handleSubmit}>
        <div className="">
          <div className="">
            <div className="set1">
          <input
          className="formL"
            id="first_name"
            onChange={handleOnChange}
            placeholder="First Name Here"
            value={first_name}
            type="text"
          />
         
          <input
          className="formR"
            id="last_name"
            onChange={handleOnChange}
            placeholder="Last Name Here"
            value={last_name}
            type="text"
          />
         </div>
         <div className="set2">
          <input
          className="formL"
            id="email"
            onChange={handleOnChange}
            placeholder="Email Here"
            value={email}
            type="text"
          />

         
          <input
          className="formR"
            id="address"
            onChange={handleOnChange}
            placeholder="address Here"
            value={address}
            type="text"
          />
         </div>
         <div className="set3">
            <input
            className="formLu"
              id="username"
              onChange={handleOnChange}
              placeholder="Username Here"
              value={username}
              type="text"
            />
          </div>

          <input
          className="formRp"
            id="password"
            onChange={handleOnChange}
            placeholder="Password Here"
            value={password}
            type="password"
          />
          </div>
          <button className="button" type="submit">
            Register
          </button>
          <p className="errorMessage">{errorMessage}</p>
          <p className="registered">{registeredIn}</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
