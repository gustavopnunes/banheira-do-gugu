let mapa = [
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e"]
];

let acc = 0; // contador. Vai até 42 (empate). Par é preto, impar é vermelho

// em vez de uma variavel pra cada coluna, fiz um array em que cada
// posicao representa uma coluna de 0 a 6 /Gustavo
let qtdBolasNasColunas = [0, 0, 0, 0, 0, 0, 0];


// comecar com a preta

// e = espaco vazio
// v = bola vermelha
// p = bola preta

const audioFundo = document.querySelector("#audio-fundo");

// SECAO FELIPE //

// função verificadora de vitória
//  executa após cada mapeamento
//  recebe array e procura por condicoes de vitória
//  retorna vitoria ou nada (em caso de nada, segue o jogo)
//  em caso de vitoria, chama um modal
// também gera áudios pré-definidos

function verificaVitoria(linha, coluna, acc) {
    let acc1 = 0;
    let ganhador = '';
    let indiceLinha = 0;
    let indiceColuna = 0;
    let x = '';
    let y = 0;
    let b = 0;
    let z = 0;

    if (acc === 42) {
        ganhador = 'empate'; criarModal(ganhador);
        z = 1;
    }
    for (let i = 0; i < 7; i++) { //verificação para linha
        if (mapa[5 - linha][i] === mapa[5 - linha][i + 1] && mapa[5 - linha][i] !== 'e') {
            acc1++;
            x = mapa[5 - linha][i + 2];
        } else {
            acc1 = 0;
        }
        if (acc1 === 2 && x === 'e') { playAudio("TaTerminando") }
        if (acc1 === 3) {
            if (mapa[5 - linha][i - 1] === 'y') { 
                ganhador = 'amarelo'; 
                criarModal(ganhador); 
                z = 1; 
            }
            if (mapa[5 - linha][i - 1] === 'b') { 
                ganhador = 'azul'; 
                criarModal(ganhador); 
                z = 1; 
            }
        }
    }
    x = '';
    acc1 = 0;
    for (let i = 5; i > 00; i--) { // verificação para coluna
        if (mapa[i][coluna] === mapa[i - 1][coluna] && mapa[i][coluna] !== 'e') {
            acc1++
            x = mapa[i - 2][coluna];
        } else {
            acc1 = 0;
        }
        if (acc1 === 2 && x === 'e') { playAudio("TaTerminando") }
        if (acc1 === 3) {
            if (mapa[i - 1][coluna] === 'y') {
                 ganhador = 'amarelo'; 
                 criarModal(ganhador); 
                 z = 1; 
            }
            if (mapa[i - 1][coluna] === 'b') { 
                ganhador = 'azul'; 
                criarModal(ganhador); 
                z = 1; 
            }
        }
    }
    // lógica para verificação de diagonais:

    // diagonal principal:
    for (let i = 0; i < 7; i++) {
        if ((5 - linha + i) < 6 && (coluna + i) < 7) {
            if (mapa[5 - linha + i][coluna + i] !== 'e') {
                indiceLinha = 5 - linha + i;
                indiceColuna = coluna + i;
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        if ((indiceLinha - i) >= 0 && (indiceColuna - i) >= 0 && mapa[indiceLinha - i][indiceColuna - i] === 'b') {
            b++;
            y = 0;
        } else if ((indiceLinha - i) >= 0 && (indiceColuna - i) >= 0 && mapa[indiceLinha - i][indiceColuna - i] === 'y') {
            y++;
            b = 0;
        }
        if (b === 3 || y === 3) { playAudio("TaTerminando") }
        if (y > 3) {
            ganhador = 'amarelo';
            criarModal(ganhador);
            z = 1;
        } else if (b > 3) {
            ganhador = 'azul';
            criarModal(ganhador);
            z = 1;
        }
    }
    y = 0;
    b = 0;
    // diagonal oposta:
    for (let i = 0; i < 7; i++) {
        if ((5 - linha - i) >= 0 && (coluna + i) < 7) {
            if (mapa[5 - linha - i][coluna + i] !== 'e') {
                indiceLinha = 5 - linha - i
                indiceColuna = coluna + i;
            }
        }
    }

    for (let i = 0; i < 7; i++) {
        if ((indiceLinha + i) < 6 && (indiceColuna - i) >= 0 && mapa[indiceLinha + i][indiceColuna - i] === 'b') {
            b++
            y = 0;
        }
        if ((indiceLinha + i) < 6 && (indiceColuna - i) >= 0 && mapa[indiceLinha + i][indiceColuna - i] === 'y') {
            y++
            b = 0;
        }
        if (b === 3 || y === 3) { playAudio("TaTerminando") }
        if (b > 3) {
            ganhador = 'azul';
            criarModal(ganhador);
            z = 1;
        } else if (y > 3) {
            ganhador = 'amarelo';
            criarModal(ganhador);
            z = 1;
        }
    }

    if (z === 0 && acc === 7) { playAudio('JaPegouUm') }
    if (z === 0 && acc === 4 || acc === 18 || acc === 26) { playAudio('ElaEhForte'); }
    if (z === 0 && acc === 9) { playAudio('EhPraValer'); }
    if (z === 0 && acc === 14) { playAudio('CadeORelogio'); }
    if (z === 0 && acc === 23) { playAudio('OpaMaisUm'); }
}
// SECAO VILSON 

// função pra mapear a caixa e passar pro array 

const mapeamento = (coluna, bolasNaColuna) => { // vai receber coluna e quantidade de bolas
    // baseado na quantidade de bolas ela vai saber a linha
    // iniciar linha e coluna em -1
    let linha = (mapa.length - 1) - bolasNaColuna
    let celula = mapa[linha][coluna]

    // alterar valores no array de acordo com coluna e linha
    if (celula === "e") {
        if (acc % 2 === 0) {
            mapa[linha][coluna] = "y"
        } else {
            mapa[linha][coluna] = "b"
        }
    }
}

// funcao criar modal
const criarModal = (ganhador) => {// recebe vermelho, preto ou empate
    let myBody = document.querySelector("body")

    const getFundoModal = document.querySelector(".modal-fundo")
    
    //Ele só cria um modal se não tiver nenhum na tela
    if ( getFundoModal === null ) {

        let fundoModal = document.createElement("div")
        fundoModal.classList.add("modal-fundo");
        myBody.appendChild(fundoModal);
    
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.classList.add(ganhador)
        fundoModal.appendChild(modal)
    
        let figure = document.createElement("figure")
        modal.appendChild(figure)
    
        let gif = document.createElement("img")
        if (ganhador === "empate") {
            gif.src = "./assets/img/gugu-movimento.gif"
            gif.alt = "Gugu fazerndo um movimento com a mão ao lado do vocalista do Mamonas Assassínas."
        } else {
            gif.src = "./assets/img/gugu.gif"
            gif.alt = "Gugu arrepiado,com cara expressando êxtase."
        }
        figure.appendChild(gif)
    
        let figcaption = document.createElement("figcaption")
        figcaption.classList.add("hidden")
        if (ganhador === "empate") {
            figcaption.innerText = "Gugu fazendo movimento com a mão."
        } else {
            figcaption.innerText = "Gugu feliz."
        }
        figure.appendChild(figcaption)
    
        let text = document.createElement("p");
        // preenche modal de acordo com parametro recebido
        if (ganhador === "azul") {
            text.innerText = "Ponto para os homens!"
        } else if (ganhador === "amarelo") {
            text.innerText = "Ponto para as mulheres!"
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
            for (let i = 0; i < bolas.length; i++) {
                bolas[i].remove()
            }
            acc = 0;
            for ( let i = 0; i < mapa.length; i++ ) {
                mapa[i] = mapa[i].map( (item) => item = "e" )
            }

            qtdBolasNasColunas = [0,0,0,0,0,0,0]

            const getDivMeninas = document.querySelector(".espaco-rostoH");
            if ( getDivMeninas.classList.contains("jogador-turno") ) {
                getDivMeninas.classList.remove("jogador-turno")
            }
            const getDivMeninos = document.querySelector(".espaco-rostoM");
            if ( getDivMeninos.classList.contains("jogador-turno") ) {
                getDivMeninos.classList.remove("jogador-turno")
            }

            const getRostoMeninos = document.querySelector(".rosto-meninos");
            getRostoMeninos.src = "assets/img/meninos.png";

            const getRostoMeninas = document.querySelector(".rosto-meninas");
            getRostoMeninas.src = "assets/img/meninas.png";

            const getFraseTurno = document.querySelector(".frase-turno");
            getFraseTurno.innerText = "";

            return getModal.remove()
        })
    
        if (ganhador === "azul") {
            playAudio("ponto")
        } else if (ganhador === "amarelo") {
            playAudio("ponto-mulheres")
        } else {
            playAudio("")
        }
    }
}


const playAudio = (audio) => {

    const audioContainer = document.querySelector(".audio-container")

    //Se tiver alguma tag audio com o id audio-frase ele é deletado
    let audioFrase = document.querySelector("#audio-frase")
    if (audioFrase !== null) {
        audioFrase.remove()
    }

    let novoAudio = document.createElement("audio");
    novoAudio.id = "audio-frase"
    audioContainer.appendChild(novoAudio);

    if ( audio === "domingo-legal") {
        novoAudio.volume = 0.4
    }

    let sourceFrase = document.createElement("source");
    sourceFrase.type = "audio/mpeg"

    sourceFrase.src = `./assets/audio/${audio}.mp3`

    novoAudio.appendChild(sourceFrase)

    audioFrase = document.querySelector("#audio-frase")
    if(audio==='valendo'){audioFrase.volume = 0.4;}
    if(audio==='ElaEhForte'){audioFrase.volume = 1;}
    if(audio==='JaPegouUm'){audioFrase.volume = 0.8;}
    if(audio==='EhPraValer'){audioFrase.volume = 1;}
    if(audio==='TaTerminando'){audioFrase.volume = 1}
    if(audio==='CadeORelogio'){audioFrase.volume = 1}
    if(audio==='OpaMaisUm'){audioFrase.volume = 0.8}
    if(audio==='ponto'){audioFrase.volume = 0.4}
    if(audio==='ponto-mulheres'){audioFrase.volume = 0.5}
    return audioFrase.play()
}

const titulo = document.querySelector(".logo")

titulo.addEventListener("click", () => {
    playAudio("domingo-legal")
})

const criarModalInfo = (type) => {   // Aqui será inserido um parâmetro de "inicio" ou "info"
    let myBody = document.querySelector("body")

    //Ele cria um modal quando não tem nenhum na tela (caso de duplo clique em icone)
    const getFundoModal = document.querySelector(".modal-fundo")

    if ( getFundoModal === null ) {

        let fundoModal = document.createElement("div")
        fundoModal.classList.add("modal-fundo");
        myBody.appendChild(fundoModal);
        
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.classList.add("info");
        fundoModal.appendChild(modal);

        const titulo = document.createElement("h3");
        titulo.innerText = "Bem vindo a Banheira do Gugu!"
        modal.appendChild(titulo)



        // O objetivo do jogo é jogar os sabonetes dentro da banheira, a equipe que colocar 4 sabonetes seguidos em qualquer direção vence.
        const instrucao = document.createElement("p");
        instrucao.innerText = "O objetivo do jogo é jogar os sabonetes dentro da banheira, a equipe que colocar 4 sabonetes seguidos em qualquer direção vence!"
        modal.appendChild(instrucao)

        let button = document.createElement("button");

        if ( type === "inicio" ) {
            button.innerText = "Começar a partida!"            
        } else {
            button.innerText = "Fechar"
        }
        modal.appendChild(button)

        if ( type === "inicio" ) {
            button.addEventListener("click", () => {
                playAudio("domingo-legal")
                audioFundo.play();
                audioFundo.volume = 0.15;
                let getLogo = document.querySelector(".logo-gigante");
                getLogo.classList.add("logo-animada")
                
                setTimeout(function(){ 
                    let logoOriginal = document.querySelector(".logo");
                    logoOriginal.style.opacity = "100%";
                    let logo = document.querySelector(".logo-animada");
                    logo.remove()
                    }, 2500);
            })
        }

        button.addEventListener("click", () => {
            let getFundoModal = document.querySelector(".modal-fundo")
            getFundoModal.remove()
        })

    }

}

criarModalInfo("inicio")

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
    root.style.setProperty("--altura-animacao", `translateY(-${(alturaAnimacao - 100 * coluna.childElementCount)}%`);
    disco.removeAttribute("id")
    disco.classList.remove("disco-suspenso");
    disco.classList.add("bola");
    let linha = parseInt(coluna.childElementCount - 1); // detecta o numero da linha pela quantidade de bolas nela.  
    console.log("linha " + linha)
    coluna.prepend(disco);
    disco = document.createElement("div");
    acc++;
    if (acc === 1) {
        playAudio("valendo")
    }
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
    }, (1000 - qtdBolasNasColunas[coluna] * 100));

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
        frase.textContent = "Vez da Scheila do Tchan!"
    } else {
        frase.textContent = "Vez do Tiririca!"
    } 
    //  else {
    //     frase.textContent = "Vez da Sheila do Tchan!"
    // }
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

// setTimeout(function(){ 
//     let logo = document.querySelector(".logo-animada");
//     logo.remove()
//     }, 2500);

// function ocultaLogoAnimada() {
//     let logo = document.querySelector(".logo-animada");
//     logo.remove()
// }

//  SECAO DE TESTES //

//  to do: 