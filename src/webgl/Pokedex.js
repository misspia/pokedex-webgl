import SceneManager from './SceneManager';
import Lights from './Lights';
import CardCarousel from './CardCarousel';
import Orb from './Orb';
import PostProcessor from './PostProcessor';

import { WebglEvents } from '../constants/events';
import Layers from '../constants/layers';
import { EntranceStage, IntroStage, MainStage } from './stages';
import Stages from '../constants/stages';


export default class Pokedex extends SceneManager {
  constructor(eventDispatcher) {
    super();
    this.eventDispatcher = eventDispatcher;
    this.pp = new PostProcessor(this);
    this.lights = new Lights();
    this.orb = new Orb();
    this.carousel = {};
    this.activeCard = {};
    this.focusCard = null;
    this.stage = {};
  }

  setup(canvas) {
    this.initializeScene(canvas);

    this.pp.setup();

    this.add(this.lights.directional);
    this.add(this.lights.ambient);
    this.add(this.orb.pivot);

    this.carousel = new CardCarousel(
      this.eventDispatcher,
      this.renderer.capabilities.getMaxAnisotropy(),
    );

    this.setupEvents();
  }

  load(list) {
    this.carousel.load(list);
    this.add(this.carousel.pivot);
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
    window.addEventListener('resize', (e) => {
      this.resize(e);
      this.pp.resize(e)
    }, { passive: true });

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

    this.renderer.autoClear = false;
    this.renderer.clear();

    this.camera.layers.set(Layers.BLOOM_CARD);
    this.pp.render();

    this.renderer.clearDepth();
    this.camera.layers.set(Layers.BASE);
    this.renderer.render(this.scene, this.camera);



  }
}
