// ========================================
// SISTEMA DE DECORAÇÃO DO JOGO
// ========================================

class GameDecorationSystem {
    constructor() {
        this.isInitialized = false;
        this.decorations = new Map();
        this.currentScreen = null;
        this.animationId = null;
        
        this.integrationConfig = {
            screens: {
                'hero-select': {
                    background: 'hero-select-bg',
                    decorations: ['crystal-networks', 'floating-islands']
                },
                'world-map': {
                    background: 'world-map-bg',
                    decorations: ['crystal-networks', 'floating-islands', 'cosmic-stars']
                },
                'mission-screen': {
                    background: 'mission-screen-bg',
                    decorations: ['cosmic-stars', 'floating-islands']
                }
            },
            animation: {
                enabled: true,
                speed: 1.0
            }
        };
        
        this.init();
    }
    
    init() {
        console.log('🎨 Sistema de Decoração do Jogo inicializado');
        this.createStyles();
        this.isInitialized = true;
        console.log('✅ Sistema de Decoração do Jogo carregado!');
    }
    
    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 0.8; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
            }
            
            @keyframes floating {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes dancing {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-5px) rotate(90deg); }
                50% { transform: translateY(0px) rotate(180deg); }
                75% { transform: translateY(-5px) rotate(270deg); }
            }
            
            @keyframes flowing {
                0% { transform: translateX(-100px); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateX(100px); opacity: 0; }
            }
            
            @keyframes glowing {
                0%, 100% { opacity: 0.7; box-shadow: 0 0 15px currentColor; }
                50% { opacity: 1; box-shadow: 0 0 25px currentColor; }
            }
            
            @keyframes selectionPulse {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
            }
            
            @keyframes missionStartFade {
                0% { opacity: 0; }
                50% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            .vega-selected {
                box-shadow: 0 0 20px #9370db !important;
                border: 2px solid #00d4ff !important;
            }
            
            .game-decoration {
                transition: all 0.3s ease;
            }
            
            .header-decoration {
                transition: all 0.5s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    detectAndApplyScreenElements() {
        const screens = Object.keys(this.integrationConfig.screens);
        screens.forEach(screenName => {
            const screenElement = document.querySelector(`.${screenName}`);
            if (screenElement && screenElement.style.display !== 'none') {
                this.applyScreenElements(screenName);
            }
        });
    }
    
    applyScreenElements(screenName) {
        const config = this.integrationConfig.screens[screenName];
        if (!config) return;
        
        console.log(`🎨 Aplicando elementos visuais para: ${screenName}`);
        
        // Aplicar background
        if (config.background) {
            this.applyBackground(screenName, config.background);
        }
        
        // Aplicar decorações
        if (config.decorations) {
            config.decorations.forEach(decorationName => {
                this.createDecoration(decorationName);
            });
        }
    }
    
    applyBackground(screenName, backgroundName) {
        const screenElement = document.querySelector(`.${screenName}`);
        if (!screenElement) return;
        
        screenElement.style.background = `linear-gradient(135deg, #1a1a2e, #16213e)`;
        console.log(`✅ Background aplicado: ${backgroundName}`);
    }
    
    createDecoration(decorationName) {
        if (this.decorations.has(decorationName)) return;
        
        const decoration = document.createElement('div');
        decoration.className = `game-decoration ${decorationName}`;
        
        switch(decorationName) {
            case 'crystal-networks':
                decoration.innerHTML = '💎';
                decoration.style.cssText = `
                    position: absolute;
                    font-size: 20px;
                    color: #4ecdc4;
                    animation: floating 3s ease-in-out infinite;
                    pointer-events: none;
                `;
                break;
                
            case 'floating-islands':
                decoration.innerHTML = '🏝️';
                decoration.style.cssText = `
                    position: absolute;
                    font-size: 24px;
                    color: #00d4ff;
                    animation: dancing 4s ease-in-out infinite;
                    pointer-events: none;
                `;
                break;
                
            case 'cosmic-stars':
                decoration.innerHTML = '⭐';
                decoration.style.cssText = `
                    position: absolute;
                    font-size: 16px;
                    color: #ffd700;
                    animation: glowing 2s ease-in-out infinite;
                    pointer-events: none;
                `;
                break;
        }
        
        decoration.style.left = Math.random() * 100 + '%';
        decoration.style.top = Math.random() * 100 + '%';
        
        document.body.appendChild(decoration);
        this.decorations.set(decorationName, decoration);
        console.log(`✅ Elemento decorativo aplicado: ${decorationName}`);
    }
    
    setupScreenDetection() {
        let lastDetection = 0;
        const detectionThrottle = 1000;
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
    
    startAnimationLoop() {
        if (this.animationId) {
            console.log('⚠️ Loop de animação já está rodando, ignorando...');
            return;
        }
        
        const animate = () => {
            try {
                this.updateAnimations();
                this.animationId = requestAnimationFrame(animate);
            } catch (error) {
                console.error('❌ Erro no loop de animação:', error);
                this.stopAnimationLoop();
            }
        };
        
        this.animationId = requestAnimationFrame(animate);
        console.log('🎬 Loop de animação iniciado');
    }
    
    stopAnimationLoop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
            console.log('⏹️ Loop de animação parado');
        }
    }
    
    updateAnimations() {
        if (!this.integrationConfig.animation.enabled) return;
        
        // Atualizar decorações
        this.updateDecorations();
    }
    
    updateDecorations() {
        // Atualizar posições das decorações
        this.decorations.forEach((decoration, name) => {
            if (decoration.parentNode) {
                this.updateDecorationPosition(decoration, name);
            }
        });
    }
    
    updateDecorationPosition(decoration, name) {
        // Mover decorações suavemente
        const currentLeft = parseFloat(decoration.style.left) || 0;
        const currentTop = parseFloat(decoration.style.top) || 0;
        
        // Movimento suave baseado no tipo de decoração
        const speed = 0.1;
        const newLeft = currentLeft + (Math.random() - 0.5) * speed;
        const newTop = currentTop + (Math.random() - 0.5) * speed;
        
        decoration.style.left = Math.max(0, Math.min(100, newLeft)) + '%';
        decoration.style.top = Math.max(0, Math.min(100, newTop)) + '%';
    }
    
    // Métodos de controle
    enableAnimations() {
        this.integrationConfig.animation.enabled = true;
    }
    
    disableAnimations() {
        this.integrationConfig.animation.enabled = false;
    }
    
    refreshDecorations() {
        this.clearDecorations();
        this.createDecorations();
    }
    
    clearDecorations() {
        this.decorations.forEach((decoration) => {
            if (decoration.parentNode) {
                decoration.parentNode.removeChild(decoration);
            }
        });
        this.decorations.clear();
    }
    
    createDecorations() {
        // Recriar decorações baseadas na tela atual
        this.detectAndApplyScreenElements();
    }
    
    destroy() {
        console.log('🗑️ Destruindo Sistema de Decoração...');
        this.stopAnimationLoop();
        this.clearDecorations();
        this.isInitialized = false;
        console.log('✅ Sistema de Decoração destruído');
    }
    
    // Métodos de debug
    getSystemInfo() {
        return {
            isInitialized: this.isInitialized,
            currentScreen: this.currentScreen,
            decorationsCount: this.decorations.size,
            animationEnabled: this.integrationConfig.animation.enabled,
            availableScreens: Object.keys(this.integrationConfig.screens)
        };
    }
}

// Sistema global de decoração do jogo
window.gameDecorationSystem = new GameDecorationSystem();

// Funções de controle global
window.enableGameDecorations = function() {
    window.gameDecorationSystem.enableAnimations();
};

window.disableGameDecorations = function() {
    window.gameDecorationSystem.disableAnimations();
};

window.debugGameDecorations = function() {
    console.log('🎨 Debug do Sistema de Decoração do Jogo:');
    console.log(window.gameDecorationSystem.getSystemInfo());
};