import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'datepicker-component',
  styleUrl: 'datepicker-component.css',
  shadow: true,
})
export class DatepickerComponent {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
