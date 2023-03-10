import '../normal.css';
import '../App.css';
import {useState} from 'react';
import ChatMessage from '../Component/ChatMessage';
import LoadingSpinner from '../Component/LoadSpinner';



function CodeScreen() {

 
  
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatLog, setChatLog] = useState([])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    let chatLogNew = [...chatLog, {user:"me", message:`${input}`}]
    setLoading(true)
    
    setInput("")
    setChatLog(chatLogNew)

    const messages = chatLogNew.map((message)=>message.message).join("\n")

    const response = await fetch(`${process.env.REACT_APP_API_URL}code`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message: messages
      })
    });
    const data = await response.json()
    setLoading(false)

    setChatLog([...chatLogNew, {user:"gpt", message:`${data.message}`}])
        
  }

  const clearChat = ()=>{
    setChatLog([])
  }

  
  return (
    <div className="container">
        <aside className= "sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        
        </aside>
        <section className="chatbox">
          <div className="chat-log">
            {chatLog.map((message, index)=>(
              <ChatMessage key={index} message={message} />
            ))}
            {loading ? 
              <div className="chat-message-center">
                <LoadingSpinner />
              </div>
              : null
            }            
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

export default CodeScreen;
