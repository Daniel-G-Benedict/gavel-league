
import React from "react";
import { useEffect } from "react";

import Phaser from "phaser";
import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";

import Player from "./scenes/player";

var nearBook = false;
var nearDoor = false;

var triggerTime;
var actionButton;

class MainScene extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('bg', require("/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/testTile.png"));

        this.load.image('Apartment', require("/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/Apartment.png"))
        
        this.load.image('Book', "/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/book3.png");

        Player.preload(this);
    }

    create ()
    {
        //  Set the camera and physics bounds to be the size of 4x4 bg images
        this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
        this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

        //console.log(this.cameras.main._bounds.width)

        //set apartment background
        this.add.sprite(0,0, 'Apartment').setOrigin(0,0)
        
        //set apartment background
        this.book = this.add.sprite(1118,700, 'Book').setScale(4);

        //  Mash 4 images together to create our background
        //this.add.tileSprite(0, 0,8000, 4500, 'bg');


    // create input keys
        this.cursors = this.input.keyboard.createCursorKeys();
    // create the player
        this.player = new Player({scene:this, x: 1780, y: 481, texture : 'player', frame: "player_1"});
        
        
        this.physics.add.existing(this.player, false);
        this.player.body.setCollideWorldBounds(true);

        console.log(this.player)

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        var winWidth = (document.body.offsetWidth)
        var winHeight = (document.body.offsetHeight)

        // draw safe area
        let safeArea = this.add
        .rectangle(
        0,0,
        winWidth,
        winHeight,
        0xff00ff,
        0.08
        )
        .setStrokeStyle(4, 0xff00ff, 0.25)
        .setOrigin(0)
        .setDepth(2)
        .setScrollFactor(0)

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
                                        window.location.replace("./")
                                        })
                .on('pointerover', () => closeGame.setStyle({ fill: '#f39c12' }))
                .on('pointerout', () => closeGame.setStyle({ fill: '#00FF00' }));        

        // add a "action button"
        actionButton = this.add.text(safeArea.width - 132, safeArea.height -84, 'Action')
                .setOrigin(0)
                .setPadding(20)
                .setScrollFactor(0)
                .setStyle({ color:'white', backgroundColor: 'Blue' })
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                                          console.log("action!");
                                        // Simulate an HTTP redirect:
                                        if (nearBook == true) {
                                            
                                            window.location.replace("./book")
                                        }
                                        if (nearDoor == true) {

                                            window.location.replace("./door")
                                        }
                                        })
                .on('pointerover', () => actionButton.setStyle({ fill: '#f39c12' }))
                .on('pointerout', () => actionButton.setStyle({ fill: '#FFF' }));

        // create controls
        this.joyStick = new VirtualJoyStick(this, {
            x:  safeArea.x + 132,
            y : safeArea.height - 132,
            radius: 100,
            base: this.add.circle(0, 0, 100, 0x888888),
            thumb: this.add.circle(0, 0, 50, 0xcccccc),
            dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true
        })
        .on('update', this.dumpJoyStickState, this)
        .setScrollFactor(0);

        // create debugging text fields
        //this.text = this.add.text(0, 0);
        this.dumpJoyStickState();

    }

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

        if (this.player.body.x > this.book.x - 200 && this.player.body.x < this.book.x + 200) {

            if (this.player.body.y > this.book.y - 200 && this.player.body.y < this.book.y + 200) {
                //if (currentTime - 700 > triggerTime) {}
                console.log("new trigger!")
                triggerTime = Date.now();
                console.log(actionButton.style.backgroundColor)

                nearBook = true;
            
            }
        }
        else { nearBook = false}


        if (this.player.body.x > 1560 && this.player.body.x < 2000) {

            if (this.player.body.y > 1300) {
                //if (currentTime - 700 > triggerTime) {}
                console.log("near door!")

                nearDoor = true;
            
            }
        }
        else { nearDoor = false}

    }

    }
    

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.FIT,
        width: '100%',
        height: '100%'
    },
    physics: {
        default: 'arcade',
    },
    scene: [ MainScene ]
};

const NewGame = () => {
    <div id="phaser-example"></div>
    useEffect(() => {
      const  game = new Phaser.Game( config);
    });
    
    }; // close Game
    
    export default NewGame