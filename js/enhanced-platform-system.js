// ========================================
// SISTEMA DE PLATAFORMAS APRIMORADO
// ========================================

class EnhancedPlatformSystem {
    constructor() {
        this.platforms = [];
        this.platformTypes = {
            SOLID: 'solid',           // Plataforma sólida (não atravessável)
            DROP_THROUGH: 'drop_through', // Atravessável de baixo para cima
            MOVING: 'moving',         // Plataforma móvel
            FALLING: 'falling',       // Plataforma que cai quando pisada
            TEMPORARY: 'temporary'    // Plataforma temporária
        };
        
        this.groundLevel = 500; // Nível base do chão
        this.tolerance = 5; // Tolerância para detecção de colisão
    }
    
    // ========================================
    // CRIAÇÃO DE PLATAFORMAS
    // ========================================
    
    createGround(width = 2000) {
        return {
            id: 'ground',
            x: 0,
            y: this.groundLevel,
            width: width,
            height: 100,
            type: this.platformTypes.SOLID,
            color: '#8B4513',
            collisionTop: true,
            collisionSides: false,
            isGround: true
        };
    }
    
    createPlatform(x, y, width = 120, height = 30, type = this.platformTypes.SOLID, options = {}) {
        const platform = {
            id: `platform_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            x: x,
            y: y,
            width: width,
            height: height,
            type: type,
            color: options.color || '#654321',
            collisionTop: true,
            collisionSides: options.collisionSides || false,
            isGround: false,
            ...options
        };
        
        // Configurações específicas por tipo
        if (type === this.platformTypes.MOVING) {
            platform.originalX = x;
            platform.moveSpeed = options.moveSpeed || 1;
            platform.moveRange = options.moveRange || 100;
            platform.moving = true;
        }
        
        if (type === this.platformTypes.FALLING) {
            platform.fallDelay = options.fallDelay || 1000;
            platform.falling = false;
            platform.fallTimer = 0;
        }
        
        if (type === this.platformTypes.TEMPORARY) {
            platform.lifetime = options.lifetime || 5000;
            platform.createdAt = Date.now();
        }
        
        return platform;
    }
    
    // ========================================
    // DETECÇÃO DE COLISÃO APRIMORADA
    // ========================================
    
    checkCollision(player, platform) {
        // Verificação horizontal
        const horizontalCollision = (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x
        );
        
        if (!horizontalCollision) return null;
        
        // Verificação vertical - apenas topo da plataforma
        const playerBottom = player.y + player.height;
        const playerTop = player.y;
        const platformTop = platform.y;
        const platformBottom = platform.y + platform.height;
        
        // Verificar se o jogador está sobre a plataforma
        const isAbove = playerBottom >= platformTop && playerBottom <= platformTop + this.tolerance;
        const isFalling = player.vy >= 0;
        
        if (isAbove && isFalling) {
            return {
                type: 'top',
                platform: platform,
                correctionY: platformTop - player.height
            };
        }
        
        // Verificar se o jogador está abaixo da plataforma (para drop-through)
        const isBelow = playerTop <= platformBottom && playerTop >= platformBottom - this.tolerance;
        
        if (isBelow && platform.type === this.platformTypes.DROP_THROUGH) {
            return {
                type: 'bottom',
                platform: platform,
                correctionY: platformBottom
            };
        }
        
        return null;
    }
    
    // ========================================
    // ATUALIZAÇÃO DO SISTEMA
    // ========================================
    
    update(deltaTime, player) {
        // Atualizar plataformas móveis
        this.platforms.forEach(platform => {
            if (platform.type === this.platformTypes.MOVING && platform.moving) {
                platform.x = platform.originalX + Math.sin(Date.now() * 0.001 * platform.moveSpeed) * platform.moveRange;
            }
            
            // Atualizar plataformas que caem
            if (platform.type === this.platformTypes.FALLING && platform.falling) {
                platform.fallTimer += deltaTime;
                if (platform.fallTimer >= platform.fallDelay) {
                    platform.y += deltaTime * 0.2; // Velocidade de queda
                }
            }
            
            // Atualizar plataformas temporárias
            if (platform.type === this.platformTypes.TEMPORARY) {
                const age = Date.now() - platform.createdAt;
                if (age >= platform.lifetime) {
                    platform.destroy = true;
                }
            }
        });
        
        // Remover plataformas marcadas para destruição
        this.platforms = this.platforms.filter(platform => !platform.destroy);
        
        // Verificar colisões com o jogador
        return this.checkPlayerCollisions(player);
    }
    
    // ========================================
    // VERIFICAÇÃO DE COLISÕES DO JOGADOR
    // ========================================
    
    checkPlayerCollisions(player) {
        let collisionResult = {
            onGround: false,
            platformStanding: null,
            corrections: []
        };
        
        // Reset do estado do jogador
        player.onGround = false;
        player.platformStanding = null;
        
        // Verificar colisão com todas as plataformas
        for (const platform of this.platforms) {
            const collision = this.checkCollision(player, platform);
            
            if (collision) {
                if (collision.type === 'top') {
                    // Jogador está sobre a plataforma
                    player.y = collision.correctionY;
                    player.vy = 0;
                    player.onGround = true;
                    player.platformStanding = platform;
                    
                    // Ativar plataforma que cai
                    if (platform.type === this.platformTypes.FALLING && !platform.falling) {
                        platform.falling = true;
                        platform.fallTimer = 0;
                    }
                    
                    collisionResult.onGround = true;
                    collisionResult.platformStanding = platform;
                    break; // Sair após encontrar a primeira colisão válida
                }
                
                if (collision.type === 'bottom') {
                    // Jogador está abaixo da plataforma drop-through
                    collisionResult.corrections.push({
                        type: 'bottom',
                        correctionY: collision.correctionY
                    });
                }
            }
        }
        
        return collisionResult;
    }
    
    // ========================================
    // GERAÇÃO DE MAPA HORIZONTAL
    // ========================================
    
    generateHorizontalMap(startX = 0, endX = 2000, density = 0.3) {
        const newPlatforms = [];
        
        // Chão principal
        newPlatforms.push(this.createGround(endX - startX));
        
        // Gerar plataformas aleatórias
        const platformCount = Math.floor((endX - startX) * density / 200);
        
        for (let i = 0; i < platformCount; i++) {
            const x = startX + Math.random() * (endX - startX - 120);
            const y = this.groundLevel - (Math.random() * 200 + 50);
            const width = 80 + Math.random() * 80;
            const height = 20 + Math.random() * 20;
            
            // Escolher tipo de plataforma baseado na posição
            let type = this.platformTypes.SOLID;
            const rand = Math.random();
            
            if (rand < 0.1) type = this.platformTypes.DROP_THROUGH;
            else if (rand < 0.15) type = this.platformTypes.MOVING;
            else if (rand < 0.2) type = this.platformTypes.FALLING;
            
            const platform = this.createPlatform(x, y, width, height, type);
            newPlatforms.push(platform);
        }
        
        // Adicionar plataformas sequenciais para progressão
        this.addSequentialPlatforms(newPlatforms, startX, endX);
        
        return newPlatforms;
    }
    
    addSequentialPlatforms(platforms, startX, endX) {
        // Criar sequência de plataformas para progressão
        let currentX = startX + 300;
        let currentY = this.groundLevel - 100;
        
        while (currentX < endX - 200) {
            platforms.push(this.createPlatform(
                currentX, 
                currentY, 
                100, 
                20, 
                this.platformTypes.SOLID
            ));
            
            currentX += 200 + Math.random() * 100;
            currentY += (Math.random() - 0.5) * 50;
            currentY = Math.max(this.groundLevel - 300, Math.min(this.groundLevel - 50, currentY));
        }
    }
    
    // ========================================
    // RENDERIZAÇÃO
    // ========================================
    
    render(ctx, camera) {
        this.platforms.forEach(platform => {
            const screenX = platform.x - camera.x;
            const screenY = platform.y - camera.y;
            
            // Verificar se está na tela
            if (screenX + platform.width < 0 || screenX > ctx.canvas.width ||
                screenY + platform.height < 0 || screenY > ctx.canvas.height) {
                return;
            }
            
            // Renderizar plataforma
            ctx.fillStyle = platform.color;
            ctx.fillRect(screenX, screenY, platform.width, platform.height);
            
            // Borda para debug
            ctx.strokeStyle = platform.isGround ? '#FF0000' : '#000000';
            ctx.lineWidth = 2;
            ctx.strokeRect(screenX, screenY, platform.width, platform.height);
            
            // Indicador de tipo
            if (platform.type !== this.platformTypes.SOLID) {
                ctx.fillStyle = '#FFFFFF';
                ctx.font = '12px Arial';
                ctx.fillText(platform.type.substring(0, 3), screenX + 5, screenY + 15);
            }
        });
    }
    
    // ========================================
    // UTILITÁRIOS
    // ========================================
    
    addPlatform(platform) {
        this.platforms.push(platform);
    }
    
    removePlatform(platformId) {
        this.platforms = this.platforms.filter(p => p.id !== platformId);
    }
    
    clearPlatforms() {
        this.platforms = [];
    }
    
    getPlatformsInRange(x, y, width, height) {
        return this.platforms.filter(platform => 
            platform.x < x + width &&
            platform.x + platform.width > x &&
            platform.y < y + height &&
            platform.y + platform.height > y
        );
    }
}

// Exportar para uso global
window.EnhancedPlatformSystem = EnhancedPlatformSystem;
