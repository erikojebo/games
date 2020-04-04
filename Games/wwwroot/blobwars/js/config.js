bw.config = {};

bw.config.createConfig = function (create, update) {

    return {
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
        scene: {
            preload: bw.loader.preload,
            create: create,
            update: update
        }
    };
};