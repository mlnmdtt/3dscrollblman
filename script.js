document.addEventListener("DOMContentLoaded", function () {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas-container").appendChild(renderer.domElement);

    camera.position.z = 5;

    let loader = new THREE.OBJLoader();
    let object;

    loader.load("https://3dscrollblman.vercel.app/siluetforpayhipbg.obj", function (obj) {
        object = obj;
        object.scale.set(7, 7, 7);
        object.position.set(0, -1, -10); // Поднял модель (было -2, теперь -1)
        scene.add(object);
        animate();
    }, undefined, function (error) {
        console.error("Ошибка загрузки модели:", error);
    });

    function animate() {
        requestAnimationFrame(animate);
        if (object) {
            let scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            object.rotation.y = scrollPercent * Math.PI * 2; // от 0 до 360° в радианах
        }
        renderer.render(scene, camera);
    }

    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
