import Context from './context.js'
const { state } = Context
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

state.set('ctx', ctx)

ctx.globalAlpha = 1
const defaultWeight = 1
let grid

export const createGrid = (n, m) => {
	grid = new Grid(n, m)
}

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
	constructor(n, m) {
		this.N = n
		this.M = m
		this.cellw = Math.floor(canvas.width / this.N)
		this.cellh = Math.floor(canvas.height / this.M)

		this.weights = []
		for (let i = 0; i < this.N; i++) {
			let row = []
			for (let j = 0; j < this.M; j++) {
				row.push(defaultWeight)
			}
			this.weights.push(row)
		}

		this.objects = {
			origin: [5, 5, '#00ff00'],
			destination: [20, 20, '#ff0000'],
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

	clean(i, j) {
		ctx.fillStyle = '#ffffff'
		ctx.fillRect(i * this.cellw, j * this.cellh, this.cellw, this.cellh)
		this.weights[i][j] = defaultWeight

		state.set('weights', this.weights)
	}
}

let mousedown = -1
let moving_object = null
window.addEventListener('mouseup', () => {
	mousedown = -1
	moving_object = null
})

canvas.addEventListener('mouseup', (e) => {
	if (!moving_object) return

	const rect = canvas.getBoundingClientRect()
	let i = Math.floor((e.clientX - rect.left) / grid.cellw)
	let j = Math.floor((e.clientY - rect.top) / grid.cellh)

	grid.setObject(moving_object, i, j)
	moving_object = null
})

const click = (e) => {
	const rect = canvas.getBoundingClientRect()
	let i = Math.floor((e.clientX - rect.left) / grid.cellw)
	let j = Math.floor((e.clientY - rect.top) / grid.cellh)
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
	const rect = canvas.getBoundingClientRect()
	let i = Math.floor((e.clientX - rect.left) / grid.cellw)
	let j = Math.floor((e.clientY - rect.top) / grid.cellh)
	if (grid.isObject(i, j)) {
		return
	}
	grid.clean(i, j)
})

export function animate(visited, path) {
	const speed = 1
	let timeout = 0

	for (let i = 1; i < visited.length - 1; i++) {
		timeout += speed
		let cell = visited[i]
		setTimeout(() => {
			ctx.globalAlpha = 0.4
			const [a, b] = cell
			grid.paint(a, b, '#ff00ff')
			ctx.globalAlpha = 1
		}, timeout)
	}

	timeout += 100

	for (let i = 0; i < path.length; i++) {
		let cell = path[i]
		setTimeout(() => {
			ctx.globalAlpha = 0.9
			const [a, b] = cell
			grid.paint(a, b, '#ff0000')
			ctx.globalAlpha = 1
		}, timeout)
		timeout += speed
	}

	setTimeout(() => {
		state.set('animating', false)
		state.set('isClean', false)
	}, timeout)
}
