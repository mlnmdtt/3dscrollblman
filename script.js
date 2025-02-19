document.addEventListener("DOMContentLoaded", function () {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    camera.position.z = 6;

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
        '/siluetforpayhipbg.obj', // ОБЯЗАТЕЛЬНО загрузи этот файл в корень проекта (рядом с index.html)
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

            object.scale.set(5, 5, 5);
            object.position.set(0, -2, -10);
            scene.add(object);

            function animate() {
                requestAnimationFrame(animate);
                object.rotation.y = window.scrollY * 0.005; 
                renderer.render(scene, camera);
            }
            animate();
        },
        undefined,
        function (error) {
            console.error('Ошибка загрузки модели:', error);
        }
    );

    // адаптация к размеру окна
    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
