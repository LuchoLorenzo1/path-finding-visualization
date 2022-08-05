function dijkstra(pesos, origen, destino) {
  const N = pesos.length
  const M = pesos[0].length
  // let startTimeDijkstra = performance.now()

  const grafo = new Map()
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      grafo.set(`${i}:${j}`, {
        peso: pesos[i][j],
        actual: Infinity,
        camino: [],
      })
    }
  }

  const ordenVisitas = []
  const visitados = new Set()

  visitados.add(origen)
  grafo.get(origen).actual = 0

  let actualNombre = origen
  while (!visitados.has(destino)) {
    if (!actualNombre) break

    let actual = grafo.get(actualNombre)
    let [actx, acty] = actualNombre.split(':')
    actx = parseInt(actx)
    acty = parseInt(acty)

    let adyacentes = [
      grafo.get(`${actx + 1}:${acty}`),
			grafo.get(`${actx}:${acty + 1}`),
      grafo.get(`${actx - 1}:${acty}`),
      grafo.get(`${actx}:${acty - 1}`),
    ]

    for (const ady of adyacentes) {
      if (!ady) continue
      if (actual.actual + ady.peso < ady.actual) {
        ady.actual = actual.actual + ady.peso
        ady.camino = [...actual.camino]
        ady.camino.push(actualNombre)
      }
    }

    visitados.add(actualNombre)
    ordenVisitas.push(actualNombre)
    actualNombre = minimo(visitados, grafo)
  }

  let dest = grafo.get(destino)
  if (dest.camino.length == 0) {
    alert('es imposible llegar a destino')
    return null
  }

  // var endTimeDijkstra = performance.now()
  // alert( `Dijkstra, time:${ (endTimeDijkstra - startTimeDijkstra) / 1000 }s, path length: ${dest.camino.length}, nodes visited: ${visitados.size} `)

  return [ordenVisitas, dest.camino]
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
			`${actx}:${acty + 1}`,
      `${actx - 1}:${acty}`,
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

export default dijkstra
