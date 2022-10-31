
import React from "react";
import { useEffect } from "react";

import Phaser from "phaser";
import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";

import Player from "./scenes/player";
import { useNavigate, useParams } from "react-router-dom";

var nearBook = false;
var nearDoor = false;

var actionButton;

var bookSignal;

var knock1;
var knock2;

var triggerTime;

var objectiveText = ["Find your book to study your Miranda Rights!","See who's knocking at the door!"]

const NewGame = (props) => {

    const navigate = useNavigate();

    let { objective } = useParams();

    console.log(objective.split(':')[1])

    class MainScene extends Phaser.Scene
    {
        constructor ()
        {
            super();
        }
    
        preload ()
        {
            this.load.image('bg', require("/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/book1.png"));
    
            this.load.image('Apartment', require("/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/Apartment.png"))

            console.log("loading book")
            
            this.load.image('Book', "/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/book.png");
    
            Player.preload(this);
        }
    
        create () {
            //  Set the camera and physics bounds to be the size of 4x4 bg images
            this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
            this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);
    
            //console.log(this.cameras.main._bounds.width)
    
            //set apartment background
            this.add.sprite(0,0, 'Apartment').setOrigin(0,0)

            // set the book signal
            bookSignal = this.add.rectangle(1118,700,50,75)
            .setStrokeStyle(8,"0x0D7CA6",1)
            
            //set the book image
            this.book = this.add.sprite(1118,700, 'bg').setScale(.15);
    
            //  Mash 4 images together to create our background
            //this.add.tileSprite(0, 0,8000, 4500, 'bg');
    
            console.log("creating player")
        // create input keys
            this.cursors = this.input.keyboard.createCursorKeys();
        // create the player
            this.player = new Player({scene:this, x: 1780, y: 481, texture : 'player', frame: "player_1"});
            
            console.log("done creating player")
            this.physics.add.existing(this.player, false);
            this.player.body.setCollideWorldBounds(true);
    
            console.log(this.player)
    
            this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    
            var winWidth = (document.body.offsetWidth)
            var winHeight = (document.body.offsetHeight)

            console.log(window.screen)

            var winOrientation;
            
            if ("orientation" in window.screen) {
                console.log("it's there")
                winOrientation = (window.screen.orientation.angle)
            }

            else {
                if (window.screen.availHeight < window.screen.availWidth) {
                    winOrientation = 90;
                }
                else {
                    winOrientation = 0;
                }
            }

            console.log(winOrientation)

    
            // draw safe area
            let safeArea = this.add
            .rectangle(
            0,0,
            winWidth,
            winHeight,
            )
            .setOrigin(0)
            .setDepth(2)
            .setScrollFactor(0)

            let objectiveTitle = this.add.text(32, 32, "Objectives")
                    .setOrigin(0)
                    .setPadding(10)
                    .setScrollFactor(0)
                    .setStyle({color:'white', backgroundColor : "black"})
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {
                        console.log("Been pressed")
                        alert("Current objective!\n" + objectiveText[objective.split(':')[1]])
                      })
    
           // add a "menu button"
            let closeGame = this.add.text(safeArea.width - 84, safeArea.y + 32, ' X ')
                    .setOrigin(0)
                    .setPadding(10)
                    .setScrollFactor(0)
                    .setStyle({ color:'black', backgroundColor: 'red' })
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {
                                              console.log("game closed");
                                            // Simulate an HTTP redirect:
                                            this.sys.game.destroy(true);
                                            navigate("/")
                                            })
                    .on('pointerover', () => closeGame.setStyle({ fill: 'white' }))
                    .on('pointerout', () => closeGame.setStyle({ fill: 'black' }));  
            /*        
            actionButton = this.add.circle(safeArea.width - 132, safeArea.height -84,50,'1B5299')
                                            .setScrollFactor(0);
            */
            // add a "action button"
            
            actionButton = this.add.text(safeArea.width - 132, safeArea.height -84, 'Action')
                    .setOrigin(0)
                    .setPadding(20)
                    .setScrollFactor(0)
                    .setStyle({ color:'white', backgroundColor: 'Blue' })
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {
                                            // Simulate an HTTP redirect:
                                            if (nearBook == true) {
                                                navigate("/book")
                                            }
                                            if (nearDoor == true) {
                                                navigate("/door")
                                            }
                                            })
                    .on('pointerover', () => actionButton.setStyle({ fill: 'White' }))
                    .on('pointerout', () => actionButton.setStyle({ fill: '#Blue' }));

            console.log("the objective is " + objective)

            knock1 = this.add.text(1780, 2400, "Knock")//1700, 2000, "Knock")
            .setOrigin(0)
            .setStyle({fontFamily : "open sans", color : 'red', fontSize : 100})

            knock2 = this.add.text(1780, 2450, "Knock")//1700, 2000, "Knock")
            .setOrigin(0)
            .setStyle({fontFamily : "open sans", color : 'red', fontSize : 80})

                                
            // create controls
            this.joyStick = new VirtualJoyStick(this, {
                x:  safeArea.x + 132,
                y : safeArea.height - 132,
                radius: 100,
                base: this.add.circle(0, 0, 100, 0x888888,80),
                thumb: this.add.circle(0, 0, 50, 0xcccccc,40),
                dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            })
            .on('update', this.dumpJoyStickState, this)
            .setScrollFactor(0)
            .on('pointerdown', function(pointer){
                //console.log(this._events.update[0].context.base.fillAlpha)
                //console.log(this._events.update[0].context.thumb.fillAlpha)
                this._events.update[0].context.base.fillAlpha = .35;
                this._events.update[0].context.thumb.fillAlpha = .35;
                //console.log(this._events.update[0].context.base.fillAlpha)
                //console.log(this._events.update[0].context.thumb.fillAlpha)
            })
            .on('pointerup', function(pointer) {
                this._events.update[0].context.base.fillAlpha = 80;
                this._events.update[0].context.thumb.fillAlpha = 40;
                //console.log(this._events.update[0].context.base.fillAlpha)
                //console.log(this._events.update[0].context.thumb.fillAlpha)
            });
    
            // create debugging text fields
            //this.text = this.add.text(0, 0);
            this.dumpJoyStickState();

            window.addEventListener("resize", ()=>{ 

                setTimeout( ()=> {
                    console.log("rotated")

                    if ("orientation" in window.screen) {

                        console.log("tracking orientation")
                        if (window.screen.orientation.angle != winOrientation) {
                            
                            console.log("the screen has been rotated")

                            var newWidth = winHeight;
                            var newHeight = winWidth;
        
                            winHeight = newHeight;
                            winWidth = newWidth;
        
                            winOrientation = window.screen.orientation.angle;
        
                        }
        
                        else {

                            console.log("the screen stayed the same orientation")
                            var newWidth = window.screen.availHeight;
                            var newHeight = window.screen.availWidth;
        
                            //console.log("the computed parent size height: " + newWidth)
                            //console.log("the computed parent size width : " + newHeight)
                            
                            //console.log(document.getElementsByTagName('canvas'))
                            //console.log("the computed canvas size width : " + document.getElementsByTagName('canvas').width)
        
                            //console.log("This is the offset values from the body")
                            //console.log("document Width " + document.body.offsetWidth)
                            //console.log("document Height " + document.body.offsetHeight)
                        }
                    }
        
                    else {
                        if ((winOrientation == 0 && window.screen.availHeight > window.screen.availWidth) ||  (winOrientation == 90 && window.screen.availHeight < window.screen.availWidth)) {

                            console.log("stayed the same")

                            var newWidth = window.screen.availWidth;
                            var newHeight = window.screen.availHeight;


                        }
                        else {

                            var newWidth = window.screen.availHeight;
                            var newHeight = window.screen.availWidth;
                            
                            winOrientation = 90;


                        }
                    }

            
                
                this.scale.setGameSize(newWidth, newHeight);

                console.log(this.scale)

                safeArea.displayWidth = newWidth;
                safeArea.displayHeight = newHeight;
                
                actionButton.x = safeArea.displayWidth - 132;
                actionButton.y = safeArea.displayHeight - 84;
                
                this.joyStick.x = 132;
                this.joyStick.y = safeArea.displayHeight - 132;
                
                closeGame.x = safeArea.displayWidth - 84;
                closeGame.y = +32;
                
                console.log("resize")
                
            }, 50)
            })
                
                
    
        } // close Create
    
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
            //this.text.setText(s);
        }

    
        update ()
        {
            //console.log(this.player)
    
            //this.player.setVelocity(0);
    
            var cursorKeys = this.joyStick.createCursorKeys()
            this.player.update(this.cursors,cursorKeys,this);

    
            //console.log(actionButton)
            var currentTime = Date.now(); 
        
        // check to see if the player is near the book
                if (objective.split(':')[1] == 0) {        
                       // console.log(bookSignal.geom)

                    if (bookSignal.geom.width < 700) {
                       // var signalWidth = bookSignal.geom.width + .5;
                        //var signalHeight = bookSignal.geom.height + .75;
                       // bookSignal.geom.setSize(signalWidth,signalHeight);
                    }
                    else {
                        bookSignal.geom.setSize((50,75));
                    }
                    
                    if (this.player.body.x > this.book.x - 300 && this.player.body.x < this.book.x + 300) {
                        if (this.player.body.y > this.book.y - 300 && this.player.body.y < this.book.y + 300) {
                            if (currentTime - 600 > triggerTime || triggerTime == null) {
                                triggerTime = Date.now();
                                if (actionButton.style.backgroundColor == 'Blue') {
                                    actionButton.setStyle({color:'Blue', backgroundColor: 'White'})
                                }
                                else {
                                    actionButton.setStyle({color:'White', backgroundColor: 'Blue'})
                                }
                            }
                            nearBook = true;
                        }
                    }
                    else {  
                            actionButton.setStyle({color:'White', backgroundColor: 'Blue'})
                            nearBook = false}
                }
    
        // check to see if the player is near the door
        if (objective.split(':')[1] == 1) {  
            nearBook = false;          
            if (this.player.body.x > 1560 && this.player.body.x < 2000) {
                if (this.player.body.y > 1300) {
                    if (currentTime - 600 > triggerTime || triggerTime == null) {
                        triggerTime = Date.now();
                        if (actionButton.style.backgroundColor == 'Blue') {
                            actionButton.setStyle({color:'Blue', backgroundColor: 'White'})
                        }
                        else {
                            actionButton.setStyle({color:'White', backgroundColor: 'Blue'})
                        }
                    }
                nearDoor = true;
            }
            else {  actionButton.setStyle({color:'White', backgroundColor: 'Blue'});
            nearDoor = false}
            }
        }
        //console.log(knock1)

       // console.log("near book? " + nearBook)
        //console.log("near door? " + nearDoor)

        var changeX;
        var changeY;

        if (objective.split(':')[1] == 1) {
            if (changeX == null) {
                changeX = 0;
                changeY = 3;
            }
            else {
                changeX = this.player.body.x - 1780;
            }

            knock1.y -= changeY;
            knock2.y -= changeY - .25;

            knock1.x += changeX;
            knock2.x += changeX;

            if (knock1.y < (this.player.body.y - 150)) {
                knock1.alpha -= .025;
                if (knock2.y < (this.player.body.y - 150)) {
                    knock2.alpha -= .025;
                }
                if(knock2.alpha <= 0){
                    knock1.y = 2400;
                    knock2.y = 2450;
                }
            }
            else {
                knock1.alpha = 1;
                knock2.alpha = 1;
            }
        }
    
        }// close update
    }
        
    
    var config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        scale: {
            mode: Phaser.Scale.NONE,
            width: '100%',
            height: '100%',
            autoRound: true
        },
        physics: {
            default: 'arcade',
        },
        scene: [ MainScene ]
    };
    
    useEffect(() => {
       
        const  game = new Phaser.Game(config);
        alert("New objective!\n" + objectiveText[objective.split(':')[1]])
        nearBook=false;
        nearDoor=false;
    });
    
    return(<div id="phaser-example"></div>)
   
    }; // close Game
    
    export default NewGame