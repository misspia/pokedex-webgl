import * as THREE from 'three';
import { TimelineMax } from 'gsap';
import { Colors } from '../../themes';

export default class OrbAnimator {
  constructor(context) {
    this.context = context;
    this.shellUniforms = context.shellUniforms;
  }

  setType(type) {
    return new Promise(resolve => {
      const tl = new TimelineMax({
        onComplete: resolve
      });
      tl
        .from(this.shellUniforms.uColorProgress, {
          value: 0,
          onStart: () => {
            this.shellUniforms.uColor.value = Colors.typesVector[type];
          },
        })
        .add('shell')
        .to(this.context.shell.scale, 1, {
          x: 2,
          y: 2,
          z: 2,
        }, 'shell')
        .to(this.shellUniforms.uColorProgress, 1, {
          value: 1,
        }, 'shell')
        .to(this.shellUniforms.uAlpha, 1, {
          value: 0.2,
        }, 'shell')

    });
  }
}
