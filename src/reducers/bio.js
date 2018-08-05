/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  RECEIVE_BIO,
  ADD_BOX,
} from '../actions/bio.js';
import { createSelector } from 'reselect';

const bio = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_BIO:
      return {
        ...state,
        ...action.bio
      };
    case ADD_BOX:
      const boxes = state.boxes.slice(0);
      boxes.push(action.box);
      return Object.assign({}, state, { boxes: boxes });
    default:
      return state;
  }
}

export default bio;

const bioSelector = state => state.bio;

const categoryNameSelector = state => state.app.categoryName;

export const currentCategorySelector = createSelector(
  bioSelector,
  categoryNameSelector,
  (bio, categoryName) => (bio && categoryName ? bio[categoryName] : null)
);

const itemNameSelector = state => state.app.itemName;

export const currentItemSelector = createSelector(
  currentCategorySelector,
  itemNameSelector,
  (category, itemName) => (category && category.items && itemName ? category.items[itemName] : null)
);
