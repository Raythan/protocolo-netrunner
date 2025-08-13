# Protocolo-Netrunner

Protocolo-Netrunner é um jogo incremental/clicker com temática cyberpunk, onde você assume o papel de um netrunner invadindo sistemas, coletando hardware, aprimorando habilidades e enfrentando desafios digitais.

## Estrutura do Projeto

O projeto foi organizado em uma estrutura modular para facilitar a manutenção e desenvolvimento:

```
protocolo-netrunner/
├── css/
│   └── styles.css          # Estilos do jogo
├── js/
│   ├── constants.js        # Constantes e configurações
│   ├── gameData.js         # Dados estáticos (hardware, agentes, etc)
│   ├── gameState.js        # Estado do jogo e propriedades
│   ├── gameLogic.js        # Lógica principal do jogo
│   ├── utils.js           # Funções utilitárias
│   └── storage.js         # Sistema de salvamento/carregamento
├── index.html             # Arquivo principal
└── README.md             # Documentação
```

## Como Jogar

1. Clique no alvo para executar ciclos de invasão
2. Ganhe reputação e créditos para evoluir
3. Colete hardware e melhore seu equipamento
4. Treine atributos e aprimore habilidades
5. Gerencie seu nível de rastreamento
6. Alcance prestígio para bônus permanentes

## Características

- Sistema de combos
- Eventos aleatórios
- Hardware com raridades
- Árvore de habilidades
- Sistema de conquistas
- Prestígio
- Salvamento automático

## Tecnologias Utilizadas

- HTML5 e CSS3
- JavaScript (ES6+)
- Vue.js 3 (CDN)
- Tailwind CSS (CDN)
- Font Awesome
- Animate.css
- Day.js

## Desenvolvimento

O projeto é totalmente client-side, não requerendo instalação de dependências ou build tools. Para desenvolver:

1. Clone o repositório
2. Abra o `index.html` em um navegador
3. Faça modificações nos arquivos específicos:
   - Alterações visuais em `styles.css`
   - Novos itens/sistemas em `gameData.js`
   - Mecânicas em `gameLogic.js`
   - etc.

## Licença

MIT
