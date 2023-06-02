import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import "./DeleteModule.css";
import { useNavigate } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';
//import { Label } from '@mui/icons-material';
import {useEffect,useState } from 'react';


export default function DeleteModule() {
 const [open, setOpen] = useState(false);
 const [SearchParams] = useSearchParams();
 console.log(SearchParams.get("id"));
 let [deletemodule,setdeletemodule] =useState();
 const [moduledetail,setmoduledetail] = useState();


 const navigate = useNavigate();

//  useEffect(()=>{
    
//   fetch("")
//   .then((res)=>res.json())
//   .then((result)=>{
//       setmoduledetail(result.items);
//       console.log(result.items);
//   });
// },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setdeletemodule(value);
    if(deletemodule===true){
        console.log("data deleted Sucessfully");
        fetch("",{
            method:"POST",
            body:JSON.stringify({
                itemId:"",
            })
        })
        .then(res=>res.json)
        .then(result=>{})
    }
    else{
        console.log("data don't deleted");
    }
    setOpen(false);
  }; 

  return (
    <div className='delete-div'>
    <div className="detailHead" align="left">
            <Stack spacing={3} direction="row">
            <Button variant="contained" onClick={()=>navigate("/viewmodules")}>See modules</Button>
            </Stack>
    </div>
    <div className='div'>
    <form className="form">
        <h1>Delete module</h1>
        <div className="block">
        <label>module Name:</label>
        <TextField
          disabled
        />
        <br/>
        <div/>
        <div className="block">
        <label>module Description:</label>
        <TextField
          disabled
        />
        </div>
        </div>      
        
        </form>
        </div>
    <div className='buttonstyle'>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete Module
      </Button>
      </div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Module"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to detele this Module ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(false)}>No</Button>
          <Button onClick={()=>handleClose(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}