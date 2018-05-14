export default () => {
	// create a scene
	let scene = new THREE.Scene();
	let renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// create the camera
	let cameraHeight = 60;
	let cameraRotation = 45;
	let camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -5000, 5000);
	scene.add(camera);

	// create cubes
	let geometry = new THREE.BoxGeometry(50, 50, 50);
	let material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	let cube = new THREE.Mesh(geometry, material);
	cube.position.set(0, 0, 0);
	scene.add(cube);
	let material2 = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
	let cube2 = new THREE.Mesh(geometry, material2);
	cube2.position.set(60, 0, 0);
	scene.add(cube2);
	let material3 = new THREE.MeshLambertMaterial({ color: 0x0000ff });
	let cube3 = new THREE.Mesh(geometry, material3);
	cube3.position.set(0, 0, 60);
	scene.add(cube3);
	let material4 = new THREE.MeshLambertMaterial({ color: 0xffff00 });
	let cube4 = new THREE.Mesh(geometry, material4);
	cube4.position.set(0, 60, 0);
	scene.add(cube4);

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
		// cameraRotation += 1;
		camera.position.set(-100 * Math.sin(Math.PI * cameraRotation / 180), cameraHeight, 100 * Math.cos(Math.PI * cameraRotation / 180));
		camera.lookAt(0, 0, 0);

		// schedule the next loop
		requestAnimationFrame(loop);

		// render the scene
		renderer.render(scene, camera);
	}
	loop();
};