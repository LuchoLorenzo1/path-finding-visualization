import Context from './context.js'
const { state } = Context

const M = 40
const pesoDefault = 1

const changeClass = (element, class_) => {
	if (!element) return
	element.classList.remove(element.classList[1])
	element.classList.add(class_)
}

export const visitCell = (e) => {
	changeClass(e, 'visitados')
}

export const makePathCell = (e) => {
	changeClass(e, 'path')
}

export const cleanCell = (e) => {
	e.target.setAttribute('weight', pesoDefault)
	e.target.setAttribute('style', '')
	changeClass(e.target, 'vacio')
}

export const weighUpCell = (e) => {
  let weight = state.get('selectedWeight')
	e.target.setAttribute('weight', weight)
	if (weight == Infinity){
		changeClass(e.target, 'wall')
	} else {
		changeClass(e.target, 'heavy')
		e.target.setAttribute('style', 'background-color: blue; opacity: 1')
	}
}

export function createGrid() {
	const grid = document.getElementById('grid')
	let viewportWidth = window.innerWidth
	let viewportHeight = window.innerHeight

	let W = viewportWidth / M
	if (W < 20) W = 20
	const N = Math.floor(viewportHeight / W)

	state.set('N', N)
	state.set('M', M)

	const origin = `${Math.floor(N / 2)}:2`
	const destination = `${Math.floor(N / 2)}:${M - 3}`

	state.set('origin', origin)
	state.set('destination', destination)

	grid.innerHTML = ''
	for (let i = 0; i < N; i++) {
		const tr = document.createElement('tr')

		for (let j = 0; j < M; j++) {
			const td = document.createElement('td')
			// const content = document.createTextNode('')

			td.classList.add('celda', 'vacio')
			td.setAttribute('id', `${i}:${j}`)
			td.setAttribute('weight', pesoDefault)
			// td.appendChild(content)
			tr.appendChild(td)
		}
		tr.classList.add('fila')
		grid.appendChild(tr)
	}

	let o = document.getElementById(origin)
	let d = document.getElementById(destination)
	changeClass(o, 'origen')
	changeClass(d, 'destino')
	o.setAttribute('draggable', true)
	d.setAttribute('draggable', true)
}

export function resizeGrid() {
	console.log('resize')
}

export function cleanGrid(cleanAll) {
	document.getElementById('grilla').childNodes.forEach((fila) => {
		fila.childNodes.forEach((celda) => {
			if (cleanAll) {
				changeClass(celda, 'vacio')
				celda.setAttribute('weight', pesoDefault)
			}
			if (!celda.classList.contains('wall')) {
				changeClass(celda, 'vacio')
				celda.setAttribute('weight', pesoDefault)
			}
		})
	})

	setObjects()
	state.set('isClean', true)
}

function setObjects() {
	let o = document.getElementById(state.get('origin'))
	let d = document.getElementById(state.get('destination'))
	changeClass(o, 'origen')
	changeClass(d, 'destino')
	o.setAttribute('draggable', true)
	d.setAttribute('draggable', true)
}
