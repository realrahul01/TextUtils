import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  const[mode,setMode] = useState("light")
  const[btnn,setBtn] = useState("Enable Dark Mode")
  const[alert,setAlert] = useState(null)

//my name is rahul

  const showAlert =(message,type)=>{
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  const toggle =()=>{
    if(mode==='light'){
      setMode('dark')
      setBtn("Enable Light Mode")
      document.body.style.backgroundColor = "#042743"
      showAlert("Dark mode has been Enable", "success")
      document.title = "TextUtils - Dark mode"
      // setInterval(()=>{
      //   document.title = "TextUtils is Amazing"
      // },2000)
      // setInterval(()=>{
      //   document.title = "Install textUtils Now"
      // },1500)
      
    }else{  
      setMode('light')
      setBtn("Enable Dark Mode")
      document.body.style.backgroundColor = "white"
      showAlert("Light mode has been Enable", "success")
      document.title = "Textutils - Light mode"         
    }
  }
  return (
  <>   
  <BrowserRouter>
      <Navbar title= "TextUtils" mode={mode} toggle={toggle} btnn={btnn}/>               
      <Alert alert={alert}/>
      <Routes>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/" element={<TextForm showAlert={showAlert} heading = "Enter your text here to analyze" mode={mode}/>} />
      </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;