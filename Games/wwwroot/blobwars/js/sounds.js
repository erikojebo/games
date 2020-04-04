bw.sounds = {};

bw.sounds.init = function (scene) {

    let laserSound = scene.sound.add('laser_sound');
    laserSound.setVolume(0.5);

    let explosionSound = scene.sound.add('explosion_sound');
    explosionSound.setVolume(0.5);
    
    bw.sounds.laser = laserSound;
    bw.sounds.explosion = explosionSound;
};