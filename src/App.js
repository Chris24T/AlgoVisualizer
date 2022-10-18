import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Visualization from "./componsents/visualization"
import NavBar from "./componsents/navBar"


function App() {

  let
  [animate, setAnimate] = useState(false)

  return (
    
    <React.Fragment>
      <header>
        <NavBar onClick={onAnimate}/>
      </header>
      
          <Visualization animate={animate}/>

    </React.Fragment>
        
  );

  function onAnimate() {
    setAnimate(!animate)
  }


  
}


export default App;
