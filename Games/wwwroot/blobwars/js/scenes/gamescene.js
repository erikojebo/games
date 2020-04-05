class GameScene extends Phaser.Scene {
    
    #timeSinceLastEnemySpawn = 0;
    #bossPointLimit = 50;
    
    constructor (config) {
        super(config);
    }

    init(data) {
    }
    
    preload () {
        bw.loader.preload(this);
    }
    
    create (data)  {
        // Add the background image first so that everything else is drawn on top of it
        this.add.image(config.width / 2, config.height / 2, 'space_background');

        bw.hud.init(game, this);
        bw.sounds.init(this);
        bw.animations.create(this);

        let scene = this;

        bw.sprites.ship = new Ship(scene);
        bw.sprites.fairy = scene.physics.add.sprite(1150, 75, 'fairy');
        bw.sprites.aliens = scene.physics.add.group();
        bw.sprites.bullets = scene.physics.add.group();
        bw.sprites.explosions = scene.add.group();

        this.physics.add.overlap(bw.sprites.ship, bw.sprites.aliens, this.onShipAlienCollission, null, this);
        this.physics.add.overlap(bw.sprites.bullets, bw.sprites.aliens, this.onAlienHitByLaser, null, this);

        bw.state.isGameOver = false;
    }
    
    update(time, delta) {
        if (bw.state.isGameOver) {
            this.physics.pause();
            return;
        }

        this.spawnAliens();        
    }
    
    spawnAliens() {
        this.#timeSinceLastEnemySpawn += 1;

        let spawnTimeLimit = 120 - bw.state.score / 10; // 2 sekunder från start, minskar när poängen ökar

        if (spawnTimeLimit < 20) {
            spawnTimeLimit = 20;
        }

        if (this.#timeSinceLastEnemySpawn > spawnTimeLimit && Math.random() > 0.5) {

            let alien = new Alien(this);
            bw.sprites.aliens.add(alien);

            this.#timeSinceLastEnemySpawn = 0;
        }
    }

    onShipAlienCollission(ship, alien) {
        ship.onHitByAlien();
        alien.onHitByShip();
    }

    onAlienHitByLaser(laser, alien) {
        alien.onHitByLaser();
        laser.onHit();
    }
}