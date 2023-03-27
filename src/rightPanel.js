

// Creamos el botón
var rotateButton = document.createElement( 'button' );
rotateButton.innerHTML = 'Rotar cámara';
rotateButton.classList.add('rotate-button');

// Agregamos el botón al panel derecho
var rightPanel = document.getElementById( 'right-panel' );
rightPanel.appendChild( rotateButton );

// Agregamos un controlador de eventos al botón
rotateButton.addEventListener( 'click', function() {
  // Rotamos la cámara del panel izquierdo en el eje Y
  camera.rotation.y += Math.PI / 8;
});

const light1Slider = document.getElementById('light1-slider');
const light2Slider = document.getElementById('light2-slider');

light1Slider.addEventListener('input', () => {
  pointLight1.position.x = parseFloat(light1Slider.value);
});

light2Slider.addEventListener('input', () => {
  pointLight2.position.x = parseFloat(light2Slider.value);
});


const colorSlider = document.getElementById("colorSlider");
const matrixMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
