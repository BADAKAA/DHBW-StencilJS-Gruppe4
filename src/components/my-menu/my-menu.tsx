import { Component, Host, h, Prop, Event, EventEmitter, Listen} from '@stencil/core';

@Component({
  tag: 'my-menu',
  styleUrl: 'my-menu.css',
  shadow: true,
})
//enthält  events, location, persönliche eventübersicht
export class MyMenu {
@Prop() name: string;
@Prop() id: string;
@Prop() link: string;
@Prop() href: string;

  //@Prop() class?: string;

  @Event() scroll: EventEmitter;
  @Listen("click")
    clickListener() {
      console.log("clicked");
  }

  //Event welches ausgelöst wird, sobald ein button click erfolgt
  event(){
    let clicked_id = this.id;     //get the id of the caller element (button)
    if(clicked_id == "event"){    //wenn die ID des buttons "event" ist
      events();                   //führe Methode events() aus
    }
    else if (clicked_id == "location"){ //wenn die ID des buttons "location" ist
      location();                       //führe Methode location() aus
    }
    else if (clicked_id == "persönliche-events"){ //wenn die ID des buttons "persönliche-events" ist
      persönlicheEvents();                        //führe Methode persönlicheEvents() aus
    } 
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
  const persönlicheEvents = document.querySelector('#persönlicheEvents_text');
  persönlicheEvents.scrollIntoView({behavior: 'smooth'});
}

function events(){
  const events = document.querySelector('#event_text');
  events.scrollIntoView({behavior: 'smooth'})
}


  
