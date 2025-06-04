// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Three.js Neural Network Setup
let scene, camera, renderer, neuralNetwork;

function initThreeJS() {
    const container = document.getElementById('three-container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create neural network visualization
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
    
    neuralNetwork = new THREE.Group();
    
    // Create nodes
    for(let i = 0; i < 50; i++) {
        const node = new THREE.Mesh(geometry, material);
        node.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        neuralNetwork.add(node);
    }
    
    // Create connections
    const lineGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    for(let i = 0; i < neuralNetwork.children.length; i++) {
        for(let j = i + 1; j < neuralNetwork.children.length; j++) {
            if(Math.random() > 0.8) {
                const pos1 = neuralNetwork.children[i].position;
                const pos2 = neuralNetwork.children[j].position;
                
                positions.push(pos1.x, pos1.y, pos1.z);
                positions.push(pos2.x, pos2.y, pos2.z);
                
                colors.push(0, 1, 1);
                colors.push(1, 0, 1);
            }
        }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({ 
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    neuralNetwork.add(lines);
    
    scene.add(neuralNetwork);
    camera.position.z = 15;
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    if(neuralNetwork) {
        neuralNetwork.rotation.x += 0.005;
        neuralNetwork.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
}

// Create code stream for loader
function createLoaderCodeStream() {
    const container = document.getElementById('loader-code');
    const codeLines = [
        "function init() {",
        "  const app = new App();",
        "  app.run();",
        "}",
        "class App extends Component {",
        "  constructor(props) {",
        "    super(props);",
        "    this.state = {",
        "      data: [],",
        "      loading: true",
        "    };",
        "  }",
        "  async fetchData() {",
        "    try {",
        "      const res = await fetch(url);",
        "      const data = await res.json();",
        "      this.setState({ data, loading: false });",
        "    } catch(err) {",
        "      console.error(err);",
        "    }",
        "  }",
        "  componentDidMount() {",
        "    this.fetchData();",
        "  }",
        "  render() {",
        "    if (this.state.loading) {",
        "      return <Loader />;",
        "    }",
        "    return <DataView data={this.state.data} />;",
        "  }",
        "}"
    ];
    
    codeLines.forEach((line, index) => {
        const codeLine = document.createElement('div');
        codeLine.className = 'loader-code-line';
        codeLine.textContent = line;
        codeLine.style.left = `${Math.random() * 80 + 10}%`;
        codeLine.style.animationDelay = `${index * 0.5}s`;
        codeLine.style.animationDuration = `${10 + Math.random() * 10}s`;
        container.appendChild(codeLine);
    });
}

// Create code stream for background
function createCodeStream() {
    const container = document.getElementById('code-stream');
    const codeSnippets = [
        "const portfolio = new Portfolio();",
        "portfolio.init();",
        "function animate() { requestAnimationFrame(animate); }",
        "class Project { constructor() { this.name = ''; } }",
        "import React from 'react';",
        "export default function App() { return <div>Hello</div>; }",
        "const [state, setState] = useState(initialState);",
        "useEffect(() => { console.log('mounted'); }, []);",
        "const router = createBrowserRouter();",
        "const theme = createTheme({ palette: { mode: 'dark' } });",
        "const model = tf.sequential();",
        "model.add(tf.layers.dense({ units: 1, inputShape: [1] }));",
        "const server = express();",
        "server.use(cors());",
        "server.use(express.json());",
        "const db = await openDB('MyDB', 1);",
        "const tx = db.transaction('store', 'readwrite');",
        "const store = tx.objectStore('store');",
        "await store.add(data);",
        "const container = new PIXI.Container();",
        "const sprite = new PIXI.Sprite(texture);",
        "container.addChild(sprite);",
        "const geometry = new THREE.BoxGeometry();",
        "const material = new THREE.MeshBasicMaterial();",
        "const cube = new THREE.Mesh(geometry, material);",
        "scene.add(cube);",
        "gsap.to('.element', { duration: 1, x: 100 });",
        "ScrollTrigger.create({ trigger: '.section' });",
        "anime({ targets: '.item', translateX: 250 });",
        "const audioCtx = new AudioContext();",
        "const analyser = audioCtx.createAnalyser();",
        "const dataArray = new Uint8Array(analyser.frequencyBinCount);",
        "analyser.getByteTimeDomainData(dataArray);"
    ];
    
    for (let i = 0; i < 20; i++) {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        codeLine.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        codeLine.style.top = `${Math.random() * 100}%`;
        codeLine.style.animationDuration = `${15 + Math.random() * 15}s`;
        codeLine.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(codeLine);
    }
}

// Loader Animation
function startLoader() {
    // Create code streams
    createLoaderCodeStream();
    createCodeStream();
    
    // Animate letters
    anime({
        targets: '.loader-text span',
        translateY: [100, 0],
        rotateX: [90, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
    });
    
    // Initialize Three.js after a delay
    setTimeout(() => {
        initThreeJS();
    }, 1000);
    
    // Hide loader and show main content
    setTimeout(() => {
        gsap.to('#loader', {
            opacity: 0,
            y: -100,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('main-content').classList.remove('hidden');
                initMainAnimations();
            }
        });
    }, 4000);
}

// Initialize Typed.js
function initTypedJS() {
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                "Building immersive web experiences",
                "Creating interactive 3D visuals",
                "Developing modern web applications",
                "Designing beautiful user interfaces",
                "Crafting digital magic with code"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    } else {
        console.warn('Typed.js not loaded - retrying in 1 second');
        setTimeout(initTypedJS, 1000);
    }
}

// Main animations
function initMainAnimations() {
    // Initialize typed.js
    initTypedJS();
    
    // Animate floating icons
    gsap.to('.floating-icon', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-15, 15)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2
    });
    
    // Animate skill cards on scroll
    gsap.to('.skill-card', {
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1
    });
    
    // Animate project cards on scroll
    gsap.to('.project-card', {
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1
    });
    
    // Hero text animation
    gsap.from('.hero h1', {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)"
    });
    
    gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });
    
    // Animate skill progress bars
    document.querySelectorAll('.skill-progress').forEach(progress => {
        const level = progress.getAttribute('data-level');
        gsap.to(progress, {
            width: `${level}%`,
            scrollTrigger: {
                trigger: progress.parentElement.parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 2,
            ease: "power2.out"
        });
    });
    
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            gsap.to(card, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5
            });
        });
    });
}

// Create particles
function createParticles(containerId, count = 15) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for(let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        container.appendChild(particle);
    }
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Wait for all scripts to load
    window.addEventListener('load', function() {
        // Create particles for each section
        createParticles('particles-about');
        createParticles('particles-skills');
        createParticles('particles-projects');
        createParticles('particles-contact');
        
        // Start loader
        startLoader();
    });
});