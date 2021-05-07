import { Prop, Component, h, Host, Element } from '@stencil/core';
import { getSearchedElement } from '../../utils/findElement';
import { clearDateSearch, resetSearch, searchDate } from '../../utils/searchElement';

const monthNames: Array <string> = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez'
];
const year: number = new Date().getFullYear();

let yearBox: HTMLElement;
let componentElement: ShadowRoot;
let datePickerElement: HTMLDivElement;
let searchedElement: HTMLElement;


@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})


export class DatePicker {

  @Prop() backgroundcolor: string;
  @Prop() width: string;
  @Prop() component?: string;
  @Prop() element: string;

  @Element() el: HTMLElement;

  constructor(){
    //code to find searched element copied from search-bar.tsx 
    const checkIfElementIsReady: number = setInterval(() => {
        searchedElement = getSearchedElement(this.component, this.element);
        if (searchedElement) {
        clearInterval(checkIfElementIsReady);
        }
    }, 500);
  }

  componentDidLoad() {
    componentElement = this.el.shadowRoot;
    const datePickerFrame = componentElement.querySelector('#datePickerFrame') as HTMLDivElement; 
    this.initialiseMonths(datePickerFrame);

    datePickerElement = componentElement.querySelector('.datePicker');
    yearBox = componentElement.getElementById('year');

    //taken from search-bar.tsx
    if (this.width) {
      if (this.width.includes("px") || this.width.includes("%") || this.width.includes("vw")) {
        datePickerElement.style.width = this.width;
      } else {
        console.log('%c Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")', "color:orange; font-weight:bold;font-family:'Open sans'");
        throw new Error('Please input a valid width. Permitted units: "px", "%", "vw" ("vw"="%")');
      }
    }

    if (this.backgroundcolor) {  
      datePickerElement.style.background = this.backgroundcolor;
    }
  }

  //hier werden die Monate dargestellt
  initialiseMonths(datePickerFrame: HTMLDivElement) {

    for (const monthName of monthNames) {
      const monthBox = document.createElement('DIV') as HTMLDivElement;
      monthBox.className = 'monthBoxes';
      monthBox.textContent = monthName;
      monthBox.addEventListener('click', (ev) => monthClicked(ev));
      datePickerFrame.appendChild(monthBox);
    }
  };

 
  render() {
    return (
      <Host>
        <div class='datePicker'>
          <div class='Header'>
            <span id='previous'
              onClick={() => changeYear('-')}>
              {'<'}
            </span>
            <span id='year'>{year}</span>
            <span id='next'
             onClick={() => changeYear('+')}>
              {'>'}
            </span>
          </div>
          <div id='datePickerFrame'>
          </div>
        </div>
      </Host>
    );
  }

}


function monthClicked(ev: MouseEvent) {
  const monthElement = ev.target as HTMLDivElement;

  const monthIndex: number = monthNames.indexOf(monthElement.textContent) + 1;

  let month:string= monthIndex.toString();
  if (month.length < 2) month = "0" + month;
  
  if(monthElement.style.background=="") {
    clearMonthColor();
    //only search when month has not been clicked previously.
    monthElement.style.background = '#941C2F';
    monthElement.style.color = '#fffcf9';
    searchDate(month.toString() + "." + yearBox.textContent, searchedElement);
  } else {
    clearMonthColor();
    clearDateSearch();
    resetSearch();
  }
  

}


function changeYear(direction: string) {
  let year: number = parseInt(yearBox.textContent);
  if(direction === '-') {
    year--;
  }

  if(direction === '+') {
    year++;
  }

  yearBox.textContent = year.toString();
}


function clearMonthColor() {
  const allMonths = document.querySelector('date-picker').shadowRoot.querySelectorAll('.monthBoxes') as unknown as Array<HTMLDivElement>;
  for (const monthBox of allMonths) {
    monthBox.style.background = '';
    monthBox.style.color = '';
  }
}