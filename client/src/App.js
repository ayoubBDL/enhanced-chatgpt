import './normal.css';
import './App.css';
import {useState, useEffect} from 'react';
import ChatMessage from './Component/ChatMessage';
import UploadImage from './Component/UploadImage';
import axios from 'axios'



function App() {

  useEffect(() => {
    getEngines()
  
  }, [])
  
  const [models, setModels] = useState([])
  const [currentModel, setCurrentModel] = useState("text-davinci-003")
  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState([])
  const [image, setImage] = useState('')
    const [images, setImages] = useState([])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    let chatLogNew = [...chatLog, {user:"me", message:`${input}`}]
    
    setInput("")
    setChatLog(chatLogNew)

    const messages = chatLogNew.map((message)=>message.message).join("\n")

    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
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
    

    const handleChange = (e) => {
      console.log(e.target.files)
      setImage(e.target.files[0])
    }
  
    const handleApi = () => {
      //call the api
      const url = `${process.env.REACT_APP_API_URL}imagetest`
      const formData = new FormData()
      formData.append('image', image)
      axios.post(url, formData).then(result => {
        setImages(result.data.images)
        console.log(result.data.images)
      })
        .catch(error => {
          alert('service error')
          console.log(error)
        })
    }

  return (
    <div className="App">
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

          <UploadImage image={image} handleApi={handleApi} handleChange={handleChange} />
        </aside>
        <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index)=>(
            <ChatMessage key={index} message={message} />
          ))}
          {images && images.map((image, index)=>(
            <img key={index} src={`${image.url}`} width={400} height={400} />
          ))}

          
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

export default App;
