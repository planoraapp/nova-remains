class InventorySystem {
    constructor() {
        this.items = new Map();
        this.maxSlots = 20;
        this.equippedItems = {
            weapon: null,
            armor: null,
            accessory: null
        };
        this.initializeInventory();
    }
    
    initializeInventory() {
        // Inicializar slots vazios
        for (let i = 0; i < this.maxSlots; i++) {
            this.items.set(i, null);
        }
    }
    
    addItem(itemId, quantity = 1) {
        // Verificar se já existe o item no inventário
        for (let [slot, item] of this.items) {
            if (item && item.id === itemId) {
                item.quantity += quantity;
                return true;
            }
        }
        
        // Procurar slot vazio
        for (let i = 0; i < this.maxSlots; i++) {
            if (!this.items.get(i)) {
                this.items.set(i, {
                    id: itemId,
                    quantity: quantity,
                    equipped: false
                });
                return true;
            }
        }
        
        return false; // Inventário cheio
    }
    
    removeItem(slot, quantity = 1) {
        const item = this.items.get(slot);
        if (!item) return false;
        
        if (item.quantity <= quantity) {
            this.items.set(slot, null);
            if (item.equipped) {
                this.unequipItem(slot);
            }
        } else {
            item.quantity -= quantity;
        }
        
        return true;
    }
    
    getItem(slot) {
        return this.items.get(slot);
    }
    
    getItemById(itemId) {
        for (let [slot, item] of this.items) {
            if (item && item.id === itemId) {
                return { slot, item };
            }
        }
        return null;
    }
    
    equipItem(slot) {
        const item = this.items.get(slot);
        if (!item) return false;
        
        // Verificar se é um item equipável
        const itemData = this.getItemData(item.id);
        if (!itemData || !['weapon', 'armor', 'accessory'].includes(itemData.type)) {
            return false;
        }
        
        // Desequipar item anterior se houver
        if (this.equippedItems[itemData.type]) {
            this.unequipItemByType(itemData.type);
        }
        
        // Equipar novo item
        item.equipped = true;
        this.equippedItems[itemData.type] = slot;
        
        return true;
    }
    
    unequipItem(slot) {
        const item = this.items.get(slot);
        if (!item || !item.equipped) return false;
        
        const itemData = this.getItemData(item.id);
        if (itemData) {
            this.equippedItems[itemData.type] = null;
        }
        
        item.equipped = false;
        return true;
    }
    
    unequipItemByType(type) {
        const slot = this.equippedItems[type];
        if (slot !== null) {
            const item = this.items.get(slot);
            if (item) {
                item.equipped = false;
            }
            this.equippedItems[type] = null;
        }
    }
    
    getEquippedItem(type) {
        const slot = this.equippedItems[type];
        return slot !== null ? this.items.get(slot) : null;
    }
    
    getItemData(itemId) {
        // Dados dos itens (em um jogo real, isso viria de um arquivo JSON)
        const itemDatabase = {
            'sword_basic': { name: 'Espada Básica', type: 'weapon', stats: { attack: 10 } },
            'sword_iron': { name: 'Espada de Ferro', type: 'weapon', stats: { attack: 20 } },
            'sword_steel': { name: 'Espada de Aço', type: 'weapon', stats: { attack: 35 } },
            'sword_magic': { name: 'Espada Mágica', type: 'weapon', stats: { attack: 50 } },
            'bow_basic': { name: 'Arco Básico', type: 'weapon', stats: { attack: 8 } },
            'bow_iron': { name: 'Arco de Ferro', type: 'weapon', stats: { attack: 15 } },
            'bow_steel': { name: 'Arco de Aço', type: 'weapon', stats: { attack: 25 } },
            'bow_magic': { name: 'Arco Mágico', type: 'weapon', stats: { attack: 40 } },
            'staff_basic': { name: 'Cajado Básico', type: 'weapon', stats: { attack: 12 } },
            'staff_iron': { name: 'Cajado de Ferro', type: 'weapon', stats: { attack: 22 } },
            'staff_steel': { name: 'Cajado de Aço', type: 'weapon', stats: { attack: 38 } },
            'staff_magic': { name: 'Cajado Mágico', type: 'weapon', stats: { attack: 60 } },
            'armor_leather': { name: 'Armadura de Couro', type: 'armor', stats: { defense: 5 } },
            'armor_chain': { name: 'Armadura de Malha', type: 'armor', stats: { defense: 15 } },
            'armor_plate': { name: 'Armadura de Placa', type: 'armor', stats: { defense: 30 } },
            'potion_health': { name: 'Poção de Vida', type: 'consumable', stats: { heal: 50 } },
            'potion_mana': { name: 'Poção de Mana', type: 'consumable', stats: { mana: 30 } },
            'potion_strength': { name: 'Poção de Força', type: 'consumable', stats: { strength: 10 } },
            'gem_red': { name: 'Gema Vermelha', type: 'accessory', stats: { fire: 5 } },
            'gem_blue': { name: 'Gema Azul', type: 'accessory', stats: { water: 5 } },
            'gem_green': { name: 'Gema Verde', type: 'accessory', stats: { earth: 5 } },
            'gem_yellow': { name: 'Gema Amarela', type: 'accessory', stats: { lightning: 5 } }
        };
        
        return itemDatabase[itemId] || null;
    }
    
    getTotalStats() {
        let totalStats = {
            attack: 0,
            defense: 0,
            fire: 0,
            water: 0,
            earth: 0,
            lightning: 0
        };
        
        // Somar stats dos itens equipados
        for (let type in this.equippedItems) {
            const slot = this.equippedItems[type];
            if (slot !== null) {
                const item = this.items.get(slot);
                if (item) {
                    const itemData = this.getItemData(item.id);
                    if (itemData && itemData.stats) {
                        for (let stat in itemData.stats) {
                            totalStats[stat] = (totalStats[stat] || 0) + itemData.stats[stat];
                        }
                    }
                }
            }
        }
        
        return totalStats;
    }
    
    getInventoryData() {
        const inventoryData = [];
        for (let i = 0; i < this.maxSlots; i++) {
            const item = this.items.get(i);
            if (item) {
                const itemData = this.getItemData(item.id);
                inventoryData.push({
                    slot: i,
                    item: item,
                    data: itemData
                });
            } else {
                inventoryData.push({
                    slot: i,
                    item: null,
                    data: null
                });
            }
        }
        return inventoryData;
    }
    
    isFull() {
        for (let i = 0; i < this.maxSlots; i++) {
            if (!this.items.get(i)) {
                return false;
            }
        }
        return true;
    }
    
    getEmptySlots() {
        const emptySlots = [];
        for (let i = 0; i < this.maxSlots; i++) {
            if (!this.items.get(i)) {
                emptySlots.push(i);
            }
        }
        return emptySlots;
    }
    
    renderInventory() {
        const inventoryGrid = document.getElementById('inventoryGrid');
        if (!inventoryGrid) return;
        
        inventoryGrid.innerHTML = '';
        
        for (let i = 0; i < this.maxSlots; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.setAttribute('data-slot', i);
            
            const item = this.items.get(i);
            if (item) {
                const itemData = this.getItemData(item.id);
                slot.innerHTML = `
                    <div class="item-icon">${this.getItemIcon(itemData?.type || 'unknown')}</div>
                    <div class="item-quantity">${item.quantity}</div>
                    <div class="item-name">${itemData?.name || 'Item Desconhecido'}</div>
                `;
                
                if (item.equipped) {
                    slot.classList.add('equipped');
                }
                
                slot.addEventListener('click', () => {
                    this.handleSlotClick(i);
                });
            } else {
                slot.innerHTML = '<div class="empty-slot">+</div>';
                slot.addEventListener('click', () => {
                    this.handleSlotClick(i);
                });
            }
            
            inventoryGrid.appendChild(slot);
        }
        
        // Atualizar equipamentos
        this.updateEquippedItems();
    }
    
    handleSlotClick(slot) {
        const item = this.items.get(slot);
        if (item) {
            // Se é um item equipável, equipar/desequipar
            const itemData = this.getItemData(item.id);
            if (itemData && ['weapon', 'armor', 'accessory'].includes(itemData.type)) {
                if (item.equipped) {
                    this.unequipItem(slot);
                } else {
                    this.equipItem(slot);
                }
            }
        }
    }
    
    updateEquippedItems() {
        const equippedWeapon = document.getElementById('equippedWeapon');
        const equippedArmor = document.getElementById('equippedArmor');
        const equippedAccessory = document.getElementById('equippedAccessory');
        
        if (equippedWeapon) {
            const weaponSlot = this.equippedItems.weapon;
            if (weaponSlot !== null) {
                const item = this.items.get(weaponSlot);
                const itemData = this.getItemData(item.id);
                equippedWeapon.textContent = itemData?.name || 'Arma Desconhecida';
            } else {
                equippedWeapon.textContent = 'Nenhuma';
            }
        }
        
        if (equippedArmor) {
            const armorSlot = this.equippedItems.armor;
            if (armorSlot !== null) {
                const item = this.items.get(armorSlot);
                const itemData = this.getItemData(item.id);
                equippedArmor.textContent = itemData?.name || 'Armadura Desconhecida';
            } else {
                equippedArmor.textContent = 'Nenhuma';
            }
        }
        
        if (equippedAccessory) {
            const accessorySlot = this.equippedItems.accessory;
            if (accessorySlot !== null) {
                const item = this.items.get(accessorySlot);
                const itemData = this.getItemData(item.id);
                equippedAccessory.textContent = itemData?.name || 'Acessório Desconhecido';
            } else {
                equippedAccessory.textContent = 'Nenhum';
            }
        }
    }
    
    getItemIcon(type) {
        const icons = {
            weapon: '⚔️',
            armor: '🛡️',
            consumable: '🧪',
            gem: '💎',
            accessory: '💍'
        };
        return icons[type] || '📦';
    }
}

// Definir globalmente
window.InventorySystem = InventorySystem;
