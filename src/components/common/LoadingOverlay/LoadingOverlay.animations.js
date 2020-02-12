import { TweenMax, TimelineLite, CSSPlugin } from 'gsap';

const css = CSSPlugin;

export function roll(sprite, spriteImg) {
  const rollDuration = [0.3, 0.4, 0.4, 0.4];
  const config = {
    repeat: -1,
    yoyo: true,
    delay: 0.3,
  };
  const spriteTl = new TimelineLite(config);
  const spriteImgTl = new TimelineLite(config);
  spriteTl.to(
    sprite,
    rollDuration[0],
    {
      x: 0,
    })
    .to(
      sprite,
      rollDuration[1],
      {
        x: -10,
      })
    .to(
      sprite,
      rollDuration[2],
      {
        x: 30,
      })
    .to(
      sprite,
      rollDuration[3],
      {
        x: -30,
      });
  spriteImgTl.to(
    spriteImg,
    rollDuration[0],
    {
      rotate: 0,
    })
    .to(
      spriteImg,
      rollDuration[1],
      {
        rotate: -10,
      })
    .to(
      spriteImg,
      rollDuration[2],
      {
        rotate: 60,
      })
    .to(
      spriteImg,
      rollDuration[3],
      {
        rotate: -60,
      });
}

export function fadeIn(wrapper) {
  TweenMax.to(wrapper, 0.5, {
    autoAlpha: 1,
    display: 'flex',
  })
}

export function fadeOut(wrapper, text) {
  const tl = new TimelineLite();
  tl
    .from(text, 0.2, {
      y: 0,
    })
    .to(text, 0.2, {
      y: -10,
    })
    .to(text, 0.3, {
      y: 50,
      autoAlpha: 0,
    })
    .to(wrapper, 0.3, {
      autoAlpha: 0,
      delay: 1,
    });
}
