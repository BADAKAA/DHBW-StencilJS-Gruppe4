import { Component, Host, h, Prop, } from '@stencil/core';

@Component({
  tag: 'my-menu',
  styleUrl: 'my-menu.css',
  shadow: true,
})
//enthält  events, location, persönliche eventübersicht
export class MyMenu {

@Prop () name: string;


  render() {
    return (
      <Host>
        <slot></slot>
          <div class="leiste">
              <button name='Events'>Events</button>
              
              <button name='Location'>Location</button>

              <button name='Persönliche Events'>Persönliche Events</button>
          </div>
        <slot></slot>
      </Host>
    );
  }

}


