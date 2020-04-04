bw.sprites = {};

bw.sprites.init = function (scene) {

    let ship = scene.physics.add.sprite(140, 450, 'ship1');
    ship.setCollideWorldBounds(true);
    bw.sprites.ship = ship;

    bw.sprites.fairy = scene.physics.add.sprite(1150, 75, 'fairy');

    bw.sprites.aliens = scene.physics.add.group();

    bw.sprites.bullets = scene.physics.add.group({
        key: 'bullet'
    });

    bw.sprites.explosions = scene.add.group({
        key: 'explosion_sheet'
    });
};