import { Component, Host, h } from '@stencil/core';

let componentElement:ShadowRoot;
let searchBar:HTMLInputElement;
@Component({
  tag: 'search-bar',
  styleUrl: 'search-bar.css',
  shadow: true,
})

export class SearchBar {

  render() {
    return (
      <Host>
        <div class="searchBarContainer">
          <img class="searchIcon"src="/assets/search.png" onClick={() => search()}></img>
          <input type="text" id="searchBar" placeholder="Suche..."></input>
        </div>
      </Host>
    );
  }
  componentDidLoad() {
    componentElement=document.querySelector("search-bar").shadowRoot;
    searchBar=componentElement.querySelector("#searchBar");
  }
}

function search() {

  const input:string = searchBar.value;
  const url ='http://www.google.com/search?q=' + input;
  window.open(url,'_blank');
}