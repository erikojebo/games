class Bullet extends PhysicsSpriteBase {
    
    constructor (scene, x, y, texture)    {
        super(scene, x, y, texture);
    }

    preUpdate() {
        this.setVelocityY(-1000);

        if (this.y < 0) {
            this.disableBody(true, true);
        }
    }

}