// ========================================
// CONFIGURAÇÃO DO SISTEMA DE PARALLAX
// Nova Remains - Baseado no commit 9e401c9
// ========================================

const PARALLAX_CONFIG = {
    // Configurações gerais
    enabled: true,
    debug: false,
    performanceMode: 'balanced', // 'low', 'balanced', 'high'
    
    // Configurações de camadas
    layers: {
        sky: {
            enabled: true,
            speed: 0.1,
            height: 400,
            alpha: 1.0,
            priority: 1,
            imagePath: 'assets/images/backgrounds/parallax/sky-layer.png',
            fallbackColor: '#1a1a2e'
        },
        mountains_far: {
            enabled: true,
            speed: 0.3,
            height: 300,
            alpha: 1.0,
            priority: 2,
            imagePath: 'assets/images/backgrounds/parallax/mountains-far.png',
            fallbackColor: '#2d3748'
        },
        trees: {
            enabled: true,
            speed: 0.6,
            height: 200,
            alpha: 1.0,
            priority: 3,
            imagePath: 'assets/images/backgrounds/parallax/trees-layer.png',
            fallbackColor: '#2d5016'
        },
        foreground: {
            enabled: true,
            speed: 1.2,
            height: 150,
            alpha: 1.0,
            priority: 4,
            imagePath: 'assets/images/backgrounds/parallax/foreground-layer.png',
            fallbackColor: '#4a5568'
        },
        decorative: {
            enabled: true,
            speed: 1.5,
            height: 100,
            alpha: 0.8,
            priority: 5,
            imagePath: 'assets/images/backgrounds/parallax/decorative-elements.png',
            fallbackColor: 'transparent'
        }
    },
    
    // Configurações de performance
    performance: {
        low: {
            maxLayers: 3,
            skipFrames: 2,
            reduceQuality: true
        },
        balanced: {
            maxLayers: 5,
            skipFrames: 1,
            reduceQuality: false
        },
        high: {
            maxLayers: 5,
            skipFrames: 0,
            reduceQuality: false
        }
    },
    
    // Configurações de animação
    animation: {
        smoothScrolling: true,
        interpolationSpeed: 0.1,
        maxOffset: 10000,
        resetThreshold: 5000
    },
    
    // Configurações de integração
    integration: {
        autoIntegrate: true,
        cameraSync: true,
        gameLoopSync: true,
        uiOverlay: true
    }
};

// ========================================
// FUNÇÕES DE CONFIGURAÇÃO
// ========================================

function updateParallaxConfig(newConfig) {
    Object.assign(PARALLAX_CONFIG, newConfig);
    console.log('⚙️ Configuração de parallax atualizada');
}

function getParallaxConfig() {
    return PARALLAX_CONFIG;
}

function resetParallaxConfig() {
    // Recarregar configuração padrão
    location.reload();
}

function setPerformanceMode(mode) {
    if (['low', 'balanced', 'high'].includes(mode)) {
        PARALLAX_CONFIG.performanceMode = mode;
        console.log(`🎮 Modo de performance alterado para: ${mode}`);
        
        // Aplicar configurações de performance
        const perfConfig = PARALLAX_CONFIG.performance[mode];
        if (window.parallaxSystem) {
            window.parallaxSystem.setPerformanceMode(perfConfig);
        }
    }
}

function toggleParallaxLayer(layerName, enabled) {
    if (PARALLAX_CONFIG.layers[layerName]) {
        PARALLAX_CONFIG.layers[layerName].enabled = enabled;
        console.log(`🎨 Camada ${layerName} ${enabled ? 'habilitada' : 'desabilitada'}`);
        
        if (window.parallaxSystem) {
            window.parallaxSystem.toggleLayer(layerName, enabled);
        }
    }
}

function setLayerSpeed(layerName, speed) {
    if (PARALLAX_CONFIG.layers[layerName]) {
        PARALLAX_CONFIG.layers[layerName].speed = speed;
        console.log(`🎮 Velocidade da camada ${layerName} alterada para ${speed}`);
        
        if (window.parallaxSystem) {
            window.parallaxSystem.setLayerSpeed(layerName, speed);
        }
    }
}

function setLayerAlpha(layerName, alpha) {
    if (PARALLAX_CONFIG.layers[layerName]) {
        PARALLAX_CONFIG.layers[layerName].alpha = alpha;
        console.log(`🎨 Transparência da camada ${layerName} alterada para ${alpha}`);
        
        if (window.parallaxSystem) {
            window.parallaxSystem.setLayerAlpha(layerName, alpha);
        }
    }
}

// ========================================
// CONFIGURAÇÕES ESPECÍFICAS POR MISSÃO
// ========================================

const MISSION_PARALLAX_CONFIGS = {
    tutorial: {
        layers: {
            sky: { speed: 0.05, alpha: 1.0 },
            mountains_far: { speed: 0.2, alpha: 1.0 },
            trees: { speed: 0.4, alpha: 1.0 },
            foreground: { speed: 0.8, alpha: 1.0 },
            decorative: { enabled: false }
        }
    },
    sanctuary: {
        layers: {
            sky: { speed: 0.1, alpha: 1.0 },
            mountains_far: { speed: 0.3, alpha: 1.0 },
            trees: { speed: 0.6, alpha: 1.0 },
            foreground: { speed: 1.2, alpha: 1.0 },
            decorative: { speed: 1.5, alpha: 0.8 }
        }
    },
    void: {
        layers: {
            sky: { speed: 0.15, alpha: 0.9 },
            mountains_far: { speed: 0.4, alpha: 0.8 },
            trees: { speed: 0.7, alpha: 0.7 },
            foreground: { speed: 1.3, alpha: 0.9 },
            decorative: { speed: 1.8, alpha: 0.6 }
        }
    },
    ruins: {
        layers: {
            sky: { speed: 0.12, alpha: 1.0 },
            mountains_far: { speed: 0.35, alpha: 0.9 },
            trees: { speed: 0.65, alpha: 0.8 },
            foreground: { speed: 1.25, alpha: 1.0 },
            decorative: { speed: 1.6, alpha: 0.7 }
        }
    },
    temple: {
        layers: {
            sky: { speed: 0.08, alpha: 1.0 },
            mountains_far: { speed: 0.25, alpha: 1.0 },
            trees: { speed: 0.5, alpha: 1.0 },
            foreground: { speed: 1.0, alpha: 1.0 },
            decorative: { speed: 1.4, alpha: 0.9 }
        }
    },
    comet: {
        layers: {
            sky: { speed: 0.2, alpha: 0.8 },
            mountains_far: { speed: 0.5, alpha: 0.7 },
            trees: { speed: 0.8, alpha: 0.6 },
            foreground: { speed: 1.5, alpha: 0.8 },
            decorative: { speed: 2.0, alpha: 0.5 }
        }
    }
};

function applyMissionParallaxConfig(missionId) {
    const missionConfig = MISSION_PARALLAX_CONFIGS[missionId];
    if (missionConfig) {
        console.log(`🎮 Aplicando configuração de parallax para missão: ${missionId}`);
        
        // Aplicar configurações específicas da missão
        Object.keys(missionConfig.layers).forEach(layerName => {
            const layerConfig = missionConfig.layers[layerName];
            Object.keys(layerConfig).forEach(property => {
                if (PARALLAX_CONFIG.layers[layerName]) {
                    PARALLAX_CONFIG.layers[layerName][property] = layerConfig[property];
                }
            });
        });
        
        // Aplicar no sistema ativo
        if (window.parallaxSystem) {
            window.parallaxSystem.applyConfig(PARALLAX_CONFIG);
        }
    }
}

// ========================================
// EXPORTAÇÃO GLOBAL
// ========================================

window.PARALLAX_CONFIG = PARALLAX_CONFIG;
window.MISSION_PARALLAX_CONFIGS = MISSION_PARALLAX_CONFIGS;
window.updateParallaxConfig = updateParallaxConfig;
window.getParallaxConfig = getParallaxConfig;
window.resetParallaxConfig = resetParallaxConfig;
window.setPerformanceMode = setPerformanceMode;
window.toggleParallaxLayer = toggleParallaxLayer;
window.setLayerSpeed = setLayerSpeed;
window.setLayerAlpha = setLayerAlpha;
window.applyMissionParallaxConfig = applyMissionParallaxConfig;

console.log('⚙️ Configuração do Sistema de Parallax carregada!');
console.log('📋 Funcionalidades:', [
    'Configuração dinâmica de camadas',
    'Modos de performance (low/balanced/high)',
    'Configurações específicas por missão',
    'Controle de velocidade e transparência',
    'Integração automática com o jogo'
]);
