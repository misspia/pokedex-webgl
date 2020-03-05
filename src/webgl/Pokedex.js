import SceneManager from './SceneManager';
import Lights from './Lights';
import CardCarousel from './CardCarousel';
import AnimationController from './animations';
import WebglEvents from '../constants/webglEvents';
import PostProcessor from './PostProcessor';
import Layers from '../constants/layers';

export default class Pokedex extends SceneManager {
  constructor(eventDispatcher) {
    super();
    this.eventDispatcher = eventDispatcher;
    this.pp = new PostProcessor(this);
    this.lights = new Lights();
    this.carousel = {};
    this.animator = {};
    this.activeCard = {};
    this.focusCard = null;
  }

  setup(canvas) {
    this.initializeScene(canvas);

    this.pp.setup();

    this.add(this.lights.directional);
    this.add(this.lights.ambient);

    this.carousel = new CardCarousel(
      this.eventDispatcher,
      this.renderer.capabilities.getMaxAnisotropy(),
    );
    this.animator = new AnimationController(this);

    this.setupEvents();
  }

  load(list) {
    this.carousel.load(list);
    this.add(this.carousel.mesh);
  }

  setupEvents() {
    window.addEventListener('resize', (e) => {
      this.resize(e);
      this.pp.resize(e)
    }, { passive: true });

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.updatePosition(e);
      this.mouse.updateIntersection();

      this.eventDispatcher.dispatchEvent({
        type: WebglEvents.MOUSEMOVE,
        card: this.mouse.intersection,
      });

      if (!this.mouse.intersection) {
        if (!!this.focusCard) {
          this.eventDispatcher.dispatchEvent({
            type: WebglEvents.UNFOCUS_CARD,
            card: this.focusCard,
          });

          this.focusCard = null;
        }
        return;
      }


      const { name: id } = this.mouse.intersection.object.parent;

      if (!this.focusCard || this.focusCard.id === id) {
        return;
      }

      if (
        this.focusCard.id !== this.mouse.intersection.obj
      ) {
        this.eventDispatcher.dispatchEvent({
          type: WebglEvents.UNFOCUS_CARD,
          card: this.focusCard,
        });
      }
      if (this.mouse.intersection) {
        const { name: id } = this.mouse.intersection.object.parent;
        this.focusCard = this.carousel.getEntryCardById(id);

        this.eventDispatcher.dispatchEvent({
          type: WebglEvents.FOCUS_CARD,
          card: this.focusCard,
        });
      }
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


    this.eventDispatcher.addEventListener(
      WebglEvents.FOCUS_CARD,
      (e) => {
        this.animator.focusCard(e.card);
      }
    );

    this.eventDispatcher.addEventListener(
      WebglEvents.UNFOCUS_CARD,
      (e) => {
        this.animator.unfocusCard(e.card);
      }
    )
  }

  dispatchDeactivateEntry() {
    this.eventDispatcher.dispatchEvent({
      type: WebglEvents.DEACTIVATE_ENTRY,
    });
  }

  startIntro() {
    this.animator.startIntro()
      .then(() => {
        console.debug('intro complete')
      })
  }

  draw() {
    requestAnimationFrame(() => this.draw());
    this.carousel.update();

    this.renderer.autoClear = false;
    this.renderer.clear();

    this.camera.layers.set(Layers.BLOOM);
    this.pp.render();

    this.renderer.clearDepth();
    this.camera.layers.set(Layers.BASE);
    this.renderer.render(this.scene, this.camera);



  }
}
