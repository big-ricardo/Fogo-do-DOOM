var cliques = 0;
function cliquei(){
    cliques++
    document.querySelector('#mensagem').innerHTML = `<h3>${cliques}</h3>`
    
}

function passei(){
    
    document.querySelector('#mensagem').innerHTML = 'Mouse em cima de mim'

}

function tire(){
    document.querySelector('#mensagem').innerHTML = ''
}

function retorna(){
    var num = document.querySelector('#telefone').text()
    document.querySelector('#telefone'). = num + 'ola'
}