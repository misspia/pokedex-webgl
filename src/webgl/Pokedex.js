import SceneManager from './SceneManager';
import Lights from './Lights';
import CardCarousel from './CardCarousel';
import AnimationController from './AnimationController';
import WebglEvents from '../constants/webglEvents';

export default class Pokedex extends SceneManager {
  constructor(eventDispatcher) {
    super();
    this.eventDispatcher = eventDispatcher;
  }
  setup(canvas) {
    this.initializeScene(canvas);

    this.lights = new Lights();
    this.add(this.lights.directional);
    this.add(this.lights.ambient);

    this.carousel = new CardCarousel();
    this.isCarouselRotating = true;

    this.animator = new AnimationController(this);
    this.card = {};

    this.setupEventDispatchers();
    this.setupEventListeners();
  }

  load(list) {
    this.carousel.load(list);
    this.add(this.carousel.mesh);
  }

  setupEventDispatchers() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.updatePosition(e);
      this.mouse.updateIntersection();

      this.eventDispatcher.dispatchEvent({
        type: WebglEvents.CARD_HOVER,
        intersection: this.mouse.intersection,
      });
    });


    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse.updateIntersection();

      if (!this.mouse.intersection) {
        return;
      }

      const { name: id } = this.mouse.intersection.object.parent;

      this.eventDispatcher.dispatchEvent({
        type: WebglEvents.CARD_CLICK,
        intersection: this.mouse.intersection,
        id,
      });

      this.carousel.selectEntry(id);
      this.card = this.carousel.getEntryCardById(id);

      this.animator.activateCard(this.card)
        .then(() => {
          this.eventDispatcher.dispatchEvent({
            type: WebglEvents.ACTIVATE_ENTRY,
            intersection: this.mouse.intersection,
            id,
          })
        })
    });
  }

  setupEventListeners() {
    this.eventDispatcher.addEventListener(
      WebglEvents.DEACTIVATE_ENTRY,
      (e) => {
        this.animator.deactrivateCard(this.card)
          .then(() => {
            this.card = {};
          });
      }
    )
  }


  dispatchDeactivateEntry() {
    this.eventDispatcher.dispatchEvent({
      type: WebglEvents.DEACTIVATE_ENTRY,
    });
  }

  draw() {
    this.renderer.render(this.scene, this.camera);

    this.carousel.update(this.isCarouselRotating);

    requestAnimationFrame(() => this.draw());
  }
}
