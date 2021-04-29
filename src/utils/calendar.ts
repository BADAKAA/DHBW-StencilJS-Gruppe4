import { CalendarEntry } from './calendar-entry';

export class Calendar {
  readonly year: number;
  readonly month: number;
  readonly monthsInCalendarWithThreeRows = 12;

  public monthInCalendar = this.monthsInCalendarWithThreeRows;

  private fillStartCount = 0;
  private fillEndCount = 0;
  private currentYearCount: number;
  private fillCount = [6, 0, 1, 2, 3, 4, 5];

  /*constructor(year: number) {
    this.year = year;
  }*/

  public getCalendarMonths(): number[] {
    const monthsOfCurrentYear = this.getMonthsOfCurrentYear();
    const fillStartCount = this.fillCount[this.getFirstMonthOfYear()];
    const fillEndCount = this.monthsInCalendarWithThreeRows - (monthsOfCurrentYear.length + fillStartCount);

    this.currentYearCount = monthsOfCurrentYear.length;
    this.fillStartCount = fillStartCount;
    this.fillEndCount = fillEndCount;

    const fillStart = fillStartCount > 0 ? this.getMonthsOfLastYear(fillStartCount) : [];
    const fillEnd = this.getMonthsOfNextYear(fillEndCount);


    return fillStart.concat(monthsOfCurrentYear).concat(fillEnd);
  }

  private getMonthsOfCurrentYear(): number[] {
    return this.getMonthsOfYear(this.year);
  }

  private getMonthsOfLastYear(fillStartCount: number): number[] {
    const monthsOfYear = this.getMonthsOfYear(this.year - 1);

    return monthsOfYear.slice(-fillStartCount);
  }

  private getMonthsOfNextYear(endCount: number): number[] {
    const monthsOfYear = this.getMonthsOfYear(this.year + 1);

    let slicedDays;
     if (endCount === 7 && (this.currentYearCount + this.fillStartCount) === 28) {
      endCount = this.monthsInCalendarWithThreeRows - (this.currentYearCount + this.fillStartCount);
      slicedDays = monthsOfYear.slice(0, endCount);
      this.monthInCalendar = this.monthsInCalendarWithThreeRows;
      this.fillEndCount = endCount;
    } else {
      slicedDays = monthsOfYear.slice(0, endCount);
    }
    return slicedDays;
  }

  private getMonthsOfYear(year: number): number[] {
    const monthsOfYear = new Date(year, 0).getDate();

    return Array.from({length: monthsOfYear}, (_, i) => i + 1);
  }

  public getFirstMonthOfYear(): number {
    return new Date(this.year - 1, 1).getMonth(); //mus die 1 nach dem Komme evtl weg?
  }

  public getFillStartCount(): number {
    return this.fillStartCount;
  }

  public getFillEndCount(): number {
    return this.fillEndCount;
  }

  public static getToday(): CalendarEntry {
    return {
      month: new Date().getDate(),
      year: new Date().getFullYear() + 1,
    };
  }
}