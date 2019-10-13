import * as THREE from 'three';
import { gql } from 'apollo-boost';
import { client } from '../../apollo';

export default class Profile {
  constructor() {
    this.id = 0;
    this.isActive = false;

    this.material = new THREE.MeshBasicMaterial({
      color: 0xffeeee,
    });
    this.geometry = new THREE.PlaneGeometry(5, 5, 5);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
  
  hide() {
    this.isActive = false;
  }
  reveal() {
    this.isActive = true;
  }

  setId(id) {
    this.id = id;
  }

  async fetchPokemonById() {
    return await client.query({
      query: gql`
        {
          GetPokemonById(id: ${this.id}) {
            id
            name
            chainId
            types
            height
            weight
            baseExperience
            abilities
            stats {
              key
              value
            }
            artworkUrl
          }
        }
      `
    })
    .then(result => (
      result.data.GetPokemonById
    ))
    .catch(err => {
      console.log(err);
      return {};
    })
  }
  async update(id) {
    this.setId(id);
    const pokemon = await this.fetchPokemonById();
    console.log('[update profile]', pokemon);
  }
}
