// Sistema de Assets Visuais - Baseado no Manual de Estilo Visual
// Implementa backgrounds, headers e elementos decorativos seguindo a estética do jogo

class VisualAssetsSystem {
    constructor() {
        this.assets = new Map();
        this.currentTheme = 'night';
        
        // Configurações baseadas no manual de estilo visual
        this.styleConfig = {
            palette: {
                primary: '#1a1a2e',      // Índigo profundo
                secondary: '#16213e',   // Azul-marinho
                accent: '#00d4ff',      // Ciano vibrante
                highlight: '#ff00ff',   // Magenta
                glow: '#9370db',        // Violeta
                crystal: '#4ecdc4',      // Verde-azulado para cristais
                organic: '#2d5016'      // Verde para elementos orgânicos
            },
            lighting: {
                contrast: 'high',
                atmospheric: true,
                bioluminescent: true,
                pointLight: true
            },
            rendering: {
                environmentStyle: 'painterly',  // Pictórico, atmosférico
                characterStyle: 'illustrative' // Linhas limpas, cel-shading
            },
            atmosphere: {
                descriptors: ['misterioso', 'mágico', 'sereno', 'etéreo', 'melancólico', 'maravilhoso', 'antigo', 'silencioso', 'contemplativo']
            }
        };
        
        this.initAssets();
    }

    initAssets() {
        // Criar backgrounds principais
        this.createBackgrounds();
        
        // Criar headers e elementos de UI
        this.createUIElements();
        
        // Criar elementos decorativos
        this.createDecorations();
    }

    createBackgrounds() {
        // Background principal do jogo
        this.assets.set('main-bg', this.createMainBackground());
        
        // Background do mapa do mundo
        this.assets.set('world-map-bg', this.createWorldMapBackground());
        
        // Background da tela de seleção de heróis
        this.assets.set('hero-select-bg', this.createHeroSelectBackground());
        
        // Background das missões
        this.assets.set('mission-bg', this.createMissionBackground());
    }

    createMainBackground() {
        return {
            type: 'background',
            name: 'Floresta Noturna Cristalina',
            description: 'Floresta antiga com cristais bioluminescentes e árvores nodosas',
            elements: [
                {
                    type: 'sky',
                    color: this.styleConfig.palette.primary,
                    gradient: `linear-gradient(180deg, ${this.styleConfig.palette.primary} 0%, ${this.styleConfig.palette.secondary} 100%)`,
                    stars: true,
                    moon: true
                },
                {
                    type: 'trees',
                    style: 'ancient',
                    color: this.styleConfig.palette.organic,
                    glow: this.styleConfig.palette.glow,
                    bioluminescent: true
                },
                {
                    type: 'crystals',
                    color: this.styleConfig.palette.crystal,
                    glow: this.styleConfig.palette.accent,
                    scattered: true,
                    size: 'varied'
                },
                {
                    type: 'ground',
                    color: this.styleConfig.palette.secondary,
                    texture: 'mossy',
                    platforms: true
                }
            ],
            lighting: {
                type: 'bioluminescent',
                sources: ['crystals', 'moon', 'magic-orbs'],
                contrast: 'high',
                atmospheric: true
            }
        };
    }

    createWorldMapBackground() {
        return {
            type: 'background',
            name: 'Mapa Cósmico do Mundo',
            description: 'Vista aérea de um mundo noturno com cristais e formações geológicas',
            elements: [
                {
                    type: 'cosmic-sky',
                    color: this.styleConfig.palette.primary,
                    gradient: `radial-gradient(circle, ${this.styleConfig.palette.highlight} 0%, ${this.styleConfig.palette.primary} 70%)`,
                    nebula: true,
                    stars: true
                },
                {
                    type: 'landmasses',
                    color: this.styleConfig.palette.secondary,
                    shape: 'floatingIslands',
                    crystalFormations: true,
                    bioluminescent: true
                },
                {
                    type: 'crystalNetworks',
                    color: this.styleConfig.palette.crystal,
                    glow: this.styleConfig.palette.accent,
                    connecting: true,
                    energyFlow: true
                },
                {
                    type: 'ancientRuins',
                    color: this.styleConfig.palette.secondary,
                    style: 'integratedWithNature',
                    overgrown: true
                }
            ],
            lighting: {
                type: 'cosmic',
                sources: ['crystal-networks', 'nebula', 'ancient-magic'],
                contrast: 'extreme',
                atmospheric: true
            }
        };
    }

    createHeroSelectBackground() {
        return {
            type: 'background',
            name: 'Santuário dos Heróis',
            description: 'Santuário sagrado onde os heróis são escolhidos',
            elements: [
                {
                    type: 'sanctuary',
                    color: this.styleConfig.palette.secondary,
                    style: 'ancient-temple',
                    pillars: true,
                    altar: true
                },
                {
                    type: 'hero-pedestals',
                    color: this.styleConfig.palette.glow,
                    glow: this.styleConfig.palette.accent,
                    floating: true,
                    magical: true
                },
                {
                    type: 'sacred-crystals',
                    color: this.styleConfig.palette.crystal,
                    glow: this.styleConfig.palette.highlight,
                    central: true,
                    powerSource: true
                },
                {
                    type: 'ethereal-mist',
                    color: this.styleConfig.palette.accent,
                    opacity: 0.3,
                    floating: true,
                    atmospheric: true
                }
            ],
            lighting: {
                type: 'sacred',
                sources: ['sacred-crystals', 'hero-pedestals', 'ethereal-mist'],
                contrast: 'high',
                atmospheric: true
            }
        };
    }

    createMissionBackground() {
        return {
            type: 'background',
            name: 'Centro de Missões',
            description: 'Local onde as missões são planejadas e executadas',
            elements: [
                {
                    type: 'mission-hall',
                    color: this.styleConfig.palette.secondary,
                    style: 'strategic-center',
                    maps: true,
                    planningTables: true
                },
                {
                    type: 'mission-portals',
                    color: this.styleConfig.palette.crystal,
                    glow: this.styleConfig.palette.accent,
                    active: true,
                    dimensional: true
                },
                {
                    type: 'intelligence-crystals',
                    color: this.styleConfig.palette.highlight,
                    glow: this.styleConfig.palette.glow,
                    information: true,
                    holographic: true
                },
                {
                    type: 'tactical-displays',
                    color: this.styleConfig.palette.accent,
                    opacity: 0.7,
                    floating: true,
                    interactive: true
                }
            ],
            lighting: {
                type: 'tactical',
                sources: ['mission-portals', 'intelligence-crystals', 'tactical-displays'],
                contrast: 'medium',
                atmospheric: true
            }
        };
    }

    createUIElements() {
        // Header principal
        this.assets.set('main-header', this.createMainHeader());
        
        // Headers específicos
        this.assets.set('hero-header', this.createHeroHeader());
        this.assets.set('mission-header', this.createMissionHeader());
        this.assets.set('world-map-header', this.createWorldMapHeader());
    }

    createMainHeader() {
        return {
            type: 'header',
            name: 'Cabeçalho Principal',
            description: 'Header principal do jogo com elementos cristalinos',
            elements: [
                {
                    type: 'crystal-frame',
                    color: this.styleConfig.palette.crystal,
                    glow: this.styleConfig.palette.accent,
                    style: 'ornate',
                    corners: true
                },
                {
                    type: 'title-glow',
                    color: this.styleConfig.palette.highlight,
                    effect: 'pulsing',
                    intensity: 'medium'
                },
                {
                    type: 'decorative-crystals',
                    color: this.styleConfig.palette.glow,
                    glow: this.styleConfig.palette.accent,
                    scattered: true,
                    animated: true
                }
            ],
            style: {
                background: `linear-gradient(135deg, ${this.styleConfig.palette.primary} 0%, ${this.styleConfig.palette.secondary} 100%)`,
                border: `2px solid ${this.styleConfig.palette.crystal}`,
                boxShadow: `0 0 20px ${this.styleConfig.palette.accent}`
            }
        };
    }

    createHeroHeader() {
        return {
            type: 'header',
            name: 'Cabeçalho de Seleção de Heróis',
            description: 'Header específico para a tela de seleção de heróis',
            elements: [
                {
                    type: 'hero-symbols',
                    color: this.styleConfig.palette.glow,
                    glow: this.styleConfig.palette.accent,
                    style: 'heraldic',
                    animated: true
                },
                {
                    type: 'power-indicators',
                    color: this.styleConfig.palette.highlight,
                    effect: 'flowing',
                    intensity: 'high'
                },
                {
                    type: 'sacred-geometry',
                    color: this.styleConfig.palette.crystal,
                    glow: this.styleConfig.palette.accent,
                    pattern: 'mandala',
                    rotating: true
                }
            ],
            style: {
                background: `radial-gradient(circle, ${this.styleConfig.palette.secondary} 0%, ${this.styleConfig.palette.primary} 100%)`,
                border: `3px solid ${this.styleConfig.palette.glow}`,
                boxShadow: `0 0 30px ${this.styleConfig.palette.highlight}`
            }
        };
    }

    createMissionHeader() {
        return {
            type: 'header',
            name: 'Cabeçalho de Missões',
            description: 'Header para a tela de missões',
            elements: [
                {
                    type: 'mission-icons',
                    color: this.styleConfig.palette.crystal,
                    glow: this.styleConfig.palette.accent,
                    style: 'tactical',
                    animated: true
                },
                {
                    type: 'status-indicators',
                    color: this.styleConfig.palette.highlight,
                    effect: 'pulsing',
                    intensity: 'medium'
                },
                {
                    type: 'intelligence-display',
                    color: this.styleConfig.palette.accent,
                    opacity: 0.8,
                    holographic: true
                }
            ],
            style: {
                background: `linear-gradient(45deg, ${this.styleConfig.palette.primary} 0%, ${this.styleConfig.palette.secondary} 50%, ${this.styleConfig.palette.primary} 100%)`,
                border: `2px solid ${this.styleConfig.palette.crystal}`,
                boxShadow: `0 0 25px ${this.styleConfig.palette.accent}`
            }
        };
    }

    createWorldMapHeader() {
        return {
            type: 'header',
            name: 'Cabeçalho do Mapa do Mundo',
            description: 'Header para o mapa do mundo',
            elements: [
                {
                    type: 'world-symbols',
                    color: this.styleConfig.palette.glow,
                    glow: this.styleConfig.palette.accent,
                    style: 'cosmic',
                    rotating: true
                },
                {
                    type: 'location-markers',
                    color: this.styleConfig.palette.highlight,
                    effect: 'blinking',
                    intensity: 'high'
                },
                {
                    type: 'navigation-crystals',
                    color: this.styleConfig.palette.crystal,
                    glow: this.styleConfig.palette.accent,
                    interactive: true
                }
            ],
            style: {
                background: `radial-gradient(ellipse, ${this.styleConfig.palette.secondary} 0%, ${this.styleConfig.palette.primary} 100%)`,
                border: `3px solid ${this.styleConfig.palette.glow}`,
                boxShadow: `0 0 35px ${this.styleConfig.palette.highlight}`
            }
        };
    }

    createDecorations() {
        // Elementos decorativos para diferentes telas
        this.assets.set('floating-crystals', this.createFloatingCrystals());
        this.assets.set('magic-particles', this.createMagicParticles());
        this.assets.set('ethereal-mist', this.createEtherealMist());
        this.assets.set('ancient-runes', this.createAncientRunes());
    }

    createFloatingCrystals() {
        return {
            type: 'decoration',
            name: 'Cristais Flutuantes',
            description: 'Cristais que flutuam suavemente pelo ambiente',
            properties: {
                color: this.styleConfig.palette.crystal,
                glow: this.styleConfig.palette.accent,
                animation: 'floating',
                speed: 'slow',
                size: 'varied',
                opacity: 0.8
            },
            behavior: {
                movement: 'gentleDrift',
                rotation: 'slow',
                pulsing: true,
                bioluminescent: true
            }
        };
    }

    createMagicParticles() {
        return {
            type: 'decoration',
            name: 'Partículas Mágicas',
            description: 'Partículas de energia mágica que dançam pelo ar',
            properties: {
                color: this.styleConfig.palette.highlight,
                glow: this.styleConfig.palette.accent,
                animation: 'dancing',
                speed: 'medium',
                size: 'small',
                opacity: 0.6
            },
            behavior: {
                movement: 'spiral',
                rotation: 'fast',
                twinkling: true,
                magical: true
            }
        };
    }

    createEtherealMist() {
        return {
            type: 'decoration',
            name: 'Névoa Etérea',
            description: 'Névoa mágica que cria atmosfera misteriosa',
            properties: {
                color: this.styleConfig.palette.accent,
                glow: this.styleConfig.palette.glow,
                animation: 'flowing',
                speed: 'verySlow',
                size: 'large',
                opacity: 0.3
            },
            behavior: {
                movement: 'gentleFlow',
                rotation: 'none',
                atmospheric: true,
                ethereal: true
            }
        };
    }

    createAncientRunes() {
        return {
            type: 'decoration',
            name: 'Runas Antigas',
            description: 'Runas mágicas que brilham com poder ancestral',
            properties: {
                color: this.styleConfig.palette.glow,
                glow: this.styleConfig.palette.highlight,
                animation: 'glowing',
                speed: 'slow',
                size: 'medium',
                opacity: 0.7
            },
            behavior: {
                movement: 'none',
                rotation: 'slow',
                pulsing: true,
                ancient: true
            }
        };
    }

    // Métodos de renderização
    renderBackground(ctx, canvas, backgroundName) {
        const background = this.assets.get(backgroundName);
        if (!background) return;

        ctx.save();
        
        // Aplicar estilo baseado no manual de estilo visual
        this.applyBackgroundStyle(ctx, canvas, background);
        
        ctx.restore();
    }

    applyBackgroundStyle(ctx, canvas, background) {
        // Criar gradiente de fundo
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, background.elements[0].color);
        gradient.addColorStop(1, this.styleConfig.palette.secondary);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Renderizar elementos específicos
        background.elements.forEach(element => {
            this.renderBackgroundElement(ctx, canvas, element);
        });
    }

    renderBackgroundElement(ctx, canvas, element) {
        switch (element.type) {
            case 'sky':
                this.renderSky(ctx, canvas, element);
                break;
            case 'trees':
                this.renderTrees(ctx, canvas, element);
                break;
            case 'crystals':
                this.renderCrystals(ctx, canvas, element);
                break;
            case 'ground':
                this.renderGround(ctx, canvas, element);
                break;
            case 'cosmic-sky':
                this.renderCosmicSky(ctx, canvas, element);
                break;
            case 'landmasses':
                this.renderLandmasses(ctx, canvas, element);
                break;
            case 'crystal-networks':
                this.renderCrystalNetworks(ctx, canvas, element);
                break;
            case 'ancient-ruins':
                this.renderAncientRuins(ctx, canvas, element);
                break;
        }
    }

    renderSky(ctx, canvas, element) {
        // Céu noturno com estrelas
        ctx.fillStyle = element.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
        
        // Estrelas
        if (element.stars) {
            ctx.fillStyle = this.styleConfig.palette.accent;
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height * 0.6;
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    renderTrees(ctx, canvas, element) {
        // Árvores antigas com bioluminescência
        ctx.fillStyle = element.color;
        for (let i = 0; i < 8; i++) {
            const x = (canvas.width / 8) * i + 50;
            const y = canvas.height * 0.4;
            const width = 30 + Math.random() * 20;
            const height = 200 + Math.random() * 100;
            
            // Tronco
            ctx.fillRect(x, y, width, height);
            
            // Copa
            ctx.fillStyle = element.color;
            ctx.beginPath();
            ctx.arc(x + width/2, y, width * 1.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Bioluminescência
            if (element.bioluminescent) {
                ctx.fillStyle = element.glow;
                ctx.globalAlpha = 0.6;
                ctx.beginPath();
                ctx.arc(x + width/2, y, width * 1.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }
    }

    renderCrystals(ctx, canvas, element) {
        // Cristais espalhados
        ctx.fillStyle = element.color;
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * canvas.width;
            const y = canvas.height * 0.5 + Math.random() * canvas.height * 0.3;
            const size = 10 + Math.random() * 20;
            
            // Cristal
            ctx.fillRect(x, y, size, size * 1.5);
            
            // Brilho
            ctx.fillStyle = element.glow;
            ctx.globalAlpha = 0.8;
            ctx.fillRect(x - 2, y - 2, size + 4, size * 1.5 + 4);
            ctx.globalAlpha = 1.0;
        }
    }

    renderGround(ctx, canvas, element) {
        // Solo com musgo
        ctx.fillStyle = element.color;
        ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);
        
        // Plataformas flutuantes
        if (element.platforms) {
            ctx.fillStyle = this.styleConfig.palette.secondary;
            for (let i = 0; i < 5; i++) {
                const x = (canvas.width / 5) * i + 100;
                const y = canvas.height * 0.6;
                const width = 80 + Math.random() * 40;
                const height = 20;
                ctx.fillRect(x, y, width, height);
            }
        }
    }

    renderCosmicSky(ctx, canvas, element) {
        // Céu cósmico com nebulosa
        const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width);
        gradient.addColorStop(0, element.color);
        gradient.addColorStop(0.7, this.styleConfig.palette.primary);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Estrelas cósmicas
        ctx.fillStyle = this.styleConfig.palette.accent;
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    renderLandmasses(ctx, canvas, element) {
        // Ilhas flutuantes
        ctx.fillStyle = element.color;
        for (let i = 0; i < 6; i++) {
            const x = (canvas.width / 6) * i + 50;
            const y = canvas.height * 0.3 + Math.random() * canvas.height * 0.4;
            const width = 100 + Math.random() * 50;
            const height = 60 + Math.random() * 40;
            
            // Ilha
            ctx.fillRect(x, y, width, height);
            
            // Cristais na ilha
            if (element.crystalFormations) {
                ctx.fillStyle = this.styleConfig.palette.crystal;
                ctx.fillRect(x + 20, y + 10, 15, 20);
                ctx.fillRect(x + 60, y + 15, 12, 18);
            }
        }
    }

    renderCrystalNetworks(ctx, canvas, element) {
        // Redes de cristais conectados
        ctx.strokeStyle = element.color;
        ctx.lineWidth = 3;
        ctx.shadowColor = element.glow;
        ctx.shadowBlur = 10;
        
        // Linhas conectando cristais
        for (let i = 0; i < 8; i++) {
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const x2 = Math.random() * canvas.width;
            const y2 = Math.random() * canvas.height;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        
        ctx.shadowBlur = 0;
    }

    renderAncientRuins(ctx, canvas, element) {
        // Ruínas antigas integradas com a natureza
        ctx.fillStyle = element.color;
        for (let i = 0; i < 4; i++) {
            const x = (canvas.width / 4) * i + 80;
            const y = canvas.height * 0.5;
            const width = 60 + Math.random() * 30;
            const height = 80 + Math.random() * 40;
            
            // Estrutura
            ctx.fillRect(x, y, width, height);
            
            // Vegetação crescendo nas ruínas
            ctx.fillStyle = this.styleConfig.palette.organic;
            ctx.fillRect(x + 10, y + 10, 20, 30);
            ctx.fillRect(x + 30, y + 20, 15, 25);
        }
    }

    // Métodos de controle
    setTheme(themeName) {
        this.currentTheme = themeName;
    }

    getAsset(assetName) {
        return this.assets.get(assetName);
    }

    // Métodos de debug
    getAssetInfo() {
        return {
            currentTheme: this.currentTheme,
            totalAssets: this.assets.size,
            availableAssets: Array.from(this.assets.keys()),
            styleConfig: this.styleConfig
        };
    }
}

// Sistema global de assets visuais
window.visualAssetsSystem = new VisualAssetsSystem();

// Funções de controle global
window.renderBackground = function(ctx, canvas, backgroundName) {
    window.visualAssetsSystem.renderBackground(ctx, canvas, backgroundName);
};

window.getVisualAsset = function(assetName) {
    return window.visualAssetsSystem.getAsset(assetName);
};

window.debugVisualAssets = function() {
    console.log('🎨 Debug do Sistema de Assets Visuais:');
    console.log(window.visualAssetsSystem.getAssetInfo());
};

console.log('🎨 Sistema de Assets Visuais carregado!');
