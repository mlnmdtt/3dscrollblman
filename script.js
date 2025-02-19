<script>
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let loader = new THREE.OBJLoader();
    loader.load('./siluetforpayhipbg.obj', function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshStandardMaterial({ 
                    color: 0x000000, 
                    metalness: 0.3, 
                    roughness: 0.5 
                }); 
            }
        });

        // увеличенный масштаб модели
        object.scale.set(7, 7, 7);

        // начальная позиция
        object.position.set(0, -20, -50);
        
        scene.add(object);

        // освещение для реалистичности
        let light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 10, 10);
        scene.add(light);

        let scrollAmount = 0;

        window.addEventListener("scroll", function () {
            scrollAmount = window.scrollY * 0.005;
        });

        function animate() {
            requestAnimationFrame(animate);
            object.rotation.y = -scrollAmount * 2; // вращение вправо
            object.position.y = -20 + scrollAmount * 20; // движение вниз
            renderer.render(scene, camera);
        }
        animate();
    });

    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
</script>
