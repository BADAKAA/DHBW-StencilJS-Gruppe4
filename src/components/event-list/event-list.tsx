import { Component, Host, Element, Prop, h } from '@stencil/core';

let eventData: any;

let componentElement: ShadowRoot;
let listElement: HTMLUListElement;
let expanded: boolean = false;
let previousYears: Array<number> = [];
@Component({
  tag: 'event-list',
  styleUrl: 'event-list.css',
  shadow: true,
})
export class EventList {
  @Prop() buttons: boolean;
  @Element() el: HTMLElement;
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
        sortItems();
        console.log(`%cEvent data was last updated ${data.lastUpdated}.`, "color:darkgreen; font-family:'Open Sans', sans-serif;line-height:20pt");
        updateLayout();
      })
    
    if (this.buttons) addButtons();
  }
}

function referenceObjects(hostElement: HTMLElement) {
  componentElement = hostElement.shadowRoot;
  listElement = componentElement.querySelector("ul");
}

function fillList() {

  listElement.innerHTML = "";
  previousYears = [];
  for (const event of eventData) {


    const date = new Date(event.date);
    checkIfYearIsNew(date)

    const listItem: HTMLElement = document.createElement("LI");
    /*
    const dateFrame:HTMLDivElement=document.createElement("DIV") as HTMLDivElement;
    dateFrame.className="date";
    dateFrame.innerHTML=`<small>${getMonth(date)}</small> <p class="dateNumber">${getDay(date)}</p>`;
    listItem.appendChild(dateFrame);

    const eventFrame:HTMLDivElement=document.createElement("DIV") as HTMLDivElement;
    dateFrame.className="event";
    dateFrame.innerHTML=`
    <p class="time"><p class="weekday">${getDayName(date)}</p> ${event.start+"–"+event.end+" Uhr"}</p>
    <h2 class="eventTitle">${event.title}</h2>
    <div class="info">
      <h3 class="city">${event.city}</h3> ${event.location}`;
    listItem.appendChild(eventFrame);

*/







    listItem.innerHTML= `
      <div class="date">
        <small>${getMonth(date)}</small>
        <p class="dateNumber">${getDay(date)}</p>
      </div>
      <div class="event">
        <p class="time"><p class='weekday'>${getDayName(date)}</p> ${event.start+' – '+event.end+' Uhr'}</p>
        <h2 class="eventTitle">${event.title}</h2>
        <div class="info">
          <h3 class="city">${event.city}</h3> ${event.location}
        </div>
        <div class="details" style='display:none'>
          <p><h4>Location: </h4>${event.location}</p>
          <p><h4>Date: </h4>${(convertDate(date))}</p>
          <p><h4>Time: </h4>${event.time} Uhr</p>
          <p><h4>Description: </h4>${event.description}<p>
        </div>
      </div>
      <div class="image">
      </div>`
    listItem.addEventListener("click", () => expandItem(listItem));
    listElement.appendChild(listItem);
  }

}

function checkIfYearIsNew(date: Date) {

  const currentYear = date.getFullYear();
  const yearHeader = document.createElement("DIV") as HTMLDivElement;
  yearHeader.className = "yearHeader";

  yearHeader.textContent = currentYear.toString();;

  if (previousYears.indexOf(currentYear) == -1) {

    listElement.appendChild(yearHeader);
    previousYears.push(currentYear);
    listElement.appendChild(document.createElement("HR"));

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


function convertDate(date: Date) {

  return getDay(date) + "." + date.getMonth() + "." + date.getFullYear();
}

function getDayName(date: Date, short?: boolean): string {
  const weekdays: Array<string> = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ]
  if (short) return weekdays[date.getDay()].slice(0, 3).toUpperCase();
  return weekdays[date.getDay()];
}

function getDay(date: Date): string {
  let dateNumber: string = date.getDay().toString();
  if (dateNumber.length < 2) dateNumber = "0" + dateNumber;

  return dateNumber;
}

function getMonth(date: Date): string {
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  return monthNames[date.getMonth()]
}
//This code adds a buttons to collapse or expand all elements and to sort items.
//It is used by calling the  the addButton() function in componentDidLoad().
let detailButton: HTMLElement;
let sortButton: HTMLElement;

function addButtons() {
  const buttonFrame = document.createElement("DIV") as HTMLDivElement;
  buttonFrame.classList.add("buttonFrame");
  detailButton = document.createElement("P");
  detailButton.textContent = "Show Details";
  detailButton.classList.add("detailButton");

  sortButton = document.createElement("P");
  sortButton.textContent = "Sort Items";
  sortButton.classList.add("sortButton");

  componentElement.insertBefore(buttonFrame, listElement);
  buttonFrame.appendChild(detailButton);
  buttonFrame.appendChild(sortButton);

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


//responsiveness
window.addEventListener("resize", updateLayout)

function updateLayout() {
  {
    //Images disapper if viewport width is less than 1000px.
    let imageDisplay: string = "contents";
    let gridStyle: string = "1fr 5fr 3fr";
  
    if (window.innerWidth < 1000) {
      imageDisplay = "none";
      gridStyle = "1fr 6fr"
    }
  
    listElement.querySelectorAll("li").forEach(li => li.style.gridTemplateColumns = gridStyle)
    const images = componentElement.querySelectorAll(".image") as unknown as Array<HTMLElement>;
    for (const image of images) {
      image.style.display = imageDisplay;
    }
  }
}