class FairyBoss extends PhysicsSpriteBase {
    
    #hitCount = 0;
    
    constructor(scene) {
        super(scene, scene.sys.game.config.width / 2, 100, 'fairy');
    }

    preUpdate() {
        
        let speed = 50;
        
        if (bw.sprites.ship.x < this.x) {
            this.setVelocityX(-speed);
        } else if (bw.sprites.ship.x === this.x) {
            this.setVelocityX(0);
        } else {
            this.setVelocityX(speed);
        }
        
        if (bw.sprites.ship.y < this.y) {
            this.setVelocityY(-speed);
        } else if (bw.sprites.ship.y === this.y) {
            this.setVelocityY(0);
        } else {
            this.setVelocityY(speed);
        }
    }

    onHitByLaser() {
        
        this.#hitCount += 1;
        
        if (this.#hitCount > 25) {
            this.explode(4);
            bw.hud.scoreBoard.addScore(500);
            bw.state.gameState = "normal";    
        }
    }
    
    onHitByShip() {
        bw.state.gameOver();
    }
}