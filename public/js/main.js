import { vertexShaderSource, fragmentShaderSource } from './shaders.js';
import createShader from './gl/createShader.js';
import createProgram from './gl/createProgram.js';

export default () => {
	const canvas = document.getElementById('canvas');

	// get A WebGL context
	let gl = canvas.getContext('webgl2');

	// create shaders and program
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
	const program = createProgram(gl, vertexShader, fragmentShader);

	// do a bunch of webgl stuff
	let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
	let positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	let positions = [
		0, 0,
		0, 0.5,
		0.7, 0,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	let vao = gl.createVertexArray();
	gl.bindVertexArray(vao);
	gl.enableVertexAttribArray(positionAttributeLocation);
	var size = 2;          // 2 components per iteration
	let type = gl.FLOAT;   // the data is 32bit floats
	let normalize = false; // don't normalize the data
	let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
	let offset = 0;        // start at the beginning of the buffer
	gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.useProgram(program);
	gl.bindVertexArray(vao);
	let primitiveType = gl.TRIANGLES;
	let offset2 = 0;
	let count = 3;
	gl.drawArrays(primitiveType, offset2, count);

	// keep track of when the window has been resized
	// resizeCanvas();
	// let windowResized = false;
	// window.addEventListener('resize', () => {
	// 	windowResized = true;
	// });

	// function resizeCanvas() {
	// 	canvas.width = window.innerWidth;
	// 	canvas.height = window.innerHeight - 10;
	// 	gl.viewport(0, 0, canvas.width, canvas.height);
	// }

	// set up a render loop
	function loop(timeNow) {
		// // resize the canvas to match the window
		// if (windowResized) {
		// 	windowResized = false;
		// 	resizeCanvas();
		// }

		// schedule the next loop
		requestAnimationFrame(loop);
	}

	// kick off the render loop
	requestAnimationFrame(loop);
};