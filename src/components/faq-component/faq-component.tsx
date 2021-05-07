import { Component, Host, h, Prop, Element} from '@stencil/core';
let componentElement:ShadowRoot;
let questionElement:HTMLDivElement;


@Component({
  tag: 'faq-component',
  styleUrl: 'faq-component.css',
  shadow: true,
})
export class FaqComponent {

  @Prop() question:string;
  @Prop() answer:string; 
  @Element() el:HTMLElement;

  render() {
    return (
      <Host>
        <div class="faqCard">
          <div class="heading">
            <p class="question">{this.question}</p>
          </div>
          <div class="textBody">
            <p id="answerText">{this.answer}</p>
          </div>
        </div>
      </Host>
    );
  }
  componentDidLoad() {
    componentElement = this.el.shadowRoot;
    defineObjectReferences();
  }
}

function defineObjectReferences() {
  questionElement = componentElement.querySelector(".question");

  questionElement.addEventListener("click", (ev) => makeAnswerInvisible(ev));
}

function makeAnswerInvisible(ev:MouseEvent) {
  const targetElement = ev.target as HTMLElement;
  const textBody = targetElement.parentElement.parentElement.querySelector(".textBody") as HTMLDivElement;
  console.log(textBody);
  if (textBody.style.display =="inline-block") {
    textBody.style.display = "none"
  }
  else {
    textBody.style.display = "inline-block";
  }
}


