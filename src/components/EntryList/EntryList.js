import * as THREE from 'three';

import { fullCircleRadians } from '../../utils';
import EntryListItem from '../EntryListItem/EntryListItem';

export default class EntryList {
  constructor(list, setLoadingComplete) {
    this.entries = [];
    this.numEntriesLoaded = 0;
    this.setLoadingComplete = setLoadingComplete;

    this.mesh = new THREE.Group();
    this.centerCoord = new THREE.Vector3(0, 0, 0);
    this.radius = 30;
    this.circumference = 2 * Math.PI * this.radius;
    this.totalPokemon = 0;
    this.numRows = 3;
    this.entriesPerRow = 0;

    this.createList(list);
  }
  createList(list) {
    list.splice(1);
    this.totalPokemon = list.length;
    this.entriesPerRow = this.totalPokemon / this.numRows;

    list.forEach(({ id, name, spriteUrl }, index) => {
      const entry = new EntryListItem({
        id,
        name,
        spriteUrl,
        onLoadComplete: () => this.markEntryLoaded(),
      });

      const { x: tx, y: ty, z: tz } = this.getListItemPosition(index);
      entry.setPosition(tx, ty, tz);

      const { x: rx, y: ry, z: rz } = this.getListItemRotation(index);
      entry.setRotation(rx, ry, rz);

      this.mesh.add(entry.mesh);
      this.entries.push(entry);
    })
  }
  getListItemPosition(index) {
    const angleIncrement = fullCircleRadians / this.entriesPerRow;
    const rowHeight = 6;
    const verticalOffset = -Math.floor(index / this.entriesPerRow) * rowHeight;
    const coord = this.getPointOnCircle(angleIncrement * index, verticalOffset);
    return coord;
  }
  getPointOnCircle(radians, verticalOffset) {
    return {
      x: this.radius * Math.cos(radians) + this.centerCoord.x,
      y: this.centerCoord.y + verticalOffset,
      z: this.radius * Math.sin(radians) + this.centerCoord.z,
    }
  }
  getListItemRotation(index) {
    const angleIncrement = fullCircleRadians / this.entriesPerRow;
    const angleOffset = Math.PI / 2;
    const angle = -angleIncrement * index;
    return {
      x: 0,
      y: angleOffset + angle,
      z: 0,
    };
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

