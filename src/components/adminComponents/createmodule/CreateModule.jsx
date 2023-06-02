
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useEffect } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import "./CreateModule.css";
import AdminNavbar from '../adminhomepage/AdminNavbar';
import axios from 'axios';


const CreateModule = () => {
    let apiTemplate = process.env.REACT_APP_GET_TEMPLATE;
    let apiModule = process.env.REACT_APP_POST_MODULE;
    const [templates, setTemplate] = useState([]);

    const [moduleName, setmoduleName] = useState("");
    const [moduleDescription, setmoduleDescription] = useState("");

    const [arraytemplate, setarraytemplate] = useState([]);


    useEffect(() => {
        axios.get(apiTemplate).then((response) => {
            console.log(response);
            setTemplate(response.data);
        });

    }, []);

    const handleChange = (event) => {

        console.log(event.target.checked)
        let name = event.target.value;
        console.log(name);

        if (event.target.checked === true) {
            // arraytemplate.push(event.target.value);
            setarraytemplate(current => [...current, name]);
            console.log(arraytemplate);

        }
        if (event.target.checked === false) {
            setarraytemplate(arraytemplate.filter(item => item !== name));
            // setarraytemplate(arraytemplate.filter(item => item !== event.target.value));
            console.log(arraytemplate);
        }
    }
    // const handleChange = (event) => {
    //     console.log(event.target.checked)

    //     let name = event.target.value;


    //     if (event.target.checked === true) {
    //         setitemarray(current => [...current, name]);
    //         console.log(itemarray);

    //     }
    //     if (event.target.checked === false) {
    //         setitemarray(itemarray.filter(item => item !== name));
    //         console.log(itemarray);
    //     }
    // }

    // let handleSubmit=async(e)=>{
    //     e.preventDefault();
    //     console.log("saved");
    //     try {
    //         //pass items to store in database
    //       let res = await fetch("", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             moduleName: moduleName,
    //             moduleDescription: moduleDescription,
    //             template: arraytemplate,
    //         }),
    //       })
    //       //convert response to json format
    //       let resJson = await res.json();
    //       //give message to browser
    //       if (resJson.status === 200) {
    //         console.log("data save in api");
    //         setmoduleName("");
    //         setmoduleDescription("");
    //       } 
    //     } catch (err) {
    //       console.log(err);
    //     }

    // }
    let handleSubmit = async (e) => {

        e.preventDefault();
        console.log("saved");
        try {
            //pass items to store in database
            axios.post(apiModule, {
                name: moduleName,
                description: moduleDescription,
                templates: arraytemplate,
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then((response) => {
                console.log("created");
                setmoduleName("");
                setmoduleDescription("");
                alert("Module created")
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

            <Button variant="contained" className="createButton" onClick={() => navigate("/viewmodules")}>See Modules</Button>
            <div className='updatePage'>
                <div className='updateItem'>
                    <label className='updateLabel'>Module Name:</label>
                    <TextField
                        required
                        className='updateInput'
                        onChange={(e) => setmoduleName(e.target.value)}
                    />
                </div>
                <div className='updateItem'>
                    <label className='updateLabel'>Module Description:</label>
                    <TextField
                        required

                        className='updateInput'
                        onChange={(e) =>  setmoduleDescription(e.target.value)}
                    />
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
                    Create Module
                </Button>

            </div>
            


        </div>
    )
}
export default CreateModule;