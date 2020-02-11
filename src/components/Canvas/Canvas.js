import React, { Component } from 'react';
import WebglAppication from '../../webgl/WebglApplication';
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
    this.webgl = {};
    this.entryList = {};
    this.skyBox = {};
    this.lights = {};
    this.canvas = React.createRef();
  }
  componentDidMount() {
    this.webgl = new WebglAppication();
    this.webgl.init(this.canvas.current);
    this.webgl.load(this.props.entries);
    this.webgl.draw();

    this.canvas.current.addEventListener(
      'mousedown',
      (e) => this.webgl.onCanvasClick(
        (id) => this.props.selectEntry(id)
      ),
      { passive: true }
    );
  }

  render() {
    return (
      <S.Canvas ref={this.canvas} />
    );
  }
}
