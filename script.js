// создание сцены
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// позиция камеры
camera.position.z = 8;

// освещение
let light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(2, 3, 5);
light.castShadow = true;
scene.add(light);

let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// загрузка модели
let loader = new THREE.OBJLoader();
loader.load(
    'https://3dscrollblman.vercel.app/siluetforpayhipbg.obj',
    function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0x000000,
                    roughness: 0.3,
                    metalness: 0.1,
                });
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        object.scale.set(6, 6, 6); // увеличенный размер
        object.position.set(0, -2, -20); // глубже и ниже
        scene.add(object);

        // анимация (движение при скролле)
        function animate() {
            requestAnimationFrame(animate);
            object.rotation.y = -window.scrollY * 0.005; // вращение вправо
            renderer.render(scene, camera);
        }
        animate();
    }
);

// адаптация к размеру окна
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// стилизация, чтобы 3D-модель была на фоне
let styles = document.createElement('style');
styles.innerHTML = `
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1; /* фон */
    }
`;
document.head.appendChild(styles);
