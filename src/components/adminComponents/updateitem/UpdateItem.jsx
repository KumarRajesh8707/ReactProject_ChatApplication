import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';

import "./UpdateItem.css";
import { useLocation, useNavigate } from 'react-router-dom';

// import { useSearchParams } from 'react-router-dom';
//import { Label } from '@mui/icons-material';



export default function UpdateItem() {

  const [itemUrl, setItemUrl] = useState();
  const [itemDescription, setItemDescription] = useState();
  const [response, setResponse] = useState();
  const loc = useLocation();
  console.log(loc.state);
  const apikey = process.env.REACT_APP_PUT_ITEM_DATA + loc.state;

  const navigate = useNavigate();


  const handleSubmit = () => {
    axios
      .put(apikey, {
        descrption: itemDescription,
        url: itemUrl
      })
      .then((response) => {
        console.log(response.data);
        alert("Item updated succesfully!")
        setResponse(response.data);
      });
  };
  // if (!response) return "No post!"

  return (
    <div className='update'>

      <Button align="right" className="createButton" variant="contained" onClick={() => navigate("/viewitems")}>See Items</Button>

      <div className='updatePage'>
        <div className='updateItem'>
          <label className='updateLabel'>Item Description:</label>
          <TextField
            required
            className='updateInput'
            onChange={(e) => setItemDescription(e.target.value)}
          />
        </div>
        <div className='updateItem gap'>
          <label className='updateLabel'>Item URL:</label>
          <TextField
            required

            className='updateInput'
            onChange={(e) => setItemUrl(e.target.value)}
          />
        </div>

        <Button variant="outlined" className='updateItem submitButton' onClick={handleSubmit}>
          update Item
        </Button>

      </div>


    </div>
  );
}