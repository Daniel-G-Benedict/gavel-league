// import framework
import { useEffect } from "react";

// import dependencies
import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';

// import scenes
import MainScene from "./scenes/MainScene";

const config = {
       
        backgroundColor : '#28de43',
        type: Phaser.AUTO,
        parent : '',
        scene : [MainScene],
        scale: {
            mode: Phaser.Scale.FIT,
            width: '100%',
            height: '100%'
        }, // close scale
        physics : {
            default : 'matter',
            matter : {
                debug : true,
                gravity : {y:0},
            }
        }, // close physics
        plugins : {
            global : [
                {
                    plugin: VirtualJoystick,
                    key: 'rexVirtualJoystick',
                    start: true
                },
                {
                    plugin : PhaserMatterCollisionPlugin,
                    key : 'matterCollision',
                    mapping : 'matterCollision'
                }
            ] // close scene
        } // close plugins
    } // close config

    const Game = () => {

        useEffect(() => {
          //const game = new Phaser.Game(config);
        });

    }; // close Game


    export default Game