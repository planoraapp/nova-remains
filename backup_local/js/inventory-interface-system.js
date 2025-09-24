// Sistema de Interface de Inventário - Baseado no Manual de Estilo Visual
// Cria uma interface completa de inventário com elementos visuais

class InventoryInterfaceSystem {
    constructor() {
        this.isOpen = false;
        this.inventoryElement = null;
        this.items = new Map();
        
        // Configurações baseadas no manual de estilo visual
        this.styleConfig = {
            palette: {
                primary: '#1a1a2e',
                secondary: '#16213e',
                accent: '#00d4ff',
                highlight: '#ff00ff',
                glow: '#9370db',
                crystal: '#4ecdc4',
                organic: '#2d5016'
            },
            dimensions: {
                width: 900,
                height: 700
            }
        };
        
        this.init();
    }

    init() {
        this.createInventoryInterface();
        this.setupEventListeners();
        console.log('🎒 Sistema de Interface de Inventário inicializado');
    }

    createInventoryInterface() {
        // Criar elemento principal do inventário
        this.inventoryElement = document.createElement('div');
        this.inventoryElement.className = 'inventory-interface';
        this.inventoryElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: ${this.styleConfig.dimensions.width}px;
            height: ${this.styleConfig.dimensions.height}px;
            background: linear-gradient(135deg, ${this.styleConfig.palette.primary} 0%, ${this.styleConfig.palette.secondary} 100%);
            border: 3px solid ${this.styleConfig.palette.crystal};
            border-radius: 20px;
            box-shadow: 0 0 30px ${this.styleConfig.palette.accent}, inset 0 1px 0 rgba(255, 255, 255, 0.1);
            z-index: 1000;
            display: none;
            backdrop-filter: blur(10px);
            overflow: hidden;
        `;

        // Criar header do inventário
        this.createInventoryHeader();
        
        // Criar área de slots
        this.createInventorySlots();
        
        // Criar área de informações do item
        this.createItemInfoArea();
        
        // Criar botões de controle
        this.createControlButtons();
        
        // Adicionar decorações
        this.addDecorations();
        
        document.body.appendChild(this.inventoryElement);
    }

    createInventoryHeader() {
        const header = document.createElement('div');
        header.className = 'inventory-header';
        header.style.cssText = `
            background: linear-gradient(90deg, ${this.styleConfig.palette.glow} 0%, ${this.styleConfig.palette.accent} 100%);
            padding: 15px;
            text-align: center;
            border-bottom: 2px solid ${this.styleConfig.palette.crystal};
            position: relative;
        `;

        const title = document.createElement('h2');
        title.textContent = 'Inventário';
        title.style.cssText = `
            color: #FFFFFF;
            margin: 0;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        `;

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕';
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: rgba(255, 0, 0, 0.8);
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        `;
        closeButton.onclick = () => this.close();

        header.appendChild(title);
        header.appendChild(closeButton);
        this.inventoryElement.appendChild(header);
    }

    createInventorySlots() {
        const slotsContainer = document.createElement('div');
        slotsContainer.className = 'inventory-slots';
        slotsContainer.style.cssText = `
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 10px;
            height: 400px;
            overflow-y: auto;
        `;

        // Criar 48 slots (6 linhas x 8 colunas)
        for (let i = 0; i < 48; i++) {
            const slot = this.createInventorySlot(i);
            slotsContainer.appendChild(slot);
        }

        this.inventoryElement.appendChild(slotsContainer);
    }

    createInventorySlot(index) {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot';
        slot.dataset.slotIndex = index;
        slot.style.cssText = `
            width: 80px;
            height: 80px;
            background: rgba(0, 0, 0, 0.3);
            border: 2px solid ${this.styleConfig.palette.crystal};
            border-radius: 10px;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: ${this.styleConfig.palette.accent};
        `;

        // Efeito hover
        slot.addEventListener('mouseenter', () => {
            slot.style.borderColor = this.styleConfig.palette.accent;
            slot.style.boxShadow = `0 0 15px ${this.styleConfig.palette.accent}`;
            slot.style.transform = 'scale(1.05)';
        });

        slot.addEventListener('mouseleave', () => {
            slot.style.borderColor = this.styleConfig.palette.crystal;
            slot.style.boxShadow = 'none';
            slot.style.transform = 'scale(1)';
        });

        // Adicionar alguns itens de exemplo
        if (index < 10) {
            this.addExampleItem(slot, index);
        }

        return slot;
    }

    addExampleItem(slot, index) {
        const items = [
            { name: 'Poção de Vida', color: '#FF6B6B', icon: '❤️' },
            { name: 'Poção de Mana', color: '#4ECDC4', icon: '💙' },
            { name: 'Espada de Cristal', color: '#9370DB', icon: '⚔️' },
            { name: 'Escudo Mágico', color: '#FFD700', icon: '🛡️' },
            { name: 'Anel de Poder', color: '#FF00FF', icon: '💍' },
            { name: 'Cristal Arcano', color: '#00D4FF', icon: '💎' },
            { name: 'Pergaminho', color: '#8B4513', icon: '📜' },
            { name: 'Chave Antiga', color: '#CD7F32', icon: '🗝️' },
            { name: 'Gema Rara', color: '#FF1493', icon: '💠' },
            { name: 'Orbe Místico', color: '#9370DB', icon: '🔮' }
        ];

        const item = items[index];
        if (item) {
            slot.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 5px;">${item.icon}</div>
                    <div style="font-size: 10px; color: ${item.color}; font-weight: bold;">${item.name}</div>
                </div>
            `;
            slot.dataset.itemName = item.name;
            slot.dataset.itemColor = item.color;
            slot.dataset.itemIcon = item.icon;
        }
    }

    createItemInfoArea() {
        const infoArea = document.createElement('div');
        infoArea.className = 'item-info-area';
        infoArea.style.cssText = `
            padding: 20px;
            background: rgba(0, 0, 0, 0.5);
            border-top: 2px solid ${this.styleConfig.palette.crystal};
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `;

        const itemName = document.createElement('h3');
        itemName.className = 'item-name';
        itemName.textContent = 'Selecione um item';
        itemName.style.cssText = `
            color: ${this.styleConfig.palette.accent};
            margin: 0 0 10px 0;
            font-size: 18px;
            text-align: center;
        `;

        const itemDescription = document.createElement('p');
        itemDescription.className = 'item-description';
        itemDescription.textContent = 'Clique em um item para ver suas informações';
        itemDescription.style.cssText = `
            color: rgba(255, 255, 255, 0.8);
            margin: 0;
            font-size: 14px;
            text-align: center;
            line-height: 1.4;
        `;

        infoArea.appendChild(itemName);
        infoArea.appendChild(itemDescription);
        this.inventoryElement.appendChild(infoArea);
    }

    createControlButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'inventory-controls';
        buttonContainer.style.cssText = `
            padding: 15px;
            display: flex;
            justify-content: space-between;
            background: rgba(0, 0, 0, 0.3);
            border-top: 1px solid ${this.styleConfig.palette.crystal};
        `;

        // Botão de organizar
        const organizeButton = this.createControlButton('Organizar', this.styleConfig.palette.accent);
        organizeButton.onclick = () => this.organizeInventory();

        // Botão de usar item
        const useButton = this.createControlButton('Usar Item', this.styleConfig.palette.glow);
        useButton.onclick = () => this.useSelectedItem();

        // Botão de fechar
        const closeButton = this.createControlButton('Fechar', '#FF6B6B');
        closeButton.onclick = () => this.close();

        buttonContainer.appendChild(organizeButton);
        buttonContainer.appendChild(useButton);
        buttonContainer.appendChild(closeButton);
        this.inventoryElement.appendChild(buttonContainer);
    }

    createControlButton(text, color) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.cssText = `
            background: linear-gradient(135deg, ${color}, ${color}dd);
            color: white;
            border: 2px solid ${color};
            border-radius: 25px;
            padding: 10px 20px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            font-size: 14px;
        `;

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = `0 5px 15px ${color}`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });

        return button;
    }

    addDecorations() {
        // Adicionar cristais decorativos nos cantos
        const decorations = [
            { position: 'top-left', x: 20, y: 20 },
            { position: 'top-right', x: this.styleConfig.dimensions.width - 40, y: 20 },
            { position: 'bottom-left', x: 20, y: this.styleConfig.dimensions.height - 40 },
            { position: 'bottom-right', x: this.styleConfig.dimensions.width - 40, y: this.styleConfig.dimensions.height - 40 }
        ];

        decorations.forEach(decoration => {
            const crystal = document.createElement('div');
            crystal.className = 'inventory-crystal';
            crystal.style.cssText = `
                position: absolute;
                left: ${decoration.x}px;
                top: ${decoration.y}px;
                width: 20px;
                height: 30px;
                background: linear-gradient(45deg, ${this.styleConfig.palette.crystal}, ${this.styleConfig.palette.accent});
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                opacity: 0.7;
                animation: crystalGlow 3s infinite;
            `;
            this.inventoryElement.appendChild(crystal);
        });

        // Adicionar CSS para animação
        if (!document.querySelector('#inventory-animations')) {
            const style = document.createElement('style');
            style.id = 'inventory-animations';
            style.textContent = `
                @keyframes crystalGlow {
                    0%, 100% { opacity: 0.7; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupEventListeners() {
        // Fechar com ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Fechar clicando fora
        document.addEventListener('click', (event) => {
            if (this.isOpen && !this.inventoryElement.contains(event.target)) {
                this.close();
            }
        });
    }

    // Métodos de controle
    open() {
        this.isOpen = true;
        this.inventoryElement.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('🎒 Inventário aberto');
    }

    close() {
        this.isOpen = false;
        this.inventoryElement.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('🎒 Inventário fechado');
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    organizeInventory() {
        console.log('🎒 Organizando inventário...');
        // Implementar lógica de organização
        const slots = this.inventoryElement.querySelectorAll('.inventory-slot');
        slots.forEach(slot => {
            slot.style.animation = 'organizeItem 0.5s ease-in-out';
        });
        
        setTimeout(() => {
            slots.forEach(slot => {
                slot.style.animation = '';
            });
        }, 500);
    }

    useSelectedItem() {
        const selectedSlot = this.inventoryElement.querySelector('.inventory-slot.selected');
        if (selectedSlot && selectedSlot.dataset.itemName) {
            const itemName = selectedSlot.dataset.itemName;
            console.log(`🎒 Usando item: ${itemName}`);
            
            // Efeito visual de uso
            selectedSlot.style.animation = 'useItem 1s ease-in-out';
            setTimeout(() => {
                selectedSlot.style.animation = '';
            }, 1000);
        } else {
            console.log('🎒 Nenhum item selecionado');
        }
    }

    // Métodos de debug
    getInventoryInfo() {
        return {
            isOpen: this.isOpen,
            totalSlots: this.inventoryElement.querySelectorAll('.inventory-slot').length,
            itemsCount: this.inventoryElement.querySelectorAll('.inventory-slot[data-item-name]').length
        };
    }
}

// Sistema global de interface de inventário
window.inventoryInterfaceSystem = new InventoryInterfaceSystem();

// Funções de controle global
window.openInventory = function() {
    window.inventoryInterfaceSystem.open();
};

window.closeInventory = function() {
    window.inventoryInterfaceSystem.close();
};

window.toggleInventory = function() {
    window.inventoryInterfaceSystem.toggle();
};

window.debugInventory = function() {
    console.log('🎒 Debug do Inventário:', window.inventoryInterfaceSystem.getInventoryInfo());
};

// Adicionar CSS para animações
const inventoryStyle = document.createElement('style');
inventoryStyle.textContent = `
    @keyframes organizeItem {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
    
    @keyframes useItem {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .inventory-slot.selected {
        border-color: #00d4ff !important;
        box-shadow: 0 0 20px #00d4ff !important;
        background: rgba(0, 212, 255, 0.2) !important;
    }
`;
document.head.appendChild(inventoryStyle);

console.log('🎒 Sistema de Interface de Inventário carregado!');
