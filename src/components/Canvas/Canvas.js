import React, { Component } from 'react';
import * as THREE from 'three';

import { SkyBox, Lights, EntryList, SceneManager } from '../../webgl';
import * as S from './Canvas.styles';

export default class Canvas extends Component {
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

    this.entryList = new EntryList(this.props.entries);

    this.skyBox.add(this.entryList.mesh);
    this.entryList.getCenter();
    this.entryList.calcBounds();


    this.canvas.current.addEventListener('mousedown', (e) => this.onClick(e), { passive: true });

    this.draw();
  }
  draw() {
    this.SM.renderer.render(this.SM.scene, this.SM.camera);
    this.SM.raycaster.setFromCamera(this.SM.mouse, this.SM.camera);
    this.SM.intersections = this.SM.raycaster.intersectObjects(
      this.entryList.mesh.children
    );
    this.SM.controls.update(this.entryList.bounds);

    this.skyBox.tilt(this.SM.camera.position);
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
