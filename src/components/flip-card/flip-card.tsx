import { Component, Host, h, Prop, State } from '@stencil/core';

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

@State() flipcard: string;



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

  render() {
    return (
      <Host>
        <div class={this.flipcard
        }
        
        onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          >
          <div class="flipcard">
            <div class="content">
              <div class="front">
              {this.name && <h2> {this.name} </h2>}
                {this.img && <img src={this.img}></img>}
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

}

