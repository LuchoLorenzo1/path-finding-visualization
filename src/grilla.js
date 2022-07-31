export function crearGrilla(N,M,origen,destino) {
  const grilla = document.getElementById('grilla')
  grilla.innerHTML = ''

  for (let i = 0; i < N; i++) {
    const tr = document.createElement('tr')

    for (let j = 0; j < M; j++) {
      const td = document.createElement('td')
      const content = document.createTextNode('')

      td.classList.add('celda')
      td.classList.add('vacio')
      td.setAttribute('id', `${i}:${j}`)
      td.appendChild(content)
      tr.appendChild(td)
    }
    tr.classList.add('fila')
    grilla.appendChild(tr)
  }
	let	o = document.getElementById(origen)
	let	d = document.getElementById(destino)
	o.classList.remove()
	d.classList.remove()
	o.classList.add("origen")
	d.classList.add("destino")
}

export function clearStylesGrilla(N,M, pesos, origen, destino) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const td = document.getElementById(`${i}:${j}`)
			let nPeso = pesos[i][j]

			if (nPeso == Infinity) {
				td.classList.remove()
				td.classList.add("wall")
			} else if (nPeso > 1) {
				td.classList.remove()
				td.classList.add("pesado")
				td.style.background = `rgb(${200 - 10 * nPeso},${ 200 - 10 * nPeso },${100})`
			} else {
				td.classList.remove()
				td.classList.add("vacio")
			}
    }
  }
	let	o = document.getElementById(origen)
	let	d = document.getElementById(destino)
	o.classList.remove()
	d.classList.remove()
	o.classList.add("origen")
	d.classList.add("destino")
}
