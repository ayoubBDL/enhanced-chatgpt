import '../normal.css';
import '../App.css';
import {useState, useEffect} from 'react';
import ChatMessageImage from '../Component/ChatMessageImage';
import ChatMessage from '../Component/ChatMessage';


const numbers = [1,2,3,4]

function ImageGenScreen() {

  
  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState([])
  const [numberImages, setNumberImages] = useState(1)

  const handleSubmit = async (e) =>{
    e.preventDefault()

    let chatLogNew = [...chatLog, {user:"me", message:`${input}`}]
    setChatLog(chatLogNew)

    const response = await fetch(`${process.env.REACT_APP_API_URL}imageprompt`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message: `${input}`,
        numberImages
      })
    });
    setInput("")
    const data = await response.json()
    setChatLog([...chatLogNew, {user:"gpt", message:`${JSON.stringify(data.message)}`}])

  }

  const clearChat = ()=>{
    setChatLog([])
  }

  return (
    <div className="container">
        <aside className= "sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>{'+'}</span>
          New Chat
        </div>
        
        <div className="side-menu-text">
          Choose how much Images you want
        </div>
        <div >
          <select onChange={(e)=>{
            setNumberImages(e.target.value)
          }}>
            {
              numbers.map((number, index)=>(
                <option key={index}>{number}</option>
              ))
            }
          </select>
        </div>

        </aside>
        <section className="chatbox">
          <div className="chat-log">
            <div className='.chat-message-center'>

                {chatLog.map((element, index)=>(
                    <ChatMessageImage key={index} element={element}  />
                ))}
            </div>
            
            
          </div>
          <div className="chat-input-holder">
            <form onSubmit={handleSubmit}>
              <input 
                className="chat-input-textarea"
                rows="1"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                />
            </form>
          </div>
        </section>


    </div>
  );
}

export default ImageGenScreen;
