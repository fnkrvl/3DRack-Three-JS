
// Creamos la escena
var scene = new THREE.Scene();

// Imagen de backgorund para el panel izquierdo
const leftBackground = new THREE.TextureLoader().load( '/img/almacenes_1.jpg' );
// Imagen de cada una de las posiciones
const slotBackground = new THREE.TextureLoader().load( '/img/pallet_01.jpg' );

// Asignar la textura como fondo de la escena
scene.background = leftBackground;


// create a new perspective camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// set the camera position to (0, 0, 10)
camera.position.set(0, 0, 6);

// Creamos el renderizador
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth * 0.8, window.innerHeight );
const leftPanel = document.getElementById('left-panel');
leftPanel.appendChild( renderer.domElement );

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// Create a plane to serve as the ground
const planeGeometry = new THREE.PlaneGeometry(12, 12);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

// Rotate the plane to be horizontal
planeMesh.rotation.x = -Math.PI / 2;

// Add the plane to the scene
scene.add(planeMesh);

// Position the plane beneath the cubes
planeMesh.position.set(0, -3, -4);

// Create axes helpers to show the x, y, and z axes above the plane
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Position the axes helpers above the plane
axesHelper.position.set(0, 0, -2);

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// Creamos la matriz de cubos
var matrixSize = 3;
var cubeSize = 1;
var rack_1 = new THREE.Object3D();
//var rack_2 = new THREE.Object3D();
for (var x = 0; x < matrixSize; x++) {
  for (var y = 0; y < matrixSize; y++) {
    for (var z = 0; z < matrixSize; z++) {
      var geometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
      material = new THREE.MeshPhongMaterial({
        color: 0xffffff, // color blanco
        specular: 0x808080, // color de las luces especulares
        shininess: 100,// brillo de la superficie
        transparent: true 
      });
      var cube = new THREE.Mesh( geometry, material );
      cube.position.set(
        (x - Math.floor(matrixSize/2)) * cubeSize,
        (y - Math.floor(matrixSize/2)) * cubeSize,
        (z - Math.floor(matrixSize/2)) * cubeSize
      );
      rack_1.add( cube );
    }
  }
}

colorSlider.addEventListener("input", () => {
  const hue = colorSlider.value;
  const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
  material.color = color;
});

// Agregamos la matriz de cubos a la escena
scene.add( rack_1 );

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// Get references to the left panel and matrix elements
const matrix = document.getElementById('matrix');

// Variables to store the position where the mouse was pressed down
let startY;

// Define variables for rotating the cubes
var isDragging = false;
var previousMousePosition = {
  y: 0
};

// Add mousedown event listener to left panel
renderer.domElement.addEventListener('mousedown', (event) => {
  // Check if the target is the left panel or a child of the matrix element
  if (event.target === renderer.domElement || event.target === rack_1) {
    // Set the flag variable to indicate that a drag operation has started
    isDragging = true;


    // Store the position where the mouse was pressed down
    startY = event.clientX;
  }
});

// Add mousemove event listener to document
renderer.domElement.addEventListener('mousemove', (event) => {
  // Check if the drag flag is set
  if (isDragging) {
    // Calculate the delta between the current mouse position and the position where the mouse was pressed down

    const deltaY = event.clientX - startY;

    // Use the delta to update the position of the matrix
    rack_1.rotation.y -= deltaY * 0.02;

    // Update the start position to the current position for the next iteration
    startY = event.clientX;
  }
});

// Add mouseup event listener to document
document.addEventListener('mouseup', () => {
  // Reset the drag flag variable
  isDragging = false;
});

// Define a utility function for converting degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}


const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(2, 2, 2);

const pointLight2 = new THREE.PointLight(0xffffff, 1);
pointLight2.position.set(-2, -2, -2);

scene.add(pointLight1);
scene.add(pointLight2);



// Animamos la escena
function animate() {
  requestAnimationFrame( animate );
  
  renderer.render( scene, camera );
}
animate();