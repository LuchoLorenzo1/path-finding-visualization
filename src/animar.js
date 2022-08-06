import {cambiarCelda} from "./grilla.js"

export default function animar(visitados, camino) {
	let speed = 30;
	let duration = 50;
	// let fill = "forwards"
	let timeout = 0;


	for (let i = 1; i < visitados.length-1; i++) {
	  timeout += speed;
		let e = document.getElementById(visitados[i])

		setTimeout(()=>{
			cambiarCelda(e, "visitados")
		}, timeout)

		// let a = e.animate([
		// 	{ background: 'white' },
		// 	{ background: 'orange' },
		// ], {
		// 	duration,
		// 	delay: timeout,
		//   iterations: '1',
		// 	// fill,
		// });
		// a.finished.then(() => {
		// 	cambiarCelda(e, "visitados")
		// })

	}
	timeout += 50;
	for (let i = 1; i < camino.length; i++) {
		let e = document.getElementById(camino[i])
		setTimeout(()=>{
			cambiarCelda(e, "path")
		}, timeout)
	  timeout += speed;
	}

	setTimeout(()=>{
		window.animating = false
		window.isClean = false
	}, timeout)
}
