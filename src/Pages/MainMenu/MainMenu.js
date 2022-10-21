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
		navigate("../gavel-league/Game")
	}

	return (
		<div>
		<div className="row">
			<div className="profile-column">
				<h2>Profiles</h2>
				<div className="profile" onClick={() => onMenuItemClicked("Name")}><span className="menu-title">Name</span></div>
				<div className="profile" onClick={() => onMenuItemClicked("Name")}><span className="menu-title">Name</span></div>
				<div className="profile" onClick={() => onMenuItemClicked("Name")}><span className="menu-title">Name</span></div>
			</div>
			<div className="btn-column">
				<button type="button" className="button" onClick={() => onStartClicked()}>Start</button>
			</div>
		</div>
		<div className="container">
			<img id="menuLogo" src={logo} alt="Gavel League Logo"></img>
			<h1>Gavel League</h1>
		</div>
		</div>
	)

}

export default MainMenu;