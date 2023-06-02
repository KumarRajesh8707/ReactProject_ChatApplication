import React from "react";
import './user.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link,} from "react-router-dom";
const User = () => {
    // const [post, setPost] = useState();
    const [getData, setGet] = useState([]);
// const navigate=useNavigate();
//     const handleNavTemplate=()=>{
// navigate('/userTemplate', {state:{name:}})
//     }
let api = process.env.REACT_APP_GET_MODULE;
    useEffect(() => {
        axios.get(api).then((response) => {
            setGet(response.data);
            console.log(response.data[0]);
            // let itemno=response.data[0];
           
            // console.log(itemno.moduleId);
        });
        
    }, []);  
    
    
return(
    <div className="mainview userDiv">
        <div className="completePage">
        {getData.map((item) =>{
            return(
                <div  key={item.id} className="allCards">
                <Card sx={{ maxWidth: 345 }} className="cards">
                <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  <Link to="/userTemplate" state= {{ id:item.id}}>
                  Start
                 </Link>
                </Button>
              </CardActions>
            </Card> 
            </div>
            )
        } )}
        </div>
       


    </div>
)
}
export default User;