import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

// import styles
import "./Score.css"

// import assets
import logo from '/Users/benedicd/Desktop/Github/gavel-league/src/GL_Logo_MidFi.png'

const Score = (props) => {

  const navigate = useNavigate();
  let { playerScore } = useParams();
  
useEffect (() => {
    var trueScore = playerScore.split(':')[1]
    trueScore = Math.floor((trueScore/6)*100)
    console.log(trueScore)

    var i = 0;
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("expFG");
      var elem2 = document.getElementById("performance")
      var width = 1;
      function frame() {
        console.log("setting frame")
        if (width >= trueScore) {
          clearInterval(id);
          i =0;
        }
        else {
          width += .5
          elem.style.width = width + "%";
          console.log("The width is : " + width)
          elem2.innerText = width + " / 100"
        }
      }
      var id = setInterval(frame,10);
    }
})//close use effect

return (
//<div onLoad="javascript:move()"/>
<div id="container">
  <div>
  	<img id="expLogo" src={logo} alt="Gavel League Logo"></img>
  </div>
  <div id="title">
  	Scenario Complete!
  </div>
  <div id="expBG">
    <div id="expFG"></div>
  </div>
  <div id="performance"> 0 / 100</div>
  <div id="commandArea">
      <button className="btn" onPointerDown={()=> {navigate("/Game/:0")}}> Try again </button>
      <button className="btn" onPointerDown={()=> { navigate("/Main-Menu")}}> Main Menu </button>   
  </div>
</div>
)
} // close splash

export default Score

  