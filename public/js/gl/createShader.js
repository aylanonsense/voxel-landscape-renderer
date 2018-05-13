export default (gl, type, source) => {
	let shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		return shader;
	}
	else {
		gl.deleteShader(shader);
		throw new Error(`Could not create ${type} shader!`);
	}
};