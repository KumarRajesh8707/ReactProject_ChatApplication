import AdminNavbar from "../adminhomepage/AdminNavbar";
import "./ViewTemplates.css";
import React, { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import NextPlanIcon from '@mui/icons-material/NextPlan';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ViewTemplates = () => {
  const [dataDetails, setDataDetails] = useState([]);
  const [delTemp, setDeleteTemp] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let api = process.env.REACT_APP_GET_TEMPLATE;
  let apiDelete = process.env.REACT_APP_DELETE_TEMPLATE_DATA;

  const handleClickOpen = (value) => {
    console.log(value);
    setDeleteTemp(value);
    setOpen(true);
  };

  const handleClose = (event) => {
    console.log(event);
    console.log(delTemp);
    setOpen(false);
    if (event === "Yes") {
      axios
        .delete(apiDelete + delTemp)
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

  const updateTemplate = (value) => {
    console.log(value);
    navigate('/updatetemplate', { state: value });
  }


  return (
    <div className="mainview">
      <div>
        <AdminNavbar />
      </div>

      {/* <Button align="right" className="createButton" variant="contained" onClick={() => navigate("/createtemplate")}>Create Template</Button> */}
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
                  <EditIcon className="icon" onClick={() => { updateTemplate(row.id) }} />
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
                        Are you sure you want to delete this item?
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
                Assigned Items:

              </Typography>
              {row.items.map((item) => (
                <Typography className="carditem" variant="body2" color="text.secondary">~ {item}
                </Typography>

              ))}

            </CardContent>
          </Card>

        ))}
      </div>
      <Tooltip title="Create Template">
      <AddCircleIcon className="createCircle" onMouseOver="" onClick={() => navigate("/createtemplate")} />
      </Tooltip>
      
    </div>
  );
}

export default ViewTemplates;

{/* <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell className="tableHeading" align="center"
                >
                  <b>
                    Template Name
                  </b>
                </TableCell>
                <TableCell className="tableHeading" align="center"
                >
                  <b>
                    Template Description
                  </b>
                </TableCell>
                <TableCell className="tableHeading" align="center"
                >
                  <b>
                    Assigned Items
                  </b>
                </TableCell>
                <TableCell className="tableHeading" align="center"
                >
                  <b>
                    Actions
                  </b>
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {dataDetails.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >

                  <TableCell className='tableItem' align="center" >{row.name}</TableCell>
                  <TableCell className='tableItem' align="center" >{row.description}</TableCell>

                  <TableCell className='tableItem' align="center" >{row.items.map((item) => (
                    <span>{item}</span>
                  ))}</TableCell>
                  <TableCell align="center" >
                    <EditIcon onClick={() => { updateTemplate(row.id) }} />
                    <DeleteIcon onClick={() => { handleClickOpen(row.id) }} />
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
                  </TableCell>
                </TableRow>


              ))}
            </TableBody>
          </Table>
        </TableContainer> */}