import { TweenLite } from 'gsap';

const xDistance = 100;
const viewDuration = 0.4;

export const revealView = (view) => {
  TweenLite.fromTo(view, viewDuration, {
    autoAlpha: 0,
    x: -xDistance,
  }, {
    autoAlpha: 1,
    x: 0,
  });
};

export const hideView = (view, onComplete) => {
  TweenLite.fromTo(view, viewDuration, {
    autoAlpha: 1,
    x: 0,
  }, {
    autoAlpha: 0,
    x: xDistance,
    onComplete: () => onComplete(),
  });
};

export const swapView = (currView, prevView) => {
  hideView(prevView, () => revealView(currView));
};

