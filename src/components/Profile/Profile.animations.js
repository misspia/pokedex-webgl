import { TweenMax, TimelineMax, Back, CSSPlugin } from 'gsap';

const css = CSSPlugin;

export const swapTabViews = (activeView, inActiveView) => {
  TweenMax.to(inActiveView, 0.7, {
    autoAlpha: 0,
    display: 'none',
    onComplete: () => {
      TweenMax.to(activeView, 0.7, {
        autoAlpha: 1,
        display: 'flex',
      });
    }
  })
};

export const reveal = (wrapper) => {
  const tl = new TimelineMax();
  tl.from(wrapper, 0.7, {
    autoAlpha: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  })
    .to(wrapper, 0.5, {
      autoAlpha: 1,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      ease: Back.easeOut(1.7),
    })
    .to(wrapper, 0.5, {
      backgroundColor: 'rgba(255, 255, 255, 0.857)',
    })
}

export const hide = (wrapper) => {
  TweenMax.to(wrapper, 0.7, {
    autoAlpha: 0,
  });
};
