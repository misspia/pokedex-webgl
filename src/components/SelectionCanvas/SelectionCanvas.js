import React, { Component } from 'react';
import * as THREE from 'three';

import SceneManager from '../SceneManager/SceneManager';
import EntryList from '../EntryList/EntryList';
import { SkyBox, Lights } from '../Environment';
import * as S from './SelectionCanvas.styles';

export default class SelectionCanvas extends Component {
  static defaultProps = {
    entries: [],
    selectEntry: () => { },
    id: null,
    setLoadingComplete: () => { },
  };
  constructor(props) {
    super(props);
    this.SM = {};
    this.entryList = {};
    this.skyBox = {};
    this.lights = {};
    this.canvas = React.createRef();
  }
  componentDidMount() {
    this.SM = new SceneManager(this.canvas);
    this.SM.renderer.shadowMap.enabled = true;
    this.SM.renderer.shadowMap.soft = true;
    this.SM.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    this.lights = new Lights();
    this.SM.add(this.lights.directional);
    this.SM.add(this.lights.ambient);

    this.skyBox = new SkyBox({ size: 1000, mouse: this.SM.mouse });
    this.SM.add(this.skyBox.group);

    this.entryList = new EntryList(
      this.props.entries,
      this.props.setLoadingComplete
    );
    this.skyBox.add(this.entryList.mesh);
    this.entryList.getCenter();

    this.canvas.current.addEventListener('click', (e) => this.onClick(e), { passive: true });

    this.draw();
  }
  draw() {
    this.SM.renderer.render(this.SM.scene, this.SM.camera);
    this.SM.raycaster.setFromCamera(this.SM.mouse, this.SM.camera);
    this.SM.intersections = this.SM.raycaster.intersectObjects(
      this.entryList.mesh.children
    );
    this.SM.controls.update();
    const { minX, maxX, minZ, maxZ } = this.entryList.bounds;
    const x = Math.min(maxX, Math.max(minX, this.SM.camera.position.x));
    const z = Math.min(maxZ, Math.max(minZ, this.SM.camera.position.z));

    if (this.SM.camera.position.x <= minX || this.SM.camera.position.x >= maxX) {
      this.SM.controls.target.x = x;
    }
    if (this.SM.camera.position.z <= minZ || this.SM.camera.position.z >= maxZ) {
      this.SM.controls.target.z = z;
    }
    this.SM.controls.update();


    this.skyBox.tilt();
    requestAnimationFrame(() => this.draw());
  }
  onClick() {
    this.SM.intersections = this.SM.raycaster.intersectObjects(
      this.entryList.mesh.children
    );
    const intersection = this.SM.intersections[0];

    if (!intersection) {
      return;
    }
    const { name: id } = intersection.object;
    this.props.selectEntry(id); // debounce + same id check
    this.entryList.selectEntry(id);
  }
  render() {
    return (
      <S.Canvas ref={this.canvas} />
    );
  }
}
