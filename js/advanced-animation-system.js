// Sistema Avançado de Animação - Baseado no Manual de Produção
// Implementa princípios de rigging 2D e animação esquelética

class AdvancedAnimationSystem {
    constructor() {
        this.characters = new Map();
        this.currentCharacter = null;
        this.bones = new Map();
        this.animations = new Map();
        this.frameIndex = 0;
        this.frameTime = 0;
        this.frameDuration = 100; // ms por frame
        this.isPlaying = false;
        this.currentAnimation = 'idle';
        
        // Configurações de animação baseadas no manual
        this.animationConfig = {
            idle: { frames: 60, fps: 24, loop: true, priority: 1 },
            blink: { frames: 3, fps: 12, loop: false, priority: 1 },
            walk: { frames: 16, fps: 24, loop: true, priority: 1 },
            run: { frames: 12, fps: 24, loop: true, priority: 1 },
            jump_start: { frames: 5, fps: 24, loop: false, priority: 2 },
            jump_air: { frames: 12, fps: 24, loop: true, priority: 2 },
            jump_land: { frames: 5, fps: 24, loop: false, priority: 2 },
            attack1: { frames: 8, fps: 24, loop: false, priority: 1 },
            attack2: { frames: 6, fps: 24, loop: false, priority: 1 },
            attack3: { frames: 10, fps: 24, loop: false, priority: 1 },
            hit: { frames: 6, fps: 24, loop: false, priority: 2 },
            defeated: { frames: 30, fps: 24, loop: false, priority: 3 }
        };
    }

    // Adicionar personagem com sistema de rigging
    addCharacter(characterName, tPoseImage) {
        const character = {
            name: characterName,
            image: tPoseImage,
            bones: this.createBoneStructure(characterName),
            animations: new Map(),
            currentPose: this.createNeutralPose()
        };
        
        this.characters.set(characterName, character);
        this.createCharacterAnimations(characterName);
        return character;
    }

    // Criar estrutura de ossos baseada no manual
    createBoneStructure(characterName) {
        const bones = new Map();
        
        // Estrutura hierárquica de ossos
        const boneStructure = {
            // Osso raiz (pélvis)
            root: { 
                name: 'root', 
                parent: null, 
                x: 0, 
                y: 0, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.8 } // Centro de gravidade
            },
            
            // Coluna vertebral
            spine_lower: { 
                name: 'spine_lower', 
                parent: 'root', 
                x: 0, 
                y: -20, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            spine_upper: { 
                name: 'spine_upper', 
                parent: 'spine_lower', 
                x: 0, 
                y: -30, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            
            // Cabeça e pescoço
            neck: { 
                name: 'neck', 
                parent: 'spine_upper', 
                x: 0, 
                y: -25, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            head: { 
                name: 'head', 
                parent: 'neck', 
                x: 0, 
                y: -20, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            
            // Braços
            shoulder_left: { 
                name: 'shoulder_left', 
                parent: 'spine_upper', 
                x: -25, 
                y: -10, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            arm_upper_left: { 
                name: 'arm_upper_left', 
                parent: 'shoulder_left', 
                x: -15, 
                y: -20, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.2 }
            },
            arm_lower_left: { 
                name: 'arm_lower_left', 
                parent: 'arm_upper_left', 
                x: -10, 
                y: -25, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.2 }
            },
            hand_left: { 
                name: 'hand_left', 
                parent: 'arm_lower_left', 
                x: -5, 
                y: -15, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            
            shoulder_right: { 
                name: 'shoulder_right', 
                parent: 'spine_upper', 
                x: 25, 
                y: -10, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            arm_upper_right: { 
                name: 'arm_upper_right', 
                parent: 'shoulder_right', 
                x: 15, 
                y: -20, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.2 }
            },
            arm_lower_right: { 
                name: 'arm_lower_right', 
                parent: 'arm_upper_right', 
                x: 10, 
                y: -25, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.2 }
            },
            hand_right: { 
                name: 'hand_right', 
                parent: 'arm_lower_right', 
                x: 5, 
                y: -15, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            
            // Pernas
            hip_left: { 
                name: 'hip_left', 
                parent: 'root', 
                x: -15, 
                y: 10, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            thigh_left: { 
                name: 'thigh_left', 
                parent: 'hip_left', 
                x: 0, 
                y: 20, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.2 }
            },
            shin_left: { 
                name: 'shin_left', 
                parent: 'thigh_left', 
                x: 0, 
                y: 25, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.2 }
            },
            foot_left: { 
                name: 'foot_left', 
                parent: 'shin_left', 
                x: 0, 
                y: 20, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            
            hip_right: { 
                name: 'hip_right', 
                parent: 'root', 
                x: 15, 
                y: 10, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            },
            thigh_right: { 
                name: 'thigh_right', 
                parent: 'hip_right', 
                x: 0, 
                y: 20, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.2 }
            },
            shin_right: { 
                name: 'shin_right', 
                parent: 'thigh_right', 
                x: 0, 
                y: 25, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.2 }
            },
            foot_right: { 
                name: 'foot_right', 
                parent: 'shin_right', 
                x: 0, 
                y: 20, 
                rotation: 0, 
                scale: 1,
                pivot: { x: 0.5, y: 0.5 }
            }
        };

        // Adicionar ossos ao mapa
        for (const [boneName, boneData] of Object.entries(boneStructure)) {
            bones.set(boneName, { ...boneData });
        }

        return bones;
    }

    // Criar pose neutra (T-pose)
    createNeutralPose() {
        const pose = new Map();
        
        // Valores neutros para todos os ossos
        for (const [boneName, boneData] of this.bones) {
            pose.set(boneName, {
                x: boneData.x,
                y: boneData.y,
                rotation: boneData.rotation,
                scale: boneData.scale
            });
        }
        
        return pose;
    }

    // Criar animações específicas do personagem baseadas no manual
    createCharacterAnimations(characterName) {
        const character = this.characters.get(characterName);
        if (!character) return;

        // Animações baseadas no manual
        character.animations.set('idle', this.createIdleAnimation(characterName));
        character.animations.set('blink', this.createBlinkAnimation(characterName));
        character.animations.set('walk', this.createWalkAnimation(characterName));
        character.animations.set('run', this.createRunAnimation(characterName));
        character.animations.set('jump_start', this.createJumpStartAnimation(characterName));
        character.animations.set('jump_air', this.createJumpAirAnimation(characterName));
        character.animations.set('jump_land', this.createJumpLandAnimation(characterName));
        
        // Animações específicas por personagem
        if (characterName === 'vega') {
            character.animations.set('attack1', this.createVegaAttack1Animation());
            character.animations.set('attack2', this.createVegaAttack2Animation());
            character.animations.set('attack3', this.createVegaAttack3Animation());
        } else if (characterName === 'juno') {
            character.animations.set('attack1', this.createJunoAttack1Animation());
            character.animations.set('attack2', this.createJunoAttack2Animation());
            character.animations.set('attack3', this.createJunoAttack3Animation());
        } else if (characterName === 'atlas') {
            character.animations.set('attack1', this.createAtlasAttack1Animation());
            character.animations.set('attack2', this.createAtlasAttack2Animation());
            character.animations.set('attack3', this.createAtlasAttack3Animation());
        } else if (characterName === 'kai') {
            character.animations.set('attack1', this.createKaiAttack1Animation());
            character.animations.set('attack2', this.createKaiAttack2Animation());
            character.animations.set('attack3', this.createKaiAttack3Animation());
        }
    }

    // Animação de Idle - Baseada no manual (48-60 quadros)
    createIdleAnimation(characterName) {
        const frames = [];
        const frameCount = 60;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Movimento sutil de respiração
            const breathOffset = Math.sin(progress * Math.PI * 2) * 2;
            
            // Movimento de peso entre os pés
            const weightShift = Math.sin(progress * Math.PI * 4) * 1;
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                // Aplicar movimento de respiração ao torso
                if (boneName.includes('spine') || boneName === 'root') {
                    y += breathOffset;
                }
                
                // Aplicar mudança de peso
                if (boneName.includes('hip_left')) {
                    x += weightShift;
                } else if (boneName.includes('hip_right')) {
                    x -= weightShift;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Animação de Piscar - Baseada no manual (3 quadros)
    createBlinkAnimation(characterName) {
        const frames = [];
        
        // Olhos abertos
        frames.push(this.createNeutralPose());
        
        // Piscando
        const blinkFrame = this.createNeutralPose();
        const headBone = blinkFrame.get('head');
        if (headBone) {
            headBone.scale = 0.95; // Comprimir ligeiramente
        }
        frames.push(blinkFrame);
        
        // Olhos abertos novamente
        frames.push(this.createNeutralPose());
        
        return frames;
    }

    // Animação de Caminhada - Baseada no manual (16 quadros)
    createWalkAnimation(characterName) {
        const frames = [];
        const frameCount = 16;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Ciclo de caminhada baseado nas 4 poses chave
            const walkCycle = this.calculateWalkCycle(progress);
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                // Aplicar movimento de caminhada
                if (boneName === 'root') {
                    x += walkCycle.horizontalOffset;
                    y += walkCycle.verticalOffset;
                } else if (boneName.includes('thigh_left')) {
                    rotation = walkCycle.leftThighRotation;
                } else if (boneName.includes('thigh_right')) {
                    rotation = walkCycle.rightThighRotation;
                } else if (boneName.includes('shin_left')) {
                    rotation = walkCycle.leftShinRotation;
                } else if (boneName.includes('shin_right')) {
                    rotation = walkCycle.rightShinRotation;
                } else if (boneName.includes('arm_upper_left')) {
                    rotation = walkCycle.leftArmRotation;
                } else if (boneName.includes('arm_upper_right')) {
                    rotation = walkCycle.rightArmRotation;
                } else if (boneName.includes('spine_upper')) {
                    rotation = walkCycle.spineRotation;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Calcular ciclo de caminhada baseado nas 4 poses chave
    calculateWalkCycle(progress) {
        const cycle = progress * Math.PI * 2;
        
        return {
            horizontalOffset: Math.sin(cycle) * 3,
            verticalOffset: Math.abs(Math.sin(cycle)) * 2,
            leftThighRotation: Math.sin(cycle) * 15,
            rightThighRotation: Math.sin(cycle + Math.PI) * 15,
            leftShinRotation: Math.max(0, Math.sin(cycle) * 20),
            rightShinRotation: Math.max(0, Math.sin(cycle + Math.PI) * 20),
            leftArmRotation: Math.sin(cycle + Math.PI) * 10,
            rightArmRotation: Math.sin(cycle) * 10,
            spineRotation: Math.sin(cycle) * 2
        };
    }

    // Animação de Corrida - Baseada no manual (12 quadros)
    createRunAnimation(characterName) {
        const frames = [];
        const frameCount = 12;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Ciclo de corrida mais dinâmico
            const runCycle = this.calculateRunCycle(progress);
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                if (boneName === 'root') {
                    x += runCycle.horizontalOffset;
                    y += runCycle.verticalOffset;
                } else if (boneName.includes('thigh_left')) {
                    rotation = runCycle.leftThighRotation;
                } else if (boneName.includes('thigh_right')) {
                    rotation = runCycle.rightThighRotation;
                } else if (boneName.includes('shin_left')) {
                    rotation = runCycle.leftShinRotation;
                } else if (boneName.includes('shin_right')) {
                    rotation = runCycle.rightShinRotation;
                } else if (boneName.includes('arm_upper_left')) {
                    rotation = runCycle.leftArmRotation;
                } else if (boneName.includes('arm_upper_right')) {
                    rotation = runCycle.rightArmRotation;
                } else if (boneName.includes('spine_upper')) {
                    rotation = runCycle.spineRotation;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Calcular ciclo de corrida
    calculateRunCycle(progress) {
        const cycle = progress * Math.PI * 2;
        
        return {
            horizontalOffset: Math.sin(cycle) * 5,
            verticalOffset: Math.abs(Math.sin(cycle)) * 4,
            leftThighRotation: Math.sin(cycle) * 25,
            rightThighRotation: Math.sin(cycle + Math.PI) * 25,
            leftShinRotation: Math.max(0, Math.sin(cycle) * 30),
            rightShinRotation: Math.max(0, Math.sin(cycle + Math.PI) * 30),
            leftArmRotation: Math.sin(cycle + Math.PI) * 15,
            rightArmRotation: Math.sin(cycle) * 15,
            spineRotation: Math.sin(cycle) * 5
        };
    }

    // Animação de Salto - Decolagem (5 quadros)
    createJumpStartAnimation(characterName) {
        const frames = [];
        const frameCount = 5;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Antecipação - agachamento antes do salto
            const anticipation = this.calculateJumpAnticipation(progress);
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                if (boneName === 'root') {
                    y += anticipation.verticalOffset;
                } else if (boneName.includes('thigh_left') || boneName.includes('thigh_right')) {
                    rotation = anticipation.thighRotation;
                } else if (boneName.includes('shin_left') || boneName.includes('shin_right')) {
                    rotation = anticipation.shinRotation;
                } else if (boneName.includes('arm_upper_left') || boneName.includes('arm_upper_right')) {
                    rotation = anticipation.armRotation;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Calcular antecipação do salto
    calculateJumpAnticipation(progress) {
        return {
            verticalOffset: -progress * 10, // Agachamento
            thighRotation: progress * 20,
            shinRotation: progress * 30,
            armRotation: -progress * 15
        };
    }

    // Animação de Salto - No Ar (12 quadros)
    createJumpAirAnimation(characterName) {
        const frames = [];
        const frameCount = 12;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Movimento no ar
            const airMovement = this.calculateAirMovement(progress);
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                if (boneName === 'root') {
                    y += airMovement.verticalOffset;
                } else if (boneName.includes('thigh_left') || boneName.includes('thigh_right')) {
                    rotation = airMovement.thighRotation;
                } else if (boneName.includes('shin_left') || boneName.includes('shin_right')) {
                    rotation = airMovement.shinRotation;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Calcular movimento no ar
    calculateAirMovement(progress) {
        const cycle = progress * Math.PI * 2;
        
        return {
            verticalOffset: Math.sin(cycle) * 15,
            thighRotation: Math.sin(cycle) * 10,
            shinRotation: Math.sin(cycle) * 15
        };
    }

    // Animação de Salto - Aterrissagem (5 quadros)
    createJumpLandAnimation(characterName) {
        const frames = [];
        const frameCount = 5;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Aterrissagem com compressão
            const landing = this.calculateLanding(progress);
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                if (boneName === 'root') {
                    y += landing.verticalOffset;
                } else if (boneName.includes('thigh_left') || boneName.includes('thigh_right')) {
                    rotation = landing.thighRotation;
                } else if (boneName.includes('shin_left') || boneName.includes('shin_right')) {
                    rotation = landing.shinRotation;
                }
                
                // Aplicar compressão (Squash and Stretch)
                if (boneName === 'root') {
                    scale = 1 + landing.compression;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Calcular aterrissagem
    calculateLanding(progress) {
        return {
            verticalOffset: -progress * 5,
            thighRotation: -progress * 15,
            shinRotation: -progress * 20,
            compression: -progress * 0.1 // Compressão do corpo
        };
    }

    // Animações específicas da Vega (Tecelã Arcana)
    createVegaAttack1Animation() {
        const frames = [];
        const frameCount = 8;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Reunir energia arcana
            const attack = this.calculateVegaAttack1(progress);
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                if (boneName.includes('arm_upper_left') || boneName.includes('arm_upper_right')) {
                    rotation = attack.armRotation;
                } else if (boneName.includes('arm_lower_left') || boneName.includes('arm_lower_right')) {
                    rotation = attack.forearmRotation;
                } else if (boneName.includes('hand_left') || boneName.includes('hand_right')) {
                    rotation = attack.handRotation;
                    scale = 1 + attack.handScale;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Calcular ataque 1 da Vega
    calculateVegaAttack1(progress) {
        return {
            armRotation: -progress * 30,
            forearmRotation: -progress * 45,
            handRotation: -progress * 60,
            handScale: progress * 0.2
        };
    }

    // Animações específicas da Juno (Cavaleira)
    createJunoAttack1Animation() {
        const frames = [];
        const frameCount = 8;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Corte horizontal
            const attack = this.calculateJunoAttack1(progress);
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                if (boneName.includes('spine_upper')) {
                    rotation = attack.spineRotation;
                } else if (boneName.includes('arm_upper_right')) {
                    rotation = attack.armRotation;
                } else if (boneName.includes('arm_lower_right')) {
                    rotation = attack.forearmRotation;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Calcular ataque 1 da Juno
    calculateJunoAttack1(progress) {
        return {
            spineRotation: progress * 45,
            armRotation: progress * 90,
            forearmRotation: progress * 60
        };
    }

    // Animações específicas do Atlas (Arqueiro)
    createAtlasAttack1Animation() {
        const frames = [];
        const frameCount = 8;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Tiro rápido
            const attack = this.calculateAtlasAttack1(progress);
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                if (boneName.includes('arm_upper_left')) {
                    rotation = attack.leftArmRotation;
                } else if (boneName.includes('arm_upper_right')) {
                    rotation = attack.rightArmRotation;
                } else if (boneName.includes('arm_lower_left')) {
                    rotation = attack.leftForearmRotation;
                } else if (boneName.includes('arm_lower_right')) {
                    rotation = attack.rightForearmRotation;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Calcular ataque 1 do Atlas
    calculateAtlasAttack1(progress) {
        return {
            leftArmRotation: -progress * 20,
            rightArmRotation: progress * 30,
            leftForearmRotation: -progress * 40,
            rightForearmRotation: progress * 50
        };
    }

    // Animações específicas do Kai (Ninja)
    createKaiAttack1Animation() {
        const frames = [];
        const frameCount = 8;
        
        for (let i = 0; i < frameCount; i++) {
            const progress = i / frameCount;
            const frame = new Map();
            
            // Corte duplo com dash
            const attack = this.calculateKaiAttack1(progress);
            
            for (const [boneName, boneData] of this.bones) {
                let x = boneData.x;
                let y = boneData.y;
                let rotation = boneData.rotation;
                let scale = boneData.scale;
                
                if (boneName === 'root') {
                    x += attack.horizontalOffset;
                } else if (boneName.includes('arm_upper_left') || boneName.includes('arm_upper_right')) {
                    rotation = attack.armRotation;
                } else if (boneName.includes('arm_lower_left') || boneName.includes('arm_lower_right')) {
                    rotation = attack.forearmRotation;
                }
                
                frame.set(boneName, { x, y, rotation, scale });
            }
            
            frames.push(frame);
        }
        
        return frames;
    }

    // Calcular ataque 1 do Kai
    calculateKaiAttack1(progress) {
        return {
            horizontalOffset: progress * 20,
            armRotation: progress * 60,
            forearmRotation: progress * 90
        };
    }

    // Métodos de controle de animação
    setCharacter(characterName) {
        this.currentCharacter = characterName;
    }

    setAnimation(animationName) {
        if (this.currentAnimation !== animationName) {
            this.currentAnimation = animationName;
            this.frameIndex = 0;
            this.frameTime = 0;
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
        if (!this.isPlaying || !this.currentCharacter) return;

        const character = this.characters.get(this.currentCharacter);
        if (!character) return;

        const animation = character.animations.get(this.currentAnimation);
        if (!animation) return;

        this.frameTime += deltaTime;
        const config = this.animationConfig[this.currentAnimation];
        
        if (this.frameTime >= config.frameDuration) {
            this.frameIndex++;
            if (this.frameIndex >= animation.length) {
                if (config.loop) {
                    this.frameIndex = 0;
                } else {
                    this.frameIndex = animation.length - 1;
                    this.isPlaying = false;
                }
            }
            this.frameTime = 0;
        }
    }

    getCurrentFrame() {
        if (!this.currentCharacter) return null;
        
        const character = this.characters.get(this.currentCharacter);
        if (!character) return null;
        
        const animation = character.animations.get(this.currentAnimation);
        if (!animation) return null;
        
        return animation[this.frameIndex] || null;
    }

    render(ctx, x, y, characterName) {
        const character = this.characters.get(characterName);
        if (!character) return;

        const frame = this.getCurrentFrame();
        if (!frame) return;

        ctx.save();
        ctx.translate(x, y);

        // Renderizar imagem base
        if (character.image) {
            ctx.drawImage(character.image, -character.image.width / 2, -character.image.height / 2);
        }

        ctx.restore();
    }

    // Métodos de debug
    getAnimationInfo() {
        return {
            character: this.currentCharacter,
            animation: this.currentAnimation,
            frameIndex: this.frameIndex,
            isPlaying: this.isPlaying,
            totalFrames: this.characters.get(this.currentCharacter)?.animations.get(this.currentAnimation)?.length || 0
        };
    }

    listAnimations(characterName) {
        const character = this.characters.get(characterName);
        if (!character) return [];
        
        return Array.from(character.animations.keys());
    }
}

// Sistema global de animação avançada
window.advancedAnimationSystem = new AdvancedAnimationSystem();

// Função para inicializar personagens
window.initAdvancedAnimations = function() {
    console.log('🎭 Inicializando sistema avançado de animações...');
    
    // Carregar Vega
    const vegaImage = new Image();
    vegaImage.onload = function() {
        window.advancedAnimationSystem.addCharacter('vega', vegaImage);
        console.log('✅ Vega adicionada ao sistema avançado!');
    };
    vegaImage.src = 'assets/images/characters/heroes/vega/vegaT.png';
    
    // Carregar outros personagens se disponíveis
    const characters = ['juno', 'atlas', 'kai'];
    characters.forEach(charName => {
        const img = new Image();
        img.onload = function() {
            window.advancedAnimationSystem.addCharacter(charName, img);
            console.log(`✅ ${charName} adicionado ao sistema avançado!`);
        };
        img.src = `assets/images/characters/heroes/${charName}/${charName}.png`;
    });
};

// Funções de debug
window.debugAdvancedAnimations = function() {
    console.log('🎭 Debug do Sistema Avançado de Animações:');
    console.log('- Personagens:', Array.from(window.advancedAnimationSystem.characters.keys()));
    console.log('- Animação atual:', window.advancedAnimationSystem.getAnimationInfo());
};

window.testAdvancedAnimation = function(characterName, animationName) {
    if (window.advancedAnimationSystem) {
        window.advancedAnimationSystem.setCharacter(characterName);
        window.advancedAnimationSystem.setAnimation(animationName);
        window.advancedAnimationSystem.play();
        console.log(`🎬 Testando animação ${animationName} do ${characterName}`);
    }
};

console.log('🎭 Sistema Avançado de Animações carregado!');
