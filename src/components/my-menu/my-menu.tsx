import { Component, Host, h, Prop, Event, EventEmitter, Listen} from '@stencil/core';

@Component({
  tag: 'my-menu',
  styleUrl: 'my-menu.css',
  shadow: true,
})
//enthält  events, location, persönliche eventübersicht
export class MyMenu {
@Prop() name: string;
@Prop() targetElement: string;
@Prop() link: string;


  //@Prop() class?: string;

  @Event() scroll: EventEmitter;
  @Listen("click")
    clickListener() {
      console.log("clicked");
  }

  //Event welches ausgelöst wird, sobald ein button click erfolgt
  event(){
    const location = document.querySelector('#'+this.targetElement) as HTMLElement;
    console.log(location); //speicher das ELement mit id location_text in location
    location.scrollIntoView({behavior: 'smooth'}); //führe die scrollIntoView Methode des location Elements aus
    
    
  }



  render() {
    return (
      <Host>
        <slot>
          <div class="leiste">
          <button class= "button" type="button" onClick={()=>this.event() }>{this.name}</button>
          </div>
        </slot>
      </Host>
    );
  }

}

function location(){ //wird aufgerufen, wenn Button "location" geklickt wird
  const location = document.querySelector('#location_text'); //speicher das ELement mit id location_text in location
  location.scrollIntoView({behavior: 'smooth'}); //führe die scrollIntoView Methode des location Elements aus
}
 
function persönlicheEvents(){
  const persönlicheEvents = document.querySelector('#persönlicheEvents_text'); //speicher das ELement mit id location_text in location
  persönlicheEvents.scrollIntoView({behavior: 'smooth'});
}

function events(){
  const events = document.querySelector('#event_text');
  events.scrollIntoView({behavior: 'smooth'})
  events.className = 'selected';
};


  
