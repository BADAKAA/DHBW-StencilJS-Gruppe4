import { Component, Host, h } from '@stencil/core';

/*let componentElement:ShadowRoot;
let buttonColor:string; <-falsch HTMLElement
let buttonWidth:string;*/

@Component({
  tag: 'heart-button',
  styleUrl: 'heart-button.css',
  shadow: true,
})


export class HeartButton {

/*@Prop() width:string;
@Prop() color:string;*/

componentDidLoad(){
  /*componentElement = document.querySelector("").shadowRoot;
  buttonWidth = componentElement.querySelector("");
  buttonColor = componentElement.querySelector("");*/
  


  /*if (this.width) {
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
  
}*/

function buttonClicked(){
  const changeColor = document.querySelector('.heartButton') as HTMLElement;
  changeColor.style.background='#941C2F';
  console.log('das ist jetzt bunt'); 
}



  render(){
    return (
      <Host>
        <button class='heartButton' onClick={this.buttonClicked}>&#9825;</button>
      </Host>
    );
  }
}
