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
import { initialMsg, categories } from "./InitialMsg";
import Message from "./Message/Message";
import "./Modal.css";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { generateSrActions } from "../../store/generateSr-slice";
import { useSelector, useDispatch } from "react-redux";
import { CreateSr } from "../../service/ServiceApi";
import CircularIndeterminate from "./Loader";

export default function SimpleModal(props) {
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
  const [isLoading, setLoading] = useState(false);
  const[srNo,setSrno]= useState();
  const containerRef = useRef(null);
  const [msgSent, setMsgSent]= useState(false)
  const userType = useSelector((state) => state.generatesr.userName);
  console.log(userType);

  // const isLoading = useSelector((state) => state.generatesr.isLoading)
  // console.log(userType);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    setMsgSent(true)
    setLoading(true);
    console.log(button);
    console.log(msg1);
    console.log("saved");
    const srData = {
      userName: userType,
      issueType: button,
      comments: msg1,
    };

    const response = await CreateSr(srData);
    console.log(response);
    
    setTimeout(function () {
      setRes("we have successfully raised your request your SR Number is " + " " + response);
  
      postComment(response)
      setLoading(false);
    }, 500);
  };


  async function postComment(srNo){
    console.log(srNo)
    console.log(input)
    try{
      const response = await axios.post("http://localhost:8080/userChat/createChat",{
        
          srNumber: srNo,
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
  // console.log(res)
  // useEffect(() => {
  //   console.log("slicestate"+sliceState);
  // },[sliceState]);
  //    try {
  //       //pass items to store in database
  //       axios.post(api, {
  //         descrption: description,
  //         url: url
  //       }, {
  //         headers: {
  //           "Content-Type": 'application/json'
  //         }

  //        }).then((response) => {
  //         console.log("created");
  //         alert("Item Created");
  //       });

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

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

  const submitInput = (event) => {

    setTexts([...texts, input]);
    // handleSubmit(); t
    // CreateSr();
    console.log(texts);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: input, sender: "right" }]);
    // const response = responses[input.toLowerCase()];
    // if (response) {
    //   setTimeout(() => {
    //     setMessages([...messages, { text: response, sender: 'left' }]);
    //   }, 2000);
    // }
    dispatch(generateSrActions.updateIssueType(button));
    dispatch(generateSrActions.updateComment(msg1));

    handleSubmit();
    setInput("");
  };
  const handleMessage = (value) => {
    setButton(value);

    console.log("button" + button);

    const res = categories.map((element1) => {
      if (element1.query === value) {
        setTimeout(() => {
          setMsg(element1.msg);
        }, 1000);
      }
    });
    setTimeout(() => {
      setDism("Please elaborate more about your query.");
    }, 2000);
    const timer = setTimeout(() => {
      setOpt2(true);
      setOpt1(false);
    }, 2000);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpt1(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const listItems = categories.map((element) => {
    // console.log(element.query);
    return (
      <button
        // value={element.query}

        className="btn"
        key={element.id}
        onClick={() => handleMessage(element.query)}
      >
        {element.query}
      </button>
    );
  });

  const handleOpen = () => {
    setOpen(true);
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
  };
  return (
    <>
      {/* <CreateSr isLoading={isLoading}/> */}
      <div className="popupbox">
        <button className="btn-header" onClick={handleOpen}>
          <label className="btn-label">Chat With Us</label>
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
            <b className="dialogSubHead">This is offline chat</b>
            <b className="time">{moment().format("llll")}</b>
          </DialogContentText>
          <DialogContent className="dialog-content">
            <div>
              <p className="p1">{mssg}</p>
              <p className="p1">{prevMsg}</p>
              <p className="p1">{curMsg}</p>
            </div>
            <div className="divbtn">
              <p className="user">{button}</p>
            </div>
            <p className="msg2 ">{msg1}</p>
            <p className="msg2 ">{dism}</p>
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
            <p className="p1">{res}</p>
          </DialogContent>
          <DialogContent className="item-box">
            {/* <div className="div5"> */}
            {/* <hr /> */}
            {opt1 && listItems}
            {/* <Categories/> */}
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
             
                {isLoading ? (
                  <CircularIndeterminate />
                ) : (<div></div>
                  )}
                  {
                    !msgSent && (
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
                  </div>)
                  }



                {/* <Button onClick={handleInputChange} type='submit' endIcon={<SendIcon />}></Button> */}
              </form>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
