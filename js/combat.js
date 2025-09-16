class CombatSystem {
    constructor() {
        this.damageTypes = {
            physical: 1.0,
            magical: 1.2,
            fire: 1.5,
            ice: 0.8,
            lightning: 1.3
        };
    }
    
    calculateDamage(attacker, target, skill = null) {
        let baseDamage = attacker.damage || 10;
        let damageType = 'physical';
        
        if (skill) {
            baseDamage = skill.damage || baseDamage;
            damageType = skill.type || 'physical';
        }
        
        // Aplicar modificadores de tipo
        const typeMultiplier = this.damageTypes[damageType] || 1.0;
        baseDamage *= typeMultiplier;
        
        // Adicionar variação aleatória
        const variation = 0.8 + Math.random() * 0.4; // 80% a 120%
        baseDamage *= variation;
        
        // Aplicar defesa do alvo
        const defense = target.defense || 0;
        const finalDamage = Math.max(1, baseDamage - defense);
        
        return Math.round(finalDamage);
    }
    
    applyStatusEffect(target, effect) {
        if (!target.statusEffects) {
            target.statusEffects = [];
        }
        
        // Verificar se já tem o efeito
        const existingEffect = target.statusEffects.find(e => e.type === effect.type);
        if (existingEffect) {
            existingEffect.duration = Math.max(existingEffect.duration, effect.duration);
        } else {
            target.statusEffects.push(effect);
        }
    }
    
    updateStatusEffects(target, deltaTime) {
        if (!target.statusEffects) return;
        
        target.statusEffects = target.statusEffects.filter(effect => {
            effect.duration -= deltaTime;
            
            if (effect.duration <= 0) {
                this.removeStatusEffect(target, effect);
                return false;
            }
            
            this.processStatusEffect(target, effect, deltaTime);
            return true;
        });
    }
    
    processStatusEffect(target, effect, deltaTime) {
        switch(effect.type) {
            case 'burn':
                target.takeDamage(effect.damage * deltaTime / 1000);
                break;
            case 'poison':
                target.takeDamage(effect.damage * deltaTime / 1000);
                break;
            case 'freeze':
                target.speed *= 0.5;
                break;
            case 'stun':
                target.canMove = false;
                break;
        }
    }
    
    removeStatusEffect(target, effect) {
        switch(effect.type) {
            case 'freeze':
                target.speed = target.baseSpeed || target.speed;
                break;
            case 'stun':
                target.canMove = true;
                break;
        }
    }
    
    checkCriticalHit(attacker, target) {
        const critChance = attacker.critChance || 0.1; // 10% base
        const critMultiplier = attacker.critMultiplier || 2.0;
        
        if (Math.random() < critChance) {
            return critMultiplier;
        }
        return 1.0;
    }
    
    checkDodge(attacker, target) {
        const dodgeChance = target.dodgeChance || 0.05; // 5% base
        return Math.random() < dodgeChance;
    }
    
    performAttack(attacker, target, skill = null) {
        // Verificar se o alvo desviou
        if (this.checkDodge(attacker, target)) {
            this.createDodgeEffect(target);
            return { hit: false, damage: 0, critical: false };
        }
        
        // Calcular dano
        let damage = this.calculateDamage(attacker, target, skill);
        
        // Verificar crítico
        const critMultiplier = this.checkCriticalHit(attacker, target);
        if (critMultiplier > 1.0) {
            damage *= critMultiplier;
            this.createCriticalEffect(target);
        }
        
        // Aplicar dano
        target.takeDamage(damage);
        
        // Aplicar efeitos de status se houver skill
        if (skill && skill.statusEffect) {
            this.applyStatusEffect(target, skill.statusEffect);
        }
        
        return { 
            hit: true, 
            damage: Math.round(damage), 
            critical: critMultiplier > 1.0 
        };
    }
    
    createDodgeEffect(target) {
        // Criar partícula de esquiva
        for (let i = 0; i < 5; i++) {
            game.particles.push(new Particle(
                target.x + Math.random() * target.width,
                target.y + Math.random() * target.height,
                'dodge'
            ));
        }
    }
    
    createCriticalEffect(target) {
        // Criar partícula de crítico
        for (let i = 0; i < 8; i++) {
            game.particles.push(new Particle(
                target.x + Math.random() * target.width,
                target.y + Math.random() * target.height,
                'critical'
            ));
        }
    }
}

// Definir classe globalmente
window.CombatSystem = CombatSystem;

// Instância global do sistema de combate
window.combatSystem = new CombatSystem();
