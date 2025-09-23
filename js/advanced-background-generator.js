// Gerador Avançado de Backgrounds - Ilustrações Artísticas Detalhadas
// Cria backgrounds elaborados para todas as telas seguindo o manual de estilo visual

class AdvancedBackgroundGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.generatedBackgrounds = new Map();
        
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
                cosmic: '#4B0082',      // Índigo para elementos cósmicos
                gold: '#FFD700',        // Dourado para elementos sagrados
                silver: '#C0C0C0'      // Prata para elementos mágicos
            },
            dimensions: {
                heroSelect: { width: 1920, height: 1080 },
                inventory: { width: 1920, height: 1080 },
                mission: { width: 1920, height: 1080 },
                main: { width: 1920, height: 1080 }
            }
        };
        
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        console.log('🎨 Gerador Avançado de Backgrounds inicializado');
    }

    // Gerar background para seleção de heróis - Santuário Sagrado
    generateHeroSelectBackground() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        this.canvas.width = width;
        this.canvas.height = height;
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Criar santuário sagrado em camadas
        this.drawSacredSky();
        this.drawSacredMountains();
        this.drawSacredTemple();
        this.drawHeroPedestals();
        this.drawSacredCrystals();
        this.drawEtherealMist();
        this.drawSacredRunes();
        this.drawDivineLight();
        this.drawSacredParticles();
        
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedBackgrounds.set('hero-select-detailed', imageData);
        
        return imageData;
    }

    drawSacredSky() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        
        // Céu sagrado com gradiente cósmico
        const skyGradient = this.ctx.createLinearGradient(0, 0, 0, height);
        skyGradient.addColorStop(0, this.styleConfig.palette.cosmic);
        skyGradient.addColorStop(0.3, this.styleConfig.palette.primary);
        skyGradient.addColorStop(0.7, this.styleConfig.palette.secondary);
        skyGradient.addColorStop(1, '#000000');
        
        this.ctx.fillStyle = skyGradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Nebulosa sagrada
        const nebulaGradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
        nebulaGradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
        nebulaGradient.addColorStop(0.5, 'rgba(147, 112, 219, 0.2)');
        nebulaGradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = nebulaGradient;
        this.ctx.fillRect(0, 0, width, height);
    }

    drawSacredMountains() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        
        // Montanhas sagradas ao fundo
        for (let i = 0; i < 8; i++) {
            const mountainX = (width / 8) * i;
            const mountainY = height * 0.6;
            const mountainHeight = 200 + Math.random() * 150;
            const mountainWidth = width / 8 + 50;
            
            this.drawSacredMountain(mountainX, mountainY, mountainWidth, mountainHeight);
        }
    }

    drawSacredMountain(x, y, width, height) {
        // Forma da montanha
        this.ctx.fillStyle = this.styleConfig.palette.secondary;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        
        // Picos da montanha
        const peaks = 5;
        for (let i = 0; i <= peaks; i++) {
            const px = x + (width / peaks) * i;
            const py = y - height + Math.random() * 50;
            this.ctx.lineTo(px, py);
        }
        
        this.ctx.lineTo(x + width, y);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Cristais sagrados na montanha
        for (let i = 0; i < 3; i++) {
            const crystalX = x + Math.random() * width;
            const crystalY = y - height + Math.random() * height;
            const crystalSize = 20 + Math.random() * 30;
            
            this.drawSacredCrystal(crystalX, crystalY, crystalSize);
        }
    }

    drawSacredCrystal(x, y, size) {
        // Cristal sagrado com múltiplas faces
        this.ctx.fillStyle = this.styleConfig.palette.gold;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x - size/2, y + size/2);
        this.ctx.lineTo(x + size/2, y + size/2);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Brilho interno
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.globalAlpha = 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size * 0.7);
        this.ctx.lineTo(x - size/3, y + size/3);
        this.ctx.lineTo(x + size/3, y + size/3);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.globalAlpha = 1.0;
        
        // Aura sagrada
        this.ctx.strokeStyle = this.styleConfig.palette.gold;
        this.ctx.lineWidth = 2;
        this.ctx.shadowColor = this.styleConfig.palette.gold;
        this.ctx.shadowBlur = 15;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }

    drawSacredTemple() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        
        // Templo sagrado central
        const templeX = width * 0.3;
        const templeY = height * 0.4;
        const templeWidth = width * 0.4;
        const templeHeight = height * 0.4;
        
        // Base do templo
        this.ctx.fillStyle = this.styleConfig.palette.ancient;
        this.ctx.fillRect(templeX, templeY, templeWidth, templeHeight);
        
        // Colunas do templo
        this.ctx.fillStyle = this.styleConfig.palette.silver;
        const columnCount = 8;
        for (let i = 0; i < columnCount; i++) {
            const colX = templeX + (templeWidth / columnCount) * i + templeWidth / (columnCount * 2);
            const colY = templeY;
            const colWidth = templeWidth / (columnCount * 4);
            const colHeight = templeHeight;
            
            this.ctx.fillRect(colX, colY, colWidth, colHeight);
        }
        
        // Teto do templo
        this.ctx.fillStyle = this.styleConfig.palette.gold;
        this.ctx.fillRect(templeX - 20, templeY - 30, templeWidth + 40, 30);
        
        // Altar central
        this.ctx.fillStyle = this.styleConfig.palette.crystal;
        this.ctx.fillRect(templeX + templeWidth/2 - 30, templeY + templeHeight/2 - 20, 60, 40);
        
        // Brilho do altar
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.globalAlpha = 0.6;
        this.ctx.fillRect(templeX + templeWidth/2 - 35, templeY + templeHeight/2 - 25, 70, 50);
        this.ctx.globalAlpha = 1.0;
    }

    drawHeroPedestals() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        
        // Pedestais para os heróis
        const pedestalCount = 4;
        for (let i = 0; i < pedestalCount; i++) {
            const pedestalX = width * 0.2 + (width * 0.6 / pedestalCount) * i;
            const pedestalY = height * 0.7;
            const pedestalWidth = 80;
            const pedestalHeight = 20;
            
            // Pedestal
            this.ctx.fillStyle = this.styleConfig.palette.gold;
            this.ctx.fillRect(pedestalX, pedestalY, pedestalWidth, pedestalHeight);
            
            // Brilho do pedestal
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillRect(pedestalX - 5, pedestalY - 5, pedestalWidth + 10, pedestalHeight + 10);
            this.ctx.globalAlpha = 1.0;
            
            // Coluna do pedestal
            this.ctx.fillStyle = this.styleConfig.palette.silver;
            this.ctx.fillRect(pedestalX + pedestalWidth/2 - 10, pedestalY - 60, 20, 60);
            
            // Cristal no topo
            this.drawSacredCrystal(pedestalX + pedestalWidth/2, pedestalY - 70, 15);
        }
    }

    drawSacredCrystals() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        
        // Cristais sagrados espalhados
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 15 + Math.random() * 25;
            
            this.drawSacredCrystal(x, y, size);
        }
    }

    drawEtherealMist() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        
        // Névoa etérea sagrada
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 100 + Math.random() * 150;
            
            const mistGradient = this.ctx.createRadialGradient(x, y, 0, x, y, size);
            mistGradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
            mistGradient.addColorStop(0.5, 'rgba(147, 112, 219, 0.2)');
            mistGradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = mistGradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawSacredRunes() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        
        // Runas sagradas flutuantes
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 20 + Math.random() * 30;
            
            this.ctx.strokeStyle = this.styleConfig.palette.gold;
            this.ctx.lineWidth = 3;
            this.ctx.shadowColor = this.styleConfig.palette.gold;
            this.ctx.shadowBlur = 10;
            
            // Desenhar runa circular
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Símbolos internos
            this.ctx.beginPath();
            this.ctx.moveTo(x - size/2, y);
            this.ctx.lineTo(x + size/2, y);
            this.ctx.moveTo(x, y - size/2);
            this.ctx.lineTo(x, y + size/2);
            this.ctx.stroke();
            
            this.ctx.shadowBlur = 0;
        }
    }

    drawDivineLight() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        
        // Luz divina vinda do céu
        const lightGradient = this.ctx.createLinearGradient(width/2, 0, width/2, height);
        lightGradient.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
        lightGradient.addColorStop(0.3, 'rgba(255, 215, 0, 0.2)');
        lightGradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = lightGradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Raios de luz
        this.ctx.strokeStyle = this.styleConfig.palette.gold;
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.6;
        
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            const startX = width/2 + Math.cos(angle) * 50;
            const startY = height * 0.2;
            const endX = width/2 + Math.cos(angle) * 200;
            const endY = height * 0.8;
            
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
        }
        this.ctx.globalAlpha = 1.0;
    }

    drawSacredParticles() {
        const { width, height } = this.styleConfig.dimensions.heroSelect;
        
        // Partículas sagradas
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 1 + Math.random() * 3;
            const color = Math.random() > 0.5 ? this.styleConfig.palette.gold : this.styleConfig.palette.accent;
            
            this.ctx.fillStyle = color;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = size * 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.shadowBlur = 0;
    }

    // Gerar background para inventário - Câmara dos Tesouros
    generateInventoryBackground() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        this.canvas.width = width;
        this.canvas.height = height;
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Criar câmara dos tesouros
        this.drawTreasureChamber();
        this.drawTreasureChests();
        this.drawMagicalArtifacts();
        this.drawCrystalShelves();
        this.drawMagicalLighting();
        this.drawFloatingItems();
        this.drawTreasureParticles();
        
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedBackgrounds.set('inventory-detailed', imageData);
        
        return imageData;
    }

    drawTreasureChamber() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        
        // Câmara subterrânea
        const chamberGradient = this.ctx.createLinearGradient(0, 0, 0, height);
        chamberGradient.addColorStop(0, this.styleConfig.palette.primary);
        chamberGradient.addColorStop(0.5, this.styleConfig.palette.secondary);
        chamberGradient.addColorStop(1, '#000000');
        
        this.ctx.fillStyle = chamberGradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Paredes da câmara
        this.ctx.fillStyle = this.styleConfig.palette.ancient;
        this.ctx.fillRect(0, 0, 50, height);
        this.ctx.fillRect(width - 50, 0, 50, height);
        this.ctx.fillRect(0, height - 100, width, 100);
        
        // Teto da câmara
        this.ctx.fillStyle = this.styleConfig.palette.secondary;
        this.ctx.fillRect(0, 0, width, 100);
        
        // Colunas de suporte
        for (let i = 0; i < 6; i++) {
            const colX = 100 + (width - 200) / 5 * i;
            const colY = 100;
            const colWidth = 30;
            const colHeight = height - 200;
            
            this.ctx.fillStyle = this.styleConfig.palette.silver;
            this.ctx.fillRect(colX, colY, colWidth, colHeight);
            
            // Capitéis das colunas
            this.ctx.fillStyle = this.styleConfig.palette.gold;
            this.ctx.fillRect(colX - 5, colY, colWidth + 10, 20);
        }
    }

    drawTreasureChests() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        
        // Baús de tesouro
        for (let i = 0; i < 8; i++) {
            const chestX = 150 + (width - 300) / 7 * i;
            const chestY = height - 150;
            const chestWidth = 80;
            const chestHeight = 60;
            
            // Baú
            this.ctx.fillStyle = this.styleConfig.palette.ancient;
            this.ctx.fillRect(chestX, chestY, chestWidth, chestHeight);
            
            // Detalhes do baú
            this.ctx.fillStyle = this.styleConfig.palette.gold;
            this.ctx.fillRect(chestX + 10, chestY + 10, chestWidth - 20, 10);
            this.ctx.fillRect(chestX + 10, chestY + 30, chestWidth - 20, 10);
            
            // Fechadura
            this.ctx.fillStyle = this.styleConfig.palette.silver;
            this.ctx.fillRect(chestX + chestWidth/2 - 5, chestY + 20, 10, 15);
            
            // Brilho do baú
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillRect(chestX - 5, chestY - 5, chestWidth + 10, chestHeight + 10);
            this.ctx.globalAlpha = 1.0;
        }
    }

    drawMagicalArtifacts() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        
        // Artefatos mágicos nas paredes
        for (let i = 0; i < 12; i++) {
            const x = i % 2 === 0 ? 25 : width - 75;
            const y = 200 + (height - 400) / 11 * i;
            const size = 20 + Math.random() * 20;
            
            // Artefato
            this.ctx.fillStyle = this.styleConfig.palette.crystal;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Brilho
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.8;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
        }
    }

    drawCrystalShelves() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        
        // Prateleiras de cristal
        for (let i = 0; i < 4; i++) {
            const shelfY = 200 + i * 150;
            const shelfHeight = 10;
            
            // Prateleira
            this.ctx.fillStyle = this.styleConfig.palette.crystal;
            this.ctx.fillRect(100, shelfY, width - 200, shelfHeight);
            
            // Brilho da prateleira
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.6;
            this.ctx.fillRect(100, shelfY - 2, width - 200, shelfHeight + 4);
            this.ctx.globalAlpha = 1.0;
            
            // Itens na prateleira
            for (let j = 0; j < 8; j++) {
                const itemX = 120 + j * 100;
                const itemY = shelfY - 15;
                const itemSize = 15;
                
                this.ctx.fillStyle = this.styleConfig.palette.glow;
                this.ctx.fillRect(itemX, itemY, itemSize, itemSize);
            }
        }
    }

    drawMagicalLighting() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        
        // Iluminação mágica
        for (let i = 0; i < 6; i++) {
            const x = 100 + (width - 200) / 5 * i;
            const y = 50;
            const lightSize = 80;
            
            const lightGradient = this.ctx.createRadialGradient(x, y, 0, x, y, lightSize);
            lightGradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
            lightGradient.addColorStop(0.5, 'rgba(147, 112, 219, 0.2)');
            lightGradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = lightGradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, lightSize, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawFloatingItems() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        
        // Itens flutuantes
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 10 + Math.random() * 20;
            
            this.ctx.fillStyle = this.styleConfig.palette.highlight;
            this.ctx.shadowColor = this.styleConfig.palette.highlight;
            this.ctx.shadowBlur = 15;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.shadowBlur = 0;
    }

    drawTreasureParticles() {
        const { width, height } = this.styleConfig.dimensions.inventory;
        
        // Partículas de tesouro
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 1 + Math.random() * 2;
            const color = Math.random() > 0.5 ? this.styleConfig.palette.gold : this.styleConfig.palette.accent;
            
            this.ctx.fillStyle = color;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = size * 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.shadowBlur = 0;
    }

    // Gerar background para missões - Centro de Comando
    generateMissionBackground() {
        const { width, height } = this.styleConfig.dimensions.mission;
        this.canvas.width = width;
        this.canvas.height = height;
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Criar centro de comando
        this.drawCommandCenter();
        this.drawMissionPortals();
        this.drawTacticalDisplays();
        this.drawCommandConsole();
        this.drawHolographicMaps();
        this.drawMissionParticles();
        
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedBackgrounds.set('mission-detailed', imageData);
        
        return imageData;
    }

    drawCommandCenter() {
        const { width, height } = this.styleConfig.dimensions.mission;
        
        // Centro de comando futurista
        const centerGradient = this.ctx.createLinearGradient(0, 0, 0, height);
        centerGradient.addColorStop(0, this.styleConfig.palette.primary);
        centerGradient.addColorStop(0.5, this.styleConfig.palette.secondary);
        centerGradient.addColorStop(1, '#000000');
        
        this.ctx.fillStyle = centerGradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Paredes tecnológicas
        this.ctx.fillStyle = this.styleConfig.palette.secondary;
        this.ctx.fillRect(0, 0, 80, height);
        this.ctx.fillRect(width - 80, 0, 80, height);
        
        // Painéis de controle
        for (let i = 0; i < 8; i++) {
            const panelX = 100 + (width - 200) / 7 * i;
            const panelY = 100;
            const panelWidth = 60;
            const panelHeight = height - 200;
            
            this.ctx.fillStyle = this.styleConfig.palette.crystal;
            this.ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
            
            // Luzes do painel
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            for (let j = 0; j < 10; j++) {
                const lightY = panelY + (panelHeight / 10) * j;
                this.ctx.fillRect(panelX + 10, lightY, 40, 5);
            }
        }
    }

    drawMissionPortals() {
        const { width, height } = this.styleConfig.dimensions.mission;
        
        // Portais de missão
        for (let i = 0; i < 6; i++) {
            const portalX = width * 0.2 + (width * 0.6 / 5) * i;
            const portalY = height * 0.3;
            const portalSize = 60;
            
            // Portal
            this.ctx.strokeStyle = this.styleConfig.palette.highlight;
            this.ctx.lineWidth = 4;
            this.ctx.shadowColor = this.styleConfig.palette.highlight;
            this.ctx.shadowBlur = 20;
            this.ctx.beginPath();
            this.ctx.arc(portalX, portalY, portalSize, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Centro do portal
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.6;
            this.ctx.beginPath();
            this.ctx.arc(portalX, portalY, portalSize * 0.7, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
            
            this.ctx.shadowBlur = 0;
        }
    }

    drawTacticalDisplays() {
        const { width, height } = this.styleConfig.dimensions.mission;
        
        // Displays táticos
        for (let i = 0; i < 4; i++) {
            const displayX = width * 0.1 + (width * 0.8 / 3) * i;
            const displayY = height * 0.7;
            const displayWidth = 120;
            const displayHeight = 80;
            
            // Display
            this.ctx.fillStyle = this.styleConfig.palette.secondary;
            this.ctx.fillRect(displayX, displayY, displayWidth, displayHeight);
            
            // Borda do display
            this.ctx.strokeStyle = this.styleConfig.palette.crystal;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(displayX, displayY, displayWidth, displayHeight);
            
            // Conteúdo do display
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillRect(displayX + 10, displayY + 10, displayWidth - 20, displayHeight - 20);
            this.ctx.globalAlpha = 1.0;
        }
    }

    drawCommandConsole() {
        const { width, height } = this.styleConfig.dimensions.mission;
        
        // Console de comando central
        const consoleX = width * 0.4;
        const consoleY = height * 0.8;
        const consoleWidth = width * 0.2;
        const consoleHeight = 100;
        
        // Console
        this.ctx.fillStyle = this.styleConfig.palette.ancient;
        this.ctx.fillRect(consoleX, consoleY, consoleWidth, consoleHeight);
        
        // Botões do console
        for (let i = 0; i < 8; i++) {
            const buttonX = consoleX + 20 + (consoleWidth - 40) / 7 * i;
            const buttonY = consoleY + 20;
            const buttonSize = 15;
            
            this.ctx.fillStyle = this.styleConfig.palette.crystal;
            this.ctx.fillRect(buttonX, buttonY, buttonSize, buttonSize);
            
            // Brilho do botão
            this.ctx.fillStyle = this.styleConfig.palette.accent;
            this.ctx.globalAlpha = 0.6;
            this.ctx.fillRect(buttonX + 2, buttonY + 2, buttonSize - 4, buttonSize - 4);
            this.ctx.globalAlpha = 1.0;
        }
    }

    drawHolographicMaps() {
        const { width, height } = this.styleConfig.dimensions.mission;
        
        // Mapas holográficos
        for (let i = 0; i < 3; i++) {
            const mapX = width * 0.1 + (width * 0.8 / 2) * i;
            const mapY = height * 0.1;
            const mapSize = 100;
            
            // Mapa holográfico
            this.ctx.strokeStyle = this.styleConfig.palette.accent;
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = 0.7;
            this.ctx.strokeRect(mapX, mapY, mapSize, mapSize);
            
            // Linhas do mapa
            for (let j = 0; j < 5; j++) {
                const lineY = mapY + (mapSize / 5) * j;
                this.ctx.beginPath();
                this.ctx.moveTo(mapX, lineY);
                this.ctx.lineTo(mapX + mapSize, lineY);
                this.ctx.stroke();
                
                const lineX = mapX + (mapSize / 5) * j;
                this.ctx.beginPath();
                this.ctx.moveTo(lineX, mapY);
                this.ctx.lineTo(lineX, mapY + mapSize);
                this.ctx.stroke();
            }
            this.ctx.globalAlpha = 1.0;
        }
    }

    drawMissionParticles() {
        const { width, height } = this.styleConfig.dimensions.mission;
        
        // Partículas de missão
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 1 + Math.random() * 2;
            const color = Math.random() > 0.5 ? this.styleConfig.palette.accent : this.styleConfig.palette.highlight;
            
            this.ctx.fillStyle = color;
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = size * 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.shadowBlur = 0;
    }

    // Aplicar backgrounds ao jogo
    applyAllBackgrounds() {
        console.log('🎨 Aplicando todos os backgrounds detalhados...');
        
        // Aplicar background de seleção de heróis
        const heroSelectElement = document.querySelector('.character-selection');
        if (heroSelectElement) {
            const heroBg = this.generateHeroSelectBackground();
            heroSelectElement.style.backgroundImage = `url(${heroBg})`;
            heroSelectElement.style.backgroundSize = 'cover';
            heroSelectElement.style.backgroundPosition = 'center';
        }
        
        // Aplicar background de inventário
        const inventoryElement = document.querySelector('.inventory-interface');
        if (inventoryElement) {
            const inventoryBg = this.generateInventoryBackground();
            inventoryElement.style.backgroundImage = `url(${inventoryBg})`;
            inventoryElement.style.backgroundSize = 'cover';
            inventoryElement.style.backgroundPosition = 'center';
        }
        
        // Aplicar background de missões
        const missionElement = document.querySelector('.mission-screen');
        if (missionElement) {
            const missionBg = this.generateMissionBackground();
            missionElement.style.backgroundImage = `url(${missionBg})`;
            missionElement.style.backgroundSize = 'cover';
            missionElement.style.backgroundPosition = 'center';
        }
        
        console.log('✅ Todos os backgrounds detalhados aplicados!');
    }

    // Métodos de controle
    generateAllDetailedBackgrounds() {
        console.log('🎨 Gerando todos os backgrounds detalhados...');
        
        this.generateHeroSelectBackground();
        this.generateInventoryBackground();
        this.generateMissionBackground();
        
        console.log('✅ Todos os backgrounds detalhados gerados!');
    }

    // Métodos de debug
    getGeneratedBackgrounds() {
        return Array.from(this.generatedBackgrounds.keys());
    }

    downloadBackground(backgroundName) {
        const backgroundData = this.generatedBackgrounds.get(backgroundName);
        if (backgroundData) {
            const link = document.createElement('a');
            link.download = `${backgroundName}.png`;
            link.href = backgroundData;
            link.click();
        }
    }
}

// Sistema global de geração avançada de backgrounds
window.advancedBackgroundGenerator = new AdvancedBackgroundGenerator();

// Funções de controle global
window.generateAdvancedBackgrounds = function() {
    window.advancedBackgroundGenerator.generateAllDetailedBackgrounds();
};

window.applyAdvancedBackgrounds = function() {
    window.advancedBackgroundGenerator.applyAllBackgrounds();
};

window.downloadAdvancedBackground = function(backgroundName) {
    window.advancedBackgroundGenerator.downloadBackground(backgroundName);
};

window.debugAdvancedBackgrounds = function() {
    console.log('🎨 Backgrounds detalhados gerados:', window.advancedBackgroundGenerator.getGeneratedBackgrounds());
};

console.log('🎨 Gerador Avançado de Backgrounds carregado!');
