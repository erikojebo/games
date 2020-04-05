bw.sprites = {};

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    autoCenter: true,
    parent: "canvas-container",
    expandParent: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    },
    scene: GameScene
};

var game = new Phaser.Game(config);
var random = new Math.seedrandom();