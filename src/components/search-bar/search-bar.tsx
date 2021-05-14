//The main logic fpr the search bar comes from this tutorial:
//https://www.youtube.com/watch?v=3NG8zy0ywIk

import { Component, Host, h, Prop, Element, } from '@stencil/core';
import { componentNotFound, getSearchedElement } from '../../utils/findElement';
import { clearSearchTerm, resetSearch, searchElement } from '../../utils/searchElement';

//variables to control this component
let componentElement: ShadowRoot;
let searchBarContainer: HTMLElement;
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

  @Element() el: HTMLElement;
  
  @Prop() component: string;
  @Prop() element: string;
  @Prop() position: string;
  @Prop() icon: string;
  @Prop() width: string;
  @Prop() height?: string;
  @Prop() google: string;
  @Prop() offset?: string;
  @Prop() justify?: string;
  @Prop() margin?: string;
  @Prop() design?: string;
  @Prop() background?: string;

  render() {
    return (
      <Host>
        <div class="searchBarContainer">
          <div class="searchBarFrame">
            <img class="searchIcon" src="./assets/search.png"></img>
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
      searchBar.addEventListener("keypress", (e) => { if (e.key == "Enter") googleSearch() });
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
        componentNotFound(searchedElement);
      }, 10000);
    }
    //apply user input style porperties
    if (this.offset) searchBarFrame.style.transform += ` translateY(${this.offset})`;

    if (this.position && this.position == "absolute") searchBarContainer.style.position = "absolute";

    if (this.margin) searchBarFrame.style.margin = this.margin;

    if (this.icon) searchIcon.style.background = this.icon;

    if (this.background) searchBar.style.background = this.background;

    if (checkIfValid(this.width)) searchBarFrame.style.width = this.width;

    if (checkIfValid(this.height)) searchBarFrame.style.height = this.height;

    style(this.design);

    if (this.justify) {
      let justify = "center";

      if (this.justify == "right") justify = "flex-end";
      if (this.justify == "left") justify = "flex-start";

      searchBarContainer.style.justifyContent = justify;
    }
  }

  initializeSearchBar() {
    searchBar.addEventListener("input", search);
    searchBar.addEventListener("keypress", (e) => { if (e.key == "Enter") clearSearch() });
    searchIcon.addEventListener("click", () => clearSearch());
    searchedElement = getSearchedElement(componentToBeSearchedIn, elementToBeSearchedIn);
    console.log("%cSearch bar target found.\nThis is the element the seach bar is active in: ",
      "color:darkgreen; font-weight:bold;font-family:'Open sans', sans-serif;line-height:12pt");
    console.log(searchedElement);
  }
}

function clearSearch() {
  searchBar.value = "";
  search();
  /*
    If this  function was not called, the search term would remain in "searchElement.ts".
    This would not cause any Problems with the search bar itself, as the search term in "searchElement.ts" is reset on a new search. 
    However, the next search with the date picker would only return results that match both the date and the last search term.
    This is because picking a date should preserve the search term.
    Thus, the date picker starts a search without an input search value.
    Because the search function only changes the search term when an input is received, the last term would remain.
  */
  clearSearchTerm();
}

function search() {

  const input: string = searchBar.value.toLowerCase();
  if (searchBar.value !== "") {
    searchIcon.src = "./assets/clear.png";
    searchElement(searchedElement, input);

  } else {
    searchIcon.src = "./assets/search.png";
    resetSearch();
  }
}

function googleSearch() {
  //code adapted  from https://stackoverflow.com/a/16649417
  const input: string = searchBar.value;
  const url = 'http://www.google.com/search?q=' + input;
  window.open(url, '_blank');
}

function style(design: string | undefined) {

  if (design && design == "angular") {
    searchBar.style.borderRadius = "0px";
    searchIcon.classList.add("angular")

  } else {
    searchIcon.classList.add("round");  
    searchBar.style.borderRadius = (searchBar.offsetHeight/2).toString()+"px";
  }
  searchBar.style.paddingLeft = (1.5*searchIcon.offsetHeight).toString()+"px";
}

function checkIfValid(input: string): boolean {
  if (!input) return false;
  if (input.includes("px") || input.includes("%") || input.includes("vw")) return true;
  console.log('%cPlease input a valid width or height. Permitted units are: "px", "%", "vw" ("vw"="%")', "color:darkorange; font-weight:bold;font-family:'Open sans'");
  return false;
}