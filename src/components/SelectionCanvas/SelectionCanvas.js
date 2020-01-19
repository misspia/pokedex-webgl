import React, { Component } from 'react';

import SceneManager from '../SceneManager/SceneManager';
import EntryList from '../EntryList/EntryList';
import { PROFILE_NAME } from '../Profile/Profile';
import * as S from './SelectionCanvas.styles';

export default class SelectionCanvas extends Component {
  static defaultProps = {
    entries: [],
    setId: () => { },
    id: null,
    setLoadingComplete: () => {},
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
  onClick(e) {
    e.preventDefault();
    this.SM.intersections = this.SM.raycaster.intersectObjects(
      this.entryList.mesh.children
    );
    const intersection = this.SM.intersections[0];

    if (!intersection) {
      return;
    }
    const { name: id } = intersection.object;
    if (id !== PROFILE_NAME) {
      this.props.setId(id); // debounce + same id check
      this.entryList.selectEntry(id);
    }
  }
  render() {
    return (
      <S.Canvas ref={this.canvas} />
    );
  }
}
