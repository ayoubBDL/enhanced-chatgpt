import React from 'react'
import "../App.css"
import RobotIcon from '../Icons/RobotIcon'
import HumanIcon from '../Icons/HumanIcon'


const ChatMessage = ({message}) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"} `}>
        <div className="chat-message-center">
            <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
              {message.user === "gpt" ? <RobotIcon /> : <HumanIcon /> }
            </div>
            <div className="message">
                {message.message}
            </div>
        </div>
    </div>
  )
}

export default ChatMessage