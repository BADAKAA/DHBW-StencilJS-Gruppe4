import { Prop, Component, h, Host, Element } from '@stencil/core';
import { getSearchedElement } from '../../utils/findElement';
import { searchDate } from '../../utils/searchElement';

const monthNames: Array <string> = [
  'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
];
const year: number = new Date().getFullYear();

let componentElement: ShadowRoot;
let datePickerElement: HTMLDivElement;
let backgroundElement: HTMLDivElement;
let yearBox: HTMLElement;
let searchedElement: HTMLElement;
/*let elementColor: HTMLDivElement;*/


@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})


export class DatePicker {

  @Prop() backgroundcolor: string;
  @Prop() width: string;
  @Prop() monthcolor: string;
  @Prop() component?: string;
  @Prop() element: string;


  @Element() el: HTMLElement;

constructor(){
  //code copied from search-bar.tsx to find searched element
  const checkIfElementIsReady: number = setInterval(() => {
    searchedElement = getSearchedElement(this.component, this.element);

    if (searchedElement) {
      clearInterval(checkIfElementIsReady);
    }
  }, 500);
}

  componentDidLoad() {
    componentElement = this.el.shadowRoot;
    const datePickerFrame = componentElement.querySelector('#datePickerFrame') as HTMLDivElement; //wenn die component geladen hat, wird ein Div element genommen und darin die Monate dargestellt  
    this.initialiseMonths(datePickerFrame);

    
    datePickerElement = componentElement.querySelector('.datePicker');
    backgroundElement = componentElement.querySelector('#datePicker');
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
      backgroundElement.style.background = this.backgroundcolor;
    }

  }

  initialiseMonths(datePickerFrame: HTMLDivElement) {

    for (const monthName of monthNames) {
      const monthBox = document.createElement('DIV') as HTMLDivElement;
      monthBox.className = 'monthBoxes';
      monthBox.textContent = monthName;
      monthBox.addEventListener('click', (ev) => monthClicked(ev));
      datePickerFrame.appendChild(monthBox);
    }
  };

  /*initialiseYears(headerYears:HTMLDivElement){
  
    for(const years of yearNames){
      const yearBox = document.createElement('DIV') as HTMLDivElement;
      yearBox.className='yearBoxes';
      yearBox.textContent = years;
      headerYears.appendChild(yearBox);
    }
  }
  
  /*MouseOver(){
    elementColor= componentElement.querySelector('.monthBoxes')
  
    if(this.monthcolor){
      elementColor.style.backgroundColor=this.monthcolor;
    }
  }
  
  MouseOut(){
    elementColor= componentElement.querySelector('.monthBoxes')
  
    if(this.monthcolor){
      elementColor.style.backgroundColor="";
    }
  }*/



  render() {
    return (
      <Host>
        <div class='datePicker'>
          <div class='Header'>
            <span id='previous'
              onClick={() => changeYear('-')}>
              {'<'}
            </span>
            <span id='year'>{year.toString()}</span>
            <span id='next'
             onClick={() => changeYear('+')}>
              {'>'}
            </span>
          </div>
          <div id='datePickerFrame'
        /*onMouseMove={() => this.MouseOver()}
        onMouseOut={() => this.MouseOut()}*/>
          </div>
        </div>
      </Host>
    );
  }

}

function monthClicked(ev: MouseEvent) {
  const monthElement = ev.target as HTMLDivElement;
  clearMonthColor();
  monthElement.style.background = '#941C2F';
  monthElement.style.color = '#fffcf9';

  const month: number = monthNames.indexOf(monthElement.textContent);
  searchDate(month.toString() + "." + yearBox.textContent, searchedElement);
  console.log(month.toString() + "." + yearBox.textContent);
}


function changeYear(direction: string) {
  let year: number = parseInt(yearBox.textContent);
  if (direction === '-') {
    year--;
  }

  if (direction === '+') {
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


