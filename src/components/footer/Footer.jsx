import React from "react";
import './Footer.css';
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Diversity1Sharp } from "@mui/icons-material";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';



const Footer = () => {

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <footer className="footerDiv">
      <img className="footerLogo" src="https://www.hcltech.com/sites/default/files/images/special-pages/supercharging-progress/supercharging-logo.svg" alt="" />

    
      <div className="footerShareIcon">
        <Link className="shareIcon"><TwitterIcon /></Link>
        <Link className="shareIcon"><FacebookIcon /></Link>
        <Link className="shareIcon"><LinkedInIcon /></Link>
        <Link className="shareIcon"><YouTubeIcon /></Link>
      </div>
      <ul className="footerList">
        <li>Privacy</li>
        <li>Terms</li>
        <li>Site Map</li>
      </ul>
    </footer>



  );

}
export default Footer;