import { useState, useEffect, useRef } from "react";
import "./App.css";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Footer from "./components/Footer";

function App() {

  const [alert, setAlert] = useState(null);
  const alertTimerRef = useRef(null);
  const showAlert = (message, type) =>{
    setAlert({
      message:message,
      type:type
    })
    if (alertTimerRef.current) {
      clearTimeout(alertTimerRef.current);
    }
    alertTimerRef.current = setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  useEffect(() => {
    let toggle = true;
    const intervalId = setInterval(() => {
      document.title = toggle ? 'Amaizing' : 'Text Decoder';
      toggle = !toggle;
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);
  return (
  <>
  
  <Navbar title="Text Decorator"/>
  <Alert alert={alert}/>

  <div className="container my-3"> 
  <TextForm showAlert={showAlert} heading="Enter your text here"/>
  </div>
  <Footer/>
  </>
    
  );
}

export default App;
