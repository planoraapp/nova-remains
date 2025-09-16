// Arquivo principal de inicialização do jogo
// Este arquivo é carregado por último e inicializa tudo

// Aguardar o carregamento completo da página
window.addEventListener('load', () => {
    console.log('🎮 Inicializando Grand Chase Web...');
    
    // Verificar se todos os scripts foram carregados
    const requiredClasses = ['Game', 'Player', 'Enemy', 'Particle', 'Projectile', 'SpriteManager', 'CombatSystem', 'UIManager', 'ShopSystem', 'InventorySystem'];
    const missingClasses = requiredClasses.filter(className => typeof window[className] === 'undefined');
    
    if (missingClasses.length > 0) {
        console.error('❌ Classes não encontradas:', missingClasses);
        console.log('🔍 Verificando classes disponíveis:');
        console.log('Game:', typeof window.Game);
        console.log('Player:', typeof window.Player);
        console.log('Enemy:', typeof window.Enemy);
        console.log('Particle:', typeof window.Particle);
        console.log('Projectile:', typeof window.Projectile);
        console.log('SpriteManager:', typeof window.SpriteManager);
        console.log('CombatSystem:', typeof window.CombatSystem);
        console.log('UIManager:', typeof window.UIManager);
        
        // Tentar inicializar mesmo assim
        console.log('🔧 Tentando inicializar mesmo assim...');
    }
    
    // Inicializar o jogo
    try {
        window.game = new Game();
        console.log('✅ Jogo inicializado com sucesso!');
        
        // Instruções iniciais removidas para evitar spam de notificações
        
    } catch (error) {
        console.error('❌ Erro ao inicializar o jogo:', error);
        alert('Erro ao inicializar o jogo: ' + error.message);
    }
});

// Função para debug (disponível no console)
window.debugGame = function() {
    if (window.game) {
        console.log('🎮 Estado do Jogo:');
        console.log('- Estado:', game.gameState);
        console.log('- Jogador:', game.player);
        console.log('- Inimigos:', game.enemies.length);
        console.log('- Partículas:', game.particles.length);
        console.log('- Projéteis:', game.projectiles.length);
    } else {
        console.log('❌ Jogo não inicializado');
    }
};

// Função para spawnar inimigos (debug)
window.spawnEnemy = function(type = 'goblin') {
    if (window.game && game.gameState === 'playing') {
        const x = game.player.x + 200 + Math.random() * 100;
        const y = game.height - 100;
        game.enemies.push(new Enemy(x, y, type));
        console.log(`✅ Inimigo ${type} spawnado em (${x}, ${y})`);
    } else {
        console.log('❌ Jogo não está em execução');
    }
};

// Função para dar experiência (debug)
window.giveExp = function(amount = 50) {
    if (window.game && game.player) {
        game.player.gainExp(amount);
        console.log(`✅ ${amount} EXP dado ao jogador`);
    } else {
        console.log('❌ Jogador não encontrado');
    }
};

// Função para curar jogador (debug)
window.healPlayer = function(amount = 50) {
    if (window.game && game.player) {
        game.player.health = Math.min(game.player.maxHealth, game.player.health + amount);
        console.log(`✅ Jogador curado em ${amount} HP`);
    } else {
        console.log('❌ Jogador não encontrado');
    }
};

// Função para pausar/despausar (debug)
window.togglePause = function() {
    if (window.game) {
        if (game.gameState === 'playing') {
            game.gameState = 'paused';
            console.log('⏸️ Jogo pausado');
        } else if (game.gameState === 'paused') {
            game.gameState = 'playing';
            console.log('▶️ Jogo retomado');
        }
    } else {
        console.log('❌ Jogo não inicializado');
    }
};

// Log de inicialização
console.log('📁 Grand Chase Web - Sistema carregado');
console.log('🔧 Comandos de debug disponíveis:');
console.log('  - debugGame() - Mostrar estado do jogo');
console.log('  - spawnEnemy(type) - Spawnar inimigo');
console.log('  - giveExp(amount) - Dar experiência');
console.log('  - healPlayer(amount) - Curar jogador');
console.log('  - togglePause() - Pausar/despausar');
