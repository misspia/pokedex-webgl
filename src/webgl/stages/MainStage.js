import { WebglEvents } from '../../constants/events';
import Animator from '../animators/MainAnimator';

export default class MainStage {
  constructor(context) {
    this.context = context;
    this.canvas = context.canvas;
    this.mouse = context.mouse;
    this.eventDispatcher = context.eventDispatcher;
    this.pp = context.pp;
    this.animator = new Animator(context);

    this.carousel = context.carousel;
    this.activeCard = {};
    this.focusCard = null;

    this.init();
  }

  destroy() {

  }

  exit() {

  }

  init() {
    this.setupEvents();
  }

  setupEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.updatePosition(e);
      this.mouse.updateIntersection();

      this.eventDispatcher.dispatchEvent({
        type: WebglEvents.MOUSEMOVE,
        card: this.mouse.intersection,
      });

      if(!this.mouse.intersection) {
        return;
      }
      if(!this.mouse.isIntersectionCardBack()) {
        return;
      }

      const { name: id } = this.mouse.intersection.object.parent;
      const card = this.carousel.getEntryCardById(id);

      if(card.isFlipped) {
        return;
      }
      card.setFlippedState(true);
      this.animator.flipCard(card);

    });


    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse.updateIntersection();

      if (
        !this.mouse.intersection
        || !this.mouse.isIntersectionCardFront()
      ) {
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
    );
  }

  update() {

  }
}
