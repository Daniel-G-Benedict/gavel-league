import { useEffect } from 'react';
import './Door.css'

const Door = () => {
  return(<div>
  <h1>Hello there!</h1>
        <h1>I am a door page.</h1>
        <button onPointerDown={()=> {window.location.replace("./Game")}}> return to game </button>
    </div>
  )
}


const Door2 = () => {
   
// Variables
var messages = document.getElementById('message-list')
var btn = document.getElementById('btn')
var input = document.getElementById('userText')

// Button/Enter Key
//btn.addEventListener('click', sendMessage)
//input.addEventListener('keyup', function(e){ if(e.keyCode == 13) sendMessage() })

// Messenger Functions
function sendMessage(string){
   var msg = string;
   writeLine(msg)
}

function writeLine(text){
   var message = document.createElement('li')
   message.className = 'player-message';
   message.innerHTML = 'Ezekial says: ' + text
   document.getElementById('message-list').appendChild(message)
   //messages.scrollTop = messages.scrollHeight;
}
 
function addMessage(e){
   var msg = e.data ? JSON.parse(e.data) : e;
   writeLine(`${msg.FROM}: ${msg.MESSAGE}`)
}

return (
  <div>
  <div id="chat">
    <div id="messages">
      <ul id="message-list">
        <li id="officer-message">
          Officer says: Do you feel lucky?
        </li>
      </ul>
      <div id="message-input">
        <button type="button" className="btn" onPointerDown={()=>{sendMessage("Option A")}}>Option A</button>
        <button type="button" className="btn" onPointerDown={()=>{sendMessage("Option B")}}>Option B</button>
      </div>
    </div>
  <button className="btn" onPointerDown={()=> {window.location.replace("./Game")}}> return to game </button>
  </div>
</div>
)

} // close Door2


export default Door2;