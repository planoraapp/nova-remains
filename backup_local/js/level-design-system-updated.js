// ========================================
// SISTEMA DE LEVEL DESIGN ATUALIZADO COM OVERLAYS
// ========================================

// Modificações específicas para integrar com o sistema de overlays

// Substituir a função showGameOverScreen no arquivo level-design-system.js
function showGameOverScreen() {
    if (window.gameOverlaySystem) {
        window.gameOverlaySystem.showGameOver();
    } else {
        // Fallback para o sistema antigo
        alert('💀 Game Over!\n\nTodas as vidas foram perdidas!');
    }
}

// Substituir a função showMissionCompleteScreen no arquivo level-design-system.js
function showMissionCompleteScreen(rewards = {}) {
    if (window.gameOverlaySystem) {
        window.gameOverlaySystem.showMissionComplete(rewards);
    } else {
        // Fallback para o sistema antigo
        alert('🎉 Missão Completada!\n\nParabéns! Você limpou todas as seções!');
    }
}

// Substituir a função createProgressIndicator no arquivo level-design-system.js
function createProgressIndicator(section) {
    const indicator = {
        x: section.x + section.width - 100,
        y: section.height / 2 - 50,
        width: 80,
        height: 100,
        type: 'progress_portal',
        section: section.index,
        active: true,
        animation: 0
    };
    
    section.progressIndicator = indicator;
    
    // Mostrar overlay de seção limpa
    if (window.gameOverlaySystem) {
        window.gameOverlaySystem.showSectionCleared(section.index + 1, window.levelDesignSystem.totalSections);
    }
}

// Substituir a função updateRespawn no arquivo level-design-system.js
function updateRespawn(deltaTime) {
    if (this.livesSystem.respawnTimer > 0) {
        this.livesSystem.respawnTimer -= deltaTime;
        
        // Mostrar overlay de respawn
        if (window.gameOverlaySystem && this.livesSystem.respawnTimer > 0) {
            const seconds = Math.ceil(this.livesSystem.respawnTimer / 1000);
            window.gameOverlaySystem.showRespawnTimer(seconds);
        }
        
        if (this.livesSystem.respawnTimer <= 0) {
            this.respawnPlayer();
            if (window.gameOverlaySystem) {
                window.gameOverlaySystem.hideOverlay();
            }
        }
    }
    
    // Atualizar invencibilidade
    if (this.livesSystem.invulnerabilityTimer > 0) {
        this.livesSystem.invulnerabilityTimer -= deltaTime;
    }
}

// Adicionar função para mostrar confirmação de saída
function showExitConfirmation() {
    if (window.gameOverlaySystem) {
        window.gameOverlaySystem.showExitConfirmation();
    } else {
        if (confirm('Tem certeza que deseja sair da missão? Todo o progresso será perdido.')) {
            returnToMap();
        }
    }
}

// Modificar a função exitMission no arquivo index.html
function exitMission() {
    showExitConfirmation();
}

// Modificar a função pauseMission no arquivo index.html
function pauseMission() {
    if (window.gameOverlaySystem) {
        window.gameOverlaySystem.showPauseMenu();
    } else {
        alert('Missão pausada. Pressione OK para continuar.');
    }
}

console.log('🔄 Sistema de Level Design atualizado com overlays!');
