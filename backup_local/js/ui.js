class UIManager {
    constructor() {
        this.menus = {
            main: true,
            character: false,
            skills: false,
            inventory: false,
            settings: false
        };
        
        this.notifications = [];
        this.chatMessages = [];
        
        this.init();
    }
    
    init() {
        this.createUIElements();
        this.setupEventListeners();
    }
    
    createUIElements() {
        // Criar elementos de UI dinamicamente se necessário
        this.createNotificationSystem();
        this.createChatSystem();
    }
    
    setupEventListeners() {
        // Event listeners para UI
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Escape':
                    this.togglePauseMenu();
                    break;
                case 'KeyM':
                    this.toggleMainMenu();
                    break;
                case 'KeyC':
                    this.toggleCharacterMenu();
                    break;
                case 'KeyI':
                    this.toggleInventoryMenu();
                    break;
            }
        });
    }
    
    update(deltaTime) {
        this.updateNotifications(deltaTime);
        this.updateChat(deltaTime);
    }
    
    render(ctx) {
        this.renderNotifications(ctx);
        this.renderChat(ctx);
        this.renderMenus(ctx);
    }
    
    // Sistema de notificações
    createNotificationSystem() {
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'notifications';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(notificationContainer);
    }
    
    showNotification(message, type = 'info', duration = 3000) {
        // Sistema de notificações desabilitado temporariamente
        console.log(`[${type.toUpperCase()}] ${message}`);
        return;
        
        const notification = {
            id: Date.now(),
            message: message,
            type: type,
            duration: duration,
            life: duration,
            maxLife: duration
        };
        
        this.notifications.push(notification);
        this.renderNotificationElement(notification);
    }
    
    renderNotificationElement(notification) {
        const container = document.getElementById('notifications');
        const element = document.createElement('div');
        element.id = `notification-${notification.id}`;
        element.style.cssText = `
            background: ${this.getNotificationColor(notification.type)};
            color: white;
            padding: 10px 15px;
            margin: 5px 0;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        element.textContent = notification.message;
        
        container.appendChild(element);
        
        // Animar entrada
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
        }, 10);
    }
    
    getNotificationColor(type) {
        switch(type) {
            case 'success': return '#4CAF50';
            case 'error': return '#f44336';
            case 'warning': return '#ff9800';
            case 'info': return '#2196F3';
            default: return '#333';
        }
    }
    
    updateNotifications(deltaTime) {
        this.notifications = this.notifications.filter(notification => {
            notification.life -= deltaTime;
            
            if (notification.life <= 0) {
                this.removeNotification(notification.id);
                return false;
            }
            
            return true;
        });
    }
    
    removeNotification(id) {
        const element = document.getElementById(`notification-${id}`);
        if (element) {
            element.style.transform = 'translateX(100%)';
            setTimeout(() => {
                element.remove();
            }, 300);
        }
    }
    
    renderNotifications(ctx) {
        // Renderizar notificações no canvas se necessário
    }
    
    // Sistema de chat
    createChatSystem() {
        const chatContainer = document.createElement('div');
        chatContainer.id = 'chat';
        chatContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 300px;
            height: 200px;
            background: rgba(0,0,0,0.7);
            border-radius: 5px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        document.body.appendChild(chatContainer);
    }
    
    addChatMessage(message, sender = 'System') {
        const chatMessage = {
            id: Date.now(),
            message: message,
            sender: sender,
            timestamp: new Date(),
            life: 10000 // 10 segundos
        };
        
        this.chatMessages.push(chatMessage);
        this.renderChatMessage(chatMessage);
    }
    
    renderChatMessage(chatMessage) {
        const container = document.getElementById('chat');
        const element = document.createElement('div');
        element.style.cssText = `
            padding: 5px 10px;
            border-bottom: 1px solid #333;
            color: white;
            font-size: 12px;
        `;
        element.innerHTML = `
            <strong>${chatMessage.sender}:</strong> ${chatMessage.message}
        `;
        
        container.appendChild(element);
        container.scrollTop = container.scrollHeight;
    }
    
    updateChat(deltaTime) {
        this.chatMessages = this.chatMessages.filter(message => {
            message.life -= deltaTime;
            return message.life > 0;
        });
    }
    
    renderChat(ctx) {
        // Renderizar chat no canvas se necessário
    }
    
    // Menus
    toggleMainMenu() {
        this.menus.main = !this.menus.main;
        const menu = document.getElementById('menu');
        menu.style.display = this.menus.main ? 'block' : 'none';
    }
    
    toggleCharacterMenu() {
        this.menus.character = !this.menus.character;
        // Menu de personagens removido temporariamente
    }
    
    toggleInventoryMenu() {
        this.menus.inventory = !this.menus.inventory;
        // Menu de inventário removido temporariamente
    }
    
    togglePauseMenu() {
        if (game.gameState === 'playing') {
            game.gameState = 'paused';
            // Notificação removida
        } else if (game.gameState === 'paused') {
            game.gameState = 'playing';
            // Notificação removida
        }
    }
    
    renderMenus(ctx) {
        if (game.gameState === 'paused') {
            this.renderPauseMenu(ctx);
        }
    }
    
    renderPauseMenu(ctx) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, game.width, game.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSADO', game.width / 2, game.height / 2);
        
        ctx.font = '24px Arial';
        ctx.fillText('Pressione ESC para continuar', game.width / 2, game.height / 2 + 50);
        
        ctx.restore();
    }
    
    // Métodos de conveniência
    showLevelUpNotification(level) {
        // Notificação de level up desabilitada
        console.log(`Level Up! Agora você é nível ${level}!`);
    }
    
    showDamageNotification(damage, x, y) {
        // Criar partícula de dano com texto
        game.particles.push(new Particle(x, y, 'damage', damage));
    }
    
    showHealNotification(amount) {
        // Notificação de cura desabilitada
        console.log(`+${amount} HP`);
    }
    
    showManaNotification(amount) {
        // Notificação de mana desabilitada
        console.log(`+${amount} MP`);
    }
}

// Definir classe globalmente
window.UIManager = UIManager;

// Instância global do gerenciador de UI
window.uiManager = new UIManager();
