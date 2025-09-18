// ========================================
// SISTEMA DE FÍSICA APRIMORADO
// ========================================

class EnhancedPhysicsSystem {
    constructor() {
        this.gravity = 0.8;
        this.friction = 0.85;
        this.airFriction = 0.95;
        this.maxFallSpeed = 15;
        this.maxJumpSpeed = 20;
        
        // Configurações de pulo por personagem
        this.characterJumpSettings = {
            juno: {
                jumpPower: 18,
                doubleJump: false,
                airControl: 0.8
            },
            atlas: {
                jumpPower: 16,
                doubleJump: true,
                airControl: 1.0
            },
            vega: {
                jumpPower: 15,
                doubleJump: true,
                airControl: 1.2
            },
            kai: {
                jumpPower: 20,
                doubleJump: true,
                airControl: 1.1
            }
        };
    }
    
    // ========================================
    // APLICAR FÍSICA AO JOGADOR
    // ========================================
    
    updatePlayer(player, deltaTime, input) {
        const settings = this.characterJumpSettings[player.character] || this.characterJumpSettings.juno;
        
        // Aplicar gravidade
        if (!player.onGround) {
            player.vy += this.gravity * deltaTime;
            player.vy = Math.min(player.vy, this.maxFallSpeed);
        }
        
        // Aplicar atrito
        if (player.onGround) {
            player.vx *= this.friction;
        } else {
            player.vx *= this.airFriction;
        }
        
        // Atualizar posição
        player.x += player.vx * deltaTime;
        player.y += player.vy * deltaTime;
        
        // Verificar pulo
        this.handleJump(player, input, settings);
        
        // Verificar movimento horizontal
        this.handleHorizontalMovement(player, input, settings);
        
        return player;
    }
    
    // ========================================
    // SISTEMA DE PULO APRIMORADO
    // ========================================
    
    handleJump(player, input, settings) {
        // Verificar input de pulo
        if (input.jumpPressed) {
            if (player.onGround) {
                // Pulo normal
                this.executeJump(player, settings.jumpPower);
                player.jumpCount = 1;
                player.hasDoubleJumped = false;
            } else if (settings.doubleJump && !player.hasDoubleJumped && player.jumpCount < 2) {
                // Pulo duplo
                this.executeJump(player, settings.jumpPower * 0.8);
                player.jumpCount = 2;
                player.hasDoubleJumped = true;
            }
        }
    }
    
    executeJump(player, power) {
        player.vy = -power;
        player.onGround = false;
        player.animationState = 'jump';
        
        // Efeito visual
        this.createJumpEffect(player);
    }
    
    createJumpEffect(player) {
        // Criar partículas de pulo
        for (let i = 0; i < 6; i++) {
            const particle = {
                x: player.x + Math.random() * player.width,
                y: player.y + player.height,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3,
                life: 20,
                color: '#87CEEB',
                size: Math.random() * 3 + 1
            };
            
            if (window.missionState && window.missionState.particles) {
                window.missionState.particles.push(particle);
            }
        }
    }
    
    // ========================================
    // MOVIMENTO HORIZONTAL APRIMORADO
    // ========================================
    
    handleHorizontalMovement(player, input, settings) {
        const moveSpeed = player.speed || 2.0;
        const airControl = settings.airControl;
        
        if (input.left) {
            const effectiveSpeed = player.onGround ? moveSpeed : moveSpeed * airControl;
            player.vx = -effectiveSpeed;
            player.facingRight = false;
        } else if (input.right) {
            const effectiveSpeed = player.onGround ? moveSpeed : moveSpeed * airControl;
            player.vx = effectiveSpeed;
            player.facingRight = true;
        }
    }
    
    // ========================================
    // DETECÇÃO DE CHÃO APRIMORADA
    // ========================================
    
    checkGroundCollision(player, platforms) {
        let onGround = false;
        let platformStanding = null;
        let correctionY = player.y;
        
        for (const platform of platforms) {
            if (this.isPlayerAbovePlatform(player, platform)) {
                onGround = true;
                platformStanding = platform;
                correctionY = platform.y - player.height;
                break;
            }
        }
        
        if (onGround) {
            player.y = correctionY;
            player.vy = Math.max(0, player.vy); // Não permitir velocidade negativa quando no chão
        }
        
        return { onGround, platformStanding };
    }
    
    isPlayerAbovePlatform(player, platform) {
        // Verificação horizontal
        const horizontalOverlap = (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x
        );
        
        if (!horizontalOverlap) return false;
        
        // Verificação vertical - jogador deve estar sobre a plataforma
        const playerBottom = player.y + player.height;
        const platformTop = platform.y;
        const tolerance = 5; // Tolerância para detecção
        
        return (
            playerBottom >= platformTop &&
            playerBottom <= platformTop + tolerance &&
            player.vy >= -1 // Permitir quando parado ou caindo
        );
    }
    
    // ========================================
    // LIMITES DO MAPA
    // ========================================
    
    enforceMapBounds(player, mapWidth, mapHeight) {
        // Limites horizontais
        player.x = Math.max(50, Math.min(mapWidth - player.width - 50, player.x));
        
        // Limites verticais (morte por queda)
        if (player.y > mapHeight + 200) {
            this.handlePlayerDeath(player);
        }
    }
    
    handlePlayerDeath(player) {
        // Respawn do jogador
        player.x = 200;
        player.y = 440;
        player.vx = 0;
        player.vy = 0;
        player.onGround = false;
        player.jumpCount = 0;
        player.hasDoubleJumped = false;
        
        // Reduzir vida se necessário
        if (window.missionState && window.missionState.lives > 0) {
            window.missionState.lives--;
        }
    }
    
    // ========================================
    // CONFIGURAÇÕES DINÂMICAS
    // ========================================
    
    setCharacterPhysics(player, characterName) {
        const settings = this.characterJumpSettings[characterName];
        if (settings) {
            player.jumpPower = settings.jumpPower;
            player.canDoubleJump = settings.doubleJump;
            player.airControl = settings.airControl;
        }
    }
    
    adjustGravity(newGravity) {
        this.gravity = newGravity;
    }
    
    adjustFriction(newFriction) {
        this.friction = newFriction;
    }
}

// Exportar para uso global
window.EnhancedPhysicsSystem = EnhancedPhysicsSystem;
