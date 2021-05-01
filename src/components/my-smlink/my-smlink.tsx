import { Component, Host, h, Prop, } from '@stencil/core';

@Component({
  tag: 'my-smlink',
  styleUrl: 'my-smlink.css',
  shadow: true,
})
export class MySmlink {

  @Prop() name : string;
  @Prop() link: string;
  @Prop() icon: String;
  @Prop() aussehen: string;
  componentDidLoad() {}
 
  render() {
    return (
      <Host>
        
      <button class={`btn ${this.aussehen}`}type="button">
     {this.name}
      </button>

      </Host>

    )}
    
  
}