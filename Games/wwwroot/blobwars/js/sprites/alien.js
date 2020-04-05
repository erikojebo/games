class Alien extends PhysicsSpriteBase {

    constructor (scene)
    {
        let randomX = Math.random() * scene.sys.game.config.width;
        let spriteKey = Alien.getSpriteKey();
        
        super(scene, randomX, 0, spriteKey);

        if (spriteKey === "alien_shield_sheet") {
            this.play("sköld");
        }
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

        bw.hud.scoreBoard.addScore(10);

        if (this.isPlayingAnimation('sköld')) {
            this.play("sköld_trasig");
        } else if (this.isPlayingAnimation('sköld_trasig')) {
            this.play("ingen_sköld");
        } else {
            this.explode();
        }
    }
    
    onHitByShip() {
        this.explode();        
        this.gameOver();
    }

    static getSpriteKey() {
        let rnd = Math.random();

        if (rnd < 0.25) {
            return "apocalypse";
        }

        if (rnd < 0.5) {
            return "alien_shield_sheet";
        }

        return "alien";
    }
}