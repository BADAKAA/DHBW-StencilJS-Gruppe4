//The main logic fpr the search bar comes from this tutorial:
//https://www.youtube.com/watch?v=3NG8zy0ywIk

import { Component, Host, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { getSearchedElement } from '../../utils/findElement';
import { clearDateSearch, resetSearch, searchElement } from '../../utils/searchElement';
//variables to control this component
let componentElement: ShadowRoot;
let searchBarContainer:HTMLElement;
let searchBarFrame: HTMLDivElement;
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

  @Element() el: HTMLElement;
  @Event() searchCleared: EventEmitter<string>;


  render() {
    return (
      <Host>
        <div class="searchBarContainer">
          <div class="searchBarFrame">
            <img class="searchIcon" src="/assets/search.png"></img>
            <input type="text" id="searchBar" placeholder="Suche..."></input>
          </div>
        </div>
      </Host>
    );
  }

  componentDidLoad() {
    //declare variables to control this component
    componentElement = this.el.shadowRoot;
    searchBarFrame = componentElement.querySelector(".searchBarFrame");
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
        searchedElement = getSearchedElement(componentToBeSearchedIn, elementToBeSearchedIn);

        if (searchedElement) {
          this.initializeSearchBar();
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
      if (this.position=="relative") {
        searchBarContainer.style.height="60px";
        searchBarFrame.style.transform="translate(-50%)"
      }
    }

    if (this.width) {
      if (this.width.includes("px") || this.width.includes("%") || this.width.includes("vw")) {
        searchBarFrame.style.width = this.width;
      } else {
        console.log('%cPlease input a valid width. Permitted units are: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
        throw new Error('Please input a valid width. Permitted units are: "px", "%", "vw" ("vw"="%")');
      }
    }
    if (this.color) searchIcon.style.background = this.color;
    
  }
  
  clearSearch() {
    if (searchBar.value != "") {
      clearDateSearch();
      resetSearch();
      searchBar.value = "";
      searchIcon.src = "/assets/search.png";
      this.searchCleared.emit("custom value"); 
    }
  }
  search() {

    const input: string = searchBar.value.toLowerCase();
    if (input != "") {
      searchIcon.src = "/assets/clear.png";
      searchElement(searchedElement, input);
    } else {
      this.clearSearch();
    }

  }


  initializeSearchBar() {
    searchBar.addEventListener("keydown", this.search);
    searchIcon.addEventListener("click", ()=> this.clearSearch());
    searchedElement = getSearchedElement(componentToBeSearchedIn, elementToBeSearchedIn);
    console.log("%cSearch bar target found.\nThis is the element the seach bar is active in: ",
      "color:darkgreen; font-weight:bold;font-family:'Open sans', sans-serif;line-height:12pt");
    console.log(searchedElement);
  }
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
    const tipps: string =
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