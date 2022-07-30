import dijkstra  from './src/algorithms/dijkstra.js'

// -- TODO: hacer que el camino no sea un array, y q sea el anterior nomas xd

const pesoDefault = 1


var N = 34
var M = 75
var origen = `${N / 2}:0`
var destino = `${N / 2}:${M - 1}`


var pesos = []

for (let i = 0; i < N; i++) {
  let l = []
  for (let j = 0; j < M; j++) {
    l.push(1)
  }
  pesos.push(l)
}

window.addEventListener('load', () => {
  crearGrilla()
  document.getElementById(origen).style.background = 'green'
  document.getElementById(destino).style.background = 'blue'
})

document.getElementById('start-algorithm').addEventListener('click', () => {
  const resultado = dijkstra(pesos, origen, destino)
	console.log(resultado)
	if(!resultado) return
	// animar(origen, destino, resultado[0], resultado[1])
})

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  let [x, y] = e.target.id.split(':')
  pesos[parseInt(x)][parseInt(y)] = Infinity
  e.target.innerText = '∞'
  e.target.style.background = 'black'
  e.target.style.color = 'white'
})

document.getElementById('grilla').addEventListener('click', (e) => {
  if (e.target.id == origen || e.target.id == destino) return
  let [x, y] = e.target.id.split(':')
  x = parseInt(x)
  y = parseInt(y)
  let nPeso = ++pesos[x][y]
  e.target.innerText = nPeso
  e.target.style.background = `rgb(${200 - 10 * nPeso},${
    200 - 10 * nPeso
  },${100})`
})

function crearGrilla() {
  const grilla = document.getElementById('grilla')
  grilla.innerHTML = ''

  for (let i = 0; i < N; i++) {
    const tr = document.createElement('tr')

    for (let j = 0; j < M; j++) {
      const td = document.createElement('td')
      const content = document.createTextNode(pesoDefault)

      td.classList.add('celda')
      td.setAttribute('id', `${i}:${j}`)
      td.appendChild(content)
      tr.appendChild(td)
    }

    tr.classList.add('fila')
    grilla.appendChild(tr)
  }
}
