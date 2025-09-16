class Player {
    constructor(x, y, characterType = 'elesis') {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.jumpPower = 15;
        this.onGround = false;
        this.characterType = characterType;
        
        // Stats baseadas no personagem
        this.setStatsByCharacter();
        
        // Combat
        this.attacking = false;
        this.defending = false;
        this.grabbing = false;
        this.grabbedEnemy = null;
        this.attackCooldown = 0;
        this.defendCooldown = 0;
        this.grabCooldown = 0;
        this.invulnerable = false;
        this.invulnerabilityTime = 0;
        
        // Animation
        this.currentAnimation = 'idle';
        this.animationTimer = 0;
        this.facingRight = true;
        
        // Skills
        this.skills = {
            slash: { level: 1, cooldown: 0, maxCooldown: 1000 },
            fireball: { level: 1, cooldown: 0, maxCooldown: 2000 },
            heal: { level: 1, cooldown: 0, maxCooldown: 5000 }
        };
        
        // Animation
        this.facingRight = true;
        this.animFrame = 0;
        this.animTimer = 0;
    }
    
    setStatsByCharacter() {
        switch(this.characterType) {
            case 'juno':
                this.level = 1;
                this.health = 120;
                this.maxHealth = 120;
                this.mana = 60;
                this.maxMana = 60;
                this.exp = 0;
                this.expToNext = 100;
                this.damage = 30;
                this.speed = 4;
                this.jumpPower = 10;
                this.color = '#8B4513';
                break;
            case 'atlas':
                this.level = 1;
                this.health = 80;
                this.maxHealth = 80;
                this.mana = 100;
                this.maxMana = 100;
                this.exp = 0;
                this.expToNext = 100;
                this.damage = 25;
                this.speed = 8;
                this.jumpPower = 12;
                this.color = '#4ecdc4';
                break;
            case 'vega':
                this.level = 1;
                this.health = 70;
                this.maxHealth = 70;
                this.mana = 150;
                this.maxMana = 150;
                this.exp = 0;
                this.expToNext = 100;
                this.damage = 35;
                this.speed = 3;
                this.jumpPower = 8;
                this.color = '#9b59b6';
                break;
            case 'kai':
                this.level = 1;
                this.health = 90;
                this.maxHealth = 90;
                this.mana = 80;
                this.maxMana = 80;
                this.exp = 0;
                this.expToNext = 100;
                this.damage = 28;
                this.speed = 9;
                this.jumpPower = 14;
                this.color = '#2c3e50';
                break;
            default:
                // Stats padrão
                this.level = 1;
                this.health = 100;
                this.maxHealth = 100;
                this.mana = 50;
                this.maxMana = 50;
                this.exp = 0;
                this.expToNext = 100;
                this.damage = 20;
                this.speed = 5;
                this.jumpPower = 15;
                this.color = '#4a90e2';
        }
    }
    
    update(deltaTime, keys, platforms) {
        // Atualizar animação
        this.updateAnimation(deltaTime, keys);
        
        // Movimento horizontal (apenas setas)
        if (keys['ArrowLeft']) {
            this.vx = -this.speed;
            this.facingRight = false;
        } else if (keys['ArrowRight']) {
            this.vx = this.speed;
            this.facingRight = true;
        } else {
            this.vx *= game.friction;
        }
        
        // Pulo (seta para cima)
        if (keys['ArrowUp'] && this.onGround && !this.grabbing) {
            this.vy = -this.jumpPower;
            this.onGround = false;
        }
        
        // Agachamento (seta para baixo)
        if (keys['ArrowDown'] && this.onGround) {
            this.height = 30; // Agachar
            this.y += 30; // Ajustar posição
        } else if (!keys['ArrowDown']) {
            this.height = 60; // Voltar ao normal
        }
        
        // Controles de combate
        if (keys['KeyZ'] && this.attackCooldown <= 0 && !this.grabbing) {
            this.attack();
        }
        
        if (keys['KeyX'] && this.defendCooldown <= 0 && !this.grabbing) {
            this.defend();
        }
        
        if (keys['KeyC'] && this.grabCooldown <= 0 && !this.grabbing) {
            this.grab();
        }
        
        // Soltar inimigo agarrado
        if (this.grabbing && !keys['KeyC']) {
            this.throwEnemy();
        }
        
        // Habilidades (mantidas para compatibilidade)
        if (keys['KeyK'] && this.skills.fireball.cooldown <= 0 && this.mana >= 10) {
            this.castFireball();
        }
        
        if (keys['KeyL'] && this.skills.heal.cooldown <= 0 && this.mana >= 20) {
            this.castHeal();
        }
        
        // Aplicar gravidade
        this.vy += game.gravity;
        
        // Atualizar posição
        this.x += this.vx;
        this.y += this.vy;
        
        // Verificar colisão com chão
        this.onGround = false;
        if (this.y + this.height >= game.height - 50) {
            this.y = game.height - 50 - this.height;
            this.vy = 0;
            this.onGround = true;
        }
        
        // Atualizar cooldowns
        this.updateCooldowns(deltaTime);
        
        // Regeneração de mana
        if (this.mana < this.maxMana) {
            this.mana += 0.02;
        }
    }
    
    updateCooldowns(deltaTime) {
        this.attackCooldown -= deltaTime;
        this.defendCooldown -= deltaTime;
        this.grabCooldown -= deltaTime;
        this.invulnerabilityTime -= deltaTime;
        
        if (this.invulnerabilityTime <= 0) {
            this.invulnerable = false;
        }
        
        Object.keys(this.skills).forEach(skill => {
            if (this.skills[skill].cooldown > 0) {
                this.skills[skill].cooldown -= deltaTime;
            }
        });
    }
    
    attack() {
        this.attacking = true;
        this.attackCooldown = 500; // 0.5 segundos
        
        // Verificar se acertou algum inimigo
        game.enemies.forEach(enemy => {
            if (this.isInAttackRange(enemy)) {
                this.attackEnemy(enemy);
            }
        });
        
        // Parar ataque após um tempo
        setTimeout(() => {
            this.attacking = false;
        }, 200);
    }
    
    isInAttackRange(enemy) {
        const distance = Math.abs(this.x - enemy.x);
        return distance < 60 && Math.abs(this.y - enemy.y) < 40;
    }
    
    attackEnemy(enemy) {
        const damage = this.damage + Math.random() * 10;
        enemy.takeDamage(damage);
        
        // Criar partícula de dano
        game.particles.push(new Particle(
            enemy.x + enemy.width/2,
            enemy.y + enemy.height/2,
            'damage',
            damage
        ));
        
        // Ganhar experiência
        this.gainExp(5);
    }
    
    castFireball() {
        this.mana -= 10;
        this.skills.fireball.cooldown = this.skills.fireball.maxCooldown;
        
        // Criar projétil de fogo
        const fireball = new Projectile(
            this.x + this.width/2,
            this.y + this.height/2,
            this.facingRight ? 8 : -8,
            0,
            'fireball',
            30
        );
        game.projectiles.push(fireball);
    }
    
    castHeal() {
        this.mana -= 20;
        this.skills.heal.cooldown = this.skills.heal.maxCooldown;
        
        const healAmount = 30 + (this.skills.heal.level * 10);
        this.health = Math.min(this.maxHealth, this.health + healAmount);
        
        // Efeito visual de cura
        for (let i = 0; i < 10; i++) {
            game.particles.push(new Particle(
                this.x + Math.random() * this.width,
                this.y + Math.random() * this.height,
                'heal'
            ));
        }
    }
    
    // Novo método de defesa
    defend() {
        this.defending = true;
        this.defendCooldown = 500; // 0.5 segundos de cooldown
        
        // Reduzir dano recebido enquanto defende
        this.invulnerable = true;
        this.invulnerabilityTime = 300; // 0.3 segundos de invulnerabilidade
        
        // Efeito visual de defesa
        for (let i = 0; i < 5; i++) {
            game.particles.push(new Particle(
                this.x + Math.random() * this.width,
                this.y + Math.random() * this.height,
                'defend'
            ));
        }
        
        // Parar defesa após um tempo
        setTimeout(() => {
            this.defending = false;
        }, 500);
    }
    
    // Novo método de agarramento
    grab() {
        this.grabbing = true;
        this.grabCooldown = 2000; // 2 segundos de cooldown
        
        // Procurar inimigo próximo para agarrar
        const grabRange = 50;
        for (let enemy of game.enemies) {
            const distance = Math.abs(enemy.x - this.x);
            if (distance < grabRange && !enemy.grabbed) {
                this.grabbedEnemy = enemy;
                enemy.grabbed = true;
                enemy.vx = 0;
                enemy.vy = 0;
                
                // Efeito visual de agarramento
                for (let i = 0; i < 8; i++) {
                    game.particles.push(new Particle(
                        this.x + this.width/2,
                        this.y + this.height/2,
                        'grab'
                    ));
                }
                break;
            }
        }
    }
    
    // Novo método para arremessar inimigo
    throwEnemy() {
        if (this.grabbedEnemy) {
            // Calcular direção do arremesso
            const throwDirection = this.facingRight ? 1 : -1;
            const throwPower = 8;
            
            // Aplicar força ao inimigo
            this.grabbedEnemy.vx = throwDirection * throwPower;
            this.grabbedEnemy.vy = -throwPower * 0.5; // Força vertical menor
            this.grabbedEnemy.grabbed = false;
            this.grabbedEnemy.takeDamage(15); // Dano do arremesso
            
            // Efeito visual do arremesso
            for (let i = 0; i < 10; i++) {
                game.particles.push(new Particle(
                    this.grabbedEnemy.x + this.grabbedEnemy.width/2,
                    this.grabbedEnemy.y + this.grabbedEnemy.height/2,
                    'throw'
                ));
            }
            
            this.grabbedEnemy = null;
        }
        
        this.grabbing = false;
    }
    
    takeDamage(damage) {
        if (this.invulnerable) return;
        
        this.health -= damage;
        this.invulnerable = true;
        this.invulnerabilityTime = 1000; // 1 segundo de invulnerabilidade
        
        // Efeito visual de dano
        for (let i = 0; i < 5; i++) {
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
    
    gainExp(amount) {
        this.exp += amount;
        if (this.exp >= this.expToNext) {
            this.levelUp();
        }
    }
    
    levelUp() {
        this.level++;
        this.exp -= this.expToNext;
        this.expToNext = Math.floor(this.expToNext * 1.2);
        
        // Aumentar stats
        this.maxHealth += 20;
        this.health = this.maxHealth;
        this.maxMana += 10;
        this.mana = this.maxMana;
        this.damage += 5;
        
        // Efeito visual de level up
        for (let i = 0; i < 20; i++) {
            game.particles.push(new Particle(
                this.x + this.width/2,
                this.y + this.height/2,
                'levelup'
            ));
        }
    }
    
    die() {
        alert('Game Over! Você morreu!');
        game.gameState = 'menu';
        document.getElementById('menu').style.display = 'block';
    }
    
    isColliding(other) {
        return this.x < other.x + other.width &&
               this.x + this.width > other.x &&
               this.y < other.y + other.height &&
               this.y + this.height > other.y;
    }
    
    isOnPlatform(platform) {
        return this.x < platform.x + platform.width &&
               this.x + this.width > platform.x &&
               this.y + this.height >= platform.y &&
               this.y + this.height <= platform.y + 20 &&
               this.vy >= 0;
    }
    
    updateAnimation(deltaTime, keys) {
        this.animTimer += deltaTime;
        
        // Determinar animação baseada no estado
        if (this.grabbing) {
            this.currentAnimation = 'grab';
        } else if (this.defending) {
            this.currentAnimation = 'defend';
        } else if (this.attacking) {
            this.currentAnimation = 'attack';
        } else if (!this.onGround) {
            this.currentAnimation = 'jump';
        } else if (keys['ArrowDown']) {
            this.currentAnimation = 'crouch';
        } else if (Math.abs(this.vx) > 0.1) {
            this.currentAnimation = 'walk';
        } else {
            this.currentAnimation = 'idle';
        }
        
        // Atualizar frame da animação
        if (this.currentAnimation === 'walk') {
            if (this.animTimer >= 200) { // 200ms por frame
                this.animTimer = 0;
                this.animFrame = (this.animFrame + 1) % 4;
            }
        } else {
            this.animFrame = 0;
            this.animTimer = 0;
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // Aplicar invulnerabilidade (piscar)
        if (this.invulnerable) {
            ctx.globalAlpha = 0.5;
        }
        
        // Usar sprites se disponível
        if (window.spriteManager) {
            this.renderWithSprites(ctx);
        } else {
            this.renderBasic(ctx);
        }
        
        // Barra de vida acima do jogador
        if (this.health < this.maxHealth) {
            const barWidth = 40;
            const barHeight = 4;
            const healthPercent = this.health / this.maxHealth;
            
            ctx.fillStyle = '#333';
            ctx.fillRect(this.x, this.y - 10, barWidth, barHeight);
            
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.x, this.y - 10, barWidth * healthPercent, barHeight);
        }
        
        ctx.restore();
    }
    
    renderWithSprites(ctx) {
        // Aplicar flip horizontal se necessário
        if (!this.facingRight) {
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }
        
        // Obter sprite baseado na animação
        let sprite;
        switch (this.currentAnimation) {
            case 'idle':
                sprite = window.spriteManager.getSprite('player_idle');
                break;
            case 'walk':
                const walkFrames = window.spriteManager.getSprite('player_walk');
                sprite = walkFrames[this.animFrame];
                break;
            case 'attack':
                sprite = window.spriteManager.getSprite('player_attack');
                break;
            case 'jump':
                sprite = window.spriteManager.getSprite('player_jump');
                break;
            case 'defend':
                sprite = window.spriteManager.getSprite('player_defend');
                break;
            case 'grab':
                sprite = window.spriteManager.getSprite('player_grab');
                break;
            case 'crouch':
                sprite = window.spriteManager.getSprite('player_crouch');
                break;
            default:
                sprite = window.spriteManager.getSprite('player_idle');
        }
        
        if (sprite) {
            // Desenhar sprite
            ctx.drawImage(sprite, this.x, this.y - 20, this.width, this.height + 20);
        } else {
            this.renderBasic(ctx);
        }
    }
    
    renderBasic(ctx) {
        // Desenhar jogador
        ctx.fillStyle = this.attacking ? '#ff6b6b' : this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Olhos
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x + 10, this.y + 15, 8, 8);
        ctx.fillRect(this.x + 22, this.y + 15, 8, 8);
        
        // Pupilas
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + 12, this.y + 17, 4, 4);
        ctx.fillRect(this.x + 24, this.y + 17, 4, 4);
        
        // Arma (quando atacando)
        if (this.attacking) {
            ctx.fillStyle = '#8B4513';
            const weaponX = this.facingRight ? this.x + this.width : this.x - 20;
            ctx.fillRect(weaponX, this.y + 20, 20, 5);
        }
    }
}

// Definir globalmente
window.Player = Player;
