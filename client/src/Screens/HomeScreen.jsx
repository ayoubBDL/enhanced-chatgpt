import { Link } from 'react-router-dom';
import '../normal.css';
import './HomeScreen.css';




function HomeScreen() {


  return (
    <div className='all'>
    <h2>Welcome to CharKhiPT</h2>
    <div className="container">
        <Link className='card' to={'/chatstandard'}>
            <h3>Chat with Our AI for anything you like</h3> 
            <span className='description'>Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.</span>
        </Link>


        <Link className='card' to={'/imageprompt'}>
          <h3>Generate Images from text</h3> 
          <span className='description'>Create an original image given a text prompt. Generated images can have a size of 256x256, 512x512, or 1024x1024 pixels.</span>
      
        </Link>

        <Link className='card' to={'/imagevariations'}>
          <h3>Generate variations of your image</h3> 
        </Link>

        <Link className='card' to={'/codereader'}>
          <h3>Need help with your Code?</h3> 
          <span className='description'>Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.</span>
        </Link>

        <Link className='card' to={'/advancedchat'}>
          <h3>More advanced playground</h3> 
          <span className='descripti  on'>You will find all models of AI to play with, This will give an opportunity to explore these models the way you like</span>
        </Link>
          


    </div>
    </div>
  );
}

export default HomeScreen;
