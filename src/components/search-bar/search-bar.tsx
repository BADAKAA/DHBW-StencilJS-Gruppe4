//The main logic fpr the search bar comes from this tutorial:
//https://www.youtube.com/watch?v=3NG8zy0ywIk

import { Component, Host, h, Prop } from '@stencil/core';

let searchBarContainer: HTMLDivElement;
let componentElement: ShadowRoot|HTMLElement;
let searchIcon: HTMLImageElement;
let searchedElement: HTMLElement;
let searchBar: HTMLInputElement;
let type:string;
@Component({
  tag: 'search-bar',
  styleUrl: 'search-bar.css',
  shadow: true,
})

export class SearchBar {
  @Prop() position: string;
  @Prop() element: string;
  @Prop() width: string;
  @Prop() type: string;
  @Prop() google: string;
  
  render() {
    return (
      <Host>
        <div class="searchBarContainer">
          <img class="searchIcon" src="/assets/search.png"></img>
          <input type="text" id="searchBar" placeholder="Suche..."></input>
        </div>
      </Host>
    );
  }
  componentDidLoad() {
    componentElement = document.querySelector("search-bar").shadowRoot;
    searchBarContainer = componentElement.querySelector(".searchBarContainer");
    searchIcon = componentElement.querySelector(".searchIcon");
    searchBar = componentElement.querySelector("#searchBar");

    if (this.google && this.google=="true") {
      searchIcon.removeEventListener;
      searchIcon.addEventListener("click", googleSearch);
      searchBar.placeholder="Search Google...";
    
    } else {

      searchBar.addEventListener("input", search);
      searchIcon.addEventListener("click", clearSearch);
      defineSearchedElement(this.element, this.type);
      }
    if (this.position) {
      searchBarContainer.style.position = this.position;
    }
    if (this.width) {
      if (this.width.includes("px") || this.width.includes("%") || this.width.includes("vw")) {
        searchBarContainer.style.width = this.width;
      }
    }
  }
}

function defineSearchedElement(element: string, typeProperty: string) {
  if (!typeProperty) {
    type = "ul";
  }
  if (!element) {
    element = "body";
  }

  if (document.querySelector(element).shadowRoot) {
    searchedElement = document.querySelector(element).shadowRoot.querySelector(type);
    console.log(searchedElement);

  } else if (document.querySelector(element)) {
    searchedElement = document.querySelector(element).querySelector(typeProperty);
  } else {
    throw new Error('The element you want to search cannot be found.');
  }
}

function search() {

  resetSearch();
  searchIcon.src = "/assets/clear.png";
  const input: string = searchBar.value.toLowerCase();
  let listElements;
  if(type=="ul" || type=="ol") {
  listElements = searchedElement.querySelectorAll("li") as unknown as Array<HTMLElement>;
  } else {
    listElements =  searchedElement.children as unknown as Array<HTMLElement>;
  }


  for (const element of listElements) {
    element.style.transition = "opacity 1s";

    if (!element.textContent.toLowerCase().includes(input)) {
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.opacity = "0";
    }
  }
}


function resetSearch() {
  const listElements = searchedElement.querySelectorAll("li") as unknown as Array<HTMLElement>;

  for (const element of listElements) {
    element.style.visibility = "visible";
    element.style.position = "relative";
    element.style.opacity = "1";
  }
}

function clearSearch() {
  resetSearch();
  searchBar.value = "";
  searchIcon.src = "/assets/search.png";
}

function googleSearch() {
  //code adapted  from https://stackoverflow.com/a/16649417

  const input: string = searchBar.value;
  const url ='http://www.google.com/search?q=' + input;
  window.open(url,'_blank');

}

