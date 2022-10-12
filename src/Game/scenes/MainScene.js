import Phaser from "phaser"
import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";

export default class MainScene extends Phaser.Scene {

    constructor() {
        super("MainScene")
    } // close constructor

    preload() {
        console.log("Preload")
    } // close preload()
    create() {
        console.log("create")
              
        // get screen width and height
        var winWidth = (document.body.offsetWidth)
        var winHeight = (document.body.offsetHeight)

        console.log("The window inner height is " + window.innerHeight)
        console.log("The window offset height is " + document.body.offsetHeight)

        // detect the browser type
                 
        let vendor = navigator.vendor;

        console.log(vendor)


        if (vendor == "Google Inc.") {
            console.log("the browser is " + vendor)
            var joyX = Math.floor(winWidth * .35);
            var joyY = Math.floor(winHeight * .8);
        }
        else {
            console.log("the browser is " + vendor)
            var joyX = Math.floor(winWidth * .25);
            var joyY = Math.floor(winHeight * .75);
        }

        
        console.log("winWidth : " + winWidth + typeof(winHeight))
        console.log("winHeight : " + winHeight + typeof(winWidth))
        console.log("joyX : " + joyX + typeof(joyX))
        console.log("joyY : " + joyY + typeof(joyY))

        console.log(typeof(100))

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
       
        console.log("The joystick X is : " + this.joyStick.x)
        console.log("The joystick y is : " + this.joyStick.y)

        var spriteX = (winWidth/2);
        var spriteY = (winHeight/2);

                // create sprite / player
                this.player = new Phaser.Physics.Matter.Sprite(this.matter.world, spriteX, spriteY);
                // create controls
                this.inputKeys = this.input.keyboard.addKeys({
                    up : Phaser.Input.Keyboard.KeyCodes.UP,
                    down : Phaser.Input.Keyboard.KeyCodes.DOWN,
                    left : Phaser.Input.Keyboard.KeyCodes.LEFT,
                    right : Phaser.Input.Keyboard.KeyCodes.RIGHT,
                })// close addKeys()
    
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
        var cursorKeys = this.joyStick.createCursorKeys()
        //console.log(cursorKeys.up.isDown);
        
        const speed = 2.5;
        
        let playerVelocity = new Phaser.Math.Vector2();
        
        if(this.inputKeys.left.isDown || cursorKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.inputKeys.right.isDown || cursorKeys.right.isDown){
            playerVelocity.x = 1;
        }
        if(this.inputKeys.up.isDown || cursorKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown || cursorKeys.down.isDown){
            playerVelocity.y = 1;
        }
        playerVelocity.scale(speed);
        this.player.setVelocity(playerVelocity.x,playerVelocity.y);
        //console.log("update")
    } // close update()


} // close MainScene