// Sistema de Geração de Imagens - Baseado no Manual de Estilo Visual
// Cria imagens reais de backgrounds e elementos de interface

class ImageGeneratorSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.generatedImages = new Map();
        
        // Configurações baseadas no manual de estilo visual
        this.styleConfig = {
            palette: {
                primary: '#1a1a2e',      // Índigo profundo
                secondary: '#16213e',     // Azul-marinho
                accent: '#00d4ff',        // Ciano vibrante
                highlight: '#ff00ff',    // Magenta
                glow: '#9370db',         // Violeta
                crystal: '#4ecdc4',       // Verde-azulado para cristais
                organic: '#2d5016'       // Verde para elementos orgânicos
            },
            dimensions: {
                worldMap: { width: 1920, height: 1080 },
                inventory: { width: 800, height: 600 },
                buttons: { width: 200, height: 60 },
                backgrounds: { width: 1920, height: 1080 }
            }
        };
        
        this.init();
    }

    init() {
        // Criar canvas para geração de imagens
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        console.log('🎨 Sistema de Geração de Imagens inicializado');
    }

    // Gerar background do mapa do mundo
    generateWorldMapBackground() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Limpar canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Céu cósmico com nebulosa
        this.drawCosmicSky();
        
        // Ilhas flutuantes com cristais
        this.drawFloatingIslands();
        
        // Redes de cristais conectados
        this.drawCrystalNetworks();
        
        // Ruínas antigas
        this.drawAncientRuins();
        
        // Estrelas e partículas cósmicas
        this.drawCosmicStars();
        
        // Salvar imagem
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedImages.set('world-map-bg', imageData);
        
        return imageData;
    }

    drawCosmicSky() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Gradiente radial cósmico
        const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
        gradient.addColorStop(0, this.styleConfig.palette.highlight);
        gradient.addColorStop(0.3, this.styleConfig.palette.primary);
        gradient.addColorStop(0.7, this.styleConfig.palette.secondary);
        gradient.addColorStop(1, '#000000');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Nebulosa adicional
        const nebulaGradient = this.ctx.createRadialGradient(width * 0.3, height * 0.7, 0, width * 0.3, height * 0.7, width * 0.8);
        nebulaGradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
        nebulaGradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.2)');
        nebulaGradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = nebulaGradient;
        this.ctx.fillRect(0, 0, width, height);
    }

    drawFloatingIslands() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Desenhar 6 ilhas flutuantes
        for (let i = 0; i < 6; i++) {
            const x = (width / 6) * i + 100 + Math.random() * 100;
            const y = height * 0.3 + Math.random() * height * 0.4;
            const islandWidth = 120 + Math.random() * 80;
            const islandHeight = 80 + Math.random() * 60;
            
            // Ilha principal
            this.ctx.fillStyle = this.styleConfig.palette.secondary;
            this.ctx.fillRect(x, y, islandWidth, islandHeight);
            
            // Cristais na ilha
            this.drawIslandCrystals(x, y, islandWidth, islandHeight);
            
            // Vegetação nas ilhas
            this.drawIslandVegetation(x, y, islandWidth, islandHeight);
        }
    }

    drawIslandCrystals(x, y, width, height) {
        // Cristais espalhados pela ilha
        for (let i = 0; i < 3; i++) {
            const crystalX = x + Math.random() * width;
            const crystalY = y + Math.random() * height;
            const crystalSize = 15 + Math.random() * 20;
            
            // Cristal
            this.ctx.fillStyle = this.styleConfig.palette.crystal;
            this.ctx.fillRect(crystalX, crystalY, crystalSize, crystalSize * 1.5);
            
            // Brilho do cristal
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillRect(crystalX - 2, crystalY - 2, crystalSize + 4, crystalSize * 1.5 + 4);
            this.ctx.globalAlpha = 1.0;
        }
    }

    drawIslandVegetation(x, y, width, height) {
        // Vegetação orgânica
        this.ctx.fillStyle = this.styleConfig.palette.organic;
        for (let i = 0; i < 5; i++) {
            const vegX = x + Math.random() * width;
            const vegY = y + Math.random() * height;
            const vegSize = 8 + Math.random() * 12;
            
            this.ctx.beginPath();
            this.ctx.arc(vegX, vegY, vegSize, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawCrystalNetworks() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Linhas conectando cristais
        this.ctx.strokeStyle = this.styleConfig.palette.crystal;
        this.ctx.lineWidth = 3;
        this.ctx.shadowColor = this.styleConfig.palette.accent;
        this.ctx.shadowBlur = 10;
        
        for (let i = 0; i < 8; i++) {
            const x1 = Math.random() * width;
            const y1 = Math.random() * height;
            const x2 = Math.random() * width;
            const y2 = Math.random() * height;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
        
        this.ctx.shadowBlur = 0;
    }

    drawAncientRuins() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Ruínas antigas integradas com a natureza
        for (let i = 0; i < 4; i++) {
            const x = (width / 4) * i + 150;
            const y = height * 0.6;
            const ruinWidth = 80 + Math.random() * 40;
            const ruinHeight = 100 + Math.random() * 60;
            
            // Estrutura principal
            this.ctx.fillStyle = this.styleConfig.palette.secondary;
            this.ctx.fillRect(x, y, ruinWidth, ruinHeight);
            
            // Vegetação crescendo nas ruínas
            this.ctx.fillStyle = this.styleConfig.palette.organic;
            this.ctx.fillRect(x + 15, y + 15, 25, 40);
            this.ctx.fillRect(x + 40, y + 25, 20, 35);
            
            // Cristais nas ruínas
            this.ctx.fillStyle = this.styleConfig.palette.glow;
            this.ctx.fillRect(x + 30, y + 10, 15, 20);
        }
    }

    drawCosmicStars() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Estrelas cósmicas
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        for (let i = 0; i < 150; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Partículas mágicas maiores
        this.ctx.fillStyle = this.styleConfig.palette.highlight;
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 2 + Math.random() * 4;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    // Gerar interface de inventário
    generateInventoryInterface() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Limpar canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Fundo do inventário
        this.drawInventoryBackground();
        
        // Slots de itens
        this.drawInventorySlots();
        
        // Bordas e decorações
        this.drawInventoryDecorations();
        
        // Salvar imagem
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedImages.set('inventory-bg', imageData);
        
        return imageData;
    }

    drawInventoryBackground() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        
        // Fundo principal
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, this.styleConfig.palette.primary);
        gradient.addColorStop(0.5, this.styleConfig.palette.secondary);
        gradient.addColorStop(1, this.styleConfig.palette.primary);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Padrão de cristais de fundo
        this.ctx.fillStyle = this.styleConfig.palette.crystal;
        this.ctx.globalAlpha = 0.1;
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 10 + Math.random() * 20;
            
            this.ctx.fillRect(x, y, size, size);
        }
        this.ctx.globalAlpha = 1.0;
    }

    drawInventorySlots() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        const slotSize = 60;
        const slotsPerRow = 8;
        const rows = 6;
        const startX = (width - (slotsPerRow * slotSize + (slotsPerRow - 1) * 10)) / 2;
        const startY = (height - (rows * slotSize + (rows - 1) * 10)) / 2;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < slotsPerRow; col++) {
                const x = startX + col * (slotSize + 10);
                const y = startY + row * (slotSize + 10);
                
                // Slot vazio
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                this.ctx.fillRect(x, y, slotSize, slotSize);
                
                // Borda do slot
                this.ctx.strokeStyle = this.styleConfig.palette.crystal;
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x, y, slotSize, slotSize);
                
                // Brilho interno
                this.ctx.fillStyle = this.styleConfig.palette.accent;
                this.ctx.globalAlpha = 0.2;
                this.ctx.fillRect(x + 2, y + 2, slotSize - 4, slotSize - 4);
                this.ctx.globalAlpha = 1.0;
            }
        }
    }

    drawInventoryDecorations() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        
        // Bordas decorativas
        this.ctx.strokeStyle = this.styleConfig.palette.glow;
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(10, 10, width - 20, height - 20);
        
        // Cantos decorativos
        const cornerSize = 30;
        this.ctx.fillStyle = this.styleConfig.palette.highlight;
        
        // Canto superior esquerdo
        this.ctx.fillRect(10, 10, cornerSize, 4);
        this.ctx.fillRect(10, 10, 4, cornerSize);
        
        // Canto superior direito
        this.ctx.fillRect(width - 10 - cornerSize, 10, cornerSize, 4);
        this.ctx.fillRect(width - 14, 10, 4, cornerSize);
        
        // Canto inferior esquerdo
        this.ctx.fillRect(10, height - 14, cornerSize, 4);
        this.ctx.fillRect(10, height - 10 - cornerSize, 4, cornerSize);
        
        // Canto inferior direito
        this.ctx.fillRect(width - 10 - cornerSize, height - 14, cornerSize, 4);
        this.ctx.fillRect(width - 14, height - 10 - cornerSize, 4, cornerSize);
    }

    // Gerar botões de interface
    generateButton(type, text) {
        const { width, height } = this.styleConfig.dimensions.buttons;
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Limpar canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Desenhar botão baseado no tipo
        switch (type) {
            case 'primary':
                this.drawPrimaryButton(text);
                break;
            case 'secondary':
                this.drawSecondaryButton(text);
                break;
            case 'danger':
                this.drawDangerButton(text);
                break;
            case 'success':
                this.drawSuccessButton(text);
                break;
            default:
                this.drawPrimaryButton(text);
        }
        
        // Salvar imagem
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedImages.set(`button-${type}-${text}`, imageData);
        
        return imageData;
    }

    drawPrimaryButton(text) {
        const { width, height } = this.styleConfig.dimensions.buttons;
        
        // Fundo do botão
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, this.styleConfig.palette.crystal);
        gradient.addColorStop(1, this.styleConfig.palette.accent);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Borda
        this.ctx.strokeStyle = this.styleConfig.palette.glow;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, width, height);
        
        // Texto
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 16px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, width / 2, height / 2);
        
        // Brilho
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillRect(2, 2, width - 4, height - 4);
        this.ctx.globalAlpha = 1.0;
    }

    drawSecondaryButton(text) {
        const { width, height } = this.styleConfig.dimensions.buttons;
        
        // Fundo transparente
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(0, 0, width, height);
        
        // Borda
        this.ctx.strokeStyle = this.styleConfig.palette.glow;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, width, height);
        
        // Texto
        this.ctx.fillStyle = this.styleConfig.palette.glow;
        this.ctx.font = 'bold 16px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, width / 2, height / 2);
    }

    drawDangerButton(text) {
        const { width, height } = this.styleConfig.dimensions.buttons;
        
        // Fundo vermelho
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#FF6B6B');
        gradient.addColorStop(1, '#FF4757');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Borda
        this.ctx.strokeStyle = '#FF3838';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, width, height);
        
        // Texto
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 16px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, width / 2, height / 2);
    }

    drawSuccessButton(text) {
        const { width, height } = this.styleConfig.dimensions.buttons;
        
        // Fundo verde
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#2ED573');
        gradient.addColorStop(1, '#1DD1A1');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Borda
        this.ctx.strokeStyle = '#00B894';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, width, height);
        
        // Texto
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 16px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, width / 2, height / 2);
    }

    // Gerar background de seleção de heróis
    generateHeroSelectBackground() {
        const { width, height } = this.styleConfig.dimensions.backgrounds;
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Limpar canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Santuário dos heróis
        this.drawHeroSanctuary();
        
        // Pedestais dos heróis
        this.drawHeroPedestals();
        
        // Cristais sagrados
        this.drawSacredCrystals();
        
        // Névoa etérea
        this.drawEtherealMist();
        
        // Salvar imagem
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedImages.set('hero-select-bg', imageData);
        
        return imageData;
    }

    drawHeroSanctuary() {
        const { width, height } = this.styleConfig.dimensions.backgrounds;
        
        // Fundo do santuário
        const gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
        gradient.addColorStop(0, this.styleConfig.palette.secondary);
        gradient.addColorStop(0.7, this.styleConfig.palette.primary);
        gradient.addColorStop(1, '#000000');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Pilares do santuário
        this.ctx.fillStyle = this.styleConfig.palette.secondary;
        for (let i = 0; i < 8; i++) {
            const x = (width / 8) * i + 50;
            const y = height * 0.2;
            const pillarWidth = 30;
            const pillarHeight = height * 0.6;
            
            this.ctx.fillRect(x, y, pillarWidth, pillarHeight);
        }
    }

    drawHeroPedestals() {
        const { width, height } = this.styleConfig.dimensions.backgrounds;
        
        // Pedestais flutuantes para os heróis
        for (let i = 0; i < 4; i++) {
            const x = (width / 4) * i + width / 8;
            const y = height * 0.4;
            const pedestalWidth = 120;
            const pedestalHeight = 20;
            
            // Pedestal
            this.ctx.fillStyle = this.styleConfig.palette.glow;
            this.ctx.fillRect(x, y, pedestalWidth, pedestalHeight);
            
            // Brilho do pedestal
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.6;
            this.ctx.fillRect(x - 5, y - 5, pedestalWidth + 10, pedestalHeight + 10);
            this.ctx.globalAlpha = 1.0;
        }
    }

    drawSacredCrystals() {
        const { width, height } = this.styleConfig.dimensions.backgrounds;
        
        // Cristal central sagrado
        const centerX = width / 2;
        const centerY = height * 0.3;
        const crystalSize = 80;
        
        // Cristal principal
        this.ctx.fillStyle = this.styleConfig.palette.crystal;
        this.ctx.fillRect(centerX - crystalSize/2, centerY - crystalSize/2, crystalSize, crystalSize * 1.5);
        
        // Brilho intenso
        this.ctx.fillStyle = this.styleConfig.palette.highlight;
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillRect(centerX - crystalSize/2 - 10, centerY - crystalSize/2 - 10, crystalSize + 20, crystalSize * 1.5 + 20);
        this.ctx.globalAlpha = 1.0;
    }

    drawEtherealMist() {
        const { width, height } = this.styleConfig.dimensions.backgrounds;
        
        // Névoa etérea flutuante
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.globalAlpha = 0.2;
        
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 50 + Math.random() * 100;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.globalAlpha = 1.0;
    }

    // Aplicar imagens geradas ao jogo
    applyGeneratedImages() {
        // Aplicar background do mapa do mundo
        this.applyWorldMapBackground();
        
        // Aplicar interface de inventário
        this.applyInventoryInterface();
        
        // Aplicar botões
        this.applyButtons();
        
        // Aplicar background de seleção de heróis
        this.applyHeroSelectBackground();
    }

    applyWorldMapBackground() {
        const worldMapBg = this.generateWorldMapBackground();
        const worldMapElement = document.querySelector('.world-map');
        if (worldMapElement) {
            worldMapElement.style.backgroundImage = `url(${worldMapBg})`;
            worldMapElement.style.backgroundSize = 'cover';
            worldMapElement.style.backgroundPosition = 'center';
        }
    }

    applyInventoryInterface() {
        const inventoryBg = this.generateInventoryInterface();
        // Criar elemento de inventário se não existir
        let inventoryElement = document.querySelector('.inventory-interface');
        if (!inventoryElement) {
            inventoryElement = document.createElement('div');
            inventoryElement.className = 'inventory-interface';
            inventoryElement.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 800px;
                height: 600px;
                background-image: url(${inventoryBg});
                background-size: cover;
                background-position: center;
                border: 3px solid #4ecdc4;
                border-radius: 15px;
                z-index: 1000;
                display: none;
            `;
            document.body.appendChild(inventoryElement);
        } else {
            inventoryElement.style.backgroundImage = `url(${inventoryBg})`;
        }
    }

    applyButtons() {
        // Gerar botões comuns
        const buttonTypes = [
            { type: 'primary', text: 'Continuar' },
            { type: 'secondary', text: 'Voltar' },
            { type: 'danger', text: 'Sair' },
            { type: 'success', text: 'Confirmar' }
        ];

        buttonTypes.forEach(button => {
            const imageData = this.generateButton(button.type, button.text);
            // Aplicar aos botões existentes
            const buttons = document.querySelectorAll(`button[data-type="${button.type}"]`);
            buttons.forEach(btn => {
                btn.style.backgroundImage = `url(${imageData})`;
                btn.style.backgroundSize = 'cover';
                btn.style.backgroundPosition = 'center';
                btn.style.border = 'none';
            });
        });
    }

    applyHeroSelectBackground() {
        const heroSelectBg = this.generateHeroSelectBackground();
        const heroSelectElement = document.querySelector('.character-selection');
        if (heroSelectElement) {
            heroSelectElement.style.backgroundImage = `url(${heroSelectBg})`;
            heroSelectElement.style.backgroundSize = 'cover';
            heroSelectElement.style.backgroundPosition = 'center';
        }
    }

    // Métodos de controle
    generateAllImages() {
        console.log('🎨 Gerando todas as imagens...');
        
        this.generateWorldMapBackground();
        this.generateInventoryInterface();
        this.generateHeroSelectBackground();
        
        // Gerar botões
        this.generateButton('primary', 'Continuar');
        this.generateButton('secondary', 'Voltar');
        this.generateButton('danger', 'Sair');
        this.generateButton('success', 'Confirmar');
        
        console.log('✅ Todas as imagens geradas!');
    }

    // Métodos de debug
    getGeneratedImages() {
        return Array.from(this.generatedImages.keys());
    }

    downloadImage(imageName) {
        const imageData = this.generatedImages.get(imageName);
        if (imageData) {
            const link = document.createElement('a');
            link.download = `${imageName}.png`;
            link.href = imageData;
            link.click();
        }
    }
}

// Sistema global de geração de imagens
window.imageGeneratorSystem = new ImageGeneratorSystem();

// Funções de controle global
window.generateAllImages = function() {
    window.imageGeneratorSystem.generateAllImages();
};

window.applyGeneratedImages = function() {
    window.imageGeneratorSystem.applyGeneratedImages();
};

window.downloadImage = function(imageName) {
    window.imageGeneratorSystem.downloadImage(imageName);
};

window.debugGeneratedImages = function() {
    console.log('🎨 Imagens geradas:', window.imageGeneratorSystem.getGeneratedImages());
};

console.log('🎨 Sistema de Geração de Imagens carregado!');
