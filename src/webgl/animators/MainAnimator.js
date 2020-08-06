import gsap from 'gsap';
import { Power4 } from 'gsap';
import Layers from '../../constants/layers';
import { Vector3 } from 'three';

export default class MainAnimator {
  constructor(context) {
    this.context = context;
    this.returnCameraPosition = new Vector3();
    this.cameraRotation = new Vector3().copy(this.context.camera.rotation);
    this.cameraYPositionInactive = 100;
    this.cameraYPositionActive = 60;
    this.target = new Vector3();
  }

  play() {
    return new Promise(resolve => {
      resolve();
    })
  }

  activateCard(card) {
    const cameraPosition = new Vector3(
      card.position.x,
      this.cameraYPositionActive,
      card.position.z - 20,
    );

    this.returnCameraPosition.copy(this.context.camera.position);

    return new Promise((resolve) => {
      gsap.timeline({
        delay: 0.1,
        onStart: () => {
          this.context.disablePointerEvents(true);
        },
        onComplete: () => {
          this.context.disablePointerEvents(false);
          resolve();
        }
      })
        .add('camera')
        // .to(this.context.controls.object.position, 0.5, {
        .to(this.context.camera.position, 0.5, {
          x: cameraPosition.x,
          y: cameraPosition.y,
          z: cameraPosition.z,
          ease: Power4.easeOut,
        }, 'camera')
        .to(this.target, 0.5, {
          x: card.position.x,
          y: 0,
          z: card.position.z,
          ease: Power4.easeOut,
          // onUpdate: () => {
          //   // this.context.controls.target = this.target;
          //   this.context.camera.lookAt(this.target.x, this.target.y, this.target.z);

          // }
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
    })
  }

  deactivateCard(card) {
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
        .add('camera')
        .to(this.context.camera.position, 0.3, {
          y: this.returnCameraPosition.y,
          delay: 0.3,
          onUpdate: () => {
            // this.context.controls.update();
          }
        }, 'camera')
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
