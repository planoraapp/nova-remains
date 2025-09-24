// Sistema de Animações para Personagens
class AnimationSystem {
    constructor() {
        this.animations = new Map();
        this.currentAnimation = 'idle';
        this.frameIndex = 0;
        this.frameTime = 0;
        this.frameDuration = 100; // ms por frame
    }

    // Adicionar animação para um personagem
    addCharacterAnimations(characterName, animations) {
        this.animations.set(characterName, animations);
    }

    // Definir animação atual
    setAnimation(animationName) {
        if (this.currentAnimation !== animationName) {
            this.currentAnimation = animationName;
            this.frameIndex = 0;
            this.frameTime = 0;
        }
    }

    // Atualizar animação
    update(deltaTime) {
        this.frameTime += deltaTime;
        
        if (this.frameTime >= this.frameDuration) {
            this.frameTime = 0;
            this.frameIndex = (this.frameIndex + 1) % this.getCurrentFrames().length;
        }
    }

    // Obter frames da animação atual
    getCurrentFrames() {
        const characterAnimations = this.animations.get('vega');
        if (characterAnimations && characterAnimations[this.currentAnimation]) {
            return characterAnimations[this.currentAnimation];
        }
        return [];
    }

    // Obter frame atual
    getCurrentFrame() {
        const frames = this.getCurrentFrames();
        return frames[this.frameIndex] || frames[0];
    }

    // Criar animações baseadas na T-pose
    createAnimationsFromTPose(tPoseImage, characterName) {
        const animations = {
            idle: this.createIdleAnimation(tPoseImage),
            walk: this.createWalkAnimation(tPoseImage),
            attack: this.createAttackAnimation(tPoseImage),
            jump: this.createJumpAnimation(tPoseImage),
            blink: this.createBlinkAnimation(tPoseImage)
        };

        this.addCharacterAnimations(characterName, animations);
        return animations;
    }

    // Criar animação de idle (respiração) - 12 frames
    createIdleAnimation(tPoseImage) {
        return [
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }, // Frame neutro
            { image: tPoseImage, offsetX: 0, offsetY: -1, scale: 1.0, rotation: 0 }, // Inspiração 1
            { image: tPoseImage, offsetX: 0, offsetY: -2, scale: 1.0, rotation: 0 }, // Inspiração 2
            { image: tPoseImage, offsetX: 0, offsetY: -3, scale: 1.0, rotation: 0 }, // Pico da inspiração
            { image: tPoseImage, offsetX: 0, offsetY: -2, scale: 1.0, rotation: 0 }, // Expiração 1
            { image: tPoseImage, offsetX: 0, offsetY: -1, scale: 1.0, rotation: 0 }, // Expiração 2
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }, // Neutro
            { image: tPoseImage, offsetX: 0, offsetY: 1, scale: 1.0, rotation: 0 }, // Expiração 3
            { image: tPoseImage, offsetX: 0, offsetY: 2, scale: 1.0, rotation: 0 }, // Pico da expiração
            { image: tPoseImage, offsetX: 0, offsetY: 1, scale: 1.0, rotation: 0 }, // Inspiração 3
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }, // Neutro
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }  // Pausa
        ];
    }

    // Criar animação de caminhada - 12 frames
    createWalkAnimation(tPoseImage) {
        return [
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }, // Passo neutro
            { image: tPoseImage, offsetX: 1, offsetY: -1, scale: 1.0, rotation: 1 }, // Passo direito 1
            { image: tPoseImage, offsetX: 2, offsetY: -2, scale: 1.0, rotation: 2 }, // Passo direito 2
            { image: tPoseImage, offsetX: 3, offsetY: -1, scale: 1.0, rotation: 3 }, // Passo direito 3
            { image: tPoseImage, offsetX: 2, offsetY: 0, scale: 1.0, rotation: 2 }, // Centro direito
            { image: tPoseImage, offsetX: 1, offsetY: 1, scale: 1.0, rotation: 1 }, // Transição
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }, // Centro
            { image: tPoseImage, offsetX: -1, offsetY: -1, scale: 1.0, rotation: -1 }, // Passo esquerdo 1
            { image: tPoseImage, offsetX: -2, offsetY: -2, scale: 1.0, rotation: -2 }, // Passo esquerdo 2
            { image: tPoseImage, offsetX: -3, offsetY: -1, scale: 1.0, rotation: -3 }, // Passo esquerdo 3
            { image: tPoseImage, offsetX: -2, offsetY: 0, scale: 1.0, rotation: -2 }, // Centro esquerdo
            { image: tPoseImage, offsetX: -1, offsetY: 1, scale: 1.0, rotation: -1 }  // Transição
        ];
    }

    // Criar animação de ataque - 10 frames
    createAttackAnimation(tPoseImage) {
        return [
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }, // Preparação 1
            { image: tPoseImage, offsetX: -2, offsetY: 0, scale: 1.0, rotation: -2 }, // Preparação 2
            { image: tPoseImage, offsetX: -4, offsetY: 0, scale: 1.0, rotation: -4 }, // Preparação 3
            { image: tPoseImage, offsetX: 2, offsetY: -1, scale: 1.05, rotation: 2 }, // Ataque 1
            { image: tPoseImage, offsetX: 5, offsetY: -2, scale: 1.1, rotation: 5 }, // Ataque 2
            { image: tPoseImage, offsetX: 8, offsetY: -3, scale: 1.2, rotation: 10 }, // Impacto
            { image: tPoseImage, offsetX: 6, offsetY: -2, scale: 1.15, rotation: 8 }, // Recuperação 1
            { image: tPoseImage, offsetX: 3, offsetY: -1, scale: 1.05, rotation: 3 }, // Recuperação 2
            { image: tPoseImage, offsetX: 1, offsetY: 0, scale: 1.0, rotation: 1 }, // Recuperação 3
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }   // Volta ao normal
        ];
    }

    // Criar animação de pulo - 12 frames
    createJumpAnimation(tPoseImage) {
        return [
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }, // Preparação 1
            { image: tPoseImage, offsetX: 0, offsetY: -1, scale: 1.0, rotation: 0 }, // Preparação 2
            { image: tPoseImage, offsetX: 0, offsetY: -2, scale: 1.0, rotation: 0 }, // Preparação 3
            { image: tPoseImage, offsetX: 0, offsetY: -4, scale: 1.02, rotation: 0 }, // Subida 1
            { image: tPoseImage, offsetX: 0, offsetY: -7, scale: 1.05, rotation: 0 }, // Subida 2
            { image: tPoseImage, offsetX: 0, offsetY: -10, scale: 1.1, rotation: 0 }, // Pico do pulo
            { image: tPoseImage, offsetX: 0, offsetY: -8, scale: 1.05, rotation: 0 }, // Descida 1
            { image: tPoseImage, offsetX: 0, offsetY: -6, scale: 1.02, rotation: 0 }, // Descida 2
            { image: tPoseImage, offsetX: 0, offsetY: -3, scale: 1.0, rotation: 0 }, // Quase pouso
            { image: tPoseImage, offsetX: 0, offsetY: -1, scale: 0.98, rotation: 0 }, // Pouso 1
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 0.95, rotation: 0 }, // Pouso 2
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0, rotation: 0 }   // Normal
        ];
    }

    // Criar animação de piscar - 8 frames
    createBlinkAnimation(tPoseImage) {
        return [
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0 }, // Olhos abertos 1
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0 }, // Olhos abertos 2
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0 }, // Olhos abertos 3
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 0.98 }, // Piscando 1
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 0.95 }, // Piscando 2
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 0.98 }, // Piscando 3
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0 }, // Olhos abertos 4
            { image: tPoseImage, offsetX: 0, offsetY: 0, scale: 1.0 }  // Olhos abertos 5
        ];
    }

    // Renderizar animação
    render(ctx, x, y, characterName) {
        const frame = this.getCurrentFrame();
        if (!frame) return;

        ctx.save();
        
        // Aplicar transformações
        ctx.translate(x + frame.offsetX, y + frame.offsetY);
        if (frame.rotation) {
            ctx.rotate(frame.rotation * Math.PI / 180);
        }
        if (frame.scale !== 1.0) {
            ctx.scale(frame.scale, frame.scale);
        }

        // Desenhar imagem
        if (frame.image) {
            ctx.drawImage(frame.image, -frame.image.width / 2, -frame.image.height / 2);
        }

        ctx.restore();
    }

    // Obter informações da animação atual
    getAnimationInfo() {
        const frames = this.getCurrentFrames();
        return {
            name: this.currentAnimation,
            frameIndex: this.frameIndex,
            totalFrames: frames.length,
            currentFrame: this.getCurrentFrame()
        };
    }
}

// Sistema global de animações
window.animationSystem = new AnimationSystem();

// Função para carregar e configurar animações da Vega
window.setupVegaAnimations = function() {
    const vegaImage = new Image();
    vegaImage.onload = function() {
        console.log('🎭 Carregando animações da Vega...');
        window.animationSystem.createAnimationsFromTPose(vegaImage, 'vega');
        console.log('✅ Animações da Vega carregadas!');
        console.log('🎬 Animações disponíveis:', Object.keys(window.animationSystem.animations.get('vega')));
    };
    vegaImage.src = 'assets/images/characters/heroes/vega/vegaT.png';
};

// Função de debug para animações
window.debugAnimations = function() {
    console.log('🎭 Debug do Sistema de Animações:');
    console.log('- Animação atual:', window.animationSystem.currentAnimation);
    console.log('- Frame atual:', window.animationSystem.frameIndex);
    console.log('- Personagens:', Array.from(window.animationSystem.animations.keys()));
    
    if (window.animationSystem.animations.has('vega')) {
        const vegaAnims = window.animationSystem.animations.get('vega');
        console.log('- Animações da Vega:', Object.keys(vegaAnims));
    }
};

// Função para testar animações
window.testAnimation = function(animationName) {
    if (window.animationSystem) {
        window.animationSystem.setAnimation(animationName);
        console.log(`🎬 Testando animação: ${animationName}`);
    } else {
        console.log('❌ Sistema de animações não inicializado');
    }
};

console.log('🎭 Sistema de Animações carregado!');
console.log('🔧 Comandos disponíveis:');
console.log('  - setupVegaAnimations() - Carregar animações da Vega');
console.log('  - debugAnimations() - Debug do sistema');
console.log('  - testAnimation(name) - Testar animação específica');
