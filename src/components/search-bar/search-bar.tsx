import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'search-bar',
  styleUrl: 'search-bar.css',
  shadow: true,
})

export class SearchBar {

  render() {
    return (
      <Host>
        <input type="text" class="searchBar" placeholder="Suche..."><img class="searchIcon"src="/assets/search.png"></img></input>
      </Host>
    );
  }

}
