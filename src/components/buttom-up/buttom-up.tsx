import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'buttom-up',
  styleUrl: 'buttom-up.css',
  shadow: true,
})
export class ButtomUp {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
