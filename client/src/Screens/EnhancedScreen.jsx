import '../normal.css';
import '../App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'
import ChatImage from '../Component/ChatImage';



function EnhancedScreen() {

  
    const [input, setInput] = useState('')
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
      const url = `${process.env.REACT_APP_API_URL}imagevariations`
      const formData = new FormData()
      formData.append('image', image)
      axios.post(url, formData).then(result => {
        setImages(result.data.images)
        setChatLog([...chatLog, {user:"gpt", images:`${JSON.stringify(result.data.images)}`}])
        console.log(JSON.stringify(result.data.images))
      })
        .catch(error => {
          alert('service error')
          console.log(error)
        })
        
        
    }

    
  return (
    <div className="container">
        Hello
    </div>
  );
}

export default EnhancedScreen;
