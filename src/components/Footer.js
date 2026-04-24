import React from 'react';

import "./Footer.css";

export default function Footer() {
 
    var currentYear = new Date().getFullYear();
   
  return (
    <footer className="footer">
    <p>{currentYear} || Made with <span className='love'>&#10084;</span> by lunatic.exe </p>
  </footer>
  )
  
}


