import Animtor from './IntroAnimator';
import Stages from '../../../constants/stages';
export default class IntroStage {
  constructor(context) {
    this.context = context;
    this.animator = new Animtor(this.context);

    this.init();
  }

  init() {
    this.context.setClearColor(0x000000);

    this.animator.play()
      .then(() => {
        this.context.setStage(Stages.MAIN);
      })
  }

  update() {

  }
}
