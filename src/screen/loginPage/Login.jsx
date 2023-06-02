import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import "./Login.css";
import PersonIcon from '@mui/icons-material/Person';
import { generateSrActions } from '../../store/generateSr-slice';
import { useDispatch } from 'react-redux';


const Login = () => {
  // const [get, setGet] = useState([{ message: "started" }]);
  const [postvalue, setPost] = useState();
  const [bool, setBool] = useState(false);
  const [correctData, setCorrectData] = useState(false);
  const [userName, setUserName] = useState();
  const [newPassword, setPassword] = useState();
  const navigate = useNavigate("");
  const [showPassword, setShowPassword] = useState(false);
  let apikey = process.env.REACT_APP_POST_USER_LOGIN;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch= useDispatch();

  // const handleSubmit = () => {
  //   fetch("http://localhost:8000/login", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: userName,
  //       password: newPassword
  //     })
  //   })
  //     .then(res => res.json)
  //     .then((response) => { setPost(response.data); console.log(response); });

  //   console.log(postvalue);//previous value
  // }
  const handleSubmit = (e) => {

    e.preventDefault();
    console.log("saved");
    try {
      //pass items to store in database
      axios.post(apikey + "?userName=" + userName + "&password=" + newPassword, {
        userName: userName,
        password: newPassword
      }
        , {
          headers: {
            "Content-Type": 'application/json'
          }
        }
      ).then((response) => {
        console.log(response);
        setPost(response.data);
        dispatch(generateSrActions.updateUser(userName))
      });

    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    console.log(postvalue);
    if (postvalue === "User signedUp successfully") {

      console.log(postvalue);

  
      setCorrectData(true);

      navigate("/user", "login" );

      setCorrectData(true);

    }

    if (postvalue === "User not found") {

      console.log(postvalue);

      // alert('Sorry User not found')

      console.log("wrong");

      setBool(true);

    }

    if (postvalue === "password incorrect") {

      console.log(postvalue);

      // alert('Sorry your Password is wrong')

      console.log("wrong");

      setBool(true);

    }
    else {
      console.log("wrong");
      setBool(false);
    }
  }, [postvalue])

  // const [uname, setUname] = useState();
  // const [password, setPassword] = useState();

  // async function submit() {
  //     try {
  //         await axios.post("http://localhost:50006/tokenSent",
  //             {
  //                 Name: uname,
  //                 Password: password,
  //             },
  //             { headers: { "Content-Type": "application/json", }, });
  //     }
  //     catch (error) {
  //         console.log(error);
  //         alert("Submit have issue and get failed!!!");
  //     }
  // }
  // const handlePassword = (event) => {
  //     setPassword(event.target.value);
  //     console.log(password);
  // }
  // const handleInput = (event) => {
  //     setUname(event.target.value);
  //     console.log(uname);
  // }
  return (

    <div className="loginPage" align="centre">
      <Box component="form" className="size"
        noValidate sx={{ '& > :not(style)': { m: 1 } }}>
            {correctData ? <div className="incorrect">
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">This is a success alert — check it out!</Alert>
    </Stack>


        </div> : <div></div>}
        {bool ? <div className="incorrect">
        <Stack sx={{ width: '100%' }} spacing={2}>
      
      <Alert severity="warning">check credentials  — check it out!</Alert>
      
    </Stack>


        </div> : <div></div>}
        <div className="feilds">
          <FormControl className="size" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">UserName</InputLabel>
            <OutlinedInput
              size='outlinedInput'
              id="outlined-adornment-password"
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon/>
                </InputAdornment>
              }
              label="Password"
              onChange={(event) => {
                setUserName(event.target.value);
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
        <div className="feilds">
          <Button className="size continue" variant="contained" onClick={handleSubmit} >Login</Button>
        </div>

      </Box>


    </div>

  );

}
export default Login;