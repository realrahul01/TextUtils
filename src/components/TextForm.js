import React, { useState } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function TextForm(props) {
  const [text,setText] = useState("")
  // const {speak} = useSpeechSynthesis()


  const startListening = ()=>{
    SpeechRecognition.startListening({continuous:true})
    document.title = "Textutils - start speaking"
  }
  const stopListening = ()=>{
    SpeechRecognition.stopListening({continuous:true})
    document.title = "Textutils - stop speaking"
  }
  
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()
  
  
  if (!browserSupportsSpeechRecognition) {
    return null
  }


const handleUpClick = ()=>{
    setText(text.toUpperCase())
    props.showAlert("Converted to Uppercase!" ,"success")
    document.title = "Textutils - Upper case"
}
const handleLowerClick = ()=>{
    setText(text.toLowerCase())
    props.showAlert("Converted to Lowercase!","success")
    document.title = "Textutils - Lower case"
}
const handleCopy = ()=>{
  let input = document.getElementById("myInp");
  input.select()
  document.execCommand("Copy")
  props.showAlert("Copied to Clickboard!","success")
  document.title = "Textutils - Copy text"
} 
const camelCase = ()=>{
  let str = text
  let arr = str.split(" ")
  console.log(arr)
    const map = arr.map((e,index)=>{
  if(index === 0){
    return e.toLowerCase()
  }
  return e.charAt().toUpperCase() + e.slice(1)   
}).join("")                                 
  console.log(map)
  setText(map)
  props.showAlert("Converted to camelCase!","success")
  document.title = "Textutils - convert to Camelcase"
}

  
const handleRemoveExtraSpace = ()=>{
    let newTxt = text.split(/[ ]+/)
    setText(newTxt.join(" "))
    props.showAlert("Extra spaces removed!","success")
    document.title = "Textutils - Remove extra space"
  }

const handleClearClick = ()=>{
  setText(" ")
  props.showAlert("Text cleared!","success")
  document.title = "Textutils - Clear text"
}  


// const handleSpeak=()=>{
//   speak({text:text})
//   // npm install react-speech-kit --legacy-peer-deps
//   // this command need to write to install this speech dependancy
// }


  const onChangeHandler = (e)=>{
    setText(e.target.value)
}



  return (
    <>
    <div className="container" style={{color: props.mode==='dark'?'white':'black'}} >
        <h3>{props.heading}</h3>
      <div className="mb-2">
        <textarea style={{backgroundColor: props.mode==='dark'?'grey':'white',color:props.mode==='dark'?'white':'black'}} className="form-control" value={text} onChange={onChangeHandler} id="myInp" rows="7"></textarea>
      </div>
        <button disabled={text.length===0} onClick={handleUpClick} className="btn btn-success">Convert to Uppercase</button>
        <button disabled={text.length===0} onClick={handleLowerClick} className="btn btn-primary my-2 mx-1">Convert to Lowercase</button>
        <button disabled={text.length===0} onClick={handleCopy} className="btn btn-danger my-2 mx-1">Copy text</button>
        <button disabled={text.length===0} onClick={camelCase} className="btn btn-warning my-2 mx-1">Convert to camelCase</button>
        <button disabled={text.length===0} onClick={handleRemoveExtraSpace} className="btn btn-secondary my-2 mx-1">Remove white spaces</button>
        <button disabled={text.length===0} onClick={handleClearClick} className="btn btn-info mx-1">Clear Text</button>
        <button type="submit" disabled={text.length===0} onClick={startListening} className="btn btn-success mx-2 my-2">Start Listening</button>
        <button type="submit" onClick={stopListening} disabled={text.length===0} className="btn btn-success mx-2 my-2">Stop Listening</button>
        {/* <button type="submit" onClick={handleSpeak} className="btn btn-dark mx-2 my-2">Speak</button> */}
    </div>
      <div className="container my-2" style={{color: props.mode==='dark'?'white':'black'}}>
        <p>{transcript}</p>
        <h3>Your   test summary </h3>
        <p> {text.split(/\s+/).filter((e)=>{return e.length !==0}).length} words, {text.length} character</p>
        <p>{0.008 * text.split(" ").filter((e)=>{return e.length !==0}).length} minutes to read</p>
        <h3>Preview</h3>
        <p>{text}</p> 
      </div>
    </>
  )
}

export default TextForm
