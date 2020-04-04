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

        bw.sprites.createAlien(this);

        timeSinceLastEnemySpawn = 0;
    }

    let bullets = bw.sprites.bullets;

    bullets.setVelocityY(-1000);
}

function onShipAlienCollission(ship, alien) {
    
    bw.sprites.explodeAt(ship.x, ship.y);
    ship.disableBody(true, true);

    alien.onHitByShip();
}

function onAlienHitByLaser(laser, alien) {

    alien.onHitByLaser();

    laser.disableBody(true, true);
}
