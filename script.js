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

    // const criaListeners = document.querySelectorAll(".colunas").forEach(coluna => {
    //     coluna.addEventListener("click", () => {
    //         adicionarDisco(acc, coluna)
    //     });
    // });

// function adicionarDisco(corDisco, coluna) {
//     let disco = document.createElement("div");
//     let alturaAnimacao = 500;
//     disco.classList.add("bola")
//     if (coluna.childElementCount < 6) {  // só deixa adicionar o disco se a coluna tiver menos que 6 discos
//         if (corDisco % 2 === 0) {       // define cor de acordo com valor do acumulador (par = preta, impar = vermelha)
//             disco.classList.add("bola-preta")
//         } else {
//             disco.classList.add("bola-vermelha")
//         }
//         let root = document.documentElement;
//         // esse arranjo tecnico ai em baixo corrige a altura de animacao das bolas, pra elas cairem sempre a partir do mesmo ponto
//         root.style.setProperty("--altura-animacao", `translateY(-${(alturaAnimacao-100*coluna.childElementCount)}%`);
//         coluna.prepend(disco);  // adiciona o disco de cima pra baixo e incrementa contador
//         // daqui pra baixo, a funcao converte as propriedades da coluna atual para inteiros e chama
//         // a funcao de mapeamento passando essas propriedades como parametro, alem de atualizar a quantidade de bolas
//         // na coluna atual la no array.
//         linha = parseInt(coluna.childElementCount-1); // detecta o numero da linha pela quantidade de bolas nela.  
//         // o "-1" aí em cima é porque a linha vai ser sempre quantidade de elementos (discos) -1
//         console.log("linha " + linha)
//         coluna = parseInt(coluna.id);
//         console.log("coluna " + coluna);
//         qtdBolasNasColunas[coluna]++;
//         mapeamento(coluna, linha)
//         acc++;
//         console.log(qtdBolasNasColunas)
//     } 
// }

const maisListeners = document.querySelectorAll(".colunas").forEach(coluna => {
    coluna.addEventListener("mouseenter", () => {
        suspenderDisco(acc, coluna)
    });
});


const criaListeners = document.querySelectorAll(".colunas").forEach(coluna => {
    coluna.addEventListener("click", () => {
        adicionarDisco(coluna)
    });
});

let disco = document.createElement("div");
function suspenderDisco(corDisco, coluna) {
    if (acc % 2 === 0) {       // define cor de acordo com valor do acumulador (par = preta, impar = vermelha)
        disco.classList.add("bola-preta")
    } else {
        disco.classList.add("bola-vermelha")
    }
    disco.classList.add("disco-suspenso");
    disco.id = "disco-suspenso"
    coluna.append(disco);
}

function adicionarDisco(coluna) {
    if (!disco.classList.contains("disco-suspenso") || (coluna.childElementCount > 6)) {
        console.log("disco sem classe ou coluna cheia. Impedindo de adicionar");
        return;
    };

    let alturaAnimacao = 500;
    let root = document.documentElement;
    root.style.setProperty("--altura-animacao", `translateY(-${(alturaAnimacao-100*coluna.childElementCount)}%`);
    disco.removeAttribute("id")
    disco.classList.remove("disco-suspenso");
    disco.classList.add("bola");
    let linha = parseInt(coluna.childElementCount-1); // detecta o numero da linha pela quantidade de bolas nela.  
    console.log("linha " + linha)
    coluna.prepend(disco);
    disco = document.createElement("div");
    acc++;
    verificaVitoria(linha, coluna, acc)
    suspenderDisco(acc, coluna);
    coluna = parseInt(coluna.id);
    console.log("coluna " + coluna);
    qtdBolasNasColunas[coluna]++;
    console.log(qtdBolasNasColunas);
    mapeamento(coluna, linha);
}

//  SECAO DE TESTES //



// branches_features
// toda vez que der push comunicar geral
// 



    
