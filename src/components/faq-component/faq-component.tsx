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
          <div class="heading">
            {this.question && <p>{this.question}</p>}
          </div>
          <div class="textBody">
            <p id="answerText">{this.answer && <p>{this.answer}</p>}</p>
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }
  componentDidLoad() {
    defineObjectReferences()
  }
}

function defineObjectReferences() {
  componentElement = document.querySelector("faq-component").shadowRoot;
  heading = componentElement.querySelector(".heading");
  textBody = componentElement.querySelector(".textBody");

  heading.addEventListener("click", makeAnswerInvisible);
}

function makeAnswerInvisible() {
  if (textBody.style.display =="contents") {
    textBody.style.display = "none"
  }
  else {
    textBody.style.display = "contents";
  }
}


