import { Component, h, Prop, Host } from '@stencil/core';

//https://pguso.medium.com/create-a-calendar-with-stencil-js-web-component-deb091456df3 
@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})


export class DatePicker {

  @Prop() monthNames = [
    'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
  ];
  @Prop() yearNames = [
    '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'
  ];
  

  
  componentDidLoad(){

  }




  render() {
    return (
      <Host>
      <header>
        <span>
        {'<'}
        </span>
        <span>{this.monthNames}</span>
        <span>
        {'>'}
        </span>
      </header>
      
      <div id= 'datePickerFrame'>
      </div>
      </Host>
    );
  }
}
