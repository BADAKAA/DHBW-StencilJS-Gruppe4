import { Component, Host, h, Prop, Element } from '@stencil/core';

let componentElement:ShadowRoot;
let buttonWidth:HTMLDivElement;
let buttonHeight:HTMLDivElement;

@Component({
  tag: 'heart-button',
  styleUrl: 'heart-button.css',
  shadow: true,
})


export class HeartButton {

@Prop() width:string;
@Prop() height:string;

@Element() el: HTMLElement;


componentDidLoad(){
  const heartButton= this.el.shadowRoot.querySelector('#heartButton') as  HTMLDivElement;  
  this.initialiseButton(heartButton);
  

componentElement = document.querySelector('heart-button').shadowRoot;
buttonWidth = componentElement.querySelector('.button');
buttonHeight= componentElement.querySelector('.button');

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

initialiseButton(heartButton:HTMLDivElement){
const likeButton = document.createElement('DIV') as HTMLDivElement;
likeButton.className='button';
likeButton.textContent = '♡';
likeButton.addEventListener('click', (ev)=> buttonClicked(ev) );
heartButton.appendChild(likeButton);
}


  render(){
    return (
      <Host>
        <div id='heartButton'>
        
        </div>
      </Host>
    );
}

}

function buttonClicked(ev: MouseEvent) {
  const buttonElement = ev.target as HTMLDivElement;
  const buttonContent = buttonElement.textContent as string;
  buttonElement.style.background= '#941C2F';
  buttonElement.style.color='#fffcf9';
 /* clearButton();*/
}


/*function clearButton(){
  const unlike = document.querySelector('.button') as HTMLDivElement;
    this.unlike.style.background='black';
    this.unlike.style.color='white';
}*/
