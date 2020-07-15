import { PerspectiveCamera, Frustum, Matrix4 } from 'three';

// https://stackoverflow.com/questions/29758233/three-js-check-if-object-is-still-in-view-of-the-camera
// https://stackoverflow.com/questions/17624021/determine-if-a-mesh-is-visible-on-the-viewport-according-to-current-camera
export default class Camera extends PerspectiveCamera{
  constructor(fov, aspect, near, far) {
    super(fov, aspect, near, far);
    this.frustum = new Frustum();
    this.cameraViewProjectionMatrix = new Matrix4();
  }

  update() {
    this.updateMatrixWorld();
    this.matrixWorldInverse.getInverse(this.matrixWorld);
    this.cameraViewProjectionMatrix.multiplyMatrices(
      this.projectionMatrix,
      this.matrixWorldInverse
    );
    this.frustum.setFromProjectionMatrix(this.cameraViewProjectionMatrix);
  }
}
