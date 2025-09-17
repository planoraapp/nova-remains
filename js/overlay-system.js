// ========================================
// SISTEMA DE OVERLAYS PARA GAME-WINDOW
// ========================================

class GameOverlaySystem {
    constructor() {
        this.activeOverlay = null;
        this.gameWindow = null;
    }
    
    initialize() {
        this.gameWindow = document.querySelector('.game-window');
        if (!this.gameWindow) {
            console.error('❌ Game window não encontrado!');
            return;
        }
        
        console.log('✅ Sistema de Overlays inicializado!');
    }
    
    // ========================================
    // OVERLAY DE GAME OVER
    // ========================================
    
    showGameOver() {
        const overlayHTML = `
            <div class="game-overlay game-over-overlay active">
                <div class="overlay-content">
                    <div class="overlay-title">💀 Game Over</div>
                    <div class="overlay-message">
                        Todas as vidas foram perdidas!<br>
                        Você pode tentar novamente ou voltar ao mapa.
                    </div>
                    <div class="overlay-buttons">
                        <button class="overlay-btn" onclick="gameOverlaySystem.retryMission()">
                            🔄 Tentar Novamente
                        </button>
                        <button class="overlay-btn secondary" onclick="gameOverlaySystem.returnToMap()">
                            🗺️ Voltar ao Mapa
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showOverlay(overlayHTML, 'game-over');
    }
    
    // ========================================
    // OVERLAY DE MISSÃO COMPLETA
    // ========================================
    
    showMissionComplete(rewards) {
        const overlayHTML = `
            <div class="game-overlay mission-complete-overlay active">
                <div class="overlay-content">
                    <div class="overlay-title">🎉 Missão Completa!</div>
                    <div class="overlay-message">
                        Parabéns! Você limpou todas as seções!<br><br>
                        <strong>Recompensas:</strong><br>
                        💰 ${rewards.gold || 0} Ouro<br>
                        ⭐ ${rewards.exp || 0} EXP<br>
                        ${rewards.items ? `🎁 ${rewards.items.length} Itens` : ''}
                    </div>
                    <div class="overlay-buttons">
                        <button class="overlay-btn" onclick="gameOverlaySystem.returnToMap()">
                            🗺️ Voltar ao Mapa
                        </button>
                        <button class="overlay-btn secondary" onclick="gameOverlaySystem.retryMission()">
                            🔄 Jogar Novamente
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showOverlay(overlayHTML, 'mission-complete');
    }
    
    // ========================================
    // OVERLAY DE CONFIRMAÇÃO DE SAÍDA
    // ========================================
    
    showExitConfirmation() {
        const overlayHTML = `
            <div class="game-overlay exit-confirmation-overlay active">
                <div class="overlay-content">
                    <div class="overlay-title">⚠️ Confirmar Saída</div>
                    <div class="overlay-message">
                        Tem certeza que deseja sair da missão?<br>
                        Todo o progresso será perdido!
                    </div>
                    <div class="overlay-buttons">
                        <button class="overlay-btn danger" onclick="gameOverlaySystem.confirmExit()">
                            🚪 Sim, Sair
                        </button>
                        <button class="overlay-btn secondary" onclick="gameOverlaySystem.hideOverlay()">
                            ❌ Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showOverlay(overlayHTML, 'exit-confirmation');
    }
    
    // ========================================
    // OVERLAY DE PAUSA
    // ========================================
    
    showPauseMenu() {
        const overlayHTML = `
            <div class="game-overlay pause-overlay active">
                <div class="overlay-content">
                    <div class="overlay-title">⏸️ Jogo Pausado</div>
                    <div class="overlay-message">
                        O jogo está pausado.<br>
                        Escolha uma opção:
                    </div>
                    <div class="overlay-buttons">
                        <button class="overlay-btn" onclick="gameOverlaySystem.resumeGame()">
                            ▶️ Continuar
                        </button>
                        <button class="overlay-btn secondary" onclick="gameOverlaySystem.showExitConfirmation()">
                            🚪 Sair da Missão
                        </button>
                        <button class="overlay-btn secondary" onclick="gameOverlaySystem.showSettings()">
                            ⚙️ Configurações
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showOverlay(overlayHTML, 'pause');
    }
    
    // ========================================
    // OVERLAY DE SEÇÃO LIMPA
    // ========================================
    
    showSectionCleared(sectionNumber, totalSections) {
        const overlayHTML = `
            <div class="game-overlay section-cleared-overlay active">
                <div class="overlay-content">
                    <div class="overlay-title">✅ Seção Limpa!</div>
                    <div class="overlay-message">
                        Seção ${sectionNumber} de ${totalSections} completada!<br>
                        Toque no portal "GO!" para continuar.
                    </div>
                    <div class="overlay-buttons">
                        <button class="overlay-btn" onclick="gameOverlaySystem.hideOverlay()">
                            👍 Entendi
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showOverlay(overlayHTML, 'section-cleared');
        
        // Auto-hide após 3 segundos
        setTimeout(() => {
            this.hideOverlay();
        }, 3000);
    }
    
    // ========================================
    // OVERLAY DE RESPAWN
    // ========================================
    
    showRespawnTimer(seconds) {
        const overlayHTML = `
            <div class="game-overlay respawn-overlay active">
                <div class="overlay-content">
                    <div class="overlay-title">💀 Você Morreu</div>
                    <div class="overlay-message">
                        Respawnando em ${seconds} segundos...<br>
                        Vidas restantes: ${window.levelDesignSystem?.livesSystem.currentLives || 0}
                    </div>
                    <div class="overlay-buttons">
                        <button class="overlay-btn secondary" onclick="gameOverlaySystem.returnToMap()">
                            🗺️ Voltar ao Mapa
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showOverlay(overlayHTML, 'respawn');
    }
    
    // ========================================
    // MÉTODOS DE CONTROLE
    // ========================================
    
    showOverlay(html, type) {
        if (!this.gameWindow) {
            console.error('❌ Game window não encontrado!');
            return;
        }
        
        // Remover overlay anterior se existir
        this.hideOverlay();
        
        // Criar novo overlay
        const overlayElement = document.createElement('div');
        overlayElement.innerHTML = html;
        const overlay = overlayElement.firstElementChild;
        
        // Adicionar ao game-window
        this.gameWindow.appendChild(overlay);
        this.activeOverlay = overlay;
        
        // Animar entrada
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        console.log(`📱 Overlay ${type} exibido!`);
    }
    
    hideOverlay() {
        if (this.activeOverlay) {
            this.activeOverlay.classList.remove('active');
            
            setTimeout(() => {
                if (this.activeOverlay && this.activeOverlay.parentNode) {
                    this.activeOverlay.parentNode.removeChild(this.activeOverlay);
                }
                this.activeOverlay = null;
            }, 300);
        }
    }
    
    // ========================================
    // AÇÕES DOS BOTÕES
    // ========================================
    
    retryMission() {
        this.hideOverlay();
        
        // Reiniciar missão
        if (window.levelDesignSystem) {
            window.levelDesignSystem.livesSystem.currentLives = window.levelDesignSystem.livesSystem.maxLives;
            window.levelDesignSystem.currentSection = 0;
            window.levelDesignSystem.loadSection(0);
        }
        
        console.log('🔄 Missão reiniciada!');
    }
    
    returnToMap() {
        this.hideOverlay();
        
        // Fechar tela de combate
        const combatContainer = document.querySelector('.mission-combat-container');
        if (combatContainer) {
            combatContainer.remove();
        }
        
        console.log('🗺️ Retornando ao mapa do mundo!');
    }
    
    confirmExit() {
        this.hideOverlay();
        this.returnToMap();
    }
    
    resumeGame() {
        this.hideOverlay();
        
        // Retomar jogo (se houver sistema de pausa)
        if (window.missionState) {
            window.missionState.gameRunning = true;
        }
        
        console.log('▶️ Jogo retomado!');
    }
    
    showSettings() {
        // Implementar configurações se necessário
        console.log('⚙️ Configurações (não implementado ainda)');
    }
    
    // ========================================
    // CONTROLES DE TECLADO
    // ========================================
    
    handleKeyPress(event) {
        // ESC para pausar/despausar
        if (event.key === 'Escape') {
            if (this.activeOverlay) {
                if (this.activeOverlay.classList.contains('pause-overlay')) {
                    this.resumeGame();
                } else {
                    this.hideOverlay();
                }
            } else {
                this.showPauseMenu();
            }
            event.preventDefault();
        }
        
        // Enter para confirmar (se overlay ativo)
        if (event.key === 'Enter' && this.activeOverlay) {
            const confirmBtn = this.activeOverlay.querySelector('.overlay-btn:not(.secondary)');
            if (confirmBtn) {
                confirmBtn.click();
            }
            event.preventDefault();
        }
        
        // Escape para cancelar (se overlay ativo)
        if (event.key === 'Escape' && this.activeOverlay) {
            const cancelBtn = this.activeOverlay.querySelector('.overlay-btn.secondary');
            if (cancelBtn) {
                cancelBtn.click();
            } else {
                this.hideOverlay();
            }
            event.preventDefault();
        }
    }
}

// ========================================
// INSTÂNCIA GLOBAL
// ========================================

window.GameOverlaySystem = GameOverlaySystem;
window.gameOverlaySystem = new GameOverlaySystem();

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.gameOverlaySystem.initialize();
    
    // Adicionar listener de teclado
    document.addEventListener('keydown', (event) => {
        window.gameOverlaySystem.handleKeyPress(event);
    });
});

console.log('📱 Sistema de Overlays carregado com sucesso!');
