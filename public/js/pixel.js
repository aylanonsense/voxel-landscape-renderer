export default () => {
	const DEFAULT_DATA = `
// this is a comment!
// let's choose our colors

#ffdd44               // the background color
# = #f20              // '#' means red
g = rgb(100, 200, 0)  // '.' means green
B = blue              // 'B' means blue


// and now let's place our pixels

---
 # # ### #
 # #  #  #
 ###  #  #
 # #  #   
 # # ### #
ggggggggBgg
---
`;

	// get the dom elements
	const container = document.getElementById('container');
	const canvas = document.getElementById('canvas');
	const textarea = document.getElementById('textarea');
	const button = document.getElementById('button');
	const ctx =  canvas.getContext('2d');

	// // resize the canvas as necessary
	window.addEventListener('resize', function() {
		canvas.width = container.offsetWidth;
		canvas.height = container.offsetHeight;
	});

	function parseInput(input) {
		let lines = input.split('\n');
		let parsedColorDefinitions = false;
		let numPixels = 0;
		let width = 0;
		let height = 0;
		let y = 0;
		let backgroundColor = '#000000';
		let colors = {};
		let pixels = {};
		// parse the input
		console.log(`Parsing ${lines.length} lines of input`);
		for(let line of lines) {
			line = line.split('//')[0];
			if (line.trim() === '---') {
				if (!parsedColorDefinitions) {
					parsedColorDefinitions = true;
				}
				else {
					y = 0;
				}
			}
			// color definitions
			else if (!parsedColorDefinitions) {
				let parts = line.split('=');
				// bg color definition
				if (parts.length < 2) {
					if (line.trim().length > 2) {
						backgroundColor = parts[0].trim();
					}
				}
				// material color definition
				else if (line.trim().length > 0) {
					colors[parts[0].trim()] = parts[1].trim();
				}
			}
			// pixel definitions
			else {
				for (let x = 0; x < line.length; x++) {
					if (line[x] && line[x] !== ' ' && line[x] !== '\t') {
						if (!pixels[x]) {
							pixels[x] = {};
						}
						pixels[x][y] = line[x];
						numPixels += 1;
					}
				}
				y += 1;
				width = Math.max(width, line.length);
				height = Math.max(height, y);
			}
		}
		// calculate cube size
		// let maxWidth = 1 * Math.max(width, depth);
		// let maxHeight = 0.65 * height + 0.3 * Math.max(width, depth);
		// let size = 0.7 * Math.min(container.offsetWidth / maxWidth, (container.offsetHeight - 5) / maxHeight);
		let size = Math.min(canvas.width / width, canvas.height / height);
		// let size = 5;
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// draw the pixels
		console.log(`Creating ${numPixels} pixels within space ${width}x${height}`);
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				if (pixels[x] && pixels[x][y]) {
					let symbol = pixels[x][y];
					if (!colors[symbol]) {
						console.log(`Could not find color '${symbol}'!`);
					}
					else {
						ctx.fillStyle = colors[symbol];
						ctx.fillRect(size * x, size * y, size * 1, size * 1);
					}
				}
			}
		}
		console.log('Done!');
		// render the scene
	}

	canvas.width = container.offsetWidth;
	canvas.height = container.offsetHeight;
	textarea.value = DEFAULT_DATA;
	parseInput(DEFAULT_DATA);

	button.addEventListener('click', () => {
		parseInput(textarea.value);
	});
};