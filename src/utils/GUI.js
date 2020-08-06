import * as dat from 'dat.gui';

export default class GUI {
  constructor(context, container) {
    this.context = context;
    this.gui = new dat.GUI({
      autoPlace: !!container,
    });
    if (container) {
      container.appendChild(this.gui.domElement);
    }
    // this.createOrbFolder();
  }

  createOrbFolder() {
    const { orb } = this.context;
    const controller = {
      shellScale: 1,
      outerScale: 1,
      innerScale: 1,
    };
    const shellFolder = this.gui.addFolder('Shell');
    shellFolder.add(controller, 'shellScale', 0, 3, 0.1)
      .name('scale')
      .onChange((value) => {
        orb.shell.scale.set(value, value, value);
      });
    shellFolder.add(orb.shellUniforms.uAlpha, 'value', 0, 1, 0.01)
      .name('[Shell] uAlpha');


    const outerFolder = this.gui.addFolder('Outer Core');
    outerFolder.add(controller, 'outerScale', 0, 3, 0.1)
      .name('scale')
      .onChange((value) => {
        orb.outerCore.scale.set(value, value, value);
      });
    outerFolder.add(orb.outerCoreUniforms.uAlpha, 'value', 0, 1, 0.01)
      .name('uAlpha');

    const innerFolder = this.gui.addFolder('Inner Core');
    innerFolder.add(controller, 'innerScale', 0, 3, 0.1)
      .name('scale')
      .onChange((value) => {
        orb.innerCore.scale.set(value, value, value);
      });
    innerFolder.add(orb.innerCoreUniforms.uAlpha, 'value', 0, 1, 0.01)
      .name('uAlpha')


  }
}
