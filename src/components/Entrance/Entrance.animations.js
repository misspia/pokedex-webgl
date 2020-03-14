import { TimelineMax } from 'gsap';

export function reveal(wrapper) {
  return new Promise(resolve => {
    const tl = new TimelineMax({
      onComplete: resolve,
    });
    tl
      .from(wrapper, {
        autoAlpha: 0,
      })
      .to(wrapper, 0.2, {
        autoAlpha: 1,
      });
  });
}

export function hide(wrapper) {
  return new Promise(resolve => {
    const tl = new TimelineMax({
      onComplete: resolve,
    });
    tl
      .from(wrapper, {
        autoAlpha: 1,
      })
      .to(wrapper, 0.2, {
        autoAlpha: 0,
      });
  });
}
