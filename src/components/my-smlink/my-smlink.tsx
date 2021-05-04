import { Component, Host, h, Prop} from '@stencil/core';

@Component({
  tag: 'my-smlink',
  styleUrl: 'my-smlink.css',
  shadow: true,
})
export class MySmlink {

  
  @Prop() name : string;
  @Prop() link: string;
  @Prop() icon: string;
  
  

  componentDidLoad() {}

  instagram(){
    const instagram = this.link;
    window.open(instagram)

  }

  facebook(){
    const facebook = this.link;
    window.open(facebook)
  }
  twitter(){
  const twitter = this.link;
    window.open(twitter)
  }
  

  render() {
    return (
      <Host>
        <slot>
      <div class="smlink" >
      <element onClick={()=>this.instagram()}>{this.icon && <img src={this.icon} ></img>} </element>
      
      </div>
      </slot>

      </Host>

    )}
    
  
}
/*<button class={`btn ${this.aussehen}`}type="button">
{this.name}
 </button> */
