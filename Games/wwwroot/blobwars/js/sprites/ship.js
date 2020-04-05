class Ship extends PhysicsSpriteBase {

    #cursors;
    #spaceKey;
    #justFired = false;
    
    constructor (scene, x, y)
    {
        super(scene, x, y, 'ship1');

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
            this.stopMovement();
        }

        if (spaceKey.isDown && !this.#justFired) {
            
            let bullet = new Bullet(this.scene, this.x, this.y - this.height / 2, 'bullet');
            bw.sprites.bullets.add(bullet);
            
            bw.sounds.laser.play();
            this.#justFired = true;
        }

        if (spaceKey.isUp) {
            this.#justFired = false;
        }
    }
    
    onHitByAlien() {
        this.explode();
        this.disableBody(true, true);
    }
}