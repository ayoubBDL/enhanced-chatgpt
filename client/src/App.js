import './normal.css';
import './App.css';
import {useState, useEffect} from 'react';
import ChatMessage from './Component/ChatMessage';
import UploadImage from './Component/UploadImage';
import axios from 'axios'



function App() {

    const [image, setImage] = useState('')
    const [images, setImages] = useState([])

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
            <div>
            <span >IMAGE UPLOAD</span>
                <input style={{marginTop:24}} type="file" onChange={handleChange} /> <br />
                <button style={{marginBottom:24}} onClick={handleApi} >SUBMIT</button>
            </div>
                <img src={image ? URL.createObjectURL(image) : null} width={150} height={150} />
        </aside>
      <section className="chatbox">
        <div className="chat-log">
          {images && images.map((image, index)=>(
            <img key={index} src={`${image.url}`} width={400} height={400} />
          ))}

          
        </div>
        
      </section>
    </div>
  );
}

export default App;
