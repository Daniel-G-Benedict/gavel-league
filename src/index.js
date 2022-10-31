import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter as Router,Routes} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import Pages / "Route"
import MainMenu from "./Pages/MainMenu/MainMenu";
import Score from "./Pages/Score/Score";
import Splash from "./Pages/Splash/splash";
import NewGame from "./Pages/Game/newGavelLeague";
import Book from "./Pages/Book/Book";
import Door from "./Pages/Door/Door";

var objective = 0;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Router basename={`/gavel-league`} >
        <Routes>
        <Route path="/" element={<Splash/>}/>
        <Route path="/Main-Menu" element={<MainMenu/>}/>
        <Route path="/Game/:objective" element={<NewGame />
                                              }/>
        <Route path="/book" element={<Book/>}/>
        <Route path="/door" element={<Door />}/>
        <Route path="/score/:playerScore" element={<Score/>}/>
        </Routes>
        <App />
      </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
