import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import "./Header.css"
import {Navbar, Button } from 'reactstrap';



const Header = () => {
  const user = JSON.parse(localStorage.getItem
    ("wordsWalkingUser"))
    const { isLoggedIn, logout } = useContext(UserContext);

    let navigate = useNavigate();

    // const logout = () => {
    //   sessionStorage.clear()
    //   setIsLoggedIn(false);
    // };
  

return (

<nav className="navbar" class="navbar navbar-expand " >


      <Link to="/" className="navbar-brand"  href="https://lh3.googleusercontent.com/hB3e4MefFx3LYk0qX4uFIwaDaf3QOvt-AVgQo7ymKlq5NbU7Rx5fLBqGFWXGs3at5JDxGUMr4w__Yzl9Qrf8Txd1Zm8_qmY0sDB21rckdmxxgNnoRXqthSrs2H_4f505e1KKTWN2mQ=w2400?source=screenshot.guru"> 
      
      </Link>
      <ul className="navbar-nav mr-auto">
        
      

        <li className="nav-item">
          <Link to="/browse" className="nav-link text-light">
            Browse
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link to="/sell" className="nav-link">
            Sell
          </Link>
        </li> */}
       
        <li className="nav-item">
          <Link to="/myaccount" className="nav-link text-light">
            My Account
          </Link>
        </li>
    
        <li className="nav-item">
          
            {!isLoggedIn ? <Button color="" className="logout text-light" onClick={logout}>Logout</Button> : <Link to="/login" className="nav-link text-light">Login</Link>}
          
        </li>
        
      </ul>
    </nav>








)
}

export default Header;


