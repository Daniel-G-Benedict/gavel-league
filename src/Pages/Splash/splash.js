import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

// import styles
import "./splash.css"

// import assets
import logo from '/Users/benedicd/Desktop/Github/gavel-league/src/GL_Logo_MidFi.png'

const Splash = () => {

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
        i = 0;
        navigate('./Main-Menu')
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
  	Gavel League
  </div>
  <div id="progressBg">
    <div id="progressFg"></div>
  </div>
</div>
)
} // close splash

export default Splash

  