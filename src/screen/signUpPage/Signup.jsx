
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import './signup.css';

const SignUp = () => {
  const [postvalue, setPost] = useState();
  const [bool, setBool] = useState(false);
  const [incorrectData, setIncorrectData] = useState(false);
  const [userName, setUserName] = useState();
  const [newPassword, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let apikey = process.env.REACT_APP_POST_USER_SIGNUP;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword1 = () => setShowConfirmPassword((show2) => !show2);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {

    e.preventDefault();
    console.log("saved");
    try {
      //pass items to store in database
      axios.post(apikey, {
        userName: userName,
        email: email,
        password: newPassword,
        confirm_password: confirmPassword


      }
        , {
          headers: {
            "Content-Type": 'application/json'
          }
        }
      ).then((response) => {
        console.log(response);
        setPost(response.data);
      });

    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    console.log(postvalue);
    if (postvalue === "User signup successfully") {

      console.log(postvalue);

      navigate("/login", { state: "login" });

      alert('Registered Successfully')

      setBool(true);

    }

    if (postvalue === "Username is already exsits") {

      console.log(postvalue);

      alert('User already exsits')

      console.log("wrong");

      setBool(true);

    }

    if (postvalue === "password and confirm password must be same") {

      console.log(postvalue);

      alert('Password and confirm_password must be same')

      console.log("wrong");

      setBool(true);

    }
    else {
      console.log("wrong");
      setBool(false);
    }
  }, [postvalue])

  return (
    <div className='signUpMain'>
      <div className="signupPage" align="centre">
        <Box component="form" className="size"
          noValidate sx={{ '& > :not(style)': { m: 1 } }}>
          {incorrectData ? <div className="incorrect">Incorrect credentials</div> : <div></div>}
          <div className="feilds">
            <FormControl className="size" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">UserName</InputLabel>
              <OutlinedInput
                size='outlinedInput'
                id="outlined-adornment-password"
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />

                  </InputAdornment>
                }
                label="UserName"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="feilds">
            <FormControl className="size" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
              <OutlinedInput
                size='outlinedInput'
                id="outlined-adornment-password"
                startAdornment={
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                }
                label="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="feilds" >
            <FormControl className="size" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                startAdornment={
                  <InputAdornment position="start"> <LockIcon /></InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="feilds" >
            <FormControl className="size" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPassword ? 'text' : 'password'}
                startAdornment={
                  <InputAdornment position="start"> <LockIcon /></InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      onMouseDown={handleMouseDownPassword1}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="feilds">
            <Button className="size continue" variant="contained" onClick={handleSubmit} >Signup</Button>
          </div>

        </Box>
        Already have account? <NavLink to="/login" className="nav-link">Login Here</NavLink>

      </div>
    </div>
  )
}

export default SignUp