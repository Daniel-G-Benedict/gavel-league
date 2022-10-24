import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

// import styles
import "./Score.css"

// import assets
import logo from '/Users/benedicd/Desktop/Github/gavel-league/src/GL_Logo_MidFi.png'

const Score = () => {

const navigate = useNavigate();

useEffect (() => {
  var i = 0;
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("progressFg");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        return
        //navigate('./Main-Menu')
      } else {
        width += .5;
        elem.style.width = width + "%";
      }
    }
}
})//close use effect

return (
//<div onLoad="javascript:move()"/>
<div id="container">
  <div>
  	<img src={logo} alt="Gavel League Logo"></img>
  </div>
  <div id="title">
  	Scenario Complete!
  </div>
  <div id="progressBg">
    <div id="progressFg"></div>
  </div>
  <button className="btn" onPointerDown={()=> {window.location.replace("./Game")}}> return to game </button>
  <button className="btn" onPointerDown={()=> {window.location.replace("./Main-Menu")}}> return to Main Menu </button>
</div>
)
} // close splash

export default Score

  