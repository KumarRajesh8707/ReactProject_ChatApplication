import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import "./UpdateModule.css";
import { useNavigate, useLocation } from 'react-router-dom';


export default function UpdateModule() {

  const [open, setOpen] = useState(false);
  const [updatemodule, setupdatemodule] = useState();
  const [moduleDescription, setModuleDescription] = useState();
  const [moduleName, setModuleName] = useState();
  const [templates, setTemplate] = useState([]);
  const [response, setResponse] = useState();
  const [arraytemplate, setarraytemplate] = useState([]);
  const navigate = useNavigate();
  const loc = useLocation();
  console.log(loc.state);
  const apiTemp = process.env.REACT_APP_GET_TEMPLATE;
  const apikey = process.env.REACT_APP_PUT_MODULE_DATA + loc.state;
  const [itemarray, setitemarray] = useState([]);

  useEffect(() => {
    axios.get(apiTemp).then((response) => {
      console.log(response);
      setTemplate(response.data);
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


  //  useEffect(()=>{

  //   fetch("")
  //   .then((res)=>res.json())
  //   .then((result)=>{
  //       settemplatedetail(result.items);
  //       console.log(result.items);
  //   });
  // },[]);

  

  const handleSubmit = () => {
    try {
      axios
        .put(apikey, {
          name: moduleName,
          description: moduleDescription,
          templates: arraytemplate
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
            <Button variant="contained" className="createButton" onClick={() => navigate("/viewmodules")}>See Modules</Button>
            <div className='updatePage'>
                <div className='updateItem'>
                    <label className='updateLabel'>Module Name:</label>
                    <TextField
                        required
                        className='updateInput'
                        onChange={(e) => setModuleName(e.target.value)}
                    />
                </div>
                <div className='updateItem'>
                    <label className='updateLabel'>Module Description:</label>
                    <TextField
                        required

                        className='updateInput'
                        onChange={(e) =>  setModuleDescription(e.target.value)}
                    />
                </div>
                <div>
                  
                </div>
                <ul className='updateItem'>
                            {templates.map(template => (
                                <li className='updateList' key={template.id}>
                                    <input type="checkbox"
                                        value={template.name}
                                        onChange={handleChange}
                                    />{template.name}
                                </li>
                            ))}
                        </ul>

                <Button variant="outlined" className='updateItem submitButton' onClick={handleSubmit}>
                    Update Module
                </Button>

            </div>
            


        </div>
   
  );
}