// TODO:
// * Dragging objects after algorithm finished. (partly done)
// * A*, dfs, bfs
// * add option for adding weighted cells
// * terrain (weighted grass, water, sand, etc.) and recursive maze generator
// * add loading animation

import { dijkstra, aStar, dfs } from './algorithms/algorithms.js'
import { createGrid, cleanGrid, animate, resizeGrid } from './grid.js'

import Context from './context'
const { state } = Context

const algorithms = new Map([
	['Dijkstra', dijkstra],
	['A*', aStar],
	['dfs', dfs],
])

window.addEventListener('load', () => {
	state.set('speed', 1)
	const N = state.set('N', 10)
	const M = state.set('M', 10)

	// state.set('destination', [Math.floor(N*0.8), Math.floor(M*0.8)])
	state.set('origin', [Math.floor(N*0.1), Math.floor(M*0.1)])
	state.set('destination', [0, 1])

	state.set('animating', false)
	state.set('isClean', true)
	state.set('selectedWeight', Infinity)

	createGrid(state.get('N'), state.get('M'))

	const selector = document.getElementById('select-algorithm')
	algorithms.forEach((_, key) => {
		const option = document.createElement('option')
		option.value = key
		option.innerText = key
		selector.appendChild(option)
	})
})


//options
document.getElementById('grid-size').onchange = (e) => {
	if(state.get('animating')) return
	resizeGrid(+(e.target.value))
}


document.getElementById('clean-grilla').addEventListener('click', () => {
	if(state.get('animating')) return
	cleanGrid()
})

document.getElementById('run').addEventListener('click', () => {
	if(state.get('animating')) return
	startAlgorithm()
})

const startAlgorithm = () => {
	if (state.get('animating')) return
	state.set('animating', true)

	if (!state.get('isClean')) {
		cleanGrid()
	}

	const selector = document.getElementById('select-algorithm')
	const resultado = algorithms.get(selector.value)()

	if (!resultado) {
		state.set('animating', false)
		return
	}

	animate(resultado[0], resultado[1])
}
