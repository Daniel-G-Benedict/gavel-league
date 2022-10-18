// import dependancies
import React from "react";
import { useNavigate } from "react-router-dom";

// import assets
import logo from '/Users/benedicd/Desktop/Github/gavel-league/src/GL_Logo_MidFi.png'

// import style
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
			<div className="menu-column">
				<span className="title">Profiles</span>
				<div className="menu-item" onClick={() => onMenuItemClicked("Name")}><span className="menu-title">Name</span></div>
				<div className="menu-item" onClick={() => onMenuItemClicked("Name")}><span className="menu-title">Name</span></div>
				<div className="menu-item" onClick={() => onMenuItemClicked("Name")}><span className="menu-title">Name</span></div>
			</div>
			<div className="btn-column">
				<button type="button" className="button" onClick={() => onStartClicked()}>Start</button>
			</div>
		</div>
		<div id="box">
			<img id="menuLogo" src={logo} alt="Gavel League Logo"></img>
		</div>
		</div>
	)

}

export default MainMenu;