import { Component, Host, h, Prop, Element, State} from '@stencil/core';
import { getId } from '../../utils/faqCounter';
let componentElement:ShadowRoot;
let heading:HTMLDivElement;
let textBody:HTMLDivElement;
let id:string;
@Component({
  tag: 'faq-component',
  styleUrl: 'faq-component.css',
  shadow: true,
})
export class FaqComponent {

  @Prop() question:string;
  @Prop() answer:string; 
  @Element() el:HTMLElement;
  @State () faqcomponent?: string;

  render() {
    return (
      <Host>
        <div class={this.faqcomponent} id="faqCard">
          <div class="heading">
            <p>{this.question}</p>
          </div>
          <div class="textBody">
            <p id="answerText">{this.answer}</p>
          </div>
        </div>
      </Host>
    );
  }
  componentDidLoad() {
    id = getId();
    this.el.id = id;
    componentElement = document.querySelector("#" + id).shadowRoot;
    defineObjectReferences();
  }
}

function defineObjectReferences() {
  heading = componentElement.querySelector(".heading");
  textBody = componentElement.querySelector(".textBody");

  heading.addEventListener("click", makeAnswerInvisible);
}

function makeAnswerInvisible() {
  console.log(textBody);
  
  if (textBody.style.display =="contents") {
    textBody.style.display = "none"
  }
  else {
    textBody.style.display = "contents";
  }
}


