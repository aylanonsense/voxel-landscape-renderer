export default (gl, vertexShader, fragmentShader) => {
	let program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
		return program;
	}
	else {
		gl.deleteProgram(program);
		throw new Error(`Could not create program!`);
	}
};