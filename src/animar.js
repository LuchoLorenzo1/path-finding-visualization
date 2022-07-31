import {cambiarCelda} from "./grilla.js"

function animar(visitados, camino) {
	// document.getElementById(origen).style.background = 'green'
	// document.getElementById(destino).style.background = 'blue'
  let delay = 10;
	let duration = 100;
	let fill = "forwards"

	for (let i = 1; i < visitados.length-1; i++) {
	  delay += 10;
		let e = document.getElementById(visitados[i])
		let a = e.animate([
			{ background: 'white' },
			{ background: 'orange' },
		], {
			duration,
			delay,
		  iterations: '1',
			// fill,
		});
		a.finished.then(() => {
			cambiarCelda(e, "visitados")
		})
	}

	delay += 250;
	for (let i = 1; i < camino.length; i++) {
		delay += 50;
		let e = document.getElementById(camino[i])
		let a = e.animate([
			{ background: 'orange' },
			{ background: 'pink' }
		], {
			duration,
			delay,
			// fill,
		  iterations: 1,
		});
		a.finished.then(() => {
			cambiarCelda(e, "path")
		})
	}
}

export default animar;
