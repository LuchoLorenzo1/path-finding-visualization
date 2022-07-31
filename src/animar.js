function animar(origen, destino, visitados, camino) {
	document.getElementById(origen).style.background = 'green'
	document.getElementById(destino).style.background = 'blue'

	for (let i = 1; i < visitados.length-1; i++) {
		document.getElementById(visitados[i]).style.background = 'brown';
	}

	for (let i = 1; i < camino.length; i++) {
		document.getElementById(camino[i]).style.background = 'yellow';
	}
}

export default animar;
