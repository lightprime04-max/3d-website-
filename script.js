// ============================================
// PRATIK 3D CYBER UNIVERSE
// Frontend only
// Three.js + JavaScript + GSAP
// ============================================


// --------------------------------------------
// BASIC SETUP
// --------------------------------------------

const canvas = document.getElementById("universe");

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(0x000000, 0.0015);


const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
);

camera.position.set(0, 20, 55);


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputEncoding = THREE.sRGBEncoding;


// --------------------------------------------
// LIGHTING
// --------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0x404040,
    2
);

scene.add(ambientLight);


const sunLight = new THREE.PointLight(
    0xffffff,
    4,
    500
);

scene.add(sunLight);


// --------------------------------------------
// STAR FIELD
// --------------------------------------------

const starGeometry = new THREE.BufferGeometry();

const starCount = 12000;

const starPositions = new Float32Array(
    starCount * 3
);

for (let i = 0; i < starCount * 3; i += 3) {

    const radius =
        300 + Math.random() * 1200;

    const theta =
        Math.random() * Math.PI * 2;

    const phi =
        Math.acos(
            (Math.random() * 2) - 1
        );

    starPositions[i] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

    starPositions[i + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

    starPositions[i + 2] =
        radius *
        Math.cos(phi);
}

starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        starPositions,
        3
    )
);


const starMaterial = new THREE.PointsMaterial({

    color: 0xffffff,

    size: 1.3,

    transparent: true,

    opacity: 0.85

});


const stars = new THREE.Points(
    starGeometry,
    starMaterial
);

scene.add(stars);


// --------------------------------------------
// SUN
// --------------------------------------------

const sunGeometry =
    new THREE.SphereGeometry(
        6,
        64,
        64
    );


const sunMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffaa33
    });


const sun = new THREE.Mesh(
    sunGeometry,
    sunMaterial
);

scene.add(sun);


// Sun glow

const glowGeometry =
    new THREE.SphereGeometry(
        8,
        64,
        64
    );


const glowMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xff6600,

        transparent: true,

        opacity: 0.12

    });


const glow = new THREE.Mesh(
    glowGeometry,
    glowMaterial
);

scene.add(glow);


// --------------------------------------------
// PLANETS
// --------------------------------------------

const planets = [];

function createPlanet(
    name,
    radius,
    distance,
    color,
    speed,
    section
) {

    const geometry =
        new THREE.SphereGeometry(
            radius,
            32,
            32
        );

    const material =
        new THREE.MeshStandardMaterial({

            color: color,

            roughness: 0.7,

            metalness: 0.2

        });


    const planet =
        new THREE.Mesh(
            geometry,
            material
        );


    const orbit =
        new THREE.Group();


    scene.add(orbit);

    orbit.add(planet);


    planet.position.x = distance;


    planets.push({

        name: name,

        mesh: planet,

        orbit: orbit,

        speed: speed,

        section: section,

        distance: distance

    });

}


// --------------------------------------------
// YOUR UNIVERSE
// --------------------------------------------

createPlanet(
    "ABOUT ME",
    2.2,
    15,
    0x3399ff,
    0.004,
    1
);


createPlanet(
    "CYBER SECURITY",
    2.6,
    23,
    0x8b5cf6,
    0.0025,
    2
);


createPlanet(
    "PROJECTS",
    2.1,
    31,
    0x00ffff,
    0.002,
    3
);


createPlanet(
    "BHUMIX CORE",
    2.8,
    40,
    0xff3366,
    0.0017,
    4
);


createPlanet(
    "CONTACT",
    2,
    49,
    0x44ff88,
    0.0013,
    5
);


// --------------------------------------------
// ORBIT RINGS
// --------------------------------------------

planets.forEach((p) => {

    const curve =
        new THREE.EllipseCurve(

            0,
            0,

            p.distance,
            p.distance,

            0,
            Math.PI * 2,

            false,

            0

        );


    const points =
        curve.getPoints(150);


    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);


    const material =
        new THREE.LineBasicMaterial({

            color: 0x444444,

            transparent: true,

            opacity: 0.35

        });


    const orbitLine =
        new THREE.LineLoop(
            geometry,
            material
        );


    orbitLine.rotation.x =
        Math.PI / 2;


    scene.add(orbitLine);

});


// --------------------------------------------
// SECTION DATA
// --------------------------------------------

const sections = [

    {

        number: "01",

        title: "THE EXPLORER",

        description:
            "Welcome to my digital universe. I am Pratik — a CSE Cyber Security student exploring technology, software and the world of cybersecurity."

    },

    {

        number: "02",

        title: "ABOUT ME",

        description:
            "B.Tech CSE Cyber Security student. I enjoy understanding how computers, software, operating systems and networks work beneath the surface."

    },

    {

        number: "03",

        title: "CYBER SECURITY",

        description:
            "My strongest interest is cybersecurity — ethical hacking, web security, phishing awareness, account security and understanding how real cyber attacks work."

    },

    {

        number: "04",

        title: "PROJECTS",

        description:
            "I build websites, experiment with AI, explore frontend development and gradually move towards backend development, applications and security projects."

    },

    {

        number: "05",

        title: "BHUMIX CORE",

        description:
            "Bhumix Core is my tech-focused creative space where I explore cybersecurity, futuristic technology, AI and digital experiments."

    },

    {

        number: "06",

        title: "CONNECT",

        description:
            "The universe is still expanding. More projects, experiments and ideas are coming."

    }

];


// --------------------------------------------
// SCROLL SYSTEM
// --------------------------------------------

let scrollProgress = 0;

let targetCameraZ = 55;

let currentCameraZ = 55;


window.addEventListener(
    "scroll",
    () => {

        const maxScroll =
            document.body.scrollHeight -
            window.innerHeight;


        scrollProgress =
            window.scrollY /
            maxScroll;


        targetCameraZ =
            55 -
            scrollProgress * 42;


        updateSection(
            scrollProgress
        );

    }
);


// --------------------------------------------
// SECTION UI
// --------------------------------------------

const numberElement =
    document.getElementById(
        "section-number"
    );

const titleElement =
    document.getElementById(
        "section-title"
    );

const descriptionElement =
    document.getElementById(
        "section-description"
    );


let currentSection = -1;


function updateSection(progress) {

    let index =
        Math.floor(
            progress * sections.length
        );


    index =
        Math.max(
            0,
            Math.min(
                sections.length - 1,
                index
            )
        );


    if (index === currentSection)
        return;


    currentSection = index;


    const data =
        sections[index];


    gsap.to(
        "#info",
        {

            opacity: 0,

            duration: 0.25,

            onComplete: () => {

                numberElement.innerText =
                    data.number;

                titleElement.innerText =
                    data.title;

                descriptionElement.innerText =
                    data.description;


                gsap.to(
                    "#info",
                    {

                        opacity: 1,

                        duration: 0.6

                    }
                );

            }

        }
    );

}


// --------------------------------------------
// MOUSE PARALLAX
// --------------------------------------------

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;


window.addEventListener(
    "mousemove",
    (event) => {

        targetMouseX =
            (event.clientX /
                window.innerWidth -
                0.5) * 2;


        targetMouseY =
            (event.clientY /
                window.innerHeight -
                0.5) * 2;

    }
);


// --------------------------------------------
// ANIMATION LOOP
// --------------------------------------------

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const elapsed =
        clock.getElapsedTime();


    // Sun rotation

    sun.rotation.y =
        elapsed * 0.15;


    glow.scale.setScalar(
        1 +
        Math.sin(elapsed * 2) * 0.04
    );


    // Stars movement

    stars.rotation.y =
        elapsed * 0.002;


    // Planet orbit

    planets.forEach((p) => {

        p.orbit.rotation.y +=
            p.speed;


        p.mesh.rotation.y +=
            0.01;

    });


    // Smooth camera

    currentCameraZ +=
        (
            targetCameraZ -
            currentCameraZ
        ) * 0.04;


    camera.position.z =
        currentCameraZ;


    // Mouse parallax

    mouseX +=
        (
            targetMouseX -
            mouseX
        ) * 0.03;


    mouseY +=
        (
            targetMouseY -
            mouseY
        ) * 0.03;


    camera.position.x =
        mouseX * 4;


    camera.position.y =
        20 -
        mouseY * 3;


    camera.lookAt(
        0,
        0,
        0
    );


    renderer.render(
        scene,
        camera
    );

}


animate();


// --------------------------------------------
// RESIZE
// --------------------------------------------

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);


// --------------------------------------------
// LOADER
// --------------------------------------------

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            const loader =
                document.getElementById(
                    "loader"
                );


            loader.style.opacity = "0";


            setTimeout(() => {

                loader.style.display =
                    "none";

            }, 1000);

        }, 1200);

    }
);
