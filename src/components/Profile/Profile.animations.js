import { TweenMax } from 'gsap';

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
  TweenMax.to(wrapper, 0.7, {
    autoAlpha: 1,
    display: 'flex',
  });
}

export const hide = (wrapper) => {
  TweenMax.to(wrapper, 0.7, {
    autoAlpha: 0,
    display: 'none',
  });
};
