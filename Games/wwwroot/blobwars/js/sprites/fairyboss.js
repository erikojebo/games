class FairyBoss extends PhysicsSpriteBase {
    
    #hitCount = 0;
    #ticks = 0;
    
    constructor(scene) {
        super(scene, scene.sys.game.config.width / 2, 100, 'fairy');
    }

    preUpdate() {
        
        this.#ticks++;
        
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
        
        if (this.#ticks % 100 === 0) {
            this.fireBullet(-30);
            this.fireBullet(30);
        }
    }

    fireBullet(offsetX) {
        let bullet = new Bullet(this.scene, this.x + offsetX, this.y, 'fairy_bullet');

        bullet.velocity = 100;
        bullet.isEnemyBullet = true;

        bw.sprites.bullets.add(bullet);
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