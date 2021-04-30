//The main logic fpr the search bar comes from this tutorial:
//https://www.youtube.com/watch?v=3NG8zy0ywIk

import { Component, Host, h, Prop } from '@stencil/core';
//variables to control this component
let componentElement: ShadowRoot;
let searchBarContainer: HTMLDivElement;
let searchIcon: HTMLImageElement;
let searchBar: HTMLInputElement;
//variables to store user input preperties
let componentToBeSearchedIn: string;
let elementToBeSearchedIn: string;
//element in which the search bar is acitve
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
  @Prop() color: string;
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
    //declare variables to control this component
    componentElement = document.querySelector("search-bar").shadowRoot;
    searchBarContainer = componentElement.querySelector(".searchBarContainer");
    searchIcon = componentElement.querySelector(".searchIcon");
    searchBar = componentElement.querySelector("#searchBar");
    //check if google-mode was activated by user through "google" property
    if (this.google && this.google == "true") {
      searchIcon.addEventListener("click", googleSearch);
      searchBar.placeholder = "Search Google...";

    } else {
      componentToBeSearchedIn = this.component;
      elementToBeSearchedIn = this.element;
      //the search-bar component is initialised only when the element that is supposed to be searched is found.
      const checkIfElementIsReady: number = setInterval(() => {
        searchedElement = getSearchedElement();

        if (searchedElement) {
          initializeSearchBar();
          clearInterval(checkIfElementIsReady);
        }
      }, 500);
      //If the element to be searched in cannot be found after 10 seconds, the search for it is ended.
      setTimeout(() => {
        clearInterval(checkIfElementIsReady);
        componentNotFound();
      }, 10000);
    }
    if (this.position) {
      searchBarContainer.style.position = this.position;
    }
    if (this.width) {
      if (this.width.includes("px") || this.width.includes("%") || this.width.includes("vw")) {
        searchBarContainer.style.width = this.width;
      } else {
        console.log('%cPlease input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
        throw new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');
      }
    }
    if (this.color) {
      searchIcon.style.background = this.color;
    }
  }
}

function initializeSearchBar() {
  searchBar.addEventListener("input", search);
  searchIcon.addEventListener("click", clearSearch);
  searchedElement = getSearchedElement();
  console.log("%cSearch bar target found.\nThis is the element the seach bar is active in: ",
  "color:darkgreen; font-weight:bold;font-family:'Open sans', sans-serif;line-height:12pt");
  console.log(searchedElement);
}

function getSearchedElement() {
  //if no component has been specified, search for the element directly.
  if (!componentToBeSearchedIn && document.querySelector(elementToBeSearchedIn)) {
    return document.querySelector(elementToBeSearchedIn) as HTMLElement;
  }
  //check if either the component element can be found in the document.
  if (!document.querySelector(componentToBeSearchedIn)) {
    throw new Error('The element you want to search in cannot be found.');
  }
  //check if the component has a shadowRoot and search within it if that is the case.
  if (document.querySelector(componentToBeSearchedIn).shadowRoot) {
    //if no element is specified, the last child of the component will be searched
    //→ no element property is required to use the "search-bar" with the "event-list" component, as this defines the list as searched object automatically.
    if (!elementToBeSearchedIn) {
      return document.querySelector(componentToBeSearchedIn).shadowRoot.lastChild as HTMLElement;
    }
    if (document.querySelector(componentToBeSearchedIn).shadowRoot.querySelector(elementToBeSearchedIn)) {
      return document.querySelector(componentToBeSearchedIn).shadowRoot.querySelector(elementToBeSearchedIn) as HTMLElement;
    }
  }

  if (document.querySelector(componentToBeSearchedIn)) {
    return document.querySelector(componentToBeSearchedIn).querySelector(elementToBeSearchedIn) as HTMLElement;
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

  const childElements: Array<HTMLElement> = getChildren();

  for (const element of childElements) {
    //search for string value and disable all elements not containing it
    if (!element.textContent.toLowerCase().includes(input)) {
      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.opacity = "0";
    }
  }
}


function resetSearch() {

  const childElements: Array<HTMLElement> = getChildren();

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

function componentNotFound() {
  if (!searchedElement) {
    const errorMessage: string = "We looked everywhere, but the element you want to search in cannot be found."
    const tipps:string=
    "Try checking the spelling of your element.\n\n" +
    `If you want to search within a component that has a shadow root, make sure to use the component-property (component="COMPONENT-NAME").\n\n` +
    "When searching for an element by id, put a hastag (#) in front of the id.\n" +
    "When searching by class, put a dot (.) in front of the class name.\n" +
    "If you are searching by type you do not need to put anything in front of the type name (e.g. element='ul').\n";

    console.log("%c\n" + errorMessage,
      "color:orangered; font-weight:bold;font-family:'Open sans', sans-serif;line-height:22pt"
    );
    console.log("%c\n" + tipps,
    "color:darkgreen; font-weight:bold;font-family:'Open sans', sans-serif;line-height:14pt"
  );
  }
}