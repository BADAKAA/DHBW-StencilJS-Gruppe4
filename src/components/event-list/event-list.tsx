import { Component, Host, Element, h } from '@stencil/core';

let eventData: any;

let componentElement: ShadowRoot;
let listElement: HTMLUListElement;
let expanded: boolean = false;
@Component({
  tag: 'event-list',
  styleUrl: 'event-list.css',
  shadow: true,
})
export class EventList {
  @Element() el:HTMLElement;
  render() {
    return (
      <Host>
        <ul class="eventList"></ul>
      </Host>
    );
  }
  componentDidLoad() {
    referenceObjects(this.el);  
    //Event data is fetched AFTER elements have been referenced. Otherwise, there would be nowhere to append elements in fillList()
    fetch('../data/event-data.json')
      .then(results => results.json())
      .then(data => {
      eventData = data.events;
      fillList();
      console.log(`%cEvent data was last updated ${data.lastUpdated}.`, "color:darkgreen; font-family:'Open Sans', sans-serif;line-height:20pt")
      })
    addButtons();
  }
}

function referenceObjects(hostElement:HTMLElement) {
  componentElement = hostElement.shadowRoot;
  listElement = componentElement.querySelector("ul");
}

function fillList() {

  listElement.innerHTML = "";
  for (const event of eventData) {

    const listItem: HTMLElement = document.createElement("LI");

    listItem.innerHTML = `<h2 class="eventTitle">${event.title}</h2>
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
    listItem.addEventListener("click", () => expandItem(listItem));
    listElement.appendChild(listItem);
    
  }
}

function expandItem(listItem: HTMLElement) {

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
  const convertedDate:Date = new Date(date);
  return getDay(convertedDate.getDay()) +", "+ dateComponents[2] + "." + dateComponents[1] + "." + dateComponents[0];
}

function getDay(weekdayNumber:number):string {

  const weekdays:Array<string> = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ]
  return weekdays[weekdayNumber];
}
//This code adds a buttons to collapse or expand all elements and to sort items.
//It is used by calling the  the addButton() function in componentDidLoad().
let detailButton: HTMLElement;
let sortButton: HTMLElement;

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
    } else if (expanded) {
      info.style.display = "contents";
      details.style.display = "none";
      detailButton.textContent = "Show Details";
    }
  }
  expanded = !expanded;
}

function sortItems() {


  if (sortButton.textContent.includes("↓")) {
    sortButton.textContent = "Sort Items ↑";
    eventData.sort(compareDescending);

  } else {
    sortButton.textContent = "Sort Items ↓";
    eventData.sort(compareAscending);
  }

  fillList();
}

function compareAscending(a, b) {
  //sorting function adapted from https://stackoverflow.com/a/1129270
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function compareDescending(a, b) {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}