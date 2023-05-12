// import logo from './logo.svg';
import './App.css';
import Map from './Components/Map';
import Navbar from './Components/Navbar';
import { useState } from 'react';

function App() {
  // dark mode
const [isDarkMode, setIsDarkMode] = useState(true);
const [color , setColor] = useState('#f4f8fa')
const [border, setBorder] = useState('#fff')
const [letter, setLetter] = useState('#1E2A32')
const [letter1, setLetter1] = useState('#1E2A32')
const [icon,setIcon] = useState('#000')
//                             
const Change = () => {
     
  setIsDarkMode(!isDarkMode);
  if(color === '#f4f8fa'){
    setColor('#131516')
    setBorder('#000')
    setLetter('#fff')
    setLetter1('grey')
    setIcon("#f5f5f5")
  }
  else{
    setColor('#f4f8fa')
    setBorder('#fff')
    setLetter('#1e2a32')
    setLetter1('#1e2a32')
    setIcon("#000")
  }
}
  return (
   <>
   <Navbar  Change={Change} isDarkMode={isDarkMode}/>
   <Map color={color} border={border} letter={letter} letter1={letter1} icon={icon}/>
   </>
  );
}

export default App;
