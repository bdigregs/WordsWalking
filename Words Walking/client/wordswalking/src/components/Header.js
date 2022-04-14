import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

return (

<nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/" className="navbar-brand">
        Words Walking
      </Link>
      <ul className="navbar-nav mr-auto">
        
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Log in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/browse" className="nav-link">
            Browse
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/sell" className="nav-link">
            Sell
          </Link>
        </li>
       
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            My Account
          </Link>
        </li>
    
      </ul>
    </nav>








)
}

export default Header;


