# 🎮 Nova Remains - Instruções de Uso

## ✅ **Problema Resolvido!**

O jogo estava funcionando parcialmente porque você estava abrindo o arquivo diretamente no navegador, causando erros de CORS.

## 🚀 **Como Usar Corretamente:**

### **Opção 1: Usar o Servidor HTTP (Recomendado)**
1. **Abra seu navegador**
2. **Digite:** `http://localhost:8000/index-simple-debug.html`
3. **Clique em "Mostrar Canvas"** para testar o canvas
4. **Clique em "Iniciar Jogo"** para começar a jogar

### **Opção 2: Usar o Arquivo Principal**
1. **Abra seu navegador**
2. **Digite:** `http://localhost:8000/index.html`
3. **Aguarde o carregamento** (pode demorar alguns segundos)
4. **Use os comandos de debug** se necessário

## 🔧 **Comandos de Debug Disponíveis:**

### **No Console do Navegador (F12):**
```javascript
// Testar sistemas
debugSystem.testSystems()

// Iniciar jogo
debugSystem.startGame()

// Mostrar canvas
debugSystem.showCanvas()

// Verificar status
debugSystem.updateStatus()
```

### **Comandos do Jogo Principal:**
```javascript
// Debug do jogo
debugGame()

// Debug da câmera
debugCamera()

// Spawnar inimigo
spawnEnemy('goblin')

// Dar experiência
giveExp(50)

// Curar jogador
healPlayer(50)
```

## 🎯 **Funcionalidades Disponíveis:**

### **Versão Simplificada (`index-simple-debug.html`):**
- ✅ Interface limpa sem loops infinitos
- ✅ Sistema de debug integrado
- ✅ Teste de canvas independente
- ✅ Detecção de problemas de CORS
- ✅ Apenas sistemas essenciais carregados

### **Versão Completa (`index.html`):**
- ✅ Todos os sistemas carregados
- ✅ Múltiplas telas e menus
- ✅ Sistema de seleção de heróis
- ✅ Mapa do mundo
- ✅ Sistema de missões

## 🐛 **Problemas Conhecidos e Soluções:**

### **Erro de CORS:**
- **Problema:** `Access to image at 'file:///...' from origin 'null' has been blocked by CORS policy`
- **Solução:** Use sempre o servidor HTTP (`http://localhost:8000`)

### **Loop Infinito:**
- **Problema:** Console spam com mensagens repetidas
- **Solução:** Use a versão simplificada ou execute `runFullDiagnosis()` no console

### **Menu Não Aparece:**
- **Problema:** Tela preta sem menu
- **Solução:** Aguarde o carregamento completo ou use F5 para recarregar

## 📊 **Status dos Sistemas:**

### **Sistemas Essenciais:**
- ✅ Game Class
- ✅ Player Class  
- ✅ Enemy Class
- ✅ SpriteManager

### **Sistemas Opcionais:**
- ⚠️ CombatSystem (pode estar faltando)
- ⚠️ UIManager (pode estar faltando)

## 🎮 **Como Jogar:**

1. **Inicie o servidor:** `python -m http.server 8000`
2. **Abra:** `http://localhost:8000/index-simple-debug.html`
3. **Clique em "Mostrar Canvas"** para testar
4. **Clique em "Iniciar Jogo"** para jogar
5. **Use ESC** para voltar ao menu

## 🔍 **Debug e Troubleshooting:**

### **Se o jogo não carregar:**
1. Abra o console (F12)
2. Execute `debugSystem.testSystems()`
3. Verifique se todos os sistemas estão OK
4. Use `debugSystem.showCanvas()` para testar o canvas

### **Se houver loops infinitos:**
1. Execute `runFullDiagnosis()` no console
2. Use `stopAllAnimationLoops()` para parar loops
3. Use `cleanupDOM()` para limpar elementos desnecessários

### **Se as imagens não carregarem:**
1. Verifique se está usando `http://localhost:8000`
2. Não abra o arquivo diretamente no navegador
3. Use o servidor HTTP sempre

## 🎉 **Sucesso!**

O jogo agora deve funcionar corretamente sem loops infinitos e com todos os sistemas carregados adequadamente.
