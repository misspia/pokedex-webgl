import * as THREE from 'three';
import SceneManager from './SceneManager';
import SkyBox from './SkyBox';
import Lights from './Lights';
import EntryList from './EntryList';

export default class Pokedex extends SceneManager {
  setup(canvas) {
    this.initializeScene(canvas);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.soft = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    this.lights = new Lights();
    this.add(this.lights.directional);
    this.add(this.lights.ambient);

    this.skyBox = new SkyBox({ size: 1000, mouse: this.mouse });
    this.add(this.skyBox.group);

    this.entryList = new EntryList();
  }

  load(list) {
    this.entryList.load(list);
    this.skyBox.add(this.entryList.mesh);
    this.entryList.getCenter();
    this.entryList.calcBounds();
  }

  selectEntry(id) {
    this.entryList.selectEntry(id);
  }

  onClick(selectEntry = () => { }) {
    this.intersections = this.raycaster.intersectObjects(
      this.entryList.mesh.children
    );
    const intersection = this.intersections[0];

    if (!intersection) {
      return;
    }
    const { name: id } = intersection.object;
    selectEntry(id); // debounce + same id check
    this.entryList.selectEntry(id);
  }

  draw() {
    this.renderer.render(this.scene, this.camera);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersections = this.raycaster.intersectObjects(
      this.entryList.mesh.children
    );
    this.controls.update(this.entryList.bounds);

    this.skyBox.tilt(this.camera.position);
    requestAnimationFrame(() => this.draw());
  }

}
