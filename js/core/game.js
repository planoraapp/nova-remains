class Game {
    constructor() {
        // Canvas e contexto
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Estados do jogo
        this.gameState = 'menu'; // menu, playing, paused, settings
        this.previousState = 'menu';
        
        // Física
        this.camera = { x: 0, y: 0 };
        this.gravity = 0.5;
        this.friction = 0.8;
        
        // Entidades do jogo
        this.player = null;
        this.enemies = [];
        this.particles = [];
        this.platforms = [];
        this.projectiles = [];
        
        // Input e timing
        this.keys = {};
        this.lastTime = 0;
        this.deltaTime = 0;
        this.frameCount = 0;
        
        // Performance
        this.performance = {
            fps: 60,
            lastFpsUpdate: 0,
            frameTime: 0
        };
        
        // Configurações
        this.config = {
            maxEnemies: 10,
            maxParticles: 100,
            maxProjectiles: 20,
            enemySpawnRate: 3000, // ms
            lastEnemySpawn: 0
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createPlatforms();
        this.initializeUI();
        this.gameLoop(); // Loop do jogo reativado
        console.log('Nova Remains - Sistema inicializado com sucesso');
    }
    
    initializeUI() {
        // Inicializar elementos de UI se necessário
        const healthBar = document.getElementById('healthFill');
        const manaBar = document.getElementById('manaFill');
        const levelValue = document.getElementById('levelValue');
        const expValue = document.getElementById('expValue');
        
        if (healthBar) healthBar.style.width = '100%';
        if (manaBar) manaBar.style.width = '100%';
        if (levelValue) levelValue.textContent = '1';
        if (expValue) expValue.textContent = '0/100';
    }
    
    setupEventListeners() {
        // Controles do teclado otimizados
        document.addEventListener('keydown', (e) => {
            // Prevenir comportamento padrão para teclas do jogo
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyZ', 'KeyX', 'KeyC', 'KeyK', 'KeyL'].includes(e.code)) {
                e.preventDefault();
            }
            
            this.keys[e.code] = true;
            
            if (e.code === 'Escape') {
                this.togglePause();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Prevenir scroll da página
        document.addEventListener('keydown', (e) => {
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
        });
        
        // Botões do menu principal - com verificação de existência
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startGame();
            });
        }
        
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.continueGame();
            });
        }
        
        const newGameBtn = document.getElementById('newGameBtn');
        if (newGameBtn) {
            newGameBtn.addEventListener('click', () => {
                this.newGame();
            });
        }
        
        // Botões de submenus - com verificação de existência
        const characterBtn = document.getElementById('characterBtn');
        if (characterBtn) {
            characterBtn.addEventListener('click', () => {
                this.showCharacterMenu();
            });
        }
        
        const skillsBtn = document.getElementById('skillsBtn');
        if (skillsBtn) {
            skillsBtn.addEventListener('click', () => {
                this.showSkillsMenu();
            });
        }
        
        const inventoryBtn = document.getElementById('inventoryBtn');
        if (inventoryBtn) {
            inventoryBtn.addEventListener('click', () => {
                this.showInventoryMenu();
            });
        }
        
        const controlsBtn = document.getElementById('controlsBtn');
        if (controlsBtn) {
            controlsBtn.addEventListener('click', () => {
                this.showControlsMenu();
            });
        }
        
        const aboutBtn = document.getElementById('aboutBtn');
        if (aboutBtn) {
            aboutBtn.addEventListener('click', () => {
                this.showAboutMenu();
            });
        }
        
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettings();
            });
        }
        
        // Botões de voltar dos submenus - com verificação de existência
        const backFromCharacterBtn = document.getElementById('backFromCharacterBtn');
        if (backFromCharacterBtn) {
            backFromCharacterBtn.addEventListener('click', () => {
                this.hideCharacterMenu();
            });
        }
        
        const backFromSkillsBtn = document.getElementById('backFromSkillsBtn');
        if (backFromSkillsBtn) {
            backFromSkillsBtn.addEventListener('click', () => {
                this.hideSkillsMenu();
            });
        }
        
        const backFromInventoryBtn = document.getElementById('backFromInventoryBtn');
        if (backFromInventoryBtn) {
            backFromInventoryBtn.addEventListener('click', () => {
                this.hideInventoryMenu();
            });
        }
        
        const backFromControlsBtn = document.getElementById('backFromControlsBtn');
        if (backFromControlsBtn) {
            backFromControlsBtn.addEventListener('click', () => {
                this.hideControlsMenu();
            });
        }
        
        const backFromAboutBtn = document.getElementById('backFromAboutBtn');
        if (backFromAboutBtn) {
            backFromAboutBtn.addEventListener('click', () => {
                this.hideAboutMenu();
            });
        }
        
        // Botões do mapa mundo
        const backFromWorldMapBtn = document.getElementById('backFromWorldMapBtn');
        if (backFromWorldMapBtn) {
            backFromWorldMapBtn.addEventListener('click', () => {
                this.hideWorldMap();
                this.showCharacterSelection();
            });
        }
        
        // Botão de missões
        const missionsBtn = document.getElementById('missionsBtn');
        if (missionsBtn) {
            missionsBtn.addEventListener('click', () => {
                this.showMissionsMenu();
            });
        }
        
        // Botão de volta das missões
        const backFromMissionsBtn = document.getElementById('backFromMissionsBtn');
        if (backFromMissionsBtn) {
            backFromMissionsBtn.addEventListener('click', () => {
                this.hideMissionsMenu();
            });
        }
        
        const backFromShopBtn = document.getElementById('backFromShopBtn');
        if (backFromShopBtn) {
            backFromShopBtn.addEventListener('click', () => {
                this.hideShopMenu();
            });
        }
        
        // Botões do mapa do mundo
        const missionsFromWorldMapBtn = document.getElementById('missionsFromWorldMapBtn');
        if (missionsFromWorldMapBtn) {
            missionsFromWorldMapBtn.addEventListener('click', () => {
                this.showMissionsMenu();
            });
        }
        
        const shopFromWorldMapBtn = document.getElementById('shopFromWorldMapBtn');
        if (shopFromWorldMapBtn) {
            shopFromWorldMapBtn.addEventListener('click', () => {
                this.showShopMenu();
            });
        }
        
        const inventoryFromWorldMapBtn = document.getElementById('inventoryFromWorldMapBtn');
        if (inventoryFromWorldMapBtn) {
            inventoryFromWorldMapBtn.addEventListener('click', () => {
                this.showInventoryMenu();
            });
        }
        
        // Seleção de localizações no mapa
        document.querySelectorAll('.map-location').forEach(location => {
            location.addEventListener('click', (e) => {
                const locationType = e.currentTarget.getAttribute('data-location');
                this.selectLocation(locationType);
            });
            
            location.addEventListener('mouseenter', (e) => {
                this.showLocationDetails(e.currentTarget.getAttribute('data-location'));
            });
        });
        
        // Event listeners para o chat
        const chatSend = document.getElementById('chatSend');
        if (chatSend) {
            chatSend.addEventListener('click', () => {
                this.sendChatMessage();
            });
        }
        
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }
        
        // Seleção de personagens
        document.querySelectorAll('.select-character').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const character = e.target.getAttribute('data-character');
                this.selectCharacter(character);
            });
        });
        
        // Botão de menu permanente - com verificação de existência
        const menuBtn = document.getElementById('menuBtn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                this.showMainMenu();
            });
        }
        
        // Botões do menu de pausa - com verificação de existência
        const resumeBtn = document.getElementById('resumeBtn');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', () => {
                this.resumeGame();
            });
        }
        
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.restartGame();
            });
        }
        
        const mainMenuBtn = document.getElementById('mainMenuBtn');
        if (mainMenuBtn) {
            mainMenuBtn.addEventListener('click', () => {
                this.showMainMenu();
            });
        }
        
        const settingsBtn2 = document.getElementById('settingsBtn2');
        if (settingsBtn2) {
            settingsBtn2.addEventListener('click', () => {
                this.showSettings();
            });
        }
        
        // Botões de controle do jogo - com verificação de existência
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.togglePause();
            });
        }
        
        const restartBtn2 = document.getElementById('restartBtn2');
        if (restartBtn2) {
            restartBtn2.addEventListener('click', () => {
                this.restartGame();
            });
        }
        
        // Botões do menu de configurações - com verificação de existência
        const backToGameBtn = document.getElementById('backToGameBtn');
        if (backToGameBtn) {
            backToGameBtn.addEventListener('click', () => {
                this.backToGame();
            });
        }
        
        const backToMenuBtn = document.getElementById('backToMenuBtn');
        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', () => {
                this.showMainMenu();
            });
        }
        
        const backFromSettingsBtn = document.getElementById('backFromSettingsBtn');
        if (backFromSettingsBtn) {
            backFromSettingsBtn.addEventListener('click', () => {
                this.hideSettingsMenu();
            });
        }
        
        // Configurar sistemas adicionais
        this.setupSkillsSystem();
        this.setupSettingsSystem();
        this.setupMissionsSystem();
    }
    
    createPlatforms() {
        // Criar plataformas básicas
        this.platforms = [
            { x: 0, y: this.height - 50, width: 200, height: 50 },
            { x: 250, y: this.height - 100, width: 150, height: 50 },
            { x: 450, y: this.height - 150, width: 200, height: 50 },
            { x: 700, y: this.height - 200, width: 150, height: 50 },
            { x: 900, y: this.height - 50, width: 300, height: 50 }
        ];
    }
    
    startGame() {
        // Mostrar tela de seleção de personagens
        this.showCharacterSelection();
        console.log('Nova Remains - Sistema de seleção de heróis ativado - Jogo principal desabilitado');
    }
    
    showCharacterSelection() {
        this.gameState = 'characterSelection';
        this.hideAllMenus();
        
        const characterMenu = document.getElementById('characterMenu');
        if (characterMenu) {
            characterMenu.style.display = 'block';
        }
        
        console.log('Nova Remains - Seleção de heróis exibida');
    }
    
    selectCharacter(character) {
        // Criar jogador com o personagem selecionado
        this.player = new Player(100, this.height - 100, character);
        this.gameState = 'worldMap';
        this.hideAllMenus();
        
        // Mostrar mapa mundo
        const worldMap = document.getElementById('worldMap');
        if (worldMap) {
            worldMap.style.display = 'block';
        }
        
        console.log(`Nova Remains - Herói ${character} selecionado, exibindo mapa do mundo`);
    }
    
    spawnEnemies() {
        // Spawnar inimigos em posições específicas
        this.enemies = [
            new Enemy(400, this.height - 150, 'goblin'),
            new Enemy(600, this.height - 200, 'orc'),
            new Enemy(800, this.height - 100, 'skeleton')
        ];
    }
    
    update(deltaTime) {
        if (this.gameState !== 'playing') return;
        
        // Atualizar jogador
        if (this.player) {
            this.player.update(deltaTime, this.keys, this.platforms);
            this.updateCamera();
        }
        
        // Atualizar inimigos
        this.enemies.forEach(enemy => {
            if (!enemy.grabbed) {
                enemy.update(deltaTime, this.player, this.platforms);
            } else {
                // Inimigo agarrado - seguir o jogador
                enemy.x = this.player.x + (this.player.facingRight ? 30 : -30);
                enemy.y = this.player.y;
            }
        });
        
        // Atualizar projéteis
        this.projectiles = this.projectiles.filter(projectile => {
            projectile.update(deltaTime);
            return projectile.life > 0;
        });
        
        // Atualizar partículas
        this.particles = this.particles.filter(particle => {
            particle.update(deltaTime);
            return particle.life > 0;
        });
        
        // Verificar colisões
        this.checkCollisions();
    }
    
    updateCamera() {
        if (this.player) {
            this.camera.x = this.player.x - this.width / 2;
            this.camera.y = this.player.y - this.height / 2;
            
            // Limitar câmera
            this.camera.x = Math.max(0, this.camera.x);
            this.camera.y = Math.max(0, this.camera.y);
        }
    }
    
    checkCollisions() {
        // Colisões jogador vs inimigos
        this.enemies.forEach(enemy => {
            if (this.player && this.player.isColliding(enemy)) {
                if (this.player.attacking && this.player.attackCooldown <= 0) {
                    this.player.attack(enemy);
                } else if (!this.player.invulnerable) {
                    this.player.takeDamage(enemy.damage);
                }
            }
        });
        
        // Colisões projéteis vs inimigos
        this.projectiles.forEach(projectile => {
            this.enemies.forEach(enemy => {
                if (projectile.isColliding(enemy)) {
                    enemy.takeDamage(projectile.damage);
                    projectile.life = 0;
                }
            });
        });
        
        // Colisões jogador vs plataformas
        if (this.player) {
            this.platforms.forEach(platform => {
                if (this.player.isOnPlatform(platform)) {
                    this.player.y = platform.y - this.player.height;
                    this.player.vy = 0;
                    this.player.onGround = true;
                }
            });
        }
    }
    
    render() {
        // Limpar canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Salvar contexto para câmera
        this.ctx.save();
        this.ctx.translate(-this.camera.x, -this.camera.y);
        
        // Renderizar fundo
        this.renderBackground();
        
        // Renderizar plataformas
        this.renderPlatforms();
        
        // Renderizar jogador
        if (this.player) {
            this.player.render(this.ctx);
        }
        
        // Renderizar inimigos
        this.enemies.forEach(enemy => {
            enemy.render(this.ctx);
        });
        
        // Renderizar projéteis
        this.projectiles.forEach(projectile => {
            projectile.render(this.ctx);
        });
        
        // Renderizar partículas
        this.particles.forEach(particle => {
            particle.render(this.ctx);
        });
        
        // Restaurar contexto
        this.ctx.restore();
        
        // Renderizar UI
        this.renderUI();
    }
    
    renderBackground() {
        // Fundo gradiente simples
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width * 2, this.height);
    }
    
    renderPlatforms() {
        this.ctx.fillStyle = '#8B4513';
        this.platforms.forEach(platform => {
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            // Borda das plataformas
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        });
    }
    
    renderUI() {
        // UI é renderizada sem câmera
        if (this.player) {
            this.updateHealthBar();
            this.updateManaBar();
            this.updateLevel();
        }
    }
    
    updateHealthBar() {
        const healthPercent = (this.player.health / this.player.maxHealth) * 100;
        document.getElementById('healthFill').style.width = healthPercent + '%';
        document.getElementById('healthText').textContent = 
            Math.round(this.player.health) + '/' + this.player.maxHealth;
    }
    
    updateManaBar() {
        const manaPercent = (this.player.mana / this.player.maxMana) * 100;
        document.getElementById('manaFill').style.width = manaPercent + '%';
        document.getElementById('manaText').textContent = 
            Math.round(this.player.mana) + '/' + this.player.maxMana;
    }
    
    updateLevel() {
        document.getElementById('levelValue').textContent = this.player.level;
        document.getElementById('expValue').textContent = 
            this.player.exp + '/' + this.player.expToNext;
    }
    
    showMainMenu() {
        this.gameState = 'menu';
        this.hideAllMenus();
        
        // Garantir que o menu principal seja exibido
        const mainMenu = document.getElementById('mainMenu');
        if (mainMenu) {
            mainMenu.style.display = 'block';
        }
        
        // Esconder elementos do jogo
        const gameCanvas = document.getElementById('gameCanvas');
        const ui = document.getElementById('ui');
        const gameControls = document.getElementById('gameControls');
        const permanentMenu = document.getElementById('permanentMenu');
        
        if (gameCanvas) gameCanvas.style.display = 'none';
        if (ui) ui.style.display = 'none';
        if (gameControls) gameControls.style.display = 'none';
        if (permanentMenu) permanentMenu.style.display = 'none';
        
        console.log('Nova Remains - Menu principal exibido');
    }
    
    showSettings() {
        this.gameState = 'settings';
        this.hideAllMenus();
        const settingsMenu = document.getElementById('settingsMenu');
        if (settingsMenu) {
            settingsMenu.style.display = 'block';
        }
    }
    
    hideSettingsMenu() {
        this.hideAllMenus();
        this.showMainMenu();
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.hideAllMenus();
            const pauseMenu = document.getElementById('pauseMenu');
            if (pauseMenu) {
                pauseMenu.style.display = 'block';
            }
        } else if (this.gameState === 'paused') {
            this.resumeGame();
        }
    }
    
    resumeGame() {
        this.gameState = 'playing';
        this.hideAllMenus();
        const gameControls = document.getElementById('gameControls');
        const permanentMenu = document.getElementById('permanentMenu');
        if (gameControls) gameControls.style.display = 'block';
        if (permanentMenu) permanentMenu.style.display = 'block';
    }
    
    restartGame() {
        this.showCharacterSelection();
    }
    
    backToGame() {
        if (this.gameState === 'settings') {
            this.gameState = 'playing';
            this.hideAllMenus();
            const gameControls = document.getElementById('gameControls');
            const permanentMenu = document.getElementById('permanentMenu');
            if (gameControls) gameControls.style.display = 'block';
            if (permanentMenu) permanentMenu.style.display = 'block';
        }
    }
    
    hideAllMenus() {
        const menus = [
            'mainMenu', 'pauseMenu', 'settingsMenu', 'characterMenu', 'worldMap',
            'skillsMenu', 'inventoryMenu', 'controlsMenu', 'aboutMenu', 'shopMenu', 'missionsMenu',
            'gameUI', 'loadingScreen'
        ];
        
        menus.forEach(menuId => {
            const menu = document.getElementById(menuId);
            if (menu) {
                menu.style.display = 'none';
            }
        });
    }
    
    // Métodos dos submenus
    showCharacterMenu() {
        const characterMenu = document.getElementById('characterMenu');
        if (characterMenu) {
            characterMenu.style.display = 'block';
        }
    }
    
    hideCharacterMenu() {
        this.hideAllMenus();
        this.showMainMenu();
    }
    
    showSkillsMenu() {
        const skillsMenu = document.getElementById('skillsMenu');
        if (skillsMenu) {
            skillsMenu.style.display = 'block';
        }
    }
    
    hideSkillsMenu() {
        this.hideAllMenus();
        this.showCharacterSelection();
    }
    
    showInventoryMenu() {
        const inventoryMenu = document.getElementById('inventoryMenu');
        if (inventoryMenu) {
            inventoryMenu.style.display = 'block';
        }
    }
    
    hideInventoryMenu() {
        this.hideAllMenus();
        this.showWorldMap();
    }
    
    showControlsMenu() {
        const controlsMenu = document.getElementById('controlsMenu');
        if (controlsMenu) {
            controlsMenu.style.display = 'block';
        }
    }
    
    hideControlsMenu() {
        this.hideAllMenus();
        this.showMainMenu();
    }
    
    showAboutMenu() {
        const aboutMenu = document.getElementById('aboutMenu');
        if (aboutMenu) {
            aboutMenu.style.display = 'block';
        }
    }
    
    hideAboutMenu() {
        this.hideAllMenus();
        this.showMainMenu();
    }
    
    // Métodos do mapa mundo
    showWorldMap() {
        this.gameState = 'worldMap';
        this.hideAllMenus();
        
        const worldMap = document.getElementById('worldMap');
        if (worldMap) {
            worldMap.style.display = 'block';
        }
        
        console.log('Nova Remains - Mapa do mundo exibido');
    }
    
    hideWorldMap() {
        this.hideAllMenus();
        this.showCharacterSelection();
    }
    
    selectLocation(location) {
        // Implementar seleção de localização
        console.log(`Localização selecionada: ${location}`);
        
        // Por enquanto, apenas mostrar mensagem - jogo principal desabilitado
        this.showNotification(`Você selecionou: ${location}`, 'info');
        console.log('Nova Remains - Jogo principal desabilitado - Foco apenas nos menus e sistemas');
    }
    
    showLocationDetails(location) {
        const detailsElement = document.getElementById('locationDetails');
        if (!detailsElement) return;
        
        const locationDetails = {
            sanctuary: {
                name: 'Santuário das Estrelas',
                description: 'O último refúgio dos Caçadores de Estrelas. Aqui você pode descansar e forjar equipamentos com Fragmentos de Estrela.',
                level: 'Nível 1-5',
                enemies: 'Nenhum',
                rewards: 'Fragmentos de Estrela, equipamentos básicos'
            },
            void: {
                name: 'Vazio Cósmico',
                description: 'Uma região onde a Grande Nova deixou apenas escuridão. Filhos do Vazio vagam por aqui.',
                level: 'Nível 3-8',
                enemies: 'Filhos do Vazio, Sombra Cósmica',
                rewards: 'Fragmentos de Estrela, essência do vazio'
            },
            ruins: {
                name: 'Ruínas Celestiais',
                description: 'Restos de templos divinos arruinados pela Grande Nova. Fragmentos preciosos aguardam.',
                level: 'Nível 5-10',
                enemies: 'Golems Celestiais, Guardiões Arruinados',
                rewards: 'Fragmentos raros, artefatos divinos'
            },
            temple: {
                name: 'Templo dos Fragmentos',
                description: 'Um templo antigo onde os Fragmentos de Estrela são forjados em armas lendárias.',
                level: 'Nível 8-15',
                enemies: 'Sacerdotes Corrompidos, Elementais',
                rewards: 'Fragmentos épicos, armas lendárias'
            },
            comet: {
                name: 'Núcleo do Cometa',
                description: 'O coração do Rei dos Cometas. A batalha final pela sobrevivência do universo.',
                level: 'Nível 10-20',
                enemies: 'Rei dos Cometas, Filhos do Vazio',
                rewards: 'Fragmentos Primordiais, poder cósmico'
            }
        };
        
        const details = locationDetails[location] || {
            name: 'Localização Desconhecida',
            description: 'Uma localização misteriosa...',
            level: 'Nível ?',
            enemies: 'Desconhecidos',
            rewards: 'Desconhecidos'
        };
        
        detailsElement.innerHTML = `
            <h4>${details.name}</h4>
            <p><strong>Descrição:</strong> ${details.description}</p>
            <p><strong>Nível Recomendado:</strong> ${details.level}</p>
            <p><strong>Inimigos:</strong> ${details.enemies}</p>
            <p><strong>Recompensas:</strong> ${details.rewards}</p>
        `;
    }
    
    // Métodos do chat
    sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        
        if (!chatInput || !chatMessages) return;
        
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Adicionar mensagem do jogador
        this.addChatMessage(message, 'player');
        
        // Limpar input
        chatInput.value = '';
        
        // Simular resposta do sistema
        setTimeout(() => {
            this.addChatMessage('Mensagem recebida!', 'system');
        }, 500);
    }
    
    addChatMessage(message, type = 'system') {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        messageDiv.textContent = message;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Limitar número de mensagens
        const messages = chatMessages.querySelectorAll('.chat-message');
        if (messages.length > 50) {
            messages[0].remove();
        }
    }
    
    hideAllSubmenus() {
        const menus = ['characterMenu', 'skillsMenu', 'inventoryMenu', 'controlsMenu', 'aboutMenu', 'shopMenu', 'missionsMenu'];
        menus.forEach(menuId => {
            const menu = document.getElementById(menuId);
            if (menu) {
                menu.style.display = 'none';
            }
        });
    }
    
    // Métodos do sistema de missões
    showMissionsMenu() {
        this.gameState = 'missions';
        this.hideAllMenus();
        const missionsMenu = document.getElementById('missionsMenu');
        if (missionsMenu) {
            missionsMenu.style.display = 'block';
        }
        
        // Inicializar sistema de missões se não existir
        if (!this.missionSystem) {
            this.missionSystem = new MissionSystem();
        }
        
        if (!this.lobbySystem) {
            this.lobbySystem = new LobbySystem(this.missionSystem);
        }
        
        // Mostrar mapa de missões
        this.lobbySystem.showMissionsMap();
    }
    
    hideMissionsMenu() {
        this.hideAllMenus();
        this.showMainMenu();
    }
    
    hideShopMenu() {
        this.hideAllMenus();
        this.showWorldMap();
    }
    
    showShopMenu() {
        this.gameState = 'shop';
        this.hideAllMenus();
        const shopMenu = document.getElementById('shopMenu');
        if (shopMenu) {
            shopMenu.style.display = 'block';
        }
        
        // Inicializar sistema de loja se não existir
        if (!this.shopSystem) {
            this.shopSystem = new ShopSystem();
        }
        
        // Renderizar itens da loja
        this.shopSystem.renderItems('weapons');
    }
    
    showInventoryMenu() {
        this.gameState = 'inventory';
        this.hideAllMenus();
        const inventoryMenu = document.getElementById('inventoryMenu');
        if (inventoryMenu) {
            inventoryMenu.style.display = 'block';
        }
        
        // Inicializar sistema de inventário se não existir
        if (!this.inventorySystem) {
            this.inventorySystem = new InventorySystem();
        }
        
        // Renderizar inventário
        this.inventorySystem.renderInventory();
    }
    
    continueGame() {
        // Implementar sistema de save/load
        console.log('Sistema de save/load em desenvolvimento!');
    }
    
    newGame() {
        // Resetar jogo e mostrar seleção de personagens
        this.resetGame();
        this.showCharacterSelection();
    }
    
    resetGame() {
        // Resetar estado do jogo
        this.player = new Player(100, 300, 'elesis');
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];
        this.camera = { x: 0, y: 0 };
    }
    
    showNotification(message, type) {
        // Notificações desabilitadas temporariamente
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
    
    // Configurar sistema de habilidades
    setupSkillsSystem() {
        // Botões de habilidade
        document.querySelectorAll('.skill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const skill = e.target.getAttribute('data-skill');
                this.upgradeSkill(skill);
            });
        });
    }
    
    // Configurar sistema de configurações
    setupSettingsSystem() {
        // Sliders de volume
        const masterVolume = document.getElementById('masterVolume');
        const sfxVolume = document.getElementById('sfxVolume');
        const musicVolume = document.getElementById('musicVolume');
        const mouseSensitivity = document.getElementById('mouseSensitivity');
        
        if (masterVolume) {
            masterVolume.addEventListener('input', (e) => {
                const valueDisplay = document.getElementById('masterVolumeValue');
                if (valueDisplay) valueDisplay.textContent = e.target.value + '%';
            });
        }
        
        if (sfxVolume) {
            sfxVolume.addEventListener('input', (e) => {
                const valueDisplay = document.getElementById('sfxVolumeValue');
                if (valueDisplay) valueDisplay.textContent = e.target.value + '%';
            });
        }
        
        if (musicVolume) {
            musicVolume.addEventListener('input', (e) => {
                const valueDisplay = document.getElementById('musicVolumeValue');
                if (valueDisplay) valueDisplay.textContent = e.target.value + '%';
            });
        }
        
        if (mouseSensitivity) {
            mouseSensitivity.addEventListener('input', (e) => {
                const valueDisplay = document.getElementById('mouseSensitivityValue');
                if (valueDisplay) valueDisplay.textContent = e.target.value;
            });
        }
        
        // Botões de ação
        const saveBtn = document.getElementById('saveSettingsBtn');
        const resetBtn = document.getElementById('resetSettingsBtn');
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveSettings());
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSettings());
        }
    }
    
    // Configurar sistema de missões
    setupMissionsSystem() {
        // Abas de missões
        document.querySelectorAll('.mission-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabType = e.target.getAttribute('data-tab');
                this.switchMissionTab(tabType);
            });
        });
        
        // Botões de missão
        document.querySelectorAll('.mission-select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mission = e.target.getAttribute('data-mission');
                this.startMission(mission);
            });
        });
    }
    
    // Atualizar habilidade
    upgradeSkill(skillName) {
        console.log(`🔧 Melhorando habilidade: ${skillName}`);
        // Implementar lógica de upgrade de habilidades
    }
    
    // Salvar configurações
    saveSettings() {
        const settings = {
            masterVolume: document.getElementById('masterVolume')?.value || 50,
            sfxVolume: document.getElementById('sfxVolume')?.value || 50,
            musicVolume: document.getElementById('musicVolume')?.value || 50,
            invertY: document.getElementById('invertY')?.checked || false,
            mouseSensitivity: document.getElementById('mouseSensitivity')?.value || 5,
            graphicsQuality: document.getElementById('graphicsQuality')?.value || 'medium',
            particleEffects: document.getElementById('particleEffects')?.checked || true,
            maxFPS: document.getElementById('maxFPS')?.value || 60,
            difficulty: document.getElementById('difficulty')?.value || 'normal',
            autoSave: document.getElementById('autoSave')?.checked || true
        };
        
        localStorage.setItem('novaRemainsSettings', JSON.stringify(settings));
        console.log('💾 Configurações salvas!');
    }
    
    // Resetar configurações
    resetSettings() {
        if (confirm('Tem certeza que deseja resetar todas as configurações?')) {
            localStorage.removeItem('novaRemainsSettings');
            location.reload();
        }
    }
    
    // Trocar aba de missões
    switchMissionTab(tabType) {
        // Remover classe active de todas as abas
        document.querySelectorAll('.mission-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Adicionar classe active na aba selecionada
        const activeTab = document.querySelector(`[data-tab="${tabType}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        console.log(`📋 Mudando para aba: ${tabType}`);
        // Implementar lógica de troca de abas
    }
    
    // Iniciar missão
    startMission(missionName) {
        console.log(`🎯 Iniciando missão: ${missionName}`);
        // Implementar lógica de início de missão
    }

    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Definir globalmente
window.Game = Game;

// Inicializar jogo quando a página carregar
window.addEventListener('load', () => {
    window.game = new Game();
});
