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

    this.carousel = new CardCarousel(this.eventDispatcher);
    this.animator = new AnimationController(this);
    this.activeCard = {};

    this.setupEvents();
  }

  load(list) {
    this.carousel.load(list);
    this.add(this.carousel.mesh);
  }

  setupEvents() {
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

      this.activeCard = this.carousel.getEntryCardById(id);

      this.animator.activateCard(this.activeCard)
        .then(() => {
          this.eventDispatcher.dispatchEvent({
            type: WebglEvents.ACTIVATE_ENTRY,
            intersection: this.mouse.intersection,
            id,
          })
        })
    });

    this.eventDispatcher.addEventListener(
      WebglEvents.DEACTIVATE_ENTRY,
      (e) => {
        this.animator.deactrivateCard(this.activeCard)
          .then(() => {
            this.activeCard = {};
            this.eventDispatcher.dispatchEvent({
              type: WebglEvents.DEACTIVATE_ENTRY_COMPLETE,
            });
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

    this.carousel.update();

    requestAnimationFrame(() => this.draw());
  }
}
