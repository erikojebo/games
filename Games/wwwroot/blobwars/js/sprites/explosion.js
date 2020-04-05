class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, scale) {
        super(scene, x, y, 'explosion_sheet');

        scale = scale || 1;
        
        scene.add.existing(this);

        this.displayWidth = this.width * scale;
        this.displayHeight = this.height * scale;
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
    }

    isPlayingAnimation(key) {
        return this.anims.currentAnim != null && this.anims.currentAnim.key === key;
    }
}