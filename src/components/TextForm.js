import React, { useState } from 'react'

export default function TextForm(props) {

    const handleUpCase=()=>{
        // console.log("text");
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to Uppercase")
    }

    const handleCase =()=>{
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to Lowercase")
    }
    const clearText =()=>{
        let newText = ("");
        setText(newText)
        props.showAlert("Text Cleared")
    }

    const copyText =()=>{
        let text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Text Copy to Clipboard")
    }


    const handleOnChange=(event)=>{
        // console.log("on Change");
        setText(event.target.value)
    }

    let myStyle={
        fontFamily:'italic'
    }

    const [text, setText] = useState("");
    const wordCount = text.split(/\s+/).filter((element)=>{return element.length!==0}).length;
  return (
    <>
    <div className="mt-4">
    <h1 style={myStyle}>{props.heading}</h1>
  <div className="mb-3">
    <textarea className="form-control" onChange={handleOnChange} value={text} id="myBox" rows="8"></textarea>
    </div>
    <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleUpCase} >Convert to UpperCase</button>
    <button disabled={text.length===0} className="btn btn-success mx-2 my-2" onClick={handleCase} >Convert to LowerCase</button>
    <button disabled={text.length===0} className="btn btn-danger mx-2 my-2" onClick={clearText} >Clear Text</button>
    <button disabled={text.length===0} className="btn btn-secondary mx-2 my-2" onClick={copyText} >Copy Text</button>
  </div>

    <div className=" my-3 container">
        <h3>Your Word Summary</h3>
        <p>{wordCount} Words and {text.length} Characters</p>

        <h3>Estimated time to read</h3>
        <p>{0.008 * wordCount} Minutes</p>
    </div>
    <div className=' my-3 container' style={{width:"600px"}}>
        <h3>Preview</h3>
        
    <p style={{color:"black"}}>{text.length>0?text:"Nothing to preview"}</p>
    </div>

    </>
  )
}
