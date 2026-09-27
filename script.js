// ======================================================
// PRATIK — CINEMATIC 3D CYBER UNIVERSE
// VERSION 2
// FRONTEND ONLY
// Three.js + GSAP
// ======================================================


// ======================================================
// 1. BASIC SETUP
// ======================================================

const canvas = document.getElementById("universe");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000005);

scene.fog = new THREE.FogExp2(
    0x000005,
    0.0012
);


const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
);

camera.position.set(0, 8, 65);


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


// ======================================================
// 2. LIGHT
// ======================================================

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.3
    )
);

const sunLight =
    new THREE.PointLight(
        0xffffff,
        5,
        500
    );

scene.add(sunLight);


// ======================================================
// 3. STAR UNIVERSE
// ======================================================

const starGeometry =
    new THREE.BufferGeometry();

const STAR_COUNT = 18000;

const positions =
    new Float32Array(
        STAR_COUNT * 3
    );

for (
    let i = 0;
    i < STAR_COUNT * 3;
    i += 3
) {

    const radius =
        250 +
        Math.random() * 1200;

    const theta =
        Math.random() *
        Math.PI * 2;

    const phi =
        Math.acos(
            Math.random() * 2 - 1
        );


    positions[i] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

    positions[i + 1] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

    positions[i + 2] =
        radius *
        Math.cos(phi);
}


starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);


const starMaterial =
    new THREE.PointsMaterial({

        color: 0xffffff,

        size: 1.25,

        transparent: true,

        opacity: 0.85

    });


const stars =
    new THREE.Points(
        starGeometry,
        starMaterial
    );

scene.add(stars);


// ======================================================
// 4. SUN
// ======================================================

const sunGroup =
    new THREE.Group();

scene.add(sunGroup);


const sunGeometry =
    new THREE.SphereGeometry(
        6,
        64,
        64
    );


const sunMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xff9d22
    });


const sun =
    new THREE.Mesh(
        sunGeometry,
        sunMaterial
    );

sunGroup.add(sun);


// SUN GLOW

const glowGeometry =
    new THREE.SphereGeometry(
        8,
        64,
        64
    );


const glowMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xff5500,

        transparent: true,

        opacity: 0.15

    });


const sunGlow =
    new THREE.Mesh(
        glowGeometry,
        glowMaterial
    );

sunGroup.add(sunGlow);


// ======================================================
// 5. PLANET DATA
// ======================================================

const planetData = [

    {
        name: "ABOUT",

        title: "THE EXPLORER",

        description:
            "I am Pratik — a B.Tech CSE Cyber Security student exploring technology, software, systems and the digital world.",

        color: 0x287cff,

        radius: 3,

        distance: 20,

        speed: 0.003,

        cameraZ: 17

    },

    {

        name: "CYBER",

        title: "CYBER SECURITY",

        description:
            "My strongest interest is cybersecurity — ethical hacking, web security, phishing awareness, account security and understanding how attacks actually work.",

        color: 0x7b3cff,

        radius: 3.5,

        distance: 35,

        speed: 0.0023,

        cameraZ: 32

    },

    {

        name: "CODE",

        title: "BUILDING WITH CODE",

        description:
            "I am learning C, DSA, web development, backend technologies and gradually moving towards building real software and security projects.",

        color: 0x00d9ff,

        radius: 3.2,

        distance: 50,

        speed: 0.0018,

        cameraZ: 47

    },

    {

        name: "PROJECTS",

        title: "DIGITAL EXPERIMENTS",

        description:
            "Websites, AI experiments, futuristic interfaces and cybersecurity projects are part of my journey from beginner to builder.",

        color: 0xff357a,

        radius: 3.7,

        distance: 65,

        speed: 0.0014,

        cameraZ: 62

    },

    {

        name: "BHUMIX",

        title: "BHUMIX CORE",

        description:
            "Bhumix Core is my tech-focused creative space where I explore cybersecurity, AI, futuristic technology and digital experiments.",

        color: 0xff4d00,

        radius: 4,

        distance: 82,

        speed: 0.001,

        cameraZ: 79

    },

    {

        name: "FUTURE",

        title: "THE NEXT CHAPTER",

        description:
            "This universe is still expanding. More projects, experiments and ideas are coming.",

        color: 0x4dff88,

        radius: 3,

        distance: 100,

        speed: 0.0008,

        cameraZ: 97

    }

];


// ======================================================
// 6. CREATE PLANETS
// ======================================================

const planets = [];


function createPlanet(data) {

    const orbit =
        new THREE.Group();

    scene.add(orbit);


    const geometry =
        new THREE.SphereGeometry(
            data.radius,
            48,
            48
        );


    const material =
        new THREE.MeshStandardMaterial({

            color: data.color,

            roughness: 0.65,

            metalness: 0.25

        });


    const planet =
        new THREE.Mesh(
            geometry,
            material
        );


    planet.position.x =
        data.distance;


    orbit.add(planet);


    // --------------------------
    // ATMOSPHERE
    // --------------------------

    const atmosphereGeometry =
        new THREE.SphereGeometry(
            data.radius * 1.12,
            48,
            48
        );


    const atmosphereMaterial =
        new THREE.MeshBasicMaterial({

            color: data.color,

            transparent: true,

            opacity: 0.12,

            side: THREE.BackSide

        });


    const atmosphere =
        new THREE.Mesh(
            atmosphereGeometry,
            atmosphereMaterial
        );


    planet.add(atmosphere);


    // --------------------------
    // ORBIT
    // --------------------------

    const curve =
        new THREE.EllipseCurve(

            0,
            0,

            data.distance,
            data.distance,

            0,
            Math.PI * 2,

            false,
            0

        );


    const points =
        curve.getPoints(180);


    const orbitGeometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);


    const orbitMaterial =
        new THREE.LineBasicMaterial({

            color: data.color,

            transparent: true,

            opacity: 0.12

        });


    const orbitLine =
        new THREE.LineLoop(
            orbitGeometry,
            orbitMaterial
        );


    orbitLine.rotation.x =
        Math.PI / 2;


    scene.add(orbitLine);


    planets.push({

        data,

        orbit,

        planet,

        atmosphere,

        orbitLine

    });

}


planetData.forEach(
    createPlanet
);


// ======================================================
// 7. SECTION UI
// ======================================================

const title =
    document.getElementById(
        "section-title"
    );

const description =
    document.getElementById(
        "section-description"
    );

const number =
    document.getElementById(
        "section-number"
    );


// ======================================================
// 8. SCROLL → CAMERA
// ======================================================

let scrollTarget = 0;

let scrollCurrent = 0;


window.addEventListener(
    "scroll",
    () => {

        const max =
            document.body.scrollHeight -
            window.innerHeight;


        scrollTarget =
            window.scrollY / max;

    }
);


// ======================================================
// 9. ACTIVE PLANET
// ======================================================

let activePlanet = -1;


function updateSection(index) {

    if (
        index === activePlanet
    ) return;


    activePlanet = index;


    const data =
        planetData[index];


    gsap.to(
        "#info",
        {

            opacity: 0,

            y: 20,

            duration: 0.25,

            onComplete: () => {

                number.innerText =
                    String(index + 1)
                        .padStart(2, "0");


                title.innerText =
                    data.title;


                description.innerText =
                    data.description;


                gsap.to(
                    "#info",
                    {

                        opacity: 1,

                        y: 0,

                        duration: 0.6

                    }
                );

            }

        }
    );

}


// ======================================================
// 10. CAMERA CINEMATIC MOVEMENT
// ======================================================

function updateCamera() {

    const total =
        planetData.length;


    const exact =
        scrollCurrent *
        (total - 1);


    const index =
        Math.floor(exact);


    const nextIndex =
        Math.min(
            index + 1,
            total - 1
        );


    const localProgress =
        exact - index;


    const currentPlanet =
        planetData[index];


    const nextPlanet =
        planetData[nextIndex];


    const currentZ =
        currentPlanet.cameraZ;


    const nextZ =
        nextPlanet.cameraZ;


    const desiredZ =
        THREE.MathUtils.lerp(
            currentZ,
            nextZ,
            localProgress
        );


    camera.position.z =
        desiredZ;


    // cinematic vertical movement

    camera.position.y =
        THREE.MathUtils.lerp(
            8,
            3,
            localProgress
        );


    // subtle X movement

    camera.position.x =
        Math.sin(
            scrollCurrent * Math.PI
        ) * 3;


    camera.lookAt(
        0,
        0,
        0
    );


    updateSection(index);

}


// ======================================================
// 11. MOUSE MOVEMENT
// ======================================================

let mouseTargetX = 0;

let mouseTargetY = 0;

let mouseX = 0;

let mouseY = 0;


window.addEventListener(
    "mousemove",
    (event) => {

        mouseTargetX =
            (
                event.clientX /
                window.innerWidth -
                0.5
            ) * 2;


        mouseTargetY =
            (
                event.clientY /
                window.innerHeight -
                0.5
            ) * 2;

    }
);


// ======================================================
// 12. ANIMATION LOOP
// ======================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    // --------------------------------
    // SMOOTH SCROLL
    // --------------------------------

    scrollCurrent +=
        (
            scrollTarget -
            scrollCurrent
        ) * 0.045;


    updateCamera();


    // --------------------------------
    // SUN
    // --------------------------------

    sun.rotation.y += 0.003;


    sunGlow.scale.setScalar(

        1 +
        Math.sin(time * 2) * 0.04

    );


    // --------------------------------
    // PLANETS
    // --------------------------------

    planets.forEach(
        (p) => {

            p.orbit.rotation.y +=
                p.data.speed;


            p.planet.rotation.y +=
                0.006;


            const pulse =
                1 +
                Math.sin(
                    time * 1.5
                ) * 0.015;


            p.atmosphere.scale.setScalar(
                pulse
            );

        }
    );


    // --------------------------------
    // STARS
    // --------------------------------

    stars.rotation.y =
        time * 0.001;


    stars.rotation.x =
        time * 0.0003;


    // --------------------------------
    // MOUSE PARALLAX
    // --------------------------------

    mouseX +=
        (
            mouseTargetX -
            mouseX
        ) * 0.025;


    mouseY +=
        (
            mouseTargetY -
            mouseY
        ) * 0.025;


    camera.rotation.z =
        mouseX * 0.01;


    camera.position.x +=
        (
            mouseX * 2 -
            camera.position.x
        ) * 0.01;


    renderer.render(
        scene,
        camera
    );

}


animate();


// ======================================================
// 13. RESIZE
// ======================================================

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


// ======================================================
// 14. LOADER
// ======================================================

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                const loader =
                    document.getElementById(
                        "loader"
                    );


                loader.style.opacity =
                    "0";


                setTimeout(
                    () => {

                        loader.style.display =
                            "none";

                    },
                    1000
                );

            },
            1000
        );

    }
);
