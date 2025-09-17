// ========================================
// SISTEMA DE COMBATE SIMPLIFICADO
// ========================================

class SimpleCombatSystem {
    constructor() {
        this.characters = {
            juno: {
                name: "Juno",
                health: 100,
                maxHealth: 100,
                attack: 25,
                defense: 20,
                speed: 15,
                canDoubleJump: false
            },
            atlas: {
                name: "Atlas", 
                health: 80,
                maxHealth: 80,
                attack: 20,
                defense: 15,
                speed: 20,
                canDoubleJump: true
            },
            vega: {
                name: "Vega",
                health: 70,
                maxHealth: 70,
                attack: 15,
                defense: 10,
                speed: 12,
                canDoubleJump: false
            },
            kai: {
                name: "Kai",
                health: 85,
                maxHealth: 85,
                attack: 30,
                defense: 18,
                speed: 25,
                canDoubleJump: true
            }
        };
    }
    
    // Aplicar stats do personagem ao jogador
    applyCharacterStats(player, characterName) {
        const character = this.characters[characterName];
        if (!character) return;
        
        player.health = character.health;
        player.maxHealth = character.maxHealth;
        player.attack = character.attack;
        player.defense = character.defense;
        player.speed = character.speed;
        player.canDoubleJump = character.canDoubleJump;
        player.maxJumps = character.canDoubleJump ? 2 : 1;
        player.jumpCount = 0;
    }
    
    // Sistema de ataque básico
    performAttack(player, target) {
        if (!target) return;
        
        const damage = Math.max(1, player.attack - (target.defense || 0));
        target.health -= damage;
        
        // Efeito visual
        this.createDamageEffect(target, damage);
        
        return damage;
    }
    
    // Criar efeito de dano
    createDamageEffect(target, damage) {
        // Criar texto de dano flutuante
        const damageText = {
            x: target.x,
            y: target.y - 20,
            text: `-${damage}`,
            timer: 0,
            duration: 1000,
            color: '#FF4444'
        };
        
        if (window.damageTextSystem) {
            window.damageTextSystem.addText(damageText);
        }
    }
    
    // Verificar se jogador pode atacar
    canAttack(player) {
        return player.attackCooldown <= 0;
    }
    
    // Definir cooldown de ataque
    setAttackCooldown(player, duration) {
        player.attackCooldown = duration;
    }
    
    // Atualizar cooldowns
    updateCooldowns(player, deltaTime) {
        if (player.attackCooldown > 0) {
            player.attackCooldown -= deltaTime;
        }
        if (player.defendCooldown > 0) {
            player.defendCooldown -= deltaTime;
        }
        if (player.grabCooldown > 0) {
            player.grabCooldown -= deltaTime;
        }
    }
}

// Criar instância global
window.simpleCombatSystem = new SimpleCombatSystem();
