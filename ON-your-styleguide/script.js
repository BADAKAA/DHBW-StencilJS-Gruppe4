document.querySelector('example-component').addEventListener('exampleEvent', () => console.log('test'));
//date-picker
const calendar = document.querySelector('my-component');
calendar.dayNames = [
  'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'
];
calendar.monthNames = [
  'January', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];