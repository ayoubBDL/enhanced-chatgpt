import React from 'react'
import "./style.css"
import RobotIcon from '../Icons/RobotIcon'
import HumanIcon from '../Icons/HumanIcon'
import LoadSpinner from '../Component/LoadSpinner';

const ChatImage = ({element, image}) => {
  return (
    <div className={`chat-message ${element.user === "gpt" && "chatgpt"} `}>
        <div className="chat-message-center">
            <div className={`avatar ${element.user === "gpt" && "chatgpt"}`}>
            {element.user === "gpt" ? <RobotIcon /> : <HumanIcon /> }
            </div>
            <div className="message">
                {element.user  === "me"?
                <img  src={image ? URL.createObjectURL(image) : null} width={150} height={150} />
                :
                JSON.parse(element.images).map((e, index)=>(
                  <div className='imageContainer'>
                    <img key={index}  src={`${e.url}`} width={150} height={150} />
                  </div>
                ))
                }
                    
            </div>
        </div>
    </div>
  )
}

export default ChatImage