import AdminNavbar from "../adminhomepage/AdminNavbar";
import "./ViewItems.css";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { red } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import NextPlanIcon from '@mui/icons-material/NextPlan';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});






const ViewItems = () => {
  const [datadetails, setDataDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [delItem, setDeleteItem] = useState("");
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_GET_ITEM_DATA);
  let apiGet = process.env.REACT_APP_GET_ITEM_DATA;
  let apiDelete = process.env.REACT_APP_DELETE_ITEM_DATA;


  const handleClickOpen = (value) => {
    console.log(value);
    setDeleteItem(value);
    setOpen(true);
  };

  const handleClose = (event) => {
    console.log(event);
    console.log(delItem);

    setOpen(false);
    if (event === "Yes") {
      axios
        .delete(apiDelete + delItem)
        .then((response) => {
          alert(response.data);
          console.log(response);
          // setPost(null)
        });
    }
  };


  useEffect(() => {
    axios.get(apiGet).then((response) => {
      console.log(response);
      setDataDetails(response.data);
    });

  }, []);



  const updateItem = (value) => {
    console.log(value);
    navigate('/updateitem', { state: value });
  }

  let i = 1;
  return (

    <div className="mainview">
      <div>
        <AdminNavbar />
      </div>

      {/* <Button variant="contained" className="createButton" onClick={() => navigate("/createitem")}>Create Item</Button> */}

      <div className="tableContainer">
        <div className="itemContainer">



          {datadetails.map((row) => (


            <div className="itemDiv">
              <span className="itemIndex">{i++}.</span> 
              <p className="itemDescription">{row.descrption}</p>
              <span className="itemActions"><Tooltip title="Start course">
                <a href=""><NextPlanIcon /></a>
              </Tooltip>
                <Tooltip title="Update Item"><EditIcon className="icon"
                  onClick={() => { updateItem(row.itemId) }}
                /></Tooltip>
                <Tooltip title="Delete Item"><DeleteIcon className="icon"
                  onClick={() => { handleClickOpen(row.itemId) }}
                /></Tooltip>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >

                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      Are you sure you want to delete this item?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => { handleClose("No") }}>No</Button>
                    <Button onClick={() => { handleClose("Yes") }}>Yes</Button>
                  </DialogActions>
                </Dialog>

              </span>
            </div>


          ))}

        </div>
        <Tooltip title="Create Item">
          <AddCircleIcon className="createCircle" onMouseOver="" onClick={() => navigate("/createitem")} />
        </Tooltip>
      </div>
    </div>
  );
}
export default ViewItems;



{/* <Card key={row.itemId}
            // sx={{ maxWidth: 1000 }}
            className="card"
          >
            <CardHeader className="cardHead" sx={{ fontsize: ".5rem" }}
              avatar={
                <Avatar className="avatar" sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {i++}
                </Avatar>
              }

              title={row.descrption}
            />

            <CardContent className="cardBody">

              <Typography variant="body2" className="cardHead2 " color="text.secondary">
              <Tooltip title="Start course">
              <a href={row.url}><NextPlanIcon /></a>
              </Tooltip>
                
              </Typography>
              <Typography className="cardHead2" variant="h7" >
                Assigned Templates:

              </Typography>
              {row.templates.map((temp) => (
                <Typography className="carditem" variant="body2" color="text.secondary">~ {temp}
                </Typography>

              ))}

            </CardContent>
            <CardActions className="cardAction">
            <Tooltip title="Update Item"><EditIcon className="icon" onClick={() => { updateItem(row.itemId) }} /></Tooltip>
            <Tooltip title="Delete Item"><DeleteIcon className="icon" onClick={() => { handleClickOpen(row.itemId) }} /></Tooltip>
              
              
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >

                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete this item?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => { handleClose("No") }}>No</Button>
                  <Button onClick={() => { handleClose("Yes") }}>Yes</Button>
                </DialogActions>
              </Dialog>
            </CardActions>
          </Card> */}