import Heap from './binary_heap'
import Graph from './graph'
import Context from '../context'
const { state } = Context

export const dijkstra = () => {
	// let startTimeDijkstra = performance.now()
	const N = state.get('N')
	const M = state.get('M')
	const weights = state.get('weights')

	const originIndex = state.get('origin')
	const destIndex = state.get('destination')

	const graph = new Graph(N, M, weights, false)

	const origin = graph.get(originIndex[0], originIndex[1])
	const dest = graph.get(destIndex[0], destIndex[1])

	origin.actual = 0
	dest.visited = false

	const nodesHeap = new Heap([], (x, y) => {
		if (x.actual == y.actual) return 0
		return x.actual > y.actual ? 1 : -1
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

		visited.push([act.x, act.y])
		act.visited = true
		act = nodesHeap.pop()
	}

	const path = []
	act = dest.lastVisited
	while (act.id != origin.id) {
		path.push([act.x, act.y])
		act = act.lastVisited
	}

	// let endTimeDijkstra = performance.now()
	// alert( `Dijkstra, time:${ (endTimeDijkstra - startTimeDijkstra) / 1000 }s, ${M}, ${N}`)
	return [visited, path.reverse()]
}

export const aStar = () => {
	const N = state.get('N')
	const M = state.get('M')
	const weights = state.get('weights')

	const originIndex = state.get('origin')
	const destIndex = state.get('destination')

	const graph = new Graph(N, M, weights, false, (x, y) => {
		return Math.sqrt((destIndex[0] - x) ** 2 + (destIndex[1] - y) ** 2)
	})

	const origin = graph.get(originIndex[0], originIndex[1])
	const dest = graph.get(destIndex[0], destIndex[1])

	origin.actual = 0
	dest.visited = false

	const nodesHeap = new Heap([], (x, y) => {
		let d = x.actual + x.heuristic - (y.actual + y.heuristic)
		// console.log(x.heuristic)
		if (d == 0) {
			return 0
		} else if (d > 0) {
			return 1
		}
		return -1
	})

	const visited = []

	let act = origin
	while (!dest.visited) {
		if (!act) {
			break
		}
		for (const node of graph.adjacents(act)) {
			if (
				node.actual + node.heuristic >
				act.actual + act.heuristic + node.weight
			) {
				node.actual = act.actual + node.weight
				if (!node.lastVisited) {
					nodesHeap.push(node)
					node.lastVisited = act
				}
			}
		}

		visited.push([act.x, act.y])
		act.visited = true
		act = nodesHeap.pop()
	}

	const path = []
	act = dest.lastVisited
	while (act.id != origin.id) {
		path.push([act.x, act.y])
		act = act.lastVisited
	}

	return [visited, path.reverse()]
}

export const dfs = () => {
	const N = state.get('N')
	const M = state.get('M')
	const weights = state.get('weights')
	const originIndex = state.get('origin')
	const destIndex = state.get('destination')

	const graph = new Graph(N, M, weights)

	const origin = graph.get(originIndex[0], originIndex[1])
	const dest = graph.get(destIndex[0], destIndex[1])

	origin.actual = 0
	dest.visited = false

	const visited = []
	let act = origin

	const __dfs = (act) => {
		if(dest.visited) return
		for (const node of graph.adjacents(act)) {
			if(!node.visited && node.weight < Infinity && node.id != origin.id){
				if(node.id == dest.id){
					dest.visited = true
					return
				}
				visited.push([node.x, node.y])
				node.visited = true
				__dfs(node)
				if(dest.visited) return
			}
		}
		return
	}
	visited.push([act.x, act.y])
	__dfs(act)

	return [visited, visited]
}
