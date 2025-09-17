// ========================================
// CORREÇÃO: SELEÇÃO DE PERSONAGEM E NAVEGAÇÃO
// ========================================

// Função para selecionar personagem
function selectCharacter(characterId) {
    console.log('Personagem selecionado:', characterId);
    
    // Salvar personagem selecionado
    localStorage.setItem('selectedCharacter', characterId);
    
    // Esconder menu de seleção de personagem
    const characterMenu = document.getElementById('characterMenu');
    if (characterMenu) {
        characterMenu.style.display = 'none';
    }
    
    // Mostrar mapa mundi
    const worldMapMenu = document.getElementById('worldMapMenu');
    if (worldMapMenu) {
        worldMapMenu.style.display = 'block';
    }
    
    // Atualizar interface com personagem selecionado
    updateSelectedCharacterUI(characterId);
}

// Função para atualizar UI com personagem selecionado
function updateSelectedCharacterUI(characterId) {
    const characterNames = {
        'juno': 'Juno - Guerreira Destemida',
        'atlas': 'Atlas - Arqueiro Preciso', 
        'vega': 'Vega - Mago Enigmático',
        'kai': 'Kai - Ninja Ágil'
    };
    
    // Atualizar nome do jogador se houver elemento
    const playerNameElement = document.querySelector('.player-name');
    if (playerNameElement) {
        playerNameElement.textContent = characterNames[characterId] || characterId;
    }
    
    // Mostrar notificação de seleção
    console.log(`✅ Personagem ${characterNames[characterId]} selecionado!`);
    
    // Opcional: Mostrar uma notificação visual
    showNotification(`Personagem selecionado: ${characterNames[characterId]}`, 'success');
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Criar elemento de notificação se não existir
    let notification = document.getElementById('game-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'game-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            transition: all 0.3s ease;
            transform: translateX(100%);
        `;
        document.body.appendChild(notification);
    }
    
    // Estilizar baseado no tipo
    const styles = {
        success: 'background: linear-gradient(135deg, #32CD32, #00FF7F); border: 2px solid #32CD32;',
        error: 'background: linear-gradient(135deg, #DC143C, #FF6347); border: 2px solid #DC143C;',
        info: 'background: linear-gradient(135deg, #4169E1, #87CEEB); border: 2px solid #4169E1;'
    };
    
    notification.style.cssText += styles[type] || styles.info;
    notification.textContent = message;
    
    // Mostrar notificação
    notification.style.transform = 'translateX(0)';
    
    // Esconder após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
    }, 3000);
}

// Adicionar event listeners quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Inicializando correção de navegação...');
    
    // Event listeners para botões de seleção de personagem
    const selectButtons = document.querySelectorAll('.select-character');
    console.log(`📋 Encontrados ${selectButtons.length} botões de seleção`);
    
    selectButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const characterId = e.target.getAttribute('data-character');
            console.log(`🎮 Clique detectado no personagem: ${characterId}`);
            
            if (characterId) {
                selectCharacter(characterId);
            } else {
                console.error('❌ ID do personagem não encontrado');
            }
        });
    });
    
    // Log de confirmação
    if (selectButtons.length > 0) {
        console.log('✅ Event listeners de seleção de personagem adicionados com sucesso!');
        showNotification('Sistema de navegação carregado!', 'success');
    } else {
        console.warn('⚠️ Nenhum botão de seleção encontrado');
    }
});

// Função para debug - verificar estado atual
function debugCharacterSelection() {
    console.log('=== DEBUG: Character Selection ===');
    console.log('Botões encontrados:', document.querySelectorAll('.select-character').length);
    console.log('Menu de personagem:', document.getElementById('characterMenu') ? 'Encontrado' : 'Não encontrado');
    console.log('Menu mapa mundi:', document.getElementById('worldMapMenu') ? 'Encontrado' : 'Não encontrado');
    console.log('Personagem salvo:', localStorage.getItem('selectedCharacter'));
}

// Disponibilizar função globalmente para debug
window.debugCharacterSelection = debugCharacterSelection;
window.selectCharacter = selectCharacter;
