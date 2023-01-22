import React from 'react'
import RobotIcon from '../Icons/RobotIcon'
import HumanIcon from '../Icons/HumanIcon'
import "./style.css"
import "../App.css"

const ChatMessageImage = ({element}) => {
  return (
    <div className={`chat-message ${element.user === "gpt" && "chatgpt"} `}>
        <div className="chat-message-center">
            <div className={`avatar ${element.user === "gpt" && "chatgpt"}`}>
                {element.user === "gpt" ? <RobotIcon /> : <HumanIcon /> }
            </div>
            <div className="message">
                {element.user  === "me"?
                    element.message
                :
                JSON.parse(element.message).map((e, index)=>(
                  <div key={index} className='imageContainer'>
                    <img src={`${e.url}`} width={150} height={150} />
                  </div>
                ))
                }
                    
            </div>
        </div>
    </div>
  )
}

export default ChatMessageImage