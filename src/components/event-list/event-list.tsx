import { Component, Host, Element, Prop, h } from '@stencil/core';

let eventData: Array<event>;

let componentElement: ShadowRoot;
let listElement: HTMLUListElement;
let detailButton: HTMLElement;
let sortButton: HTMLElement;
let expanded: boolean = false;
let previousYears: Array<number> = [];

export interface event {
  title:string,
  date:string,
  start?:string,
  end?:string,
  city?:string,
  location?:string,
  adress?:string,
  description?:string,
  image?:string
}

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
    
    checkIfYearIsNew(date);

    const listItem: HTMLElement = document.createElement("LI");

    const listItemContent:string= `
    <div class="date">
      <small>${getMonth(date)}</small>
      <p class="dateNumber">${getDay(date)}</p>
    </div>
    <div class="event">
        <h5 class="time"><p class='weekday'>${event.start+' – '+event.end+' Uhr'}</p></h5>
      <h2 class="eventTitle">${event.title}</h2>
      <div class="info">
        <h3 class="city">${event.city}</h3> ${event.location}
      <p class="description">${event.description}</p>
      </div>
      <div class="details" style='display:none'>
        <h4 class="adress"><p class="detail">Adress 📍</p>${event.adress}</h4>
        <h4 class="adress"><p class="detail">Location </p>${event.location}</h4>
        <h4 class="clickDate"><p class="detail">Date <small>📅</small></p>${getDayName(date)+", "+(convertDate(date))}</h4>
        <h4><p class="detail">Time</p>${event.start} – ${event.end} Uhr </h4> 
        <h4 style="margin-top:0.5em"><p class="detail">Description</p></h4>
        <div style='text-align: justify'>
          <p class="eventText">${event.description}</p>
        </div>
      </div>
    </div>
    <div class="eventImage" style="background-image:${"url("+getImageLink(event)+")"}">
    </div>`

    listItem.innerHTML= listItemContent;
    listItem.addEventListener("click", () => expandItem(listItem));
    listItem.querySelectorAll(".adress").forEach(a=> a.addEventListener("click", () => openAdress(event.adress)));
    listItem.querySelector(".clickDate").addEventListener("click", () => openDate(event.date));
    listElement.appendChild(listItem);
  }
}

function getImageLink(event:event) {
  if(!event.image) {
    //retun link to stock image in case no image link was specified.
    return "https://images.unsplash.com/photo-1529651737248-dad5e287768e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1901&q=80";
  }
  return event.image;

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

function openAdress(adress:string) {

    const url = 'https://www.google.com/maps/place/' + adress;
    window.open(url, '_blank');
}


function openDate(input:string) {

  const date:Date= new Date(input);
  const day:string= date.getFullYear() + "/" + (date.getMonth()+1).toString() + "/" +  date.getDate();
  const url = 'https://calendar.google.com/calendar/u/0/r/day/' + day;
  
  window.open(url, '_blank');
}
function expandItem(listItem: HTMLElement) {

  const info = listItem.querySelector(".info") as HTMLElement;
  const details = listItem.querySelector(".details") as HTMLElement;

  if (details.style.display == "none") {
    info.style.display = "none";
    details.style.display = "contents";
    listItem.style.cursor="auto"
  } else {
    info.style.display = "contents";
    details.style.display = "none";
    listItem.style.cursor="pointer";
  }
}


function convertDate(date: Date) {
let day:string= date.getDate().toString();
if (day.length < 2) day = "0" + day;
let month:string= (date.getMonth()+1).toString();
if (month.length < 2) month = "0" + month;

  return day + "." + month + "." + date.getFullYear();
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
  //this function forces all elements to collapse or expand, reagrdless of their current state
  const listItems = componentElement.querySelectorAll("LI") as unknown as Array<HTMLElement>;

  for (const listItem of listItems) {
    const info = listItem.querySelector(".info") as HTMLElement;
    const details = listItem.querySelector(".details") as HTMLElement;
  
    if (!expanded) {
      detailButton.textContent="Hide Details";
      info.style.display = "none";
      details.style.display = "contents";
      listItem.style.cursor="auto"
    } else {
      detailButton.textContent="Show Details";
      info.style.display = "contents";
      details.style.display = "none";
      listItem.style.cursor="pointer";
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
    let gridStyle: string = "1.5fr 9fr 6fr";
  
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