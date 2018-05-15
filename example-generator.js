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
	// iterate through each position
	for (let z = 1; z <= depth; z++) {
		for (let y = height; y >= 1; y--) {
			for (let x = 1; x <= width; x++) {
				// figure out which type of voxel will exist at point <x, y, z>
				let symbol = ' ';
				// let's say ground level is somewhere between y=1 and y=9
				let num = simplex.noise(x / 30, z / 30); // num is between -1 and 1
				let groundLevel = Math.round(5 + 4 * num);
				// if at ground level and above sea level, make it green for grass
				if (y === groundLevel && y > seaLevel) {
					// randomly choose between two similar greens
					symbol = (Math.random() < 0.5 ? 'G' : 'g');
				}
				// if at ground level and at sea level, make it yellow for snad
				else if (y === groundLevel && y === seaLevel) {
					symbol = 's';
				}
				// if below ground level, make it brown for dirt
				else if (y <= groundLevel) {
					symbol = 'd';
				}
				// if below sea level, make it blue for water
				else if (y <= seaLevel) {
					symbol = 'o';
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
let landscapeString = generateLandscape(40, 10, 40);
console.log(landscapeString);
