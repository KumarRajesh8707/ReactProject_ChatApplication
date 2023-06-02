import React from 'react'
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import "../../srComponent/fetchSr.css";
import Input from '@mui/material/Input';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl,Select,MenuItem, TextField,Button, Tooltip } from "@mui/material";
import "./fetchallsr.css"
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
function FetchAllSr() {

  const ariaLabel = { 'aria-label': 'description' };
    const [getData, setGet] = useState([]);
    const [inputValue,setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchCategory, setSearchCategory] = useState("srNumber");
  
  
    let api = process.env.REACT_APP_GET_SR_WITH_ALLUSERNAME;
    let getApi = process.env.REACT_APP_POST_CHAT;
    useEffect(() => {
        axios.get(api).then((response) => {
            setGet(response.data);
        });
        
    }, []); 
    const filteredResponse = getData.filter(row => {
      if (searchCategory === "srNumber") {
        return row.srNumber.toString().includes(searchValue);
      }
      if (searchCategory === "createdBy") {
        return row.userName.toLowerCase().includes(searchValue.toLowerCase());
      }
      if (searchCategory === "issueType") {
        return row.issueType.toLowerCase().includes(searchValue.toLowerCase());
      }
      return true;
    });

    const showTableData = filteredResponse.length > 0;

// console.log(getData);
    //handle submit method for updating status
  let handleSubmit = async (event , srNumber) => {
console.log(srNumber)
    try {
  
      axios.post("http://localhost:8080/sr/status", {
      "srid": srNumber,
      "status": "Closed"
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      }).then((response) => {
       console.log("closed");
       window.location.reload();
      
      });

    } catch (err) {
      console.log(err);
    }
  }

    async function postComment(inputValue,srNumber ){
      window.location.reload();
      try{
        const response = await axios.post(getApi,{
          
            srNumber: srNumber,
            chatType: "Admin",
            chatMessages: inputValue
          },
         {
            headers: {
              "Content-Type": 'application/json'
            }
          }
          )
          if(response.status==200){
            console.log(" comment added")
            setInputValue({});
          }

      }catch(error){
        console.log(error)
      }
    }
    const handleInputChange = async (event,srNumber) => {
      const {value} = event.target;
      setInputValue((preInputValues)=>({
        ...preInputValues,
        [srNumber]:value
      }));
      if (event.key === 'Enter'){
        await postComment(value,srNumber)
       
        
      }
      // setInputValue(event.target.value);

    }
    
 
  return (
    <div>
    {/* <SearchAppBar filteredResponse={filteredResponse} /> */}
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            All User Request Services
          </Typography>
          <FormControl variant="standard" sx={{ m: 2, minWidth: 120}}>
        <Select className="dropdown"
          // labelId="demo-simple-select-standard-label"
          // id="demo-simple-select-standard"
          value={searchCategory}
          onChange={(event) => setSearchCategory(event.target.value)}
         
        >
          <MenuItem value="srNumber">SR Number</MenuItem>
          <MenuItem value="createdBy">Created By</MenuItem>
          <MenuItem value="issueType">Issue Type</MenuItem>
        </Select>
        </FormControl>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}

            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    {showTableData ? (
    <TableContainer component={Paper} className='format'>
    <Table className='table'
    // sx={{ minWidth: 650 }} aria-label="simple table"
    >
      <TableHead>
        <TableRow>
          <TableCell>SR Number</TableCell>
          <TableCell>User Name</TableCell>
          <TableCell className='issueType'>Issue Type</TableCell>
          <TableCell>Response Comment</TableCell>
                    <TableCell>Status</TableCell>

        
          <TableCell className='issueType'>Created Date</TableCell>
          <TableCell className='issueType'>Add Comment</TableCell>
          
          
         
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredResponse.reverse().map((row) => (
          
        
          <TableRow
            key={row.srNumber}>
            <TableCell scope="row">{row.srNumber}
            </TableCell>
            <TableCell align="left">{row.userName}</TableCell>
            <TableCell align="left">{row.issueType}</TableCell>
            <TableCell align="left" className="commentCell">{row.comments}</TableCell>
           
            <TableCell align="left">{row.createdAt}</TableCell>
            <TableCell align="left">      
            <Input  className="commentCell"
            type="text"
            placeholder="Enter Comment" 
            value = {inputValue[row.srNumber] || ''}
            inputProps={ariaLabel} 
            onChange={(event)=> handleInputChange(event, row.srNumber)}
            onKeyDown={(event) =>handleInputChange(event, row.srNumber)}/>

          
          </TableCell >
          <TableCell align="left" className='st'>

          <div className="grouped-cell">
          <span className="text">{row.status}</span>
          <Tooltip title="Close SR">
          <Button><SubtitlesOffIcon onClick={(event)=> handleSubmit(event,row.srNumber)}/></Button>
          </Tooltip>
          </div>
          </TableCell>
          </TableRow>
          
        ))}
      </TableBody>
    </Table>
  </TableContainer>
   ) : (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }} className='format'>
      <p>No data available.</p>
    </div>
  )}
  
  </div>
  )
}
export default FetchAllSr