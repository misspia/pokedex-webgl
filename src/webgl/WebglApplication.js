import { EventDispatcher } from 'three';
import Pokedex from './Pokedex';
import createGUI from '../utils/createGUI';
import Stages from '../constants/stages';
import { AppEvents } from '../constants/events';

export default class WebglApplication extends EventDispatcher {
  constructor() {
    super();
    this.webglMain = new Pokedex(this);
    this.stage = Stages.ENTRANCE;
  }
  init(canvas) {
    this.webglMain.setup(canvas);
  }
  load(list) {
    this.webglMain.load(list);
  }

  setStage(stage) {
    this.stage = stage
    this.dispatchEvent(AppEvents.STAGE_CHANGE, { stage });
  }

  playEntrance() {
    this.webglMain.playEntrance();
  }

  playIntro() {
    this.webglMain.playIntro();
  }

  playMain() {
    // this.webglMain.playMain();
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
