bw.loader = {};

bw.loader.preload = function (scene) {
    scene.load.audio('laser_sound', ['assets/sounds/8-bit-laser.mp3']);
    scene.load.audio('explosion_sound', ['assets/sounds/explosion2.wav']);

    scene.load.image('fairy', 'assets/fairy1_300.png');
    scene.load.image('bullet', 'assets/laser1.png');
    scene.load.image('alien', 'assets/alien1.png');
    scene.load.image('alien2', 'assets/alien2_300.png');
    scene.load.image('apocalypse', 'assets/apocalypse_large.png');
    scene.load.image('sky', 'assets/sky.png');
    scene.load.image('space_background', 'assets/space_background2.png');
    scene.load.image('ship1', 'assets/ship1_300.png');

    scene.load.spritesheet('explosion_sheet', 'assets/explosion_sheet_large.png', {frameWidth: 40, frameHeight: 40});
    scene.load.spritesheet('alien2_shield_sheet', 'assets/alien2_med_sköld_large_2.png', {
        frameWidth: 40,
        frameHeight: 40
    });
};