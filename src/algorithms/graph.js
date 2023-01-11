class Node {
	constructor(x, y, weight, heuristic = 0) {
		this.weight = weight
		this.id = `${x}:${y}`
		this.x = x
		this.y = y
		this.actual = Infinity
		this.heuristic = heuristic
	}
}

class Graph {
	constructor(N, M, weights, diagonals = false, heuristic = null) {
		this.M = M
		this.N = N
		this.diagonals = diagonals
		this.matrix = []
		for (let i = 0; i < N; i++) {
			let row = []
			for (let j = 0; j < M; j++) {
				let h = 0;
				if (heuristic) {
					h = heuristic(i, j)
				}
				let node = new Node(i, j, weights[i][j], h)
				row.push(node)
			}
			this.matrix.push(row)
		}
	}

	get(x, y) {
		if (0 <= x && x < this.N && 0 <= y && y < this.M) {
			return this.matrix[x][y]
		}
		return NaN
	}

	adjacents(node) {
		let directions
		if (!this.diagonals) {
			// directions = [[1,0], [0,1], [-1,0], [0,-1]]
			directions = [[0, 1], [1, 0], [-1, 0], [0, -1] ]
		} else {
			directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]
		}
		let adjacents = []
		for (const direction of directions) {
			let adj = this.get(node.x + direction[0], node.y + direction[1])
			adjacents.push(adj)
		}
		return adjacents
	}
}

export default Graph
