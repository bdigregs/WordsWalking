import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { UserContext } from "../providers/UserProvider";
import Home from "../Home";
import { BookForm } from "./book/BookForm";
import { BookList } from "./book/BookList";
import { GenreProvider } from "../providers/GenreProvider";
import MyAccount from "../MyAccount";


export default function ApplicationViews() {
  const { isLoggedIn, user, getCurrentUser } = useContext(UserContext);

  console.log("this is get current user in app views", getCurrentUser())
  if (getCurrentUser() === undefined) {
    return (
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}

      </Routes>
    );
  } 
  else{
   return(
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/add" element={<BookForm />} />
        <Route path="/browse" element={<BookList />} />
        <Route path="myaccount" element={<MyAccount />} />


      </Routes>
   );
  }
}
