import { Component, h, Host, Element} from '@stencil/core';

const monthNames:Array <string> = [
  'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
]; 

const  yearNames:Array <string> = [
  '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'
];

@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})


export class DatePicker {

  @Element() el: HTMLElement;


  
  componentDidLoad(){
   const datePickerFrame= this.el.shadowRoot.querySelector('#datePickerFrame') as  HTMLDivElement; //wenn die component geladen hat, wird ein Div element genommen und die Monate dargestellt  
   this.initialiseMonths(datePickerFrame);
  }

initialiseMonths(datePickerFrame:HTMLDivElement){
 
  for(const monthName of monthNames){
     const monthBox = document.createElement('DIV') as HTMLDivElement; //wir erstellen ein neues Div-Element
     monthBox.className='monthBoxes'; //mit dem class name 
     monthBox.textContent =  monthName; //hat als content die monthNames
     monthBox.addEventListener('click', (ev)=> monthClicked(ev) ); //clickevent
     datePickerFrame.appendChild(monthBox);//monthBox an das div element
  }
};



  render() {
    return (
      <Host>
      <div class='datePicker'>
        <div class= 'Header'>
            <span id= 'previous'>
            {'<'}
            </span>
            <span id='year'>
            {'2021'}
            </span>
            <span id= 'next'>
            {'>'}
            </span>
        </div>
        <div id= 'datePickerFrame' >

        </div>
      </div>
      </Host>
    );
  }
}

function monthClicked(ev: MouseEvent) {
  const monthElement = ev.target as HTMLDivElement;
  const monthContent = monthElement.textContent as string;
  clearMonthColor();
  monthElement.style.background= '#941C2F';
  monthElement.style.color='#fffcf9';
}

function clearMonthColor(){
  
  const allMonths= document.querySelector('date-picker').shadowRoot.querySelectorAll('.monthBoxes') as unknown as Array <HTMLDivElement>;
  for(const monthBox of allMonths){
    monthBox.style.background='';
    monthBox.style.color='black';
}
}