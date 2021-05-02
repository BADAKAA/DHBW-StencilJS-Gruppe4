import { Component, Host, h, Prop, State, Element } from '@stencil/core';

let componentElement: ShadowRoot;
let backgroundFront: HTMLDivElement;
let backgroundBack: HTMLDivElement;

@Component({
  tag: 'flip-card',
  styleUrl: 'flip-card.css',
  shadow: true,
})

export class FlipCard {

@Prop() name: string;
@Prop() turnable: boolean;
@Prop() img?: string;
@Prop() place?: string;
@Prop() date?: string;
@Prop() description?: string;
@Prop() colorfront?: string;
@Prop() colorback?: string;

@Element() el: HTMLElement;

@State() flipcard?: string;


handleMouseOver() {
  this.turnable ? (this.flipcard = "flipcard flipcard-mouseover"): "flipcard";
}

handleMouseOut() {
  this.flipcard = "flipcard";
}

googleMaps(){
  const place = this.place;
  const url = "https://www.google.com/maps/place/" + place;
  window.open(url);
}

meme(){
  window.open("https://it.memedroid.com/memes/detail/2585030/Is-this-lost");
  
}


  render() {
    return (
      <Host>
        <div class={this.flipcard
        }
        onClick={() => this.meme()}
        onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          >
          <div class="flipcard">
            <div class="content">
              <div class="front">
                {this.img && <img src={this.img}></img>}
                {this.name && <h2> {this.name} </h2>}
              </div>
              <div class="back">
              {this.name && <h2> {this.name} </h2>}
              <div class="backInput">
                <element onClick={() => this.googleMaps()}>{this.place && <h3> 📍 {this.place} </h3>}</element>
                {this.date && <h3> 📅 {this.date} </h3>}
                {this.description && <p> {this.description}</p>}
              </div>
              </div>
            </div>
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }
  
  componentDidLoad(){
    componentElement = this.el.shadowRoot;
    backgroundFront = componentElement.querySelector(".front");
    backgroundBack = componentElement.querySelector(".back");

    console.log(this.colorback);  
    if(this.colorfront){
    backgroundFront.style.backgroundColor = this.colorfront;
    }
    if(this.colorback){
      backgroundBack.style.backgroundColor = this.colorback;
      }
  }
  
}


 
