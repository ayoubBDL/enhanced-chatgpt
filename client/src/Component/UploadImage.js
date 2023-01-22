import { useState } from "react";
import axios from "axios";

const UploadImage = ({image, handleApi, handleChange})=> {
  

  return (
    <div>
      <div>
            <span >IMAGE UPLOAD</span>
                <input style={{marginTop:24}} type="file" onChange={handleChange} />
                <button style={{marginBottom:24}} onClick={handleApi} >SUBMIT</button>
            </div>
                <img src={image ? URL.createObjectURL(image) : null} width={150} height={150} />
    </div>
  );
}

export default UploadImage;