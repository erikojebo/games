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

bw.sprites.explodeAt = function (x, y) {
    let exp = bw.sprites.explosions.create(x, y);
    exp.play("explode");
};

bw.sprites.createAlien = function () {

    function getAlienSpriteKey() {
        let rnd = Math.random();

        if (rnd < 0.25) {
            return "apocalypse";
        }

        if (rnd < 0.5) {
            return "alien_shield_sheet";
        }

        return "alien";
    }
    
    let randomX = Math.random() * config.width;
    let spriteKey = getAlienSpriteKey();
    let alien = bw.sprites.aliens.create(randomX, 0, spriteKey);

    if (spriteKey === "alien_shield_sheet") {
        alien.play("sköld");
    }
};