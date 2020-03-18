import { TimelineMax } from 'gsap';

export function reveal(wrapper, letters) {
  return new Promise(resolve => {
    const tl = new TimelineMax({
      onComplete: resolve,
      delay: 1,
    });
    tl
      .from(wrapper, {
        autoAlpha: 0,
      })
      .to(wrapper, 0.2, {
        autoAlpha: 1,
      })
      .staggerFromTo(letters, 0.2, {
        autoAlpha: 0,
        x: 30,
      }, {
        autoAlpha: 1,
        x: 0,
      }, 0.2, '+=0.2')
  });
}

export function hide(wrapper, letters) {
  return new Promise(resolve => {
    const tl = new TimelineMax({
      onComplete: resolve,
    });
    tl
      .to(letters, 0.3, {
        margin: '0 10px',
      })
      .staggerFromTo(letters, 0.2, {
        autoAlpha: 1,
        x: 0,
      }, {
        autoAlpha: 0,
        x: -30,
      }, 0.2, '+=0.2')
      .from(wrapper, {
        autoAlpha: 1,
      })
      .to(wrapper, 0.2, {
        autoAlpha: 0,
      })

  });
}
