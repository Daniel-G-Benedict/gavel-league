// import dependancies
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

// import style
import './App.css';

// import Pages / "Route"
import MainMenu from "./Pages/MainMenu/MainMenu";
import Game from "./Pages/Game/gavel-league"
import Score from "./Pages/Score/Score";
import Splash from "./Pages/Splash/splash";
import NewGame from "./Pages/Game/newGavelLeague";
import Book from "./Pages/Book/Book";
import Door from "./Pages/Door/Door";

// create the App component
let App = () => {
  
// the HTML to export
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="gavel-league" element={<Splash/>}/>
        <Route path="gavel-league/Main-Menu" element={<MainMenu/>}/>
        <Route path="gavel-league/Game" element={<NewGame/>}/>
        <Route path="gavel-league/book" element={<Book/>}/>
        <Route path="gavel-league/door" element={<Door/>}/>
        <Route path="gavel-league/score" element={<Score/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

// export to send over to the index.js file
export default App;
