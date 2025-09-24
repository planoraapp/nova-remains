// 🔧 Nova Remains - Script de Correção de Canvas
// Execute este script no console do navegador (F12 -> Console)

console.log('🚀 Iniciando correção do canvas...');

function fixCanvasVisibility() {
    console.log('🔍 Procurando canvas do jogo...');
    
    const gameCanvas = document.getElementById('gameCanvas');
    
    if (!gameCanvas) {
        console.error('❌ Canvas gameCanvas não encontrado!');
        console.log('💡 Tentando criar canvas...');
        createNewCanvas();
        return;
    }
    
    console.log('✅ Canvas encontrado:', gameCanvas);
    
    // Aplicar estilos críticos
    gameCanvas.style.cssText = `
        display: block !important;
        visibility: visible !important;
        position: fixed !important;
        top: 50px !important;
        left: 50px !important;
        z-index: 9999 !important;
        background-color: #1a1a2e !important;
        width: 800px !important;
        height: 600px !important;
        border: 3px solid #00ff00 !important;
        box-shadow: 0 0 30px #00ff00 !important;
    `;
    
    console.log('🎨 Estilos aplicados ao canvas');
    
    // Mover para o body se necessário
    if (gameCanvas.parentElement !== document.body) {
        document.body.appendChild(gameCanvas);
        console.log('🔄 Canvas movido para o body');
    }
    
    // Testar desenho
    if (window.game && window.game.ctx) {
        const ctx = window.game.ctx;
        
        // Limpar e desenhar fundo
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        
        // Desenhar teste de cores
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(10, 10, 100, 100);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(120, 10, 100, 100);
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(230, 10, 100, 100);
        
        // Desenhar texto
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText('NOVA REMAINS', 10, 150);
        ctx.fillText('Canvas Funcionando!', 10, 180);
        
        console.log('🎨 Teste de desenho aplicado');
    }
    
    // Verificar resultado
    setTimeout(() => {
        const rect = gameCanvas.getBoundingClientRect();
        console.log('📐 Dimensões do canvas:', rect.width, 'x', rect.height);
        console.log('📍 Posição:', rect.x, rect.y);
        
        if (rect.width > 0 && rect.height > 0) {
            console.log('🎉 Canvas corrigido com sucesso!');
            console.log('👀 Você deve ver um canvas com borda verde no canto superior esquerdo');
        } else {
            console.log('❌ Canvas ainda não está visível');
        }
    }, 100);
}

function createNewCanvas() {
    console.log('🆕 Criando novo canvas...');
    
    const canvas = document.createElement('canvas');
    canvas.id = 'gameCanvas';
    canvas.width = 800;
    canvas.height = 600;
    
    // Aplicar estilos
    canvas.style.cssText = `
        display: block !important;
        visibility: visible !important;
        position: fixed !important;
        top: 50px !important;
        left: 50px !important;
        z-index: 9999 !important;
        background-color: #1a1a2e !important;
        width: 800px !important;
        height: 600px !important;
        border: 3px solid #00ff00 !important;
        box-shadow: 0 0 30px #00ff00 !important;
    `;
    
    document.body.appendChild(canvas);
    
    // Desenhar teste
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 800, 600);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '32px Arial';
    ctx.fillText('NOVA REMAINS', 200, 300);
    ctx.fillText('Canvas Criado!', 250, 350);
    
    console.log('✅ Novo canvas criado e visível');
}

function debugCanvas() {
    console.log('🔍 Debug do Canvas:');
    
    const gameCanvas = document.getElementById('gameCanvas');
    
    if (gameCanvas) {
        const rect = gameCanvas.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(gameCanvas);
        
        console.log('📊 Informações do Canvas:');
        console.log('- Elemento:', gameCanvas);
        console.log('- Dimensões:', gameCanvas.width, 'x', gameCanvas.height);
        console.log('- Posição:', rect.x, rect.y);
        console.log('- Tamanho:', rect.width, 'x', rect.height);
        console.log('- Display:', computedStyle.display);
        console.log('- Visibility:', computedStyle.visibility);
        console.log('- Position:', computedStyle.position);
        console.log('- Z-index:', computedStyle.zIndex);
        console.log('- Parent:', gameCanvas.parentElement);
        
        if (window.game) {
            console.log('- Game instance:', window.game);
            console.log('- Context:', window.game.ctx);
        }
    } else {
        console.log('❌ Canvas não encontrado');
    }
}

function forceGameStart() {
    console.log('🎮 Forçando início do jogo...');
    
    if (window.game) {
        window.game.gameState = 'playing';
        console.log('✅ Estado do jogo alterado para "playing"');
        
        if (!window.game.gameLoopRunning) {
            window.game.gameLoop();
            window.game.gameLoopRunning = true;
            console.log('✅ Loop do jogo iniciado');
        }
    } else {
        console.log('❌ Instância do jogo não encontrada');
    }
}

// Executar correção automaticamente
fixCanvasVisibility();

// Disponibilizar funções globalmente
window.fixCanvas = fixCanvasVisibility;
window.debugCanvas = debugCanvas;
window.forceGameStart = forceGameStart;

console.log('🔧 Funções disponíveis:');
console.log('- fixCanvas() - Corrigir visibilidade do canvas');
console.log('- debugCanvas() - Debug do canvas');
console.log('- forceGameStart() - Forçar início do jogo');
