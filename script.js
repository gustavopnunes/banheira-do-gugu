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

function verificaVitoria(linha, coluna, acc){
    let acc1=0;
    let ganhador='';
    let indiceLinha=0;
    let indiceColuna=0;
    let x='';
    let y='';
    let p=0;
    let v=0;
    if( acc===42){
        ganhador='empate'; criarModal(ganhador);
    }
    for (let i=0; i<7; i++){ //verificação para linha
        if (mapa[5-linha][i] === mapa[5-linha][i+1] && mapa[5-linha][i]!=='e'){
            acc1++;
        }else{
            acc1=0;
        }
        if (acc1===3){
            if(mapa[5-linha][i-1]==='v'){ganhador='vermelho'; criarModal(ganhador);}
            if(mapa[5-linha][i-1]==='p'){ganhador='preto'; criarModal(ganhador);}    
        }
    }
    for (let i=0; i<5; i++){ // verificação para coluna
        if (mapa[i][coluna] === mapa[i+1][coluna] && mapa[i][coluna]!=='e'){
            acc1++
        }else{
            acc1=0
        }
        if (acc1===3){
            if(mapa [i-1][coluna]==='v'){ganhador = 'vermelho'; criarModal(ganhador);}
            if(mapa [i-1][coluna]==='p'){ganhador = 'preto'; criarModal(ganhador);}
        }
    }
    // lógica para verificação de diagonais:

    // diagonal principal:
    for (let i=0; i<7; i++){
        if((5-linha+i)<6 && (coluna+i)<7){
            if (mapa[5-linha+i][coluna+i]!=='e'){
                indiceLinha=5-linha+i;
                indiceColuna=coluna+i;
            }
        }
    }
    console.log('indiceLinha: '+indiceLinha+', indiceColuna: '+indiceColuna)
    for (let i=0; i<7; i++){
        if ((indiceLinha-i)>=0 && (indiceColuna-i)>=0 && mapa[indiceLinha-i][indiceColuna-i]==='p'){
            p++;
            v=0;
        }else if((indiceLinha-i)>=0 && (indiceColuna-i)>=0 && mapa[indiceLinha-i][indiceColuna-i]==='v'){
            v++;
            p=0;
        }        
        if(v>3){
            ganhador = 'vermelho'; 
            criarModal(ganhador);
        }else if(p>3){
            ganhador = 'preto';
            criarModal(ganhador);
        }
    }
    p=0;
    v=0;
    // diagonal oposta:
    for (let i=0; i<7; i++){
        if((5-linha-i)>=0 && (coluna+i)<7){
            if (mapa[5-linha-i][coluna+i]!=='e'){
                indiceLinha=5-linha-i
                indiceColuna=coluna+i;
            }
        }
    }
    for (let i=0; i<7; i++){
        if ((indiceLinha+i)<6 && (indiceColuna-i)>=0 && mapa[indiceLinha+i][indiceColuna-i]==='p'){
            p++
            v=0;
        }else if(p>3){
            ganhador='preto';
            criarModal(ganhador);
        }
        if ((indiceLinha+i)<6 && (indiceColuna-i)>=0 && mapa[indiceLinha+i][indiceColuna-i]==='v'){
            v++
            p=0;
        }else if(v>3){
            ganhador='vermelho';
            criarModal(ganhador);
        }
    }
}

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

    let figure = document.createElement("figure")
    modal.appendChild(figure)
    
    let gif = document.createElement("img")
    if ( ganhador === "empate" ) {
        gif.src = "./assets/img/gugu-movimento.gif"
        gif.alt = "Gugu fazerndo um movimento com a mão ao lado do vocalista do Mamonas Assassínas."
    } else {
        gif.src = "./assets/img/gugu.gif"
        gif.alt = "Gugu arrepiado,com cara expressando êxtase."
    }
    figure.appendChild(gif)
    
    let figcaption = document.createElement("figcaption")
    figcaption.classList.add("hidden")
    if ( ganhador === "empate" ) {
        figcaption.innerText = "Gugu fazendo movimento com a mão."
    } else {
        figcaption.innerText = "Gugu feliz."
    }
    figure.appendChild(figcaption)

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
        let bolas = document.querySelectorAll(".bola")
        for ( let i = 0; i < bolas.length; i++ ) {
            bolas[i].remove()
        }
        acc = 0;
        for ( let i = 0; i < mapa.length; i++ ) {
            mapa[i] = mapa[i].map( (item) => item = "e" )
        }
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
//             disco.classList.add("bola-azul")
//         } else {
//             disco.classList.add("bola-amarela")
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
        disco.classList.add("bola-azul")
    } else {
        disco.classList.add("bola-amarela")
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
    suspenderDisco(acc, coluna);
    coluna = parseInt(coluna.id);
    console.log("coluna " + coluna);
    qtdBolasNasColunas[coluna]++;
    console.log(qtdBolasNasColunas);
    mapeamento(coluna, linha);
    trocarRostos();
    trocarFrase();
    rodarRosto()
    setTimeout(function() {
        verificaVitoria(linha, coluna, acc);
    },(1000 - qtdBolasNasColunas[coluna]*100));
    
}

function trocarRostos() {
    let rostoMeninas = document.querySelector(".rosto-meninas");
    let rostoMeninos = document.querySelector(".rosto-meninos");
    if (acc % 2 != 0) {
        rostoMeninas.src = "assets/img/turno-meninas.png";
        rostoMeninos.src = "assets/img/meninos.png";
    } else {
        rostoMeninas.src = "assets/img/meninas.png";
        rostoMeninos.src = "assets/img/turno-meninos.png";
    }
}

function trocarFrase() {
    let frase = document.querySelector(".frase-turno")
    if (acc % 2 != 0) {
        frase.textContent = "Vez da Sheila do Tchan!"
    } else {
        frase.textContent = "Vez do Tiririca!"
    }
}

function rodarRosto() {
    let imgHomems = document.querySelector(".espaco-rostoH");
    let imgMulheres = document.querySelector(".espaco-rostoM");
    if (acc % 2 === 0) {
        imgHomems.classList.add("jogador-turno");
        if (imgMulheres.classList.contains("jogador-turno")) {
            imgMulheres.classList.remove("jogador-turno")
            console.log(imgHomems)
        }
    } else {
        console.log(imgMulheres);
        imgMulheres.classList.add("jogador-turno");
        imgHomems.classList.remove("jogador-turno");
    }
}

//  SECAO DE TESTES //

//  to do: 