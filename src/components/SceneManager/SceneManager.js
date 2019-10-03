import * as THREE from 'three';
import OrbitControls from 'three-orbit-controls';
import { client } from '../../apollo';
import { normalizeCoordinates } from '../../utils';

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
    this.camera.position.set(0, 10, -60);
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
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersections = [];

    this.resize();
    
    window.addEventListener('resize', (e) => this.resize(e));
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

  }

  unmount = () => {
    return window.removeEventListener('resize', this.resize);
  }

  resize = () => {
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

  setCameraPosition(x = 0, y = 0, z = 0) {
    this.camera.position.set(x, y, z);
  }

  onMouseMove = (event) => { 
    const { x, y } = normalizeCoordinates(
      event.clientX,
      event.clientY,
      window.innerWidth,
      window.innerHeight
    );
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
  }
}
