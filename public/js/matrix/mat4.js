function identity() {
	return [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	];
}

function lookup(matrix, x, y) {
	return matrix[x + 4 * y];
}

function multiply(matrix1, matrix2) {
	let output = [];
	for (let x = 0; x < 4; x++) {
		for (let y = 0; y < 4; y++) {
			let sum = 0;
			for (let n = 0; n < 4; n++) {
				sum += lookup(matrix1, x, n) * lookup(matrix2, n, y);
			}
			output[x + 4 * y] = sum;
		}
	}
	return output;
}

function translate(matrix, x, y, z) {
	return multiply(matrix, [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		x, y, z, 1
	]);
}

function rotateX(matrix, degrees) {
	let c = Math.cos(Math.PI * degrees / 180);
	let s = Math.sin(Math.PI * degrees / 180);
	return multiply(matrix, [
		1, 0, 0, 0,
		0, c, s, 0,
		0, -s, c, 0,
		0, 0, 0, 1,
	]);
}

function rotateY(matrix, degrees) {
	let c = Math.cos(Math.PI * degrees / 180);
	let s = Math.sin(Math.PI * degrees / 180);
	return multiply(matrix, [
		c, 0, -s, 0,
		0, 1, 0, 0,
		s, 0, c, 0,
		0, 0, 0, 1,
	]);
}

function rotateZ(matrix, degrees) {
	let c = Math.cos(Math.PI * degrees / 180);
	let s = Math.sin(Math.PI * degrees / 180);
	return multiply(matrix, [
		c, s, 0, 0,
		-s, c, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
	]);
}

function scale(matrix, x, y, z) {
	return multiply(matrix, [
		x, 0, 0, 0,
		0, y, 0, 0,
		0, 0, z, 0,
		0, 0, 0, 1
	]);
}

/*function projection(matrix, width, height, depth) {
	return multiply(matrix, [
		2 / width, 0, 0, 0,
		0, -2 / height, 0, 0,
		0, 0, 2 / depth, 0,
		-1, 1, 0, 1
	]);
}*/

function ortho(left, right, bottom, top, near, far) {
	return [
		2 / (right - left), 0, 0, 0,
		0, 2 / (top - bottom), 0, 0,
		0, 0, 2 / (near - far), 0,
		(left + right) / (left - right),
		(bottom + top) / (bottom - top),
		(near + far) / (near - far),
		1
	];
}

export default {
	identity,
	lookup,
	multiply,
	translate,
	rotateX,
	rotateY,
	rotateZ,
	scale,
	// projection,
	ortho
};