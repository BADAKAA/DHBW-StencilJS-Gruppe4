import { Component, Host, h, Prop, State, Element } from '@stencil/core';

let componentElement: ShadowRoot;
let front: HTMLDivElement;
let back: HTMLDivElement;

@Component({
  tag: 'flip-card',
  styleUrl: 'flip-card.css',
  shadow: true,
})

export class FlipCard {

  @Prop() name?: string;
  @Prop() turnable: boolean;
  @Prop() img: string;
  @Prop() place?: string;
  @Prop() date?: string;
  @Prop() description?: string;
  @Prop() colorfront?: string;
  @Prop() colorback?: string;
  @Prop() textfront?: string;
  @Prop() textback?: string;

  @Element() el: HTMLElement;

  @State() flipcard?: string = "flipcard";


  handleMouseOver() {
    this.turnable ? (this.flipcard = "flipcard flipcard-mouseover") : this.flipcard = "flipcard";
  }

  handleMouseOut() {
    this.flipcard = "flipcard";
  }

  googleMaps() {
    const place = this.place;
    const url = "https://www.google.com/maps/place/" + place;
    window.open(url);
  }

  meme() {
    window.open("https://entwicklergate.de/t/lustige-entwickler-programmierer-memes/371");

  }

  render() {
    return (
      <Host>
        <div class="flipcardContainer">
          <div class={this.flipcard}
            onClick={() => this.meme()}
            onMouseOver={() => this.handleMouseOver()}
            onMouseOut={() => this.handleMouseOut()}
            >
            <div class="content">
              <div class="front">
                <div class="imgBox">
                  {this.img && <img src={this.img}></img>}
                </div>
                {this.name && <h2> {this.name} </h2>}
              </div>
              <div class="back">
                {this.name && <h2> {this.name} </h2>}
                <div class="backInput">
                  <element onClick={() => this.googleMaps()}><h3> 📍 {this.place} </h3></element>
                  <h3> 📅 {this.date} </h3>
                  <p> {this.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

  componentDidLoad() {

    componentElement = this.el.shadowRoot;
    front = componentElement.querySelector(".front");
    back = componentElement.querySelector(".back");


    if (this.colorfront) {
      front.style.backgroundColor = this.colorfront;
    }
    if (this.colorback) {
      back.style.backgroundColor = this.colorback;
    }
    if (this.textfront) {
      front.style.color = this.textfront;
    }
    if (this.textback) {
      back.style.color = this.textback;
    }
  }
}