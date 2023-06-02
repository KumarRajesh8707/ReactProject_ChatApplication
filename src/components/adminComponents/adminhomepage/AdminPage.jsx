import React from "react";
import './AdminNavbar.css';
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// import { Button, CardActionArea, CardActions } from '@mui/material';

const AdminPage = () => {
  const navigate = useNavigate();
  // const [click, setClick] = useState(false);

  // const handleClick = () => setClick(!click);

  return (

    
    <div className="adminPage">
   
      <div className="adminDiv1">
       
        <div className="adminButton color1" onClick={() => navigate("/viewitems")}><span>ITEMS</span></div>
        <div className="adminButton middleButton color2" onClick={() => navigate("/viewtemplates")}><span>TEMPLATES</span></div>
        <div className="adminButton color3" onClick={() => navigate("/viewmodules")}><span>MODULES</span></div>
        <div className="adminButton color3" onClick={()=> navigate("/admin/fetchallsr")}><span>SR REQUEST</span></div>
        {/* <img src="src\assets\mainPage.jpg" alt="img" /> */}
      </div>


    </div>

  );

}

export default AdminPage;


