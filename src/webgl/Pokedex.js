import * as THREE from 'three';
import SceneManager from './SceneManager';
import Lights from './Lights';
import CardCarousel from './CardCarousel';

export default class Pokedex extends SceneManager {
  setup(canvas) {
    this.initializeScene(canvas);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.soft = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    this.lights = new Lights();
    this.add(this.lights.directional);
    this.add(this.lights.ambient);

    this.carousel = new CardCarousel();
    this.isCarouselRotating = true;
  }

  load(list) {
    this.carousel.load(list);
    this.add(this.carousel.mesh);
  }

  selectEntry(id) {
    this.carousel.selectEntry(id);
  }

  onClick(selectEntry = () => { }) {
    this.intersections = this.raycaster.intersectObjects(
      this.carousel.mesh.children,
      true
    );
    const intersection = this.intersections[0];

    if (!intersection) {
      return;
    }
    const { name: id } = intersection.object.parent;
    selectEntry(id); // debounce + same id check
    this.carousel.selectEntry(id);
  }


  draw() {
    this.renderer.render(this.scene, this.camera);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersections = this.raycaster.intersectObjects(
      this.carousel.mesh.children
    );
    this.carousel.update(this.isCarouselRotating);

    requestAnimationFrame(() => this.draw());
  }

}
