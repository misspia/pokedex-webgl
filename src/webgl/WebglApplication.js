import Pokedex from './Pokedex';
import { EventDispatcher } from 'three';

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

  deactivateEntry() {
    this.webglMain.dispatchDeactivateEntry()
  }

  draw() {
    this.webglMain.draw();
  }
}
