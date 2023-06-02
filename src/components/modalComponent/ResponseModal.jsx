import React from "react";
import { useEffect, useState, useRef } from "react";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import { initialMsg, categories } from "./InitialMsg";
import Message from "./Message/Message";
import "./responsemodal.css";

import CircularIndeterminate from "./Loader";
import ChatIcon from "@mui/icons-material/Chat";

export default function ResponseModal(props) {
  const [isLoading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [prevMsg, setPrevMsg] = useState();
  const [curMsg, setCurrMsg] = useState();
  const [mssg, setMessage] = useState();
  const [button, setButton] = useState();
  const [msg1, setMsg] = useState();
  const [opt1, setOpt1] = useState(false);
  const [opt2, setOpt2] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [correctInput, setcorrectInput] = useState(false);
  const [correctInput2, setcorrectInput2] = useState(false);
  const [texts, setTexts] = useState([]);
  const [dism, setDism] = useState(true);
  const [res, setRes] = useState();

  const [chatData, setChatData] = useState([]);
  const [chatType, setChatType] = useState([]);
  const[chatMessage, setChatMesage] = useState([]);

 

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    const messages = initialMsg.map((element1) => {
      setTimeout(() => {
        if (element1.id === 1) setMessage(element1.msg);
      }, 1000);
      setTimeout(() => {
        if (element1.id === 2) setPrevMsg(element1.msg);
      }, 2000);
      setTimeout(() => {
        if (element1.id === 3) setCurrMsg(element1.msg);
      }, 3000);
    });
    handleMessage();
  };
function handleInputChange(event) {
    // (event) => setInput(event.target.value)
    // const {value} = event.target;
    const textLength = input.length;

    if (textLength >= 50 && textLength <= 500) {
      setcorrectInput(false);
      setcorrectInput2(false);
    } else if (textLength < 50) {
      setcorrectInput(true);
      setInput(null);
    } else {
      setcorrectInput2(true);
      setcorrectInput(false);
      setInput(null);
    }

 
  }
  async function postComment(){
    // console.log(srNo)
    console.log(input)
    try{
      const response = await axios.post("http://localhost:8080/userChat/createChat",{
        
          srNumber: props.rowData.srNumber,
          chatType: "User",
          chatMessages: input
        },
       {
          headers: {
            "Content-Type": 'application/json'
          }
        }
        )
        if(response.status==200){
          console.log(" comment added")

        }

    }catch(error){
      console.log(error)
    }
  }
 
 const getAllChat = ( )=>{
    console.log(props.rowData.srNumber);
    axios
      .post("http://localhost:8080/userChat/fetchChat/SrNumber", {
        srNumber: props.rowData.srNumber,
      })
      .then((response) => {
        console.log( response.data);
        const messageArray = response.data.map(item =>({
                chatType:item.chatType,
                messages:item.messages}))
                console.log(messageArray)
        setChatData(messageArray);
      

        setLoading(false)
    
      })
      .catch((error) => {
        console.log(error);
      });
    }
    const submitInput = (event) => {

        setTexts([...texts, input]);
        // handleSubmit(); t
        // CreateSr();
        console.log(texts);
      };
      const handleMessageSubmit = (event) => {
        console.log(props.rowData.srNumber);
        console.log(input)
        event.preventDefault();
        setMessages([...messages, { text: input, sender: "right" }]);
        // const response = responses[input.toLowerCase()];
        // if (response) {
        //   setTimeout(() => {
        //     setMessages([...messages, { text: response, sender: 'left' }]);
        //   }, 2000);
        // }
       postComment();
        setInput("");
      };
  const handleMessage = () => {
    setTimeout(() => {
      setButton(props.rowData.issueType);
    }, 2000);

    setTimeout(() => {
      setMsg(props.rowData.comments);
    }, 2500);
    setTimeout(() => {
      setDism("Please elaborate more about your query.");
    }, 3000);
    setTimeout(()=>{
        getAllChat();
        
    },3500)
   
    // handleMessageSubmit(chatData);

    const timer = setTimeout(() => {
      setOpt2(true);
      setOpt1(false);
    }, 1000);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpt1(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <CreateSr isLoading={isLoading}/> */}
      <div className="popupbox">
        <button className="btn-header" onClick={handleOpen}>
          {/* <label className="btn-label2">Chat</label> */}
          <ChatIcon color="primary" />
        </button>
        <Dialog
          className="chatDialogBox"
          open={open}
          onClose={() => setOpen(true)}
        >
          <DialogTitle id="alert-dialog-title">
            {"HCLTech Onboarding Support "}
            {/* <div className="paper"> */}

            {/* <div className="div1"> */}

            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContentText>
            <b className="dialogSubHead">
              SR Number : {props.rowData.srNumber}
            </b>
            <b className="time">{props.rowData.createdAt}</b>
          </DialogContentText>
          <DialogContent className="dialog-content">
         
            <div className="divbtn">
              <p className="user">{button}</p>
            </div>
            <p className="msg2 ">{msg1}</p>
            <p className="msg2 ">{dism}</p>
            <div>
          
                {chatData.map((message, index) => (
                  
                  <div key={index}>{message.chatType==="User"?(  
                    <div className="divbtn">
                         <Message message={message.messages} />
                         </div>)
                :(<p className="msg2">{message.messages}</p>
                )} 
                 
                  </div>
                ))}
          
            </div>
            <div className="divbtn">
            <p id="btn">
                {messages.map((message, index) => (
                  <div key={index}>
                    {/* // <div key={index}  className={`message ${message.sender}`}> */}
                    <Message message={message.text} />
                  </div>
                ))}
              </p>
              </div>
          

          </DialogContent>
          <>
            {correctInput ? (
              <div>
                <Alert severity="error">Enter Minimum of 50 characters</Alert>
              </div>
            ) : (
              <div></div>
            )}
            {correctInput2 ? (
              <div>
                <Alert severity="error">
                  Max char limit - 500 characters !
                </Alert>
              </div>
            ) : (
              <div></div>
            )}
          </>
          <DialogActions className="bottomdiv">
            {opt2 && (
              <form onSubmit={handleMessageSubmit} className="input-form">
                {/* <TextField id="outlined-basic" label="Type your queries" variant="outlined"
                                value={input}
                                type="text"                               
                                onChange= {(event)=>{handleInputChange(); setInput(event.target.value)
                                }}

                                 /> */}
                {isLoading ? (
                  <CircularIndeterminate />
                ) : (
                  <div className="input-form">

<TextareaAutosize
                      maxRows={3}
                      className="textArea"
                      aria-label="maximum height"
                      placeholder="Type your query here "
                      style={{ width: 200 }}
                      value={input}
                      type="text"
                      onChange={(event) => {
                        handleInputChange();
                        setInput(event.target.value);
                      }}
                      maxLength={502}
                    />

                    {input.length >= 50 && input.length < 500 ? (
                      <IconButton
                        onClick={() => {
                          handleInputChange();
                          submitInput();
                        }}
                        type="submit"
                      >
                        <SendIcon />
                      </IconButton>
                    ) : (
                      <IconButton disabled type="submit">
                        <SendIcon />
                      </IconButton>
                    )}
                  </div>
                )}

                {/* <Button onClick={handleInputChange} type='submit' endIcon={<SendIcon />}></Button> */}
              </form>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
