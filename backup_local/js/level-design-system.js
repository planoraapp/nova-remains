// ========================================
// SISTEMA DE LEVEL DESIGN - GRAND CHASE STYLE
// Baseado nas especificações detalhadas do usuário
// ========================================

class LevelDesignSystem {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 0;
        this.sections = [];
        this.platforms = [];
        this.deathZones = [];
        this.parallaxLayers = [];
        this.sectionBarriers = [];
        this.progressIndicator = null;
        this.livesSystem = {
            currentLives: 3,
            maxLives: 3,
            respawnTimer: 0,
            respawnDelay: 5000, // 5 segundos
            invulnerabilityTimer: 0,
            invulnerabilityDuration: 3000 // 3 segundos
        };
        
        this.initializeParallaxSystem();
    }
    
    // ========================================
    // SISTEMA DE SEÇÕES DE MAPA
    // ========================================
    
    createMissionMap(missionData) {
        this.sections = [];
        this.currentSection = 0;
        
        // Criar seções baseadas no tipo de missão
        const sectionCount = this.getSectionCountForMission(missionData);
        this.totalSections = sectionCount;
        
        for (let i = 0; i < sectionCount; i++) {
            const section = this.createSection(i, missionData);
            this.sections.push(section);
        }
        
        // Configurar primeira seção
        this.loadSection(0);
        
        console.log(`🗺️ Mapa criado: ${sectionCount} seções para missão ${missionData.name}`);
    }
    
    getSectionCountForMission(missionData) {
        // Definir número de seções baseado no nível da missão
        const baseSections = {
            'tutorial': 2,
            'sanctuary': 4,
            'void': 5,
            'ruins': 6,
            'temple': 7,
            'comet': 8
        };
        
        return baseSections[missionData.id] || 4;
    }
    
    createSection(sectionIndex, missionData) {
        const sectionWidth = 1200; // Largura de cada seção
        const sectionHeight = 600; // Altura do mapa
        
        const section = {
            index: sectionIndex,
            x: sectionIndex * sectionWidth,
            y: 0,
            width: sectionWidth,
            height: sectionHeight,
            enemies: [],
            platforms: [],
            deathZones: [],
            cleared: false,
            progressIndicator: null,
            theme: this.getSectionTheme(sectionIndex, missionData)
        };
        
        // Criar plataformas para esta seção
        this.generateSectionPlatforms(section, missionData);
        
        // Criar inimigos para esta seção
        this.generateSectionEnemies(section, missionData);
        
        // Criar zonas de morte se necessário
        this.generateDeathZones(section, missionData);
        
        return section;
    }
    
    getSectionTheme(sectionIndex, missionData) {
        const themes = {
            'tutorial': ['training_ground', 'practice_area'],
            'sanctuary': ['ancient_temple', 'sacred_halls', 'holy_chamber', 'sanctum'],
            'void': ['void_entrance', 'cosmic_void', 'dimensional_rift', 'void_core', 'void_exit'],
            'ruins': ['ruined_courtyard', 'collapsed_hall', 'ancient_chamber', 'ruined_tower', 'secret_passage', 'ruins_core'],
            'temple': ['temple_entrance', 'sacred_corridor', 'holy_chamber', 'ancient_hall', 'temple_core', 'divine_sanctum', 'temple_exit'],
            'comet': ['comet_surface', 'meteor_field', 'cosmic_storm', 'comet_interior', 'energy_core', 'cosmic_chamber', 'comet_heart', 'final_chamber']
        };
        
        const missionThemes = themes[missionData.id] || themes['sanctuary'];
        return missionThemes[sectionIndex] || 'default';
    }
    
    generateSectionPlatforms(section, missionData) {
        const platforms = [];
        const sectionWidth = section.width;
        const groundY = section.height - 100; // Altura do chão
        
        // Chão base (sempre presente)
        platforms.push({
            x: section.x,
            y: groundY,
            width: sectionWidth,
            height: 100,
            type: 'solid_ground',
            section: section.index,
            id: `ground_${section.index}`
        });
        
        // Gerar plataformas baseadas no tema
        const platformCount = this.getPlatformCountForTheme(section.theme);
        
        for (let i = 0; i < platformCount; i++) {
            const platform = this.createPlatformForSection(section, i, platformCount);
            if (platform) {
                platforms.push(platform);
            }
        }
        
        section.platforms = platforms;
    }
    
    getPlatformCountForTheme(theme) {
        const platformCounts = {
            'training_ground': 3,
            'practice_area': 2,
            'ancient_temple': 4,
            'sacred_halls': 5,
            'holy_chamber': 3,
            'sanctum': 2,
            'void_entrance': 2,
            'cosmic_void': 6,
            'dimensional_rift': 4,
            'void_core': 3,
            'void_exit': 2,
            'ruined_courtyard': 4,
            'collapsed_hall': 5,
            'ancient_chamber': 3,
            'ruined_tower': 6,
            'secret_passage': 4,
            'ruins_core': 2,
            'temple_entrance': 3,
            'sacred_corridor': 4,
            'holy_chamber': 3,
            'ancient_hall': 5,
            'temple_core': 4,
            'divine_sanctum': 2,
            'temple_exit': 2,
            'comet_surface': 3,
            'meteor_field': 7,
            'cosmic_storm': 5,
            'comet_interior': 4,
            'energy_core': 6,
            'cosmic_chamber': 5,
            'comet_heart': 3,
            'final_chamber': 1
        };
        
        return platformCounts[theme] || 3;
    }
    
    createPlatformForSection(section, platformIndex, totalPlatforms) {
        const sectionX = section.x;
        const sectionWidth = section.width;
        const groundY = section.height - 100;
        
        // Distribuir plataformas pela seção
        const x = sectionX + (platformIndex + 1) * (sectionWidth / (totalPlatforms + 1));
        const y = groundY - (50 + platformIndex * 40); // Alturas variadas
        const width = 80 + Math.random() * 60; // Larguras variadas
        const height = 20;
        
        // Decidir tipo de plataforma
        const platformTypes = ['drop_through', 'solid', 'drop_through', 'drop_through']; // Mais drop-through
        const type = platformTypes[platformIndex % platformTypes.length];
        
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            type: type,
            section: section.index,
            id: `platform_${section.index}_${platformIndex}`,
            // Propriedades específicas para drop-through
            dropThroughDisabled: false, // Para controle de drop-through
            originalY: y // Para animações
        };
    }
    
    generateSectionEnemies(section, missionData) {
        const enemies = [];
        const enemyCount = this.getEnemyCountForSection(section.index, missionData);
        
        for (let i = 0; i < enemyCount; i++) {
            const enemy = this.createEnemyForSection(section, i, missionData);
            if (enemy) {
                enemies.push(enemy);
            }
        }
        
        section.enemies = enemies;
    }
    
    getEnemyCountForSection(sectionIndex, missionData) {
        const baseCount = Math.floor(missionData.enemies / this.totalSections);
        const remainder = missionData.enemies % this.totalSections;
        
        // Distribuir inimigos extras nas últimas seções
        if (sectionIndex >= this.totalSections - remainder) {
            return baseCount + 1;
        }
        
        return baseCount;
    }
    
    createEnemyForSection(section, enemyIndex, missionData) {
        const sectionX = section.x;
        const sectionWidth = section.width;
        const groundY = section.height - 100;
        
        // Posicionar inimigo na seção
        const x = sectionX + 100 + enemyIndex * (sectionWidth - 200) / Math.max(1, section.enemies.length);
        const y = groundY - 50; // No chão
        
        // Escolher tipo de inimigo baseado na missão
        const enemyTypes = missionData.enemyTypes || ['goblin'];
        const enemyType = enemyTypes[enemyIndex % enemyTypes.length];
        
        return {
            x: x,
            y: y,
            width: 35,
            height: 50,
            type: enemyType,
            section: section.index,
            id: `enemy_${section.index}_${enemyIndex}`,
            // Propriedades de IA
            state: 'IDLE',
            stateTimer: 0,
            health: this.getEnemyHealth(enemyType),
            maxHealth: this.getEnemyHealth(enemyType),
            damage: this.getEnemyDamage(enemyType),
            speed: this.getEnemySpeed(enemyType),
            detectionRange: 300,
            giveUpRange: 500,
            attackRange: 50,
            prepareTime: 500,
            attackTime: 300,
            recoverTime: 1000,
            hitStun: 300,
            facingRight: true,
            animationState: 'idle',
            statusEffects: []
        };
    }
    
    getEnemyHealth(type) {
        const healths = {
            'goblin': 40,
            'skeleton': 60,
            'orc': 80,
            'boss': 150
        };
        return healths[type] || 40;
    }
    
    getEnemyDamage(type) {
        const damages = {
            'goblin': 15,
            'skeleton': 20,
            'orc': 25,
            'boss': 40
        };
        return damages[type] || 15;
    }
    
    getEnemySpeed(type) {
        const speeds = {
            'goblin': 2,
            'skeleton': 1.5,
            'orc': 1,
            'boss': 0.8
        };
        return speeds[type] || 2;
    }
    
    generateDeathZones(section, missionData) {
        const deathZones = [];
        
        // Adicionar zonas de morte baseadas no tema
        if (this.shouldHaveDeathZones(section.theme)) {
            const zoneCount = this.getDeathZoneCount(section.theme);
            
            for (let i = 0; i < zoneCount; i++) {
                const deathZone = this.createDeathZone(section, i);
                if (deathZone) {
                    deathZones.push(deathZone);
                }
            }
        }
        
        section.deathZones = deathZones;
    }
    
    shouldHaveDeathZones(theme) {
        const themesWithDeathZones = [
            'cosmic_void', 'dimensional_rift', 'ruined_tower', 
            'secret_passage', 'meteor_field', 'cosmic_storm',
            'comet_surface', 'energy_core'
        ];
        
        return themesWithDeathZones.includes(theme);
    }
    
    getDeathZoneCount(theme) {
        const counts = {
            'cosmic_void': 2,
            'dimensional_rift': 1,
            'ruined_tower': 3,
            'secret_passage': 2,
            'meteor_field': 4,
            'cosmic_storm': 2,
            'comet_surface': 3,
            'energy_core': 2
        };
        
        return counts[theme] || 1;
    }
    
    createDeathZone(section, zoneIndex) {
        const sectionX = section.x;
        const sectionWidth = section.width;
        const groundY = section.height - 100;
        
        // Criar zona de morte como um "buraco" no chão
        const x = sectionX + 200 + zoneIndex * 200;
        const y = groundY + 50; // Abaixo do chão
        const width = 100;
        const height = 50;
        
        return {
            x: x,
            y: y,
            width: width,
            height: height,
            type: 'death_pit',
            section: section.index,
            id: `death_zone_${section.index}_${zoneIndex}`,
            damage: 999 // Morte instantânea
        };
    }
    
    // ========================================
    // SISTEMA DE PLATAFORMAS ATRAVESSÁVEIS
    // ========================================
    
    handlePlatformInteraction(player, keys) {
        // Verificar se está em uma plataforma atravessável
        const currentPlatform = this.getPlayerPlatform(player);
        
        if (currentPlatform && currentPlatform.type === 'drop_through') {
            // Verificar comando de descida
            if (keys['ArrowDown'] && keys['ArrowUp'] && !keys.previousDropDown) {
                this.enableDropThrough(player, currentPlatform);
            }
        }
        
        keys.previousDropDown = keys['ArrowDown'] && keys['ArrowUp'];
    }
    
    getPlayerPlatform(player) {
        const currentSection = this.sections[this.currentSection];
        if (!currentSection) return null;
        
        for (let platform of currentSection.platforms) {
            if (platform.type === 'drop_through' || platform.type === 'solid') {
                if (this.isPlayerOnPlatform(player, platform)) {
                    return platform;
                }
            }
        }
        
        return null;
    }
    
    isPlayerOnPlatform(player, platform) {
        return player.x + player.width > platform.x &&
               player.x < platform.x + platform.width &&
               player.y + player.height >= platform.y &&
               player.y + player.height <= platform.y + 10 && // Margem pequena
               player.vy >= 0; // Só quando está caindo ou parado
    }
    
    enableDropThrough(player, platform) {
        // Desabilitar colisão temporariamente
        platform.dropThroughDisabled = true;
        
        // Reabilitar após um tempo
        setTimeout(() => {
            platform.dropThroughDisabled = false;
        }, 500);
        
        // Efeito visual
        this.createDropThroughEffect(player);
        
        console.log(`⬇️ Jogador descendo através da plataforma ${platform.id}`);
    }
    
    createDropThroughEffect(player) {
        // Criar partículas de descida
        for (let i = 0; i < 5; i++) {
            this.effects = this.effects || [];
            this.effects.push({
                x: player.x + Math.random() * player.width,
                y: player.y + player.height,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 3,
                life: 20,
                color: '#87CEEB',
                size: Math.random() * 2 + 1,
                type: 'drop_through_particle'
            });
        }
    }
    
    // ========================================
    // SISTEMA DE PARALAXE
    // ========================================
    
    initializeParallaxSystem() {
        this.parallaxLayers = [
            {
                name: 'sky',
                speed: 0.1,
                color: '#1a1a2e',
                type: 'gradient',
                height: 200
            },
            {
                name: 'mountains',
                speed: 0.3,
                color: '#2d3748',
                type: 'mountains',
                height: 150,
                peaks: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200]
            },
            {
                name: 'trees',
                speed: 0.6,
                color: '#2d5016',
                type: 'trees',
                height: 100,
                trees: [20, 80, 140, 200, 260, 320, 380, 440, 500, 560, 620, 680, 740, 800, 860, 920, 980, 1040, 1100, 1160]
            },
            {
                name: 'foreground',
                speed: 1.2,
                color: '#4a5568',
                type: 'foreground',
                height: 50,
                elements: [30, 120, 210, 300, 390, 480, 570, 660, 750, 840, 930, 1020, 1110]
            }
        ];
    }
    
    updateParallax(camera) {
        this.parallaxLayers.forEach(layer => {
            layer.offset = (layer.offset || 0) + layer.speed;
        });
    }
    
    renderParallax(ctx, camera) {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        
        this.parallaxLayers.forEach(layer => {
            const offset = (layer.offset || 0) - camera.x * layer.speed;
            
            switch(layer.type) {
                case 'gradient':
                    this.renderGradientLayer(ctx, layer, offset, canvasWidth, canvasHeight);
                    break;
                case 'mountains':
                    this.renderMountainLayer(ctx, layer, offset, canvasWidth, canvasHeight);
                    break;
                case 'trees':
                    this.renderTreeLayer(ctx, layer, offset, canvasWidth, canvasHeight);
                    break;
                case 'foreground':
                    this.renderForegroundLayer(ctx, layer, offset, canvasWidth, canvasHeight);
                    break;
            }
        });
    }
    
    renderGradientLayer(ctx, layer, offset, canvasWidth, canvasHeight) {
        const gradient = ctx.createLinearGradient(0, 0, 0, layer.height);
        gradient.addColorStop(0, layer.color);
        gradient.addColorStop(1, '#0f0f23');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasWidth, layer.height);
    }
    
    renderMountainLayer(ctx, layer, offset, canvasWidth, canvasHeight) {
        ctx.fillStyle = layer.color;
        
        // Renderizar montanhas
        layer.peaks.forEach((peak, index) => {
            const x = peak + offset;
            const y = canvasHeight - layer.height;
            const width = 100;
            const height = layer.height;
            
            // Só renderizar se estiver visível
            if (x + width > 0 && x < canvasWidth) {
                ctx.fillRect(x, y, width, height);
            }
        });
    }
    
    renderTreeLayer(ctx, layer, offset, canvasWidth, canvasHeight) {
        ctx.fillStyle = layer.color;
        
        layer.trees.forEach((tree, index) => {
            const x = tree + offset;
            const y = canvasHeight - layer.height;
            const width = 30;
            const height = layer.height;
            
            if (x + width > 0 && x < canvasWidth) {
                ctx.fillRect(x, y, width, height);
            }
        });
    }
    
    renderForegroundLayer(ctx, layer, offset, canvasWidth, canvasHeight) {
        ctx.fillStyle = layer.color;
        
        layer.elements.forEach((element, index) => {
            const x = element + offset;
            const y = canvasHeight - layer.height;
            const width = 20;
            const height = layer.height;
            
            if (x + width > 0 && x < canvasWidth) {
                ctx.fillRect(x, y, width, height);
            }
        });
    }
    
    // ========================================
    // SISTEMA DE PROGRESSÃO DE SEÇÕES
    // ========================================
    
    checkSectionProgress(state) {
        const currentSection = this.sections[this.currentSection];
        if (!currentSection || currentSection.cleared) return;
        
        // Verificar se todos os inimigos da seção foram derrotados
        const aliveEnemies = currentSection.enemies.filter(enemy => enemy.health > 0);
        
        if (aliveEnemies.length === 0) {
            this.clearSection(currentSection);
        }
    }
    
    clearSection(section) {
        section.cleared = true;
        
        // Criar indicador de progresso
        this.createProgressIndicator(section);
        
        console.log(`✅ Seção ${section.index + 1} limpa!`);
    }
    
    createProgressIndicator(section) {
        const indicator = {
            x: section.x + section.width - 100,
            y: section.height / 2 - 50,
            width: 80,
            height: 100,
            type: 'progress_portal',
            section: section.index,
            active: true,
            animation: 0
        };
        
        section.progressIndicator = indicator;
    }
    
    checkProgressIndicatorCollision(player) {
        const currentSection = this.sections[this.currentSection];
        if (!currentSection || !currentSection.progressIndicator) return false;
        
        const indicator = currentSection.progressIndicator;
        
        if (this.checkBoxCollision(player, indicator)) {
            this.advanceToNextSection();
            return true;
        }
        
        return false;
    }
    
    advanceToNextSection() {
        if (this.currentSection < this.totalSections - 1) {
            this.currentSection++;
            this.loadSection(this.currentSection);
            console.log(`🚀 Avançando para seção ${this.currentSection + 1}`);
        } else {
            this.completeMission();
        }
    }
    
    loadSection(sectionIndex) {
        const section = this.sections[sectionIndex];
        if (!section) return;
        
        // Resetar sistema de vidas para nova seção
        this.livesSystem.currentLives = this.livesSystem.maxLives;
        
        console.log(`📂 Carregando seção ${sectionIndex + 1}: ${section.theme}`);
    }
    
    completeMission() {
        console.log(`🎉 Missão completada! Todas as ${this.totalSections} seções foram limpas!`);
        
        // Aqui você pode adicionar lógica para recompensas, etc.
        this.showMissionCompleteScreen();
    }
    
    showMissionCompleteScreen() {
        // Implementar tela de missão completa
        alert('🎉 Missão Completada!\n\nParabéns! Você limpou todas as seções!');
    }
    
    // ========================================
    // SISTEMA DE VIDAS E RESPAWN
    // ========================================
    
    checkPlayerDeath(player) {
        // Verificar morte por HP
        if (player.health <= 0) {
            this.handlePlayerDeath(player, 'hp_zero');
            return true;
        }
        
        // Verificar morte por queda em buraco
        const currentSection = this.sections[this.currentSection];
        if (currentSection) {
            for (let deathZone of currentSection.deathZones) {
                if (this.checkBoxCollision(player, deathZone)) {
                    this.handlePlayerDeath(player, 'death_pit');
                    return true;
                }
            }
        }
        
        return false;
    }
    
    handlePlayerDeath(player, deathType) {
        if (this.livesSystem.currentLives <= 0) {
            this.gameOver();
            return;
        }
        
        // Deduzir vida
        this.livesSystem.currentLives--;
        
        // Configurar respawn
        this.livesSystem.respawnTimer = this.livesSystem.respawnDelay;
        player.dead = true;
        player.health = 0;
        
        console.log(`💀 Jogador morreu (${deathType}). Vidas restantes: ${this.livesSystem.currentLives}`);
        
        // Efeito visual de morte
        this.createDeathEffect(player, deathType);
    }
    
    createDeathEffect(player, deathType) {
        const colors = {
            'hp_zero': '#EF4444',
            'death_pit': '#6B7280'
        };
        
        const color = colors[deathType] || '#EF4444';
        
        // Criar partículas de morte
        for (let i = 0; i < 10; i++) {
            this.effects = this.effects || [];
            this.effects.push({
                x: player.x + Math.random() * player.width,
                y: player.y + Math.random() * player.height,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 40,
                color: color,
                size: Math.random() * 4 + 2,
                type: 'death_particle'
            });
        }
    }
    
    updateRespawn(deltaTime) {
        if (this.livesSystem.respawnTimer > 0) {
            this.livesSystem.respawnTimer -= deltaTime;
            
            if (this.livesSystem.respawnTimer <= 0) {
                this.respawnPlayer();
            }
        }
        
        // Atualizar invencibilidade
        if (this.livesSystem.invulnerabilityTimer > 0) {
            this.livesSystem.invulnerabilityTimer -= deltaTime;
        }
    }
    
    respawnPlayer() {
        const currentSection = this.sections[this.currentSection];
        if (!currentSection) return;
        
        // Posição de respawn (início da seção)
        const respawnX = currentSection.x + 100;
        const respawnY = currentSection.height - 150; // No chão
        
        // Resetar jogador
        const player = window.missionState?.player;
        if (player) {
            player.x = respawnX;
            player.y = respawnY;
            player.health = player.maxHealth;
            player.mana = player.maxMana;
            player.dead = false;
            player.vx = 0;
            player.vy = 0;
            
            // Invencibilidade temporária
            this.livesSystem.invulnerabilityTimer = this.livesSystem.invulnerabilityDuration;
            player.invulnerable = true;
            
            console.log(`🔄 Jogador respawnou na seção ${this.currentSection + 1}`);
        }
    }
    
    isPlayerInvulnerable() {
        return this.livesSystem.invulnerabilityTimer > 0;
    }
    
    gameOver() {
        console.log('💀 GAME OVER! Todas as vidas foram perdidas!');
        
        // Mostrar tela de game over
        this.showGameOverScreen();
    }
    
    showGameOverScreen() {
        const gameOverHTML = `
            <div class="game-over-overlay">
                <div class="game-over-content">
                    <h2>💀 Game Over</h2>
                    <p>Todas as vidas foram perdidas!</p>
                    <div class="game-over-buttons">
                        <button onclick="retryMission()" class="retry-btn">🔄 Tentar Novamente</button>
                        <button onclick="returnToMap()" class="return-btn">🗺️ Voltar ao Mapa</button>
                    </div>
                </div>
            </div>
        `;
        
        // Adicionar ao DOM
        const overlay = document.createElement('div');
        overlay.innerHTML = gameOverHTML;
        document.body.appendChild(overlay.firstElementChild);
    }
    
    // ========================================
    // SISTEMA DE COLISÃO
    // ========================================
    
    checkBoxCollision(box1, box2) {
        return box1.x < box2.x + box2.width &&
               box1.x + box1.width > box2.x &&
               box1.y < box2.y + box2.height &&
               box1.y + box1.height > box2.y;
    }
    
    checkPlatformCollisions(player) {
        const currentSection = this.sections[this.currentSection];
        if (!currentSection) return;
        
        let onGround = false;
        let currentPlatform = null;
        
        for (let platform of currentSection.platforms) {
            // Pular plataformas atravessáveis se estiver descendo
            if (platform.type === 'drop_through' && platform.dropThroughDisabled) {
                continue;
            }
            
            if (this.checkPlatformCollision(player, platform)) {
                if (platform.type === 'solid_ground') {
                    // Chão sólido - sempre colide
                    player.y = platform.y - player.height;
                    player.vy = 0;
                    onGround = true;
                    currentPlatform = platform;
                } else if (platform.type === 'solid') {
                    // Plataforma sólida - só colide se vindo de cima
                    if (player.vy >= 0 && player.y + player.height <= platform.y + 10) {
                        player.y = platform.y - player.height;
                        player.vy = 0;
                        onGround = true;
                        currentPlatform = platform;
                    }
                } else if (platform.type === 'drop_through') {
                    // Plataforma atravessável - só colide se vindo de cima
                    if (player.vy >= 0 && player.y + player.height <= platform.y + 10) {
                        player.y = platform.y - player.height;
                        player.vy = 0;
                        onGround = true;
                        currentPlatform = platform;
                    }
                }
            }
        }
        
        player.onGround = onGround;
        player.currentPlatform = currentPlatform;
    }
    
    checkPlatformCollision(player, platform) {
        return player.x + player.width > platform.x &&
               player.x < platform.x + platform.width &&
               player.y + player.height > platform.y &&
               player.y + player.height < platform.y + 20; // Margem pequena
    }
    
    // ========================================
    // ATUALIZAÇÃO PRINCIPAL
    // ========================================
    
    update(state, keys, deltaTime) {
        // Atualizar paralaxe
        this.updateParallax(state.camera);
        
        // Verificar interação com plataformas
        this.handlePlatformInteraction(state.player, keys);
        
        // Verificar colisões de plataforma
        this.checkPlatformCollisions(state.player);
        
        // Verificar morte do jogador
        if (this.checkPlayerDeath(state.player)) {
            // Morte já foi processada
        }
        
        // Atualizar respawn
        this.updateRespawn(deltaTime);
        
        // Verificar progressão da seção
        this.checkSectionProgress(state);
        
        // Verificar colisão com indicador de progresso
        this.checkProgressIndicatorCollision(state.player);
        
        // Atualizar efeitos
        this.updateEffects(deltaTime);
    }
    
    updateEffects(deltaTime) {
        if (!this.effects) return;
        
        this.effects = this.effects.filter(effect => {
            effect.life -= deltaTime;
            effect.x += effect.vx || 0;
            effect.y += effect.vy || 0;
            return effect.life > 0;
        });
    }
    
    // ========================================
    // RENDERIZAÇÃO
    // ========================================
    
    render(ctx, camera) {
        // Renderizar paralaxe
        this.renderParallax(ctx, camera);
        
        // Renderizar seção atual
        this.renderCurrentSection(ctx, camera);
        
        // Renderizar efeitos
        this.renderEffects(ctx, camera);
        
        // Renderizar UI de vidas
        this.renderLivesUI(ctx);
    }
    
    renderCurrentSection(ctx, camera) {
        const currentSection = this.sections[this.currentSection];
        if (!currentSection) return;
        
        // Renderizar plataformas
        this.renderPlatforms(ctx, currentSection, camera);
        
        // Renderizar inimigos
        this.renderEnemies(ctx, currentSection, camera);
        
        // Renderizar zonas de morte
        this.renderDeathZones(ctx, currentSection, camera);
        
        // Renderizar indicador de progresso
        this.renderProgressIndicator(ctx, currentSection, camera);
    }
    
    renderPlatforms(ctx, section, camera) {
        section.platforms.forEach(platform => {
            const x = platform.x - camera.x;
            const y = platform.y - camera.y;
            
            // Só renderizar se estiver visível
            if (x + platform.width > 0 && x < ctx.canvas.width) {
                let color = '#6B7280';
                
                if (platform.type === 'solid_ground') {
                    color = '#4A5568';
                } else if (platform.type === 'drop_through') {
                    color = '#9CA3AF';
                }
                
                ctx.fillStyle = color;
                ctx.fillRect(x, y, platform.width, platform.height);
                
                // Borda
                ctx.strokeStyle = '#374151';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, platform.width, platform.height);
                
                // Indicador visual para plataformas atravessáveis
                if (platform.type === 'drop_through') {
                    ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
                    ctx.fillRect(x, y, platform.width, 3);
                }
            }
        });
    }
    
    renderEnemies(ctx, section, camera) {
        section.enemies.forEach(enemy => {
            if (enemy.health <= 0) return;
            
            const x = enemy.x - camera.x;
            const y = enemy.y - camera.y;
            
            if (x + enemy.width > 0 && x < ctx.canvas.width) {
                // Cor baseada no tipo
                const colors = {
                    'goblin': '#10B981',
                    'skeleton': '#6B7280',
                    'orc': '#F59E0B',
                    'boss': '#EF4444'
                };
                
                ctx.fillStyle = colors[enemy.type] || '#6B7280';
                ctx.fillRect(x, y, enemy.width, enemy.height);
                
                // Barra de vida
                if (enemy.health < enemy.maxHealth) {
                    ctx.fillStyle = '#EF4444';
                    ctx.fillRect(x, y - 10, enemy.width, 4);
                    ctx.fillStyle = '#10B981';
                    ctx.fillRect(x, y - 10, (enemy.health / enemy.maxHealth) * enemy.width, 4);
                }
            }
        });
    }
    
    renderDeathZones(ctx, section, camera) {
        section.deathZones.forEach(zone => {
            const x = zone.x - camera.x;
            const y = zone.y - camera.y;
            
            if (x + zone.width > 0 && x < ctx.canvas.width) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                ctx.fillRect(x, y, zone.width, zone.height);
                
                // Efeito visual de perigo
                ctx.strokeStyle = '#EF4444';
                ctx.lineWidth = 3;
                ctx.strokeRect(x, y, zone.width, zone.height);
            }
        });
    }
    
    renderProgressIndicator(ctx, section, camera) {
        if (!section.progressIndicator) return;
        
        const indicator = section.progressIndicator;
        const x = indicator.x - camera.x;
        const y = indicator.y - camera.y;
        
        if (x + indicator.width > 0 && x < ctx.canvas.width) {
            // Portal brilhante
            ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
            ctx.fillRect(x, y, indicator.width, indicator.height);
            
            // Borda pulsante
            const pulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
            ctx.strokeStyle = `rgba(255, 215, 0, ${pulse})`;
            ctx.lineWidth = 4;
            ctx.strokeRect(x, y, indicator.width, indicator.height);
            
            // Texto "GO!"
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('GO!', x + indicator.width/2, y + indicator.height/2 + 5);
        }
    }
    
    renderEffects(ctx, camera) {
        if (!this.effects) return;
        
        this.effects.forEach(effect => {
            const x = effect.x - camera.x;
            const y = effect.y - camera.y;
            
            if (x > -10 && x < ctx.canvas.width + 10 && y > -10 && y < ctx.canvas.height + 10) {
                ctx.fillStyle = effect.color;
                ctx.beginPath();
                ctx.arc(x, y, effect.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
    
    renderLivesUI(ctx) {
        const canvas = ctx.canvas;
        const x = 20;
        const y = 20;
        
        // Fundo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x - 10, y - 10, 200, 40);
        
        // Título
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '14px Arial';
        ctx.fillText('Vidas:', x, y + 5);
        
        // Corações
        for (let i = 0; i < this.livesSystem.maxLives; i++) {
            const heartX = x + 50 + i * 25;
            const heartY = y;
            
            if (i < this.livesSystem.currentLives) {
                ctx.fillStyle = '#EF4444';
            } else {
                ctx.fillStyle = '#6B7280';
            }
            
            ctx.font = '20px Arial';
            ctx.fillText('♥', heartX, heartY + 15);
        }
        
        // Timer de respawn
        if (this.livesSystem.respawnTimer > 0) {
            const seconds = Math.ceil(this.livesSystem.respawnTimer / 1000);
            ctx.fillStyle = '#FFD700';
            ctx.font = '12px Arial';
            ctx.fillText(`Respawn em: ${seconds}s`, x, y + 35);
        }
    }
}

// ========================================
// FUNÇÕES GLOBAIS PARA GAME OVER
// ========================================

function retryMission() {
    // Remover overlay de game over
    const overlay = document.querySelector('.game-over-overlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Reiniciar missão
    if (window.levelDesignSystem) {
        window.levelDesignSystem.livesSystem.currentLives = window.levelDesignSystem.livesSystem.maxLives;
        window.levelDesignSystem.currentSection = 0;
        window.levelDesignSystem.loadSection(0);
    }
    
    console.log('🔄 Missão reiniciada!');
}

function returnToMap() {
    // Remover overlay de game over
    const overlay = document.querySelector('.game-over-overlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Fechar tela de combate
    const combatContainer = document.querySelector('.mission-combat-container');
    if (combatContainer) {
        combatContainer.remove();
    }
    
    console.log('🗺️ Retornando ao mapa do mundo!');
}

// ========================================
// EXPORTAR SISTEMA
// ========================================

window.LevelDesignSystem = LevelDesignSystem;
window.levelDesignSystem = new LevelDesignSystem();

console.log('🗺️ Sistema de Level Design carregado com sucesso!');
console.log('📋 Funcionalidades:', [
    'Seções de mapa com barreiras invisíveis',
    'Plataformas atravessáveis (drop-through)',
    'Sistema de paralaxe em múltiplas camadas',
    'Sistema de vidas com respawn',
    'Zonas de morte (pits)',
    'Progressão por seções',
    'Indicadores visuais de progresso'
]);
