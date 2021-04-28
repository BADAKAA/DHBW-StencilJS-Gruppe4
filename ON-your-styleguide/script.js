document.querySelector('example-component').addEventListener('exampleEvent', () => console.log('test'));
//date-picker
const calendar = document.querySelector('my-component');
  calendar.dayNames = [
    'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'So'
  ];
  calendar.monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];