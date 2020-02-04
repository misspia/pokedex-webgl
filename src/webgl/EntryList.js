import * as THREE from 'three';

import { toRadians } from '../utils';
import EntryListItem from './EntryListItem';

const ENTRIES_PER_ROW = 12;
const ENTRY_WIDTH = 6;
const ENTRY_HEIGHT = 9;

const ENTRY_PADDING = 3;
const GRID_WIDTH = ENTRY_WIDTH + ENTRY_PADDING;
const GRID_HEIGHT = ENTRY_HEIGHT + ENTRY_PADDING;


export default class EntryList {
  constructor(list, ) {
    this.entries = [];
    this.numEntriesLoaded = 0;

    this.mesh = new THREE.Group();
    this.bbox = new THREE.Box3();
    this.bounds = {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
    }

    this.createList(list);
  }
  createList(list) {
    list.splice(30);
    let x = 0;
    let z = 0;

    list.forEach(({ id, name, spriteUrl }, index) => {
      const entry = new EntryListItem({
        id,
        name,
        spriteUrl,
        width: ENTRY_WIDTH,
        height: ENTRY_HEIGHT,
      });

      x -= GRID_WIDTH;
      if (index % ENTRIES_PER_ROW === 0) {
        z -= GRID_HEIGHT;
        x = 0;
      }
      entry.setPosition(x, 0, z);
      entry.setRotation(toRadians(90), 0, 0);

      this.mesh.add(entry.mesh);
      this.entries.push(entry);
    })
  }
  getCenter() {
    return this.bbox.setFromObject(this.mesh).getCenter(this.mesh.position).multiplyScalar(-1);
  }

  calcBounds() {
    this.bounds = {
      minX: this.bbox.min.x,
      maxX: this.bbox.max.x,
      minZ: this.bbox.min.y,
      maxZ: this.bbox.max.y,
    }
  }

  selectEntry(id) {
    const entry = this.entries.find(item => item.id === id);
    entry.setActiveState(true);
  }
}

