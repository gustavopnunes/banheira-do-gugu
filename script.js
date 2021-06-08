let mapa = [
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"],
    ["e","e","e","e","e","e","e"]
];

let acc = 0; // contador. Vai até 42 (empate). Par é preto, impar é vermelho
let col0 = 0;
let col1 = 0;
let col2 = 0;
let col3 = 0;
let col4 = 0;
let col5 = 0;
let col6 = 0;

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
const criarModal = (ganhador) => {// recebe vermelho, preto ou empate
    let myBody = document.querySelector("body")

    let fundoModal = document.createElement("div")
    fundoModal.classList.add("modal-fundo");
    myBody.appendChild(fundoModal);
    
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.classList.add( ganhador )
    fundoModal.appendChild(modal)
    
    let text = document.createElement("p");
    // preenche modal de acordo com parametro recebido
    if ( ganhador === "vermelho" ) {
        text.innerText = "O jogador vermelho venceu!"
    } else if ( ganhador === "preto" ) {
        text.innerText = "O jogador preto venceu!"
    } else {
        text.innerText = "Todo mundo saiu perdendo e você é um Bananão"
    }
    modal.appendChild(text)

    let button = document.createElement("button");
    button.innerText = "Jogar novamente"
    modal.appendChild(button)

    button.addEventListener("click", () => {
        let getModal = document.querySelector(".modal-fundo");
        return getModal.remove()
    })

}

// SECAO GUSTAVO


// listener movimentos mouse (teclado opcional)
// listener colunas
    // verificar se coluna tem espaço
        // se tiver, joga a bola
        // se não não faz nada
    // retorna coluna e quantidade de bolas(linha) e chama a função de mapeamento



function adicionarDisco(corDisco, coluna) {
    let disco = document.createElement("div");
    disco.classList.add("bola")
    if (coluna.childElementCount < 6) {
        if (corDisco % 2 === 0) {
            disco.classList.add("bola-preta")
        } else {
            disco.classList.add("bola-vermelha")
        }
        coluna.prepend(disco);
        acc++;
        qtdBolas = parseInt(coluna.childElementCount-1);
        console.log("linha " + qtdBolas)
        coluna = parseInt(coluna.id);
        console.log("coluna " + coluna);
        mapeamento(coluna, qtdBolas)
    }
    
}


const criaListeners = document.querySelectorAll(".colunas").forEach(coluna => {
    coluna.addEventListener("click", () => {
        adicionarDisco(acc, coluna)
    })
})

//  SECAO DE TESTES //



// branches_features
// toda vez que der push comunicar geral
// 