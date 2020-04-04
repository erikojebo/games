class Ship extends Phaser.Physics.Arcade.Sprite {

    #scene;
    #cursors;
    #spaceKey;
    #justFired = false;
    
    constructor (scene, x, y)
    {
        super(scene, x, y, 'ship1');

        this.#scene = scene;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.#cursors = scene.input.keyboard.createCursorKeys();
        this.#spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    preUpdate() {
        const cursors = this.#cursors;
        const spaceKey = this.#spaceKey;
        
        if (cursors.left.isDown) {
            this.setVelocityX(-400);
        } else if (cursors.right.isDown) {
            this.setVelocityX(400);
        } else if (cursors.up.isDown) {
            this.setVelocityY(-330);
        } else if (cursors.down.isDown) {
            this.setVelocityY(330);
        } else {
            this.stopMovement(this);
        }

        if (spaceKey.isDown && !this.#justFired) {
            bw.sprites.bullets.create(this.x, this.y - this.height / 2, "bullet");
            bw.sounds.laser.play();
            this.#justFired = true;
        }

        if (spaceKey.isUp) {
            this.#justFired = false;
        }
    }
    
    onHitByAlien() {
        bw.sprites.explodeAt(this.x, this.y);
        this.disableBody(true, true);
    }

    stopMovement(obj) {
        obj.setVelocityX(0);
        obj.setVelocityY(0);
    }
}