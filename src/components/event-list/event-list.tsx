const data: any = {
  "lastupdated": "2021-04-25",
  "events": [
    {
      "title": "Jacob Collier World Tour",
      "date": "2022-02-16",
      "time": "18:00",
      "location": "Frankfurt",
      "description": "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart."
    },
    {
      "title": "Ballroom Party",
      "date": "2022-08-02",
      "time": "20:00",
      "location": "Berlin",
      "description": "I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents."
    },
    {
      "title": "Cory Henry Live",
      "date": "2022-01-31",
      "time": "19:00",
      "location": "Stuttgart",
      "description": "I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now."
    },
    {
      "title": "Rhetoric Mastery Seminar",
      "date": "2021-12-14",
      "time": "09:30",
      "location": "Munich",
      "description": "When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary."
    },
    {
      "title": "Democracy and the Age of Big Data and AI",
      "date": "2021-09-16",
      "time": "17:00",
      "location": "London",
      "description": "I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine."
    }
  ]
};



import { Component, Host, h } from '@stencil/core';

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
    fillList();
    addButton();
  }

}

function referenceObjects() {
  componentElement = document.querySelector("event-list").shadowRoot;
  listElement = componentElement.querySelector("ul");
}

function fillList() {

  for (const event of data.events) {

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

function addButton() {
  detailButton = document.createElement("p");
  detailButton.textContent = "Show Details";
  detailButton.classList.add("detailButton");
  componentElement.insertBefore(detailButton, listElement);

  detailButton = componentElement.querySelector(".detailButton");
  detailButton.addEventListener("click", expandAllItems);
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