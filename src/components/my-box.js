/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';

// These are the elements needed by this element.
// import { plusIcon, minusIcon } from './my-icons.js';


import '@polymer/app-layout/app-box/app-box.js';
import '@polymer/app-layout/app-scroll-effects/effects/parallax-background.js';
import './shop-image';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class MyBox extends LitElement {
  _render(props) {
    return html`
      <style>

        :host {
          --my-image-position: 'center center';
        }
        
        .appbox {
          height: 500px;
        }

        /*https://jsfiddle.net/oneeezy/b78c7qwa/*/
        --app-box-background-front-layer: {
          /*background-position: center bottom;
          background-size: cover;
          background-repeat: no-repeat;*/
          padding-bottom: 120px;
          margin-top: -20px;
          height: 100%;
        };

        /*style="width: 100%; height: 640px; background-position: bottom;" */
        .bg {
          /* Set rules to fill background */
          /*min-height: 100%;
          min-width: 1024px;*/

          /* Set up proportionate scaling */
          width: 100%;
          height: 640px;

          /* Set up positioning */
          /*position: absolute;
          top: 0;
          left: 0;*/
        }

        iron-image.specialposition::content #sizedImgDiv, iron-image.specialposition::content #placeholder  {
          /*http://stackoverflow.com/questions/31671084/stretch-image-in-iron-image-element*/
          background-position: var(--my-image-position) !important;
        }      
        
        section {
          padding-top: 148px;
        }
        
        article {
          font-weight: 100;
          width: 70%;
          max-width: 70%;
          text-align: center;
          margin: 0 auto 100px auto;
        }

        @media (max-width: 760px) {
          article {
            width: 100%;
            max-width: 100%;
          }
        }      

        article h2 {
          font-weight: 100;
          font-size: 50px;
          margin: 5px;
        }
        
        article p {
          font-size: 18px;
          line-height: 30px;
          margin: 0 5px;
        }
        
        article hr {
          width: 100px;
          height: 1px;
          border: none;
          margin: 20px auto;
          background-color: black;
        }
      </style>

      <section id="${this.box.menu}">
        <article>
          <!--<hr />-->
          <h2>${this.box.titulo}</h2>
          <p>${this.box.texto}</p>

        </article>
        <app-box class="appbox first" effects="parallax-background">
          <!--<img background src="../images/ancient-1807518_1920.jpg" style="height: 100%; width: 1920px; background-position: bottom;">
            1. gimp: height=640px | export as jpeg quality 80%
            2. gimp: width=192px | gaussian blur 5px | jpeg 50%
            3. online create base64 and paste here (http://base64image.org/)
          -->

          <shop-image 
            id="imagem" 
            class="bg specialposition" background            
            sizing="cover" 
            preload fade
            src="${this.box.imagePath}" 
            alt="${this.box.titulo}"
            placeholder="${this.box.base64}"
          ></shop-image>

        </app-box>
      </section>

      `;
  }

  static get properties() {
    return {
      box: {
        type: Object,
        notify: true,
      },
      imagePath: {
        computed: '_computeImagePath(box)',
      },
    }
  };

  constructor() {
    super();
    this.clicks = 0;
    this.value = 0;
  }

  // _firstRendered() {
  //   const { imagemPos } = this.box;
  //   if (imagemPos) {
  //     this.customStyle['--my-image-position'] = imagemPos;
  //     this.updateStyles();
  //   }
  // }

  _computeImagePath(box) {
    console.log('box:', box)
    // https://github.com/PolymerElements/iron-image/issues/39
    return 'src/images/' + box.imagem + '.jpg';
  }


  _onIncrement() {
    this.value++;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-incremented'));
  }

  _onDecrement() {
    this.value--;
    this.clicks++;
    this.dispatchEvent(new CustomEvent('counter-decremented'));
  }
}

window.customElements.define('my-box', MyBox);
