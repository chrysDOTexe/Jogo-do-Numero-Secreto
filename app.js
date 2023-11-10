let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();

window.onload = setarFocus();
document.addEventListener('keydown', apertarBotao);

// ************************* FUNÇÕES *************************

//************************* exibe texto na tela *************************
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.2});
}

//************************* define o foco para o textbox do número *************************
function setarFocus() {
    let caixaDeTexto = document.getElementById('textochute');
    caixaDeTexto.focus();
}

//************************* pressionando a tecla ENTER, aciona o botão CHUTE
//************************* pressionando a tecla N, inicia um novo jogo quando o botão estiver ativo
function apertarBotao(event) {
    if ((event.key === 'Enter') || (event.key === 'n')) {
        if (event.key === 'Enter'){
            document.getElementById('chutar').click();
        } else if (event.key === 'n'){ //(document.getElementById('reiniciar').attributes(enabled)) {
            document.getElementById('reiniciar').click();
        }
    }
   
}

//gera um número aleatório para adivinhar no jogo
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//limpa o campo ao chutar
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//reinciar jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

//************************* exibe a mensagem inicial na tela
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns, o Número Secreto é ${numeroSecreto}, e você descobriu com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        setarFocus();
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto){
        exibirTextoNaTela('h1', 'Errou!');
        exibirTextoNaTela('p', 'O número secreto é menor que o chute');
    } else {
        exibirTextoNaTela('h1', 'Errou!');
        exibirTextoNaTela('p', 'O número secreto é maior que o chute');
    }
    tentativas++;
    limparCampo();
    setarFocus();
}