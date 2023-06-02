import React from 'react';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Message.css';
const Message = ( {message}, classs) => {
  return (
    <div>
    
    <div className="right" >
        
         {message}
        
    </div>
    </div>
  )
}

export default Message