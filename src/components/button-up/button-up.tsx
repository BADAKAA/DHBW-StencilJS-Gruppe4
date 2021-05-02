import { Component, Host, h, Prop } from '@stencil/core';

/*let componentElement: ShadowRoot;
let elementBackground: HTMLElement;
let elementText: HTMLElement;*/



@Component({
  tag: 'button-up',
  styleUrl: 'button-up.css',
  shadow: true,
})

export class ButtonUp {

  @Prop() name: string;
  @Prop() colorbackground?: string;
  @Prop() colortext?: string;

  backToTop(){
    console.log("klappt");
    window.scroll({ top: 0, left: 0, behavior:'smooth'});
  }

  render() {
    return (
      <Host>
        <div class="button" onClick ={() => this.backToTop()}>
          <button>{this.name}</button>
        </div>
      </Host>
    );
  }
  /*componentDidLoad(){
    /*elementBackground = componentElement.querySelector("button");
    elementText = componentElement.querySelector("button");

    if(this.colorbackground){
      elementBackground.style.background = this.colorbackground;
    }
    if(this.colortext){
      elementText.style.color = this.colortext;
    }
  }*/
}
