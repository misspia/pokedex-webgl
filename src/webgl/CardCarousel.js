import * as THREE from 'three';

import { fullCircleRadians, calcCircumference } from '../utils';
import EntryCard from './EntryCard';
import { WebglEvents } from '../constants/events';

export const RADIUS = 40;
const ENTRY_WIDTH = 6;
const ENTRY_HEIGHT = 9;

const ENTRY_PADDING = 3;
const GRID_WIDTH = ENTRY_WIDTH + ENTRY_PADDING;
const GRID_HEIGHT = Math.floor(ENTRY_HEIGHT + ENTRY_PADDING);
const ENTRIES_PER_ROW = calcCircumference(RADIUS) / GRID_WIDTH;

const ANGLE_INCREMENT = fullCircleRadians / ENTRIES_PER_ROW;

const ROTATION_VELOCITY = 0.001;
const CYCLE_VELOCITY = 0.1;

export default class CardCarousel {
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
    this.cards = [];
    this.centerCoord = new THREE.Vector3();

    this.minY = 0;
    this.maxY = 0;
    this.midY = 0;

    this.isRotating = false;
    this.isCycling = false;

    this.pivot = new THREE.Group();

    this.eventDispatcher.addEventListener(
      WebglEvents.CARD_CLICK,
      (e) => {
        this.isRotating = false;
        this.isCycling = false;
      }
    );

    this.eventDispatcher.addEventListener(
      WebglEvents.DEACTIVATE_ENTRY_COMPLETE,
      (e) => {
        this.isRotating = true;
        this.isCycling = true;
      }
    );
  }

  // get minY() {
  //   const bbox = new THREE.Box3().setFromObject(this.pivot)
  //   return bbox.min.y;
  // }

  // get maxY() {
  //   const bbox = new THREE.Box3().setFromObject(this.pivot)
  //   return bbox.max.y
  // }

  // get midY() {
  //   const bbox = new THREE.Box3().setFromObject(this.pivot)
  //   return (bbox.min.y + bbox.max.y) / 2;
  // }

  get center() {
    return new THREE.Vector3(0, this.midY, 0);
  }

  load(list, anisotropy) {
    list.splice(251);
    // list.splice(50);

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
    if (this.isCycling) {
      this.cards.forEach(card => {
        if (card.positionY > this.maxY) {
          card.positionY = this.minY;
        } else {
          card.positionY = card.positionY + CYCLE_VELOCITY;
        }
      });
    }
  }
}

