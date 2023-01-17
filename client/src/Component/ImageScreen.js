import './normal.css';
import './App.css';
import {useState, useEffect} from 'react';




function ImageScreen() {

    const [image, setImage] = useState('')
    const [images, setImages] = useState([])

    const handleChange = (e) => {
      console.log(e.target.files)
      setImage(e.target.files[0])
    }
  
    const handleApi = () => {
      //call the api
      const url = 'http://localhost:5000/imagetest'
  
      const formData = new FormData()
      formData.append('image', image)
      axios.post(url, formData).then(result => {
        setImages(result.data)
        console.log(result)
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
                <span style={"margin:10px;"}>IMAGE UPLOAD</span>
                <input type="file" onChange={handleChange} /> <br />
                <button onClick={handleApi} >SUBMIT</button>
            </div>
            <img src={image ? URL.createObjectURL(image) : null} width={150} height={150} />
        </aside>
      <section className="chatbox">
        <div className="chat-log">
          {/* {images.map((image, index)=>(
            <img key={index} src={`${image.url}`} width={150} height={150} />
          ))} */}

          
        </div>
        
      </section>
    </div>
  );
}

export default ImageScreen;
