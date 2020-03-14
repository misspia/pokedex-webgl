import { library } from '@fortawesome/fontawesome-svg-core';
import * as fas from '@fortawesome/free-solid-svg-icons';

library.add(
  fas.faTimes,
  fas.faPlus,
);

export default {
  close: fas.faTimes,
  plus: fas.faPlus,
}
