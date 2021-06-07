let mapa = [
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"]
];

let acc = 0; // contador. Vai até 42 (empate). Par é preto, impar é vermelho

// em vez de uma variavel pra cada coluna, fiz um array em que cada
// posicao representa uma coluna de 0 a 6 /Gustavo
let qtdBolasNasColunas = [0, 0, 0, 0, 0, 0, 0];

// comecar com a preta

// e = espaco vazio
// v = bola vermelha
// p = bola preta

// SECAO FELIPE //


// função verificadora de vitória
    //  executa após cada mapeamento
    //  recebe array e procura por condicoes de vitória
    //  retorna vitoria ou nada (em caso de nada, segue o jogo)
    //  em caso de vitoria, chama um modal


// SECAO VILSON 

// função pra mapear a caixa e passar pro array 
        
const mapeamento = (coluna, bolasNaColuna) => { // vai receber coluna e quantidade de bolas
    // baseado na quantidade de bolas ela vai saber a linha
    // iniciar linha e coluna em -1
    let linha = (mapa.length - 1) - bolasNaColuna 
    let celula = mapa[linha][coluna]

    // alterar valores no array de acordo com coluna e linha
    if ( celula === "e") {
        if( acc % 2 === 0 ) {
            mapa[linha][coluna] = "p"
        } else {
            mapa[linha][coluna] = "v"
        }
    }

}

// funcao criar modal
    // recebe vitoria vermelho, vitoria preto ou empate
    // preenche modal de acordo com parametro recebido

// SECAO GUSTAVO


// listener movimentos mouse (teclado opcional)
// listener colunas
    // verificar se coluna tem espaço
        // se tiver, joga a bola
        // se não não faz nada
    // retorna coluna e quantidade de bolas(linha) e chama a função de mapeamento

    const criaListeners = document.querySelectorAll(".colunas").forEach(coluna => {
        coluna.addEventListener("click", () => {
            adicionarDisco(acc, coluna)
        });
    });

function adicionarDisco(corDisco, coluna) {
    let disco = document.createElement("div");
    disco.classList.add("bola")
    if (coluna.childElementCount < 6) {  // só deixa adicionar o disco se a coluna tiver menos que 6 discos
        if (corDisco % 2 === 0) {       // define cor de acordo com valor do acumulador (par = preta, impar = vermelha)
            disco.classList.add("bola-preta")
        } else {
            disco.classList.add("bola-vermelha")
        }
        coluna.prepend(disco);  // adiciona o disco de cima pra baixo e incrementa contador
        acc++;
        // daqui pra baixo, a funcao converte as propriedades da coluna atual para inteiros e chama
        // a funcao de mapeamento passando essas propriedades como parametro, alem de atualizar a quantidade de bolas
        // na coluna atual la no array.
        linha = parseInt(coluna.childElementCount-1); // detecta o numero da linha pela quantidade de bolas nela.  
        // o "-1" aí em cima é porque a linha vai ser sempre quantidade de elementos (discos) -1
        console.log("linha " + linha)
        coluna = parseInt(coluna.id);
        console.log("coluna " + coluna);
        qtdBolasNasColunas[coluna]++;
        mapeamento(coluna, linha)
        console.log(qtdBolasNasColunas)
    }
    
}



//  SECAO DE TESTES //



// branches_features
// toda vez que der push comunicar geral
// 