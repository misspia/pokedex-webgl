import React, { Component } from 'react';

import SceneManager from '../SceneManager/SceneManager';
import EntryList from '../EntryList/EntryList';
import { SkyBox, Lights } from '../Environment';
import * as S from './SelectionCanvas.styles';
import * as THREE from 'three';

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

    this.skyBox = new SkyBox({ size: 1000 });
    this.SM.add(this.skyBox.mesh);

    this.entryList = new EntryList(
      this.props.entries,
      this.props.setLoadingComplete
    );
    this.SM.add(this.entryList.mesh);

    // this.SM.lookAt(this.entryList.getCenter());
    // this.SM.controls.target = this.entryList.getCenter();
    this.SM.controls.enablePan = true;
    this.SM.controls.screenSpacePanning = true;

    this.canvas.current.addEventListener('click', (e) => this.onClick(e), { passive: true });

    this.draw();
  }
  draw() {
    // console.debug(this.SM.camera.position, this.SM.camera.rotation)
    this.SM.renderer.render(this.SM.scene, this.SM.camera);
    this.SM.raycaster.setFromCamera(this.SM.mouse, this.SM.camera);
    this.SM.intersections = this.SM.raycaster.intersectObjects(
      this.entryList.mesh.children
    );
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
