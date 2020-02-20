import * as THREE from 'three';
import { toRadians } from '../utils';
import Controls from './Controls';
import Mouse from './Mouse';

export default class SceneManager {
  constructor() {
    this.canvas = {};
    this.scene = {};
    this.camera = {};
    this.renderer = {};

    this.mouse = new Mouse(this);
    this.controls = {};
    this.cameraVelocity = new THREE.Vector2();
    this.cameraTranslateVelocity = 0.1;
    this.cameraTranslateThreshold = 0.2;

  }
  initializeScene(canvas) {
    this.canvas = canvas;
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
    this.camera.position.set(-50, -15, -50);
    this.camera.rotation.set(toRadians(-90), 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      stencil: false,
    });
    this.renderer.setClearColor(0xeeeeee);
    const dpr = Math.min(1.5, window.devicePixelRatio);
    this.renderer.setPixelRatio(dpr);

    this.controls = new Controls(this);

    this.resize();

    window.addEventListener('resize', (e) => this.resize(e), { passive: true });
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

  add(obj) {
    this.scene.add(obj);
  }

  lookAt(coord = {}) {
    this.camera.lookAt(coord);
  }
}
