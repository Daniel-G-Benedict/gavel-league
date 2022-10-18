import Phaser from "phaser";

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame)
        this.scene.add.existing(this)
    }

    static preload(scene) {
        scene.load.atlas('player', require('/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/player.png'),require("/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/player_atlas.json"));
        scene.load.animation('player_anim',require("/Users/benedicd/Desktop/Github/gavel-league/src/Pages/Game/scenes/Assets/player_anim.json"));
    }

    get velocity(){
        return this.body.velocity;
    }

    update(cursorKeys,scene, winWidth, winHeight) {

        //console.log(cursorKeys.up.isDown);

        //this.anims.play('walk',true);

        const speed = 2.5;
        
        let playerVelocity = new Phaser.Math.Vector2();
        
        if(this.inputKeys.left.isDown || cursorKeys.left.isDown) {
            playerVelocity.x = -1;
            this.angle = scene.joyStick.angle + 90;
        } else if (this.inputKeys.right.isDown || cursorKeys.right.isDown){
            playerVelocity.x = 1;
            this.angle = scene.joyStick.angle + 90;
        }
        if(this.inputKeys.up.isDown || cursorKeys.up.isDown) {
            playerVelocity.y = -1;
            this.angle = scene.joyStick.angle + 90;
        } else if (this.inputKeys.down.isDown || cursorKeys.down.isDown){
            playerVelocity.y = 1;
            this.angle = scene.joyStick.angle + 90;
        }

        if (this.x < 0) {
            this.x = 0;
        }
        if(this.x > winWidth) {
            this.x = winWidth;
        }

        if (this.y < 0) {
            this.y = 0;
        }
        if(this.y > winHeight) {
            this.y = winHeight;
        }


        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x,playerVelocity.y);

        
        //switch animation depending on player movement
        if(Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play('walk',true);
          }
        else{
            this.anims.play('idle',true);
        }
        //console.log("update")
    }
}