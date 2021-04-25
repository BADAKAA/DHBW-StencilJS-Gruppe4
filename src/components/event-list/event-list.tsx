const data:any= 
{
  "lastupdated":"2021-04-25",
  "events": [
      {
          "title":"Jacob Collier World Tour",
          "date":"2022-02-16",
          "time":"18:00",
          "location":"Frankfurt",
          "description":"A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart."
      },
      {
          "title":"Ballroom Party",
          "date":"2022-08-02",
          "time":"20:00",
          "location":"Berlin",
          "description":"I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents."
      },
      {
          "title":"Cory Henry Live",
          "date":"2022-01-31",
          "time":"19:00",
          "location":"Stuttgart",
          "description":"I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now."
      },
      {
          "title":"Rhetoric course",
          "date":"2021-12-14",
          "time":"09:30",
          "location":"Munich",
          "description":"When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary.  I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine."
      }
  ]
};



import { Component, Host, h } from '@stencil/core';

let componentElement:ShadowRoot;
let listElement:HTMLUListElement;

@Component({
  tag: 'event-list',
  styleUrl: 'event-list.css',
  shadow: true,
})
export class EventList {

  render() {
    return (
      <Host>
        <div class="buttonFrame">
        </div>
        <ul class="eventList"></ul>
        
      </Host>
    );
  }
  componentDidLoad() {
    referenceObjects();
    fillList();
  }

}

function referenceObjects() {
  componentElement = document.querySelector("event-list").shadowRoot;
  listElement =        componentElement.querySelector("ul");
}

function fillList() {

  for (const event of data.events) {

    const listItem:HTMLElement = document.createElement("LI");

    listItem.innerHTML=`<h2 class="eventTitle">${event.title}</h2>
                        <div class="info">
                        <h3>${event.location}</h3>
                        <p>${(convertDate(event.date))}</p>
                        </div>
                        <div class="details" style='display:none'>
                        <p><h4>Date: </h4>${(convertDate(event.date))}</p>
                        <p><h4>Time: </h4>${event.time}</p>
                        <p><h4>Location: </h4>${event.location}</p>
                        <p><h4>Description: </h4>${event.description}<p>
                        </div>`
                        
    listItem.querySelector(".eventTitle").addEventListener("click", (ev)=>expandItem(ev.target));
    listElement.appendChild(listItem);
    
  }

}
function expandItem(heading:any) {
  
  const listItem=heading.parentElement as HTMLElement;
  const info = listItem.querySelector(".info") as HTMLElement;
  const details = listItem.querySelector(".details") as HTMLElement;

  if (details.style.display=="none") {
  info.style.display="none";
  details.style.display="contents";
  } else {
    console.log("okay?");
    info.style.display="contents";
    details.style.display="none";
  }
}


function convertDate(date:string) {

const dateComponents:Array<string> = date.split("-");

return dateComponents[2]+"."+ dateComponents[1]+"."+ dateComponents[0];

}

/*

function addButtons() {
  componentElement.innerHTML+= `
          <button class="cta" onClick={()=>expandItems()}>Expand Items</button>
          <button class="cta" onClick={()=>collapseItems()}>Collapse Items</button>
          `
}

function expandItems() {
  
  const listElements = componentElement.querySelectorAll("LI") as unknown as Array<HTMLLIElement>;
  let i:number=0;
  for (const event of data.events) {

    listElements[i].innerHTML=`<h2>${event.title}</h2>
                        <p><h4>Date: </h4>${(convertDate(event.date))}</p>
                        <p><h4>Time: </h4>${event.time}</p>
                        <p><h4>Location: </h4>${event.location}</p>
                        <p><h4>Description: </h4>${event.description}<p>`
    console.log(event);
    i++;
  }
}

function collapseItems() {
  const listElements = componentElement.querySelectorAll("LI") as unknown as Array<HTMLLIElement>;
  let i:number=0;
  for (const event of data.events) {

    listElements[i].innerHTML=` <h2>${event.title}</h2>
                                <h3>${event.location}</h3>
                                <p>${(convertDate(event.date))}</p>`
    console.log(event);
    i++;
  }
}
*/