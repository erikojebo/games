class PhysicsSpriteBase extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, texture)
    {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
    
    get gameWidht() {
        return this.scene.sys.game.config.width;
    }
    
    get gameHeight() {
        return this.scene.sys.game.config.height;
    }

    explode() {
        this.disableBody(true, true);
        bw.sprites.explodeAt(this.x, this.y);
        bw.sounds.explosion.play();
    }
    
    isPlayingAnimation(key) {
        return this.anims.currentAnim != null && this.anims.currentAnim.key === key;
    }

    stopMovement() {
        this.setVelocityX(0);
        this.setVelocityY(0);
    }
}