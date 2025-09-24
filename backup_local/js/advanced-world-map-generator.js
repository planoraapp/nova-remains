// Gerador Avançado de Mapa do Mundo - Ilustrações Detalhadas
// Cria backgrounds artísticos e elaborados seguindo o manual de estilo visual

class AdvancedWorldMapGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.generatedMaps = new Map();
        
        // Configurações baseadas no manual de estilo visual
        this.styleConfig = {
            palette: {
                primary: '#1a1a2e',      // Índigo profundo
                secondary: '#16213e',   // Azul-marinho
                accent: '#00d4ff',      // Ciano vibrante
                highlight: '#ff00ff',   // Magenta
                glow: '#9370db',        // Violeta
                crystal: '#4ecdc4',     // Verde-azulado para cristais
                organic: '#2d5016',     // Verde para elementos orgânicos
                ancient: '#8B4513',     // Marrom para ruínas
                cosmic: '#4B0082'       // Índigo para elementos cósmicos
            },
            dimensions: {
                worldMap: { width: 1920, height: 1080 },
                detailMap: { width: 2560, height: 1440 }
            }
        };
        
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        console.log('🗺️ Gerador Avançado de Mapa do Mundo inicializado');
    }

    // Gerar mapa do mundo principal com ilustrações detalhadas
    generateDetailedWorldMap() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Limpar canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Criar ilustração em camadas
        this.drawCosmicNebula();
        this.drawDistantGalaxies();
        this.drawFloatingContinents();
        this.drawCrystalMountains();
        this.drawAncientRuins();
        this.drawCrystalNetworks();
        this.drawMagicalForests();
        this.drawFloatingIslands();
        this.drawCosmicStars();
        this.drawAuroraBorealis();
        this.drawMagicalParticles();
        
        // Salvar imagem
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedMaps.set('detailed-world-map', imageData);
        
        return imageData;
    }

    drawCosmicNebula() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Nebulosa principal - centro
        const centerX = width * 0.3;
        const centerY = height * 0.7;
        const nebulaSize = width * 0.8;
        
        // Gradiente radial para nebulosa
        const nebulaGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, nebulaSize);
        nebulaGradient.addColorStop(0, 'rgba(255, 0, 255, 0.4)');
        nebulaGradient.addColorStop(0.3, 'rgba(0, 212, 255, 0.3)');
        nebulaGradient.addColorStop(0.6, 'rgba(147, 112, 219, 0.2)');
        nebulaGradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = nebulaGradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Nebulosa secundária - canto superior direito
        const nebula2X = width * 0.8;
        const nebula2Y = height * 0.2;
        const nebula2Size = width * 0.6;
        
        const nebula2Gradient = this.ctx.createRadialGradient(nebula2X, nebula2Y, 0, nebula2X, nebula2Y, nebula2Size);
        nebula2Gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)');
        nebula2Gradient.addColorStop(0.5, 'rgba(78, 205, 196, 0.2)');
        nebula2Gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = nebula2Gradient;
        this.ctx.fillRect(0, 0, width, height);
    }

    drawDistantGalaxies() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Galáxias distantes como pontos brilhantes
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 2 + Math.random() * 4;
            
            // Brilho da galáxia
            this.ctx.shadowColor = this.styleConfig.palette.accent;
            this.ctx.shadowBlur = 15;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.shadowBlur = 0;
    }

    drawFloatingContinents() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Continente principal - grande e majestoso
        this.drawMainContinent(width * 0.2, height * 0.3, width * 0.4, height * 0.5);
        
        // Continente secundário - menor e mais distante
        this.drawSecondaryContinent(width * 0.7, height * 0.1, width * 0.25, height * 0.3);
        
        // Ilhas menores espalhadas
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 30 + Math.random() * 50;
            this.drawSmallIsland(x, y, size);
        }
    }

    drawMainContinent(x, y, width, height) {
        // Forma orgânica do continente
        this.ctx.fillStyle = this.styleConfig.palette.secondary;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height * 0.3);
        
        // Criar bordas irregulares
        const points = 20;
        for (let i = 0; i <= points; i++) {
            const t = i / points;
            const px = x + width * t;
            const py = y + height * (0.3 + Math.sin(t * Math.PI * 2) * 0.2 + Math.random() * 0.1);
            this.ctx.lineTo(px, py);
        }
        
        this.ctx.lineTo(x + width, y + height);
        this.ctx.lineTo(x, y + height);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Montanhas cristalinas
        this.drawCrystalMountainsOnContinent(x, y, width, height);
        
        // Florestas mágicas
        this.drawMagicalForestsOnContinent(x, y, width, height);
        
        // Ruínas antigas
        this.drawAncientRuinsOnContinent(x, y, width, height);
    }

    drawSecondaryContinent(x, y, width, height) {
        // Continente menor com forma diferente
        this.ctx.fillStyle = this.styleConfig.palette.primary;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height * 0.4);
        
        const points = 15;
        for (let i = 0; i <= points; i++) {
            const t = i / points;
            const px = x + width * t;
            const py = y + height * (0.4 + Math.cos(t * Math.PI) * 0.3 + Math.random() * 0.1);
            this.ctx.lineTo(px, py);
        }
        
        this.ctx.lineTo(x + width, y + height);
        this.ctx.lineTo(x, y + height);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Cristais menores
        this.drawSmallCrystals(x, y, width, height);
    }

    drawSmallIsland(x, y, size) {
        // Ilhas pequenas com formas orgânicas
        this.ctx.fillStyle = this.styleConfig.palette.organic;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Vegetação na ilha
        this.ctx.fillStyle = this.styleConfig.palette.crystal;
        for (let i = 0; i < 3; i++) {
            const vegX = x + (Math.random() - 0.5) * size;
            const vegY = y + (Math.random() - 0.5) * size;
            this.ctx.beginPath();
            this.ctx.arc(vegX, vegY, size * 0.2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawCrystalMountains() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Montanhas cristalinas espalhadas
        for (let i = 0; i < 12; i++) {
            const x = Math.random() * width;
            const y = height * 0.6 + Math.random() * height * 0.3;
            const mountainHeight = 80 + Math.random() * 120;
            const mountainWidth = 40 + Math.random() * 60;
            
            this.drawCrystalMountain(x, y, mountainWidth, mountainHeight);
        }
    }

    drawCrystalMountain(x, y, width, height) {
        // Base da montanha
        this.ctx.fillStyle = this.styleConfig.palette.secondary;
        this.ctx.fillRect(x - width/2, y, width, height);
        
        // Cristais na montanha
        this.ctx.fillStyle = this.styleConfig.palette.crystal;
        for (let i = 0; i < 5; i++) {
            const crystalX = x - width/2 + Math.random() * width;
            const crystalY = y + Math.random() * height;
            const crystalSize = 10 + Math.random() * 20;
            
            // Cristal
            this.ctx.fillRect(crystalX, crystalY, crystalSize, crystalSize * 1.5);
            
            // Brilho do cristal
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillRect(crystalX - 2, crystalY - 2, crystalSize + 4, crystalSize * 1.5 + 4);
            this.ctx.globalAlpha = 1.0;
            this.ctx.fillStyle = this.styleConfig.palette.crystal;
        }
    }

    drawCrystalMountainsOnContinent(x, y, width, height) {
        // Montanhas específicas do continente principal
        for (let i = 0; i < 8; i++) {
            const mountainX = x + Math.random() * width;
            const mountainY = y + height * 0.7;
            const mountainHeight = 60 + Math.random() * 80;
            const mountainWidth = 30 + Math.random() * 40;
            
            this.drawCrystalMountain(mountainX, mountainY, mountainWidth, mountainHeight);
        }
    }

    drawAncientRuins() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Ruínas espalhadas pelo mapa
        for (let i = 0; i < 6; i++) {
            const x = Math.random() * width;
            const y = height * 0.5 + Math.random() * height * 0.4;
            const ruinSize = 60 + Math.random() * 80;
            
            this.drawAncientRuin(x, y, ruinSize);
        }
    }

    drawAncientRuin(x, y, size) {
        // Estrutura principal
        this.ctx.fillStyle = this.styleConfig.palette.ancient;
        this.ctx.fillRect(x - size/2, y - size/2, size, size * 0.8);
        
        // Colunas
        this.ctx.fillStyle = this.styleConfig.palette.secondary;
        for (let i = 0; i < 3; i++) {
            const colX = x - size/2 + (i + 1) * size/4;
            const colY = y - size/2;
            this.ctx.fillRect(colX, colY, size/8, size * 0.8);
        }
        
        // Vegetação crescendo nas ruínas
        this.ctx.fillStyle = this.styleConfig.palette.organic;
        for (let i = 0; i < 4; i++) {
            const vegX = x - size/2 + Math.random() * size;
            const vegY = y - size/2 + Math.random() * size * 0.8;
            this.ctx.beginPath();
            this.ctx.arc(vegX, vegY, size * 0.1, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Cristais nas ruínas
        this.ctx.fillStyle = this.styleConfig.palette.glow;
        this.ctx.fillRect(x - size/4, y - size/4, size/4, size/4);
    }

    drawAncientRuinsOnContinent(x, y, width, height) {
        // Ruínas específicas do continente
        for (let i = 0; i < 4; i++) {
            const ruinX = x + Math.random() * width;
            const ruinY = y + height * 0.6;
            const ruinSize = 40 + Math.random() * 60;
            
            this.drawAncientRuin(ruinX, ruinY, ruinSize);
        }
    }

    drawCrystalNetworks() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Redes de cristais conectando elementos
        this.ctx.strokeStyle = this.styleConfig.palette.crystal;
        this.ctx.lineWidth = 3;
        this.ctx.shadowColor = this.styleConfig.palette.accent;
        this.ctx.shadowBlur = 10;
        
        // Linhas principais conectando continentes
        this.ctx.beginPath();
        this.ctx.moveTo(width * 0.4, height * 0.5);
        this.ctx.lineTo(width * 0.8, height * 0.2);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(width * 0.3, height * 0.6);
        this.ctx.lineTo(width * 0.7, height * 0.4);
        this.ctx.stroke();
        
        // Linhas secundárias
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

    drawMagicalForests() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Florestas mágicas espalhadas
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * width;
            const y = height * 0.4 + Math.random() * height * 0.5;
            const forestSize = 40 + Math.random() * 80;
            
            this.drawMagicalForest(x, y, forestSize);
        }
    }

    drawMagicalForest(x, y, size) {
        // Árvores mágicas
        this.ctx.fillStyle = this.styleConfig.palette.organic;
        for (let i = 0; i < 8; i++) {
            const treeX = x + (Math.random() - 0.5) * size;
            const treeY = y + (Math.random() - 0.5) * size;
            const treeHeight = 20 + Math.random() * 40;
            const treeWidth = 8 + Math.random() * 12;
            
            // Tronco
            this.ctx.fillRect(treeX, treeY, treeWidth, treeHeight);
            
            // Copa
            this.ctx.fillStyle = this.styleConfig.palette.glow;
            this.ctx.beginPath();
            this.ctx.arc(treeX + treeWidth/2, treeY, treeWidth * 1.5, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Bioluminescência
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.6;
            this.ctx.beginPath();
            this.ctx.arc(treeX + treeWidth/2, treeY, treeWidth * 1.2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
            
            this.ctx.fillStyle = this.styleConfig.palette.organic;
        }
    }

    drawMagicalForestsOnContinent(x, y, width, height) {
        // Florestas específicas do continente
        for (let i = 0; i < 6; i++) {
            const forestX = x + Math.random() * width;
            const forestY = y + height * 0.4;
            const forestSize = 30 + Math.random() * 50;
            
            this.drawMagicalForest(forestX, forestY, forestSize);
        }
    }

    drawFloatingIslands() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Ilhas flutuantes em diferentes alturas
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * width;
            const y = height * 0.2 + Math.random() * height * 0.6;
            const islandSize = 20 + Math.random() * 40;
            
            this.drawFloatingIsland(x, y, islandSize);
        }
    }

    drawFloatingIsland(x, y, size) {
        // Ilha flutuante
        this.ctx.fillStyle = this.styleConfig.palette.secondary;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Cristais na ilha
        this.ctx.fillStyle = this.styleConfig.palette.crystal;
        for (let i = 0; i < 2; i++) {
            const crystalX = x + (Math.random() - 0.5) * size;
            const crystalY = y + (Math.random() - 0.5) * size;
            const crystalSize = size * 0.3;
            
            this.ctx.fillRect(crystalX, crystalY, crystalSize, crystalSize * 1.5);
        }
        
        // Brilho da ilha
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.globalAlpha = 0.3;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 1.2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalAlpha = 1.0;
    }

    drawCosmicStars() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Estrelas de diferentes tamanhos e cores
        const starColors = [
            this.styleConfig.palette.accent,
            this.styleConfig.palette.highlight,
            this.styleConfig.palette.glow,
            this.styleConfig.palette.crystal
        ];
        
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3;
            const color = starColors[Math.floor(Math.random() * starColors.length)];
            
            this.ctx.fillStyle = color;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = size * 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.shadowBlur = 0;
    }

    drawAuroraBorealis() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Aurora boreal no topo do mapa
        const auroraHeight = height * 0.3;
        
        // Gradiente para aurora
        const auroraGradient = this.ctx.createLinearGradient(0, 0, 0, auroraHeight);
        auroraGradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
        auroraGradient.addColorStop(0.3, 'rgba(255, 0, 255, 0.3)');
        auroraGradient.addColorStop(0.6, 'rgba(147, 112, 219, 0.2)');
        auroraGradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = auroraGradient;
        this.ctx.fillRect(0, 0, width, auroraHeight);
        
        // Ondas da aurora
        this.ctx.strokeStyle = this.styleConfig.palette.accent;
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.6;
        
        for (let i = 0; i < 5; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, height * 0.1 + i * 20);
            
            for (let x = 0; x < width; x += 10) {
                const y = height * 0.1 + i * 20 + Math.sin(x * 0.01) * 15;
                this.ctx.lineTo(x, y);
            }
            this.ctx.stroke();
        }
        this.ctx.globalAlpha = 1.0;
    }

    drawMagicalParticles() {
        const { width, height } = this.styleConfig.dimensions.worldMap;
        
        // Partículas mágicas flutuantes
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 1 + Math.random() * 2;
            const color = Math.random() > 0.5 ? this.styleConfig.palette.accent : this.styleConfig.palette.highlight;
            
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = 0.7;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1.0;
    }

    drawSmallCrystals(x, y, width, height) {
        // Cristais menores no continente secundário
        for (let i = 0; i < 3; i++) {
            const crystalX = x + Math.random() * width;
            const crystalY = y + height * 0.6;
            const crystalSize = 15 + Math.random() * 25;
            
            this.ctx.fillStyle = this.styleConfig.palette.crystal;
            this.ctx.fillRect(crystalX, crystalY, crystalSize, crystalSize * 1.5);
            
            // Brilho
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillRect(crystalX - 2, crystalY - 2, crystalSize + 4, crystalSize * 1.5 + 4);
            this.ctx.globalAlpha = 1.0;
        }
    }

    // Gerar mapa de alta resolução para detalhes
    generateHighResolutionMap() {
        const { width, height } = this.styleConfig.dimensions.detailMap;
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Limpar canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Criar versão de alta resolução com mais detalhes
        this.drawCosmicNebula();
        this.drawDistantGalaxies();
        this.drawFloatingContinents();
        this.drawCrystalMountains();
        this.drawAncientRuins();
        this.drawCrystalNetworks();
        this.drawMagicalForests();
        this.drawFloatingIslands();
        this.drawCosmicStars();
        this.drawAuroraBorealis();
        this.drawMagicalParticles();
        
        // Adicionar detalhes extras para alta resolução
        this.drawDetailedCrystals();
        this.drawDetailedRuins();
        this.drawDetailedForests();
        
        // Salvar imagem
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedMaps.set('high-resolution-map', imageData);
        
        return imageData;
    }

    drawDetailedCrystals() {
        const { width, height } = this.styleConfig.dimensions.detailMap;
        
        // Cristais detalhados espalhados
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 8 + Math.random() * 15;
            
            // Cristal com múltiplas faces
            this.ctx.fillStyle = this.styleConfig.palette.crystal;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y - size);
            this.ctx.lineTo(x - size/2, y + size/2);
            this.ctx.lineTo(x + size/2, y + size/2);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Brilho interno
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.6;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y - size * 0.7);
            this.ctx.lineTo(x - size/3, y + size/3);
            this.ctx.lineTo(x + size/3, y + size/3);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
        }
    }

    drawDetailedRuins() {
        const { width, height } = this.styleConfig.dimensions.detailMap;
        
        // Ruínas detalhadas
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 40 + Math.random() * 60;
            
            // Estrutura principal
            this.ctx.fillStyle = this.styleConfig.palette.ancient;
            this.ctx.fillRect(x - size/2, y - size/2, size, size * 0.8);
            
            // Detalhes arquitetônicos
            this.ctx.fillStyle = this.styleConfig.palette.secondary;
            this.ctx.fillRect(x - size/2, y - size/2, size, size * 0.1);
            this.ctx.fillRect(x - size/2, y + size * 0.6, size, size * 0.1);
            
            // Colunas
            for (let j = 0; j < 4; j++) {
                const colX = x - size/2 + (j + 1) * size/5;
                this.ctx.fillRect(colX, y - size/2, size/10, size * 0.8);
            }
            
            // Vegetação
            this.ctx.fillStyle = this.styleConfig.palette.organic;
            for (let k = 0; k < 6; k++) {
                const vegX = x - size/2 + Math.random() * size;
                const vegY = y - size/2 + Math.random() * size * 0.8;
                this.ctx.beginPath();
                this.ctx.arc(vegX, vegY, size * 0.05, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }

    drawDetailedForests() {
        const { width, height } = this.styleConfig.dimensions.detailMap;
        
        // Florestas detalhadas
        for (let i = 0; i < 25; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 30 + Math.random() * 50;
            
            // Árvores individuais
            for (let j = 0; j < 12; j++) {
                const treeX = x + (Math.random() - 0.5) * size;
                const treeY = y + (Math.random() - 0.5) * size;
                const treeHeight = 15 + Math.random() * 30;
                const treeWidth = 5 + Math.random() * 8;
                
                // Tronco
                this.ctx.fillStyle = this.styleConfig.palette.organic;
                this.ctx.fillRect(treeX, treeY, treeWidth, treeHeight);
                
                // Copa
                this.ctx.fillStyle = this.styleConfig.palette.glow;
                this.ctx.beginPath();
                this.ctx.arc(treeX + treeWidth/2, treeY, treeWidth * 1.2, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Bioluminescência
                this.ctx.fillStyle = this.styleConfig.palette.accent;
                this.ctx.globalAlpha = 0.5;
                this.ctx.beginPath();
                this.ctx.arc(treeX + treeWidth/2, treeY, treeWidth * 0.8, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.globalAlpha = 1.0;
            }
        }
    }

    // Aplicar mapa ao jogo
    applyWorldMap() {
        const worldMapElement = document.querySelector('.world-map');
        if (worldMapElement) {
            const mapImage = this.generateDetailedWorldMap();
            worldMapElement.style.backgroundImage = `url(${mapImage})`;
            worldMapElement.style.backgroundSize = 'cover';
            worldMapElement.style.backgroundPosition = 'center';
            worldMapElement.style.backgroundRepeat = 'no-repeat';
            
            console.log('🗺️ Mapa do mundo detalhado aplicado!');
        }
    }

    // Métodos de controle
    generateAllMaps() {
        console.log('🗺️ Gerando todos os mapas...');
        
        this.generateDetailedWorldMap();
        this.generateHighResolutionMap();
        
        console.log('✅ Todos os mapas gerados!');
    }

    // Métodos de debug
    getGeneratedMaps() {
        return Array.from(this.generatedMaps.keys());
    }

    downloadMap(mapName) {
        const mapData = this.generatedMaps.get(mapName);
        if (mapData) {
            const link = document.createElement('a');
            link.download = `${mapName}.png`;
            link.href = mapData;
            link.click();
        }
    }
}

// Sistema global de geração avançada de mapas
window.advancedWorldMapGenerator = new AdvancedWorldMapGenerator();

// Funções de controle global
window.generateAdvancedWorldMap = function() {
    window.advancedWorldMapGenerator.generateAllMaps();
};

window.applyAdvancedWorldMap = function() {
    window.advancedWorldMapGenerator.applyWorldMap();
};

window.downloadWorldMap = function(mapName) {
    window.advancedWorldMapGenerator.downloadMap(mapName);
};

window.debugWorldMaps = function() {
    console.log('🗺️ Mapas gerados:', window.advancedWorldMapGenerator.getGeneratedMaps());
};

console.log('🗺️ Gerador Avançado de Mapa do Mundo carregado!');
