import { useState } from "react";
import axios from "axios";

const UploadImage = ()=> {
  const [image, setImage] = useState('')

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
      console.log(result)
    })
      .catch(error => {
        alert('service error')
        console.log(error)
      })
  }

  return (
    <div>
      IMAGE UPLOAD <br />
      <img src={image ? URL.createObjectURL(image) : null} width={150} height={150} />
      <input type="file" onChange={handleChange} /> <br />
      <button onClick={handleApi} >SUBMIT</button>
    </div>
  );
}

export default UploadImage;