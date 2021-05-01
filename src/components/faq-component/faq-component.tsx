import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'faq-component',
  styleUrl: 'faq-component.css',
  shadow: true,
})
export class FaqComponent {

  render() {
    return (
      <Host>
        <div class="faq-card">
          <div class="heading">
            <div>
              Text
            </div>
          </div>
          <div class="body">
            <p class="answer">blabla</p>
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }

}
