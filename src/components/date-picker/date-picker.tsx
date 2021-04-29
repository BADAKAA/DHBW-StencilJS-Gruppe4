import { Component, h, Prop, State, Event, Watch, EventEmitter } from '@stencil/core';
import { CalendarEntry } from '../../utils/calendar-entry';
import { Calendar} from '../../utils/calendar';

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
  @Prop() showFillDays = true;


@State() date = Calendar.getToday();
@State() MonthInYear: number[];
@State() selectedDate: CalendarEntry;
@State() eventDates = [];

private fillStartCount: number;
private fillEndCount: number;
readonly today: CalendarEntry;

@Event({
  eventName?: 'monthChanged',
  bubbles?: true,
  cancelable?: true,
  composed?: true,
}) monthChanged: EventEmitter<CalendarEntry>;
  
@Event({
  eventName: 'yearChanged',
  bubbles?: true,
  cancelable?: true,
  composed?: true,
}) yearChanged: EventEmitter<CalendarEntry>;
  
  
constructor() {
  this.today = Calendar.getToday();
}

//when the date gets changed, watchDate will change the selected date and give it another styling
@Watch('month')
watchDate(date: CalendarEntry): void {
  if ('year' in date) {
    this.selectedDate = date;
  }
}

componentWillLoad() {
  this.setCalendarDetails();
}



getValidDate(): CalendarEntry {
  let date = this.date;
  if (!('month' in this.date && 'year' in this.date)) {
    date = this.today;
  }
  return date;
}


setCalendarDetails(): void {
  const date = this.getValidDate();
  const calendar = new Calendar(date.year);
  this.MonthInYear = calendar.getCalendarMonths();

  

monthChangedHandler(calendarEntry: CalendarEntry): void {
 let event = this.monthChanged.emit(calendarEntry);
}

monthSelectedHandler = (month): void => {
  this.selectedDate = {
    month: this.date.month,
    year: this.date.year
  };
  this.monthChangedHandler(this.selectedDate);
}

yearChangedHandler(calendarEntry: CalendarEntry): void {
  this.yearChanged.emit(calendarEntry);
}






switchToPreviousYear = (): void => {
  if (this.date.year !== 1) {
    this.date.year -= 1;
  } else {
    this.date.year = 10;
  }

  if (typeof this.date !== 'undefined') {
    delete this.date.month;
  }

  this.setCalendarDetails();
  this.yearChangedHandler(this.date);
}

switchToNextyear = (): void => {
  //wenn ich auf weiterklicke, dann
    this.date.month += 1;
  }

  delete this.date.month;

  this.setCalendarDetails();
  this.monthChangedHandler(this.date);
}

getDigitClassNames = (month: number, year: number, index: number): string => {
  let classNameDigit = [];
  if (month.toString().length === 1) {
    classNameDigit.push('padding-single-digit');
  }

  if (this.isToday(month, year, index)) {
    classNameDigit.push('active');
  }

  if (this.isSelectedMonth(month, index)) {
    classNameDigit.push('selected');
  }

  if (this.eventDates.includes(month)) {
    classNameDigit.push('has-event');
  }

  return classNameDigit.join(' ');
}

isToday(month: number, year: number, index: number): boolean {
  return this.today.month === month
    && this.today.year === year
    && this.today.year === year
    && !(index < this.fillStartCount || index >= this.fillEndCount);
}

isSelectedMonth(month:number, index: number) {
  return typeof this.selectedDate !== 'undefined'
    && this.selectedDate.month === month
    && this.selectedDate.year === this.date.year
    && !(index < this.fillStartCount || index >= this.fillEndCount);
}



  render() {
    const date = this.getValidDate();
    
    return (
      <div class="calendar material">
      <header>
        <span onClick={this.switchToPreviousYear}>
          {'<'}
        </span>
        <span>{this.yearNames[date.year - 1]}</span>
        <span onClick={this.switchToNextYear}>
           {'>'}
        </span>
      </header>
      <div class="month-names">
        {this.monthNames.map(monthName => <span>{monthName}</span>)}
      </div>
      <div class="months-in-year">
        {this.MonthInYear.map((month, index) => {
          const classNameDigit = this.getDigitClassNames(month, date.year, index);
          if (index < this.fillStartCount || index >= this.fillEndCount) {
            return (
              <span class="disabled">{this.showFillDays ? month : ''}</span>
            );
          } else {
            return (
              <span onClick={() => this.monthSelectedHandler(month)}>
                <i class={classNameDigit}>
                  {month}
                </i>
              </span>
            );
          }
        })}
      </div>
    </div>
    );
  }

}
