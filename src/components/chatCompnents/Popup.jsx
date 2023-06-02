import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './popup.css';
import moment from "moment";
import Message from './Message/Message';

const PopUP = (props) => {
  // const [open, setOpen] = React.useState(false);
  const data = [
    {
        "id": 1,
        "query": "IT Support",
        "msg": "Please contact IT team"
    },
    {
        "id": 2,
        "query": "Laptop Related Issues",
        "msg": "please raise a ticket under: MyHcl->ServiceXchange - download "
    },
    {
        "id": 3,
        "query": "HR Related Issues",
        "msg": "Please raise a ticket under: MyHcl-> SSD"
    },
    {
        "id": 4,
        "query": "Domain Change",
        "msg": "Please connect with your RM"
    },
    {
        "id": 5,
        "query": "Tools Installation",
        "msg": "please raise a ticket under: MyHcl->tarmac - download software/Tool, MyHcl->service Xchange->install software - installation"
    },
    {
        "id": 6,
        "query": "Other Issues",
        "msg": "Please enter your query"
    }
]
  const initialmsg = [
    "Hi",
    "How may I help you?",
    "Please select one of the below option to proceed ahead with your query"]
    const [mssg, setMessage] = useState();
    const [button, setButton] = useState();
    const [msg1, setMsg] = useState();

  const [index, setIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const suggestions = ["Software issue", "Hardware issue","laptop related","domain change","other issue"]; // array to hold suggestions
  // const [inputValue, setInputValue] = useState("");
  // const [isOpen, setIsOpen] = useState(true);
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  }
  useEffect(() => {
    if (index < initialmsg.length) {
      const words = initialmsg[index].split(' ');
      let i = 0;
      const timer = setInterval(() => {
        if (i < words.length) {
          console.log(words[i]);
          i++;
          setTimeoutId(timer);
        } else {
          clearInterval(timeoutId);
          setIndex(index + 1);
        }
      }, 400);
      return () => clearInterval(timeoutId);
    }
  }, [index, messages]);
  // const handleClearTimeout = () => {
  //   clearInterval(timeoutId);
  // }
  const responses = {
    'hello': 'how can I help you',
    'how can I help you ': " problems ",
    'thanks': "your welcome ",
    'software issue': " you have selected software Issue",
    'hardware issue': " you have selected hardware Issue",
    "laptop related":"you have selected laptop related issue",
    "domain change"  :"enter your domain",
    'other issue': " you have selected other Issue"
  };

  console.log(responses.hello);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: input, sender: 'right' }]);
    const response = responses[input.toLowerCase()];
    if (response) {
      setTimeout(() => {
        setMessages([...messages, { text: response, sender: 'left' }]);
      }, 2000);
    }
    setInput('');
  };
  
  const handleMessage = (value) => {
    setButton(value);
    const res = data.map((element1) => {
        if (element1.query === value) {
            setTimeout(() => { setMsg(element1.msg) }, 1000);
        }
    })
}
  const listItems = data.map(
    (element) => {
        return (
            <button value={element.query} className="btn" key={element.id} onClick={() => handleMessage(element.query)}>
                {element.query}
            </button>
        )
    })

  return (

    <div className='ytttttt' style={{ justifyContent: "end" }}>
      <Dialog
        className="chatDialogBox"
        // style={{justifyContent:"end"}}

        open={props.flag}
        onClose={props.handleCallBack}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"HCLTech Onboarding Support "}
          <IconButton
            aria-label="close"
            onClick={props.handleCallBack}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContentText classname='text'>
          <b className='dialoghead2' >This is offline chat</b>
          < b className='time'>{moment().format('llll')}</b>

        </DialogContentText>
        <DialogContent className='upperdiv'>
         
          <div>
            {/* <Message message={'hello !'}/>
          <Message message={"how can I help you"}/>
          <Message message={'Please select your issue '}/> */}
            <div>
              {initialmsg.slice(0, index).map((message, i) => (
                <p key={i} >
                 <Message message={message}  /></p>
              ))}
            </div>


            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <Message message={message.text} />
              </div>
            ))}
            {/* <form onSubmit = { handleMessageSubmit} className ="input-form">
              <input 
              type = "text"
              value = {input}
              onChange = {(event)=> setInput(event.target.value)}
              placeholder='Type a message'/>
              <button type = 'submit'>send</button>
              </form> */}
          </div>

          {/* <pre><AccountCircleIcon /> <b>Hi there!</b>
            <br />    <b>How may i help you</b>

          </pre> */}

          {/* {
            messages.map((item,i)=><Message message={item}/>)
          } */}
          {/* <Message message={messages}/> */}


        </DialogContent>
        <DialogContent>
          <div>
           
            {/* <input type ="text" value ={inputValue} onClick = {(e) =>setInput(e.target.value)}/> */}
            {/* {
              suggestions.map((suggestion) => (
                <button onClick={() => handleSuggestionClick(suggestion)} className='suggestionbtn'>{suggestion}</button>
              ))
            } */}
          </div>
        </DialogContent>
        <DialogActions>
             
            <div className="buttondiv">
              <hr/>
              {listItems}</div>
        </DialogActions>
        <DialogActions onSubmit={handleMessageSubmit} className='bottomdiv' >
          <form onSubmit={handleMessageSubmit} className="input-form">
            <TextField id="outlined-basic" label="Type your queries" variant="outlined"
              value={input}
              onChange={(event) => setInput(event.target.value)} />

            <Button type='submit' className="button" >Send</Button>
          </form>
        </DialogActions>

        <DialogContentText classname='text'>
          <h6 className='bottomtext' >Powered by HCLTech</h6>

        </DialogContentText>
      </Dialog>
    </div>


  );
}
export default PopUP;
