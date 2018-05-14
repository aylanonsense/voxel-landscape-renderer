export default () => {
	const DEFAULT_DATA = `
#ffdd44
x = #f20
. = rgb(100, 200, 0)
f = blue
---
 x x xxx x
 x x  x  x
 xxx  x  x
 x x  x   
 x x xxx x
...........
---





...........
---




  f     f
 .........
`;

	// create a scene
	let container = document.getElementById('container');
	let canvas = document.getElementById('canvas');
	let scene = new THREE.Scene();
	let renderer = new THREE.WebGLRenderer({ canvas: canvas });
	renderer.setSize(container.offsetWidth, container.offsetHeight);

	// create the camera
	let cameraHeight = 60;
	let cameraRotation = 0;
	let camera = new THREE.OrthographicCamera(-container.offsetWidth / 2, container.offsetWidth / 2, container.offsetHeight / 2, -container.offsetHeight / 2, -5000, 5000);
	scene.add(camera);

	// create a light for each axis direction
	let lights = [
		1, 0, 0,	0.70,
		-1, 0, 0,	0.70,
		0, 1, 0,	1.00,
		0, -1, 0,	0.40,
		0, 0, 1,	0.85,
		0, 0, -1,	0.55
	];
	for (let i = 0; i < lights.length; i += 4) {
		let light = new THREE.DirectionalLight(0xffffff, lights[i + 3]);
		light.position.set(lights[i], lights[i + 1], lights[i + 2]);
		scene.add(light);
	}

	// set up a render loop
	function loop() {
		// rotate the camera
		cameraRotation += 0.4;
		camera.position.set(-100 * Math.sin(Math.PI * cameraRotation / 180), cameraHeight, 100 * Math.cos(Math.PI * cameraRotation / 180));
		camera.lookAt(0, 0, 0);
		// schedule the next loop
		requestAnimationFrame(loop);
		// render the scene
		renderer.render(scene, camera);
	}
	loop();

	// resize the canvas as necessary
	window.addEventListener('resize', function() {
		renderer.setSize(container.offsetWidth, container.offsetHeight);
		camera.left = -container.offsetWidth / 2;
		camera.right = container.offsetWidth / 2;
		camera.top = container.offsetHeight / 2;
		camera.bottom = -container.offsetHeight / 2;
		camera.updateProjectionMatrix();
	});

	function parseInput(input) {
		let lines = input.split('\n');
		let parsedColorDefinitions = false;
		let numVoxels = 0;
		let width = 0;
		let height = 0;
		let depth = 0;
		let y = 0;
		let z = 0;
		let backgroundColor = '#000000';
		let colors = {};
		let blocks = {};
		// parse the input
		console.log(`Parsing ${lines.length} lines of input`);
		for(let line of lines) {
			if (line.trim() === '---') {
				if (!parsedColorDefinitions) {
					parsedColorDefinitions = true;
				}
				else {
					y = 0;
					z += 1;
				}
			}
			// color definitions
			else if (!parsedColorDefinitions) {
				let parts = line.split('=');
				// bg color definition
				if (parts.length < 2) {
					backgroundColor = parts[0].trim();
				}
				// material color definition
				else if (line.trim().length > 0) {
					colors[parts[0].trim()] = parts[1].trim();
				}
			}
			// block definitions
			else {
				for (let x = 0; x < line.length; x++) {
					if (line[x] && line[x] !== ' ' && line[x] !== '\t') {
						if (!blocks[x]) {
							blocks[x] = {};
						}
						if (!blocks[x][y]) {
							blocks[x][y] = {};
						}
						blocks[x][y][z] = line[x];
						numVoxels += 1;
					}
				}
				y += 1;
				width = Math.max(width, line.length);
				height = Math.max(height, y);
				depth = Math.max(depth, z + 1);
			}
		}
		// create the materials
		let numMaterials = Object.entries(colors).length;
		console.log(`Creating ${numMaterials} ${numMaterials === 1 ? 'material' : 'materials'}`);
		let materials = {};
		for (const [ symbol, color ] of Object.entries(colors)) {
			materials[symbol] = new THREE.MeshLambertMaterial({ color });
		}
		// calculate cube size
		let maxWidth = 1 * Math.max(width, depth);
		let maxHeight = 0.65 * height + 0.3 * Math.max(width, depth);
		let size = 0.7 * Math.min(container.offsetWidth / maxWidth, container.offsetHeight / maxHeight);
		// create the meshes
		let geometry = new THREE.BoxGeometry(size, size, size);
		console.log(`Creating ${numVoxels} voxels within space ${width}x${height}x${depth}`);
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				for (let z = 0; z < depth; z++) {
					if (blocks[x] && blocks[x][y] && blocks[x][y][z]) {
						let symbol = blocks[x][y][z];
						if (!materials[symbol]) {
							console.log(`Could not find color '${symbol}'!`);
						}
						else {
							let cube = new THREE.Mesh(geometry, materials[symbol]);
							cube.position.set(size * x - size * (width - 1) / 2, size * (height - y - 1.5) - size * (height - 1) / 2, size * z - size * (depth - 1) / 2);
							scene.add(cube);
						}
					}
				}
			}
		}
		renderer.setClearColor(backgroundColor, 1);
		console.log('Done!');
	}

	parseInput(DEFAULT_DATA);
};