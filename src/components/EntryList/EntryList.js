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
    console.log('cicumference', this.circumference)
    this.totalPokemon = 0;

    this.createList();
  }
  async createList() {
    const list = await this.fetchAllPokemon();
    list.splice(10);
    this.totalPokemon = list.length;

    list.forEach(({ id, name, spriteUrl }, index) => {
      const entry = new EntryListItem({ id, name, spriteUrl });

      const { x, y, z } = this.getListItemPosition(index);
      entry.setPosition(x, y, z);

      this.mesh.add(entry.mesh);
    })
    console.log(this.circumference / this.totalPokemon)
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
}
