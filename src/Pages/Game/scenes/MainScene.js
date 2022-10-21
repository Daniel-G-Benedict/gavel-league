// import phaser dependencies
import Phaser from "phaser"
import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";

// import phaser assets and classes
import Player from "./player";
import resize from "../../../Components/GameMenu/resize";

//global variables
var nearBook = false;


export class MainScene extends Phaser.Scene {

    constructor() {
        super("MainScene")
    } // close constructor

    preload() { 
        console.log("Preload")
        //load the bg image
        this.load.image('testTile', require("/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/testTile.png"));
        //preload player assets
        Player.preload(this);
        console.log("player preloaded")
    } // close preload()

    
    create() {
        console.log("creating game")

        //console.log(GavelGame)

        this.add.tileSprite(0,0,500,500, 'testTile')
              
        // get screen width and height

        console.log(document.body)
        var winWidth = (document.body.offsetWidth)
        var winHeight = (document.body.offsetHeight)

       //console.log( Phaser.Physics.Matter)

        // the width and height of the world map
        this.cameras.main.setBounds(0, 0, 1 , 1)
        //Phaser.Physics.Matter.World.setBounds(0, 0, winWidth, winHeight)


        var spriteX = winWidth/2;
        var spriteY = winHeight/2;

        this.player = new Player({scene:this, x: spriteX, y: spriteY, texture : 'player', frame: "player_1"});
       
        // create sprite / player
        this.player.inputKeys = this.input.keyboard.addKeys({
                    // create controls
                    up : Phaser.Input.Keyboard.KeyCodes.UP,
                    down : Phaser.Input.Keyboard.KeyCodes.DOWN,
                    left : Phaser.Input.Keyboard.KeyCodes.LEFT,
                    right : Phaser.Input.Keyboard.KeyCodes.RIGHT,
                })// close addKeys()

        // camera should follow the player
        this.cameras.main.startFollow(this.player, true);
        
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
        let actionButton = this.add.text(safeArea.width - 132, safeArea.height -84, 'Action')
                .setOrigin(0)
                .setPadding(20)
                .setScrollFactor(0)
                .setStyle({ color:'white', backgroundColor: 'Blue' })
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                                          console.log("action!");
                                        // Simulate an HTTP redirect:
                                        if (nearBook == true) {
                                            alert("Action!")
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
        
        //new new resize
        //this.scale.on('resize', resize(), this);

        console.log(this)
    } // close create

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

    update() {

        // get screen width and height
        var winWidth = (document.body.offsetWidth)

        var cursorKeys = this.joyStick.createCursorKeys()
        this.player.update(cursorKeys,this);
        
        //console.log("The game component is... ");
        //console.log(this.game.canvas.width);

    } // close update()

    
} // close MainScene

export default MainScene
