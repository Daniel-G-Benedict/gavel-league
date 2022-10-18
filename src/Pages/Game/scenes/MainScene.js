import { useNavigate } from "react-router-dom";

import Phaser from "phaser"
import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";
import Player from "./player";

//import assets


export default class MainScene extends Phaser.Scene {

    constructor() {
        super("MainScene")
    } // close constructor

    preload() { 
        console.log("Preload")
        //load the bg image
        this.load.image('bedroom', require('/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/BR.png'));
        Player.preload(this);
    } // close preload()

    
    create() {
        console.log("creating game")
              
        // get screen width and height
        var winWidth = (document.body.offsetWidth)
        var winHeight = (document.body.offsetHeight)

        this.background = this.add.image(0,0, 'bedroom')
        .setOrigin(0,0);

        this.background.displayHeight = winHeight;
        this.background.displayWidth = winWidth;

        //console.log("The window inner height is " + window.innerHeight)
        //console.log("The window offset height is " + document.body.offsetHeight)


        // detect the browser type         
        let vendor = navigator.vendor;
        //console.log(vendor)
        // modify screen size based on vendor
        if (vendor == "Google Inc.") {
            console.log("the browser is " + vendor)
            var joyX = Math.floor(winWidth * .35);
            var joyY = Math.floor(winHeight * .8);

            var menuX = Math.floor(winWidth * .85)
            var menuY = Math.floor(winHeight * .1)
        }
        else {
            console.log("the browser is " + vendor)
            var joyX = Math.floor(winWidth * .25);
            var joyY = Math.floor(winHeight * .75);

            var menuX = Math.floor(winWidth * .85)
            var menuY = Math.floor(winHeight * .1)
        }

        
        //console.log("winWidth : " + winWidth + typeof(winHeight))
        //console.log("winHeight : " + winHeight + typeof(winWidth))
        //console.log("joyX : " + joyX + typeof(joyX))
        //console.log("joyY : " + joyY + typeof(joyY))

        // create controls
        this.joyStick = new VirtualJoyStick(this, {
            x:  joyX,
            y : joyY,
            radius: 100,
            base: this.add.circle(0, 0, 100, 0x888888),
            thumb: this.add.circle(0, 0, 50, 0xcccccc),
            dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true
        })
        .on('update', this.dumpJoyStickState, this);

        // create debugging text fields
        this.text = this.add.text(0, 0);
        this.dumpJoyStickState();
       
        //console.log("The joystick X is : " + this.joyStick.x)
        //console.log("The joystick y is : " + this.joyStick.y)

        var spriteX = (winWidth/2);
        var spriteY = (winHeight/2);

        this.player = new Player({scene:this, x: spriteX, y: spriteY, texture : 'player', frame: "player_1"});
        this.add.existing(this.player);
       
        // create sprite / player
        this.player.inputKeys = this.input.keyboard.addKeys({
                    // create controls
                    up : Phaser.Input.Keyboard.KeyCodes.UP,
                    down : Phaser.Input.Keyboard.KeyCodes.DOWN,
                    left : Phaser.Input.Keyboard.KeyCodes.LEFT,
                    right : Phaser.Input.Keyboard.KeyCodes.RIGHT,
                })// close addKeys()
    
        // add a "menu button"
        const button = this.add.text(menuX, menuY, 'Close Game')
                .setOrigin(0)
                .setPadding(10)
                .setStyle({ color:'black', backgroundColor: 'red' })
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                                          console.log("game closed");
                                        // Simulate an HTTP redirect:
                                        window.location.replace("./")
                                        })
                .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
                .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
        
        /*
        this.anims.create({
            key: "walk",
            frames : this.anims.generateFrameNumbers("player", {start : 0, end : 5}),
            frameRate:10,
            repeat: -1
        })
        */

    } // close create()

    dumpJoyStickState() {
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += `${name} `;
            }
        }
    
        s += `
    Force: ${Math.floor(this.joyStick.force * 100) / 100}
    Angle: ${Math.floor(this.joyStick.angle * 100) / 100}
    `;
    
        s += '\nTimestamp:\n';
        for (var name in cursorKeys) {
            var key = cursorKeys[name];
            s += `${name}: duration=${key.duration / 1000}\n`;
        }
        this.text.setText(s);
    }

    update() {

        // get screen width and height
        var winWidth = (document.body.offsetWidth)
        var winHeight = (document.body.offsetHeight)

        var cursorKeys = this.joyStick.createCursorKeys()
        this.player.update(cursorKeys,this,winWidth,winHeight)
    } // close update()


} // close MainScene