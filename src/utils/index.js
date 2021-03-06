export const fullCircleRadians = 2 * Math.PI;

export const calcCircumference = (radius) => (
  2 * Math.PI * radius
);

export const toRadians = (degrees) => (
  degrees * Math.PI / 180
);

export const normalizeCoordinates = (x, y, canvasWidth, canvasHeight) => ({
  x: (x / canvasWidth) * 2 - 1,
  y: - (y / canvasHeight) * 2 + 1,
});

export const isAllImagesLoaded = (images) => {

};

const NATIONAL_NO_NUM_DIGITS = 3;
export const formatNationalNo = (id) => (
  id.toString().padStart(NATIONAL_NO_NUM_DIGITS, '0')
);

export const clone = (object) => ( // arr or object
  Array.isArray(object) ? [...object] : { ...object }
);

export const clamp = (value, min, max) => (
  Math.min(Math.max(value, min), max)
);

export const remap = (min1, max1, min2, max2, value) => (
  min2 + (max2 - min2) * (value - min1) / (max1 - min1)
);

export const randomFloatBetween = (min, max) => (
  Math.random() * (max - min) + min
);
