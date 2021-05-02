import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'button-up',
  styleUrl: 'button-up.css',
  shadow: true,
})

export class ButtomUp {

  @Prop() name: string;

  render() {
    return (
      <Host>
        <div class="button">
          <button>{this.name}</button>
        </div>
      </Host>
    );
  }

}
