bw.sprites = {};

bw.sprites.init = function (scene) {

    bw.sprites.ship = new Ship(scene);
    
    bw.sprites.fairy = scene.physics.add.sprite(1150, 75, 'fairy');
    bw.sprites.aliens = scene.physics.add.group();
    bw.sprites.bullets = scene.physics.add.group();

    bw.sprites.explosions = scene.add.group({
        key: 'explosion_sheet'
    });
};

bw.sprites.explodeAt = function (x, y) {
    let explosion = bw.sprites.explosions.create(x, y);
    explosion.play("explode");
};