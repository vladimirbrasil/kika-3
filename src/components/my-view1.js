/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// We are lazy loading its reducer.
import bio from '../reducers/bio.js';
store.addReducers({
  bio
});


// These are the actions needed by this element.
import {
  addBox,
} from '../actions/bio.js';

import './my-box.js';


// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import { } from '@polymer/polymer/lib/elements/dom-repeat.js';

class MyView1 extends connect(store)(PageViewElement) {
  _render(props) {
    return html`
     ${ SharedStyles}
    <dom-repeat items=${this._boxes}>
      <template>
        <my-box box="[[item]]"></my-box>
      </template>
    </dom-repeat>
    
    <section>
      <h2>Static page</h2>
      <p>This is a text-only page.</p>
      <p>It doesn't do anything other than display some static text.</p>
    </section>
    <section>
      <h2>Welcome</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac nisi orci. Maecenas sollicitudin diam in diam efficitur
        cursus. Morbi sollicitudin in justo tincidunt placerat. Integer tincidunt elementum nisi, eu ornare dolor lacinia eget.
        Fusce pulvinar massa eget odio placerat, commodo molestie ipsum tempus. Class aptent taciti sociosqu ad litora torquent
        per conubia nostra, per inceptos himenaeos. Suspendisse porttitor id purus eu cursus. Suspendisse arcu nulla, mattis
        vel hendrerit et, malesuada a elit. Nam at diam ornare, aliquet est sed, malesuada metus. Cras nec enim vel nibh tincidunt
        euismod ut et enim. Etiam pharetra eros in sodales iaculis. Duis sagittis urna et cursus mollis. Cras tempor rutrum est.
        Praesent sollicitudin ligula at laoreet placerat. Praesent tortor dui, semper in sapien non, pharetra luctus turpis.</p>
    </section>
    <section>
      <p>Vestibulum at est ex. Aenean id ligula id nibh dictum laoreet. Etiam non semper erat. Pellentesque eu justo rhoncus diam
        vulputate facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat metus ex, vel fringilla
        massa tincidunt sit amet. Nunc facilisis bibendum tristique. Mauris commodo, dolor vitae dapibus fermentum, odio nibh
        viverra lorem, eu cursus diam turpis et sapien. Nunc suscipit tortor a ligula tincidunt, id hendrerit tellus sollicitudin.</p>
    </section>n > n >
        `;
  }

  static get properties() {
    return {
      _boxes: Array,
      // _sections: {
      //   type: Array,
      //   computed: '_computeSections(_boxes)',
      // },
    }
  }

  _stateChanged(state) {
    this._boxes = state.bio.boxes;
  }

  // _jsonStringify(s) {
  //   return JSON.stringify(s);
  // }

  // detectIsLastBox(index) {
  //   // http://stackoverflow.com/questions/32364695/polymer-determine-the-last-item-on-dom-repeat-items
  //   if (this.boxes.length - 1 === index) { return true; }
  //   else { return false; }
  // }

  // // Get sections from boxes 
  // _computeSections(_boxes) {
  //   return _boxes.map(box => box.menu).filter(x => x);
  // }
}

window.customElements.define('my-view1', MyView1);
