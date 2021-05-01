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

handleMouseEnter() {
  this.turnable ? (this.flipcard = 'flipcard flipcard-mouseenter'): "flipcard";
}

handleMouseLeave() {
  this.flipcard = 'flipcard';
}

  render() {
    return (
      <Host>
        <div class={this.flipcard
        }onMouseEnter={() => {
            this.handleMouseEnter();
          }}
          onMouseLeave={() => this.handleMouseLeave()}>
          <div class="content">
            <div class="front">
            {this.name && <h2> {this.name} </h2>}
              {this.img && <img src={this.img}></img>}
            </div>
            <div class="back">
            {this.name && <h2> {this.name} </h2>}
            <div class="backInput">
              {this.place && <h3> 📍 {this.place} </h3>}
              {this.date && <h3> 📅 {this.date} </h3>}
              {this.description && <p> Bla{this.description}</p>}
            </div>
            </div>
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }

}
