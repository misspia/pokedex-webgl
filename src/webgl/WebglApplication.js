import Pokedex from './Pokedex';

export default class WebglApplication {
  constructor() {
    this.webglMain = new Pokedex();
  }
  init(canvas) {
    this.webglMain.setup(canvas);
  }
  load() {

  }
}
