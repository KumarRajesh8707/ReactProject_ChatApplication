import React from 'react'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { HttpGetSr } from '../../service/ServiceApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./fetchSr.css";
import ResponseModal from '../modalComponent/ResponseModal';
function FectchSr() {
    const [datadetails, setDataDetails] = useState([]);
    const userName = useSelector((state) => state.generatesr.userName)
    const response = HttpGetSr({userName});
     console.log(response);
    
 
  return (
    <TableContainer component={Paper} className='format'>
    <Table className='table'>
      <TableHead>
        <TableRow>
          <TableCell>SR Number</TableCell>
          <TableCell >Issue Type</TableCell>
          <TableCell >Response Comment</TableCell>
          <TableCell> Chat</TableCell>
          
         
        </TableRow>
      </TableHead>
      <TableBody>
        {response.reverse().map((row) => (
          <TableRow key={row.srNumber}>
            <TableCell  scope="row" className='sr'>{row.srNumber}</TableCell>
            <TableCell align="left"className='issueType'>{row.issueType}</TableCell>
            <TableCell align="left"  className = "commentCell2" >{row.comments}</TableCell>
            <TableCell align="left" className='chatbox'>
              <span>  <ResponseModal rowData ={row}/></span>
            
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default FectchSr