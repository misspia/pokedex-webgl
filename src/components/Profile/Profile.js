import * as THREE from 'three';
import { gql } from 'apollo-boost';
import { client } from '../../apollo';

export const PROFILE_NAME = 'profile';

export default class Profile {
  constructor() {
    this.id = 0;
    this.isActive = false;

    this.material = new THREE.MeshBasicMaterial({
      color: 0xaaaaff,
      side: THREE.DoubleSide,
    });
    this.geometry = new THREE.PlaneGeometry(50, 28);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.name = PROFILE_NAME;
    this.setPosition(0, 0, -35);
    this.hide();
  }
  
  hide() {
    this.isActive = false;

    const hideenScale = 0.000001;
    this.mesh.scale.set(hideenScale, hideenScale, hideenScale);
  }
  reveal() {
    this.isActive = true;
    this.mesh.scale.set(1, 1, 1);
    
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
  async activate(id) {
    this.reveal();
    this.update(id);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
}
