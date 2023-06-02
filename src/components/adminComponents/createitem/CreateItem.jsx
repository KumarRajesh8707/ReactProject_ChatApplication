import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './CreateItem.css';
import AdminNavbar from "../adminhomepage/AdminNavbar";

const CreateItem = () => {
  let api = process.env.REACT_APP_POST_ITEM;
  const [description, setdescription] = useState("");
  const [url, seturl] = useState("");
  // const [responsetype,setresponsetype]=useState("");

  //handle submit method for submitting form
  let handleSubmit = async (e) => {

    e.preventDefault();
    console.log("saved");
    try {
      //pass items to store in database
      axios.post(api, {
        descrption: description,
        url: url
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      }).then((response) => {
        console.log("created");
        alert("Item Created");
      });

    } catch (err) {
      console.log(err);
    }
  }

  const navigate = useNavigate();

  return (
    <div className='update'>
      <div>
        <AdminNavbar />
      </div>

      <Button variant="contained" className="createButton" onClick={() => navigate("/viewitems")}>See Items</Button>
      <div className='updatePage'>

        <div className='updateItem'>
          <label className='updateLabel'>Item Description:</label>
          <TextField
            required
            className='updateInput'
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div className='updateItem'>
          <label className='updateLabel'>Item URL:</label>
          <TextField
            required

            className='updateInput'
            onChange={(e) => seturl(e.target.value)}
          />
        </div>


        <Button variant="outlined" className='updateItem submitButton' onClick={handleSubmit}>
        Create Item
        </Button>



      </div>
      </div>
  )

}
export default CreateItem;