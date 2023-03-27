// Set up the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Create a plane to serve as the ground
const planeGeometry = new THREE.PlaneGeometry(10, 10);
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


// Define a function to update the color of the plane over time
function updatePlaneColor() {
  const time = performance.now() / 1000; // Get the current time in seconds
  const color = new THREE.Color(); // Create a new color object

  // Set the color based on a sine wave with a period of 2 seconds
  color.setHSL((Math.sin(time * 0.5) + 1) / 2, 1, 0.5);

  // Set the color of the plane material
  planeMaterial.color = color;
}


// Create the first cube
var cubeGeometry1 = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterial1 = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 });
var cube1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1);
cube1.position.x = -1; // set the X coordinate of the first cube to -1
scene.add(cube1);

// Create the second cube
var cubeGeometry2 = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterial2 = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 });
var cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
cube2.position.x = 1; // set the X coordinate of the second cube to 1
scene.add(cube2);

// Define variables for rotating the cubes
var isDragging = false;
var previousMousePosition = {
  x: 0,
  y: 0
};

// Add event listeners for mouse movement
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);
document.addEventListener('mousemove', onMouseMove, false);

function onMouseDown(event) {
  isDragging = true;
}

function onMouseUp(event) {
  isDragging = false;
}

function onMouseMove(event) {
  // Calculate the change in mouse position since the last frame
  var deltaMousePosition = {
    x: event.clientX - previousMousePosition.x,
    y: event.clientY - previousMousePosition.y
  };

  // Update the previous mouse position
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };

  // If the mouse is being dragged, rotate the cubes based on the change in mouse position
  if (isDragging) {
    var deltaRotationQuaternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(
        toRadians(deltaMousePosition.y * 1),
        toRadians(deltaMousePosition.x * 1),
        0,
        'XYZ'
      ));

    cube1.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube1.quaternion);
    cube2.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube2.quaternion);
  }
}

// Define a utility function for converting degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}


// Create two lights to orbit around each cube
const cube1Light = new THREE.PointLight(0xffffff, 1, 10);
const cube2Light = new THREE.PointLight(0xffffff, 1, 10);

// Add the lights to the scene and position them at the origin
scene.add(cube1Light);
scene.add(cube2Light);
cube1Light.position.set(0, 0, 0);
cube2Light.position.set(0, 0, 0);

// Define initial angles for the lights
let cube1LightAngle = 0;
let cube2LightAngle = Math.PI / 2;

let mouseX = 0, mouseY = 0;

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - window.innerWidth / 2) / 10;
  mouseY = (event.clientY - window.innerHeight / 2) / 10;
}

function updateLights() {
  // Update the positions of the lights based on the current angles
  cube1Light.position.set(
    Math.cos(cube1LightAngle) * 2,
    0,
    Math.sin(cube1LightAngle) * 2
  );
  cube2Light.position.set(
    Math.cos(cube2LightAngle) * 2,
    0,
    Math.sin(cube2LightAngle) * 2
  );

  // Increment the angles for the next frame
  cube1LightAngle += 0.01;
  cube2LightAngle += 0.02;
}

// Define a function to update the position of the cubes over time
function updateCubes() {
  const time = performance.now() / 1000; // Get the current time in seconds

  // Set the position of the cubes based on their initial position and a sine wave with a period of 2 seconds
  cube1.position.y = Math.sin(time * 2) * 2;
  cube2.position.y = Math.sin(time * 2 + Math.PI) * 2;

  // Rotate the cubes around the x and z axes based on the mouse position
  const rotationSpeed = 0.2;
  cube1.rotation.x += rotationSpeed * (mouseY - cube1.rotation.x);
  cube1.rotation.z += rotationSpeed * (mouseX - cube1.rotation.z);
  cube2.rotation.x += rotationSpeed * (mouseY - cube2.rotation.x);
  cube2.rotation.z += rotationSpeed * (mouseX - cube2.rotation.z);
}

// Call the updatePlaneColor function in the animation loop
function animate() {
  requestAnimationFrame(animate);
  updateCubes();
  updateLights();
  updatePlaneColor();
  renderer.render(scene, camera);
}
animate();