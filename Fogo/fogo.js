const fogoPixelArray = []
const fogoWidth = 50
const fogoHeigth = 50
const fogoCores = [{"r":7,"g":7,"b":7},{"r":3,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15 },{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b": 31 },{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
let loop,aux,agua

function main(){

    criaFogoEstrutura()
    renderizaFogo()
}

function acende(){
   
    var b = document.querySelector('#botao')
    criafogoFonte()
    renderizaFogo()
    b.innerHTML = '<button onclick="apagar()">Apagar</button>'
    loop = setInterval(calculaPropagacao, 30)
}

function apagar(){
    
    aux = 30
    agua = setInterval(apagafogoFonte, 100)
}


function criaFogoEstrutura(){ //cria o vetor
    const numeroPixels = fogoWidth * fogoHeigth

    for(let i = 0; i < numeroPixels ; i++){
        fogoPixelArray[i] = 0
    }
}

function calculaPropagacao(){ // Pega valor do pixel atual
    for(let coluna = 0 ; coluna < fogoWidth ; coluna ++){
        for(let row = 0 ; row < fogoHeigth ; row++){
            const pixelIndex = coluna + (fogoWidth * row)

            atualizaPixel(pixelIndex) //*
        }
    }

    renderizaFogo()
}

function atualizaPixel(pixelAtual){ //pega pixel abaixo e tira um aleatorio
    const pixelAnt = pixelAtual + fogoWidth

    if(pixelAnt >= fogoWidth * fogoHeigth){
        return
    }

    const declinio = Math.floor(Math.random() * 2.5)
    const intensiPixelAnt = fogoPixelArray[pixelAnt]
    const novoValor = intensiPixelAnt - declinio >= 0 ? intensiPixelAnt - declinio : 0

    fogoPixelArray[pixelAtual - declinio] = novoValor
}

function renderizaFogo(){  //cria tabela
    debug = false
    let html = '<table cellpadding = 0 cellspacing = 0>'
    for(let row = 0 ; row < fogoHeigth ; row++){
        html += '<tr>'
        
        for(let coluna = 0 ; coluna < fogoWidth ; coluna++){
            const pixelIndex = coluna + (fogoWidth * row)
            const fogoIntensi = fogoPixelArray[pixelIndex]
            
            if(debug == true){
                const cor = fogoCores[fogoIntensi]
                const  corString  =  `${cor.r},${cor.g},${cor.b}`
                html += '<td>'
                html += `<div class="pixel-index" style=" background-color: rgb(${corString})">${pixelIndex}</div>`
                html += fogoIntensi
                html += '</td>'
            }else{
                const cor = fogoCores[fogoIntensi]
                const  corString  =  `${cor.r},${cor.g},${cor.b}`
                html += `<td class="pixel" style=" background-color: rgb(${corString})">`
                html += '</td>'
            }           
        }

        html += '</tr>'
    }

    html += '</table>'
    document.querySelector('#fogoTabela').innerHTML = html
}

function criafogoFonte(){
    const ultimoPixel = fogoWidth * fogoHeigth
    for(let coluna = 0 ; coluna < fogoWidth ; coluna++){
        
        const pixelIndex = (ultimoPixel - fogoWidth) + coluna
        fogoPixelArray[pixelIndex] = 36
    }
}

function apagafogoFonte(){
    
    const ultimoPixel = fogoWidth * fogoHeigth

    if(fogoPixelArray[ultimoPixel - fogoWidth] == 0){  
        
        clearInterval(loop)
        clearInterval(agua)
        var b = document.querySelector('#botao')
        criaFogoEstrutura()
        renderizaFogo()
        b.innerHTML = '<button onclick="acende()">Acender</button>'
    }

    for(let coluna = 0 ; coluna < fogoWidth ; coluna++){
        
        const pixelIndex = (ultimoPixel - fogoWidth) + coluna
        fogoPixelArray[pixelIndex] = aux
    }

    aux--
   }

main()