import React from "react";
import Robot from "../assets/robot.gif"
import { useState,useEffect } from "react";
function Welcome({currentUser}){
    const [currentUserName, setCurrentUserName] = useState(undefined);
    useEffect(() => {
        if (currentUser) {
          setCurrentUserName(`${currentUser.firstName} ${currentUser.lastName}`);
        }
      }, [currentUser]);
    return <div className="welcome-container">
        <img src={Robot} alt="Robot" />
        <h1>
            Welcome , <span>{currentUserName}</span>
        </h1>
        <h3>
            Please select a chat to start Messaging
        </h3>
    </div>
    
}

export default Welcome