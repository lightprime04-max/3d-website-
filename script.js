// ============================================================
// PRATIK — IMMERSIVE DIGITAL UNIVERSE
// V4
// ============================================================


// ------------------------------------------------------------
// SETUP
// ------------------------------------------------------------

const canvas =
    document.getElementById("universe");

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x000004);

scene.fog =
    new THREE.FogExp2(
        0x000004,
        0.0008
    );


const camera =
    new THREE.PerspectiveCamera(
        52,
        innerWidth / innerHeight,
        0.1,
        3000
    );

camera.position.set(
    0,
    5,
    75
);


const renderer =
    new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance"
    });

renderer.setPixelRatio(
    Math.min(
        devicePixelRatio,
        2
    )
);

renderer.setSize(
    innerWidth,
    innerHeight
);


// ------------------------------------------------------------
// LIGHTING
// ------------------------------------------------------------

scene.add(
    new THREE.AmbientLight(
        0x6b7899,
        .25
    )
);

const rimLight =
    new THREE.DirectionalLight(
        0x6ca8ff,
        1.2
    );

rimLight.position.set(
    -50,
    30,
    50
);

scene.add(rimLight);


// ------------------------------------------------------------
// STAR FIELD
// ------------------------------------------------------------

function createStars(
    amount,
    size,
    color,
    spread
) {

    const geometry =
        new THREE.BufferGeometry();

    const positions =
        new Float32Array(
            amount * 3
        );

    for (
        let i = 0;
        i < amount * 3;
        i += 3
    ) {

        positions[i] =
            (Math.random() - .5) *
            spread;

        positions[i + 1] =
            (Math.random() - .5) *
            spread;

        positions[i + 2] =
            (Math.random() - .5) *
            spread;
    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );

    const material =
        new THREE.PointsMaterial({
            color,
            size,
            transparent: true,
            opacity: .8,
            depthWrite: false
        });

    const field =
        new THREE.Points(
            geometry,
            material
        );

    scene.add(field);

    return field;
}


const starsFar =
    createStars(
        18000,
        1.15,
        0xffffff,
        1800
    );


const starsNear =
    createStars(
        7000,
        .7,
        0x9bcaff,
        650
    );


// ------------------------------------------------------------
// NEBULA
// ------------------------------------------------------------

function nebula(
    color,
    x,
    y,
    z,
    count,
    spread
) {

    const geometry =
        new THREE.BufferGeometry();

    const positions =
        new Float32Array(
            count * 3
        );

    for (
        let i = 0;
        i < count * 3;
        i += 3
    ) {

        const angle =
            Math.random() *
            Math.PI * 2;

        const radius =
            Math.pow(
                Math.random(),
                1.7
            ) * spread;

        positions[i] =
            Math.cos(angle) *
            radius;

        positions[i + 1] =
            (Math.random() - .5) *
            spread *
            .35;

        positions[i + 2] =
            Math.sin(angle) *
            radius;
    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );

    const material =
        new THREE.PointsMaterial({
            color,
            size: 2,
            transparent: true,
            opacity: .09,
            blending:
                THREE.AdditiveBlending,
            depthWrite: false
        });

    const cloud =
        new THREE.Points(
            geometry,
            material
        );

    cloud.position.set(
        x,
        y,
        z
    );

    scene.add(cloud);

    return cloud;
}


const nebulaBlue =
    nebula(
        0x234cff,
        -80,
        20,
        -150,
        3500,
        55
    );


const nebulaPurple =
    nebula(
        0x852bff,
        90,
        -20,
        -270,
        3200,
        65
    );


const nebulaRed =
    nebula(
        0xff275f,
        -100,
        35,
        -430,
        2500,
        60
    );


// ------------------------------------------------------------
// SUN
// ------------------------------------------------------------

const sunGroup =
    new THREE.Group();

scene.add(sunGroup);


const sun =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            6.5,
            64,
            64
        ),

        new THREE.MeshBasicMaterial({
            color: 0xffa52b
        })

    );

sunGroup.add(sun);


const sunLight =
    new THREE.PointLight(
        0xffb45c,
        7,
        500
    );

sunGroup.add(sunLight);


// glow spheres

for (
    let i = 0;
    i < 5;
    i++
) {

    const glow =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                7.5 + i * 2,
                32,
                32
            ),

            new THREE.MeshBasicMaterial({
                color: 0xff5d19,
                transparent: true,
                opacity:
                    .07 / (i + 1),
                depthWrite: false
            })

        );

    sunGroup.add(glow);
}


// ------------------------------------------------------------
// PLANETS
// ------------------------------------------------------------

const planetData = [

    {
        name: "ORIGIN",
        title: "THE EXPLORER",

        text:
            "I am Pratik — a B.Tech CSE Cyber Security student exploring technology, software, systems and the digital world.",

        color: 0x326cff,
        atmosphere: 0x55c9ff,

        radius: 3.2,
        distance: 21,

        speed: .0028,

        camera: 17
    },

    {
        name: "CYBER-01",
        title: "CYBER SECURITY",

        text:
            "My strongest interest is cybersecurity — ethical hacking, web security, phishing awareness, account security and understanding how attacks actually work.",

        color: 0x5426e8,
        atmosphere: 0x9a6cff,

        radius: 3.8,
        distance: 37,

        speed: .0021,

        camera: 33
    },

    {
        name: "CODE-01",
        title: "BUILDING WITH CODE",

        text:
            "I am learning C, DSA, web development and backend technologies while building the foundations needed to create real software.",

        color: 0x009dcc,
        atmosphere: 0x50eaff,

        radius: 3.5,
        distance: 53,

        speed: .0017,

        camera: 49
    },

    {
        name: "PROJECT-01",
        title: "DIGITAL EXPERIMENTS",

        text:
            "Websites, AI experiments, futuristic interfaces and cybersecurity projects are part of my journey from learner to builder.",

        color: 0xb72c62,
        atmosphere: 0xff6499,

        radius: 4,

        distance: 69,

        speed: .0013,

        camera: 65,

        rings: true
    },

    {
        name: "BHUMIX-01",
        title: "BHUMIX CORE",

        text:
            "Bhumix Core is my tech-focused creative space exploring cybersecurity, AI, futuristic technology and digital experiments.",

        color: 0xb84b20,
        atmosphere: 0xff9b52,

        radius: 4.4,

        distance: 86,

        speed: .001,

        camera: 82
    },

    {
        name: "FUTURE-01",
        title: "THE NEXT CHAPTER",

        text:
            "This universe is still expanding. More projects, experiments, software and cybersecurity ideas are coming.",

        color: 0x2fae67,
        atmosphere: 0x6dffb2,

        radius: 3.5,

        distance: 104,

        speed: .0007,

        camera: 100
    }

];


const planets = [];


function makePlanet(data) {

    const orbit =
        new THREE.Group();

    scene.add(orbit);


    // planet

    const planet =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                data.radius,
                64,
                64
            ),

            new THREE.MeshStandardMaterial({
                color: data.color,
                roughness: .75,
                metalness: .04
            })

        );


    planet.position.x =
        data.distance;

    orbit.add(planet);


    // atmosphere

    const atmosphere =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                data.radius * 1.1,
                48,
                48
            ),

            new THREE.MeshBasicMaterial({

                color:
                    data.atmosphere,

                transparent: true,

                opacity: .13,

                side:
                    THREE.BackSide,

                depthWrite: false
            })

        );


    planet.add(atmosphere);


    // rings

    if (data.rings) {

        const ring =
            new THREE.Mesh(

                new THREE.RingGeometry(
                    data.radius * 1.35,
                    data.radius * 2.25,
                    100
                ),

                new THREE.MeshBasicMaterial({

                    color: 0xb99aa0,

                    transparent: true,

                    opacity: .6,

                    side:
                        THREE.DoubleSide

                })

            );


        ring.rotation.x =
            Math.PI / 2.35;

        planet.add(ring);
    }


    // orbit path

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
        curve.getPoints(240);


    const orbitGeometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);


    const orbitLine =
        new THREE.LineLoop(

            orbitGeometry,

            new THREE.LineBasicMaterial({

                color: data.color,

                transparent: true,

                opacity: .1

            })

        );


    orbitLine.rotation.x =
        Math.PI / 2;

    scene.add(orbitLine);


    planets.push({
        data,
        orbit,
        planet,
        atmosphere
    });
}


planetData.forEach(
    makePlanet
);


// ------------------------------------------------------------
// ASTEROIDS
// ------------------------------------------------------------

const asteroidGroup =
    new THREE.Group();

scene.add(asteroidGroup);


const asteroidGeometry =
    new THREE.IcosahedronGeometry(
        .4,
        0
    );


const asteroidMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x777777,
        roughness: 1
    });


for (
    let i = 0;
    i < 500;
    i++
) {

    const asteroid =
        new THREE.Mesh(
            asteroidGeometry,
            asteroidMaterial
        );


    const angle =
        Math.random() *
        Math.PI * 2;


    const radius =
        43 +
        Math.random() * 10;


    asteroid.position.set(

        Math.cos(angle) *
            radius,

        (
            Math.random() -
            .5
        ) * 7,

        Math.sin(angle) *
            radius

    );


    const scale =
        .15 +
        Math.random() * 1.5;


    asteroid.scale.setScalar(
        scale
    );


    asteroid.rotation.set(

        Math.random() * 3,

        Math.random() * 3,

        Math.random() * 3

    );


    asteroidGroup.add(
        asteroid
    );
}


// ------------------------------------------------------------
// UI
// ------------------------------------------------------------

const title =
    document.getElementById(
        "title"
    );

const description =
    document.getElementById(
        "description"
    );

const counter =
    document.querySelector(
        ".counter"
    );

const label =
    document.getElementById(
        "planet-label"
    );

const progress =
    document.getElementById(
        "progress"
    );


let section = -1;


// ------------------------------------------------------------
// SCROLL
// ------------------------------------------------------------

let scrollTarget = 0;

let scrollCurrent = 0;


window.addEventListener(
    "scroll",
    () => {

        const max =
            document.documentElement
                .scrollHeight -
            innerHeight;

        if (max <= 0) return;

        scrollTarget =
            scrollY / max;

        scrollTarget =
            THREE.MathUtils.clamp(
                scrollTarget,
                0,
                1
            );

        progress.style.height =
            `${scrollTarget * 100}%`;

    },
    {
        passive: true
    }
);


// ------------------------------------------------------------
// SECTION CHANGE
// ------------------------------------------------------------

function updateSection(i) {

    if (i === section)
        return;

    section = i;

    const data =
        planetData[i];


    gsap.to(
        "#content",
        {
            opacity: 0,
            y: 18,
            duration: .22,

            onComplete: () => {

                counter.textContent =
                    `${String(i + 1).padStart(2,"0")} / 06`;

                title.textContent =
                    data.title;

                description.textContent =
                    data.text;

                label.textContent =
                    data.name;


                gsap.to(
                    "#content",
                    {
                        opacity: 1,
                        y: 0,
                        duration: .65,
                        ease:
                            "power3.out"
                    }
                );

            }
        }
    );
}


// ------------------------------------------------------------
// CAMERA
// ------------------------------------------------------------

function cameraTravel() {

    const max =
        planetData.length - 1;

    const position =
        scrollCurrent * max;

    const current =
        Math.floor(position);

    const next =
        Math.min(
            current + 1,
            max
        );

    const local =
        position - current;


    const a =
        planetData[current];

    const b =
        planetData[next];


    const targetZ =
        THREE.MathUtils.lerp(
            a.camera,
            b.camera,
            local
        );


    camera.position.z +=
        (
            targetZ -
            camera.position.z
        ) * .035;


    camera.position.y +=
        (
            5 -
            camera.position.y
        ) * .03;


    updateSection(current);
}


// ------------------------------------------------------------
// MOUSE
// ------------------------------------------------------------

let mx = 0;
let my = 0;

let tx = 0;
let ty = 0;


window.addEventListener(
    "mousemove",
    e => {

        tx =
            (
                e.clientX /
                innerWidth -
                .5
            ) * 2;

        ty =
            (
                e.clientY /
                innerHeight -
                .5
            ) * 2;

    },
    {
        passive: true
    }
);


// ------------------------------------------------------------
// ANIMATION
// ------------------------------------------------------------

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const t =
        clock.getElapsedTime();


    // smooth scroll

    scrollCurrent +=
        (
            scrollTarget -
            scrollCurrent
        ) * .045;


    cameraTravel();


    // sun

    sun.rotation.y += .002;

    sun.scale.setScalar(
        1 +
        Math.sin(t * 2) * .025
    );


    // planets

    planets.forEach(
        p => {

            p.orbit.rotation.y +=
                p.data.speed;

            p.planet.rotation.y +=
                .004;

            p.atmosphere.scale.setScalar(
                1 +
                Math.sin(t * 1.5)
                * .02
            );

        }
    );


    // asteroid field

    asteroidGroup.rotation.y +=
        .0008;


    asteroidGroup.rotation.z =
        Math.sin(t * .1) * .015;


    // nebula movement

    nebulaBlue.rotation.y +=
        .00012;

    nebulaPurple.rotation.y -=
        .00009;

    nebulaRed.rotation.y +=
        .00007;


    // stars

    starsFar.rotation.y =
        t * .00025;

    starsNear.rotation.y =
        -t * .0006;


    // mouse camera

    mx +=
        (tx - mx) * .025;

    my +=
        (ty - my) * .025;


    camera.position.x +=
        (
            mx * 3 -
            camera.position.x
        ) * .015;


    camera.position.y +=
        (
            5 -
            my * 2 -
            camera.position.y
        ) * .015;


    camera.rotation.z +=
        (
            mx * .006 -
            camera.rotation.z
        ) * .02;


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


// ------------------------------------------------------------
// RESIZE
// ------------------------------------------------------------

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            innerWidth /
            innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            innerWidth,
            innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                devicePixelRatio,
                2
            )
        );

    }
);


// ------------------------------------------------------------
// LOADER
// ------------------------------------------------------------

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document
                    .getElementById(
                        "loader"
                    )
                    .classList
                    .add("hide");

            },
            1500
        );

    }
);
