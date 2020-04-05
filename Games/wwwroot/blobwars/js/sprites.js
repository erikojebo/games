bw.sprites = {};

bw.sprites.init = function (scene) {

    bw.sprites.ship = new Ship(scene, scene.sys.game.config.width / 2, scene.sys.game.config.height - 100);
    
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

bw.sprites.createAlien = function (scene) {

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
    let alien = new Alien(scene, randomX, 0, spriteKey);
    
    bw.sprites.aliens.add(alien);

    if (spriteKey === "alien_shield_sheet") {
        alien.play("sköld");
    }
};