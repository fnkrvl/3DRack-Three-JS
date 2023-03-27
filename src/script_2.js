// Your Three.js code goes here
// Create the scene and camera for the left panel
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a grid of cubes to represent the matrix
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 3; k++) {
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(i - 1, j - 1, k - 1);
      scene.add(cube);
    }
  }
}

// Create a renderer and add it to the left panel
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight);
document.getElementById("leftPanel").appendChild(renderer.domElement);


// Add event listeners to the configuration elements to update the matrix
const configurationElements = document.querySelectorAll(".configuration");
configurationElements.forEach(element => {
  element.addEventListener("change", event => {
    const target = event.target;
    const value = target.value;
    const index = parseInt(target.dataset.index);

    // Update the matrix based on the configuration value and index
    const cube = scene.getObjectByName(`Cube ${index}`);
    cube.material.color.set(value);
  });
});

// Add the configuration elements to the right panel
const rightPanel = document.getElementById("rightPanel");
const configurationHtml = `
  <div>
    <label for="cube0">Cube 0:</label>
    <input type="color" id="cube0" class="configuration" data-index="0">
  </div>
  <div>
    <label for="cube1">Cube 1:</label>
    <input type="color" id="cube1" class="configuration" data-index="1">
  </div>
`;
rightPanel.innerHTML = configurationHtml;

// Render the scene
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();