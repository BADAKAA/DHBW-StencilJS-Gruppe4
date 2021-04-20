import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'image-slider',
  styleUrl: 'image-slider.css',
  shadow: true,
})
export class ImageSlider {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
