import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';

const OrbitController = OrbitControls(THREE);

export default class SceneManager {
  constructor(canvas = {}) {
    this.canvas = canvas.current;
    this.scene = new THREE.Scene();

    const height = window.innerHeight;
    const width = window.innerWeight;
    const aspectRatio = width / height;

    this.camera = new THREE.PerspectiveCamera(
      75,
      aspectRatio,
      0.1, 
      1000
    );
    this.camera.position.set(0, 1, -3);
    this.camera.lookAt(new THREE.Vector3());

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      stencil: false,
    });
    this.renderer.setClearColor(0xffdddd);
    const dpr = Math.min(1.5, window.devicePixelRatio);
    this.renderer.setPixelRatio(dpr);

    this.controls = new OrbitController(this.camera, this.renderer.domElement);
    
    this.resize();

    this.testCube();
    this.draw();
  }
  
  draw() {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.draw());
  }
  testCube() {
    const material = new THREE.MeshBasicMaterial({ color: 0xffeedd });
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }
  resize() {
    const { clientWidth, clientHeight } = document.documentElement;
    this.canvas.width = clientWidth;
    this.canvas.height = clientHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    const { innerWidth, innerHeight } = window;

    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }
}