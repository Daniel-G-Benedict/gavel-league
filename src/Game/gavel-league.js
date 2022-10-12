import React from "react";
import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
import MainScene from "./scenes/MainScene";


    const config = {
        width: window.innerWidth * window.devicePixelRatio,
        height : window.innerHeight * window.devicePixelRatio,
        backgroundColor : '#333333',
        type: Phaser.AUTO,
        parent : 'gavel-league',
        scene : [MainScene],
        scale : {
            parent : 'gavel-league',
            mode : Phaser.Scale.FIT,
            autoCenter : Phaser.Scale.CENTER_BOTH,
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

const Game = new Phaser.Game(config);

export default Game