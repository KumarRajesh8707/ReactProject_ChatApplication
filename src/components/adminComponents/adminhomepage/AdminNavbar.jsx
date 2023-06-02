import React from "react";
import './AdminNavbar.css';
import { useState } from "react";
import { NavLink } from "react-router-dom" ;

const AdminNavbar = () => {
    
const [click, setClick] = useState(false);
      
const handleClick = () => setClick(!click);
    
        return (
          
            <nav className="adminbar">
                <ul className="adminList">
                  <li className="admin-item">
                    <NavLink
                      to="/viewitems"
                      className="admin-links"
                      onClick={handleClick}
                    >
                    ITEMS
                    </NavLink>
                  </li>
                  <li className="admin-item">
                    <NavLink
                      to="/viewtemplates"
                      className="admin-links admin-divider"
                      onClick={handleClick}
                    >
                      TEMPLATES
                    </NavLink>
                  </li>
                  <li className="admin-item">
                    <NavLink
                      to="/viewmodules"
                      className="admin-links"
                      onClick={handleClick}
                    >
                      MODULE
                    </NavLink>
                  </li>
                 
                </ul>
                {/* <div className="nav-icon" onClick={handleClick}>
                  <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                </div> */}
            </nav>
           
      

    );

}

export default AdminNavbar;