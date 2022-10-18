import React, { useEffect } from "react";
import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
import MainScene from "./scenes/MainScene";
import GameMenu from "../../Components/GameMenu/GameMenu";

const config = {
        width: window.innerWidth * window.devicePixelRatio,
        height : window.innerHeight * window.devicePixelRatio,
        backgroundColor : '#333333',
        type: Phaser.AUTO,
        parent : '',
        scene : [MainScene],
        scale : {
            parent : '',
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

    const Game = () => {
        
        useEffect(() => {
            new Phaser.Game(config);
        });

    }; // close Game

    export default Game