import { useState } from "react";
import { useEffect } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import { useNavigate } from "react-router-dom";
import "./CreateTemplate.css";
import AdminNavbar from '../adminhomepage/AdminNavbar';
import axios from 'axios';



const CreateTemplate = () => {
    let apiTemplate = process.env.REACT_APP_POST_TEMPLATE;
    let apiItem = process.env.REACT_APP_GET_ITEM_DATA;
    let apiPostTag = process.env.REACT_APP_POST_CATEGORY;
    let apiGetTag = process.env.REACT_APP_GET_CATEGORY;

    const [items, setItems] = useState([]);

    const [templateName, settemplateName] = useState("");
    const [templateDescription, settemplateDescription] = useState("");
    let [itemarray, setitemarray] = useState([]);
    const [tagValue, setTagValue] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState();


    useEffect(() => {
        axios.get(apiItem).then((response) => {
            console.log(response);
            setItems(response.data);
        });
        axios.get(apiGetTag).then((response) => {
            console.log(response);
            setTags(response.data);

        });

    }, []);

    const handleChange = (event) => {
        console.log(event.target.checked)

        let name = event.target.value;


        if (event.target.checked === true) {
            setitemarray(current => [...current, name]);
            console.log(itemarray);

        }
        if (event.target.checked === false) {
            setitemarray(itemarray.filter(item => item !== name));
            console.log(itemarray);
        }
    }

    // let handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("saved");
    //     console.log(itemarray);
    //     try {
    //         //pass items to store in database
    //         let res = await fetch("", {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 templateName: templateName,
    //                 templateDescription: templateDescription,
    //                 item: itemarray,
    //             }),
    //         })
    //         //convert response to json format
    //         let resJson = await res.json();
    //         //give message to browser
    //         if (resJson.status === 200) {
    //             console.log("data save in api");
    //             settemplateName("");
    //             settemplateDescription("");
    //             setitemarray = [];
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }

    // }

    const handlePostTag = (e) => {
        e.preventDefault();

        try {
            //pass items to store in database
            axios.post(apiPostTag, {
                categoryName: tagValue

            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then((response) => {
                console.log("tag created");
                setTagValue("");
                alert("Tag added successfully")
            });

        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("saved");
        try {
            //pass items to store in database
            axios.post(apiTemplate, {
                name: templateName,
                description: templateDescription,
                items: itemarray,
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then((response) => {
                console.log("created");
                settemplateName("");
                settemplateDescription("");
                setitemarray = [];
                alert("Template added successfully")
            });

        } catch (err) {
            console.log(err);
        }
    }
    console.log(selectedTag);

    const navigate = useNavigate();

    return (
        <div className='update'>
            <div>
                <AdminNavbar />
            </div>
            <ListAltIcon className="createButton" onClick={() => navigate("/viewtemplates")} />
            {/* <Button variant="contained" className="createButton" onClick={() => navigate("/viewtemplates")}>See Templates</Button> */}

            <div className='updatePage'>
                <div className="updateLeftDiv" >
                    <div className=''>
                        <label className='updateLabel'>Template Name:</label>
                        <TextField
                            required
                            className='updateInput'
                            onChange={(e) => settemplateName(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label className='updateLabel'>Template Description:</label>
                        <TextField
                            required

                            className='updateInput'
                            onChange={(e) => settemplateDescription(e.target.value)}
                        />
                    </div>
                    <Button variant="outlined" className=' submitButton' onClick={handleSubmit}>
                        Create Template
                    </Button>


                </div>
                <div className="updateRightDiv">
                    <div>
                        <Input placeholder="Search.."
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon />

                                </InputAdornment>
                            }
                        // inputProps={ariaLabel}
                        />

                    </div>
                    <div>
                        <TextField
                            placeholder="add tags.."
                            onChange={(e) => setTagValue(e.target.value)}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment className="addTag"
                                        onClick={handlePostTag}
                                        position="end">
                                        <AddCircleIcon
                                            aria-label="toggle password visibility"
                                              onClick={handlePostTag}
                                            //   onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >

                                        </AddCircleIcon>
                                    </InputAdornment>
                            }} />
                        <Select
                            // value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {tags.map((tag) => (<MenuItem key={tag[0]} value={tag[0]}>{tag[1]}</MenuItem>)

                            )}

                        </Select>
                    </div>
                    <ul className='updateItem'>
                        {items.map(item => (
                            <li className='updateList' key={item.id}>
                                <input type="checkbox"
                                    value={item.descrption}
                                    onChange={handleChange}
                                />{item.descrption}
                            </li>
                        ))}
                    </ul>

                </div>
            </div>


        </div>
    );
}
export default CreateTemplate;