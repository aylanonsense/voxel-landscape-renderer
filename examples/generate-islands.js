const Simplex = require('perlin-simplex');

const Y_SEPARATOR = '\n';
const Z_SEPARATOR = '---\n';
const HEADER = `
#ffef49     // yellow background
G = #64c119 // grass green
g = #3aba12 // similar green
d = #b86229 // dirt brown
s = #f9ce67 // sandy yellow
o = #2e86f4 // ocean blue
---
`;

function generateLandscape(width, height, depth) {
	const simplex = new Simplex();
	let s = HEADER;
	let seaLevel = 4;
	// iterate through each <x,y,z> position
	for (let z = 1; z <= depth; z++) {
		for (let y = height; y >= 1; y--) {
			for (let x = 1; x <= width; x++) {
				// let's say ground level is somewhere between y=1 and y=9
				let num = simplex.noise(x / 30, z / 30); // num is between -1 and 1
				let groundLevel = Math.round(5 + 4 * num);
				let symbol;
				// if at ground level and above sea level, add a green voxle for grass
				if (y === groundLevel && y > seaLevel) {
					// randomly choose between two similar greens
					symbol = (Math.random() < 0.5 ? 'G' : 'g');
				}
				// if at ground level and at sea level, add a yellow voxel for sand
				else if (y === groundLevel && y === seaLevel) {
					symbol = 's';
				}
				// if below ground level, add a brown voxel for dirt
				else if (y <= groundLevel) {
					symbol = 'd';
				}
				// if below sea level, add a blue voxel for water
				else if (y <= seaLevel) {
					symbol = 'o';
				}
				// otherwise, there's no voxel there!
				else {
					symbol = ' ';
				}
				s += symbol;
			}
			s += Y_SEPARATOR;
		}
		s += Z_SEPARATOR;
	}
	return s;
}


// generate and print out a landscape
let landscapeString = generateLandscape(30, 10, 30);
console.log(landscapeString);
