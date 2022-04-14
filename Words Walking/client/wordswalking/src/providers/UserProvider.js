import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const getCurrentUser = () => {
    const currentUser = localStorage.getItem("wordsWalkingUser");
    console.log(currentUser)
    return currentUser;
  };



  const login = (userObject) => {
    fetch(`https://localhost:44381/api/User?email=${userObject.email}`)
      .then((r) => r.json())
      .then((userObjFromDB) => {

        localStorage.setItem("wordsWalkingUser", JSON.stringify(userObjFromDB));
        setIsLoggedIn(true);
      }).then(navigate("/"))
  };

  const register = (userObject) => {
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
      .then((response) => response.json())
      .then((userObject) => {
        localStorage.setItem("wordsWalkingUser", JSON.stringify(userObject));
      }).then(navigate("/"))
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ getCurrentUser, login, register, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
