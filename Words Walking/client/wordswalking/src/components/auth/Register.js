import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import "./Auth.css"

export const Register = () => {
  // Create state variables for each form field
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  // Import the register function from our context-- we'll use this when they click submit
  const { register } = useContext(UserContext);

  // This function will run when the user has finished filling out the form and clicks submit
  const submitLoginForm = (e) => {
    e.preventDefault();
    register({  email, userName, password, firstName, lastName, address });
  };

  return (
    <>
    <h2>Register</h2>
      <form>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="userName"
        />
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
         <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="firstName"
        />
         <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="lastName"
        />
         <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
        />
        
        {/* {" "}
        <input
          type="text"
          onChange={(e) => setImageurl(e.target.value)}
          placeholder="imageurl"
        /> */}
        <button type="submit" onClick={submitLoginForm}>
          Register
        </button>
      </form>
    </>
  );
};
