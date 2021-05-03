import { Component, Host, h, Prop, Element } from '@stencil/core';

let componentElement:ShadowRoot;
let buttonWidth:HTMLDivElement;
let buttonHeight:HTMLDivElement;
let buttonBackground:HTMLElement

@Component({
  tag: 'heart-button',
  styleUrl: 'heart-button.css',
  shadow: true,
})


export class HeartButton {

@Prop() width:string;
@Prop() height:string;
@Prop() backgroundcolor:string;

@Element() el: HTMLElement;


componentDidLoad(){
  const heartButton= this.el.shadowRoot.querySelector('.heartButton') as  HTMLDivElement;  
 /* this.initialiseButton(heartButton);*/
  

componentElement = document.querySelector('heart-button').shadowRoot;
buttonWidth = componentElement.querySelector('#likeBtn');
buttonHeight= componentElement.querySelector('#likeBtn');

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


}

/*initialiseButton(heartButton:HTMLDivElement){
const likeButton = document.createElement('DIV') as HTMLDivElement;
likeButton.className='button';
likeButton.textContent = '♡';
likeButton.addEventListener('click', (ev)=> buttonClicked(ev) );
heartButton.appendChild(likeButton);
}*/
buttonClicked(){
  componentElement = document.querySelector('heart-button').shadowRoot;
  buttonBackground = componentElement.querySelector('#likeBtn');

  if (this.backgroundcolor){
    buttonBackground.style.backgroundColor=this.backgroundcolor;
  }
}

  render(){
    return (
      <Host>
        <div class='heartButton'
        onClick={() => this.buttonClicked()}
        >
        <button id='likeBtn'>&#10084;</button>
        </div>
      </Host>
    );
}

}

/*function buttonClicked(ev: MouseEvent) {
  const buttonElement = ev.target as HTMLDivElement;
  const buttonContent = buttonElement.textContent as string;
  buttonElement.style.background= '#941C2F';
  buttonElement.style.color='#fffcf9';
}*/

