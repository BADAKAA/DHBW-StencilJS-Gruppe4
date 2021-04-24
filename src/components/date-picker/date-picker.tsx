import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})
export class DatePicker {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
