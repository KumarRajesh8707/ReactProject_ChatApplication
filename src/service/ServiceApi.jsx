import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import{generateSrActions} from "../store/generateSr-slice";

import { useEffect, useState } from "react";


 export const CreateSr = async (srData) => {

  try {  
  let api = process.env.REACT_APP_POST_SR;

    const response= await axios.post(api, srData, 
        {
          headers: {
            "Content-Type": 'application/json'
          }
        });
  
          console.log(response.data.srNumber);
          console.log("created");
          return response.data.srNumber;
        }

      catch(err) {
        console.log(err);
        return null;
      }
    }
 
    export const HttpGetSr=(props)=>{
      const [srData, setSrData ] = useState([]);
      let fetchApi = process.env.REACT_APP_GET_SR_BY_USERNAME
      useEffect(()=>{
        axios.post('http://localhost:8080/sr/fetchSr/username',{
          userName:props.userName
      })    
      .then((result)=>{
        if(result){
          console.log(result.data)
          setSrData(result.data);
        }
      })
.catch((error)=>{
  console.log(error);
})
      
  },[props.userName]);
  console.log(srData);
  return srData;
}


export const HttpGetAllSr=()=>{
  const [srData, setSrData ] = useState([]);
  useEffect(()=>{
    axios.post('http://localhost:8080/sr/GetAllSR')    
  .then((result)=>{
    if(result){
      console.log(result.data)
      setSrData(result.data);
    }
  })
.catch((error)=>{
console.log(error);
})
  
},);
console.log(srData);
return srData;
}


//     const srData = {
//         userName : userType,
//         issueType: issueType,
//         comments: msg1
//        };
//    console.log("saved");
  
//    try {
//      axios.post(api, srData, 
//      {
//        headers: {
//          "Content-Type": 'application/json'
//        }
//      }).then((response) => {
//        console.log(response);
//        console.log("created");
//       return response.data;       

//      });

//    } catch (err) {
//      console.log(err);
//    }
  
// }

// const userChat = async(props)=>{
//     const response = await axios.post("http://localhost:8080/userChat/createChat",{
    
//     })
// }
 

// const fetchSr = async() =>{
//     const response = await axios.get(api2)
//     .then((response) => {
//         setGet(response.data);
//     })

// }