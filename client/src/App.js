import './normal.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import HomeScreen from './Screens/HomeScreen';
import ChatScreen from './Screens/ChatScreen';
import CodeScreen from './Screens/CodeScreen';
import ImageGenScreen from './Screens/ImageGenScreen';
import ImageVarScreen from './Screens/ImageVarScreen';
import AdvancedChatScreen from './Screens/AdvancedChatScreen';



function App() {

  

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/imagevariations' element={<ImageVarScreen />} />
        <Route path='/chatstandard' element={<ChatScreen />} />
        <Route path='/advancedchat' element={<AdvancedChatScreen />} />
        <Route path='/codereader' element={<CodeScreen />} />
        <Route path='/imageprompt' element={<ImageGenScreen />} />

      </Routes>
    </div>
  );
}

export default App;
