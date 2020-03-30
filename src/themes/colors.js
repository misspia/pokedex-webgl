import { Vector3 } from 'three';
import Types from '../constants/types';

export default {
  white: '#fff',
  whiteTranslucent: 'rgba(255,255,255, 0.5)',
  whiteOverlayBackground: 'rgba(255,255,255, 0.7)',
  black: '#000',
  blueTranslucent: 'rgba(200, 200, 255, 0.7)',
  blue: 'rgba(200, 200, 255, 1.0)',
  gold: '#a07b27',
  shadow: 'rgba(0, 0, 0, 0.2)',


  /**
   * types
   */
  types: {
    [Types.normal]: '#b9bb8a',
    [Types.fighting]: '#d34940',
    [Types.flying]: '#b39dfa',
    [Types.poison]: '#bb5cbb',
    [Types.ground]: '#efd178',
    [Types.rock]: '#d2b854',
    [Types.bug]: '#c2d23f',
    [Types.ghost]: '#8a70b0',
    [Types.steel]: '#c2c2db',
    [Types.fire]: '#fe964d',
    [Types.water]: '#77a1fd',
    [Types.grass]: '#8edc67',
    [Types.electric]: '#ffdd50',
    [Types.psychic]: '#fc7199',
    [Types.ice]: '#9ad8d9',
    [Types.dragon]: '#7038f9',
    [Types.fairy]: '#f8a4b7',
    [Types.unkown]: '#b0bdb9',
    [Types.dark]: '#8e7865',
    // shadow: '#8e7865', // dark ??
  },

  /**
   * for shaders
   */
  // typesVector: {
  //   normal: new Vector3(185, 187, 138),
  //   fighting: new Vector3(211, 73, 64),
  //   flying: new Vector3(179, 157, 250),
  //   poison: new Vector3(187, 92, 187),
  //   ground: new Vector3(239, 209, 120),
  //   rock: new Vector3(210, 184, 84),
  //   bug: new Vector3(194, 210, 63),
  //   ghost: new Vector3(138, 112, 176),
  //   steel: new Vector3(194, 194, 219),
  //   fire: new Vector3(254, 150, 77),
  //   water: new Vector3(119, 161, 253),
  //   grass: new Vector3(142, 220, 103),
  //   electric: new Vector3(255, 221, 80),
  //   psychic: new Vector3(252, 113, 153),
  //   ice: new Vector3(154, 216, 217),
  //   dragon: new Vector3(112, 56, 249),
  //   fairy: new Vector3(248, 164, 183),
  //   unkown: new Vector3(176, 189, 185),
  //   dark: new Vector3(142, 120, 101),
  // },

  typesVector: {
    [Types.normal]: new Vector3(0.73, 0.73, 0.54),
    [Types.fighting]: new Vector3(0.82, 0.29, 0.25),
    [Types.flying]: new Vector3(0.7, 0.62, 250),
    [Types.poison]: new Vector3(0.73, 0.36, 0.73),
    [Types.ground]: new Vector3(0.94, 0.82, 0.47),
    [Types.rock]: new Vector3(0.82, 0.72, 0.33),
    [Types.bug]: new Vector3(0.76, 0.82, 0.25),
    [Types.ghost]: new Vector3(0.54, 0.44, 0.69),
    [Types.steel]: new Vector3(0.76, 0.76, 0.86),
    [Types.fire]: new Vector3(1, 0.59, 0.3),
    [Types.water]: new Vector3(0.47, 0.63, 1),
    [Types.grass]: new Vector3(0.56, 0.86, 0.4),
    [Types.electric]: new Vector3(1, 0.87, 0.31),
    [Types.psychic]: new Vector3(0.99, 0.44, 0.6),
    [Types.ice]: new Vector3(0.6, 0.85, 0.85),
    [Types.dragon]: new Vector3(0.44, 0.22, 0.98),
    [Types.fairy]: new Vector3(0.98, 0.64, 0.72),
    [Types.unkown]: new Vector3(0.69, 0.73, 0.72),
    [Types.dark]: new Vector3(0.56, 0.47, 0.4),
  },
};
