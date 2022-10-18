// import dependancies
import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

// import style
import './App.css';

// import Pages / "Route"
import MainMenu from "./Pages/MainMenu/MainMenu";
import Game from "./Pages/Game/gavel-league"
import Splash from "./Pages/Splash/splash";

// create the App component
let App = () => {
  
// the HTML to export
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="gavel-league" element={<Splash/>}/>
        <Route path="gavel-league/Main-Menu" element={<MainMenu/>}/>
        <Route path="gavel-league/Game" element={<Game/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

// export to send over to the index.js file
export default App;
