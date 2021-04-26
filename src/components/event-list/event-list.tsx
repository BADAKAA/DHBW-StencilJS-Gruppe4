import { Component, Host, h } from '@stencil/core';

//fetch event data
let eventData:any;
let eventInformation:any;
fetch('../data/event-data.json')
.then(results => results.json())
.then(data => {eventData=data.events})
.then(()=>fillList())

let componentElement: ShadowRoot;
let listElement: HTMLUListElement;
let expanded:boolean=false;
@Component({
  tag: 'event-list',
  styleUrl: 'event-list.css',
  shadow: true,
})
export class EventList {

  render() {
    return (
      <Host>
        <ul class="eventList"></ul>
      </Host>
    );
  }
  componentDidLoad() {
    referenceObjects();
    addButtons();
  }
}

function referenceObjects() {
  componentElement = document.querySelector("event-list").shadowRoot;
  listElement = componentElement.querySelector("ul");
}

function fillList() {

  listElement.innerHTML="";
  for (const event of eventData) {

    const listItem: HTMLElement = document.createElement("LI");

    listItem.innerHTML =`<h2 class="eventTitle">${event.title}</h2>
                        <div class="info">
                        <h3>${event.location}</h3>
                        <p>${(convertDate(event.date))}</p>
                        </div>
                        <div class="details" style='display:none'>
                        <p><h4>Location: </h4>${event.location}</p>
                        <p><h4>Date: </h4>${(convertDate(event.date))}</p>
                        <p><h4>Time: </h4>${event.time} Uhr</p>
                        <p><h4>Description: </h4>${event.description}<p>
                        </div>`
    listItem.querySelector(".eventTitle").addEventListener("click", (ev) => expandItem(ev.target));
    listElement.appendChild(listItem);
  }
}

function expandItem(heading: any) {

  const listItem = heading.parentElement as HTMLElement;
  const info = listItem.querySelector(".info") as HTMLElement;
  const details = listItem.querySelector(".details") as HTMLElement;

  if (details.style.display == "none") {
    info.style.display = "none";
    details.style.display = "contents";
  } else {
    info.style.display = "contents";
    details.style.display = "none";
  }
}


function convertDate(date: string) {

  const dateComponents: Array<string> = date.split("-");
  return dateComponents[2] + "." + dateComponents[1] + "." + dateComponents[0];
}


//This code adds a button to collapse or expand all elements.
//To use it, call the addButton() function in componentDidLoad().
let detailButton: HTMLElement;
let sortButton:HTMLElement;

function addButtons() {
  detailButton = document.createElement("p");
  detailButton.textContent = "Show Details";
  detailButton.classList.add("detailButton");

  sortButton = document.createElement("p");
  sortButton.textContent = "Sort Items";
  sortButton.classList.add("sortButton");
  
  componentElement.insertBefore(detailButton, listElement);
  componentElement.insertBefore(sortButton, listElement);

  detailButton = componentElement.querySelector(".detailButton");
  detailButton.addEventListener("click", expandAllItems);

  sortButton = componentElement.querySelector(".sortButton");
  sortButton.addEventListener("click", sortItems);
}

function expandAllItems() {

  const listItems = componentElement.querySelectorAll("LI") as unknown as Array<HTMLElement>;

  for (const listItem of listItems) {

    const info = listItem.querySelector(".info") as HTMLElement;
    const details = listItem.querySelector(".details") as HTMLElement;

    if (!expanded) {
      info.style.display = "none";
      details.style.display = "contents";
      detailButton.textContent = "Hide Details";
    } else if (expanded){
      info.style.display = "contents";
      details.style.display = "none";
      detailButton.textContent = "Show Details";
    }
  }
  expanded=!expanded;
}

function sortItems() {
  eventInformation=eventData;

  if (sortButton.textContent.includes("↓")) {
    sortButton.textContent = "Sort Items ↑";
    eventInformation.sort(compareDescending);

  } else {
    sortButton.textContent = "Sort Items ↓";
    eventInformation.sort(compareAscending);
  }
  eventData = eventInformation;
  fillList();
}

function compareAscending( a, b ) {
  //sorting function from https://stackoverflow.com/a/1129270
  if ( a.date < b.date ){
    return -1;
  }
  if ( a.date > b.date ){
    return 1;
  }
  return 0;
}

function compareDescending( a, b ) {
  //sorting function from https://stackoverflow.com/a/1129270
  if ( a.date > b.date ){
    return -1;
  }
  if ( a.date < b.date ){
    return 1;
  }
  return 0;
}