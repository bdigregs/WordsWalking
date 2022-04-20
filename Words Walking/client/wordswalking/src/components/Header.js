import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import "./Header.css"
import {Navbar } from 'reactstrap';



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


      <Link to="/" className="navbar-brand" href="https://lh3.googleusercontent.com/MXl10sp3zfFJh3pTSriyo26v-Cm6Cye9VzhzSXewlnodLs_uw57nUj4hJIRUX85fjxHLJi0nDMQxdU5j5_MV-BO8m_sDQgCPk7lTAp-3PxI3S8Iw01ubLGVf6wIbFnSA_OwZbwZWCw=w500-h315-p-k">
      
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
          <Link to="/login"className="nav-link text-light">
            {!isLoggedIn ? `Logout` : `Login`}
          </Link>
        </li>
        
      </ul>
    </nav>








)
}

export default Header;


