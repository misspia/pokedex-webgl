import * as THREE from 'three';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { toRadians } from '../utils';

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
    this.camera.position.set(-5, 13, -8);
    this.camera.rotation.set(toRadians(-90), 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      stencil: false,
    });
    this.renderer.setClearColor(0xffffff);
    const dpr = Math.min(1.5, window.devicePixelRatio);
    this.renderer.setPixelRatio(dpr);

    this.controls = new MapControls(this.camera, this.renderer.domElement);
    this.controls.screenSpacePanning = false;
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;

    this.controls.update();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.cameraVelocity = new THREE.Vector2();
    this.cameraTranslateVelocity = 0.1;
    this.cameraTranslateThreshold = 0.2;
    this.intersections = [];

    this.resize();

    window.addEventListener('resize', (e) => this.resize(e), { passive: true });
    this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });

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
    this.updateMousePosition(event.clientX, event.clientY);
  }

  updateMousePosition(clientX, clientY) {
    this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  }

  add(obj) {
    this.scene.add(obj);
  }

  lookAt(coord = {}) {
    this.camera.lookAt(coord);
  }
}
