class Alien extends Phaser.Physics.Arcade.Sprite {

    #scene;

    constructor (scene, x, y, texture)
    {
        super(scene, x, y, texture);

        this.#scene = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    preUpdate() {
        this.setVelocityY(30);
        
        if (this.y > this.#scene.sys.game.config.height) {
            this.gameOver();
        }
    }

    gameOver() {
        bw.hud.gameOver();
        bw.state.isGameOver = true;
    }

    onHitByLaser() {
        if (this.anims.currentAnim != null && this.anims.currentAnim.key === 'sköld') {
            this.play("sköld_trasig");
        } else if (this.anims.currentAnim != null && this.anims.currentAnim.key === 'sköld_trasig') {
            this.play("ingen_sköld");
        } else {

            bw.hud.scoreBoard.addScore(10);

            this.explode();
        }
    }
    
    onHitByShip() {
        this.explode();        
        this.gameOver();
    }
    
    explode() {
        this.disableBody(true, true);
        bw.sprites.explodeAt(this.x, this.y);
        bw.sounds.explosion.play();        
    }
}