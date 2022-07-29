var grafo
var origen
var destino

window.addEventListener('load', () => {
  grafo = main()
  origen = '6:5'
  destino = '8:0'
})

const startButton = document.getElementById('start-algorithm')
startButton.addEventListener('click', () => {
  dijsktra(grafo, origen, destino)
})


const grilla = document.getElementById('grilla')
grilla.addEventListener("click",(e) => {
		console.log(e.target)
		const [x,y] = e.target.id.split(':')
		grafo[x][y]++;
		console.log(grafo)
		e.target.style.background = 'red'
})

function main() {
const grilla = document.getElementById('grilla')
const grafo = []

  for (let j = 0; j < 10; j++) {
    const fila = []
    const tr = document.createElement('tr')
    for (let i = 0; i <= 50; i++) {
      const td = document.createElement('td')
      const content = document.createTextNode(` `)
      td.classList.add('celda')
      td.setAttribute('id', `${j}:${i}`)
      td.appendChild(content)
      fila.push(1)
      tr.appendChild(td)
   }
    tr.classList.add('fila')
    grilla.appendChild(tr)
    grafo.push(fila)
  }
  return grafo
}


function dijsktra(grafo, origen, destino) {
  // origen = '4,6'
  // destino = '8,0'

  // grafo = [
  //   [1, 1, 1, 2, 2, 3, 3, 4, 5, 6],
  //   [1, 1, 1, 1, 1, 2, 3, 4, 4, 5],
  //   [1, 1, 1, 1, 1, 2, 2, 3, 4, 5],
  //   [1, 1, 1, 1, 1, 1, 2, 2, 3, 4],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  // ]

  // resultado = [
  // [ [5, ["1,2","0,2","0,1"]], [4, ["1,2", "0,2"]], ...]
  // [ [Math.Infinity, ["1,2","0,2","0,1"]], [Math.Infinity, ["1,2"]], ...]
  //]
	const N = grafo.length
	const M = grafo[0].length


  const visitados = new Set()

  const [origenx, origeny] = origen.split(':')
  const [destinox, destinoy] = destino.split(':')

  const resultado = []
  for (let i = 0; i < N; i++) {
    const fila = []
    for (let j = 0; j < M; j++) {
      fila.push([Infinity, []])
    }
    resultado.push(fila)
  }
  resultado[origenx][origeny][0] = 0
  resultado[origenx][origeny][1] = [`${origenx}:${origeny}`]

  while (!visitados.has(destino)) {
	  const [actx, acty] = minimo(visitados, resultado)
	  let dActual = grafo[actx][acty]

	  let adyacentes = [[0,1],[0,-1],[1,0],[-1,0]]

	  for (const ady of adyacentes) {
				let x = actx+ady[0]
				let y = acty+ady[1]
				console.log(x,y)

				if ( x < 0  || x >= N || y < 0|| y >= M) {
						continue;
				}

				if (dActual + grafo[x][y] < resultado[x][y][0]) {
						resultado[x][y][0] = dActual + grafo[x][y]
						resultado[x][y][1].push(`${actx}:${acty}`)
				}
	  }

	  visitados.add(`${actx}:${acty}`)
  }

  console.log(resultado)
}

function minimo(visitados, resultado) {
		resultado
		console.log(visitados)
		for (const v of visitados) {
				const [x,y] = v.split(':')

		}
}
