// Gerador de Elementos de UI - Baseado no Manual de Estilo Visual
// Cria botões, ícones e elementos de interface seguindo a estética do jogo

class UIElementsGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.generatedElements = new Map();
        
        // Configurações baseadas no manual de estilo visual
        this.styleConfig = {
            palette: {
                primary: '#1a1a2e',
                secondary: '#16213e',
                accent: '#00d4ff',
                highlight: '#ff00ff',
                glow: '#9370db',
                crystal: '#4ecdc4',
                organic: '#2d5016'
            },
            dimensions: {
                button: { width: 200, height: 60 },
                icon: { width: 64, height: 64 },
                card: { width: 300, height: 200 }
            }
        };
        
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        console.log('🎨 Gerador de Elementos de UI inicializado');
    }

    // Gerar botão com estilo do jogo
    generateButton(text, type = 'primary', size = 'medium') {
        const dimensions = this.getButtonDimensions(size);
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
        
        this.ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        
        // Desenhar botão baseado no tipo
        switch (type) {
            case 'primary':
                this.drawPrimaryButton(text, dimensions);
                break;
            case 'secondary':
                this.drawSecondaryButton(text, dimensions);
                break;
            case 'danger':
                this.drawDangerButton(text, dimensions);
                break;
            case 'success':
                this.drawSuccessButton(text, dimensions);
                break;
            case 'crystal':
                this.drawCrystalButton(text, dimensions);
                break;
            default:
                this.drawPrimaryButton(text, dimensions);
        }
        
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedElements.set(`button-${type}-${text}`, imageData);
        
        return imageData;
    }

    getButtonDimensions(size) {
        const baseDimensions = this.styleConfig.dimensions.button;
        switch (size) {
            case 'small':
                return { width: baseDimensions.width * 0.7, height: baseDimensions.height * 0.7 };
            case 'large':
                return { width: baseDimensions.width * 1.3, height: baseDimensions.height * 1.3 };
            default:
                return baseDimensions;
        }
    }

    drawPrimaryButton(text, dimensions) {
        // Fundo com gradiente
        const gradient = this.ctx.createLinearGradient(0, 0, 0, dimensions.height);
        gradient.addColorStop(0, this.styleConfig.palette.crystal);
        gradient.addColorStop(1, this.styleConfig.palette.accent);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        
        // Borda brilhante
        this.ctx.strokeStyle = this.styleConfig.palette.glow;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
        
        // Texto
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = `bold ${dimensions.height * 0.25}px Inter`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, dimensions.width / 2, dimensions.height / 2);
        
        // Brilho interno
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillRect(3, 3, dimensions.width - 6, dimensions.height - 6);
        this.ctx.globalAlpha = 1.0;
    }

    drawSecondaryButton(text, dimensions) {
        // Fundo transparente
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        
        // Borda
        this.ctx.strokeStyle = this.styleConfig.palette.glow;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
        
        // Texto
        this.ctx.fillStyle = this.styleConfig.palette.glow;
        this.ctx.font = `bold ${dimensions.height * 0.25}px Inter`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, dimensions.width / 2, dimensions.height / 2);
    }

    drawDangerButton(text, dimensions) {
        // Fundo vermelho
        const gradient = this.ctx.createLinearGradient(0, 0, 0, dimensions.height);
        gradient.addColorStop(0, '#FF6B6B');
        gradient.addColorStop(1, '#FF4757');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        
        // Borda
        this.ctx.strokeStyle = '#FF3838';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
        
        // Texto
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = `bold ${dimensions.height * 0.25}px Inter`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, dimensions.width / 2, dimensions.height / 2);
    }

    drawSuccessButton(text, dimensions) {
        // Fundo verde
        const gradient = this.ctx.createLinearGradient(0, 0, 0, dimensions.height);
        gradient.addColorStop(0, '#2ED573');
        gradient.addColorStop(1, '#1DD1A1');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        
        // Borda
        this.ctx.strokeStyle = '#00B894';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
        
        // Texto
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = `bold ${dimensions.height * 0.25}px Inter`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, dimensions.width / 2, dimensions.height / 2);
    }

    drawCrystalButton(text, dimensions) {
        // Fundo cristalino
        const gradient = this.ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
        gradient.addColorStop(0, this.styleConfig.palette.crystal);
        gradient.addColorStop(0.5, this.styleConfig.palette.accent);
        gradient.addColorStop(1, this.styleConfig.palette.highlight);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        
        // Borda brilhante
        this.ctx.strokeStyle = this.styleConfig.palette.accent;
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
        
        // Texto
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = `bold ${dimensions.height * 0.25}px Inter`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, dimensions.width / 2, dimensions.height / 2);
        
        // Efeito de brilho
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillRect(5, 5, dimensions.width - 10, dimensions.height - 10);
        this.ctx.globalAlpha = 1.0;
    }

    // Gerar ícones de interface
    generateIcon(iconType, size = 'medium') {
        const dimensions = this.getIconDimensions(size);
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
        
        this.ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        
        // Desenhar ícone baseado no tipo
        switch (iconType) {
            case 'inventory':
                this.drawInventoryIcon(dimensions);
                break;
            case 'map':
                this.drawMapIcon(dimensions);
                break;
            case 'character':
                this.drawCharacterIcon(dimensions);
                break;
            case 'mission':
                this.drawMissionIcon(dimensions);
                break;
            case 'settings':
                this.drawSettingsIcon(dimensions);
                break;
            case 'crystal':
                this.drawCrystalIcon(dimensions);
                break;
            default:
                this.drawDefaultIcon(dimensions);
        }
        
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedElements.set(`icon-${iconType}`, imageData);
        
        return imageData;
    }

    getIconDimensions(size) {
        const baseDimensions = this.styleConfig.dimensions.icon;
        switch (size) {
            case 'small':
                return { width: baseDimensions.width * 0.5, height: baseDimensions.height * 0.5 };
            case 'large':
                return { width: baseDimensions.width * 1.5, height: baseDimensions.height * 1.5 };
            default:
                return baseDimensions;
        }
    }

    drawInventoryIcon(dimensions) {
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const size = Math.min(dimensions.width, dimensions.height) * 0.6;
        
        // Bolsa
        this.ctx.fillStyle = this.styleConfig.palette.glow;
        this.ctx.fillRect(centerX - size/2, centerY - size/2, size, size * 0.8);
        
        // Alça
        this.ctx.strokeStyle = this.styleConfig.palette.glow;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY - size/2 - 10, 8, 0, Math.PI);
        this.ctx.stroke();
        
        // Brilho
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.globalAlpha = 0.6;
        this.ctx.fillRect(centerX - size/2 + 5, centerY - size/2 + 5, size - 10, size * 0.8 - 10);
        this.ctx.globalAlpha = 1.0;
    }

    drawMapIcon(dimensions) {
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const size = Math.min(dimensions.width, dimensions.height) * 0.6;
        
        // Mapa
        this.ctx.fillStyle = this.styleConfig.palette.secondary;
        this.ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
        
        // Cristais no mapa
        this.ctx.fillStyle = this.styleConfig.palette.crystal;
        this.ctx.fillRect(centerX - size/4, centerY - size/4, size/8, size/8);
        this.ctx.fillRect(centerX + size/8, centerY + size/8, size/8, size/8);
        
        // Borda
        this.ctx.strokeStyle = this.styleConfig.palette.accent;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(centerX - size/2, centerY - size/2, size, size);
    }

    drawCharacterIcon(dimensions) {
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const size = Math.min(dimensions.width, dimensions.height) * 0.6;
        
        // Cabeça
        this.ctx.fillStyle = this.styleConfig.palette.glow;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY - size/4, size/4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Corpo
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.fillRect(centerX - size/6, centerY, size/3, size/2);
        
        // Brilho
        this.ctx.fillStyle = this.styleConfig.palette.highlight;
        this.ctx.globalAlpha = 0.7;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY - size/4, size/6, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalAlpha = 1.0;
    }

    drawMissionIcon(dimensions) {
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const size = Math.min(dimensions.width, dimensions.height) * 0.6;
        
        // Alvo
        this.ctx.strokeStyle = this.styleConfig.palette.highlight;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size/3, 0, Math.PI * 2);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size/6, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Centro
        this.ctx.fillStyle = this.styleConfig.palette.highlight;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size/12, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawSettingsIcon(dimensions) {
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const size = Math.min(dimensions.width, dimensions.height) * 0.6;
        
        // Engrenagem
        this.ctx.strokeStyle = this.styleConfig.palette.crystal;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size/3, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Centro
        this.ctx.fillStyle = this.styleConfig.palette.crystal;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size/8, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawCrystalIcon(dimensions) {
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const size = Math.min(dimensions.width, dimensions.height) * 0.6;
        
        // Cristal
        this.ctx.fillStyle = this.styleConfig.palette.crystal;
        this.ctx.fillRect(centerX - size/4, centerY - size/2, size/2, size);
        
        // Brilho
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillRect(centerX - size/4 - 2, centerY - size/2 - 2, size/2 + 4, size + 4);
        this.ctx.globalAlpha = 1.0;
    }

    drawDefaultIcon(dimensions) {
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const size = Math.min(dimensions.width, dimensions.height) * 0.6;
        
        // Círculo simples
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size/2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Borda
        this.ctx.strokeStyle = this.styleConfig.palette.glow;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }

    // Gerar card de interface
    generateCard(title, description, type = 'default') {
        const dimensions = this.styleConfig.dimensions.card;
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
        
        this.ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        
        // Fundo do card
        const gradient = this.ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
        gradient.addColorStop(0, this.styleConfig.palette.primary);
        gradient.addColorStop(1, this.styleConfig.palette.secondary);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        
        // Borda
        this.ctx.strokeStyle = this.styleConfig.palette.crystal;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, dimensions.width, dimensions.height);
        
        // Título
        this.ctx.fillStyle = this.styleConfig.palette.accent;
        this.ctx.font = 'bold 18px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(title, dimensions.width / 2, 30);
        
        // Descrição
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.font = '14px Inter';
        this.ctx.fillText(description, dimensions.width / 2, 60);
        
        // Decoração baseada no tipo
        this.drawCardDecoration(type, dimensions);
        
        const imageData = this.canvas.toDataURL('image/png');
        this.generatedElements.set(`card-${type}-${title}`, imageData);
        
        return imageData;
    }

    drawCardDecoration(type, dimensions) {
        switch (type) {
            case 'crystal':
                // Cristais nos cantos
                this.ctx.fillStyle = this.styleConfig.palette.crystal;
                this.ctx.fillRect(10, 10, 15, 20);
                this.ctx.fillRect(dimensions.width - 25, dimensions.height - 30, 15, 20);
                break;
            case 'magic':
                // Runas mágicas
                this.ctx.strokeStyle = this.styleConfig.palette.glow;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(dimensions.width / 2, dimensions.height - 30, 20, 0, Math.PI * 2);
                this.ctx.stroke();
                break;
            default:
                // Decoração padrão
                this.ctx.fillStyle = this.styleConfig.palette.accent;
                this.ctx.globalAlpha = 0.3;
                this.ctx.fillRect(10, dimensions.height - 20, dimensions.width - 20, 10);
                this.ctx.globalAlpha = 1.0;
        }
    }

    // Aplicar elementos gerados ao jogo
    applyGeneratedElements() {
        // Aplicar botões gerados
        this.applyGeneratedButtons();
        
        // Aplicar ícones gerados
        this.applyGeneratedIcons();
        
        console.log('🎨 Elementos de UI aplicados ao jogo');
    }

    applyGeneratedButtons() {
        const buttonTypes = [
            { type: 'primary', text: 'Continuar' },
            { type: 'secondary', text: 'Voltar' },
            { type: 'danger', text: 'Sair' },
            { type: 'success', text: 'Confirmar' },
            { type: 'crystal', text: 'Mágico' }
        ];

        buttonTypes.forEach(button => {
            const imageData = this.generateButton(button.text, button.type);
            
            // Aplicar aos botões existentes
            const buttons = document.querySelectorAll(`button[data-type="${button.type}"], .${button.type}-button`);
            buttons.forEach(btn => {
                btn.style.backgroundImage = `url(${imageData})`;
                btn.style.backgroundSize = 'cover';
                btn.style.backgroundPosition = 'center';
                btn.style.border = 'none';
                btn.style.color = 'white';
                btn.style.fontWeight = 'bold';
            });
        });
    }

    applyGeneratedIcons() {
        const iconTypes = ['inventory', 'map', 'character', 'mission', 'settings', 'crystal'];
        
        iconTypes.forEach(iconType => {
            const imageData = this.generateIcon(iconType);
            
            // Aplicar aos ícones existentes
            const icons = document.querySelectorAll(`.${iconType}-icon, [data-icon="${iconType}"]`);
            icons.forEach(icon => {
                icon.style.backgroundImage = `url(${imageData})`;
                icon.style.backgroundSize = 'contain';
                icon.style.backgroundRepeat = 'no-repeat';
                icon.style.backgroundPosition = 'center';
            });
        });
    }

    // Métodos de controle
    generateAllElements() {
        console.log('🎨 Gerando todos os elementos de UI...');
        
        // Gerar botões
        this.generateButton('Continuar', 'primary');
        this.generateButton('Voltar', 'secondary');
        this.generateButton('Sair', 'danger');
        this.generateButton('Confirmar', 'success');
        this.generateButton('Mágico', 'crystal');
        
        // Gerar ícones
        this.generateIcon('inventory');
        this.generateIcon('map');
        this.generateIcon('character');
        this.generateIcon('mission');
        this.generateIcon('settings');
        this.generateIcon('crystal');
        
        // Gerar cards
        this.generateCard('Inventário', 'Gerencie seus itens', 'crystal');
        this.generateCard('Mapa', 'Explore o mundo', 'magic');
        this.generateCard('Personagens', 'Escolha seu herói', 'default');
        
        console.log('✅ Todos os elementos de UI gerados!');
    }

    // Métodos de debug
    getGeneratedElements() {
        return Array.from(this.generatedElements.keys());
    }

    downloadElement(elementName) {
        const elementData = this.generatedElements.get(elementName);
        if (elementData) {
            const link = document.createElement('a');
            link.download = `${elementName}.png`;
            link.href = elementData;
            link.click();
        }
    }
}

// Sistema global de geração de elementos de UI
window.uiElementsGenerator = new UIElementsGenerator();

// Funções de controle global
window.generateAllUIElements = function() {
    window.uiElementsGenerator.generateAllElements();
};

window.applyGeneratedUIElements = function() {
    window.uiElementsGenerator.applyGeneratedElements();
};

window.downloadUIElement = function(elementName) {
    window.uiElementsGenerator.downloadElement(elementName);
};

window.debugUIElements = function() {
    console.log('🎨 Elementos de UI gerados:', window.uiElementsGenerator.getGeneratedElements());
};

console.log('🎨 Gerador de Elementos de UI carregado!');
