class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'explosion_sheet');

        scene.add.existing(this);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
    }

    isPlayingAnimation(key) {
        return this.anims.currentAnim != null && this.anims.currentAnim.key === key;
    }
}