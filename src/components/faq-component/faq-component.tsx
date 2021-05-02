import { Component, Host, h, Prop } from '@stencil/core';
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

  render() {
    return (
      <Host>
        <div id="faqCard">
          <h2 id="faqBoxHeading">FAQ</h2>
          <div id="heading">
            {this.question && <p>{this.question}</p>}
          </div>
          <div id="textBody">
            <p id="answerText">{this.answer && <p>{this.answer}</p>}</p>
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
  textBody.style.display = "none";

  heading.addEventListener("click", makeAnswerVisible);
}

function makeAnswerVisible() {
  textBody.style.display = "";
}

