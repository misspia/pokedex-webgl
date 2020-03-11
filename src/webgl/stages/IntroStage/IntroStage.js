import Animtor from './IntroAnimator';

export default class IntroStage {
  constructor(context) {
    this.context = context;
    this.animator = new Animtor(this.context);
  }

  init() {

  }
}
