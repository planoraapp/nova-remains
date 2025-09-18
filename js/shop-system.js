class ShopSystem {
    constructor() {
        this.items = new Map();
        this.playerGold = 1000;
        this.initializeShopItems();
    }
    
    initializeShopItems() {
        // Armas
        this.addItem('sword_basic', 'Espada Básica', 50, 'weapon', 'Uma espada simples de ferro', 10);
        this.addItem('sword_iron', 'Espada de Ferro', 150, 'weapon', 'Uma espada de ferro mais resistente', 20);
        this.addItem('sword_steel', 'Espada de Aço', 300, 'weapon', 'Uma espada de aço muito afiada', 35);
        this.addItem('sword_magic', 'Espada Mágica', 500, 'weapon', 'Uma espada encantada com magia', 50);
        
        this.addItem('bow_basic', 'Arco Básico', 40, 'weapon', 'Um arco simples de madeira', 8);
        this.addItem('bow_iron', 'Arco de Ferro', 120, 'weapon', 'Um arco reforçado com ferro', 15);
        this.addItem('bow_steel', 'Arco de Aço', 250, 'weapon', 'Um arco de aço preciso', 25);
        this.addItem('bow_magic', 'Arco Mágico', 450, 'weapon', 'Um arco encantado com magia', 40);
        
        this.addItem('staff_basic', 'Cajado Básico', 60, 'weapon', 'Um cajado simples de madeira', 12);
        this.addItem('staff_iron', 'Cajado de Ferro', 180, 'weapon', 'Um cajado reforçado com ferro', 22);
        this.addItem('staff_steel', 'Cajado de Aço', 350, 'weapon', 'Um cajado de aço poderoso', 38);
        this.addItem('staff_magic', 'Cajado Mágico', 600, 'weapon', 'Um cajado encantado com magia', 60);
        
        // Armaduras
        this.addItem('armor_leather', 'Armadura de Couro', 80, 'armor', 'Armadura básica de couro', 5);
        this.addItem('armor_chain', 'Armadura de Malha', 200, 'armor', 'Armadura de malha de ferro', 15);
        this.addItem('armor_plate', 'Armadura de Placa', 400, 'armor', 'Armadura de placa de aço', 30);
        
        // Poções
        this.addItem('potion_health', 'Poção de Vida', 25, 'consumable', 'Restaura 50 pontos de vida', 0);
        this.addItem('potion_mana', 'Poção de Mana', 30, 'consumable', 'Restaura 30 pontos de mana', 0);
        this.addItem('potion_strength', 'Poção de Força', 50, 'consumable', 'Aumenta força temporariamente', 0);
        
        // Gemas
        this.addItem('gem_red', 'Gema Vermelha', 100, 'gem', 'Uma gema vermelha misteriosa', 0);
        this.addItem('gem_blue', 'Gema Azul', 100, 'gem', 'Uma gema azul misteriosa', 0);
        this.addItem('gem_green', 'Gema Verde', 100, 'gem', 'Uma gema verde misteriosa', 0);
        this.addItem('gem_yellow', 'Gema Amarela', 100, 'gem', 'Uma gema amarela misteriosa', 0);
    }
    
    addItem(id, name, price, type, description, stats) {
        this.items.set(id, {
            id,
            name,
            price,
            type,
            description,
            stats,
            quantity: Math.floor(Math.random() * 5) + 1 // Quantidade aleatória
        });
    }
    
    getItemsByType(type) {
        return Array.from(this.items.values()).filter(item => item.type === type);
    }
    
    getItem(id) {
        return this.items.get(id);
    }
    
    canAfford(itemId) {
        const item = this.getItem(itemId);
        return item && this.playerGold >= item.price;
    }
    
    buyItem(itemId) {
        const item = this.getItem(itemId);
        if (!item) return false;
        
        if (this.canAfford(itemId)) {
            this.playerGold -= item.price;
            item.quantity = Math.max(0, item.quantity - 1);
            return true;
        }
        return false;
    }
    
    sellItem(itemId, price) {
        this.playerGold += price;
    }
    
    getPlayerGold() {
        return this.playerGold;
    }
    
    addGold(amount) {
        this.playerGold += amount;
    }
    
    renderItems(category = 'all') {
        const shopItems = document.getElementById('shopItems');
        if (!shopItems) return;
        
        let itemsToShow = Array.from(this.items.values());
        if (category !== 'all') {
            itemsToShow = itemsToShow.filter(item => item.type === category);
        }
        
        shopItems.innerHTML = '';
        
        itemsToShow.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'shop-item';
            itemDiv.innerHTML = `
                <div class="item-icon">${this.getItemIcon(item.type)}</div>
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <div class="item-stats">
                        ${item.stats > 0 ? `+${item.stats} ${this.getStatName(item.type)}` : ''}
                    </div>
                </div>
                <div class="item-price">
                    <span class="price">${item.price} 💰</span>
                    <button class="buy-btn" data-item="${item.id}">Comprar</button>
                </div>
            `;
            
            shopItems.appendChild(itemDiv);
        });
        
        // Adicionar event listeners para botões de compra
        shopItems.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-item');
                this.buyItem(itemId);
            });
        });
    }
    
    getItemIcon(type) {
        const icons = {
            weapon: '⚔️',
            armor: '🛡️',
            consumable: '🧪',
            gem: '💎'
        };
        return icons[type] || '📦';
    }
    
    getStatName(type) {
        const stats = {
            weapon: 'Ataque',
            armor: 'Defesa',
            consumable: 'Efeito',
            gem: 'Poder'
        };
        return stats[type] || 'Stat';
    }
}

// Definir globalmente
window.ShopSystem = ShopSystem;
