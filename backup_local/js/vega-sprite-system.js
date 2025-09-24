// Sistema de Sprites da Vega - Baseado na Estética Existente
// Implementa variações de posição e animações seguindo o manual de estilo visual

class VegaSpriteSystem {
    constructor() {
        this.sprites = new Map();
        this.currentSprite = 'idle';
        this.frameIndex = 0;
        this.frameTime = 0;
        this.frameDuration = 100; // ms por frame
        this.isPlaying = false;
        
        // Configurações baseadas no manual de estilo visual
        this.styleConfig = {
            palette: {
                primary: '#1a1a2e',      // Índigo profundo
                secondary: '#16213e',    // Azul-marinho
                accent: '#00d4ff',       // Ciano vibrante
                highlight: '#ff00ff',    // Magenta
                glow: '#9370db'          // Violeta
            },
            lighting: {
                contrast: 'high',
                atmospheric: true,
                bioluminescent: true
            },
            rendering: {
                characterStyle: 'illustrative', // Linhas limpas, cel-shading
                environmentStyle: 'painterly'   // Pictórico, atmosférico
            }
        };
        
        this.initSprites();
    }

    initSprites() {
        // Criar sprites baseados na estética da Vega
        this.createVegaSprites();
    }

    createVegaSprites() {
        // Sprite de Idle - Pose flutuante etérea
        this.sprites.set('idle', this.createIdleSprite());
        
        // Sprite de Walk - Deslize suave
        this.sprites.set('walk', this.createWalkSprite());
        
        // Sprite de Attack - Magia arcana
        this.sprites.set('attack', this.createAttackSprite());
        
        // Sprite de Jump - Levitação mágica
        this.sprites.set('jump', this.createJumpSprite());
        
        // Sprite de Cast - Conjuração de magia
        this.sprites.set('cast', this.createCastSprite());
        
        // Sprite de Hit - Recuo etéreo
        this.sprites.set('hit', this.createHitSprite());
    }

    createIdleSprite() {
        // Baseado na T-pose da Vega, criando variações sutis
        return {
            frames: [
                { // Frame 1 - Pose neutra flutuante
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.3,
                    description: 'Vega flutua suavemente, vestes ondulando'
                },
                { // Frame 2 - Inspiração sutil
                    offsetY: -2,
                    scale: 1.02,
                    glow: 0.4,
                    description: 'Movimento de respiração, energia se acumula'
                },
                { // Frame 3 - Pico da inspiração
                    offsetY: -3,
                    scale: 1.05,
                    glow: 0.5,
                    description: 'Energia arcana pulsante ao redor'
                },
                { // Frame 4 - Expiração
                    offsetY: -1,
                    scale: 1.02,
                    glow: 0.4,
                    description: 'Energia se dissipa suavemente'
                },
                { // Frame 5 - Pose neutra
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.3,
                    description: 'Retorno à pose de flutuação'
                },
                { // Frame 6 - Movimento secundário
                    offsetY: 1,
                    scale: 0.98,
                    glow: 0.25,
                    description: 'Vestes continuam ondulando'
                }
            ],
            loop: true,
            duration: 3000 // 3 segundos para ciclo completo
        };
    }

    createWalkSprite() {
        return {
            frames: [
                { // Frame 1 - Deslize inicial
                    offsetX: 0,
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.4,
                    description: 'Vega desliza para frente, energia rastreando'
                },
                { // Frame 2 - Movimento fluido
                    offsetX: 8,
                    offsetY: -1,
                    scale: 1.02,
                    glow: 0.5,
                    description: 'Deslize suave, vestes flutuando atrás'
                },
                { // Frame 3 - Pico do movimento
                    offsetX: 12,
                    offsetY: -2,
                    scale: 1.05,
                    glow: 0.6,
                    description: 'Movimento máximo, energia concentrada'
                },
                { // Frame 4 - Transição
                    offsetX: 8,
                    offsetY: -1,
                    scale: 1.02,
                    glow: 0.5,
                    description: 'Preparação para próximo deslize'
                },
                { // Frame 5 - Retorno
                    offsetX: 0,
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.4,
                    description: 'Ciclo completo, energia se estabiliza'
                }
            ],
            loop: true,
            duration: 1000
        };
    }

    createAttackSprite() {
        return {
            frames: [
                { // Frame 1 - Preparação
                    offsetX: -5,
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.3,
                    description: 'Vega concentra energia arcana'
                },
                { // Frame 2 - Acúmulo
                    offsetX: -8,
                    offsetY: -2,
                    scale: 1.05,
                    glow: 0.6,
                    description: 'Energia se concentra nas mãos'
                },
                { // Frame 3 - Pico da energia
                    offsetX: -10,
                    offsetY: -3,
                    scale: 1.1,
                    glow: 0.8,
                    description: 'Esfera de energia brilhante'
                },
                { // Frame 4 - Liberação
                    offsetX: 5,
                    offsetY: -1,
                    scale: 1.15,
                    glow: 1.0,
                    description: 'Projétil mágico sendo lançado'
                },
                { // Frame 5 - Impacto
                    offsetX: 12,
                    offsetY: 0,
                    scale: 1.2,
                    glow: 0.9,
                    description: 'Explosão de energia arcana'
                },
                { // Frame 6 - Recuperação
                    offsetX: 2,
                    offsetY: 1,
                    scale: 1.05,
                    glow: 0.5,
                    description: 'Vega se recupera do ataque'
                },
                { // Frame 7 - Retorno
                    offsetX: 0,
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.3,
                    description: 'Retorno à pose de flutuação'
                }
            ],
            loop: false,
            duration: 1400
        };
    }

    createJumpSprite() {
        return {
            frames: [
                { // Frame 1 - Preparação
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.3,
                    description: 'Vega se prepara para levitar'
                },
                { // Frame 2 - Ascensão
                    offsetY: -8,
                    scale: 1.05,
                    glow: 0.5,
                    description: 'Levitação mágica iniciada'
                },
                { // Frame 3 - Pico da levitação
                    offsetY: -15,
                    scale: 1.1,
                    glow: 0.7,
                    description: 'Vega flutua no ar, energia pulsante'
                },
                { // Frame 4 - Suspensão
                    offsetY: -15,
                    scale: 1.08,
                    glow: 0.6,
                    description: 'Mantém-se suspensa no ar'
                },
                { // Frame 5 - Descida suave
                    offsetY: -8,
                    scale: 1.05,
                    glow: 0.5,
                    description: 'Descida controlada'
                },
                { // Frame 6 - Aterrissagem
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.3,
                    description: 'Retorno suave ao solo'
                }
            ],
            loop: false,
            duration: 1200
        };
    }

    createCastSprite() {
        return {
            frames: [
                { // Frame 1 - Concentração
                    offsetX: 0,
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.4,
                    description: 'Vega concentra energia mágica'
                },
                { // Frame 2 - Acúmulo de poder
                    offsetX: 0,
                    offsetY: -3,
                    scale: 1.08,
                    glow: 0.7,
                    description: 'Energia arcana se acumula'
                },
                { // Frame 3 - Pico da conjuração
                    offsetX: 0,
                    offsetY: -5,
                    scale: 1.15,
                    glow: 1.0,
                    description: 'Magia poderosa sendo conjurada'
                },
                { // Frame 4 - Liberação
                    offsetX: 0,
                    offsetY: -3,
                    scale: 1.08,
                    glow: 0.8,
                    description: 'Magia sendo liberada'
                },
                { // Frame 5 - Recuperação
                    offsetX: 0,
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.4,
                    description: 'Vega se recupera da conjuração'
                }
            ],
            loop: false,
            duration: 2000
        };
    }

    createHitSprite() {
        return {
            frames: [
                { // Frame 1 - Impacto
                    offsetX: 5,
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.2,
                    description: 'Vega recebe dano'
                },
                { // Frame 2 - Recuo
                    offsetX: 8,
                    offsetY: -2,
                    scale: 0.95,
                    glow: 0.1,
                    description: 'Recuo etéreo'
                },
                { // Frame 3 - Instabilidade
                    offsetX: 6,
                    offsetY: -1,
                    scale: 0.98,
                    glow: 0.15,
                    description: 'Energia instável'
                },
                { // Frame 4 - Recuperação
                    offsetX: 2,
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.25,
                    description: 'Começa a se recuperar'
                },
                { // Frame 5 - Estabilização
                    offsetX: 0,
                    offsetY: 0,
                    scale: 1.0,
                    glow: 0.3,
                    description: 'Retorna ao estado normal'
                }
            ],
            loop: false,
            duration: 800
        };
    }

    // Métodos de controle
    setSprite(spriteName) {
        if (this.sprites.has(spriteName)) {
            this.currentSprite = spriteName;
            this.frameIndex = 0;
            this.frameTime = 0;
            this.isPlaying = true;
        }
    }

    play() {
        this.isPlaying = true;
    }

    pause() {
        this.isPlaying = false;
    }

    stop() {
        this.isPlaying = false;
        this.frameIndex = 0;
        this.frameTime = 0;
    }

    update(deltaTime) {
        if (!this.isPlaying) return;

        const sprite = this.sprites.get(this.currentSprite);
        if (!sprite) return;

        this.frameTime += deltaTime;
        const frameDuration = sprite.duration / sprite.frames.length;

        if (this.frameTime >= frameDuration) {
            this.frameIndex++;
            if (this.frameIndex >= sprite.frames.length) {
                if (sprite.loop) {
                    this.frameIndex = 0;
                } else {
                    this.frameIndex = sprite.frames.length - 1;
                    this.isPlaying = false;
                }
            }
            this.frameTime = 0;
        }
    }

    getCurrentFrame() {
        const sprite = this.sprites.get(this.currentSprite);
        if (!sprite) return null;
        
        return sprite.frames[this.frameIndex] || null;
    }

    // Renderização baseada na estética do manual
    render(ctx, x, y, width, height) {
        const frame = this.getCurrentFrame();
        if (!frame) return;

        ctx.save();
        
        // Aplicar transformações baseadas no frame
        ctx.translate(x + width/2, y + height/2);
        ctx.scale(frame.scale, frame.scale);
        
        // Aplicar offset do frame
        ctx.translate(frame.offsetX || 0, frame.offsetY || 0);

        // Criar efeito de brilho baseado no manual de estilo visual
        if (frame.glow > 0) {
            ctx.shadowColor = this.styleConfig.palette.accent;
            ctx.shadowBlur = frame.glow * 20;
        }

        // Desenhar sprite da Vega (placeholder - será substituído pela imagem real)
        this.drawVegaSprite(ctx, -width/2, -height/2, width, height, frame);

        ctx.restore();
    }

    drawVegaSprite(ctx, x, y, width, height, frame) {
        // Desenhar base da Vega seguindo a estética do manual
        const centerX = x + width/2;
        const centerY = y + height/2;

        // Corpo principal (estilo ilustrativo)
        ctx.fillStyle = this.styleConfig.palette.secondary;
        ctx.fillRect(centerX - 8, centerY - 20, 16, 40);

        // Cabeça
        ctx.fillStyle = this.styleConfig.palette.primary;
        ctx.fillRect(centerX - 6, centerY - 30, 12, 12);

        // Vestes flutuantes (estilo pictórico)
        ctx.fillStyle = this.styleConfig.palette.glow;
        ctx.globalAlpha = 0.7;
        ctx.fillRect(centerX - 12, centerY + 10, 24, 20);
        ctx.globalAlpha = 1.0;

        // Energia arcana (bioluminescente)
        if (frame.glow > 0.5) {
            ctx.fillStyle = this.styleConfig.palette.accent;
            ctx.globalAlpha = frame.glow * 0.5;
            ctx.beginPath();
            ctx.arc(centerX, centerY - 10, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }

        // Efeito de partículas mágicas
        if (frame.glow > 0.3) {
            this.drawMagicParticles(ctx, centerX, centerY, frame.glow);
        }
    }

    drawMagicParticles(ctx, x, y, intensity) {
        ctx.fillStyle = this.styleConfig.palette.highlight;
        ctx.globalAlpha = intensity * 0.6;
        
        for (let i = 0; i < 5; i++) {
            const angle = (Date.now() * 0.001 + i) * Math.PI * 2 / 5;
            const radius = 20 + Math.sin(Date.now() * 0.003 + i) * 5;
            const particleX = x + Math.cos(angle) * radius;
            const particleY = y + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.globalAlpha = 1.0;
    }

    // Métodos de debug
    getSpriteInfo() {
        return {
            currentSprite: this.currentSprite,
            frameIndex: this.frameIndex,
            isPlaying: this.isPlaying,
            totalSprites: this.sprites.size,
            availableSprites: Array.from(this.sprites.keys())
        };
    }
}

// Sistema global de sprites da Vega
window.vegaSpriteSystem = new VegaSpriteSystem();

// Funções de controle global
window.setVegaSprite = function(spriteName) {
    window.vegaSpriteSystem.setSprite(spriteName);
};

window.playVegaAnimation = function() {
    window.vegaSpriteSystem.play();
};

window.pauseVegaAnimation = function() {
    window.vegaSpriteSystem.pause();
};

window.debugVegaSprites = function() {
    console.log('🎭 Debug do Sistema de Sprites da Vega:');
    console.log(window.vegaSpriteSystem.getSpriteInfo());
};

console.log('✨ Sistema de Sprites da Vega carregado!');
