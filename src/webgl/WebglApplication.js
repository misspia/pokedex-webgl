import Pokedex from './Pokedex';
import AnimationController from './AnimationController';

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

  onCanvasClick(selectEntry = (id) => { }) {
    this.webglMain.onClick(selectEntry);
  }

  playCarousel() {
    this.webglMain.isCarouselRotating = true;
  }

  pauseCarousel() {
    this.webglMain.isCarouselRotating = false;
  }

  draw() {
    this.webglMain.draw();
  }
}
