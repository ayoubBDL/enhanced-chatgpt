import '../normal.css';
import '../App.css';
import {useState, useEffect} from 'react';
import ChatMessage from '../Component/ChatMessage';
import LoadingSpinner from '../Component/LoadSpinner';




function AdvancedChatScreen() {

  useEffect(() => {
    getEngines()
  
  }, [])
  
  const [models, setModels] = useState([])
  const [currentModel, setCurrentModel] = useState("text-davinci-003")
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatLog, setChatLog] = useState([])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    let chatLogNew = [...chatLog, {user:"me", message:`${input}`}]
    
    setInput("")
    setChatLog(chatLogNew)

    const messages = chatLogNew.map((message)=>message.message).join("\n")

    const response = await fetch(`${process.env.REACT_APP_API_URL}advencedchat`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message: messages,
        currentModel
      })
    });
    const data = await response.json()
    setLoading(true)
    setChatLog([...chatLogNew, {user:"gpt", message:`${data.message}`}])
        
  }

  const clearChat = ()=>{
    setChatLog([])
  }

  const getEngines = async ()=>{
    const response = await fetch(`${process.env.REACT_APP_API_URL}models`, {
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
    })
    const data = await response.json()
    setModels(data.models)
  }
    

    

  return (
    <div className="container">
        <aside className= "sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        <div className="side-menu-text">
          Choose a model
        </div>
        <div >
          <select onChange={(e)=>{
            setCurrentModel(e.target.value)
          }}>
            {
              models.map((model, index)=>(
                <option key={index} value={model.id}>{model.id}</option>
              ))
            }
          </select>
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

export default AdvancedChatScreen;
