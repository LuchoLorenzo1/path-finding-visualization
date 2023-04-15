import Context from './context.js'
const { state } = Context

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.globalAlpha = 1
const defaultWeight = 1
let grid

export const createGrid = (n) => {
	grid = new Grid(n)
}

export const resizeGrid = (size) => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	createGrid(size)
}

window.addEventListener('resize', () => resizeGrid(grid.N), false)

export const cleanGrid = () => {
	grid.weights = []
	for (let i = 0; i < grid.N; i++) {
		let row = []
		for (let j = 0; j < grid.M; j++) {
			row.push(defaultWeight)
		}
		grid.weights.push(row)
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	grid.setObjects()
	state.set('weights', grid.weights)
}

class Grid {
	constructor(n) {
		this.N = state.set("N", n)
		this.cellw = Math.floor(canvas.width / this.N)

		this.M = state.set("M", Math.round(canvas.height / this.cellw))

		this.cellh = this.cellw


		// this.cellh = Math.floor(canvas.height / this.M)

		this.weights = []
		for (let i = 0; i < this.N; i++) {
			let row = []
			for (let j = 0; j < this.M; j++) {
				row.push(defaultWeight)
			}
			this.weights.push(row)
		}

		let [origenx, origeny] = state.set('origin', [Math.floor(this.N*0.1), Math.floor(this.M*0.1)])
		let [destx, desty] = state.set('destination', [Math.floor(this.N*0.8), Math.floor(this.M*0.8)])

		this.objects = {
			origin: [origenx, origeny, '#00ff00'],
			destination: [destx, desty, '#ff0000'],
		}

		state.set('weights', this.weights)

		this.setObjects()
	}

	setObject(key, i, j) {
		if (i > this.N - 1 || j > this.M - 1) {
			return
		}
		this.clean(this.objects[key][0], this.objects[key][1])
		state.set(key, [this.objects[key][0], this.objects[key][1]])

		this.objects[key][0] = i
		this.objects[key][1] = j

		this.setObjects()
	}

	setObjects() {
		for (const key in this.objects) {
			state.set(key, [this.objects[key][0], this.objects[key][1]])
			this.paint(
				this.objects[key][0],
				this.objects[key][1],
				this.objects[key][2]
			)
		}
	}

	isObject(i, j) {
		if (i > this.N - 1 || j > this.M - 1) {
			return
		}
		for (const key in this.objects) {
			if (this.objects[key][0] == i && this.objects[key][1] == j) return key
		}
		return false
	}

	paint(i, j, color) {
		ctx.fillStyle = color
		ctx.fillRect(i * this.cellw, j * this.cellh, this.cellw, this.cellh)
	}

	weigh(i, j, w) {
		if (i > this.N - 1 || j > this.M - 1) {
			return
		}
		this.weights[i][j] = w
		if (w == Infinity) {
			this.paint(i, j, '#000000')
		} else {
			this.paint(i, j, '#00ff00')
		}
	}

	reset() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (let i = 0; i < this.N; i++) {
			for (let j = 0; j < this.M; j++) {
				let w = this.weights[i][j]
				if (w == Infinity) {
					this.paint(i, j, '#000000')
				} else if (w == 0) {
					this.paint(i, j, '#ffffff')
				}
			}
		}
		this.setObjects()
	}

	clean(i, j) {
		ctx.fillStyle = '#ffffff'
		ctx.fillRect(i * this.cellw, j * this.cellh, this.cellw, this.cellh)
		this.weights[i][j] = defaultWeight
	}
}

let mousedown = -1
let moving_object = null
window.addEventListener('mouseup', () => {
	mousedown = -1
	moving_object = null
})

const getCoords = (e) => {
	const rect = canvas.getBoundingClientRect()
	return [
		Math.floor((e.clientX - rect.left) / grid.cellw),
		Math.floor((e.clientY - rect.top) / grid.cellh),
	]
}

canvas.addEventListener('mouseup', (e) => {
	if (!moving_object) return
	let [i, j] = getCoords(e)

	grid.setObject(moving_object, i, j)
	moving_object = null
})

const click = (e) => {
	let [i, j] = getCoords(e)
	if (moving_object) {
		grid.setObject(moving_object, i, j)
		return
	}

	let object = grid.isObject(i, j)
	if (object) {
		moving_object = object
		return
	}

	let weight = Infinity
	if (mousedown == 0) {
		grid.weigh(i, j, weight)
	} else if (mousedown == 2) {
		grid.clean(i, j)
	}
}

canvas.addEventListener('mousedown', (e) => {
	if (state.get('animating')) return

	if (!state.get('isClean')) {
		grid.reset()
		state.set('isClean', true)
	}

	mousedown = e.button
	click(e)
})

canvas.addEventListener('mousemove', (e) => {
	if (mousedown == -1) return
	click(e)
})

canvas.addEventListener('mouseleave', () => {
	mousedown = -1
	moving_object = null
})

canvas.addEventListener('contextmenu', (e) => {
	e.preventDefault()
	let [i, j] = getCoords(e)
	if (grid.isObject(i, j)) {
		return
	}
	grid.clean(i, j)
})

export const animate = (visited, path) => {
	const speed = 2 - state.get('speed');
	let timeout = 0

	for (let i = 1; i < visited.length - 1; i++) {
		timeout += speed
		let cell = visited[i]
		setTimeout(() => {
			ctx.globalAlpha = 0.4
			grid.paint(cell[0], cell[1], '#ff00ff')
			// setTimeout(() => {
			// 	ctx.globalAlpha = 1
			// 	grid.paint(cell[0], cell[1], '#440044')
			// }, 100)
			ctx.globalAlpha = 1
		}, timeout)
	}

	timeout += 100

	for (let i = 0; i < path.length; i++) {
		let cell = path[i]
		setTimeout(() => {
			ctx.globalAlpha = 0.9
			grid.paint(cell[0], cell[1], '#444400')
			ctx.globalAlpha = 1

		}, timeout)
		timeout += speed
	}

	setTimeout(() => {
		state.set('animating', false)
		state.set('isClean', false)
	}, timeout)
}
