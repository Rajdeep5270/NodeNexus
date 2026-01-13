/**
 * ADMIN_CORE - Main JavaScript Logic
 * Technologies: Three.js (3D), GSAP (Animations)
 */

// --- 1. THREE.JS INITIALIZATION ---
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Starfield Background
const starGeo = new THREE.BufferGeometry();
const starCoords = [];
for (let i = 0; i < 6000; i++) {
    starCoords.push(
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000),
        THREE.MathUtils.randFloatSpread(2000)
    );
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
const starMat = new THREE.PointsMaterial({
    color: 0x3b82f6,
    size: 1.5,
    transparent: true,
    opacity: 0.6
});
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// Center Wireframe Globe
const globeGeo = new THREE.SphereGeometry(250, 24, 24);
const globeMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    wireframe: true,
    transparent: true,
    opacity: 0.1
});
const globe = new THREE.Mesh(globeGeo, globeMat);
scene.add(globe);

camera.position.z = 800;

// --- 2. ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);

    // Smooth rotations
    stars.rotation.y += 0.0003;
    globe.rotation.y += 0.001;
    globe.rotation.x += 0.0005;

    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- 3. GSAP ENTRANCE ANIMATIONS ---
const tl = gsap.timeline();

// Sequence: Sidebar -> Header -> Content Cards
tl.from(".sidebar-anim", {
    duration: 1.2,
    x: -250,
    opacity: 0,
    ease: "expo.out"
})
    .from(".header-anim", {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: "expo.out"
    }, "-=0.8")
    .from(".content-anim", {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.2)"
    }, "-=0.6");

// --- 4. INTERACTIVE HOVER EFFECTS ---
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            x: 5,
            duration: 0.3,
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            ease: "power2.out"
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            x: 0,
            duration: 0.3,
            backgroundColor: "transparent",
            ease: "power2.out"
        });
    });
});

// Logout Button Special Hover
const logoutBtn = document.querySelector('button.bg-red-500\\/10');
if (logoutBtn) {
    logoutBtn.addEventListener('mouseenter', () => {
        gsap.to(logoutBtn, { backgroundColor: "rgba(239, 68, 68, 1)", color: "#ffffff", duration: 0.2 });
    });
    logoutBtn.addEventListener('mouseleave', () => {
        gsap.to(logoutBtn, { backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#f87171", duration: 0.2 });
    });
}

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        // Find the wrapper div
        const wrapper = e.target.nextElementSibling;

        // Quick pop animation
        gsap.from(wrapper, {
            scale: 0.95,
            duration: 0.3,
            ease: "back.out(2)"
        });
    });
});

document.querySelectorAll('input[type="checkbox"]').forEach(box => {
    box.addEventListener('change', (e) => {
        const target = e.target.nextElementSibling;
        if (e.target.checked) {
            gsap.from(target, {
                scale: 0.9,
                duration: 0.4,
                ease: "elastic.out(1, 0.3)"
            });
        }
    });
});

const dropdown = document.getElementById('city-dropdown');
const optionsMenu = document.getElementById('city-options');
const icon = document.getElementById('dropdown-icon');
const selectedText = document.getElementById('selected-city');
const hiddenInput = document.getElementById('city-input');

let isOpen = false;

// Toggle Dropdown
dropdown.addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen) {
        gsap.to(optionsMenu, { autoAlpha: 1, scale: 1, y: 5, duration: 0.4, ease: "power3.out" });
        gsap.to(icon, { rotation: 180, duration: 0.3 });
    } else {
        gsap.to(optionsMenu, { autoAlpha: 0, scale: 0.95, y: 0, duration: 0.3, ease: "power3.in" });
        gsap.to(icon, { rotation: 0, duration: 0.3 });
    }
});

// Select Option Logic
document.querySelectorAll('.city-opt').forEach(option => {
    option.addEventListener('click', function () {
        const value = this.getAttribute('data-value');

        // Update UI
        selectedText.innerText = value;
        selectedText.classList.remove('text-gray-300');
        selectedText.classList.add('text-blue-400', 'font-bold');
        hiddenInput.value = value;

        // Close Menu
        isOpen = false;
        gsap.to(optionsMenu, { autoAlpha: 0, scale: 0.95, duration: 0.3 });
        gsap.to(icon, { rotation: 0, duration: 0.3 });

        // Success Pulse Animation
        gsap.fromTo(dropdown, { borderColor: "#3b82f6" }, { borderColor: "rgba(255,255,255,0.1)", duration: 1 });
    });
});

// Close when clicking outside
window.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !optionsMenu.contains(e.target)) {
        isOpen = false;
        gsap.to(optionsMenu, { autoAlpha: 0, scale: 0.95, duration: 0.3 });
        gsap.to(icon, { rotation: 0, duration: 0.3 });
    }
});

const textarea = document.getElementById('admin-about');
const charDisplay = document.getElementById('char-count');
const glowEffect = document.getElementById('textarea-glow');

// 1. Character Counter Logic
textarea.addEventListener('input', () => {
    const length = textarea.value.length;
    charDisplay.innerText = `${length} / 500 Characters`;

    // Agar limit ke paas ho toh color change karein
    if (length > 450) {
        charDisplay.classList.add('text-orange-500');
    } else {
        charDisplay.classList.remove('text-orange-500');
    }
});

// 2. Focus Animation with GSAP
textarea.addEventListener('focus', () => {
    gsap.to(glowEffect, { opacity: 0.5, duration: 0.4 });
    gsap.to(textarea, { scale: 1.01, duration: 0.3, ease: "power2.out" });
});

textarea.addEventListener('blur', () => {
    gsap.to(glowEffect, { opacity: 0, duration: 0.4 });
    gsap.to(textarea, { scale: 1, duration: 0.3, ease: "power2.in" });
});

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const preview = document.getElementById('image-preview');
const placeholder = document.getElementById('upload-placeholder');

// Click to trigger input
dropZone.addEventListener('click', () => fileInput.click());

// File handle logic
fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // GSAP Animation for smooth transition
            gsap.to(placeholder, {
                opacity: 0, scale: 0.5, duration: 0.3, onComplete: () => {
                    placeholder.classList.add('hidden');
                    preview.src = e.target.result;
                    preview.classList.remove('hidden');
                    gsap.fromTo(preview, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
                }
            });
        }
        reader.readAsDataURL(file);
    }
});

// Drag and Drop Effects
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    gsap.to(dropZone, { borderColor: "#3b82f6", scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)", duration: 0.3 });
});

dropZone.addEventListener('dragleave', () => {
    gsap.to(dropZone, { borderColor: "rgba(59, 130, 246, 0.3)", scale: 1, backgroundColor: "transparent", duration: 0.3 });
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    gsap.to(dropZone, { scale: 1, duration: 0.3 });
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        fileInput.files = e.dataTransfer.files;
        const event = new Event('change');
        fileInput.dispatchEvent(event);
    }
});