export default class MainAnimator {
  constructor(context) {
    this.context = context;
  }

  play() {
    return new Promise(resolve => {
      resolve();
    })
  }

}
