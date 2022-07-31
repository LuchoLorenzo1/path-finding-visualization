export function crearGrilla(N,M) {
  const grilla = document.getElementById('grilla')
  grilla.innerHTML = ''

  for (let i = 0; i < N; i++) {
    const tr = document.createElement('tr')

    for (let j = 0; j < M; j++) {
      const td = document.createElement('td')
      const content = document.createTextNode('')

      td.classList.add('celda')
      td.setAttribute('id', `${i}:${j}`)
      td.appendChild(content)
      tr.appendChild(td)
    }

    tr.classList.add('fila')
    grilla.appendChild(tr)
  }
}

export function clearStylesGrilla(N,M, pesos, origen, destino) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const td = document.getElementById(`${i}:${j}`)
			let nPeso = pesos[i][j]

			if (nPeso == Infinity) {
				td.style.background = 'black'
			} else if (nPeso > 1) {
				td.style.background = `rgb(${200 - 10 * nPeso},${ 200 - 10 * nPeso },${100})`
			} else {
				td.style.background = 'white'
			}
    }
  }
	document.getElementById(origen).style.background = 'green'
	document.getElementById(destino).style.background = 'blue'
}
