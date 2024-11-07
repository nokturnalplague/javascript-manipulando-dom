const html = document.querySelector('html')

const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')

const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarIcon = document.querySelector('#start-pause img')
const iniciarOuPausarBt = document.querySelector('#start-pause span') //digitando o nome da variavel no console da página você pode ver o valor  dela
const somPlay = new Audio('./sons/play.wav')
const somPause = new Audio('./sons/pause.mp3')
const somBeep = new Audio('./sons/beep.mp3')

const temporizador = document.getElementById('timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3') //readFile não é tão recomendado porque pode atrasar o carregamento da página durante a execução
musica.loop = true

musicaFocoInput.addEventListener('change', () => { //change é usado com elementos toggle
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    } //paused, play e pause são propriedades do JS
})

focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

function alterarContexto(contexto) {
    exibirTemporizador()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => { //functions são elevadas ao topo do escopo na compilação e podem ser chamadas antes de serem declaradas, já usando const + arrow function não são elevadas
    if(tempoDecorridoEmSegundos <= 0) {
        alert('Tempo finalizado!')
        zerarIntervalo()
        somBeep.play()
        return
    }
    tempoDecorridoEmSegundos -= 1 //decrementar
    exibirTemporizador()
} //para usar uma função que foi armazenada dentro de uma variável é necessário chamar ela DEPOIS de onde ela foi escrita

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) { //se intervaloId tiver valor
        zerarIntervalo()
        somPause.play()
        return
    } //zera o valor do intervalo, não de quantos segundos faltam
    intervaloId = setInterval(contagemRegressiva, 1000) 
    somPlay.play()
    iniciarOuPausarBt.textContent = 'Pausar' //innerHTML aceita tags, textContent não / ideal apenas para inserir textos
    iniciarOuPausarIcon.src = './imagens/pause.png'
}

function zerarIntervalo() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    iniciarOuPausarIcon.src = './imagens/play_arrow.png'
    intervaloId = null
}

function exibirTemporizador () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoFormatado}`

}

exibirTemporizador()