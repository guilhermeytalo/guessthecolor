# Guess the color

O jogo consiste em acertar o máximo possível de cores em 30s. Quando o jogo inicia, uma cor aleatória irá aparecer e para ela deverão aparecer 3 opções de resposta (obrigatoriamente em hexadecimal). Sendo duas incorretas (geradas aleatoriamente), e uma correta. A cada rodada, uma nova cor aparece, e o jogador terá 10s para responder e resultar em ganho ou perda de pontuação.

## Tecnologias utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)

## Rodando o projeto

```bash
git clone https://github.com/guilhermeytalo/guessthecolor.git
cd guessthecolor
yarn
```

## Considerações

O teste em sí analísa bastante a capacidade relacionada a entender sobre arrays, functios, states, localStorage e também sobre a ótica de ux/ui, acredito que a dificuldade está em como o usuário irá interagir com o jogo pelas diversas ações que pode ser feita.

- Feito
    - [x] criar função de timer e timer de 30 sec
    - [x] criar restart
    - [x] criar start 
    - [x] criar cor aleatoria 
    - [x] criar selecionador das cores 
    - [x] refatorar em componentes
    - [x] persistencia dos dados local Storage


- Fazer/Bugs e Dificuldades 
    - [ ] Fazer
        - [ ] criar  barra de timer de 10 sec
        - [ ] criar barra lateral para armazenar as cores corretas/incorretas, e o score
        - [ ] criar um botão de Reset all Data
    - [ ] Bugs
        - [ ] HighScore não está funcionando como esperado(decrementando o score)
        - [ ] o timer tem um bug no estado ao selecionar uma cor
    - [ ] Dificuldades
        - [ ] Gerenciar diversos estados, acredito que poderia ser feito de uma maneira melhor
        - [ ] Futuramente estudar mais sobre redux que acredito que poderia ter feito muita diferença