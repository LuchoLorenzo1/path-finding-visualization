var grafo = new Map()
var origen = '5:10'
var destino = '5:48'
var N = 10
var M = 50

window.addEventListener('load', () => {
  grafo = main()
  document.getElementById(origen).style.background = 'green'
  document.getElementById(destino).style.background = 'blue'
})

const startButton = document.getElementById('start-algorithm')
startButton.addEventListener('click', () => {
  dijsktra(origen, destino)
})

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  if (grafo.has(e.target.id)) {
		grafo.get(e.target.id).peso = Infinity
    e.target.innerText = '∞'
    e.target.style.background = 'black'
    e.target.style.color = 'white'
  }
})

const grilla = document.getElementById('grilla')
grilla.addEventListener('click', (e) => {
  console.log(e.button)
  if (grafo.has(e.target.id)) {
    let nPeso = ++grafo.get(e.target.id).peso
    e.target.innerText = nPeso
    e.target.style.background = `rgb(${200 - 10 * nPeso},${ 200 - 10 * nPeso },${100})`
  }
})


function main() {
  const grilla = document.getElementById('grilla')
  for (let j = 0; j < N; j++) {
    const tr = document.createElement('tr')
    for (let i = 0; i <= M; i++) {
      const td = document.createElement('td')
      const content = document.createTextNode(`1`)
      td.classList.add('celda')
      td.setAttribute('id', `${j}:${i}`)
      td.appendChild(content)
      tr.appendChild(td)
      grafo.set(`${j}:${i}`, { peso: 1, actual: Infinity, camino: [] })
    }
    tr.classList.add('fila')
    grilla.appendChild(tr)
  }
  return grafo
}

function dijsktra(origen, destino) {
  console.log(grafo)
  console.log(origen)
  console.log('==dijsktra==')
  const visitados = new Set()
  visitados.add(origen)
  grafo.get(origen).actual = 0

  let actualNombre = origen
  while (!visitados.has(destino)) {
		if(!actualNombre) break;

    let actual = grafo.get(actualNombre)
    let [actx, acty] = actualNombre.split(':')
    console.log(`actualNombre: ${actualNombre}`)
    actx = parseInt(actx)
    acty = parseInt(acty)

    let adyacentes = [
      grafo.get(`${actx + 1}:${acty}`),
      grafo.get(`${actx - 1}:${acty}`),
      grafo.get(`${actx}:${acty + 1}`),
      grafo.get(`${actx}:${acty - 1}`),
    ]

    for (const ady of adyacentes) {
      console.log(ady)
      if (!ady) continue
      if (actual.actual + ady.peso < ady.actual) {
        ady.actual = actual.actual + ady.peso
        ady.camino = [...actual.camino]
				ady.camino.push(actualNombre)
      }
    }

    visitados.add(actualNombre)
    document.getElementById(actualNombre).style.background = 'yellow'
    actualNombre = minimo(visitados, grafo)
  }

	dest = grafo.get(destino)
	if(!dest){
			alert("es imposible llegar a destino")
			return;
	}
	console.log('====FIN DIJSKTRA ====')
	console.log(dest)


	dest.camino.forEach(element => {
    document.getElementById(element).style.background = 'brown'
	});
	document.getElementById(origen).style.background = 'green'
	document.getElementById(destino).style.background = 'blue'
}

function minimo(visitados, grafo) {
  let minimo = Infinity
  let minCoords
  for (const visitado of visitados) {
    let actual = grafo.get(visitado)
    let [actx, acty] = visitado.split(':')
    actx = parseInt(actx)
    acty = parseInt(acty)

    let adyacentes = [
      `${actx + 1}:${acty}`,
      `${actx - 1}:${acty}`,
      `${actx}:${acty + 1}`,
      `${actx}:${acty - 1}`,
    ]

    for (const coords of adyacentes) {
      let ady = grafo.get(coords)
      if (!ady || visitados.has(coords)) continue
      if (actual.actual + ady.peso < minimo) {
        minimo = actual.actual + ady.peso
        minCoords = coords
      }
    }
  }
  return minCoords
}
