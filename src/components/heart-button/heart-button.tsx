import { Component, Host, h, Prop } from '@stencil/core';

let componentElement:ShadowRoot;
let buttonWidth:HTMLElement;
let buttonColor:HTMLElement; 

@Component({
  tag: 'heart-button',
  styleUrl: 'heart-button.css',
  shadow: true,
})


export class HeartButton {

@Prop() width:string;
@Prop() color:string;

componentDidLoad(){
  componentElement = document.querySelector(".likeButton").shadowRoot;
  buttonWidth = componentElement.querySelector(".likeButton");
  buttonColor = componentElement.querySelector(".likeButton");


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

buttonClicked(){
  /*const changeColor = document.querySelector('.likeButton') as HTMLDivElement;*/
  /*changeColor.style.background='black';*/
  console.log('das ist jetzt bunt'); 
}



  render(){
    return (
      <Host>
        <div class='likeButton' onClick={() => {this.buttonClicked()}}>
        <button class='heartButton'>&#9825;</button>
        </div>
      </Host>
    );
  }
}
