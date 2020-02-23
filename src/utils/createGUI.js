import * as dat from 'dat.gui';

export default function (context, container) {
  const gui = new dat.GUI({
    autoPlace: !!container,
  });

  if (container) {
    container.appendChild(gui.domElement);
  }

  const bloomFolder = gui.addFolder('bloom');
  bloomFolder.add(context.pp.bloom, 'strength', 0, 50, 0.1);
  bloomFolder.add(context.pp.bloom, 'radius', 0, 5, 0.1);
  bloomFolder.add(context.pp.bloom, 'threshold', 0, 5, 0.1);

}
