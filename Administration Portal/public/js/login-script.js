// --- THREE.JS BACKGROUND (Same as Admin) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg-canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Particles
const starGeo = new THREE.BufferGeometry();
const starCoords = [];
for (let i = 0; i < 4000; i++) {
    starCoords.push(THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000), THREE.MathUtils.randFloatSpread(2000));
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
const starMat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 1, transparent: true, opacity: 0.5 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

camera.position.z = 1000;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

// --- GSAP LOGIN ANIMATIONS ---
const tl = gsap.timeline();

// 1. Entrance animation
tl.to(".login-card", {
    duration: 1.5,
    opacity: 1,
    y: 0,
    ease: "expo.out",
    delay: 0.5
});

tl.from(".logo-icon", {
    duration: 1,
    scale: 0,
    rotation: 360,
    ease: "back.out(1.7)"
}, "-=1");

// 2. Subtle Floating Loop (Makes it feel "3D")
gsap.to(".login-card", {
    y: "-=15",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// 3. Mouse Tilt Interaction
document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    gsap.to(".login-card", {
        rotationY: x,
        rotationX: -y,
        duration: 0.5,
        ease: "power2.out"
    });
});