import * as THREE from 'three';
import { gql } from 'apollo-boost';
import { client } from '../../apollo';

import ProfileImage from '../ProfileImage/ProfileImage';

export const PROFILE_NAME = 'profile';

export default class Profile {
  constructor() {
    this.id = 0;

    
    this.background = this.createBackground();
    this.profileImage = {};

    this.mesh = new THREE.Group();
    this.mesh.name = PROFILE_NAME;
    this.setPosition(0, 0, -35);

    this.mesh.add(this.background);

    this.hide();
  }
  
  hide() {
    this.mesh.visible = false;
  }
  reveal() {
    this.mesh.visible = true;
    
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
    this.createProfileImage(pokemon.artworkUrl);

    console.log('[update profile]', pokemon);
  }
  async activate(id) {
    this.reveal();
    this.update(id);
  }
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }


  createBackground() {
    const geometry = new THREE.PlaneGeometry(50, 28);
    const material = new THREE.MeshBasicMaterial({
      color: 0xaaaaff,
      side: THREE.DoubleSide,
    });

    return new THREE.Mesh(geometry, material);
  }
  createProfileImage(spriteUrl) {
    this.profileImage = new ProfileImage({
      spriteUrl,
    });

    this.profileImage.setPosition(0, 0, -1);
    this.mesh.add(this.profileImage.mesh);
  }
}
