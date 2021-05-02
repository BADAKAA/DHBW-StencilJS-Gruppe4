import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'button-up',
  styleUrl: 'button-up.css',
  shadow: true,
})

export class ButtomUp {

  render() {
    return (
      <Host>
        <div class="button">
          <button>Hallo</button>
        </div>
      </Host>
    );
  }

}
