
function animar(origen, destino, visitados, camino) {
	document.getElementById(origen).styles.background = 'green';
	document.getElementById(destino).styles.background = 'blue';

	for (const v of visitados) {
		setTimeout(() => {
			document.getElementById(v).styles.background = 'brown';
		}, 100);
	}

	for (const c of camino) {
		setTimeout(() => {
			document.getElementById(c).styles.background = 'brown';
		}, 100);
	}

}

export default animar;
