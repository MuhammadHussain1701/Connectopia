import React from "react";
import { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";

// import { sendMessageRoute } from "utils/APIRoutes";
function ChatContainer({ currentChat, currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [messages,setMessages]=useState([])

  
  const handleSendMsg = async (msg) => {
    
    await axios.post("http://localhost:3001/messages/addmsg",{
       from:currentUser._id,
       to:currentChat._id,
       message:msg
    })
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
    
  };
  useEffect(() => {
    if (currentChat) {
      setCurrentUserName(`${currentChat.firstName} ${currentChat.lastName}`);
      setCurrentUserImage(currentChat.picturePath);
    }
  }, [currentChat]);

  async function fetchData(){
    if(currentUser)
    {
      const response=await axios.post("http://localhost:3001/messages/getmsg",{
      from:currentUser._id,
      to:currentChat._id

    })
    setMessages(response.data)
  }
  }
  useEffect(()=>{
    
    fetchData()
    
  },[currentChat])
  return (
    <div className="chatContainer-container">
      <div className="chatContainer-header">
        <div className="user-details">
          <div className="chatContainer-avatar">
            <img
              src={`http://localhost:3001/assets/${currentUserImage}`}
              alt=""
            />
          </div>
          <div className="chatContainer-username">
            <h3>{currentUserName}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {
          messages.map((message)=>{
            return(
              <div>
                <div className={`message ${message.fromSelf?"sended":"recieved"}`}>
                  <div className="content">
                    <p>
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <ChatInput handleSendMsg={handleSendMsg} fetchData={fetchData} />
    </div>
  );
}
export default ChatContainer;
