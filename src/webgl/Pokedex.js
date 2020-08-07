import * as THREE from 'three';

import SceneManager from './SceneManager';
import Lights from './Lights';
import CardCarousel from './CardCarousel';
import Floor from './Floor';

import { WebglEvents, AppEvents } from '../constants/events';
import { EntranceStage, IntroStage, MainStage } from './stages';
import Stages from '../constants/stages';


export default class Pokedex extends SceneManager {
  constructor(eventDispatcher) {
    super();
    this.eventDispatcher = eventDispatcher;
    this.lights = new Lights();
    this.floor = new Floor();
    this.carousel = {};
    this.activeCard = {};
    this.focusCard = null;
    this.stage = {};
  }

  setup(canvas) {
    this.initializeScene(canvas);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.add(this.lights.ambient);
    this.add(this.lights.spot);

    this.carousel = new CardCarousel(
      this.eventDispatcher,
      this.renderer.capabilities.getMaxAnisotropy(),
    );

    this.setupEvents();

    setInterval(() => {
      this.lights.updateSpot(this.camera.position);
    }, 1000);
  }

  load(list) {
    this.carousel.load(list);
    this.add(this.carousel.pivot);
    this.add(this.floor.pivot)
  }

  setStage(stage) {
    if (this.stage.destroy) {
      this.stage.destroy();
    }
    switch (stage) {
      case Stages.ENTRANCE: {
        this.stage = new EntranceStage(this);
        break;
      }
      case Stages.INTRO: {
        this.stage.exit()
          .then(() => {
            this.stage = new IntroStage(this);
          });
        break;
      }
      case Stages.MAIN: {
        this.stage = new MainStage(this);
        break;
      }
      default: {
        console.debug(`unrecognized stage: ${stage}`);
      }
    }
  }

  setupEvents() {
    window.addEventListener('resize', (e) => this.resize(e), { passive: true });
  }

  dispatchDeactivateEntry() {
    this.eventDispatcher.dispatchEvent({
      type: WebglEvents.DEACTIVATE_ENTRY,
    });
  }

  draw() {
    requestAnimationFrame(() => this.draw());
    if (this.stage.update) {
      this.stage.update();
    }
    this.carousel.update();

    this.renderer.render(this.scene, this.camera);
  }
}
