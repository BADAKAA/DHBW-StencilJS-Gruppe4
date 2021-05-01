import { Component, Host, h } from '@stencil/core';
let componentElement:ShadowRoot;
let faqCard:HTMLDivElement;
let heading:HTMLDivElement;
let body:HTMLDivElement;
let answer:HTMLParagraphElement;
@Component({
  tag: 'faq-component',
  styleUrl: 'faq-component.css',
  shadow: true,
})
export class FaqComponent {

  componentDidLoad() {
    initializeFAQ()
  }

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

function initializeFAQ() {
  defineObjectReferences()
}

function defineObjectReferences() {
  componentElement = document.querySelector("faq-component").shadowRoot;
  faqCard = componentElement.querySelector(".faq-card");
  heading = componentElement.querySelector(".heading");
  body = componentElement.querySelector(".body");
  answer = componentElement.querySelector(".answer");
}
