// Gerador Mestre Visual - Coordena todos os sistemas de geração visual
// Cria ilustrações artísticas completas para todo o jogo

class MasterVisualGenerator {
    constructor() {
        this.isInitialized = false;
        this.generatedAssets = new Map();
        
        // Configurações do gerador mestre
        this.config = {
            quality: 'high', // high, medium, low
            autoApply: true,
            generateOnDemand: true,
            cacheAssets: true
        };
        
        this.init();
    }

    init() {
        console.log('🎨 Gerador Mestre Visual inicializado');
        
        // Aguardar todos os sistemas estarem prontos
        this.waitForAllSystems().then(() => {
            this.setupMasterGenerator();
            this.isInitialized = true;
        });
    }

    async waitForAllSystems() {
        return new Promise((resolve) => {
            const checkSystems = () => {
                if (window.advancedWorldMapGenerator && 
                    window.advancedBackgroundGenerator &&
                    window.imageGeneratorSystem &&
                    window.uiElementsGenerator) {
                    resolve();
                } else {
                    setTimeout(checkSystems, 100);
                }
            };
            checkSystems();
        });
    }

    setupMasterGenerator() {
        // Configurar geração automática
        if (this.config.autoApply) {
            setTimeout(() => {
                this.generateAllMasterAssets();
            }, 2000);
        }
        
        // Configurar eventos de geração sob demanda
        if (this.config.generateOnDemand) {
            this.setupOnDemandGeneration();
        }
    }

    setupOnDemandGeneration() {
        // Detectar quando o usuário acessa diferentes telas
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.checkForScreenChanges();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    checkForScreenChanges() {
        // Verificar se alguma tela foi aberta e precisa de assets
        const screens = [
            { selector: '.world-map', generator: 'worldMap' },
            { selector: '.character-selection', generator: 'heroSelect' },
            { selector: '.inventory-interface', generator: 'inventory' },
            { selector: '.mission-screen', generator: 'mission' }
        ];

        screens.forEach(screen => {
            const element = document.querySelector(screen.selector);
            if (element && element.style.display !== 'none') {
                this.generateScreenAssets(screen.generator);
            }
        });
    }

    generateScreenAssets(screenType) {
        const assetKey = `${screenType}-assets`;
        
        // Verificar se já foi gerado
        if (this.config.cacheAssets && this.generatedAssets.has(assetKey)) {
            return;
        }

        console.log(`🎨 Gerando assets para: ${screenType}`);

        switch (screenType) {
            case 'worldMap':
                this.generateWorldMapAssets();
                break;
            case 'heroSelect':
                this.generateHeroSelectAssets();
                break;
            case 'inventory':
                this.generateInventoryAssets();
                break;
            case 'mission':
                this.generateMissionAssets();
                break;
        }

        this.generatedAssets.set(assetKey, true);
    }

    generateWorldMapAssets() {
        if (window.advancedWorldMapGenerator) {
            // Gerar mapa detalhado
            const detailedMap = window.advancedWorldMapGenerator.generateDetailedWorldMap();
            
            // Gerar mapa de alta resolução
            const highResMap = window.advancedWorldMapGenerator.generateHighResolutionMap();
            
            // Aplicar ao jogo
            window.advancedWorldMapGenerator.applyWorldMap();
            
            console.log('🗺️ Assets do mapa do mundo gerados');
        }
    }

    generateHeroSelectAssets() {
        if (window.advancedBackgroundGenerator) {
            // Gerar background detalhado
            const heroBg = window.advancedBackgroundGenerator.generateHeroSelectBackground();
            
            // Aplicar ao elemento
            const heroElement = document.querySelector('.character-selection');
            if (heroElement) {
                heroElement.style.backgroundImage = `url(${heroBg})`;
                heroElement.style.backgroundSize = 'cover';
                heroElement.style.backgroundPosition = 'center';
            }
            
            console.log('👥 Assets de seleção de heróis gerados');
        }
    }

    generateInventoryAssets() {
        if (window.advancedBackgroundGenerator) {
            // Gerar background detalhado
            const inventoryBg = window.advancedBackgroundGenerator.generateInventoryBackground();
            
            // Aplicar ao elemento
            const inventoryElement = document.querySelector('.inventory-interface');
            if (inventoryElement) {
                inventoryElement.style.backgroundImage = `url(${inventoryBg})`;
                inventoryElement.style.backgroundSize = 'cover';
                inventoryElement.style.backgroundPosition = 'center';
            }
            
            console.log('🎒 Assets de inventário gerados');
        }
    }

    generateMissionAssets() {
        if (window.advancedBackgroundGenerator) {
            // Gerar background detalhado
            const missionBg = window.advancedBackgroundGenerator.generateMissionBackground();
            
            // Aplicar ao elemento
            const missionElement = document.querySelector('.mission-screen');
            if (missionElement) {
                missionElement.style.backgroundImage = `url(${missionBg})`;
                missionElement.style.backgroundSize = 'cover';
                missionElement.style.backgroundPosition = 'center';
            }
            
            console.log('🎯 Assets de missões gerados');
        }
    }

    // Método principal para gerar todos os assets
    generateAllMasterAssets() {
        console.log('🎨 Gerando todos os assets mestres...');
        
        // Gerar assets do mapa do mundo
        this.generateWorldMapAssets();
        
        // Gerar assets de seleção de heróis
        this.generateHeroSelectAssets();
        
        // Gerar assets de inventário
        this.generateInventoryAssets();
        
        // Gerar assets de missões
        this.generateMissionAssets();
        
        // Gerar elementos de UI
        if (window.uiElementsGenerator) {
            window.uiElementsGenerator.generateAllElements();
            window.uiElementsGenerator.applyGeneratedElements();
        }
        
        console.log('✅ Todos os assets mestres gerados!');
    }

    // Gerar assets específicos de alta qualidade
    generateHighQualityAssets() {
        console.log('🎨 Gerando assets de alta qualidade...');
        
        // Configurar qualidade alta
        this.config.quality = 'high';
        
        // Regenerar todos os assets
        this.generatedAssets.clear();
        this.generateAllMasterAssets();
        
        console.log('✅ Assets de alta qualidade gerados!');
    }

    // Gerar assets específicos de média qualidade (mais rápido)
    generateMediumQualityAssets() {
        console.log('🎨 Gerando assets de qualidade média...');
        
        // Configurar qualidade média
        this.config.quality = 'medium';
        
        // Regenerar todos os assets
        this.generatedAssets.clear();
        this.generateAllMasterAssets();
        
        console.log('✅ Assets de qualidade média gerados!');
    }

    // Aplicar todos os assets ao jogo
    applyAllMasterAssets() {
        console.log('🎨 Aplicando todos os assets mestres...');
        
        // Aplicar mapa do mundo
        if (window.advancedWorldMapGenerator) {
            window.advancedWorldMapGenerator.applyWorldMap();
        }
        
        // Aplicar backgrounds
        if (window.advancedBackgroundGenerator) {
            window.advancedBackgroundGenerator.applyAllBackgrounds();
        }
        
        // Aplicar elementos de UI
        if (window.uiElementsGenerator) {
            window.uiElementsGenerator.applyGeneratedElements();
        }
        
        console.log('✅ Todos os assets mestres aplicados!');
    }

    // Limpar cache e regenerar tudo
    refreshAllAssets() {
        console.log('🔄 Atualizando todos os assets...');
        
        // Limpar cache
        this.generatedAssets.clear();
        
        // Regenerar tudo
        this.generateAllMasterAssets();
        
        console.log('✅ Todos os assets atualizados!');
    }

    // Configurar qualidade dos assets
    setQuality(quality) {
        if (['high', 'medium', 'low'].includes(quality)) {
            this.config.quality = quality;
            console.log(`🎨 Qualidade dos assets alterada para: ${quality}`);
        } else {
            console.warn('⚠️ Qualidade inválida. Use: high, medium, ou low');
        }
    }

    // Ativar/desativar geração automática
    setAutoApply(enabled) {
        this.config.autoApply = enabled;
        console.log(`🎨 Geração automática ${enabled ? 'ativada' : 'desativada'}`);
    }

    // Ativar/desativar cache
    setCache(enabled) {
        this.config.cacheAssets = enabled;
        console.log(`🎨 Cache de assets ${enabled ? 'ativado' : 'desativado'}`);
    }

    // Métodos de debug
    getMasterGeneratorInfo() {
        return {
            isInitialized: this.isInitialized,
            config: this.config,
            generatedAssets: Array.from(this.generatedAssets.keys()),
            availableGenerators: {
                worldMap: !!window.advancedWorldMapGenerator,
                backgrounds: !!window.advancedBackgroundGenerator,
                images: !!window.imageGeneratorSystem,
                uiElements: !!window.uiElementsGenerator
            }
        };
    }

    // Listar todos os assets gerados
    listGeneratedAssets() {
        console.log('📋 Assets gerados:');
        this.generatedAssets.forEach((value, key) => {
            console.log(`  - ${key}: ${value}`);
        });
    }

    // Estatísticas de performance
    getPerformanceStats() {
        return {
            totalAssets: this.generatedAssets.size,
            cacheEnabled: this.config.cacheAssets,
            autoApplyEnabled: this.config.autoApply,
            quality: this.config.quality,
            generatorsAvailable: Object.values(this.getMasterGeneratorInfo().availableGenerators).filter(Boolean).length
        };
    }
}

// Sistema global do gerador mestre
window.masterVisualGenerator = new MasterVisualGenerator();

// Funções de controle global
window.generateAllMasterAssets = function() {
    window.masterVisualGenerator.generateAllMasterAssets();
};

window.generateHighQualityAssets = function() {
    window.masterVisualGenerator.generateHighQualityAssets();
};

window.generateMediumQualityAssets = function() {
    window.masterVisualGenerator.generateMediumQualityAssets();
};

window.applyAllMasterAssets = function() {
    window.masterVisualGenerator.applyAllMasterAssets();
};

window.refreshAllAssets = function() {
    window.masterVisualGenerator.refreshAllAssets();
};

window.setAssetQuality = function(quality) {
    window.masterVisualGenerator.setQuality(quality);
};

window.setAutoApply = function(enabled) {
    window.masterVisualGenerator.setAutoApply(enabled);
};

window.setAssetCache = function(enabled) {
    window.masterVisualGenerator.setCache(enabled);
};

window.debugMasterGenerator = function() {
    console.log('🎨 Debug do Gerador Mestre:', window.masterVisualGenerator.getMasterGeneratorInfo());
};

window.listGeneratedAssets = function() {
    window.masterVisualGenerator.listGeneratedAssets();
};

window.getPerformanceStats = function() {
    console.log('📊 Estatísticas de Performance:', window.masterVisualGenerator.getPerformanceStats());
};

console.log('🎨 Gerador Mestre Visual carregado!');
