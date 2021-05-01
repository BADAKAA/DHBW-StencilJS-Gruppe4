import { Component, h, Prop, Host, Element} from '@stencil/core';

const monthNames:Array <string> = [
  'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
]; 

@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})


export class DatePicker {

  @Prop() yearNames = [
    '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'
  ];
  
  @Element() el: HTMLElement;


  
  componentDidLoad(){
   const datePickerFrame=  this.el.shadowRoot.querySelector('#datePickerFrame') as  HTMLDivElement; //wenn die component geladen hat, wird ein Div element genommen und die Monate dargestellt  
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
            <span>
            {'<'}
            {'2021'}
            {'>'}
            </span>
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
}

