import { Component, Host, h, Prop } from '@stencil/core';
let componentElement:ShadowRoot;

@Component({
  tag: 'cookie-banner',
  styleUrl: 'cookie-banner.css',
  shadow: true,
})
export class CookieBanner {

  @Prop() heading:string;
  @Prop() bannertext:string;

  render() {
    return (
      <Host>
        <div class="container">
          <p>{this.heading && <p>{this.heading}</p>}</p>
          <p>{this.bannertext && <p>{this.bannertext}</p>}</p>
        </div>
        <slot></slot>
      </Host>
    );
  }
  componentDidLoad() {
    initializeSlider()
  }
}

function initializeSlider() {
  defineObjectReferences();
}

function defineObjectReferences() {
  componentElement =  document.querySelector("cookie-banner").shadowRoot;

}