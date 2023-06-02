import React from "react";
import './Header.css';
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PopUP from "../chatCompnents/Popup";
import HomeIcon from '@mui/icons-material/Home';

import SimpleModal from "../modalComponent/SimpleModal";

const Header = (props) => {
  const loc = useLocation();
  // console.log(loc.state.loginId);
  // const loginId=loc.state.loginId;
console.log(props.paths);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => setClick(!click);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);}
  
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <img src="https://www.hcltech.com/sites/default/files/images/special-pages/supercharging-progress/supercharging-logo.svg" alt="" />
            {/* <i className="fas fa-code"></i> */}
          </NavLink>

            {props.paths==='/user' || props.paths==='/userItem'|| props.paths==='/userTemplate'?
          <ul className={click ? "nav-menu active" : "nav-menu"}>

            <li className="nav-item">
              <NavLink
                to="/user"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
           
            <li className="nav-item">
              <SimpleModal  />
            </li>
            <li className="nav-item">
              <NavLink

                to="/user/fetchsr"
                className="nav-links"
                onClick={handleClick}
              >
                My SR Request
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
              to="/chat"
              className="nav-links"
              onClick={handleClick}
              >Chat with us</NavLink>
            </li> */}
            {/* <PopUP flag={open} handleCallBack={handleClose}/>
            <li className="nav-item">
              <NavLink
                className="nav-links"
                onClick={handleClickOpen}
              >
                Chat With Us
              </NavLink>
            </li> */}

          </ul>:<div></div>}
          {  props.paths==='/user/fetchsr'?
          <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
              <NavLink
                to="/user"
                className="nav-links"
                onClick={handleClick}
              >
                <HomeIcon/>
              </NavLink>
            </li>
            </ul>:<div></div>

          }
            {  props.paths==='/admin/fetchallsr'  || props.paths==="/viewitems" || props.paths==="/viewtemplates" || props.paths==="/viewmodules"?
          <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
              <NavLink
                to="/admin"
                className="nav-links"
                onClick={handleClick}
              >
                <HomeIcon/>
              </NavLink>
            </li>
            </ul>:<div></div>

          }
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );

}
export default Header;