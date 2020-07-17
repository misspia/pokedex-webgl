import gsap from 'gsap';
import { Power4 } from 'gsap';
import Layers from '../../constants/layers';
import { Vector3, Matrix4 } from 'three';


export default class MainAnimator {
  constructor(context) {
    this.context = context;
    this.pp = context.pp;
    this.returnCameraPosition = new Vector3();
    this.cameraRotation = new Vector3().copy(this.context.camera.rotation);
  }

  play() {
    return new Promise(resolve => {
      resolve();
    })
  }

  activateCard(card) {
    const yOffset = 70;
    const cameraPosition = new Vector3().copy(card.position);
    cameraPosition.y += yOffset;
    cameraPosition.z -= 20;

    let target = new Vector3();

    this.returnCameraPosition.copy(this.context.camera.position);

    return new Promise((resolve) => {
      gsap.timeline({
        delay: 0.1,
        onStart: () => {
          this.context.disablePointerEvents(true)
        },
        onComplete: () => {
          this.context.disablePointerEvents(false);
        }
      })
        .add('camera')
        .to(this.context.camera.position, 0.3, {
          x: cameraPosition.x,
          y: cameraPosition.y,
          z: cameraPosition.z,
        }, 'camera')
        .to(target, 0.3, {
          x: card.position.x,
          y: card.position.y,
          z: card.position.z,
          // onUpdate: () => {
          //   this.context.camera.rotation.set(0, 0, 0);
          //   // this.context.camera.lookAt(target);
          //   this.context.controls.update();
          // },
        }, 'camera')
        .to(card.position, 0.2, {
          y: 20,
          ease: Power4.easeInOut,
        })
        .to(card.frontUniforms.uContentVisibility, 0.6, {
          value: 1,
        })
        .to(card.frontUniforms.uBGVisibility, 0.6, {
          value: 1,
        })
        .to(this.pp.bloom, 2, {
          onStart: () => {
            resolve();
          },
          strength: 18,
          radius: 1.2,
          threshold: 0,
          ease: Power4.easeOut,
        })
    })
  }

  deactrivateCard(card) {
    return new Promise((resolve) => {
      gsap.timeline({
        delay: 0.1,
        onStart: () => {
          this.context.disablePointerEvents(true);
        },
        onComplete: () => {
          this.context.disablePointerEvents(false);
          resolve();
        },
      })
        .to(this.pp.bloom, 0.4, {
          strength: 0,
          radius: 0,
          threshold: 0,
          onComplete: () => {
            card.setLayer(Layers.BASE);
          }
        })
        .to(card.frontUniforms.uBGVisibility, 0.4, {
          value: 0,
        })
        .to(card.frontUniforms.uContentVisibility, 0.5, {
          value: 0,
        })
        .to(card.position, 0.2, {
          y: card.restingYPos,
          ease: Power4.easeInOut,
        })
        .to(this.context.camera.position, 0.3, {
          x: this.returnCameraPosition.x,
          y: this.returnCameraPosition.y,
          z: this.returnCameraPosition.z,
          onUpdate: () => {
            this.context.controls.update();
          }
        })
    })
  }

  flipCard(card) {
    const endY = card.position.y;

    gsap.timeline()
      .to(card.position, 0.1, {
        y: endY + card.width,
      })
      .to(card.rotation, 0.3, {
        y: -Math.PI,
      })
      .to(card.position, 0.1, {
        y: endY,
      });
  }
}
