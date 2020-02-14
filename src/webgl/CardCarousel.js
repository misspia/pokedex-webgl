import * as THREE from 'three';

import { fullCircleRadians, calcCircumference } from '../utils';
import EntryCard from './EntryCard';

const RADIUS = 40;
const ENTRY_WIDTH = 6;
const ENTRY_HEIGHT = 9;

const ENTRY_PADDING = 3;
const GRID_WIDTH = ENTRY_WIDTH + ENTRY_PADDING;
const GRID_HEIGHT = Math.floor(ENTRY_HEIGHT + ENTRY_PADDING);
const ENTRIES_PER_ROW = calcCircumference(RADIUS) / GRID_WIDTH;

const ANGLE_INCREMENT = fullCircleRadians / ENTRIES_PER_ROW;

const ROTATION_VELOCITY = 0.001;

export default class EntryList {
  constructor() {
    this.entries = [];
    this.numEntriesLoaded = 0;
    this.centerCoord = new THREE.Vector3();

    this.mesh = new THREE.Group();
  }
  load(list) {
    this.createList(list);
  }

  createList(list) {
    list.splice(20);

    list.forEach(({ id, name, spriteUrl }, index) => {
      const entry = new EntryCard({
        id,
        name,
        spriteUrl,
        width: ENTRY_WIDTH,
        height: ENTRY_HEIGHT,
      });

      const { x: tx, y: ty, z: tz } = this.calcListItemPosition(index);
      entry.setPosition(tx, ty, tz);

      const { x: rx, y: ry, z: rz } = this.calcListItemRotation(index);
      entry.setRotation(rx, ry, rz);

      this.mesh.add(entry.mesh);
      this.entries.push(entry);
    })
  }

  calcListItemPosition(index) {

    const angle = ANGLE_INCREMENT * index;
    const verticalOffset = -Math.floor(index / ENTRIES_PER_ROW) * GRID_HEIGHT;
    return {
      x: RADIUS * Math.cos(angle) + this.centerCoord.x,
      y: this.centerCoord.y + verticalOffset,
      z: RADIUS * Math.sin(angle) + this.centerCoord.z,
    }
  }

  calcListItemRotation(index) {
    const ANGLE_INCREMENT = fullCircleRadians / ENTRIES_PER_ROW;
    const angleOffset = Math.PI / 2;
    const angle = -ANGLE_INCREMENT * index;
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

  update(isRotating) {
    if (isRotating) {
      this.mesh.rotation.y += ROTATION_VELOCITY;
    }
  }
}

