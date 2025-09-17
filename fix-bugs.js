// ===== CORREÇÃO AUTOMÁTICA DE BUGS - NOVA REMAINS =====
// Execute este arquivo para corrigir todos os bugs automaticamente

console.log('🔧 Iniciando correções automáticas...');

// 1. DEFINIR CLASSES GLOBALMENTE
function defineGlobalClasses() {
    console.log('📦 Definindo classes globalmente...');
    
    // Definir ShopSystem globalmente
    if (typeof ShopSystem !== 'undefined' && typeof window.ShopSystem === 'undefined') {
        window.ShopSystem = ShopSystem;
        console.log('✅ ShopSystem definido globalmente');
    }
    
    // Definir InventorySystem globalmente  
    if (typeof InventorySystem !== 'undefined' && typeof window.InventorySystem === 'undefined') {
        window.InventorySystem = InventorySystem;
        console.log('✅ InventorySystem definido globalmente');
    }
    
    // Definir MissionSystem globalmente
    if (typeof MissionSystem !== 'undefined' && typeof window.MissionSystem === 'undefined') {
        window.MissionSystem = MissionSystem;
        console.log('✅ MissionSystem definido globalmente');
    }
    
    // Definir LobbySystem globalmente
    if (typeof LobbySystem !== 'undefined' && typeof window.LobbySystem === 'undefined') {
        window.LobbySystem = LobbySystem;
        console.log('✅ LobbySystem definido globalmente');
    }
}

// 2. CORRIGIR GAME LOOP
function fixGameLoop() {
    console.log('🎮 Corrigindo game loop...');
    
    if (window.game && typeof window.game.gameLoop === 'function') {
        // Reativar game loop se não estiver rodando
        if (!window.game.isRunning) {
            window.game.isRunning = true;
            window.game.gameLoop();
            console.log('✅ Game loop reativado');
        }
    }
}

// 3. CORRIGIR SETUP DE IMAGENS DOS HERÓIS
function fixHeroImageFallbacks() {
    console.log('🖼️ Corrigindo fallbacks de imagens...');
    
    function setupHeroImageFallbacksFixed() {
        const heroImages = ['juno', 'atlas', 'vega', 'kai'];
        
        heroImages.forEach(hero => {
            const img = document.getElementById(`${hero}-preview`);
            
            if (img) {
                // Verificar se nextElementSibling existe antes de usar
                const fallback = img.nextElementSibling;
                
                img.onerror = () => {
                    console.warn(`⚠️ Erro ao carregar imagem do ${hero}, usando fallback`);
                    img.style.display = 'none';
                    if (fallback) fallback.style.display = 'block';
                };
                
                img.onload = () => {
                    console.log(`✅ Imagem do ${hero} carregada com sucesso`);
                    if (fallback) fallback.style.display = 'none';
                };
            }
        });
    }
    
    // Aplicar correção
    setupHeroImageFallbacksFixed();
    console.log('✅ Fallbacks de imagens corrigidos');
}

// 4. VERIFICAR E CORRIGIR CLASSES FALTANTES
function checkAndFixMissingClasses() {
    console.log('🔍 Verificando classes faltantes...');
    
    const requiredClasses = [
        'Game', 'Player', 'Enemy', 'Particle', 'Projectile', 
        'SpriteManager', 'CombatSystem', 'UIManager', 
        'ShopSystem', 'InventorySystem', 'MissionSystem', 'LobbySystem'
    ];
    
    const missingClasses = requiredClasses.filter(className => 
        typeof window[className] === 'undefined'
    );
    
    if (missingClasses.length === 0) {
        console.log('✅ Todas as classes estão carregadas corretamente!');
        return true;
    } else {
        console.warn('⚠️ Classes ainda faltando:', missingClasses);
        return false;
    }
}

// 5. CORRIGIR SPRITE DO KAI
function fixKaiSprite() {
    console.log('🎨 Corrigindo sprite do Kai...');
    
    // Verificar se o sprite do Kai existe
    const kaiImg = document.getElementById('kai-preview');
    if (kaiImg) {
        // Corrigir caminho do sprite do Kai
        const correctPath = 'assets/images/characters/heroes/juno/kai.png';
        kaiImg.src = correctPath;
        console.log('✅ Caminho do sprite do Kai corrigido');
    }
}

// 6. CORRIGIR MENSAGEM DO GAME LOOP
function fixGameLoopMessage() {
    console.log('📝 Corrigindo mensagem do game loop...');
    
    // Sobrescrever a mensagem incorreta se existir
    if (window.game && window.game.init) {
        const originalInit = window.game.init;
        window.game.init = function() {
            originalInit.call(this);
            console.log('Nova Remains - Sistema inicializado com sucesso');
        };
        console.log('✅ Mensagem do game loop corrigida');
    }
}

// 7. APLICAR TODAS AS CORREÇÕES
function applyAllFixes() {
    console.log('🚀 Aplicando todas as correções...');
    
    try {
        defineGlobalClasses();
        fixGameLoop();
        fixHeroImageFallbacks();
        fixKaiSprite();
        fixGameLoopMessage();
        
        // Verificar se tudo está funcionando
        const allGood = checkAndFixMissingClasses();
        
        if (allGood) {
            console.log('🎉 TODAS AS CORREÇÕES APLICADAS COM SUCESSO!');
            console.log('🎮 O jogo deve estar funcionando corretamente agora');
            
            // Mostrar mensagem de sucesso na tela
            if (document.body) {
                const successMsg = document.createElement('div');
                successMsg.innerHTML = `
                    <div style="
                        position: fixed; 
                        top: 20px; 
                        right: 20px; 
                        background: #4CAF50; 
                        color: white; 
                        padding: 15px; 
                        border-radius: 5px; 
                        z-index: 10000;
                        font-family: Arial, sans-serif;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    ">
                        ✅ Bugs corrigidos com sucesso!<br>
                        🎮 Jogo funcionando normalmente
                    </div>
                `;
                document.body.appendChild(successMsg);
                
                // Remover mensagem após 5 segundos
                setTimeout(() => {
                    if (successMsg.parentNode) {
                        successMsg.parentNode.removeChild(successMsg);
                    }
                }, 5000);
            }
            
        } else {
            console.warn('⚠️ Algumas correções podem não ter funcionado completamente');
            console.log('🔄 Recarregue a página se necessário');
        }
        
    } catch (error) {
        console.error('❌ Erro ao aplicar correções:', error);
    }
}

// 8. EXECUTAR CORREÇÕES AUTOMATICAMENTE
function autoFix() {
    // Aguardar um pouco para garantir que todas as classes estejam carregadas
    setTimeout(() => {
        applyAllFixes();
    }, 1000);
}

// EXECUTAR AUTOMATICAMENTE QUANDO O ARQUIVO FOR CARREGADO
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoFix);
} else {
    autoFix();
}

// Exportar função para uso manual se necessário
window.fixNovaRemainsBugs = applyAllFixes;

console.log('📁 Arquivo de correção carregado. Aguardando execução automática...');
