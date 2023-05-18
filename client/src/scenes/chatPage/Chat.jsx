import { useState,useEffect } from "react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import Contacts from "../../components/Contacts"
import Welcome from "components/Welcome";
import ChatContainer from "components/ChatContainer";
import io from "socket.io-client"
function Chat(){
    const navigate=useNavigate()
    const [contacts,setContacts]=useState([])
    const [currentUser,setCurrentUser]=useState(undefined)
    const [currentChat,setCurrentChat]=useState(undefined)
    const [isLoaded,setIsLoaded]=useState(false)
    const isAuth = useSelector((state) => state.user);

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
            <div className="out-container">
                <div className="container">
                    <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                    {isLoaded && currentChat===undefined?(
                        <Welcome currentUser={currentUser}/>

                    ):(
                        <ChatContainer currentChat={currentChat} currentUser={currentUser}/>
                    )}
                </div>
            </div>
        )
    }
   
}

export default Chat