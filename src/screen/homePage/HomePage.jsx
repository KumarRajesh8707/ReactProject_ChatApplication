import React from 'react'
import './homepage.css'
// import { useState } from "react";
import {useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';



function HomePage() {
  const navigate = useNavigate();
  // const [click, setClick] = useState(false);

  // const handleClick = () => setClick(!click);
  return (
    <div className='container '>
      <br/>
      <br/>
      <h1> Welcome to onboarding Portal</h1>
      
    


        <div className=' allbox'>
          <Card sx={{ maxWidth: 345 }} className="card">
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image="https://www.go.ooo/img/bg-img/Login.jpg"
                alt="signup img"
              />
              <CardContent>
                {/* <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography> */}
                <Typography variant="body2" color="text.secondary">
                  Let's Get Started !

                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" className="SignupButton" variant="contained" onClick={() => navigate("/signup")}>
                SignUP
              </Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345 }} className="card">

            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY-tMVDB18yIyIv-a3SS7XXHSuiORDDTQrmkJxbS5P3i8hcOPQOFegXQSb050X7IUQoeh4__qn07c&usqp=CAU&ec=48600112"
                alt="login img"
              />
              <CardContent>
                {/* <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography> */}
                <Typography variant="body2" color="text.secondary">
                  Already have account !
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" className="SignupButton" variant="contained" onClick={() => navigate("/login")}>
                LogIn
              </Button>
            </CardActions>
          </Card>

        </div>

        {/* <Button align="center" className="SignupButton" variant="contained" onClick={() => navigate("/signup")}><span>SIGNUP</span></Button> */}

        {/* <Button align="center" className="LoginButton" variant="contained" onClick={() => navigate("/login")}>LOGIN</Button> */}



      </div>
  

  )
}

export default HomePage