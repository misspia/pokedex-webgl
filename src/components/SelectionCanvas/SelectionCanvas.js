import React, { Component } from 'react';

import SceneManager from '../SceneManager/SceneManager';
import EntryList from '../EntryList/EntryList';
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
    this.canvas = React.createRef();
  }
  componentDidMount() {
    this.SM = new SceneManager(this.canvas);
    this.entryList = new EntryList(
      this.props.entries,
      this.props.setLoadingComplete
    );
    this.SM.scene.add(this.entryList.mesh);
    this.SM.camera.lookAt(this.entryList.getCenter());

    this.canvas.current.addEventListener('click', (e) => this.onClick(e), { passive: true });

    this.draw();
  }
  draw() {
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
