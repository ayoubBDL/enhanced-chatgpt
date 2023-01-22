import '../normal.css';
import '../App.css';
import {useState} from 'react';
import axios from 'axios'
import ChatImage from '../Component/ChatImage';
import LoadingSpinner from '../Component/LoadSpinner';



const numbers = [1,2,3,4]

function ImageVarScreen() {

  
  const [input, setInput] = useState('')
  const [numberImages, setNumberImages] = useState(1)
  const [loading, setLoading] = useState(false)

  const [chatLog, setChatLog] = useState([])
  const [image, setImage] = useState('')
  const [images, setImages] = useState([])

  const clearChat = ()=>{
      setChatLog([])
  }

    

  const handleChange = (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0])
    setChatLog([...chatLog, {user:"me", images:image}])
  }
  
  const handleApi = (e) => {
    //call the api
    e.preventDefault()

    const formData = new FormData()
    formData.append('numberImages', numberImages)
    formData.append('image', image)
    setLoading(true)

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}imagevariations`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(result => {
      setImages(result.data.images)
      setChatLog([...chatLog, {user:"gpt", images:`${JSON.stringify(result.data.images)}`}])
      setLoading(false)
    })
      .catch(error => {
        alert('service error')
        console.log(error)
      })

      
  }

    
  return (
    <div className="container">
        <aside className= "sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
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
                    <ChatImage key={index} element={element} image={image} loading={loading} />
                ))}
                {loading ? 
                <div className="chat-message-center">
                  <LoadingSpinner />
                </div>
                : null}
            </div>
            
            
          </div>
          <div className="chat-input-holder">
            <form onSubmit={handleApi}>
              <input 
                className="chat-input-textarea"
                rows="1"
                value={input}
                type="file" onChange={handleChange}
                />
                <button style={{marginBottom:24}} onClick={handleApi} >SUBMIT</button>
            </form>
          </div>
        </section>


    </div>
  );
}

export default ImageVarScreen;
