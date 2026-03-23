//criando uma lista array com as palavras ocultas
const listaPalavras = [
    "document", "desenvolvimento", "capacidade", "inteligencia", "computacao", "variavel", "funcao", "javascript", "css", "getelementbyid" // 10 palavras
    // botando as regras do jogo
];

let palavraSecreta = "";
let tentativasRestantes = 6; // variavel utilizada para definir numero de tentativas que vc pode fazer um açao exemplo digitar um senha
let letrasTentadas = [];// variavel utilizada para exibir palavra ou texto na tela
let letrasUsadas = [];// armazena letras que o usuario ja digitou
let palavraExibida = [];//armazena letras corretas 
let pontuacao = 0;// pontuacao serve para o usario ter uma extimativa de quantas palavras ele acertou


//capturando os IDS do HTML para que o JAVASCRIPT saiba onde "escrever"
const displayPalavra = document.getElementById("palavra-oculta");
const displayTentativas = document.getElementById("tentativas");
const displayPontuacao = document.getElementById("pontuacao");
const btnReiniciar = document.getElementById("btn-reiniciar");
const displayEntrada = document.getElementById("entrada-letra");
const displayLetrasUsadas = document.getElementById("letras-usadas")

// variavel DISPLAY e utilizada para manipular o css de elementos em HTML

// chamando a funcao iniciar jogo
// responsavel por sortear uma palavra e resetar o tabuleiro
function iniciarJogo() {
    //isso faz o navegador reiniciar a pagina automaticamente


    //Math.random(): Gera o número quebrado nunca chegar em 1 inteiro
    // Math.floor arredonda sempre para baixo (3.9 vira 3).
    const posicaoSorteDaListaDePalavras = Math.floor(Math.random() * listaPalavras.length)
    //pegando a palavra  sorteada, e colocando ela em MAIUSCULA
    palavraSecreta = listaPalavras[posicaoSorteDaListaDePalavras].toUpperCase()

    // --- EXPLICAÇÃO DA PALAVRA OCULTA ---
    // Criamos um novo Array com o mesmo tamanho da palavra secreta.
    // O .fill("_") preenche todos os espaços com traços para esconder as letras.
    palavraExibida = Array(palavraSecreta.length).fill("_");

    // RESET: Limpamos os dados de tentativas anteriores.
    displayTentativas = 6;
    displayLetrasUsadas = [];
    displayPontuacao= 0;

    // Após preparar os dados, chamamos a função que desenha no ecrã.
    renderizarPalavra();
}

function renderizarPalavra() {

    // trasforma a lista(array) que esta assim "-" "-" "-" "-" em "------"
    displayPalavra.innerHTML = "_";


    // B. CRIAÇÃO DINÂMICA:
    // Percorremos o array de traços (palavraExibida). Para cada "_" criamos um <span> novo.
    palavraExibida.forEach(letra => {
        const span = document.createElement("span"); // Cria a tag <span> no ar.
        span.innerText = letra + "_";                   // Coloca o "_" dentro dela.
        displayPalavra.appendChild(span);             // Coloca o <span> dentro do HTML.
    });

    // C. ATUALIZAÇÃO DE TEXTOS:
    // Escrevemos os valores atuais nos campos de texto do HTML.
    displayTentativas.innerText = tentativasRestantes;
    displayPontuacao.innerText = pontuacao;
}

// OUVINTE: Quando o utilizador clica no botão, o jogo recomeça do zero.
btnReiniciar.addEventListener("click", iniciarJogo);

// EXECUÇÃO IMEDIATA: Chama a função ao abrir a página para o jogo não começar vazio.
iniciarJogo();


// sprint 03

// capturando os cliques

function tentativas(){
    let letra = displayEntrada.value.toUpperCase();

    if(letra === ""){
        return;
    }

    if(letrasUsadas.includes(letra)){
        return;
    }

    letrasUsadas.push(letra);

    if(palavraSecreta.includes(letra)){
        for(let i = 0; i < palavraSecreta.length; i++){
            if(palavraSecreta[i] === letra){
                palavraExibida[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
    }

    displayEntrada.value = "";

    renderizarPalavra();
}
}
 

// verificar se acertou a letra, verificar se ela completou a palavra,tendo isso tudo ela venceu,
// verificar se a pessoa errou a letra, e verificar se tem tentativas se nao tiver gamer over, se nao continua o jogo
// verificar se a letra estana palavra secreta se a letra estiver tem que ver a posicao que  a palvra ta (index) se ela nao tiber remover uma tentaivas