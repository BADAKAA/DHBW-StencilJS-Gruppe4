import { Component, Host, h, Prop, Event, EventEmitter, Listen } from '@stencil/core';

/*let componentElement:ShadowRoot;
let buttonWidth:HTMLDivElement;
let buttonHeight:HTMLDivElement; */


@Component({
  tag: 'heart-button',
  styleUrl: 'heart-button.css',
  shadow: true,
})


export class HeartButton {
/*
@Prop() width:string;
@Prop() height:string;*/


@Event() changeColor: EventEmitter;

@Listen('changeColor')
  public changeBtnColor() {
    const btnColor = document.querySelector('.heartButton') as HTMLElement;
    btnColor.style.background='#941C2F;'; /*Wie bindet man hier die property farbe ein?*/
  }


componentDidLoad(){
/*
componentElement = document.querySelector(".likeButton").shadowRoot;
buttonWidth = componentElement.querySelector(".likeButton");
buttonHeight= componentElement.querySelector(".likeButton");

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
*/


}

/*btnClicked(){
  const btnColor = document.querySelector('.heartButton') as HTMLElement;
  btnColor.style.color='#941C2F;';
}*/


  render(){
    return (
      <Host>
        <div class='likeButton' onClick={() => this.changeColor.emit()} /*onClick={() => {this.btnClicked()}}*/>
        <p class='heartButton'>&#9825;</p>
        </div>
      </Host>
    );
}

}
