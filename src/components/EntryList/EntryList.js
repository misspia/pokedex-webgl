import * as THREE from 'three';
import { gql } from 'apollo-boost';

import { client } from '../../apollo';
import { fullCircleRadians, toRadians } from '../../utils';
import EntryListItem from '../EntryListItem/EntryListItem';


export default class EntryList {
  constructor() {
    this.mesh = new THREE.Group();
    this.centerCoord = new THREE.Vector3(0, 0, 0);
    this.radius = 30;
    this.circumference = 2 * Math.PI * this.radius; 
    this.totalPokemon = 0;

    this.createList();
  }
  async createList() {
    const list = await this.fetchAllPokemon();
    list.splice(20);
    this.totalPokemon = list.length;

    list.forEach(({ id, name, spriteUrl }, index) => {
      const entry = new EntryListItem({ id, name, spriteUrl });

      const { x: tx, y: ty, z: tz } = this.getListItemPosition(index);
      entry.setPosition(tx, ty, tz);

      const { x: rx, y: ry, z: rz } = this.getListItemRotation(index);
      entry.setRotation(rx, ry, rz);

      this.mesh.add(entry.mesh);
    })
  }
  async fetchAllPokemon() {
    return await client.query({
      query: gql`
        {
          GetAllPokemon {
            id
            name
            spriteUrl
          }
        }
      `,
    })
      .then(result => {
        return result.data.GetAllPokemon;
      })
      .catch(err => {
        console.log(err);
        return [];
      });
  }
  getListItemPosition(index) {
    const angleIncrement = fullCircleRadians / this.totalPokemon;
    const coord = this.getPointOnCircle(angleIncrement * index)
    return coord;
  }
  getPointOnCircle(radians) {
    return {
      x: this.radius * Math.cos(radians) + this.centerCoord.x,
      y: this.centerCoord.y,
      z: this.radius * Math.sin(radians) + this.centerCoord.z,
    }
  }
  getListItemRotation(index) {
    const angleIncrement = fullCircleRadians / this.totalPokemon;
    const angleOffset = Math.PI / 2;
    const angle = -angleIncrement * index;
    return {
      x: 0,
      y: angleOffset + angle,
      z: 0,
    };
  }
}
