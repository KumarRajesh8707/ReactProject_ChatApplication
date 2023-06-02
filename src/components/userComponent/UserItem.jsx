import React,{ useState, useEffect } from 'react';
import axios from "axios";
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
import {useLocation } from 'react-router-dom';
// import Paper from "@mui/material/Paper";/
import Tooltip from '@mui/material/Tooltip';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import './UserItem.css';

// import { useNavigate } from "react-router-dom";

// import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const UserItem = () => {
    

    const [dataDetails, setDataDetails] = useState([]);
    const [templateList,setTemplateList]= useState([]);
    const [open, setOpen] = useState(false);
    const loc = useLocation();
    // console.log(loc.state.id);
    console.log(loc);
    let apikey = process.env.REACT_APP_GET_TEMPLATE_BY_ID + loc.state.id;
    let apiItem=process.env.REACT_APP_GET_ITEM_BY_NAME;
    console.log(apikey);
    // const handleClickOpen = (value) => {
    //   console.log(value);
    //   setDeleteItem(value);
    //   setOpen(true);
    // };
  

    useEffect(() => {
     
      axios.get(apikey).then((response) => {
        console.log(response.data);
        // setDataDetails(response.data[0].templates);
        setDataDetails(response.data[0].items);
      let a=[];
      response.data[0].items.map((row)=>{
        
        axios.get(apiItem+row).then((response)=>{
          console.log(response.data[0]);
          console.log(templateList);
          
          a= [...a,response.data[0]];
          // 
          // console.log(array);

          console.log(a);
          setTemplateList(a);
        });
      })
      console.log(a);
       
      });
  
    }, []);
  
    
    console.log(templateList);
 
   
     
let i=1;
 
    return(
        
      <div className="mainview userDiv">
         <div className="tableContainer">
        <div className="itemContainer">
        {templateList.map((row) => { 
          {/* getTemplates(row); */}
          return (

            <div className="itemDiv">
            <span className="itemIndex">{i++}.</span> 
            <p className="itemDescription">{row.descrption}</p>
            <span className="itemActions"><Tooltip title="Start course">
              <a href=""><NextPlanIcon /></a>
            </Tooltip>
            </span>
          </div>
        )})}
      </div>
</div>

    </div>
    );
}
export default UserItem;


          // <div className="allCards" key={row.itemId}>
          // <Card 
          //   // sx={{ maxWidth: 1000 }}
          //   className="cards"
          // >
          //   <CardHeader className="cardHead"
          //     avatar={
          //       <Avatar className="avatar" sx={{ bgcolor: red[500] }} aria-label="recipe">
          //         {i++}
          //       </Avatar>
          //     }

          //     title={row.descrption}
          //   />

          //   <CardContent className="cardBody">
          //   <Typography variant="body2" color="text.secondary">
          //          <a href="">{row.url}</a>
          //   </Typography>
            
          //   </CardContent>
          // </Card>
          // </div>
