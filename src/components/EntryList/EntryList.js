import * as THREE from 'three';

import { toRadians } from '../../utils';
import EntryListItem from '../EntryListItem/EntryListItem';

const ENTRIES_PER_ROW = 12;
const ENTRY_WIDTH = 6;
const ENTRY_HEIGHT = 9;

const ENTRY_PADDING = 3;
const GRID_WIDTH = ENTRY_WIDTH + ENTRY_PADDING;
const GRID_HEIGHT = ENTRY_HEIGHT + ENTRY_PADDING;


export default class EntryList {
  constructor(list, setLoadingComplete) {
    this.entries = [];
    this.numEntriesLoaded = 0;
    this.setLoadingComplete = setLoadingComplete;

    this.mesh = new THREE.Group();

    this.createList(list);
  }
  createList(list) {
    list.splice(151);
    let x = 0;
    let z = 0;

    list.forEach(({ id, name, spriteUrl }, index) => {
      const entry = new EntryListItem({
        id,
        name,
        spriteUrl,
        onLoadComplete: () => this.markEntryLoaded(),
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
    const box = new THREE.Box3().setFromObject(this.mesh).getCenter(this.mesh.position).multiplyScalar(- 1);
    return box;
  }

  selectEntry(id) {
    const entry = this.entries.find(item => item.id === id);
    entry.setActiveState(true);
  }
  markEntryLoaded() {
    this.numEntriesLoaded++;

    if (this.numEntriesLoaded === this.entries.length) {
      this.setLoadingComplete();
    }
  }
}

