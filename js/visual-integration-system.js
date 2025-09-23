// Sistema de Integração Visual - Coordena todos os elementos visuais
// Aplica backgrounds, interfaces e elementos de UI de forma integrada

class VisualIntegrationSystem {
    constructor() {
        this.isInitialized = false;
        this.appliedElements = new Set();
        
        // Configurações de integração
        this.integrationConfig = {
            screens: {
                'world-map': {
                    background: 'world-map-bg',
                    elements: ['crystal-networks', 'floating-islands', 'cosmic-stars']
                },
                'hero-select': {
                    background: 'hero-select-bg',
                    elements: ['sacred-crystals', 'hero-pedestals', 'ethereal-mist']
                },
                'inventory': {
                    background: 'inventory-bg',
                    elements: ['inventory-slots', 'crystal-decorations']
                },
                'mission': {
                    background: 'mission-bg',
                    elements: ['mission-portals', 'tactical-displays']
                }
            },
            autoApply: true,
            delay: 2000
        };
        
        this.init();
    }

    init() {
        console.log('🎨 Sistema de Integração Visual inicializado');
        
        // Aguardar outros sistemas estarem prontos
        this.waitForSystems().then(() => {
            this.setupIntegration();
            this.isInitialized = true;
        });
    }

    async waitForSystems() {
        return new Promise((resolve) => {
            const checkSystems = () => {
                if (window.imageGeneratorSystem && 
                    window.uiElementsGenerator && 
                    window.inventoryInterfaceSystem) {
                    resolve();
                } else {
                    setTimeout(checkSystems, 100);
                }
            };
            checkSystems();
        });
    }

    setupIntegration() {
        // Configurar detecção de mudanças de tela
        this.setupScreenDetection();
        
        // Configurar aplicação automática
        if (this.integrationConfig.autoApply) {
            setTimeout(() => {
                this.applyAllVisualElements();
            }, this.integrationConfig.delay);
        }
    }

    setupScreenDetection() {
        // Observar mudanças nos elementos da tela com throttling
        let lastDetection = 0;
        const detectionThrottle = 1000; // 1 segundo entre detecções
        
        const observer = new MutationObserver((mutations) => {
            const now = Date.now();
            if (now - lastDetection < detectionThrottle) return;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    lastDetection = now;
                    this.detectAndApplyScreenElements();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    detectAndApplyScreenElements() {
        // Detectar qual tela está ativa e aplicar elementos apropriados
        const screens = Object.keys(this.integrationConfig.screens);
        
        screens.forEach(screenName => {
            const screenElement = document.querySelector(`.${screenName}`);
            if (screenElement && screenElement.style.display !== 'none') {
                // Verificar se já foi aplicado para evitar loop infinito
                const elementId = `${screenName}-applied`;
                if (!this.appliedElements.has(elementId)) {
                    this.applyScreenElements(screenName);
                    this.appliedElements.add(elementId);
                }
            }
        });
    }

    applyScreenElements(screenName) {
        const config = this.integrationConfig.screens[screenName];
        if (!config) return;

        console.log(`🎨 Aplicando elementos visuais para: ${screenName}`);

        // Aplicar background
        this.applyBackground(screenName, config.background);
        
        // Aplicar elementos decorativos
        config.elements.forEach(element => {
            this.applyDecorativeElement(screenName, element);
        });
    }

    applyBackground(screenName, backgroundName) {
        const screenElement = document.querySelector(`.${screenName}`);
        if (!screenElement) return;

        // Verificar se já foi aplicado
        const elementId = `${screenName}-${backgroundName}`;
        if (this.appliedElements.has(elementId)) return;

        // Gerar background se necessário
        if (window.imageGeneratorSystem) {
            let backgroundImage;
            
            switch (backgroundName) {
                case 'world-map-bg':
                    backgroundImage = window.imageGeneratorSystem.generateWorldMapBackground();
                    break;
                case 'hero-select-bg':
                    backgroundImage = window.imageGeneratorSystem.generateHeroSelectBackground();
                    break;
                case 'inventory-bg':
                    backgroundImage = window.imageGeneratorSystem.generateInventoryInterface();
                    break;
                case 'mission-bg':
                    backgroundImage = window.imageGeneratorSystem.generateMissionBackground();
                    break;
            }

            if (backgroundImage) {
                screenElement.style.backgroundImage = `url(${backgroundImage})`;
                screenElement.style.backgroundSize = 'cover';
                screenElement.style.backgroundPosition = 'center';
                screenElement.style.backgroundRepeat = 'no-repeat';
                
                this.appliedElements.add(elementId);
                console.log(`✅ Background aplicado: ${backgroundName}`);
            }
        }
    }

    applyDecorativeElement(screenName, elementName) {
        const screenElement = document.querySelector(`.${screenName}`);
        if (!screenElement) return;

        // Verificar se já foi aplicado
        const elementId = `${screenName}-${elementName}`;
        if (this.appliedElements.has(elementId)) return;

        // Criar elemento decorativo
        const decorativeElement = this.createDecorativeElement(elementName);
        if (decorativeElement) {
            screenElement.appendChild(decorativeElement);
            this.appliedElements.add(elementId);
            console.log(`✅ Elemento decorativo aplicado: ${elementName}`);
        }
    }

    createDecorativeElement(elementName) {
        const element = document.createElement('div');
        element.className = `decorative-${elementName}`;
        
        switch (elementName) {
            case 'crystal-networks':
                return this.createCrystalNetworks(element);
            case 'floating-islands':
                return this.createFloatingIslands(element);
            case 'cosmic-stars':
                return this.createCosmicStars(element);
            case 'sacred-crystals':
                return this.createSacredCrystals(element);
            case 'hero-pedestals':
                return this.createHeroPedestals(element);
            case 'ethereal-mist':
                return this.createEtherealMist(element);
            case 'inventory-slots':
                return this.createInventorySlots(element);
            case 'crystal-decorations':
                return this.createCrystalDecorations(element);
            case 'mission-portals':
                return this.createMissionPortals(element);
            case 'tactical-displays':
                return this.createTacticalDisplays(element);
            default:
                return null;
        }
    }

    createCrystalNetworks(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Adicionar linhas de cristais
        for (let i = 0; i < 5; i++) {
            const line = document.createElement('div');
            line.style.cssText = `
                position: absolute;
                width: 2px;
                height: 100px;
                background: linear-gradient(180deg, #4ecdc4, #00d4ff);
                top: ${Math.random() * 80}%;
                left: ${Math.random() * 100}%;
                animation: crystalPulse 3s infinite;
                box-shadow: 0 0 10px #00d4ff;
            `;
            element.appendChild(line);
        }
        
        return element;
    }

    createFloatingIslands(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        
        // Adicionar ilhas flutuantes
        for (let i = 0; i < 3; i++) {
            const island = document.createElement('div');
            island.style.cssText = `
                position: absolute;
                width: 80px;
                height: 40px;
                background: linear-gradient(135deg, #16213e, #1a1a2e);
                border: 2px solid #4ecdc4;
                border-radius: 10px;
                top: ${20 + Math.random() * 60}%;
                left: ${10 + Math.random() * 80}%;
                animation: floatIsland 4s infinite ease-in-out;
                box-shadow: 0 0 15px rgba(78, 205, 196, 0.5);
            `;
            element.appendChild(island);
        }
        
        return element;
    }

    createCosmicStars(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Adicionar estrelas
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #00d4ff;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle 2s infinite;
                box-shadow: 0 0 5px #00d4ff;
            `;
            element.appendChild(star);
        }
        
        return element;
    }

    createSacredCrystals(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        
        // Adicionar cristais sagrados
        for (let i = 0; i < 4; i++) {
            const crystal = document.createElement('div');
            crystal.style.cssText = `
                position: absolute;
                width: 30px;
                height: 45px;
                background: linear-gradient(45deg, #4ecdc4, #00d4ff);
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                top: ${30 + Math.random() * 40}%;
                left: ${20 + Math.random() * 60}%;
                animation: crystalGlow 3s infinite;
                box-shadow: 0 0 20px #00d4ff;
            `;
            element.appendChild(crystal);
        }
        
        return element;
    }

    createHeroPedestals(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        
        // Adicionar pedestais
        for (let i = 0; i < 4; i++) {
            const pedestal = document.createElement('div');
            pedestal.style.cssText = `
                position: absolute;
                width: 100px;
                height: 20px;
                background: linear-gradient(90deg, #9370db, #00d4ff);
                border-radius: 10px;
                top: ${60 + i * 5}%;
                left: ${15 + i * 20}%;
                animation: pedestalGlow 2s infinite;
                box-shadow: 0 0 25px rgba(147, 112, 219, 0.6);
            `;
            element.appendChild(pedestal);
        }
        
        return element;
    }

    createEtherealMist(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Adicionar névoa etérea
        for (let i = 0; i < 3; i++) {
            const mist = document.createElement('div');
            mist.style.cssText = `
                position: absolute;
                width: 200px;
                height: 100px;
                background: radial-gradient(ellipse, rgba(0, 212, 255, 0.3), transparent);
                border-radius: 50%;
                top: ${Math.random() * 80}%;
                left: ${Math.random() * 80}%;
                animation: mistFlow 6s infinite ease-in-out;
            `;
            element.appendChild(mist);
        }
        
        return element;
    }

    createInventorySlots(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Adicionar slots de inventário
        for (let i = 0; i < 8; i++) {
            const slot = document.createElement('div');
            slot.style.cssText = `
                position: absolute;
                width: 60px;
                height: 60px;
                background: rgba(0, 0, 0, 0.3);
                border: 2px solid #4ecdc4;
                border-radius: 8px;
                top: ${20 + Math.floor(i / 4) * 80}%;
                left: ${20 + (i % 4) * 20}%;
                animation: slotGlow 4s infinite;
            `;
            element.appendChild(slot);
        }
        
        return element;
    }

    createCrystalDecorations(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
        `;
        
        // Adicionar decorações de cristal
        const positions = [
            { top: '10px', left: '10px' },
            { top: '10px', right: '10px' },
            { bottom: '10px', left: '10px' },
            { bottom: '10px', right: '10px' }
        ];
        
        positions.forEach(pos => {
            const crystal = document.createElement('div');
            crystal.style.cssText = `
                position: absolute;
                width: 20px;
                height: 30px;
                background: linear-gradient(45deg, #4ecdc4, #00d4ff);
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                ${Object.entries(pos).map(([key, value]) => `${key}: ${value}`).join('; ')};
                animation: crystalGlow 3s infinite;
                box-shadow: 0 0 15px #00d4ff;
            `;
            element.appendChild(crystal);
        });
        
        return element;
    }

    createMissionPortals(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        
        // Adicionar portais de missão
        for (let i = 0; i < 3; i++) {
            const portal = document.createElement('div');
            portal.style.cssText = `
                position: absolute;
                width: 80px;
                height: 80px;
                border: 3px solid #ff00ff;
                border-radius: 50%;
                top: ${30 + Math.random() * 40}%;
                left: ${20 + Math.random() * 60}%;
                animation: portalSpin 3s infinite linear;
                box-shadow: 0 0 30px #ff00ff;
            `;
            element.appendChild(portal);
        }
        
        return element;
    }

    createTacticalDisplays(element) {
        element.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        
        // Adicionar displays táticos
        for (let i = 0; i < 2; i++) {
            const display = document.createElement('div');
            display.style.cssText = `
                position: absolute;
                width: 120px;
                height: 80px;
                background: rgba(0, 212, 255, 0.2);
                border: 2px solid #00d4ff;
                border-radius: 10px;
                top: ${40 + i * 30}%;
                left: ${30 + i * 40}%;
                animation: displayPulse 2s infinite;
                box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
            `;
            element.appendChild(display);
        }
        
        return element;
    }

    // Método principal para aplicar todos os elementos visuais
    applyAllVisualElements() {
        console.log('🎨 Aplicando todos os elementos visuais...');
        
        // Aplicar backgrounds
        this.applyAllBackgrounds();
        
        // Aplicar elementos de UI
        this.applyAllUIElements();
        
        // Aplicar decorações
        this.applyAllDecorations();
        
        console.log('✅ Todos os elementos visuais aplicados!');
    }

    applyAllBackgrounds() {
        if (window.imageGeneratorSystem) {
            // Gerar todos os backgrounds
            window.imageGeneratorSystem.generateAllImages();
            
            // Aplicar backgrounds específicos
            this.applyBackground('world-map', 'world-map-bg');
            this.applyBackground('hero-select', 'hero-select-bg');
            this.applyBackground('inventory', 'inventory-bg');
        }
    }

    applyAllUIElements() {
        if (window.uiElementsGenerator) {
            // Gerar todos os elementos de UI
            window.uiElementsGenerator.generateAllElements();
            
            // Aplicar elementos de UI
            window.uiElementsGenerator.applyGeneratedElements();
        }
    }

    applyAllDecorations() {
        // Aplicar decorações para cada tela
        Object.keys(this.integrationConfig.screens).forEach(screenName => {
            const config = this.integrationConfig.screens[screenName];
            config.elements.forEach(element => {
                this.applyDecorativeElement(screenName, element);
            });
        });
    }

    // Métodos de controle
    refreshVisualElements() {
        this.appliedElements.clear();
        this.applyAllVisualElements();
    }

    // Métodos de debug
    getAppliedElements() {
        return Array.from(this.appliedElements);
    }

    getIntegrationInfo() {
        return {
            isInitialized: this.isInitialized,
            appliedElementsCount: this.appliedElements.size,
            appliedElements: this.getAppliedElements(),
            screens: Object.keys(this.integrationConfig.screens)
        };
    }
}

// Sistema global de integração visual
window.visualIntegrationSystem = new VisualIntegrationSystem();

// Funções de controle global
window.applyAllVisualElements = function() {
    window.visualIntegrationSystem.applyAllVisualElements();
};

window.refreshVisualElements = function() {
    window.visualIntegrationSystem.refreshVisualElements();
};

window.debugVisualIntegration = function() {
    console.log('🎨 Debug da Integração Visual:', window.visualIntegrationSystem.getIntegrationInfo());
};

// Adicionar CSS para animações
const visualIntegrationStyle = document.createElement('style');
visualIntegrationStyle.textContent = `
    @keyframes crystalPulse {
        0%, 100% { opacity: 0.7; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
    }
    
    @keyframes floatIsland {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }
    
    @keyframes crystalGlow {
        0%, 100% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.05); }
    }
    
    @keyframes pedestalGlow {
        0%, 100% { box-shadow: 0 0 25px rgba(147, 112, 219, 0.6); }
        50% { box-shadow: 0 0 35px rgba(147, 112, 219, 0.8); }
    }
    
    @keyframes mistFlow {
        0%, 100% { transform: translateX(0px) translateY(0px); opacity: 0.3; }
        50% { transform: translateX(20px) translateY(-10px); opacity: 0.6; }
    }
    
    @keyframes slotGlow {
        0%, 100% { border-color: #4ecdc4; }
        50% { border-color: #00d4ff; }
    }
    
    @keyframes portalSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes displayPulse {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.4; }
    }
`;
document.head.appendChild(visualIntegrationStyle);

console.log('🎨 Sistema de Integração Visual carregado!');
