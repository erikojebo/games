var cursors;
var spaceKey;
var gameState = "running";
var justFired = false;
var timeSinceLastEnemySpawn = 0;

let config = bw.config.createConfig(create, update);

var game = new Phaser.Game(config);
var random = new Math.seedrandom();


function create() {

    // Add the background image first so that everything else is drawn on top of it
    this.add.image(config.width / 2, config.height / 2, 'space_background');

    bw.hud.init(game, this);
    bw.sounds.init(this);
    bw.animations.create(this);
    bw.sprites.init(this);

    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.overlap(bw.sprites.ship, bw.sprites.aliens, onShipAlienCollission, null, this);
    this.physics.add.overlap(bw.sprites.bullets, bw.sprites.aliens, onAlienHitByLaser, null, this);
}

function update() {

    timeSinceLastEnemySpawn += 1;

    var spawnTimeLimit = 120 - bw.hud.scoreBoard.score / 10; // 2 sekunder från start, minskar när poängen ökar

    if (spawnTimeLimit < 20) {
        spawnTimeLimit = 20;
    }

    if (timeSinceLastEnemySpawn > spawnTimeLimit && Math.random() > 0.5) {

        createAlien();

        timeSinceLastEnemySpawn = 0;
    }

    let ship = bw.sprites.ship;
    let aliens = bw.sprites.aliens;
    let bullets = bw.sprites.bullets;

    aliens.setVelocityY(30);
    bullets.setVelocityY(-1000);

    aliens.children.iterate(function (alien) {
        if (alien.y > config.height) {
            gameOver();
        }
    });

    if (cursors.left.isDown) {
        ship.setVelocityX(-400);

        //ship.anims.play('left', true);
    } else if (cursors.right.isDown) {
        ship.setVelocityX(400);

        //player.anims.play('right', true);
    } else if (cursors.up.isDown) {
        ship.setVelocityY(-330);

    } else if (cursors.down.isDown) {
        ship.setVelocityY(330);

    } else {
        stopMovement(ship);
        //player.anims.play('turn');
    }

    if (spaceKey.isDown && !justFired) {
        bullets.create(ship.x, ship.y - ship.height / 2, "bullet");
        bw.sounds.laser.play();
        justFired = true;
    }

    if (spaceKey.isUp) {
        justFired = false;
    }
}

function stopMovement(obj) {
    obj.setVelocityX(0);
    obj.setVelocityY(0);
}

function onShipAlienCollission(ship, alien) {
    explodeAt(alien.x, alien.y);
    explodeAt(ship.x, ship.y);

    alien.disableBody(true, true);
    ship.disableBody(true, true);

    gameOver();
}

function onAlienHitByLaser(laser, alien) {

    if (alien.anims.currentAnim != null && alien.anims.currentAnim.key === 'sköld') {
        alien.play("sköld_trasig");
    } else if (alien.anims.currentAnim != null && alien.anims.currentAnim.key === 'sköld_trasig') {
        alien.play("ingen_sköld");
    } else {
        killAlien(alien);
    }

    laser.disableBody(true, true);
}

function killAlien(alien) {

    alien.disableBody(true, true);
    
    bw.hud.scoreBoard.addScore(10);
    
    explodeAt(alien.x, alien.y);
    bw.sounds.explosion.play();
}

function gameOver() {
    bw.hud.gameOver();
}

function createAlien() {
    let randomX = Math.random() * config.width;
    var spriteKey = getAlienSpriteKey();
    var alien = bw.sprites.aliens.create(randomX, 0, spriteKey);

    if (spriteKey === "alien_shield_sheet") {
        alien.play("sköld");
    }
}

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

function explodeAt(x, y) {
    var exp = bw.sprites.explosions.create(x, y);
    exp.play("explode");
}