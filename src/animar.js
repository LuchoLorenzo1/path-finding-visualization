import {cambiarCelda} from "./grilla.js"

function animar(visitados, camino) {
	let speed = 1;
	let duration = 5;
	// let fill = "forwards"
	let timeout = 0;

	for (let i = 1; i < visitados.length-1; i++) {
	  timeout += speed;
		let e = document.getElementById(visitados[i])
		let a = e.animate([
			{ background: 'white' },
			{ background: 'orange' },
		], {
			duration,
			delay: timeout,
		  iterations: '1',
			// fill,
		});
		a.finished.then(() => {
			cambiarCelda(e, "visitados")
		})
	}

	timeout += 250;
	for (let i = 1; i < camino.length; i++) {
		timeout += speed;
		let e = document.getElementById(camino[i])
		let a = e.animate([
			{ background: 'orange' },
			{ background: 'pink' }
		], {
			duration,
			delay: timeout,
			// fill,
		  iterations: 1,
		});
		a.finished.then(() => {
			cambiarCelda(e, "path")
		})
	}

}

export default animar;
