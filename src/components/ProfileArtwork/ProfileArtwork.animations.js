import { TimelineMax, CSSPlugin, Power1, Expo } from 'gsap';

const css = CSSPlugin;

export const enter = (wrapper, image) => {
  const tl = new TimelineMax();

  tl.fromTo(wrapper, 0.7,
    {
      autoAlpha: 0,
      y: -200,
    },
    {
      autoAlpha: 1,
      y: 0,
    }
  )
    .fromTo(image, 0.7,
      {
        autoAlpha: 0,
        filter: 'brightness(1) contrast(0.5)',
      },
      {
        autoAlpha: 1,
        filter: 'brightness(4) contrast(0.5)',
        ease: Power1.easeInOut,
      })
    .to(image, 0.5,
      {
        filter: 'brightness(1) contrast(1)',
        ease: Expo.easeOut,
      })

}
