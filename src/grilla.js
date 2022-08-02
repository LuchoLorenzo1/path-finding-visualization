const M = 40

export function crearGrilla(origen,destino) {
  const grilla = document.getElementById('grilla')
	let viewportWidth = window.innerWidth;
	let viewportHeight = window.innerHeight;

	let W = viewportWidth/M
	if(W < 20)
		W = 20
	const N = Math.floor((viewportHeight*0.7)/W)

	var origen = `${Math.floor(N / 2)}:2`
	var destino = `${Math.floor(N / 2)}:${M - 3}`
	console.log(N, M)

  grilla.innerHTML = ''
  for (let i = 0; i < N; i++) {
    const tr = document.createElement('tr')

    for (let j = 0; j < M; j++) {
      const td = document.createElement('td')
      const content = document.createTextNode('')

      td.classList.add('celda')
      td.classList.add('vacio')
      td.setAttribute('id', `${i}:${j}`)
			td.style.width = `${W}px`
			td.style.height = `${W}px`
      td.appendChild(content)
      tr.appendChild(td)
    }
    tr.classList.add('fila')
    grilla.appendChild(tr)
  }

	let	o = document.getElementById(origen)
	let	d = document.getElementById(destino)
	cambiarCelda(o, "origen")
	cambiarCelda(d, "destino")
	o.setAttribute("draggable", true)
	d.setAttribute("draggable", true)
	return [N, M, origen, destino]
}

export function clearStylesGrilla(N,M, pesos, origen, destino) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const td = document.getElementById(`${i}:${j}`)
			let nPeso = pesos[i][j]
			if (nPeso == 1) cambiarCelda(td, "vacio")
    }
  }
	let	o = document.getElementById(origen)
	let	d = document.getElementById(destino)
	cambiarCelda(o, "origen")
	cambiarCelda(d, "destino")
	o.setAttribute("draggable", true)
	d.setAttribute("draggable", true)
}

export function cambiarCelda(element, class_) {
	if(!element) return
  element.classList.remove(element.classList[1])
  element.classList.add(class_)
}

export function resizeGrilla() {
  const grilla = document.getElementById('grilla')
	const viewportWidth = window.innerWidth;
	const viewportHeight = window.innerHeight;

	let W = viewportWidth/M
	let H = (viewportHeight*0.7)/N

	grilla.childNodes.forEach((fila)=>{
		fila.childNodes.forEach((celda)=>{
			celda.style.width = `${W}px`
			celda.style.height = `${H}px`
		})
	})
}


