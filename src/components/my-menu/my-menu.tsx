import { Component, Host, h, Prop} from '@stencil/core';

@Component({
  tag: 'my-menu',
  styleUrl: 'my-menu.css',
  shadow: true,
})
//enthält  events, location, persönliche eventübersicht
export class MyMenu {
@Prop() name: string;
@Prop() element: string;
@Prop() url: string;
@Prop() window: string;

  clicked(){
  console.log(this.window);
   if(this.element){
    const scrollTarget = document.querySelector(this.element) as HTMLElement;
    console.log(scrollTarget); 
    scrollTarget.scrollIntoView({behavior: 'smooth'}); 
   } else if(this.url){
      if(this.window && this.window === "new"){
        window.open(this.url,"_blank")
      }else{
        window.open(this.url,"_self")
      }
   }
  }



  render() {
    return (
      <Host>
        <slot>
          <div class="leiste">
          <button class= "button" type="button" onClick={()=>this.clicked() }>{this.name}</button>
          </div>
        </slot>
      </Host>
    );
  }

}





  
