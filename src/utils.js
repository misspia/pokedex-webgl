export const fullCircleRadians = 2 * Math.PI;

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


