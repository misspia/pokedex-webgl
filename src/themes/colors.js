import { Vector3 } from 'three';

export default {
  white: '#fff',
  whiteTranslucent: 'rgba(255,255,255, 0.5)',
  whiteOverlayBackground: 'rgba(255,255,255, 0.7)',
  black: '#000',
  blueTranslucent: 'rgba(200, 200, 255, 0.7)',
  blue: 'rgba(200, 200, 255, 1.0)',
  shadow: 'rgba(0, 0, 0, 0.2)',


  /**
   * types
   */
  types: {
    normal: '#b9bb8a',
    fighting: '#d34940',
    flying: '#b39dfa',
    poison: '#bb5cbb',
    ground: '#efd178',
    rock: '#d2b854',
    bug: '#c2d23f',
    ghost: '#8a70b0',
    steel: '#c2c2db',
    fire: '#fe964d',
    water: '#77a1fd',
    grass: '#8edc67',
    electric: '#ffdd50',
    psychic: '#fc7199',
    ice: '#9ad8d9',
    dragon: '#7038f9',
    fairy: '#f8a4b7',
    unkown: '#b0bdb9',
    dark: '#8e7865',
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
    normal: new Vector3(0.73, 0.73, 0.54),
    fighting: new Vector3(211, 73, 64),
    flying: new Vector3(179, 157, 250),
    poison: new Vector3(187, 92, 187),
    ground: new Vector3(239, 209, 120),
    rock: new Vector3(210, 184, 84),
    bug: new Vector3(194, 210, 63),
    ghost: new Vector3(138, 112, 176),
    steel: new Vector3(194, 194, 219),
    fire: new Vector3(1, 0.59, 0.3),
    water: new Vector3(0.47, 0.63, 1),
    grass: new Vector3(142, 220, 103),
    electric: new Vector3(1, 221, 80),
    psychic: new Vector3(252, 113, 153),
    ice: new Vector3(154, 216, 217),
    dragon: new Vector3(112, 56, 249),
    fairy: new Vector3(248, 164, 183),
    unkown: new Vector3(176, 189, 185),
    dark: new Vector3(142, 120, 101),
  },
};
