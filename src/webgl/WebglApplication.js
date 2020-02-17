import Pokedex from './Pokedex';

export default class WebglApplication {
  constructor() {
    this.webglMain = new Pokedex();
  }
  init(canvas) {
    this.webglMain.setup(canvas);
  }
  load(list) {
    this.webglMain.load(list);
  }

  selectEntry(id) {
    this.webglMain.selectEntry(id);
  }

  deactivateEntry() {
    this.webglMain.deactivateEntry();
  }

  onCanvasClick(selectEntry = (id) => { }) {
    this.webglMain.onClick(selectEntry);
  }

  draw() {
    this.webglMain.draw();
  }
}
