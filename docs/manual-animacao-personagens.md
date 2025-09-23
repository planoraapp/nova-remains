# Nova Remains - Manual de Produção e Animação de Personagens

## Introdução: Propósito e Filosofia

Este manual serve como a fonte única de verdade para toda a arte, rigging e animação de personagens 2D para o projeto Nova Remains. Ele foi projetado para ser um guia prático para o editor e uma ferramenta de direção para o líder do projeto. A nossa filosofia de animação está enraizada no estilo dinâmico e de alto impacto de RPGs de ação como Grand Chase. Priorizaremos o "game feel" — garantindo que cada movimento seja responsivo, comunique o caráter do personagem e seja satisfatório para o jogador. Este documento estabelecerá um pipeline escalável, desde a segmentação inicial da arte do personagem até a entrega final de sprite sheets otimizadas para a web.

## Parte I: O Pipeline Fundamental: Da Arte Estática ao Personagem Animado

Esta parte estabelece o fluxo de trabalho técnico principal. É agnóstica em relação ao software, focando em princípios que podem ser aplicados em qualquer ferramenta moderna de animação 2D (por exemplo, Spine, pacote 2D Animation da Unity, Blender).

### Princípios da Animação Esquelética 2D (Rigging)

A escolha da animação esquelética, ou rigging, em vez da animação tradicional quadro a quadro, é uma decisão estratégica para este projeto. Os principais benefícios incluem interpolação mais suave, tamanho de arquivo de trabalho menor (antes da exportação para sprite sheets), iteração mais fácil e a capacidade de mesclar animações. Isso contrasta com a natureza laboriosa de redesenhar cada quadro, que é menos eficiente para um jogo com muitas ações. O fluxo de trabalho fundamental não é simplesmente animar e usar diretamente no motor de jogo; para um jogo web, o processo é: Rig -> Animar -> Exportar Quadros -> Empacotar Sprite Sheet -> Implementar no Jogo Web. Isso torna o software de rigging uma ferramenta intermediária para a geração eficiente de quadros, sendo os princípios do processo mais importantes do que a ferramenta específica escolhida.

### Conceitos Fundamentais Definidos

**Ossos e Hierarquia:** "Ossos" são pontos digitais que formam um esqueleto. A hierarquia pai-filho é crítica; mover um osso pai (por exemplo, o ombro) também moverá seus filhos (por exemplo, o cotovelo, pulso, mão). Esta é a base do movimento do personagem.

**Malha e Vértices:** A arte do personagem é convertida em uma malha deformável de vértices. Os ossos não movem a imagem em si; eles movem os vértices desta malha.

**Pintura de Pesos (Weight Painting):** Este é o processo de atribuir influência de cada osso aos vértices circundantes. Uma ponderação adequada é o que faz uma articulação dobrar-se naturalmente (uma curva suave do cotovelo) em vez de forma não natural (uma dobra acentuada, com aparência de quebrada).

**Pontos de Pivô:** O ponto em torno do qual uma parte do corpo gira. A colocação correta dos pivôs (por exemplo, o centro da articulação do ombro, não a borda do sprite do braço) é essencial para um movimento realista.

## Parte II: A Biblioteca de Animação Universal

Esta parte foca na criação do conjunto principal de animações que todos os personagens compartilharão. O estilo de Grand Chase será a nossa principal referência estética.

### Tabela: Lista Mestra de Animações

| Personagem | Nome da Animação | Contagem de Quadros Alvo | Descrição / Sensação Chave | Prioridade |
|------------|------------------|---------------------------|----------------------------|------------|
| Todos | Idle (Parado) | 48-60 quadros @ 24fps | Calmo, respirando, pronto, com mudanças sutis de peso. | 1 (Alta) |
| Todos | Blink (Piscar - Sobreposição) | 3 quadros | Um fechar/abrir de olhos rápido e natural. Para ser acionado aleatoriamente. | 1 (Alta) |
| Todos | Walk (Andar) | 16 quadros | Com propósito, reflete a personalidade do personagem. | 1 (Alta) |
| Todos | Run / Dash (Correr) | 12 quadros | Dinâmico e energético. O dash pode ser uma animação única. | 1 (Alta) |
| Todos | Jump (Decolagem) | 4-5 quadros | Movimento explosivo para cima, a antecipação é a chave. | 2 (Média) |
| Todos | Jump (Ápice/Queda) | 8-12 quadros (loop) | Uma animação em loop para subir e descer. | 2 (Média) |
| Todos | Jump (Aterrissagem) | 4-5 quadros | Absorvendo o impacto, recuperação. | 2 (Média) |
| Todos | Combo de Ataque Básico | Varia | Combo de 3 partes específico do personagem. | 1 (Alta) |
| Todos | Take Damage / Hit (Receber Dano) | 4-6 quadros | Recuo acentuado e reativo. | 2 (Média) |
| Todos | Defeated (Derrotado) | 24-30 quadros | Colapso e ficar imóvel. | 3 (Baixa) |

## Parte III: Projetos de Animação Específicos dos Personagens

### Vega, a Tecelã Arcana (Referência: Ley)
**Sensação Principal:** Etérea, flutuante, controlada. O seu poder é exercido sem esforço.

**Postura e Locomoção:** A sua pose de idle a terá flutuando ligeiramente acima do chão, com um movimento suave de balanço. O seu "andar" e "correr" serão deslizes suaves. O seu dash será um teletransporte de curto alcance, como visto com Ley, com um efeito visual de início e fim.

**Combo de Ataque Básico:** Uma sequência de três partes baseada nos ataques à distância de Ley.
- **Ataque 1 (Reunir):** Vega puxa as mãos para trás, reunindo energia arcana numa pequena esfera brilhante. (Princípio: Antecipação).
- **Ataque 2 (Impulso):** Um impulso rápido e para a frente das mãos, lançando a esfera.
- **Ataque 3 (Descarga):** Uma reunião de energia maior e mais dramática para uma explosão final mais poderosa, com uma animação de recuperação mais longa para significar o fim do combo. (Princípio: Continuidade nas vestes após o movimento).

### Juno, a Cavaleira Inabalável (Referência: Ronan)
**Sensação Principal:** Ancorada, poderosa, deliberada. Cada golpe tem peso.

**Postura e Locomoção:** Uma postura larga e estável, com a arma pronta. A sua caminhada é uma marcha pesada e determinada. A sua corrida é uma carga poderosa, possivelmente com o escudo erguido.

**Combo de Ataque Básico:** Um combo de três golpes inspirado na esgrima deliberada e impactante de Ronan.
- **Ataque 1 (Corte Horizontal):** Um corte amplo e arrebatador da direita para a esquerda. Foco na rotação do torso e no seguimento do movimento. (Princípio: Arcos).
- **Ataque 2 (Pancada com Escudo/Estocada):** Uma estocada rápida para a frente com a espada ou uma pancada com o escudo para quebrar a guarda do inimigo.
- **Ataque 3 (Golpe de Cima para Baixo):** Um poderoso golpe de cima para baixo com as duas mãos que parece um finalizador de combo. A animação deve incluir um ligeiro salto e um quadro de impacto pesado. (Princípios: Exagero na pose e Timing para dar peso).

### Atlas, a Flecha Invisível (Referência: Lire / Dio)
**Sensação Principal:** Ágil, preciso, focado. Um predador que mantém a distância.

**Postura e Locomoção:** Uma postura ágil e pronta, com o arco segurado de forma relaxada. A sua caminhada é um rondar de pés leves. A sua corrida é um sprint rápido e de baixo perfil.

**Combo de Ataque Básico:** Uma sequência rápida de armar e disparar.
- **Ataque 1 e 2 (Tiros Rápidos):** Dois tiros rápidos. A animação é um loop fluido de tirar uma flecha da aljava, armar, puxar brevemente e soltar.
- **Ataque 3 (Tiro Carregado):** Esta será uma animação distinta. Atlas planta os pés, puxa a corda do arco muito mais para trás (até à orelha) e segura. Um efeito visual (flecha brilhante) deve indicar a carga. A libertação é um recuo poderoso. (Princípio: Antecipação prolongada para criar tensão).

### Kai, a Lâmina Sombria (Referência: Lass)
**Sensação Principal:** Rápido, acrobático, implacável. Um borrão de movimento.

**Postura e Locomoção:** Uma postura baixa e encolhida, como uma mola comprimida. A sua caminhada é um rastejar silencioso, felino. A sua corrida é um dash de ninja explosivo, inclinado para a frente, com os braços para trás.

**Combo de Ataque Básico:** Um combo rápido de adagas com múltiplos golpes, inspirado nos ataques de alta mobilidade de Lass.
- **Ataque 1 (Corte Duplo):** Um dash rápido para a frente e um corte em forma de X com ambas as adagas. (Prática: Usar Smear Frames para os sprites das adagas).
- **Ataque 2 (Golpe Giratório):** Um giro completo de 360 graus, atingindo inimigos por todos os lados.
- **Ataque 3 (Chute Aéreo com Salto):** Um salto acrobático para trás, chutando o inimigo para criar distância e aterrando perfeitamente de volta na sua postura pronta. (Princípio: Exagero na pose aérea).

## Parte IV: Os 12 Princípios da Animação Aplicados

### 1. Compressão e Extensão (Squash and Stretch)
Este princípio dá a sensação de peso, volume e flexibilidade.

**Aplicação:** Quando Juno aterra de um salto, seu corpo deve comprimir-se ligeiramente por alguns quadros para mostrar o impacto. Em contraste, a armadura dela não se deforma. O corpo de Kai, sendo mais ágil, pode esticar-se mais durante um salto ou um dash rápido. Importante: O volume do objeto deve permanecer consistente. Se ele comprime na vertical, deve expandir na horizontal.

### 2. Antecipação (Anticipation)
Prepara o espectador para uma ação e a torna mais poderosa.

**Aplicação:** Antes de Juno desferir seu golpe de cima para baixo, ela deve levantar a espada bem alto, segurando a pose por alguns quadros. Antes de Kai dar um dash, ele deve se agachar, comprimindo seu corpo como uma mola.

### 3. Encenação (Staging)
Apresentar a ação de forma clara e inequívoca.

**Aplicação:** A silhueta do personagem deve ser legível em todos os momentos. Para o tiro carregado de Atlas, sua pose deve ser clara e lateral, para que o jogador veja claramente o arco sendo puxado.

### 4. Continuidade e Sobreposição (Follow Through and Overlapping Action)
Nem todas as partes do corpo param ao mesmo tempo.

**Aplicação:** Quando Vega para abruptamente após um teletransporte, seu cabelo e vestes devem continuar a se mover para a frente por mais alguns quadros antes de assentarem.

### 5. Arcos (Arcs)
A maioria dos movimentos naturais segue uma trajetória arqueada.

**Aplicação:** O editor deve garantir que a ponta da espada de Juno, o punho de Kai ou a flecha de Atlas se movam em arcos suaves, e não em linhas retas.

### 6. Exagero (Exaggeration)
Levar as poses e movimentos além da realidade para aumentar o impacto e a emoção.

**Aplicação:** No quadro de impacto de um ataque poderoso, a pose pode ser mais extrema do que seria fisicamente possível. O recuo de um golpe pode ser maior, a altura de um salto pode ser mais exagerada.

## Parte V: Guia Prático de Geração de Sprites para Movimento

### Anatomia em Movimento: O Torso é o Rei
O movimento nunca começa nos membros; ele começa no núcleo do corpo.

**Instrução para o Editor:** Ao animar um ataque de espada de Juno, comece girando os quadris e o torso. O torso lidera, e os braços e a espada seguem o movimento. Isso cria um senso de poder e momento.

### Criando a Ilusão de Velocidade

**Smear Frames:** Para os ataques de adaga de Kai, em vez de desenhar a adaga em posições distintas em quadros consecutivos, crie um "smear frame" no meio. Este sprite intermediário é uma versão esticada e borrada da adaga, preenchendo o espaço entre a pose inicial e final.

**Linhas de Ação:** Para cada pose chave (especialmente em ataques e saltos), desenhe uma "linha de ação" imaginária através do personagem. Esta linha, geralmente uma curva em 'C' ou 'S', deve representar a energia e a direção do movimento.

## Glossário do Diretor

- **Keyframe:** Uma pose criada manualmente que define o início ou o fim de um movimento.
- **In-betweens:** Os quadros gerados entre os keyframes.
- **Antecipação:** A preparação para uma ação (o agachamento antes de um salto).
- **Follow-through e Overlapping Action:** A ideia de que diferentes partes do corpo se movem a ritmos diferentes e continuam a mover-se depois de a ação principal ter parado.
- **Timing e Spacing:** Quão rápida ou lenta é uma ação, e como os quadros são espaçados para criar aceleração e desaceleração.
- **Pose-to-Pose:** O método de animação que será utilizado, focando primeiro na criação de poses chave fortes.
- **Smear Frame:** Um quadro deliberadamente desfocado para criar a ilusão de movimento rápido.
