import { PerspectiveCamera, Frustum, Matrix4 } from 'three';

export default class Camera extends PerspectiveCamera{
  constructor(fov, aspect, near, far) {
    super(fov, aspect, near, far);
    this.frustum = new Frustum();
    this.cameraViewProjectionMatrix = new Matrix4();
  }
}
