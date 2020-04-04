﻿var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    autoCenter: true,
    parent: "canvas-container",
    expandParent: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var fairy;
var ship;
var aliens;
var bullets;
var platforms;
var cursors;
var spaceKey;
var score = 0;
var scoreText;
var gameState = "running";
var justFired = false;
var timeSinceLastEnemySpawn = 0;
var laserSound;
var explosionSound;

var explosions;

const gameWidth = 1200;
const gameHeight = 800;

var game = new Phaser.Game(config);
var random = new Math.seedrandom();

let playPauseButton = document.getElementById("play-pause-button");

playPauseButton.addEventListener("click", function () {
    var isPaused = game.scene.isPaused("default");
    
    if (isPaused) {
        game.scene.resume("default");
        playPauseButton.innerText = "Pausa";
    } else {
        game.scene.pause("default");
        playPauseButton.innerText = "Fortsätt";
    }
});

function preload() {
    this.load.audio('laser_sound', [ 'assets/sounds/8-bit-laser.mp3' ]);
    this.load.audio('explosion_sound', [ 'assets/sounds/explosion2.wav' ]);

    this.load.image('fairy', 'assets/fairy1_300.png');
    this.load.image('bullet', 'assets/laser1.png');
    this.load.image('alien', 'assets/alien1.png');
    this.load.image('alien2', 'assets/alien2_300.png');
    this.load.image('apocalypse', 'assets/apocalypse_large.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('space_background', 'assets/space_background2.png');
    this.load.image('ship1', 'assets/ship1_300.png');

    this.load.spritesheet('explosion_sheet', 'assets/explosion_sheet_large.png', { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('alien2_shield_sheet', 'assets/alien2_med_sköld_large_2.png', { frameWidth: 40, frameHeight: 40 });

    //this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

// DOCUMENTATION:
// http://labs.phaser.io/edit.html?src=src/game%20objects/group/sprite%20pool.js

function create() {

    this.add.image(gameWidth / 2, gameHeight / 2, 'space_background');

    laserSound = this.sound.add('laser_sound');
    laserSound.setVolume(0.5);

    explosionSound = this.sound.add('explosion_sound');
    explosionSound.setVolume(0.5);

    fairy = this.physics.add.sprite(1150, 75, 'fairy');
    ship = this.physics.add.sprite(140, 450, 'ship1');

    ship.setCollideWorldBounds(true);

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion_sheet', { start: 0, end: 4 }),
        frameRate: 12,
        repeat: 0
    });

    this.anims.create({
        key: 'ingen_sköld',
        frames: [ { key: 'alien2_shield_sheet', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'sköld',
        frames: [ { key: 'alien2_shield_sheet', frame: 1 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'sköld_trasig',
        frames: [ { key: 'alien2_shield_sheet', frame: 2 } ],
        frameRate: 20
    });

    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    aliens = this.physics.add.group();

    bullets = this.physics.add.group({
        key: 'bullet'
    });

    explosions = this.add.group({
        key: 'explosion_sheet'
    });

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });

    this.physics.add.overlap(ship, aliens, onShipAlienCollission, null, this);
    this.physics.add.overlap(bullets, aliens, onAlienHitByLaser, null, this);
}

function update() {

    if (gameState == "game_over") {
        this.physics.pause();
        return;
    }

    timeSinceLastEnemySpawn += 1;

    var spawnTimeLimit = 120 - score / 10; // 2 sekunder från start, minskar när poängen ökar

    if (spawnTimeLimit < 20) {
        spawnTimeLimit = 20;
    }

    if (timeSinceLastEnemySpawn > spawnTimeLimit && Math.random() > 0.5) {

        createAlien();

        timeSinceLastEnemySpawn = 0;

        //this.anims.play('explode', true);
    }


    aliens.setVelocityY(30);
    bullets.setVelocityY(-1000);

    aliens.children.iterate(function (alien) {
        if (alien.y > gameHeight) {
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
        laserSound.play();
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
    score += 10;
    scoreText.setText('Score: ' + score);
    explodeAt(alien.x, alien.y);
    explosionSound.play();

}

function gameOver() {
    scoreText.setText("GAME OVER! :'(     Score: " + score);
    gameState = "game_over";
}

function createAlien() {
    let randomX = Math.random() * gameWidth;
    var spriteKey = getAlienSpriteKey();
    var alien = aliens.create(randomX, 0, spriteKey);

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
        //return "alien2";
        return "alien_shield_sheet";
    }

    return "alien";
}

function explodeAt(x, y) {
    var exp = explosions.create(x, y);
    exp.play("explode");
}