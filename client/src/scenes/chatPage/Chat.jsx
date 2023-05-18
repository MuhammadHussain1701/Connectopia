import { useState,useEffect } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import Contacts from "../../components/Contacts"
import Welcome from "components/Welcome";
import ChatContainer from "components/ChatContainer";
import HashLoader from "react-spinners/HashLoader";

function Chat(){
    const navigate=useNavigate()
    const [contacts,setContacts]=useState([])
    const [currentUser,setCurrentUser]=useState(undefined)
    const [currentChat,setCurrentChat]=useState(undefined)
    const [isLoaded,setIsLoaded]=useState(false)
    const isAuth = useSelector((state) => state.user);
    const [loadingEffect, setLoadingEffect] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoadingEffect(false);
    }, 2000);
  },[]);
    useEffect(()=>{
        if(!isAuth)  
        {
            navigate("/login")
        }
        else{
            setCurrentUser(isAuth)
            setIsLoaded(true)
        }
    },[])
    useEffect(()=>{

        if(currentUser){
            setContacts(currentUser.friends)

        }
    },[currentUser])

    const handleChatChange=(chat)=>{
        setCurrentChat(chat)
    }

    if(!contacts)
    {
        return <h2>loading</h2>
    }
    else{
        return (
            <>
      {loadingEffect ? (
        <div className="login-loading">

          <HashLoader  color="#02aaff" size={200} />
        </div>
      ) : (
        <div className="out-container">
                <div className="chat-container">
                    <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                    {isLoaded && currentChat===undefined?(
                        <Welcome currentUser={currentUser}/>

                    ):(
                        <ChatContainer currentChat={currentChat} currentUser={currentUser}/>
                    )}
                </div>
            </div>
      )}
      </>
            
        )
    }
   
}

export default Chat