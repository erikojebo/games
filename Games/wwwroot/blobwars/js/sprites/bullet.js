class Bullet extends PhysicsSpriteBase {
    
    velocity = -1000;
    isEnemyBullet = false;
    
    constructor (scene, x, y, texture)    {
        super(scene, x, y, texture);
    }

    preUpdate() {
        this.setVelocityY(this.velocity);

        if (this.y < 0) {
            this.disableBody(true, true);
        }
    }

    onHit() {
        this.disableBody(true, true);
    }
}