import { Component, Host, h, Prop } from '@stencil/core';
let componentElement:ShadowRoot;
let faqCard:HTMLDivElement;
let heading:HTMLDivElement;
let textBody:HTMLDivElement;
let answerText:HTMLParagraphElement;
@Component({
  tag: 'faq-component',
  styleUrl: 'faq-component.css',
  shadow: true,
})
export class FaqComponent {

  @Prop() question:string;
  @Prop() answer:string; 

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
            <p class="answerText">blabla</p>
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
  answerText = componentElement.querySelector(".answerText");

  heading.addEventListener("click", makeAnswerInvisible);
}

function makeAnswerInvisible(){
  textBody.style.visibility = "hidden";

  heading.addEventListener("click", makeAnswerVisible);
}

function makeAnswerVisible(){
  textBody.style.visibility = "visible";
}