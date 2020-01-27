import { TweenLite } from 'gsap';

export const swapTabViews = (activeView, inActiveView) => {
  TweenLite.to(inActiveView, 0.7, {
    autoAlpha: 0,
    display: 'none',
    onComplete: () => {
      TweenLite.to(activeView, 0.7, {
        autoAlpha: 1,
        display: 'flex',
      });
    }
  })
};

export const reveal = (wrapper) => {
  TweenLite.to(wrapper, 0.7, {
    autoAlpha: 1,
    display: 'flex',
  });
}

export const hide = (wrapper) => {
  TweenLite.to(wrapper, 0.7, {
    autoAlpha: 0,
    display: 'none',
  });
};
