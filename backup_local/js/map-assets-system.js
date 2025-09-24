// Sistema de Assets do Mapa
class MapAssetsSystem {
    constructor() {
        this.images = {};
        this.loaded = false;
        this.loadAssets();
    }
    
    async loadAssets() {
        const assets = [
            { name: 'sky', path: 'assets/images/maps/first/sky.png' },
            { name: 'bg', path: 'assets/images/maps/first/bg.png' },
            { name: 'platform', path: 'assets/images/maps/first/platform.png' },
            { name: 'terrain', path: 'assets/images/maps/first/terrain.png' },
            { name: 'terrain2', path: 'assets/images/maps/first/terrain2.png' },
            { name: 'trees', path: 'assets/images/maps/first/trees.png' }
        ];
        
        const loadPromises = assets.map(asset => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.images[asset.name] = img;
                    console.log(`✅ Asset carregado: ${asset.name}`);
                    resolve();
                };
                img.onerror = () => {
                    console.log(`❌ Erro ao carregar: ${asset.name}`);
                    resolve(); // Continua mesmo se falhar
                };
                img.src = asset.path;
            });
        });
        
        await Promise.all(loadPromises);
        this.loaded = true;
        console.log('🎨 Sistema de Assets do Mapa carregado!');
    }
    
    renderParallax(ctx, camera, canvas) {
        if (!this.loaded) return;
        
        // Sky (parallax mais lento)
        if (this.images.sky) {
            const skyX = -camera.x * 0.1;
            const skyY = -camera.y * 0.05;
            ctx.drawImage(this.images.sky, skyX, skyY, canvas.width, canvas.height);
        }
        
        // Background (parallax médio)
        if (this.images.bg) {
            const bgX = -camera.x * 0.3;
            const bgY = -camera.y * 0.1;
            ctx.drawImage(this.images.bg, bgX, bgY, canvas.width, canvas.height);
        }
    }
    
    renderPlatforms(ctx, camera, platforms) {
        if (!this.loaded) return;
        
        platforms.forEach(platform => {
            const platformX = platform.x - camera.x;
            const platformY = platform.y - camera.y;
            
            if (platformX + platform.width > 0 && platformX < ctx.canvas.width) {
                // Usar asset de plataforma se disponível
                if (this.images.platform && platform.type === 'platform') {
                    ctx.drawImage(this.images.platform, platformX, platformY, platform.width, platform.height);
                } else if (this.images.terrain && platform.type === 'ground') {
                    ctx.drawImage(this.images.terrain, platformX, platformY, platform.width, platform.height);
                } else {
                    // Fallback para formas geométricas
                    ctx.fillStyle = platform.type === 'ground' ? '#4a5568' : '#6b7280';
                    ctx.fillRect(platformX, platformY, platform.width, platform.height);
                }
            }
        });
    }
    
    renderDecorations(ctx, camera, canvas) {
        if (!this.loaded) return;
        
        // Árvores (parallax médio)
        if (this.images.trees) {
            const treesX = -camera.x * 0.4;
            const treesY = -camera.y * 0.2;
            ctx.drawImage(this.images.trees, treesX, treesY, canvas.width, canvas.height);
        }
    }
}

// Exportar para uso global
window.MapAssetsSystem = MapAssetsSystem;
