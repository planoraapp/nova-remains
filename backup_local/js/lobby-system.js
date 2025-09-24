class LobbySystem {
    constructor(missionSystem) {
        this.missionSystem = missionSystem;
        this.currentView = 'missions'; // missions, rooms, create
        this.selectedMission = null;
        this.playerName = 'Player';
        this.playerCharacter = 'elesis';
        this.playerLevel = 1;
    }
    
    showMissionsMap() {
        this.currentView = 'missions';
        this.hideAllContainers();
        document.getElementById('missionsContainer').style.display = 'block';
        this.renderMissionsMap();
    }
    
    hideAllContainers() {
        document.getElementById('missionsContainer').style.display = 'none';
        document.getElementById('roomsContainer').style.display = 'none';
        document.getElementById('createRoomContainer').style.display = 'none';
        document.getElementById('roomLobbyContainer').style.display = 'none';
    }
    
    showMissionRooms(missionId) {
        this.selectedMission = missionId;
        this.currentView = 'rooms';
        this.hideAllContainers();
        document.getElementById('roomsContainer').style.display = 'block';
        this.renderMissionRooms();
    }
    
    showCreateRoom() {
        this.currentView = 'create';
        this.hideAllContainers();
        document.getElementById('createRoomContainer').style.display = 'block';
        this.renderCreateRoom();
    }
    
    renderMissionsMap() {
        const missionsContainer = document.getElementById('missionsContainer');
        if (!missionsContainer) return;
        
        const missions = this.missionSystem.getAllMissions();
        const locations = [...new Set(missions.map(m => m.location))];
        
        let html = '<div class="missions-map">';
        
        locations.forEach(location => {
            const locationMissions = missions.filter(m => m.location === location);
            const locationNames = {
                village: 'Vila Inicial',
                forest: 'Floresta Sombria',
                cave: 'Caverna dos Goblins',
                tower: 'Torre do Mago',
                dungeon: 'Masmorra Profunda'
            };
            
            html += `
                <div class="location-section">
                    <h3>${locationNames[location] || location}</h3>
                    <div class="missions-grid">
            `;
            
            locationMissions.forEach(mission => {
                const difficultyColor = this.missionSystem.getDifficultyColor(mission.difficulty);
                const difficultyIcon = this.missionSystem.getDifficultyIcon(mission.difficulty);
                
                html += `
                    <div class="mission-card" data-mission-id="${mission.id}">
                        <div class="mission-icon" style="background-color: ${difficultyColor}">
                            ${mission.icon}
                        </div>
                        <div class="mission-info">
                            <h4>${mission.name}</h4>
                            <p>${mission.description}</p>
                            <div class="mission-details">
                                <span class="mission-level">Nível ${mission.level}</span>
                                <span class="mission-difficulty">${difficultyIcon} ${mission.difficulty}</span>
                                <span class="mission-players">👥 ${mission.maxPlayers}</span>
                            </div>
                            <div class="mission-rewards">
                                <span>💰 ${mission.rewards.gold}</span>
                                <span>⭐ ${mission.rewards.exp} EXP</span>
                            </div>
                        </div>
                        <button class="mission-select-btn">Selecionar</button>
                    </div>
                `;
            });
            
            html += '</div></div>';
        });
        
        html += '</div>';
        missionsContainer.innerHTML = html;
        
        // Adicionar event listeners
        document.querySelectorAll('.mission-select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const missionCard = e.target.closest('.mission-card');
                const missionId = missionCard.dataset.missionId;
                this.showMissionRooms(missionId);
            });
        });
    }
    
    renderMissionRooms() {
        const roomsContainer = document.getElementById('roomsContainer');
        if (!roomsContainer) return;
        
        const mission = this.missionSystem.getMission(this.selectedMission);
        const rooms = this.missionSystem.getRoomsForMission(this.selectedMission);
        
        let html = `
            <div class="rooms-header">
                <button class="back-btn" id="backToMissions">← Voltar</button>
                <h2>${mission.name}</h2>
                <button class="create-room-btn" id="createRoomBtn">Criar Sala</button>
            </div>
            <div class="rooms-list">
        `;
        
        if (rooms.length === 0) {
            html += `
                <div class="no-rooms">
                    <p>Nenhuma sala disponível para esta missão</p>
                    <button class="create-room-btn" id="createRoomBtnEmpty">Criar Primeira Sala</button>
                </div>
            `;
        } else {
            rooms.forEach(room => {
                const playerCount = room.players.size;
                const isHost = room.host === this.missionSystem.playerId;
                const isInRoom = room.players.has(this.missionSystem.playerId);
                
                html += `
                    <div class="room-card" data-room-id="${room.id}">
                        <div class="room-info">
                            <h4>${room.name}</h4>
                            <div class="room-details">
                                <span>👥 ${playerCount}/${room.maxPlayers}</span>
                                <span>🏠 ${isHost ? 'Host' : 'Jogador'}</span>
                                <span>⏰ ${this.formatTime(room.createdAt)}</span>
                            </div>
                        </div>
                        <div class="room-players">
                            ${Array.from(room.players.values()).map(player => `
                                <div class="player-avatar ${player.ready ? 'ready' : ''}">
                                    <span class="character-icon">${this.getCharacterIcon(player.character)}</span>
                                    <span class="player-name">${player.name}</span>
                                    <span class="player-level">Lv.${player.level}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="room-actions">
                            ${isInRoom ? 
                                `<button class="leave-room-btn" data-room-id="${room.id}">Sair</button>` :
                                `<button class="join-room-btn" data-room-id="${room.id}">Entrar</button>`
                            }
                        </div>
                    </div>
                `;
            });
        }
        
        html += '</div>';
        roomsContainer.innerHTML = html;
        
        // Event listeners
        document.getElementById('backToMissions').addEventListener('click', () => {
            this.showMissionsMap();
        });
        
        document.querySelectorAll('.create-room-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showCreateRoom();
            });
        });
        
        document.querySelectorAll('.join-room-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const roomId = e.target.dataset.roomId;
                this.joinRoom(roomId);
            });
        });
        
        document.querySelectorAll('.leave-room-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const roomId = e.target.dataset.roomId;
                this.leaveRoom(roomId);
            });
        });
    }
    
    renderCreateRoom() {
        const createContainer = document.getElementById('createRoomContainer');
        if (!createContainer) return;
        
        const mission = this.missionSystem.getMission(this.selectedMission);
        
        let html = `
            <div class="create-room-header">
                <button class="back-btn" id="backToRooms">← Voltar</button>
                <h2>Criar Sala - ${mission.name}</h2>
            </div>
            <div class="create-room-form">
                <div class="form-group">
                    <label>Nome da Sala:</label>
                    <input type="text" id="roomName" placeholder="Digite o nome da sala" value="Sala de ${mission.name}">
                </div>
                <div class="form-group">
                    <label>Máximo de Jogadores:</label>
                    <select id="maxPlayers">
                        <option value="2">2 Jogadores</option>
                        <option value="3">3 Jogadores</option>
                        <option value="4" selected>4 Jogadores</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Seu Nome:</label>
                    <input type="text" id="playerName" placeholder="Digite seu nome" value="${this.playerName}">
                </div>
                <div class="form-group">
                    <label>Personagem:</label>
                    <select id="playerCharacter">
                        <option value="elesis" ${this.playerCharacter === 'elesis' ? 'selected' : ''}>Elesis</option>
                        <option value="lire" ${this.playerCharacter === 'lire' ? 'selected' : ''}>Lire</option>
                        <option value="arme" ${this.playerCharacter === 'arme' ? 'selected' : ''}>Arme</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Nível:</label>
                    <input type="number" id="playerLevel" min="1" max="50" value="${this.playerLevel}">
                </div>
                <div class="form-actions">
                    <button class="create-room-confirm-btn" id="createRoomConfirm">Criar Sala</button>
                    <button class="cancel-btn" id="cancelCreateRoom">Cancelar</button>
                </div>
            </div>
        `;
        
        createContainer.innerHTML = html;
        
        // Event listeners
        document.getElementById('backToRooms').addEventListener('click', () => {
            this.showMissionRooms(this.selectedMission);
        });
        
        document.getElementById('createRoomConfirm').addEventListener('click', () => {
            this.createRoom();
        });
        
        document.getElementById('cancelCreateRoom').addEventListener('click', () => {
            this.showMissionRooms(this.selectedMission);
        });
    }
    
    createRoom() {
        const roomName = document.getElementById('roomName').value;
        const maxPlayers = parseInt(document.getElementById('maxPlayers').value);
        const playerName = document.getElementById('playerName').value;
        const playerCharacter = document.getElementById('playerCharacter').value;
        const playerLevel = parseInt(document.getElementById('playerLevel').value);
        
        if (!roomName.trim()) {
            alert('Digite um nome para a sala');
            return;
        }
        
        this.playerName = playerName;
        this.playerCharacter = playerCharacter;
        this.playerLevel = playerLevel;
        
        const room = this.missionSystem.createRoom(this.selectedMission, roomName, maxPlayers);
        if (room) {
            this.showMissionRooms(this.selectedMission);
            this.showRoomLobby(room.id);
        } else {
            alert('Erro ao criar sala');
        }
    }
    
    joinRoom(roomId) {
        const success = this.missionSystem.joinRoom(roomId, this.playerName, this.playerCharacter, this.playerLevel);
        if (success) {
            this.showRoomLobby(roomId);
        } else {
            alert('Erro ao entrar na sala');
        }
    }
    
    leaveRoom(roomId) {
        const success = this.missionSystem.leaveRoom(roomId);
        if (success) {
            this.showMissionRooms(this.selectedMission);
        } else {
            alert('Erro ao sair da sala');
        }
    }
    
    showRoomLobby(roomId) {
        const room = this.missionSystem.getRoom(roomId);
        if (!room) return;
        
        this.hideAllContainers();
        document.getElementById('roomLobbyContainer').style.display = 'block';
        
        const lobbyContainer = document.getElementById('roomLobbyContainer');
        if (!lobbyContainer) return;
        
        const mission = this.missionSystem.getMission(room.missionId);
        const isHost = room.host === this.missionSystem.playerId;
        const allPlayersReady = Array.from(room.players.values()).every(p => p.ready);
        
        let html = `
            <div class="room-lobby-header">
                <button class="back-btn" id="backToRoomsFromLobby">← Voltar</button>
                <h2>${room.name}</h2>
                <div class="room-status">${room.status}</div>
            </div>
            <div class="room-lobby-content">
                <div class="mission-info">
                    <h3>${mission.name}</h3>
                    <p>${mission.description}</p>
                    <div class="mission-details">
                        <span>Nível ${mission.level}</span>
                        <span>${this.missionSystem.getDifficultyIcon(mission.difficulty)} ${mission.difficulty}</span>
                        <span>👥 ${room.players.size}/${room.maxPlayers}</span>
                    </div>
                </div>
                <div class="players-list">
                    <h3>Jogadores (${room.players.size}/${room.maxPlayers})</h3>
                    <div class="players-grid">
                        ${Array.from(room.players.values()).map(player => `
                            <div class="player-card ${player.ready ? 'ready' : ''} ${player.id === this.missionSystem.playerId ? 'current-player' : ''}">
                                <div class="player-avatar">
                                    <span class="character-icon">${this.getCharacterIcon(player.character)}</span>
                                </div>
                                <div class="player-info">
                                    <span class="player-name">${player.name}</span>
                                    <span class="player-level">Lv.${player.level}</span>
                                    <span class="player-status">${player.ready ? 'Pronto' : 'Aguardando'}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="lobby-actions">
                    <button class="ready-btn ${Array.from(room.players.values()).find(p => p.id === this.missionSystem.playerId)?.ready ? 'ready' : ''}" id="toggleReady">
                        ${Array.from(room.players.values()).find(p => p.id === this.missionSystem.playerId)?.ready ? 'Não Pronto' : 'Pronto'}
                    </button>
                    ${isHost ? `
                        <button class="start-mission-btn ${allPlayersReady ? '' : 'disabled'}" id="startMission" ${allPlayersReady ? '' : 'disabled'}>
                            Iniciar Missão
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        lobbyContainer.innerHTML = html;
        
        // Event listeners
        document.getElementById('backToRoomsFromLobby').addEventListener('click', () => {
            this.leaveRoom(roomId);
        });
        
        document.getElementById('toggleReady').addEventListener('click', () => {
            this.toggleReady(roomId);
        });
        
        if (isHost) {
            document.getElementById('startMission').addEventListener('click', () => {
                this.startMission(roomId);
            });
        }
    }
    
    toggleReady(roomId) {
        const room = this.missionSystem.getRoom(roomId);
        if (!room) return;
        
        const player = room.players.get(this.missionSystem.playerId);
        if (!player) return;
        
        const newReady = !player.ready;
        this.missionSystem.setPlayerReady(roomId, newReady);
        
        // Atualizar UI
        this.showRoomLobby(roomId);
    }
    
    startMission(roomId) {
        const success = this.missionSystem.startMission(roomId);
        if (success) {
            alert('Missão iniciando em 3 segundos...');
            // Aqui você pode implementar a transição para o jogo
        } else {
            alert('Não é possível iniciar a missão agora');
        }
    }
    
    getCharacterIcon(character) {
        const icons = {
            elesis: '⚔️',
            lire: '🏹',
            arme: '🔮'
        };
        return icons[character] || '❓';
    }
    
    formatTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        
        if (minutes < 1) return 'Agora';
        if (minutes < 60) return `${minutes}m atrás`;
        
        const hours = Math.floor(minutes / 60);
        return `${hours}h atrás`;
    }
}

// Definir globalmente
window.LobbySystem = LobbySystem;