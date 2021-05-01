import { Component, Host, h } from '@stencil/core';
let componentElement:ShadowRoot;
let faqCard:HTMLDivElement;
let heading:HTMLDivElement;
let textBody:HTMLDivElement;
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
        <div class="faqCard">
          <div class="heading">
            <div>
              Text
            </div>
          </div>
          <div class="textBody">
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
  faqCard = componentElement.querySelector(".faqCard");
  heading = componentElement.querySelector(".heading");
  textBody = componentElement.querySelector(".textBody");
  answer = componentElement.querySelector(".answer");

  heading.addEventListener("click", makeAnswerInvisible);
}



function makeAnswerInvisible(){
  textBody.style.display = "none";
}