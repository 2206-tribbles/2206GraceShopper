import { Link ,useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api_adapter"

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
      console.log("THIS IS USERNAME", username)
      const token = result.token;
      console.log("THIS IS THE RESULT: ", result)
      console.log(token, "token inside of login");
      localStorage.setItem("token", token);
      if(token !== undefined){
      setRegisteredIn("You are now registered")
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
      <h2>Please Register To Begin</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="">
            <input
              id="username"
              onChange={handleOnChange}
              placeholder="Username Here"
              value={username}
              type="text"
            />
          </div>

          <input
            id="password"
            onChange={handleOnChange}
            placeholder="Password Here"
            value={password}
            type="password"
          />
          <input
            id="first_name"
            onChange={handleOnChange}
            placeholder="First Name Here"
            value={first_name}
            type="text"
          />
         
          <input
            id="last_name"
            onChange={handleOnChange}
            placeholder="Last Name Here"
            value={last_name}
            type="text"
          />
         
          <input
            id="email"
            onChange={handleOnChange}
            placeholder="Email Here"
            value={email}
            type="text"
          />
         
          <input
            id="address"
            onChange={handleOnChange}
            placeholder="address Here"
            value={address}
            type="text"
          />
         
          <button className="button" type="submit">
            Register
          </button>
          <p className="errorMessage">{errorMessage}</p>
          <p className="registered">{registeredIn}</p>
        <p className="button">
            <Link to="/Login">you Already have an account? Log In</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
