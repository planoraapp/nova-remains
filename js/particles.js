class Particle {
    constructor(x, y, type, value = 0) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.value = value;
        this.life = 1.0;
        this.maxLife = 1.0;
        
        // Propriedades baseadas no tipo
        this.setPropertiesByType();
    }
    
    setPropertiesByType() {
        switch(this.type) {
            case 'damage':
                this.vx = (Math.random() - 0.5) * 4;
                this.vy = -Math.random() * 3 - 1;
                this.color = '#ff0000';
                this.size = 3;
                this.maxLife = 0.5;
                this.life = this.maxLife;
                break;
            case 'heal':
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = -Math.random() * 2 - 1;
                this.color = '#00ff00';
                this.size = 2;
                this.maxLife = 1.0;
                this.life = this.maxLife;
                break;
            case 'defend':
                this.vx = (Math.random() - 0.5) * 3;
                this.vy = -Math.random() * 2 - 1;
                this.color = '#4169E1';
                this.size = 3;
                this.maxLife = 0.6;
                this.life = this.maxLife;
                break;
            case 'grab':
                this.vx = (Math.random() - 0.5) * 4;
                this.vy = -Math.random() * 3 - 1;
                this.color = '#FFD700';
                this.size = 4;
                this.maxLife = 0.7;
                this.life = this.maxLife;
                break;
            case 'throw':
                this.vx = (Math.random() - 0.5) * 6;
                this.vy = -Math.random() * 4 - 2;
                this.color = '#FF4500';
                this.size = 5;
                this.maxLife = 0.8;
                this.life = this.maxLife;
                break;
            case 'levelup':
                this.vx = (Math.random() - 0.5) * 6;
                this.vy = -Math.random() * 4 - 2;
                this.color = '#ffff00';
                this.size = 4;
                this.maxLife = 2.0;
                this.life = this.maxLife;
                break;
            case 'enemyAttack':
                this.vx = (Math.random() - 0.5) * 3;
                this.vy = -Math.random() * 2;
                this.color = '#ff6600';
                this.size = 2;
                this.maxLife = 0.3;
                this.life = this.maxLife;
                break;
            case 'death':
                this.vx = (Math.random() - 0.5) * 8;
                this.vy = -Math.random() * 6 - 2;
                this.color = '#666666';
                this.size = 3;
                this.maxLife = 1.5;
                this.life = this.maxLife;
                break;
        }
    }
    
    update(deltaTime) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // Gravidade leve
        
        this.life -= deltaTime / (this.maxLife * 1000);
    }
    
    render(ctx) {
        if (this.life <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.life;
        
        // Usar sprites se disponível
        if (window.spriteManager) {
            this.renderWithSprites(ctx);
        } else {
            this.renderBasic(ctx);
        }
        
        // Texto de dano
        if (this.type === 'damage' && this.value > 0) {
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Arial';
            ctx.fillText(Math.round(this.value), this.x, this.y - 5);
        }
        
        ctx.restore();
    }
    
    renderWithSprites(ctx) {
        let sprite;
        switch (this.type) {
            case 'damage':
                sprite = window.spriteManager.getSprite('effect_damage');
                break;
            case 'heal':
                sprite = window.spriteManager.getSprite('effect_heal');
                break;
            default:
                this.renderBasic(ctx);
                return;
        }
        
        if (sprite) {
            ctx.drawImage(sprite, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        } else {
            this.renderBasic(ctx);
        }
    }
    
    renderBasic(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

class Projectile {
    constructor(x, y, vx, vy, type, damage) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.type = type;
        this.damage = damage;
        this.width = 10;
        this.height = 10;
        this.life = 3.0; // 3 segundos de vida
    }
    
    update(deltaTime) {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= deltaTime / 1000;
        
        // Verificar colisão com inimigos
        if (game.enemies) {
            game.enemies.forEach(enemy => {
                if (this.isColliding(enemy)) {
                    enemy.takeDamage(this.damage);
                    this.life = 0; // Destruir projétil
                }
            });
        }
    }
    
    isColliding(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
    
    render(ctx) {
        if (this.life <= 0) return;
        
        ctx.fillStyle = '#ff6600';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Efeito de fogo
        ctx.fillStyle = '#ffaa00';
        ctx.fillRect(this.x + 2, this.y + 2, 6, 6);
    }
}

// Definir globalmente
window.Particle = Particle;
window.Projectile = Projectile;
