import React, { useState } from "react";
import { HttpGetAdsr} from "../../../service/HttpGetAdsr";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CreateChat } from "../../../service/CreateChat";
const MyAdService = () => {
  const [input, setInput] = useState('');
  const [Data, setData] = useState([]);
  
  const response = HttpGetAdsr();
  const clearText = () => {
    setInput('')
  }
console.log(input)
  const [searchValue, setSearchValue] = useState("");
  const [searchCategory, setSearchCategory] = useState("srNumber");
  const filteredResponse = response.filter(row => {
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
  return (
    <div>
      <div className="contain">
        <select className="dropdown" value={searchCategory} onChange={(event) => setSearchCategory(event.target.value)}>
          <option value="srNumber">SR Number</option>
          <option value="createdBy">Created_By</option>
          <option value="issueType">Issue Type</option>
        </select>
        <input className="search"
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search..."
        />
      </div>
      {showTableData ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="headers">
                <TableCell>SR Number</TableCell>
                <TableCell align="left">Created_By</TableCell>
                <TableCell align="left">Issue Type</TableCell>
                <TableCell align="left">Response Comment</TableCell>
                <TableCell align="left">Create Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Comment on Sr</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {(filteredResponse.reverse().map((row) =>
                <TableRow
                  key={row.srNumber}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.srNumber}
                  </TableCell>
                  <TableCell align="left">{row.userName}</TableCell>
                  <TableCell align="left">{row.issueType}</TableCell>
                  <TableCell align="left">{row.comments}</TableCell>
                  <TableCell align="left">{row.createdAt}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left"><input type="text" placeholder="please comment here.." onChange={(event) => setInput(event.target.value)}></input><button onClick={() => {
                    const chatData = {
                      "srNumber": row.srNumber,
                      "chatMessages": input,
                      "chatType": "Admin"

                    }
                    setInput('add a commemt')
                    CreateChat(chatData);
                    clearText();
                  }}> Add</button></TableCell>


                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <p>No data available.</p>
        </div>
      )}
    </div>
  )
}

export default MyAdService;