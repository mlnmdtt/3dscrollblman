let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // белый фон

let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loader = new THREE.OBJLoader();
loader.load('siluetforpayhipbg.obj', function (object) {
    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshBasicMaterial({ color: 0x000000 }); // черный силуэт
        }
    });
    object.position.set(0, -10, 0);
    scene.add(object);

    window.addEventListener("scroll", function () {
        let scrollY = window.scrollY * 0.01;
        object.rotation.y = scrollY * 2;
        object.position.y = -10 + scrollY * 5;
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
