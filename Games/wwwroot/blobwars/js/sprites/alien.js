class Alien extends PhysicsSpriteBase {

    constructor (scene)
    {
        let randomX = Phaser.Math.RND.between(0, scene.sys.game.config.width);
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
        bw.state.gameOver();
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
        let rnd = Phaser.Math.RND.between(0, 100);

        if (rnd < 25) {
            return "apocalypse";
        }

        if (rnd < 50) {
            return "alien_shield_sheet";
        }

        return "alien";
    }
}