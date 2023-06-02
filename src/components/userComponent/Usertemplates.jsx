import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Link, useLocation } from 'react-router-dom';


const UserTemplate = (props) => {
  const [dataDetails, setDataDetails] = useState([]);
  const [templateList,setTemplateList]= useState([]);
  const loc = useLocation();
  console.log(loc.state.id);
  let apikey = process.env.REACT_APP_MODULE_ID + loc.state.id;
  let apiTemplate=process.env.REACT_APP_GET_TEMPLATE_BY_NAME;
  console.log(apikey)
  useEffect(() => {
    // axios.get("http://localhost:8080/module/ModuleData",{modulId:loc.state.id},{
    //   headers:{
    //     "Content-Type":'application/json'
    //   }
    //  }).then((response) => {
    //     // setGet(response.data.data);
    //     console.log(response);
    // });
    axios.get(apikey).then((response) => {
      console.log(response.data);
      setDataDetails(response.data[0].templates);
      let a=[];
      response.data[0].templates.map((row)=>{
        
        axios.get(apiTemplate+row).then((response)=>{
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

  // const showTemplates = (name) => {
  //   let apiTemplate = process.env.REACT_APP_GET_TEMPLATE_BY_NAME + name;
  //   axios.get(apiTemplate).then((response) => {
  //     console.log(response.data);
  //   })
  console.log(templateList);
  // }
 

  return (
    <div className="mainview userDiv">
      <div className="completePage">
        {templateList.map((row) => { 
          {/* getTemplates(row); */}
          return (
          <div className="allCards" key={row.id}>
          <Card 
            // sx={{ maxWidth: 1000 }}
            className="cards"
          >
            <CardHeader className="cardHead"
              avatar={
                <Avatar className="avatar" sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {row.id}
                </Avatar>
              }

              title={row.name}
            />

            <CardContent className="cardBody">
            <Typography variant="body2" color="text.secondary">
                   {row.description}
            </Typography>
            <Link to="/userItem" state= {{ id:row.id}} >
                  Start
                 </Link>
            </CardContent>
          </Card>
          </div>
          

        )})}
      </div>


    </div>
  );
}
export default UserTemplate;

