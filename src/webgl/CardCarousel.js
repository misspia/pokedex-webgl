import * as THREE from 'three';

import { fullCircleRadians, calcCircumference } from '../utils';
import EntryCard from './EntryCard';
import { WebglEvents } from '../constants/events';
import { TOTAL_ENTRIES } from '../constants/entries';

export const RADIUS = 40;
const NUM_ROWS = 3;
const ENTRIES_PER_ROW = Math.ceil(TOTAL_ENTRIES / NUM_ROWS);

const CIRCUMFERENCE = calcCircumference(RADIUS);
const GRID_WIDTH = CIRCUMFERENCE / ENTRIES_PER_ROW;
const ENTRY_WIDTH = GRID_WIDTH * 0.8;
const ENTRY_HEIGHT = ENTRY_WIDTH * 1.33;
const ENTRY_PADDING = GRID_WIDTH - ENTRY_WIDTH;
const GRID_HEIGHT = ENTRY_HEIGHT + ENTRY_PADDING;

const ANGLE_INCREMENT = fullCircleRadians / ENTRIES_PER_ROW;

const ROTATION_VELOCITY = 0.002;

export default class CardCarousel {
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
    this.cards = [];
    this.centerCoord = new THREE.Vector3();

    this.minY = 0;
    this.maxY = 0;
    this.midY = 0;

    this.isRotating = false;

    this.pivot = new THREE.Group();

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

  get center() {
    return new THREE.Vector3(0, this.midY, 0);
  }

  load(list, anisotropy) {
    list.splice(TOTAL_ENTRIES);

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
      const card = new EntryCard(cardParams);

      const { x: tx, y: ty, z: tz } = this.calcListItemPosition(index);
      card.setPosition(tx, ty, tz);

      const { x: rx, y: ry, z: rz } = this.calcListItemRotation(index);
      card.setRotation(rx, ry, rz);

      this.pivot.add(card.pivot);
      this.cards.push(card);
    });

    const bbox = new THREE.Box3().setFromObject(this.pivot)
    this.minY = bbox.min.y - ENTRY_PADDING;
    this.maxY = bbox.max.y;
    this.midY = (bbox.min.y + bbox.max.y) / 2;
  }

  calcListItemPosition(index) {
    const centerCoord = this.pivot.position;
    const angle = ANGLE_INCREMENT * index;
    const verticalOffset = -Math.floor(index / ENTRIES_PER_ROW) * GRID_HEIGHT;
    return {
      x: RADIUS * Math.cos(angle) + centerCoord.x,
      y: centerCoord.y + verticalOffset,
      z: RADIUS * Math.sin(angle) + centerCoord.z,
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

  setVisible(isVisible = true) {
    this.pivot.visible = isVisible;
  }

  update() {
    if (this.isRotating) {
      this.pivot.rotation.y += ROTATION_VELOCITY;
    }
  }
}

