import { TweenMax } from 'gsap';

export const enter = (wrapper, image) => {
  TweenMax.fromTo(wrapper, 0.7,
    {
      autoAlpha: 0,
      y: -200,
    },
    {
      autoAlpha: 1,
      y: 0,
      onComplete: () => {
        TweenMax.fromTo(image, 0.7,
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
