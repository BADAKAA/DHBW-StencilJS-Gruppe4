//The main logic fpr the search bar comes from this tutorial:
//https://www.youtube.com/watch?v=3NG8zy0ywIk

import { Component, Host, h, Prop } from '@stencil/core';

let componentElement: ShadowRoot;
let searchBarContainer: HTMLDivElement;
let searchIcon: HTMLImageElement;
let searchBar: HTMLInputElement;

let searchedElement: HTMLElement;
@Component({
  tag: 'search-bar',
  styleUrl: 'search-bar.css',
  shadow: true,
})

export class SearchBar {
  @Prop() position: string;
  @Prop() component: string;
  @Prop() element: string;
  @Prop() width: string;
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
    if (this.google && this.google == "true") {
      searchIcon.removeEventListener;
      searchIcon.addEventListener("click", googleSearch);
      searchBar.placeholder = "Search Google...";

    } else {
      searchBar.addEventListener("input", search);
      searchIcon.addEventListener("click", clearSearch);
      searchedElement = getSearchedElement(this.component, this.element);
      console.log(searchedElement);
    }
    if (this.position) {
      searchBarContainer.style.position = this.position;
    }
    if (this.width) {
      if (this.width.includes("px") || this.width.includes("%") || this.width.includes("vw")) {
        searchBarContainer.style.width = this.width;
      } else {
        console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
        throw new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');
      }
    }
  }
}

function getSearchedElement(component: string, elementToBeSearched: string) {
  //if no component has been specified, search for the element directly.
  if (!component && document.querySelector(elementToBeSearched)) {
    return document.querySelector(elementToBeSearched) as HTMLElement;
  }
  //check if either the component element can be found in the document.
  if (!document.querySelector(component)) {
    console.log('%c The element you want to search in cannot be found.', "color:orange; font-weight:bold;font-family:'Open sans'");
    throw new Error('The element you want to search in cannot be found.');
  }
  //check if the component has a shadowRoot and search within it if that is the case.
  if (document.querySelector(component).shadowRoot) {
  //if no element is specified, the last child of the component will be searched
  //→ no element property is required to use the "search-bar" with the "event-list" component, as this defines the list as searched object automatically.
    if(!elementToBeSearched) {
      return document.querySelector(component).shadowRoot.lastChild as HTMLElement;
    }
    if(document.querySelector(component).shadowRoot.querySelector(elementToBeSearched)) {
      return document.querySelector(component).shadowRoot.querySelector(elementToBeSearched) as HTMLElement;
    }
  }

  if (document.querySelector(component)) {
    return document.querySelector(component).querySelector(elementToBeSearched) as HTMLElement;
  }
  console.log('%c The element you want to search in cannot be found.', "color:orange; font-weight:bold;font-family:'Open sans'");
  throw new Error('The element you want to search in cannot be found.');
}

function getChildren() {
  if (typeof searchedElement === typeof HTMLUListElement || typeof searchedElement === typeof HTMLOListElement) {
    return searchedElement.querySelectorAll("li") as unknown as Array<HTMLElement>;
  }
  return searchedElement.children as unknown as Array<HTMLElement>;
}

function search() {

  const input: string = searchBar.value.toLowerCase();
  if (input != "") {
    searchIcon.src = "/assets/clear.png";
    resetSearch();
  } else {
    clearSearch();
  }

  const childElements: Array<HTMLElement>=getChildren();

  for (const element of childElements) {
    element.style.transition = "opacity 1s";
    //search for string value and disable all elements not containing it
    if (!element.textContent.toLowerCase().includes(input)) {
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.opacity = "0";
    }
  }
}


function resetSearch() {

  const childElements: Array<HTMLElement>=getChildren();

  for (const element of childElements) {
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
  const url = 'http://www.google.com/search?q=' + input;
  window.open(url, '_blank');
}