/** global: localStorage */

import { Random } from 'meteor/random';

const annonLocation = 'annonId';

export default {
  annonId() {
    if (localStorage.annonId) {
      return localStorage.getItem(annonLocation);
    }
    const annonId = Random.id();
    localStorage.setItem(annonLocation, annonId);
    return annonId;
  },
};
