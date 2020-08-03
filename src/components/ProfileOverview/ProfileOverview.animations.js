import gsap, { Power3, CSSPlugin } from 'gsap';

const css = CSSPlugin;


export const enter = (card, tabs) => {
  gsap.timeline()
    .fromTo(card, 0.4,
      {
        autoAlpha: 0,
        y: -100,
      },
      {
        autoAlpha: 1,
        y: 0,
      })
    .staggerFromTo(tabs.children, 0.6,
      {
        autoAlpha: 0,
        x: 100,
      },
      {
        autoAlpha: 1,
        x: 0,
        ease: Power3.easeIn,
      },
      0.2,
      '+=0.4',
    );
};


const xDistance = 100;
const viewDuration = 0.4;

export const revealView = (view) => {
  gsap.fromTo(view, viewDuration, {
    autoAlpha: 0,
    x: -xDistance,
  }, {
    autoAlpha: 1,
    x: 0,
  });
};

export const hideView = (view, onComplete) => {
  gsap.fromTo(view, viewDuration, {
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


