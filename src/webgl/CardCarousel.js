import * as THREE from 'three';

import { fullCircleRadians, calcCircumference } from '../utils';
import EntryCard from './EntryCard';
import WebglEvents from '../constants/webglEvents';

export const RADIUS = 40;
const ENTRY_WIDTH = 6;
const ENTRY_HEIGHT = 9;

const ENTRY_PADDING = 3;
const GRID_WIDTH = ENTRY_WIDTH + ENTRY_PADDING;
const GRID_HEIGHT = Math.floor(ENTRY_HEIGHT + ENTRY_PADDING);
const ENTRIES_PER_ROW = calcCircumference(RADIUS) / GRID_WIDTH;

const ANGLE_INCREMENT = fullCircleRadians / ENTRIES_PER_ROW;

const ROTATION_VELOCITY = 0.001;

export default class CardCarousel {
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
    this.cards = [];
    this.centerCoord = new THREE.Vector3();
    this.isRotating = false;

    this.mesh = new THREE.Group();


    this.eventDispatcher.addEventListener(
      WebglEvents.CARD_CLICK,
      (e) => {
        this.isRotating = false;
      }
    );

    this.eventDispatcher.addEventListener(
      WebglEvents.DEACTIVATE_ENTRY_COMPLETE,
      (e) => {
        this.isRotating = true;
      }
    );

  }

  load(list, anisotropy) {
    list.splice(251);

    list.forEach(({ id, name, spriteUrl, types }, index) => {
      const cardParams = {
        id,
        name,
        spriteUrl,
        types,
        anisotropy,
        width: ENTRY_WIDTH,
        height: ENTRY_HEIGHT,
      };
      const entry = new EntryCard(cardParams);

      const { x: tx, y: ty, z: tz } = this.calcListItemPosition(index);
      entry.setPosition(tx, ty, tz);

      const { x: rx, y: ry, z: rz } = this.calcListItemRotation(index);
      entry.setRotation(rx, ry, rz);

      this.mesh.add(entry.mesh);
      this.cards.push(entry);
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

  getEntryCardById(id) {
    return this.cards.find((entry) => entry.id === id);
  }

  update() {
    if (this.isRotating) {
      this.mesh.rotation.y += ROTATION_VELOCITY;
    }
  }
}

