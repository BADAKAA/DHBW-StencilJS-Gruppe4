document.querySelector('example-component').addEventListener('exampleEvent', () => console.log('test'));
//date-picker
const calendar = document.querySelector('date-picker');
calendar.monthNames = [
  'January', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];
calendar.yearNames = [
  '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'
]