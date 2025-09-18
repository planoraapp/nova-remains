# Sistema de Parallax - Nova Remains

## Visão Geral

O Sistema de Parallax do Nova Remains foi implementado baseado no commit `9e401c9` com a mensagem "feat: Implementar sistema de assets do mapa com parallax". Este sistema cria uma experiência visual imersiva através de múltiplas camadas de fundo que se movem em velocidades diferentes, criando profundidade e movimento.

## Arquivos Implementados

### 1. `js/parallax-system.js`
Sistema principal de parallax com as seguintes funcionalidades:
- Carregamento automático de imagens de parallax
- Fallbacks programáticos para cada camada
- Sistema de repetição infinita
- Controle de velocidade por camada
- Integração com sistema de câmera
- Suporte a transparência
- Debug e informações detalhadas

### 2. `js/parallax-config.js`
Sistema de configuração com:
- Configurações dinâmicas de camadas
- Modos de performance (low/balanced/high)
- Configurações específicas por missão
- Controle de velocidade e transparência
- Integração automática com o jogo

### 3. `generate-parallax-assets.html`
Gerador de assets de parallax que cria:
- Camada do céu com estrelas e nebulosas
- Montanhas distantes com silhuetas
- Árvores com detalhes naturais
- Primeiro plano com pedras e grama
- Elementos decorativos com partículas

### 4. `assets/images/backgrounds/parallax/`
Diretório para os assets de parallax gerados.

## Camadas de Parallax

### 1. Céu (Sky Layer)
- **Velocidade**: 0.1
- **Altura**: 400px
- **Conteúdo**: Gradiente do céu, estrelas, nebulosas
- **Prioridade**: 1 (fundo)

### 2. Montanhas Distantes (Far Mountains)
- **Velocidade**: 0.3
- **Altura**: 300px
- **Conteúdo**: Silhuetas de montanhas, gradientes
- **Prioridade**: 2

### 3. Árvores (Trees Layer)
- **Velocidade**: 0.6
- **Altura**: 200px
- **Conteúdo**: Árvores, arbustos, vegetação
- **Prioridade**: 3

### 4. Primeiro Plano (Foreground)
- **Velocidade**: 1.2
- **Altura**: 150px
- **Conteúdo**: Pedras, grama, elementos próximos
- **Prioridade**: 4

### 5. Elementos Decorativos (Decorative)
- **Velocidade**: 1.5
- **Altura**: 100px
- **Conteúdo**: Partículas, brilhos, efeitos especiais
- **Prioridade**: 5 (frente)
- **Transparência**: 0.8

## Configurações por Missão

Cada missão tem configurações específicas de parallax:

- **Tutorial**: Velocidades reduzidas para facilitar aprendizado
- **Sanctuary**: Configuração padrão balanceada
- **Void**: Efeitos mais dramáticos com transparências
- **Ruins**: Atmosfera misteriosa com camadas semi-transparentes
- **Temple**: Movimento suave e elegante
- **Comet**: Velocidades altas para efeito de velocidade espacial

## Modos de Performance

### Low Performance
- Máximo 3 camadas ativas
- Pula 2 frames por atualização
- Reduz qualidade visual

### Balanced (Padrão)
- Todas as 5 camadas ativas
- Pula 1 frame por atualização
- Qualidade visual completa

### High Performance
- Todas as 5 camadas ativas
- Sem pulo de frames
- Qualidade visual máxima

## Integração com o Jogo

O sistema se integra automaticamente com:

1. **Sistema de Câmera**: Sincroniza com a posição da câmera do jogo
2. **Level Design System**: Substitui o sistema de parallax antigo
3. **Game Loop**: Atualiza junto com o loop principal do jogo
4. **Sistema de Missões**: Aplica configurações específicas por missão

## Uso

### Inicialização Automática
O sistema se inicializa automaticamente quando a página carrega.

### Controle Manual
```javascript
// Alterar velocidade de uma camada
setLayerSpeed('sky', 0.2);

// Alterar transparência
setLayerAlpha('decorative', 0.5);

// Habilitar/desabilitar camada
toggleParallaxLayer('decorative', false);

// Aplicar configuração de missão
applyMissionParallaxConfig('void');

// Alterar modo de performance
setPerformanceMode('high');
```

### Debug
```javascript
// Ver status do sistema
window.parallaxSystem.logStatus();

// Ver configuração atual
console.log(getParallaxConfig());
```

## Geração de Assets

Para gerar novos assets de parallax:

1. Abra `generate-parallax-assets.html` no navegador
2. Clique em "Gerar Todas as Camadas"
3. Baixe os assets gerados
4. Coloque-os em `assets/images/backgrounds/parallax/`

## Fallbacks

Se as imagens não carregarem, o sistema automaticamente gera fallbacks programáticos para cada camada, garantindo que o parallax sempre funcione.

## Performance

O sistema é otimizado para:
- Carregamento assíncrono de imagens
- Renderização eficiente com canvas
- Controle de qualidade baseado no dispositivo
- Integração suave com o game loop

## Compatibilidade

- Suporta todos os navegadores modernos
- Fallbacks para navegadores antigos
- Responsivo para diferentes resoluções
- Otimizado para dispositivos móveis

## Futuras Melhorias

- Suporte a animações de camadas
- Efeitos de clima dinâmicos
- Transições entre diferentes temas
- Integração com sistema de partículas
- Suporte a shaders WebGL
