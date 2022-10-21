import Phaser from "phaser";

import VirtualJoyStick from "phaser3-rex-plugins/plugins/virtualjoystick";

export default class userInterface {

    constructor(data) {
        let {scene,width,height} = data;
        this.add.existing(this)
    }

    create(scene,width,height) {

        // draw safe area
        let safeArea = this.add
        .rectangle(
        0,0,
        width,
        height,
        )
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
                                            alert("Action!");
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

    }// close create

    update() {

    }//close update

}