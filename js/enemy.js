class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.vx = 0;
        this.vy = 0;
        this.type = type;
        this.speed = 1;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        
        // Stats baseadas no tipo
        this.setStatsByType();
        
        // AI
        this.aiTimer = 0;
        this.attackCooldown = 0;
        this.lastPlayerX = 0;
        this.grabbed = false;
    }
    
    setStatsByType() {
        switch(this.type) {
            case 'goblin':
                this.health = 50;
                this.maxHealth = 50;
                this.damage = 10;
                this.speed = 1.5;
                this.color = '#228B22';
                break;
            case 'orc':
                this.health = 80;
                this.maxHealth = 80;
                this.damage = 15;
                this.speed = 1;
                this.color = '#8B4513';
                break;
            case 'skeleton':
                this.health = 60;
                this.maxHealth = 60;
                this.damage = 12;
                this.speed = 2;
                this.color = '#F5F5DC';
                break;
        }
    }
    
    update(deltaTime, player, platforms) {
        if (!player) return;
        
        this.aiTimer += deltaTime;
        this.attackCooldown -= deltaTime;
        
        // AI simples: seguir o jogador
        const distanceToPlayer = Math.abs(this.x - player.x);
        
        if (distanceToPlayer < 200) {
            // Seguir o jogador
            if (player.x > this.x) {
                this.direction = 1;
                this.vx = this.speed;
            } else {
                this.direction = -1;
                this.vx = -this.speed;
            }
            
            // Atacar se estiver perto
            if (distanceToPlayer < 50 && this.attackCooldown <= 0) {
                this.attack(player);
            }
        } else {
            // Patrulhar
            this.vx = this.speed * this.direction;
        }
        
        // Aplicar gravidade
        this.vy += game.gravity;
        
        // Atualizar posição
        this.x += this.vx;
        this.y += this.vy;
        
        // Verificar colisão com chão
        if (this.y + this.height >= game.height - 50) {
            this.y = game.height - 50 - this.height;
            this.vy = 0;
        }
        
        // Verificar colisão com plataformas
        platforms.forEach(platform => {
            if (this.isOnPlatform(platform)) {
                this.y = platform.y - this.height;
                this.vy = 0;
            }
        });
        
        // Mudar direção nas bordas
        if (this.x <= 0 || this.x >= game.width - this.width) {
            this.direction *= -1;
        }
    }
    
    attack(player) {
        this.attackCooldown = 2000; // 2 segundos
        
        // Criar partícula de ataque
        game.particles.push(new Particle(
            this.x + this.width/2,
            this.y + this.height/2,
            'enemyAttack'
        ));
    }
    
    takeDamage(damage) {
        this.health -= damage;
        
        // Efeito visual de dano
        for (let i = 0; i < 3; i++) {
            game.particles.push(new Particle(
                this.x + Math.random() * this.width,
                this.y + Math.random() * this.height,
                'damage'
            ));
        }
        
        if (this.health <= 0) {
            this.die();
        }
    }
    
    die() {
        // Remover inimigo da lista
        const index = game.enemies.indexOf(this);
        if (index > -1) {
            game.enemies.splice(index, 1);
        }
        
        // Efeito visual de morte
        for (let i = 0; i < 10; i++) {
            game.particles.push(new Particle(
                this.x + Math.random() * this.width,
                this.y + Math.random() * this.height,
                'death'
            ));
        }
        
        // Dar experiência ao jogador
        if (game.player) {
            game.player.gainExp(10);
        }
    }
    
    isOnPlatform(platform) {
        return this.x < platform.x + platform.width &&
               this.x + this.width > platform.x &&
               this.y + this.height >= platform.y &&
               this.y + this.height <= platform.y + 20 &&
               this.vy >= 0;
    }
    
    render(ctx) {
        // Usar sprites se disponível
        if (window.spriteManager) {
            this.renderWithSprites(ctx);
        } else {
            this.renderBasic(ctx);
        }
        
        // Barra de vida
        if (this.health < this.maxHealth) {
            const barWidth = 30;
            const barHeight = 3;
            const healthPercent = this.health / this.maxHealth;
            
            ctx.fillStyle = '#333';
            ctx.fillRect(this.x, this.y - 8, barWidth, barHeight);
            
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x, this.y - 8, barWidth * healthPercent, barHeight);
        }
    }
    
    renderWithSprites(ctx) {
        ctx.save();
        
        // Aplicar flip horizontal se necessário
        if (this.direction < 0) {
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }
        
        // Obter sprite baseado no tipo
        let sprite;
        switch (this.type) {
            case 'goblin':
                sprite = window.spriteManager.getSprite('enemy_goblin');
                break;
            case 'orc':
                sprite = window.spriteManager.getSprite('enemy_orc');
                break;
            case 'skeleton':
                sprite = window.spriteManager.getSprite('enemy_skeleton');
                break;
            default:
                sprite = window.spriteManager.getSprite('enemy_goblin');
        }
        
        if (sprite) {
            // Desenhar sprite
            ctx.drawImage(sprite, this.x, this.y - 8, this.width, this.height + 8);
        } else {
            this.renderBasic(ctx);
        }
        
        ctx.restore();
    }
    
    renderBasic(ctx) {
        // Desenhar inimigo
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Olhos
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x + 8, this.y + 10, 6, 6);
        ctx.fillRect(this.x + 16, this.y + 10, 6, 6);
    }
}

// Definir globalmente
window.Enemy = Enemy;
