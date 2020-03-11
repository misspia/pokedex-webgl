import Animator from './EntranceAnimator';

export default class IntroStage {
  constructor(context) {
    this.context = context;
    this.animator = new Animator(this.context);
  }

  destroy() {

  }

  init() {

  }
}
