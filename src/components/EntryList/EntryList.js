import * as THREE from 'three';
import { gql } from 'apollo-boost';

import { client } from '../../apollo';
import EntryListItem from '../EntryListItem/EntryListItem';


export default class EntryList {
  constructor() {
    this.mesh = new THREE.Group();

    this.createList();
  }
  async createList() {
    const list = await this.fetchAllPokemon();
    // list.forEach({ id, name, spriteUrl }) => {
    //   const entry = new EntryListItem({ id, name, spriteUrl });
    //   this.mesh.add()
    // });
    list.forEach(({ id, name, spriteUrl }) => {
      const entry = new EntryListItem({ id, name, spriteUrl });
      this.mesh.add(entry.mesh);
    })
    console.log(list)
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
}
