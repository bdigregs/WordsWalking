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
import { BookSearch } from "./book/BookSearch";


export default function ApplicationViews() {
  const { isLoggedIn, user, getCurrentUser } = useContext(UserContext);

  const currentUser = JSON.parse(localStorage.getItem("wordsWalkingUser"))


  console.log("this is get current user in app views", getCurrentUser())
  
  if (!currentUser) {
    return (
      <Routes>
        {/* <Route path = "/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />

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
        <Route path="/register" element={<Register />} />
        <Route path="/book/edit/:bookId/*" element={<BookForm />} />
        <Route path="books/*" element={<><BookSearch /><BookList/></>} />



      </Routes>
   );
  }
}
