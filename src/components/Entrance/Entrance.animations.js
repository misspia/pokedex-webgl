import gsap from 'gsap';

const enablePointerEvents = (element, isEnabled) => (
  gsap.set(element, { pointerEvents: isEnabled ? 'all' : 'none' })
);

export function enter(wrapper, letters) {
  return new Promise(resolve => {
   enablePointerEvents(wrapper, false);

    gsap.timeline({
      onComplete: () => {
        enablePointerEvents(wrapper, true);
        resolve();
      },
      delay: 1,
    })
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

export function exit(wrapper, letters) {
  return new Promise(resolve => {
    enablePointerEvents(wrapper, false);

    gsap.timeline({
      onComplete: () => {
        enablePointerEvents(wrapper, true);
      }
    })
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
        onComplete: (resolve),
      })
      .to(wrapper, 0.2, {
        autoAlpha: 0,
      })
  });
}
