document.addEventListener("DOMContentLoaded", function () {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas-container").appendChild(renderer.domElement);

    camera.position.z = 5;

    let loader = new THREE.OBJLoader();
    loader.load("https://3dscrollblman.vercel.app/siluetforpayhipbg.obj", function (object) {
        object.scale.set(4, 4, 4);
        object.position.set(0, -2, -10);
        scene.add(object);

        function animate() {
            requestAnimationFrame(animate);
            object.rotation.y = window.scrollY * 0.005;
            renderer.render(scene, camera);
        }
        animate();
    }, undefined, function (error) {
        console.error("Ошибка загрузки модели:", error);
    });

    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
