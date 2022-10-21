import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        let {scene,x,y,texture,frame} = data;
        super(scene,x,y,texture,frame)
        this.scene.add.existing(this)
    }

    static preload(scene) {
        scene.load.atlas('player', require('/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/player.png'),require("/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/player_atlas.json"));
        scene.load.animation('player_anim',require("/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/player_anim.json"));
    }

    get velocity(){
        return this.body.velocity;
    }

    update(cursors,cursorKeys,scene) {

        const speed = 2.5;
        
        let playerVelocity = new Phaser.Math.Vector2();
        
        if(cursors.left.isDown || cursorKeys.left.isDown) {
            playerVelocity.x = -150;
            this.angle = scene.joyStick.angle + 90;
        } else if (cursors.right.isDown || cursorKeys.right.isDown){
            playerVelocity.x = 150;
            this.angle = scene.joyStick.angle + 90;
        }
        if(cursors.up.isDown || cursorKeys.up.isDown) {
            playerVelocity.y = -150;
            this.angle = scene.joyStick.angle + 90;
        } else if (cursors.down.isDown || cursorKeys.down.isDown){
            playerVelocity.y = 150;
            this.angle = scene.joyStick.angle + 90;
        }
        /*
        if (this.x < 0) {
            this.x = 0;
        }
        if(this.x > scene.game.canvas.width) {
            this.x = scene.game.canvas.width;
        }

        if (this.y < 0) {
            this.y = 0;
        }
        if(this.y > scene.game.canvas.height) {
            this.y = scene.game.canvas.height;
        }
        */

        playerVelocity.scale(speed);
        this.body.setVelocityX(playerVelocity.x)
        this.body.setVelocityY(playerVelocity.y);

        
        //switch animation depending on player movement
        if(Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play('walk',true);
          }
        else{
            this.anims.play('idle',true);
        }

       // console.log(this.body.x)
        //console.log(this.body.y)
        //console.log("update")
    }
}