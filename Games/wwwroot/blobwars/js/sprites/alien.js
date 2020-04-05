class Alien extends PhysicsSpriteBase {

    constructor (scene, x, y, texture)
    {
        super(scene, x, y, texture);
    }

    preUpdate() {
        this.setVelocityY(30);
        
        if (this.y > this.gameHeight) {
            this.gameOver();
        }
    }

    gameOver() {
        bw.hud.gameOver();
        bw.state.isGameOver = true;
    }

    onHitByLaser() {
        if (this.isPlayingAnimation('sköld')) {
            this.play("sköld_trasig");
        } else if (this.isPlayingAnimation('sköld_trasig')) {
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
}