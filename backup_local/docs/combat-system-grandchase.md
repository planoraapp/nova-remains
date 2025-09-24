# Sistema de Combate Grand Chase - Base para Nova Remains

## Filosofia Base
- **Velocidade e Fluidez**: Movimento rápido com dashes, pulos duplos e combos aéreos
- **Controle de Grupo (Crowd Control)**: Habilidades focadas em juntar, levantar ou atordoar múltiplos inimigos
- **Alto Impacto Visual**: Habilidades especiais congelam a tela, mostram close-up do personagem e desencadeiam efeitos espetaculares

## Ataques Básicos e Combos

### Fundamento
- Ataque básico executado com uma única tecla (geralmente "Z")
- Pressionar repetidamente cria um combo automático

### Estrutura do Combo
1. **Início**: Os primeiros 2-3 ataques são rápidos e mantêm o inimigo "preso" em hitstun (leve atordoamento que impede reação)
2. **Meio**: Ataques que movem o personagem para frente, permitindo "carregar" inimigos pelo mapa
3. **Finalização**: Último golpe com efeito mais forte:
   - **Knockdown**: Derruba o inimigo no chão
   - **Knockback**: Empurra o inimigo para longe
   - **Launch**: Lança o inimigo para o ar (abre possibilidade de combo aéreo)

### Variações de Ataque
- **Dash Attack**: Ataque executado enquanto corre - bom alcance, inicia combate
- **Jump Attack**: Ataque no ar - essencial para combos aéreos e inimigos voadores
- **Critical Attack**: Ataque mais forte que quebra defesa (Cima + Z)
- **Double Attack**: Ataque rápido após pulo/plataforma (Baixo + Z)

## Poderes (Habilidades Especiais / MP)

### Recurso
- **Mana (MP)**: Preenchida ao atacar inimigos ou passivamente

### Níveis de Habilidade
- **Nível 1**: Habilidades rápidas, baixo custo, bom dano, efeito simples (atordoar, empurrar)
- **Nível 2**: Habilidades mais fortes, AoE maior, dano considerável
- **Nível 3**: Habilidades de altíssimo impacto, dano massivo em grande área, invencibilidade durante execução
- **Ultimate**: Habilidade máxima de poder

### Execução "Showstopper"
Ao usar habilidade de Nível 2 ou superior:
1. Tela congela por um instante
2. Fundo escurece
3. Aparece arte (cut-in) do personagem em close-up
4. Personagem grita o nome da habilidade
5. Animação da habilidade é executada

## Sistema de Dano

### Fórmula Básica
- **Dano** = Ataque do personagem vs Defesa do monstro

### Modificadores
- **Dano Crítico**: Chance baseada em stat Acerto Crítico, dano aumentado (1.5x-2x)
  - Visual: número maior e cor diferente (amarelo/laranja)
- **Status Negativos**: Queimadura, Veneno, Congelamento, Atordoamento, etc.

### Feedback Visual
- Cada golpe exibe número do dano causado
- Crucial para sensação de progressão e poder

## Tipos de Monstros

### Mobs Padrão
- Inimigos básicos que andam em direção ao jogador
- Executam ataque simples
- Exemplos: Goblins, Orcs

### Atiradores
- Ficam à distância e atacam com projéteis
- Exemplos: Arqueiros esqueletos

### Tanques
- Muita vida e defesa
- Às vezes com "Super Armadura" (não sofrem hitstun de ataques básicos)
- Exemplos: Golems

### Chefes (Bosses)
- Inimigos únicos com múltiplos padrões de ataque
- Muita vida e habilidades especiais próprias
- Frequentemente têm fases diferentes de combate

## IA (Inteligência Artificial)

### Comportamentos
1. **Patrulha**: Andar de um lado para o outro em área definida
2. **Agro**: Ao detectar jogador em raio de visão/alcance, fica agressivo
3. **Ataque**: Executa padrão de ataque com cooldown após atacar

## Hitbox (Caixa de Colisão)

### Conceitos Fundamentais
- **Hitbox de Ataque**: Área onde ataque pode causar dano
- **Hurtbox**: Área onde inimigo pode receber dano
- **Sobreposição**: Quando Hitbox se sobrepõe à Hurtbox, dano é registrado

### Características Importantes
- **Hitbox Maior**: Ataques têm hitbox maior que sprite da arma (facilita acertos)
- **AoE**: Habilidades especiais criam hitboxes enormes para múltiplos inimigos
- **Super Armadura**: Estado onde inimigo recebe dano mas não sofre hitstun (visualizado por brilho)

## Sistema de Movimentação

### 1. Movimentos Básicos (Controlados pelo Jogador)

#### Estado: Parado (Idle)
- **Ativação**: Nenhuma tecla de movimento pressionada
- **Descrição da Animação**: Animação em loop suave onde o personagem respira, com leve movimento dos braços, cabelo e roupas. Cada personagem terá uma "postura" que reflete sua personalidade (Juno firme, Kai alerta, Vega relaxada, Atlas focado)

#### Estado: Andar (Walk)
- **Ativação**: Pressionar levemente (ou apenas pressionar) as setas ← ou →
- **Descrição da Animação**: Ciclo de caminhada padrão com velocidade moderada, permitindo posicionamento preciso no cenário

#### Estado: Correr (Run/Dash)
- **Ativação**: Pressionar duas vezes rapidamente e segurar ← ou →
- **Descrição da Animação**: Animação de corrida energética com corpo inclinado para frente, movimentos amplos dos braços e leve poeira nos pés. Velocidade significativamente maior que a caminhada

#### Estado: Pular (Jump)
- **Ativação**: Pressionar tecla de pulo (Barra de Espaço ou Seta para Cima)
- **Descrição da Animação**: 3 fases:
  - **Antecipação**: Personagem se agacha por 1-2 frames antes de saltar
  - **Ascensão**: Personagem subindo com joelhos dobrados
  - **Topo/Arco**: Ponto mais alto do pulo, começando a descer

#### Estado: Pulo Duplo (Double Jump)
- **Ativação**: Pressionar tecla de pulo novamente enquanto está no ar
- **Descrição da Animação**: Animação distinta do primeiro pulo - personagem "chuta" o ar ou faz giro/cambalhota. Efeito visual (anel de ar nos pés) para feedback. Só pode ser usado uma vez antes de tocar o chão

#### Estado: Cair (Fall)
- **Ativação**: Quando personagem está descendo no ar (após pulo ou queda de plataforma)
- **Descrição da Animação**: Diferente da subida do pulo - personagem mais esticado, braços e pernas se preparando para aterrissagem

#### Estado: Aterrissar (Land)
- **Ativação**: Ao tocar o chão após pulo ou queda
- **Descrição da Animação**: Animação curta (2-3 frames) onde personagem absorve impacto flexionando joelhos. De queda alta, animação mais dramática. Transição imediata para estado Parado

#### Estado: Agachar (Crouch)
- **Ativação**: Segurar Seta para Baixo (↓)
- **Descrição da Animação**: Personagem se agacha, hurtbox diminui de altura, permitindo desviar de projéteis altos

### 2. Movimentos de Reação (Controlados por Interações)

#### Estado: Recebendo Dano (Hitstun/Flinch)
- **Ativação**: Ao ser atingido por ataque inimigo
- **Descrição da Animação**: Animação curta e brusca onde personagem "treme" ou é jogado para trás com expressão de dor. Jogador perde controle por fração de segundo

#### Estado: Derrubado (Knocked Down)
- **Ativação**: Ao ser atingido por ataque forte (finalizador de combo inimigo)
- **Descrição da Animação**: Personagem é arremessado para trás e cai no chão

#### Estado: Caído no Chão (Downed)
- **Ativação**: Após animação de Derrubado
- **Descrição da Animação**: Personagem fica deitado no chão por 1-2 segundos. Durante este estado, geralmente fica invencível para evitar ataques infinitos

#### Estado: Levantando (Get Up)
- **Ativação**: Automaticamente após tempo no estado Caído no Chão
- **Descrição da Animação**: Personagem se apoiando e ficando de pé, pronto para voltar à ação

### 3. Movimentos Contextuais (Interação com o Cenário)

#### Estado: Atravessar Plataforma (Drop Down)
- **Ativação**: Pressionar Seta para Baixo (↓) enquanto estiver em plataforma "atravessável"
- **Descrição da Animação**: Personagem faz pequeno movimento para baixo e atravessa plataforma, começando animação de Cair

## Aplicação no Nova Remains

Este sistema serve como base para implementar:
- Sistema de combos fluidos e responsivos
- Habilidades com impacto visual espetacular
- Diferentes tipos de inimigos com comportamentos únicos
- Sistema de dano com feedback visual claro
- Mecânicas de hitbox precisas e satisfatórias
- Sistema de movimentação completo e responsivo
- Estados de animação que refletem personalidade dos personagens
- Interações contextuais com o ambiente de jogo
