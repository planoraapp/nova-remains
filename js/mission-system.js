class MissionSystem {
    constructor() {
        this.missions = new Map();
        this.rooms = new Map();
        this.currentRoom = null;
        this.playerId = this.generatePlayerId();
        this.initializeMissions();
    }
    
    generatePlayerId() {
        return 'player_' + Math.random().toString(36).substr(2, 9);
    }
    
    initializeMissions() {
        // Missões da Vila Inicial
        this.addMission('village_tutorial', {
            name: 'Tutorial da Vila',
            description: 'Aprenda os controles básicos do jogo',
            location: 'village',
            level: 1,
            maxPlayers: 1,
            difficulty: 'easy',
            rewards: { exp: 100, gold: 50 },
            icon: '🎓',
            position: { x: 30, y: 60 }
        });
        
        this.addMission('village_goblins', {
            name: 'Goblins na Vila',
            description: 'Elimine os goblins que invadiram a vila',
            location: 'village',
            level: 2,
            maxPlayers: 4,
            difficulty: 'easy',
            rewards: { exp: 200, gold: 100 },
            icon: '👹',
            position: { x: 50, y: 40 }
        });
        
        // Missões da Floresta
        this.addMission('forest_hunt', {
            name: 'Caça na Floresta',
            description: 'Cace lobos selvagens na floresta sombria',
            location: 'forest',
            level: 3,
            maxPlayers: 3,
            difficulty: 'medium',
            rewards: { exp: 300, gold: 150 },
            icon: '🐺',
            position: { x: 40, y: 30 }
        });
        
        this.addMission('forest_herbs', {
            name: 'Coleta de Ervas',
            description: 'Colete ervas medicinais raras',
            location: 'forest',
            level: 4,
            maxPlayers: 2,
            difficulty: 'medium',
            rewards: { exp: 250, gold: 200 },
            icon: '🌿',
            position: { x: 60, y: 50 }
        });
        
        // Missões da Caverna
        this.addMission('cave_mining', {
            name: 'Mineração na Caverna',
            description: 'Extraia minérios preciosos da caverna',
            location: 'cave',
            level: 5,
            maxPlayers: 4,
            difficulty: 'medium',
            rewards: { exp: 400, gold: 300 },
            icon: '⛏️',
            position: { x: 70, y: 70 }
        });
        
        this.addMission('cave_boss', {
            name: 'Chefe da Caverna',
            description: 'Derrote o chefe goblin da caverna',
            location: 'cave',
            level: 6,
            maxPlayers: 4,
            difficulty: 'hard',
            rewards: { exp: 600, gold: 500 },
            icon: '👑',
            position: { x: 80, y: 60 }
        });
        
        // Missões da Torre
        this.addMission('tower_magic', {
            name: 'Estudos Mágicos',
            description: 'Aprenda magias com o mago da torre',
            location: 'tower',
            level: 7,
            maxPlayers: 2,
            difficulty: 'medium',
            rewards: { exp: 500, gold: 400 },
            icon: '🔮',
            position: { x: 20, y: 20 }
        });
        
        this.addMission('tower_guardian', {
            name: 'Guardião da Torre',
            description: 'Derrote o golem guardião da torre',
            location: 'tower',
            level: 8,
            maxPlayers: 4,
            difficulty: 'hard',
            rewards: { exp: 800, gold: 600 },
            icon: '🤖',
            position: { x: 10, y: 10 }
        });
        
        // Missões da Masmorra
        this.addMission('dungeon_explore', {
            name: 'Exploração da Masmorra',
            description: 'Explore os corredores sombrios da masmorra',
            location: 'dungeon',
            level: 10,
            maxPlayers: 4,
            difficulty: 'hard',
            rewards: { exp: 1000, gold: 800 },
            icon: '🗡️',
            position: { x: 90, y: 20 }
        });
        
        this.addMission('dungeon_dragon', {
            name: 'Dragão da Masmorra',
            description: 'Enfrente o dragão lendário da masmorra',
            location: 'dungeon',
            level: 15,
            maxPlayers: 4,
            difficulty: 'extreme',
            rewards: { exp: 2000, gold: 1500 },
            icon: '🐉',
            position: { x: 95, y: 10 }
        });
    }
    
    addMission(id, missionData) {
        this.missions.set(id, {
            id,
            ...missionData,
            rooms: new Map()
        });
    }
    
    getMission(id) {
        return this.missions.get(id);
    }
    
    getMissionsByLocation(location) {
        return Array.from(this.missions.values()).filter(mission => mission.location === location);
    }
    
    getAllMissions() {
        return Array.from(this.missions.values());
    }
    
    createRoom(missionId, roomName, maxPlayers = null) {
        const mission = this.getMission(missionId);
        if (!mission) return null;
        
        const roomId = this.generateRoomId();
        const room = {
            id: roomId,
            missionId,
            name: roomName,
            maxPlayers: maxPlayers || mission.maxPlayers,
            players: new Map(),
            status: 'waiting', // waiting, starting, in_progress, completed
            createdAt: Date.now(),
            host: this.playerId
        };
        
        // Adicionar o criador da sala
        room.players.set(this.playerId, {
            id: this.playerId,
            name: 'Player',
            character: 'elesis',
            level: 1,
            ready: false
        });
        
        this.rooms.set(roomId, room);
        mission.rooms.set(roomId, room);
        
        return room;
    }
    
    joinRoom(roomId, playerName = 'Player', character = 'elesis', level = 1) {
        const room = this.rooms.get(roomId);
        if (!room) return false;
        
        if (room.players.size >= room.maxPlayers) return false;
        if (room.status !== 'waiting') return false;
        
        room.players.set(this.playerId, {
            id: this.playerId,
            name: playerName,
            character,
            level,
            ready: false
        });
        
        this.currentRoom = room;
        return true;
    }
    
    leaveRoom(roomId) {
        const room = this.rooms.get(roomId);
        if (!room) return false;
        
        room.players.delete(this.playerId);
        
        if (room.players.size === 0) {
            this.rooms.delete(roomId);
            const mission = this.getMission(room.missionId);
            if (mission) {
                mission.rooms.delete(roomId);
            }
        } else if (room.host === this.playerId) {
            // Transferir host para outro jogador
            const newHost = room.players.keys().next().value;
            room.host = newHost;
        }
        
        if (this.currentRoom && this.currentRoom.id === roomId) {
            this.currentRoom = null;
        }
        
        return true;
    }
    
    getRoomsForMission(missionId) {
        const mission = this.getMission(missionId);
        if (!mission) return [];
        
        return Array.from(mission.rooms.values()).filter(room => room.status === 'waiting');
    }
    
    getRoom(roomId) {
        return this.rooms.get(roomId);
    }
    
    setPlayerReady(roomId, ready) {
        const room = this.rooms.get(roomId);
        if (!room) return false;
        
        const player = room.players.get(this.playerId);
        if (!player) return false;
        
        player.ready = ready;
        return true;
    }
    
    canStartMission(roomId) {
        const room = this.rooms.get(roomId);
        if (!room) return false;
        
        if (room.host !== this.playerId) return false;
        if (room.players.size < 1) return false;
        
        // Verificar se todos os jogadores estão prontos
        for (let player of room.players.values()) {
            if (!player.ready) return false;
        }
        
        return true;
    }
    
    startMission(roomId) {
        if (!this.canStartMission(roomId)) return false;
        
        const room = this.rooms.get(roomId);
        room.status = 'starting';
        
        // Simular início da missão após 3 segundos
        setTimeout(() => {
            room.status = 'in_progress';
            this.onMissionStarted(room);
        }, 3000);
        
        return true;
    }
    
    onMissionStarted(room) {
        console.log(`🎮 Missão iniciada: ${room.name}`);
        // Aqui você pode implementar a lógica de início da missão
        // Por exemplo, carregar o mapa, spawnar inimigos, etc.
    }
    
    generateRoomId() {
        return 'room_' + Math.random().toString(36).substr(2, 9);
    }
    
    getDifficultyColor(difficulty) {
        const colors = {
            easy: '#90EE90',
            medium: '#FFD700',
            hard: '#FF6347',
            extreme: '#DC143C'
        };
        return colors[difficulty] || '#FFFFFF';
    }
    
    getDifficultyIcon(difficulty) {
        const icons = {
            easy: '⭐',
            medium: '⭐⭐',
            hard: '⭐⭐⭐',
            extreme: '💀'
        };
        return icons[difficulty] || '⭐';
    }
}
