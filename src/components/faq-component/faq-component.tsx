import { Component, Host, h, Prop } from '@stencil/core';
let faqQuestion:string;
let faqAnswer:string;

let componentElement:ShadowRoot;
let heading:HTMLDivElement;
let textBody:HTMLDivElement;
@Component({
  tag: 'faq-component',
  styleUrl: 'faq-component.css',
  shadow: true,
})
export class FaqComponent {

  @Prop() question:string;
  @Prop() answer:string; 

  constructor(){
    faqQuestion = this.question;
    faqAnswer = this.answer;
  }

  render() {
    return (
      <Host>
        <div id="faqCard">
          <div id="heading">
            Text
          </div>
          <div id="textBody">
            <p id="answerText">blabla</p>
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }
  componentDidLoad() {
    initializeFAQ()
  }
}

function initializeFAQ() {
  defineObjectReferences()
}

function defineObjectReferences() {
  componentElement = document.querySelector("faq-component").shadowRoot;
  heading = componentElement.querySelector("#heading");
  textBody = componentElement.querySelector("#textBody");

  heading.addEventListener("click", makeAnswerInvisible);
}

function makeAnswerInvisible() {
  textBody.style.visibility = "hidden";

  heading.addEventListener("click", makeAnswerVisible);
}

function makeAnswerVisible() {
  textBody.style.visibility = "visible";
}

