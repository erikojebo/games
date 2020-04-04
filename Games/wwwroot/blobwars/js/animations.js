bw.animations = {};

bw.animations.create = function (scene) {
    scene.anims.create({
        key: 'explode',
        frames: scene.anims.generateFrameNumbers('explosion_sheet', { start: 0, end: 4 }),
        frameRate: 12,
        repeat: 0
    });

    scene.anims.create({
        key: 'ingen_sköld',
        frames: [ { key: 'alien2_shield_sheet', frame: 0 } ],
        frameRate: 20
    });

    scene.anims.create({
        key: 'sköld',
        frames: [ { key: 'alien2_shield_sheet', frame: 1 } ],
        frameRate: 20
    });

    scene.anims.create({
        key: 'sköld_trasig',
        frames: [ { key: 'alien2_shield_sheet', frame: 2 } ],
        frameRate: 20
    });  
};