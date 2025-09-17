class SpriteManager {
    constructor() {
        this.sprites = {};
        this.animations = {};
        this.loadedSprites = 0;
        this.totalSprites = 0;
        this.heroImages = {};
        this.loadingPromises = [];
    }
    
    // Gerar sprites básicos usando canvas
    generateBasicSprites() {
        this.generatePlayerSprites();
        this.generateEnemySprites();
        this.generateEffectSprites();
        this.loadHeroImages();
    }
    
    // Carregar imagens reais dos heróis
    loadHeroImages() {
        const heroes = ['juno', 'atlas', 'vega', 'kai'];
        
        heroes.forEach(hero => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            const promise = new Promise((resolve, reject) => {
                img.onload = () => {
                    this.heroImages[hero] = img;
                    this.createHeroSprites(hero, img);
                    this.loadedSprites++;
                    console.log(`✅ Sprite do herói ${hero} carregado`);
                    resolve();
                };
                
                img.onerror = () => {
                    console.warn(`⚠️ Erro ao carregar sprite do herói ${hero}, usando fallback`);
                    this.createFallbackHeroSprite(hero);
                    this.loadedSprites++;
                    resolve();
                };
            });
            
            this.loadingPromises.push(promise);
            // Corrigir caminho do Kai que está na pasta juno
            const heroPath = hero === 'kai' ? 'juno' : hero;
            img.src = `assets/images/characters/heroes/${heroPath}/${hero}.png`;
        });
    }
    
    // Criar sprites dos heróis a partir das imagens
    createHeroSprites(heroName, originalImg) {
        // Sprite de preview (64x64)
        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = 64;
        previewCanvas.height = 64;
        const previewCtx = previewCanvas.getContext('2d');
        previewCtx.imageSmoothingEnabled = false;
        previewCtx.drawImage(originalImg, 0, 0, 64, 64);
        this.sprites[`hero_${heroName}_preview`] = previewCanvas;
        
        // Sprite de jogo (32x32)
        const gameCanvas = document.createElement('canvas');
        gameCanvas.width = 32;
        gameCanvas.height = 32;
        const gameCtx = gameCanvas.getContext('2d');
        gameCtx.imageSmoothingEnabled = false;
        gameCtx.drawImage(originalImg, 0, 0, 32, 32);
        this.sprites[`hero_${heroName}_idle`] = gameCanvas;
        
        // Criar animações básicas
        this.createHeroAnimations(heroName, originalImg);
    }
    
    // Criar sprite de fallback para heróis
    createFallbackHeroSprite(heroName) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Cores baseadas no herói
        const colors = {
            juno: { primary: '#FFD700', secondary: '#FFA500' },
            atlas: { primary: '#87CEEB', secondary: '#4682B4' },
            vega: { primary: '#9370DB', secondary: '#8A2BE2' },
            kai: { primary: '#2F4F4F', secondary: '#708090' }
        };
        
        const color = colors[heroName] || { primary: '#4a90e2', secondary: '#2a5298' };
        
        // Desenhar herói genérico
        this.drawGenericHero(ctx, 32, 32, color.primary, color.secondary);
        this.sprites[`hero_${heroName}_preview`] = canvas;
        this.sprites[`hero_${heroName}_idle`] = canvas;
    }
    
    // Desenhar herói genérico
    drawGenericHero(ctx, x, y, primaryColor, secondaryColor) {
        // Corpo
        ctx.fillStyle = primaryColor;
        ctx.fillRect(x - 12, y - 8, 24, 32);
        
        // Cabeça
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 8, y - 20, 16, 16);
        
        // Cabelo
        ctx.fillStyle = secondaryColor;
        ctx.fillRect(x - 10, y - 22, 20, 8);
        
        // Olhos
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 4, y - 16, 2, 2);
        ctx.fillRect(x + 2, y - 16, 2, 2);
        
        // Braços
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 16, y - 4, 8, 16);
        ctx.fillRect(x + 8, y - 4, 8, 16);
        
        // Pernas
        ctx.fillStyle = primaryColor;
        ctx.fillRect(x - 10, y + 24, 8, 16);
        ctx.fillRect(x + 2, y + 24, 8, 16);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 12, y + 40, 12, 4);
        ctx.fillRect(x, y + 40, 12, 4);
    }
    
    // Criar animações dos heróis
    createHeroAnimations(heroName, originalImg) {
        // Por enquanto, apenas idle - pode ser expandido depois
        const idleFrames = [this.sprites[`hero_${heroName}_idle`]];
        this.createAnimation(`hero_${heroName}_idle`, idleFrames, 1000);
    }
    
    // Aguardar carregamento de todos os sprites
    async waitForSprites() {
        await Promise.all(this.loadingPromises);
        console.log(`✅ Todos os sprites carregados (${this.loadedSprites})`);
    }
    
    generatePlayerSprites() {
        // Sprite do jogador - Idle
        const idleCanvas = document.createElement('canvas');
        idleCanvas.width = 64;
        idleCanvas.height = 64;
        const idleCtx = idleCanvas.getContext('2d');
        
        // Desenhar personagem idle
        this.drawPlayerIdle(idleCtx, 32, 32);
        this.sprites['player_idle'] = idleCanvas;
        
        // Sprite do jogador - Walk (4 frames)
        const walkFrames = [];
        for (let i = 0; i < 4; i++) {
            const walkCanvas = document.createElement('canvas');
            walkCanvas.width = 64;
            walkCanvas.height = 64;
            const walkCtx = walkCanvas.getContext('2d');
            this.drawPlayerWalk(walkCtx, 32, 32, i);
            walkFrames.push(walkCanvas);
        }
        this.sprites['player_walk'] = walkFrames;
        
        // Sprite do jogador - Attack
        const attackCanvas = document.createElement('canvas');
        attackCanvas.width = 64;
        attackCanvas.height = 64;
        const attackCtx = attackCanvas.getContext('2d');
        this.drawPlayerAttack(attackCtx, 32, 32);
        this.sprites['player_attack'] = attackCanvas;
        
        // Sprite do jogador - Jump
        const jumpCanvas = document.createElement('canvas');
        jumpCanvas.width = 64;
        jumpCanvas.height = 64;
        const jumpCtx = jumpCanvas.getContext('2d');
        this.drawPlayerJump(jumpCtx, 32, 32);
        this.sprites['player_jump'] = jumpCanvas;
        
        // Sprite do jogador - Defend
        const defendCanvas = document.createElement('canvas');
        defendCanvas.width = 64;
        defendCanvas.height = 64;
        const defendCtx = defendCanvas.getContext('2d');
        this.drawPlayerDefend(defendCtx, 32, 32);
        this.sprites['player_defend'] = defendCanvas;
        
        // Sprite do jogador - Grab
        const grabCanvas = document.createElement('canvas');
        grabCanvas.width = 64;
        grabCanvas.height = 64;
        const grabCtx = grabCanvas.getContext('2d');
        this.drawPlayerGrab(grabCtx, 32, 32);
        this.sprites['player_grab'] = grabCanvas;
        
        // Sprite do jogador - Crouch
        const crouchCanvas = document.createElement('canvas');
        crouchCanvas.width = 64;
        crouchCanvas.height = 64;
        const crouchCtx = crouchCanvas.getContext('2d');
        this.drawPlayerCrouch(crouchCtx, 32, 32);
        this.sprites['player_crouch'] = crouchCanvas;
    }
    
    generateEnemySprites() {
        // Sprite do Goblin
        const goblinCanvas = document.createElement('canvas');
        goblinCanvas.width = 48;
        goblinCanvas.height = 48;
        const goblinCtx = goblinCanvas.getContext('2d');
        this.drawGoblin(goblinCtx, 24, 24);
        this.sprites['enemy_goblin'] = goblinCanvas;
        
        // Sprite do Orc
        const orcCanvas = document.createElement('canvas');
        orcCanvas.width = 48;
        orcCanvas.height = 48;
        const orcCtx = orcCanvas.getContext('2d');
        this.drawOrc(orcCtx, 24, 24);
        this.sprites['enemy_orc'] = orcCanvas;
        
        // Sprite do Skeleton
        const skeletonCanvas = document.createElement('canvas');
        skeletonCanvas.width = 48;
        skeletonCanvas.height = 48;
        const skeletonCtx = skeletonCanvas.getContext('2d');
        this.drawSkeleton(skeletonCtx, 24, 24);
        this.sprites['enemy_skeleton'] = skeletonCanvas;
    }
    
    generateEffectSprites() {
        // Partícula de dano
        const damageCanvas = document.createElement('canvas');
        damageCanvas.width = 16;
        damageCanvas.height = 16;
        const damageCtx = damageCanvas.getContext('2d');
        this.drawDamageEffect(damageCtx, 8, 8);
        this.sprites['effect_damage'] = damageCanvas;
        
        // Partícula de cura
        const healCanvas = document.createElement('canvas');
        healCanvas.width = 16;
        healCanvas.height = 16;
        const healCtx = healCanvas.getContext('2d');
        this.drawHealEffect(healCtx, 8, 8);
        this.sprites['effect_heal'] = healCanvas;
        
        // Projétil de fogo
        const fireballCanvas = document.createElement('canvas');
        fireballCanvas.width = 24;
        fireballCanvas.height = 24;
        const fireballCtx = fireballCanvas.getContext('2d');
        this.drawFireball(fireballCtx, 12, 12);
        this.sprites['projectile_fireball'] = fireballCanvas;
    }
    
    // Desenhar jogador idle
    drawPlayerIdle(ctx, x, y) {
        // Corpo
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 12, y - 8, 24, 32);
        
        // Cabeça
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 8, y - 20, 16, 16);
        
        // Cabelo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 10, y - 22, 20, 8);
        
        // Olhos
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 4, y - 16, 2, 2);
        ctx.fillRect(x + 2, y - 16, 2, 2);
        
        // Nariz
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 1, y - 12, 2, 2);
        
        // Boca
        ctx.fillStyle = '#ff69b4';
        ctx.fillRect(x - 3, y - 8, 6, 2);
        
        // Braços
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 16, y - 4, 8, 16);
        ctx.fillRect(x + 8, y - 4, 8, 16);
        
        // Pernas
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 10, y + 24, 8, 16);
        ctx.fillRect(x + 2, y + 24, 8, 16);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 12, y + 40, 12, 4);
        ctx.fillRect(x, y + 40, 12, 4);
    }
    
    // Desenhar jogador andando
    drawPlayerWalk(ctx, x, y, frame) {
        const offset = Math.sin(frame * 0.5) * 2;
        
        // Corpo
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 12, y - 8 + offset, 24, 32);
        
        // Cabeça
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 8, y - 20 + offset, 16, 16);
        
        // Cabelo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 10, y - 22 + offset, 20, 8);
        
        // Olhos
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 4, y - 16 + offset, 2, 2);
        ctx.fillRect(x + 2, y - 16 + offset, 2, 2);
        
        // Braços (movendo)
        ctx.fillStyle = '#ffdbac';
        const armOffset = Math.sin(frame * 0.5) * 3;
        ctx.fillRect(x - 16, y - 4 + armOffset, 8, 16);
        ctx.fillRect(x + 8, y - 4 - armOffset, 8, 16);
        
        // Pernas (movendo)
        ctx.fillStyle = '#4a90e2';
        const legOffset = Math.sin(frame * 0.5) * 4;
        ctx.fillRect(x - 10, y + 24 + legOffset, 8, 16);
        ctx.fillRect(x + 2, y + 24 - legOffset, 8, 16);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 12, y + 40 + legOffset, 12, 4);
        ctx.fillRect(x, y + 40 - legOffset, 12, 4);
    }
    
    // Desenhar jogador atacando
    drawPlayerAttack(ctx, x, y) {
        // Corpo
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 12, y - 8, 24, 32);
        
        // Cabeça
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 8, y - 20, 16, 16);
        
        // Cabelo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 10, y - 22, 20, 8);
        
        // Olhos (fechados)
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 6, y - 16, 12, 2);
        
        // Braços (levantados)
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 16, y - 12, 8, 20);
        ctx.fillRect(x + 8, y - 8, 8, 16);
        
        // Espada
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(x + 16, y - 20, 4, 24);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x + 15, y - 22, 6, 4);
        
        // Pernas
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 10, y + 24, 8, 16);
        ctx.fillRect(x + 2, y + 24, 8, 16);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 12, y + 40, 12, 4);
        ctx.fillRect(x, y + 40, 12, 4);
    }
    
    // Desenhar jogador pulando
    drawPlayerJump(ctx, x, y) {
        // Corpo (esticado)
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 12, y - 12, 24, 36);
        
        // Cabeça
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 8, y - 24, 16, 16);
        
        // Cabelo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 10, y - 26, 20, 8);
        
        // Olhos
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 4, y - 20, 2, 2);
        ctx.fillRect(x + 2, y - 20, 2, 2);
        
        // Braços (para cima)
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 16, y - 20, 8, 20);
        ctx.fillRect(x + 8, y - 20, 8, 20);
        
        // Pernas (juntas)
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 8, y + 24, 16, 20);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 12, y + 44, 12, 4);
        ctx.fillRect(x, y + 44, 12, 4);
    }
    
    // Desenhar jogador defendendo
    drawPlayerDefend(ctx, x, y) {
        // Corpo (agachado)
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 12, y - 4, 24, 28);
        
        // Cabeça
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 8, y - 16, 16, 16);
        
        // Cabelo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 10, y - 18, 20, 8);
        
        // Olhos (fechados)
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 6, y - 12, 12, 2);
        
        // Braços (protegendo)
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 16, y - 8, 8, 16);
        ctx.fillRect(x + 8, y - 8, 8, 16);
        
        // Escudo
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(x - 20, y - 4, 8, 16);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 22, y - 6, 12, 4);
        
        // Pernas (agachadas)
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 8, y + 24, 16, 12);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 12, y + 36, 12, 4);
        ctx.fillRect(x, y + 36, 12, 4);
    }
    
    // Desenhar jogador agarrando
    drawPlayerGrab(ctx, x, y) {
        // Corpo
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 12, y - 8, 24, 32);
        
        // Cabeça
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 8, y - 20, 16, 16);
        
        // Cabelo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 10, y - 22, 20, 8);
        
        // Olhos (concentrado)
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 4, y - 16, 2, 2);
        ctx.fillRect(x + 2, y - 16, 2, 2);
        
        // Braços (estendidos para agarrar)
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 20, y - 4, 8, 20);
        ctx.fillRect(x + 12, y - 4, 8, 20);
        
        // Mãos (fechadas)
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 22, y + 16, 6, 6);
        ctx.fillRect(x + 16, y + 16, 6, 6);
        
        // Pernas
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 10, y + 24, 8, 16);
        ctx.fillRect(x + 2, y + 24, 8, 16);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 12, y + 40, 12, 4);
        ctx.fillRect(x, y + 40, 12, 4);
    }
    
    // Desenhar jogador agachado
    drawPlayerCrouch(ctx, x, y) {
        // Corpo (agachado)
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 12, y - 4, 24, 28);
        
        // Cabeça
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 8, y - 16, 16, 16);
        
        // Cabelo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 10, y - 18, 20, 8);
        
        // Olhos
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 4, y - 12, 2, 2);
        ctx.fillRect(x + 2, y - 12, 2, 2);
        
        // Braços (apoiados)
        ctx.fillStyle = '#ffdbac';
        ctx.fillRect(x - 16, y + 4, 8, 12);
        ctx.fillRect(x + 8, y + 4, 8, 12);
        
        // Pernas (agachadas)
        ctx.fillStyle = '#4a90e2';
        ctx.fillRect(x - 8, y + 24, 16, 12);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 12, y + 36, 12, 4);
        ctx.fillRect(x, y + 36, 12, 4);
    }
    
    // Desenhar Goblin
    drawGoblin(ctx, x, y) {
        // Corpo
        ctx.fillStyle = '#228B22';
        ctx.fillRect(x - 8, y - 6, 16, 20);
        
        // Cabeça
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(x - 6, y - 12, 12, 12);
        
        // Olhos vermelhos
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x - 3, y - 8, 2, 2);
        ctx.fillRect(x + 1, y - 8, 2, 2);
        
        // Nariz
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(x - 1, y - 4, 2, 2);
        
        // Boca
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 2, y - 2, 4, 1);
        
        // Orelhas pontudas
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(x - 8, y - 10, 3, 6);
        ctx.fillRect(x + 5, y - 10, 3, 6);
        
        // Braços
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(x - 12, y - 2, 6, 12);
        ctx.fillRect(x + 6, y - 2, 6, 12);
        
        // Pernas
        ctx.fillStyle = '#228B22';
        ctx.fillRect(x - 6, y + 14, 6, 12);
        ctx.fillRect(x, y + 14, 6, 12);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 8, y + 26, 8, 4);
        ctx.fillRect(x, y + 26, 8, 4);
    }
    
    // Desenhar Orc
    drawOrc(ctx, x, y) {
        // Corpo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 10, y - 8, 20, 24);
        
        // Cabeça
        ctx.fillStyle = '#D2B48C';
        ctx.fillRect(x - 8, y - 16, 16, 16);
        
        // Olhos
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x - 4, y - 12, 2, 2);
        ctx.fillRect(x + 2, y - 12, 2, 2);
        
        // Nariz
        ctx.fillStyle = '#D2B48C';
        ctx.fillRect(x - 2, y - 8, 4, 3);
        
        // Boca
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 3, y - 4, 6, 2);
        
        // Dentes
        ctx.fillStyle = '#fff';
        ctx.fillRect(x - 2, y - 3, 1, 2);
        ctx.fillRect(x + 1, y - 3, 1, 2);
        
        // Braços
        ctx.fillStyle = '#D2B48C';
        ctx.fillRect(x - 14, y - 4, 8, 16);
        ctx.fillRect(x + 6, y - 4, 8, 16);
        
        // Machado
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(x + 14, y - 8, 3, 16);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x + 13, y - 10, 5, 4);
        
        // Pernas
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 8, y + 16, 8, 16);
        ctx.fillRect(x, y + 16, 8, 16);
        
        // Pés
        ctx.fillStyle = '#654321';
        ctx.fillRect(x - 10, y + 32, 10, 4);
        ctx.fillRect(x, y + 32, 10, 4);
    }
    
    // Desenhar Skeleton
    drawSkeleton(ctx, x, y) {
        // Corpo
        ctx.fillStyle = '#F5F5DC';
        ctx.fillRect(x - 8, y - 6, 16, 20);
        
        // Cabeça
        ctx.fillStyle = '#F5F5DC';
        ctx.fillRect(x - 6, y - 12, 12, 12);
        
        // Olhos vazios
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 3, y - 8, 2, 3);
        ctx.fillRect(x + 1, y - 8, 2, 3);
        
        // Nariz
        ctx.fillStyle = '#F5F5DC';
        ctx.fillRect(x - 1, y - 4, 2, 2);
        
        // Boca
        ctx.fillStyle = '#000';
        ctx.fillRect(x - 2, y - 1, 4, 1);
        
        // Braços
        ctx.fillStyle = '#F5F5DC';
        ctx.fillRect(x - 12, y - 2, 6, 12);
        ctx.fillRect(x + 6, y - 2, 6, 12);
        
        // Pernas
        ctx.fillStyle = '#F5F5DC';
        ctx.fillRect(x - 6, y + 14, 6, 12);
        ctx.fillRect(x, y + 14, 6, 12);
        
        // Pés
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 8, y + 26, 8, 4);
        ctx.fillRect(x, y + 26, 8, 4);
    }
    
    // Desenhar efeito de dano
    drawDamageEffect(ctx, x, y) {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(x - 2, y - 2, 4, 4);
        ctx.fillStyle = '#ff6666';
        ctx.fillRect(x - 1, y - 1, 2, 2);
    }
    
    // Desenhar efeito de cura
    drawHealEffect(ctx, x, y) {
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(x - 2, y - 2, 4, 4);
        ctx.fillStyle = '#66ff66';
        ctx.fillRect(x - 1, y - 1, 2, 2);
    }
    
    // Desenhar projétil de fogo
    drawFireball(ctx, x, y) {
        // Chama externa
        ctx.fillStyle = '#ff4500';
        ctx.fillRect(x - 6, y - 6, 12, 12);
        
        // Chama interna
        ctx.fillStyle = '#ffa500';
        ctx.fillRect(x - 4, y - 4, 8, 8);
        
        // Centro
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(x - 2, y - 2, 4, 4);
    }
    
    // Obter sprite
    getSprite(name) {
        return this.sprites[name];
    }
    
    // Obter animação
    getAnimation(name) {
        return this.animations[name];
    }
    
    // Criar animação
    createAnimation(name, frames, duration) {
        this.animations[name] = {
            frames: frames,
            duration: duration,
            currentFrame: 0,
            timer: 0
        };
    }
    
    // Atualizar animação
    updateAnimation(name, deltaTime) {
        const animation = this.animations[name];
        if (!animation) return;
        
        animation.timer += deltaTime;
        if (animation.timer >= animation.duration / animation.frames.length) {
            animation.timer = 0;
            animation.currentFrame = (animation.currentFrame + 1) % animation.frames.length;
        }
    }
    
    // Obter frame atual da animação
    getCurrentFrame(name) {
        const animation = this.animations[name];
        if (!animation) return null;
        
        return animation.frames[animation.currentFrame];
    }
}

// Inicializar sprite manager
window.SpriteManager = SpriteManager;
window.spriteManager = new SpriteManager();
window.spriteManager.generateBasicSprites();
