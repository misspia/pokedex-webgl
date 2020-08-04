import Animtor from '../animators/IntroAnimator';
import Stages from '../../constants/stages';
export default class IntroStage {
  constructor(context) {
    this.context = context;
    this.animator = new Animtor(this.context);

    this.init();
  }

  init() {
    return this.animator.play()
      .then(() => {
        this.context.eventDispatcher.setStage(Stages.MAIN);
      })
  }

  update() {

  }
}
