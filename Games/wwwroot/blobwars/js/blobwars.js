var cursors;
var spaceKey;
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

    bw.state.isGameOver = false;
}

function update() {

    if (bw.state.isGameOver) {
        this.physics.pause();
        return;
    }
    
    timeSinceLastEnemySpawn += 1;

    let spawnTimeLimit = 120 - bw.hud.scoreBoard.score / 10; // 2 sekunder från start, minskar när poängen ökar

    if (spawnTimeLimit < 20) {
        spawnTimeLimit = 20;
    }

    if (timeSinceLastEnemySpawn > spawnTimeLimit && Math.random() > 0.5) {

        bw.sprites.createAlien();

        timeSinceLastEnemySpawn = 0;
    }

    let aliens = bw.sprites.aliens;
    let bullets = bw.sprites.bullets;

    aliens.setVelocityY(30);
    bullets.setVelocityY(-1000);

    aliens.children.iterate(function (alien) {
        if (alien.y > config.height) {
            gameOver();
        }
    });
}



function onShipAlienCollission(ship, alien) {
    bw.sprites.explodeAt(alien.x, alien.y);
    bw.sprites.explodeAt(ship.x, ship.y);

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

    bw.sprites.explodeAt(alien.x, alien.y);
    bw.sounds.explosion.play();
}

function gameOver() {
    bw.hud.gameOver();
    bw.state.isGameOver = true;
}