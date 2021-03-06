import * as THREE from 'three';

import { calcCircumference } from '../utils';
import EntryCard from './EntryCard';
import { WebglEvents } from '../constants/events';
import { TOTAL_ENTRIES, CAROUSEL_RADIUS } from '../constants/entries';
import CardBack from './CardBack';

const NUM_COLS = Math.ceil(Math.sqrt(TOTAL_ENTRIES));
const NUM_ROWS = Math.ceil(TOTAL_ENTRIES / NUM_COLS);

const CIRCUMFERENCE = calcCircumference(CAROUSEL_RADIUS);
const GRID_WIDTH = CIRCUMFERENCE / NUM_COLS;
const ENTRY_WIDTH = GRID_WIDTH * 0.8;
const ENTRY_HEIGHT = ENTRY_WIDTH * 1.33;
const ENTRY_PADDING = GRID_WIDTH - ENTRY_WIDTH;
const GRID_HEIGHT = ENTRY_HEIGHT + ENTRY_PADDING;

const TOTAL_WIDTH = GRID_WIDTH * NUM_COLS;
const TOTAL_HEIGHT = GRID_HEIGHT * NUM_ROWS;


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
    this.bbox = new THREE.Box3();

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

  getCenter(vector) {
    return this.bbox.getCenter(vector);
  }

  get min() {
    return this.bbox.min;
  }

  get max() {
    return this.bbox.max;
  }

  get children() {
    return this.pivot.children;
  }

  load(list) {
    list.splice(TOTAL_ENTRIES);

    const cardBack = new CardBack({
      width: ENTRY_WIDTH,
      height: ENTRY_HEIGHT,
    });
    list.forEach(({ id, name, spriteUrl, types }, index) => {
      const cardParams = {
        id,
        name,
        spriteUrl,
        types,
        width: ENTRY_WIDTH,
        height: ENTRY_HEIGHT,
        backMesh: cardBack.clone(),
      };
      const card = new EntryCard(cardParams);

      const pos = this.calcListItemPosition(index);
      card.setPosition(pos.x, card.restingYPos, pos.z);
      card.rotation.x = Math.PI / 2;

      this.pivot.add(card.pivot);
      this.cards.push(card);
    });

    this.bbox.setFromObject(this.pivot);
    this.minY = this.min.y - ENTRY_PADDING;
    this.maxY = this.max.y;
    this.midY = (this.min.y + this.max.y) / 2;
  }

  calcListItemPosition(index) {
    const col = index % NUM_COLS;
    const row = Math.floor(index / NUM_COLS);

    return {
      x:  0 - (col * GRID_WIDTH - TOTAL_WIDTH / 2),
      y: 2,
      z: 0 - (row * GRID_HEIGHT - TOTAL_HEIGHT / 2),
    }
  }


  getEntryCardById(id) {
    return this.cards.find((entry) => entry.id === id);
  }

  setVisible(isVisible = true) {
    this.pivot.visible = isVisible;
  }

  isInXBounds(x) {
    return x >= this.min.x && x <= this.max.x;
  }

  isInZBounds(z) {
    return z >= this.min.z && z <= this.max.z;
  }

  update() {}
}

