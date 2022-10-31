// import dependancies
import React from "react";
import { useNavigate } from "react-router-dom";

// import assets
import logo from '/Users/benedicd/Desktop/Github/gavel-league/src/GL_Logo_MidFi.png'

// import style
import '/Users/benedicd/Desktop/Github/gavel-league/src/App.css'
import './menu.css';

let MainMenu = (props) => {

const navigate = useNavigate();

	function onMenuItemClicked(value) {
		alert(value + ' Clicked');
	}
	
	function onStartClicked() {
		navigate("/Game/:0")
	}

	return (
		<div className="container">
			<div className="column" id="logo-container">
				<img id="menuLogo" src={logo} alt="Gavel League Logo"></img>
				<h1>Gavel League</h1>
			</div>
				<div id="input-container">
				<div className="column" id="profile-container">
					<h2>Select a player</h2>
					<div className="profile" onPointerDown={(e) => {if(e.target.style.backgroundColor == "rgb(215, 194, 76)") {
						console.log("change to white!")
																													e.target.style.backgroundColor = "white"
																													e.target.style.color = "black"
																													e.target.style.fontWeight = "300"
																													}
																	else {
																		console.log(e.target.style.backgroundColor)
																		e.target.style.backgroundColor = "rgb(215, 194, 76)"
																		e.target.style.color = "white"
																		e.target.style.fontWeight = "600"
																	}
																	
																	}}><span className="menu-title">Name</span></div>
					<div className="profile" onPointerDown={(e) => {if(e.target.style.backgroundColor == "rgb(215, 194, 76)") {
																													e.target.style.backgroundColor = "white"
																													e.target.style.color = "black"
																													e.target.style.fontWeight = "300"
																													}
																	else {
																		e.target.style.backgroundColor = "rgb(215, 194, 76)"
																		e.target.style.color = "white"
																		e.target.style.fontWeight = "600"
																	}
																	
																	}}><span className="menu-title">Name</span></div>
					<div className="profile" onPointerDown={(e) => {if(e.target.style.backgroundColor == "rgb(215, 194, 76)") {
							console.log("change back!")
																													e.target.style.backgroundColor = "white"
																													e.target.style.color = "black"
																													e.target.style.fontWeight = "300"
																													}
																	else {
																		e.target.style.backgroundColor = "rgb(215, 194, 76)"
																		e.target.style.color = "white"
																		e.target.style.fontWeight = "600"
																	}
																	
																	}}><span className="menu-title">Name</span></div>	
				</div>
				<div className="column" id="menu-container">
					<button type="button" className="primaryButton" onClick={() => onStartClicked()}>Start</button>
				</div>
			</div>
		</div>
		)
		
	}
	
	export default MainMenu;
	
	/*
	<h2>Profiles</h2>
<div>
*/