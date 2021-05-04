import { Component, Host, h, Prop, Element } from '@stencil/core';

let componentElement:ShadowRoot;
let buttonColor: HTMLElement;
let buttonWidth:HTMLDivElement;
let buttonHeight:HTMLDivElement;
let buttonBackground:HTMLElement
let iconSize:HTMLElement;

@Component({
  tag: 'heart-button',
  styleUrl: 'heart-button.css',
  shadow: true,
})


export class HeartButton {
@Prop() color:string;
@Prop() width:string;
@Prop() height:string;
@Prop() clickcolor:string;
@Prop() icon:string;
@Prop() iconsize:string;

@Element() el: HTMLElement;


componentDidLoad(){
  componentElement = document.querySelector('heart-button').shadowRoot;
  buttonColor= componentElement.querySelector('#likeBtn');
  buttonWidth = componentElement.querySelector('#likeBtn');
  buttonHeight= componentElement.querySelector('#likeBtn');
  iconSize= componentElement.querySelector('#likeBtn');

  if (this.color){
    buttonColor.style.backgroundColor=this.color;
  }

  if (this.width) {
    if (this.width.includes("px") || this.width.includes("%") || this.width.includes("vw")) {
      buttonWidth.style.width = this.width;
    } else {
      console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
      throw new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');
    }
  }

  if (this.height) {
    if (this.height.includes("px") || this.height.includes("%") || this.height.includes("vw")) {
      buttonHeight.style.height = this.height;
    } else {
      console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
      throw new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');
    }
  }

  if (this.iconsize){
    iconSize.style.fontSize=this.iconsize;
  }

  }


  buttonClicked(){
    componentElement = document.querySelector('heart-button').shadowRoot;
    buttonBackground = componentElement.querySelector('#likeBtn');

    if (this.clickcolor){
      buttonBackground.style.backgroundColor=this.clickcolor;
    }

    /*hier sollte noch Code stehen, um die gemrekten Events auf einer Seite darzustellen*/
  }


  render(){
    return (
      <Host>
        <div class='heartButton'
        onClick={() => this.buttonClicked()}
        >
        <button id='likeBtn'>{this.icon}</button>
        </div>
      </Host>
    );
}

}

