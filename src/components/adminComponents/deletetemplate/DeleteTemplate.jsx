import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import "./DeleteTemplate.css";
import { useNavigate } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';
//import { Label } from '@mui/icons-material';
import {useEffect,useState } from 'react';


export default function DeleteTemplate() {
 const [open, setOpen] = useState(false);
 const [SearchParams] = useSearchParams();
 console.log(SearchParams.get("id"));
 let [deletetemplate,setdeletetemplate] =useState();
 const [templatedetail,settemplatedetail] = useState();


 const navigate = useNavigate();

//  useEffect(()=>{
    
//   fetch("")
//   .then((res)=>res.json())
//   .then((result)=>{
//       settemplatedetail(result.items);
//       console.log(result.items);
//   });
// },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setdeletetemplate(value);
    if(deletetemplate===true){
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
            <Button variant="contained" onClick={()=>navigate("/viewtemplates")}>See Templates</Button>
            </Stack>
    </div>
    <div className='div'>
    <form className="form">
        <h1>Delete Template</h1>
        <div className="block">
        <label>Template Name:</label>
        <TextField
          disabled
        />
        <br/>
        <div/>
        <div className="block">
        <label>Template Description:</label>
        <TextField
          disabled
        />
        </div>
        </div>      
        
        </form>
        </div>

    <div className='buttonstyle'>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete Template
      </Button>
      </div> 

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Template"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to detele this Template ?
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