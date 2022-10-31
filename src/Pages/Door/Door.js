import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import doorBG from '/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/DoorBG.png'

import './Door.css'
import Scenario01 from './Scenario_01';

const Door2 = (props) => {
  console.log(Scenario01)

  const navigate = useNavigate();
  

   
// Variables
var messages = document.getElementById('message-list')
var btn = document.getElementById('btn')
var input = document.getElementById('userText')

// Button/Enter Key
//btn.addEventListener('click', sendMessage)
//input.addEventListener('keyup', function(e){ if(e.keyCode == 13) sendMessage() })

var playerScore = 0;

useEffect(() => {
  
  function setQuestion(index) {

    document.getElementById('messag-input');
    
    var curQuestion = Scenario01[index]; // obj
    var questNumb = curQuestion.QuestionNumber; // numb
    var offMsg = curQuestion.Question; // string
    var plyrRsps = curQuestion.Responses // array
    var correctrRsp = curQuestion.CorrectResponse // numb (index of correct question)
  
    // get the responses to that question and make them buttons
    function makeButton(option) {
      var newButton = document.createElement('button')
      newButton.classname = 'secondaryButton';
      newButton.type = 'button';
      newButton.innerText = option;
      newButton.value = option
      newButton.addEventListener("pointerdown", (e)=> {
        // when the button is selected, put the response in the chat
        console.log(e.target.value)
        writeLine(e.target.value,'player-message')
        // check to see if the response is the correct one
        console.log(plyrRsps[correctrRsp])
        if (e.target.value == plyrRsps[correctrRsp]) {
          console.log("it's correct!");
          playerScore++;
          console.log(playerScore)
        }
       // console.log(Scenario01.length)
        if (questNumb == Scenario01.length) {
          console.log("that's all folks!")
          navigate("/score/:" + playerScore);
        }
        else {
          setQuestion(questNumb)
          questNumb++;
        }
      })

      responseArea.appendChild(newButton)
    }
    // get the current question and put it in the chat
    writeLine(offMsg , 'officer-message');

    var responseArea = document.getElementById('message-input');
    responseArea.innerHTML = "";
    plyrRsps.forEach(makeButton);
  }

  setQuestion(0)
  
  // Messenger Functions
  
})// close useEffect

function sendMessage(string){
   var msg = string;
   writeLine(msg)
}

function writeLine(text, speaker){
   var message = document.createElement('li')
   message.className = speaker;
   message.innerHTML = text
   document.getElementById('message-list').appendChild(message)
   message.scrollIntoView()
   //messages.scrollTop = messages.scrollHeight;
}
 
function addMessage(e){
   var msg = e.data ? JSON.parse(e.data) : e;
   writeLine(`${msg.FROM}: ${msg.MESSAGE}`)
}


return (
  <div>
  <img id="doorBG" src={doorBG}></img>
  <div id="chat">
    <div id="messages">
      <ul id="message-list">
      </ul>
      <div id="message-input">
        </div>
    </div>
  <button className="btn" onPointerDown={()=> {navigate("/Game/:1")}}> return to game </button>
  </div>
</div>
)

} // close Door2


export default Door2;