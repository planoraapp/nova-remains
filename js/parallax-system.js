// ========================================
// SISTEMA DE PARALLAX AVANÇADO - NOVA REMAINS
// Baseado no commit 9e401c9: "feat: Implementar sistema de assets do mapa com parallax"
// ========================================

class ParallaxSystem {
    constructor() {
        this.layers = [];
        this.camera = { x: 0, y: 0 };
        this.canvas = null;
        this.ctx = null;
        this.images = {};
        this.loadedImages = 0;
        this.totalImages = 0;
        this.isInitialized = false;
        
        this.initializeLayers();
    }
    
    // ========================================
    // INICIALIZAÇÃO DO SISTEMA
    // ========================================
    
    initializeLayers() {
        this.layers = [
            {
                name: 'sky',
                speed: 0.1,
                height: 400,
                imagePath: 'assets/images/backgrounds/parallax/sky-layer.png',
                type: 'image',
                y: 0,
                repeat: true
            },
            {
                name: 'mountains_far',
                speed: 0.3,
                height: 300,
                imagePath: 'assets/images/backgrounds/parallax/mountains-far.png',
                type: 'image',
                y: 0,
                repeat: true
            },
            {
                name: 'trees',
                speed: 0.6,
                height: 200,
                imagePath: 'assets/images/backgrounds/parallax/trees-layer.png',
                type: 'image',
                y: 0,
                repeat: true
            },
            {
                name: 'foreground',
                speed: 1.2,
                height: 150,
                imagePath: 'assets/images/backgrounds/parallax/foreground-layer.png',
                type: 'image',
                y: 0,
                repeat: true
            },
            {
                name: 'decorative',
                speed: 1.5,
                height: 100,
                imagePath: 'assets/images/backgrounds/parallax/decorative-elements.png',
                type: 'image',
                y: 0,
                repeat: true,
                alpha: 0.8
            }
        ];
        
        this.totalImages = this.layers.length;
        console.log('🎨 Sistema de parallax inicializado com', this.totalImages, 'camadas');
    }
    
    // ========================================
    // CARREGAMENTO DE IMAGENS
    // ========================================
    
    async loadImages() {
        console.log('📸 Carregando imagens de parallax...');
        
        const loadPromises = this.layers.map(layer => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.images[layer.name] = img;
                    this.loadedImages++;
                    console.log(`✅ ${layer.name} carregada (${this.loadedImages}/${this.totalImages})`);
                    resolve();
                };
                img.onerror = () => {
                    console.warn(`⚠️ Erro ao carregar ${layer.name}, usando fallback`);
                    this.createFallbackImage(layer);
                    this.loadedImages++;
                    resolve();
                };
                img.src = layer.imagePath;
            });
        });
        
        await Promise.all(loadPromises);
        this.isInitialized = true;
        console.log('🎉 Todas as imagens de parallax carregadas!');
    }
    
    createFallbackImage(layer) {
        // Criar imagem de fallback programaticamente
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = layer.height;
        const ctx = canvas.getContext('2d');
        
        // Gerar padrão baseado no tipo de camada
        switch(layer.name) {
            case 'sky':
                this.createSkyFallback(ctx, canvas.width, canvas.height);
                break;
            case 'mountains_far':
                this.createMountainsFallback(ctx, canvas.width, canvas.height);
                break;
            case 'trees':
                this.createTreesFallback(ctx, canvas.width, canvas.height);
                break;
            case 'foreground':
                this.createForegroundFallback(ctx, canvas.width, canvas.height);
                break;
            case 'decorative':
                this.createDecorativeFallback(ctx, canvas.width, canvas.height);
                break;
        }
        
        this.images[layer.name] = canvas;
    }
    
    createSkyFallback(ctx, width, height) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#0f0f23');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Estrelas
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height * 0.7;
            const size = Math.random() * 2 + 0.5;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    createMountainsFallback(ctx, width, height) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#2d3748');
        gradient.addColorStop(1, '#1a202c');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Montanhas simples
        ctx.fillStyle = '#4a5568';
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 20) {
            const mountainHeight = Math.random() * 100 + 50;
            const y = height - mountainHeight;
            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
    }
    
    createTreesFallback(ctx, width, height) {
        ctx.fillStyle = '#2d5016';
        ctx.fillRect(0, 0, width, height);
        
        // Árvores simples
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * width;
            const treeHeight = Math.random() * 60 + 40;
            const treeWidth = Math.random() * 15 + 10;
            
            // Tronco
            ctx.fillStyle = '#4a3728';
            ctx.fillRect(x - treeWidth/4, height - treeHeight, treeWidth/2, treeHeight);
            
            // Copa
            ctx.fillStyle = '#2d5016';
            ctx.beginPath();
            ctx.ellipse(x, height - treeHeight, treeWidth, treeHeight * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    createForegroundFallback(ctx, width, height) {
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(0, 0, width, height);
        
        // Pedras
        ctx.fillStyle = '#6b7280';
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * width;
            const y = height - Math.random() * 30 - 20;
            const size = Math.random() * 20 + 15;
            
            ctx.fillRect(x, y, size, size * 0.7);
        }
    }
    
    createDecorativeFallback(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
        
        // Partículas
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 2 + 1;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // ========================================
    // ATUALIZAÇÃO E RENDERIZAÇÃO
    // ========================================
    
    update(camera) {
        this.camera = camera;
        
        // Atualizar offsets das camadas
        this.layers.forEach(layer => {
            layer.offset = (layer.offset || 0) + layer.speed;
        });
    }
    
    render(ctx, canvasWidth, canvasHeight) {
        if (!this.isInitialized) return;
        
        // Renderizar camadas em ordem (fundo para frente)
        this.layers.forEach(layer => {
            this.renderLayer(ctx, layer, canvasWidth, canvasHeight);
        });
    }
    
    renderLayer(ctx, layer, canvasWidth, canvasHeight) {
        const image = this.images[layer.name];
        if (!image) return;
        
        const offset = (layer.offset || 0) - this.camera.x * layer.speed;
        const layerHeight = Math.min(layer.height, canvasHeight);
        
        // Aplicar transparência se definida
        if (layer.alpha !== undefined) {
            ctx.globalAlpha = layer.alpha;
        }
        
        if (layer.repeat) {
            // Renderizar imagem repetida
            const imageWidth = image.width || image.naturalWidth;
            const startX = Math.floor(offset / imageWidth) * imageWidth;
            
            for (let x = startX; x < offset + canvasWidth; x += imageWidth) {
                ctx.drawImage(
                    image,
                    0, 0, imageWidth, layer.height,
                    x - offset, layer.y, imageWidth, layerHeight
                );
            }
        } else {
            // Renderizar imagem única
            ctx.drawImage(
                image,
                0, 0, image.width || image.naturalWidth, layer.height,
                offset, layer.y, image.width || image.naturalWidth, layerHeight
            );
        }
        
        // Restaurar transparência
        ctx.globalAlpha = 1.0;
    }
    
    // ========================================
    // CONTROLES E CONFIGURAÇÃO
    // ========================================
    
    setLayerSpeed(layerName, speed) {
        const layer = this.layers.find(l => l.name === layerName);
        if (layer) {
            layer.speed = speed;
            console.log(`🎮 Velocidade da camada ${layerName} alterada para ${speed}`);
        }
    }
    
    setLayerAlpha(layerName, alpha) {
        const layer = this.layers.find(l => l.name === layerName);
        if (layer) {
            layer.alpha = alpha;
            console.log(`🎨 Transparência da camada ${layerName} alterada para ${alpha}`);
        }
    }
    
    resetOffsets() {
        this.layers.forEach(layer => {
            layer.offset = 0;
        });
        console.log('🔄 Offsets das camadas resetados');
    }
    
    // ========================================
    // INTEGRAÇÃO COM O JOGO
    // ========================================
    
    integrateWithGame(gameInstance) {
        if (gameInstance && gameInstance.camera) {
            this.camera = gameInstance.camera;
            console.log('🎮 Sistema de parallax integrado com o jogo');
        }
    }
    
    // ========================================
    // DEBUG E INFORMAÇÕES
    // ========================================
    
    getLayerInfo() {
        return this.layers.map(layer => ({
            name: layer.name,
            speed: layer.speed,
            height: layer.height,
            offset: layer.offset || 0,
            loaded: !!this.images[layer.name]
        }));
    }
    
    logStatus() {
        console.log('📊 Status do Sistema de Parallax:');
        console.log(`   - Camadas: ${this.layers.length}`);
        console.log(`   - Imagens carregadas: ${this.loadedImages}/${this.totalImages}`);
        console.log(`   - Inicializado: ${this.isInitialized}`);
        console.log('   - Camadas:', this.getLayerInfo());
    }
}

// ========================================
// INICIALIZAÇÃO GLOBAL
// ========================================

// Criar instância global
window.parallaxSystem = new ParallaxSystem();

// Função para inicializar o sistema
async function initializeParallaxSystem() {
    try {
        await window.parallaxSystem.loadImages();
        console.log('🎉 Sistema de parallax inicializado com sucesso!');
        return true;
    } catch (error) {
        console.error('❌ Erro ao inicializar sistema de parallax:', error);
        return false;
    }
}

// Função para integrar com o jogo existente
function integrateParallaxWithGame() {
    if (window.game && window.game.camera) {
        window.parallaxSystem.integrateWithGame(window.game);
    }
    
    if (window.levelDesignSystem) {
        // Integrar com o sistema de level design existente
        const originalRender = window.levelDesignSystem.renderParallax;
        window.levelDesignSystem.renderParallax = function(ctx, camera) {
            // Usar o novo sistema de parallax
            window.parallaxSystem.update(camera);
            window.parallaxSystem.render(ctx, ctx.canvas.width, ctx.canvas.height);
        };
        
        console.log('🔗 Sistema de parallax integrado com LevelDesignSystem');
    }
}

// Auto-inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeParallaxSystem().then(() => {
            integrateParallaxWithGame();
        });
    });
} else {
    initializeParallaxSystem().then(() => {
        integrateParallaxWithGame();
    });
}

// Exportar para uso global
window.ParallaxSystem = ParallaxSystem;
window.initializeParallaxSystem = initializeParallaxSystem;
window.integrateParallaxWithGame = integrateParallaxWithGame;

console.log('🎨 Sistema de Parallax Avançado carregado!');
console.log('📋 Funcionalidades:', [
    'Carregamento automático de imagens',
    'Fallbacks programáticos para cada camada',
    'Sistema de repetição infinita',
    'Controle de velocidade por camada',
    'Integração com sistema de câmera',
    'Suporte a transparência',
    'Debug e informações detalhadas'
]);
