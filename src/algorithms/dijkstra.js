import Heap from './binary_heap'
import Graph from './binary_heap'
import Context from '../context'
const { state } = Context

class Node {
	constructor(x, y, weight) {
		this.weight = weight
		this.id = `${x}:${y}`
		this.x = x
		this.y = y
		this.actual = Infinity
	}
}

class Graph {
	constructor(N, M) {
		this.M = M
		this.N = N
		this.matrix = []
		for (let i = 0; i < N; i++) {
			let row = []
			for (let j = 0; j < M; j++) {
				let node = new Node(i, j, parseInt(document.getElementById(`${i}:${j}`).getAttribute("weight")))
				row.push(node)
			}
			this.matrix.push(row)
		}
	}

	get(x, y) {
		if(0 <= x && x < this.N && 0 <= y && y < this.M){
			return this.matrix[x][y]
		}
		return NaN
	}

	adjacents(node) {
		let directions = [[1,0], [0,1], [-1,0], [0,-1]]
		let adjacents = []
		for (const direction of directions) {
			let adj = this.get(node.x + direction[0], node.y + direction[1])
			adjacents.push(adj)
		}
		return adjacents
	}
}

function dijkstra() {
	// let startTimeDijkstra = performance.now()
	const N = state.get("N")
	const M = state.get("M")

	const originIndex = state.get("origin").split(':').map((e) => parseInt(e))
	const destIndex = state.get("destination").split(':').map((e) => parseInt(e))

	const graph = new Graph(N, M)

	const origin = graph.get(originIndex[0], originIndex[1])
	const dest = graph.get(destIndex[0], destIndex[1])

	origin.actual = 0
	dest.visited = false

	const nodesHeap = new Heap([], (x, y) => {
			if (x.actual == y.actual)
					return 0;
			return (x.actual > y.actual) ? 1 : -1;
	})

	const visited = []

	let act = origin
	while (!dest.visited) {
		if (!act) {
			break
		}
		for (const node of graph.adjacents(act)) {
			if (node.actual > act.actual + node.weight) {
				node.actual = act.actual + node.weight
				if (!node.lastVisited) {
					nodesHeap.push(node)
					node.lastVisited = act
				}
			}
		}

		visited.push(act.id)
		act.visited = true
		act = nodesHeap.pop()
	}

	const path = []
	act = dest.lastVisited
	while(act.id != origin.id){
		path.push(act.id)
		act = act.lastVisited
	}
	path.push(act.id)

	// let endTimeDijkstra = performance.now()
	// alert( `Dijkstra, time:${ (endTimeDijkstra - startTimeDijkstra) / 1000 }s, ${M}, ${N}`)
	return [visited, path.reverse()]
}

export default dijkstra
