import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'flip-card',
  styleUrl: 'flip-card.css',
  shadow: true,
})
export class FlipCard {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
