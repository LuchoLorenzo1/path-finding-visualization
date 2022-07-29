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


			// -- TODO: add events delegation
			td.addEventListener("click",(e) => {
				const [x,y] = e.target.id.split(':')
				grafo[x][y]++;
				console.log(grafo)
				e.target.style.background = ''
			})

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

  grafo = [
    [1, 1, 1, 2, 2, 3, 3, 4, 5, 6],
    [1, 1, 1, 1, 1, 2, 3, 4, 4, 5],
    [1, 1, 1, 1, 1, 2, 2, 3, 4, 5],
    [1, 1, 1, 1, 1, 1, 2, 2, 3, 4],
    [1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  ]

  // resultado = [
  // [ [5, ["1,2","0,2","0,1"]], [4, ["1,2", "0,2"]], ...]
  // [ [Math.Infinity, ["1,2","0,2","0,1"]], [Math.Infinity, ["1,2"]], ...]
  //]

  const visitados = new Set()

  const [origenx, origeny] = origen.split(':')
  const [destinox, destinoy] = destino.split(':')

  const resultado = []
  for (let i = 0; i < grafo.length; i++) {
    const fila = []
    for (let j = 0; j < grafo[i].length; j++) {
      fila.push([Infinity, []])
    }
    resultado.push(fila)
  }
  resultado[origenx][origeny][0] = 0
  resultado[origenx][origeny][1] = [`${origenx}:${origeny}`]

  console.table(resultado)

  while (!visitados.has(destino)) {
    const [actualx, actualy] = minimo(visitados, resultado)
		let dActual = grafo[actualx][actualy]

		obtenerAdyacencias(resultado, actualx, actualy).forEach((adyx, adyy) => {
				if (dActual + grafo[adyx][adyy] < resultado[adyx][adyy][0]) {
						resultado[adyx][adyy][0] = dActual + grafo[adyx][adyy]
						resultado[adyx][adyy][1].push(`${actualx}:${actualy}`)
				}
		});
		visitados.add(`${actualx}:${actualy}`)
  }



  // while no_visitados:
  // 		actual = min(no_visitados, key=lambda k: matriz[k][0])
  // 		d_actual = matriz[actual][0]
  // 		for v in grafo.obtener_adyacencias(actual):
  // 				d = grafo.devuelve_distancia(actual, v)
  // 				if d + d_actual < matriz[v][0]:
  // 						matriz[v][0] = d + d_actual
  // 						matriz[v][1] = actual
  //
  // 		visitados.add(actual)
  // 		no_visitados.remove(actual)
  //
  // return matriz
}
