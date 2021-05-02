import { Component, Host, h, Prop } from '@stencil/core';

let componentElement:ShadowRoot;
let buttonColor:string;
let buttonWidth:string;

@Component({
  tag: 'heart-button',
  styleUrl: 'heart-button.css',
  shadow: true,
})


export class HeartButton {

@Prop() width:string;
@Prop() color:string;

componentDidLoad(){
  componentElement = document.querySelector("").shadowRoot;
  buttonWidth = componentElement.querySelector("");
  buttonColor = componentElement.querySelector("");
  

  if (this.width) {
    if (this.width.includes("px") || this.width.includes("%") || this.width.includes("vw")) {
      buttonWidth.style.width = this.width;
    } else {
      console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
      throw new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');
    }
  }
  
  if (this.color) {
    buttonColor.style.background=this.color;
  }
  
}

function likeEvent(){
  const changeColor = document.querySelector('.heartButton') as HTMLButtonElement;
  changeColor.style.background='#941C2F'; 
}



  render() {
    return (
      <Host>
        <button class='heartButton'>&#9825;</button>
        <slot></slot>
      </Host>
    );
  }

}
