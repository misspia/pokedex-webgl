import { EventDispatcher } from 'three';
import Pokedex from './Pokedex';
import createGUI from '../utils/createGUI';

export default class WebglApplication extends EventDispatcher {
  constructor() {
    super();
    this.webglMain = new Pokedex(this);
  }
  init(canvas) {
    this.webglMain.setup(canvas);
  }
  load(list) {
    this.webglMain.load(list);
  }

  startIntro() {
    this.webglMain.startIntro();
  }
  deactivateEntry() {
    this.webglMain.dispatchDeactivateEntry()
  }

  createGUI(container) {
    createGUI(this.webglMain, container);
  }

  draw() {
    this.webglMain.draw();
  }
}
