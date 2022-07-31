function animar(origen, destino, visitados, camino) {
	// document.getElementById(origen).style.background = 'green'
	// document.getElementById(destino).style.background = 'blue'
  let startTime = 100;

	for (let i = 1; i < visitados.length-1; i++) {
	  startTime += 10;
		let v = document.getElementById(visitados[i])
		v.animate([
			{ background: 'white' },
			{ background: 'red' }
		], {
			duration: 40,
		  iterations: '1',
			fill:'forwards'
		});
	}

	startTime += 500;
	for (let i = 1; i < camino.length; i++) {
		startTime += 50;
		document.getElementById(camino[i]).animate([
			{ background: 'white' },
			{ background: 'black' }
		], {
			duration: startTime,
		  iterations: 1

		});
	}

}

export default animar;
