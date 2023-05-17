 import React, { useState } from "react";
import {BsEmojiSmileFill} from "react-icons/bs"
import {IoMdSend} from "react-icons/io"
import Picker from "emoji-picker-react"
function ChatInput({handleSendMsg}){
    const [showEmojiPicker,setShowEmojiPicker]=useState(false)
    const [msg,setMsg]=useState("")
    const handleEmojiPickerHideShow=()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick=(event,emojiObject)=>{
        // console.log(emojiObject.target)
        // console.log(emojiObject.srcElement)
        let message=msg
        message+=emojiObject.emoji
        setMsg(message)
    }
    const sendChat=(event)=>{
        event.preventDefault()
        if(msg.length>0)
        {
            handleSendMsg(msg)
            setMsg('')
        }
    }
    return <div className="chatinput-container">
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form className="input-container" onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder="Type your message here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button className="submit">
                <IoMdSend/>
            </button>
        
        </form>
    </div>
}

export default ChatInput