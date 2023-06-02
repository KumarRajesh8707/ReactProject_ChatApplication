import AdminNavbar from "../adminhomepage/AdminNavbar";
import "./ViewModules.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';
import { red } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewModules = () => {

  const [dataDetails, setDataDetails] = useState([]);
  const [delModule, setDelModule] = useState();
  const [open, setOpen] = useState(false);
  const api = process.env.REACT_APP_GET_MODULE;
  let apiDelete = process.env.REACT_APP_DELETE_MODULE_DATA;
  const navigate = useNavigate();

  const handleClickOpen = (value) => {
    console.log(value);
    setDelModule(value);
    setOpen(true);
  };

  const handleClose = (event) => {
    console.log(event);
    console.log(delModule);
    setOpen(false);
    if (event === "Yes") {
      axios
        .delete(apiDelete + delModule)
        .then((response) => {
          alert(response.data);
          console.log(response);
          // setPost(null)
        });
    }
  }

  useEffect(() => {
    axios.get(api).then((response) => {
      console.log(response);
      setDataDetails(response.data);
    });

  }, []);

  const updateModule = (value) => {
    console.log(value);
    navigate('/updatemodule', { state: value });
  }

  return (
    <div className="mainview">
      <div>
        <AdminNavbar />
      </div>

      <Button variant="contained" className="createButton" onClick={() => navigate("/createmodule")}>Create Module</Button>

      <div className="tableContainer">
        {dataDetails.map((row) => (

          <Card key={row.id}
            // sx={{ maxWidth: 1000 }}
            className="card"
          >
            <CardHeader className="cardHead"
              avatar={
                <Avatar className="avatar" sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {row.id}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <EditIcon className="icon" onClick={() => { updateModule(row.id) }} />
                  <DeleteIcon className="icon" onClick={() => { handleClickOpen(row.id) }} />
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >

                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this Module?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => { handleClose("No") }}>No</Button>
                      <Button onClick={() => { handleClose("Yes") }}>Yes</Button>
                    </DialogActions>
                  </Dialog>
                </IconButton>
              }
              title={row.name}
            />

            <CardContent className="cardBody">
              <Typography variant="body2" className="cardHead2 " color="text.secondary">

                {row.description}
              </Typography>
              <Typography className="cardHead2" variant="h7" >
                Assigned Templates:

              </Typography>
              {row.templates.map((temp) => (
                <Typography className="carditem" variant="body2" color="text.secondary">~ {temp}
                </Typography>

              ))}

            </CardContent>
          </Card>

        ))}

      </div>
    </div>
  );
}
export default ViewModules;