import { Component, Host, h, Prop } from '@stencil/core';

let componentElement: ShadowRoot;
let elementBackground: HTMLElement;
let elementHover: HTMLElement;

@Component({
  tag: 'button-up',
  styleUrl: 'button-up.css',
  shadow: true,
})

export class ButtonUp {

  @Prop() name: string;
  @Prop() colorbackground?: string;
  @Prop() colorhover?:string;
  @Prop() colortext?: string;

  backToTop(){
    console.log("klappt");
    window.scroll({ top: 0, left: 0, behavior:'smooth'});
  }

  MouseUp(){
    componentElement = document.querySelector("button-up").shadowRoot;
    elementBackground = componentElement.querySelector("#buttonUp");
    console.log("Over");
    
    if(this.colorbackground){
      elementBackground.style.backgroundColor = this.colorbackground;
    }
  }

  MouseOver(){
    componentElement = document.querySelector("button-up").shadowRoot;
    elementHover = componentElement.querySelector("#buttonUp");
    console.log("Up");
    if(this.colorhover){
      elementHover.style.backgroundColor = this.colorhover;
    }
  }

  render() {
    return (
      <Host>
        <div class="button" >
          <button id="buttonUp"
            onClick ={() => this.backToTop()}
            onMouseMove ={() => this.MouseOver()}
            onMouseOut ={() => this.MouseUp()}
          >{this.name}</button>
        </div>
      </Host>
    );
  }

  componentDidLoad(){
    componentElement = document.querySelector("button-up").shadowRoot;
    elementBackground = componentElement.querySelector("#buttonUp");
    if(this.colorbackground){
      elementBackground.style.backgroundColor = this.colorbackground;
    } 
  }
}
