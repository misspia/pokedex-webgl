import { TweenLite } from 'gsap';

export const enter = (wrapper, image) => {
  TweenLite.fromTo(wrapper, 0.7,
    {
      autoAlpha: 0,
      y: -200,
    },
    {
      autoAlpha: 1,
      y: 0,
      onComplete: () => {
        TweenLite.fromTo(image, 0.7,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
          }
        )
      }
    }
  )
}
