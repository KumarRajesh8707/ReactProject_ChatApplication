import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import "./UpdateTemplate.css";
import { useLocation, useNavigate } from 'react-router-dom';



export default function UpdateTemplate() {

  const [getItems, setGetItem] = useState([]);
  const [updatetemplate, setupdatetemplate] = useState();
  const [templateName, setTemplateName] = useState();
  const [templateDescription, setTemplateDescription] = useState();
  const [response, setResponse] = useState();
  const navigate = useNavigate();
  const loc = useLocation();
  console.log(loc.state);
  const apiItem = process.env.REACT_APP_GET_ITEM_DATA;
  const apikey = process.env.REACT_APP_PUT_TEMPLATE_DATA + loc.state;

  // const [templates, settemplates] = useState([]);
  const [itemarray, setitemarray] = useState([]);
  const [arraytemplate, setarraytemplate] = useState([]);

  useEffect(() => {
    axios.get(apiItem).then((response) => {
      console.log(response);
      setGetItem(response.data);
    });

  }, []);

  const handleChange = (event) => {

    console.log(event.target.checked)


    if (event.target.checked === true) {
      arraytemplate.push(event.target.value);
      console.log(arraytemplate);

    }
    if (event.target.checked === false) {
      setarraytemplate(arraytemplate.filter(item => item !== event.target.value));
      console.log(arraytemplate);
    }
  }

  const handleSubmit = () => {
    try {
      axios
        .put(apikey, {
          name: templateName,
          description: templateDescription,
          items: arraytemplate
        }, {
          headers: {
            "Content-Type": 'application/json'
          }
        })
        .then((response) => {
          console.log(response.data);
          alert("Template updated succesfully!")
          setResponse(response.data);
        });
    }
    catch (e) {
      alert("Please try again");
      console.log(e);
    }

  };




  return (
    <div className='update'>


      <Button variant="contained" className="createButton" onClick={() => navigate("/viewtemplates")}>See Templates</Button>

      <div className='updatePage'>
        <div className='updateItem'>
          <label className='updateLabel'>Template Name:</label>
          <TextField
            required
            className='updateInput'
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>
        <div className='updateItem'>
          <label className='updateLabel'>Template Description:</label>
          <TextField
            required

            className='updateInput'
            onChange={(e) => setTemplateDescription(e.target.value)}
          />
        </div>
        <ul className='updateItem'>
          {getItems.map(item => (
            <li className='updateList' key={item.itemId}>
              <input type="checkbox"
                value={item.descrption}
                onChange={handleChange}
              />{item.descrption}
            </li>
          ))}
        </ul>

        <Button variant="outlined" className='updateItem submitButton' onClick={handleSubmit}>
          update Template
        </Button>

      </div>


    </div>

  );
}