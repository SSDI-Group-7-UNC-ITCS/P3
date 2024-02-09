'use strict';
class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
    this.currentDate = new Date();
    this.render(this.currentDate);
  }

  render(selectedDate) {
    const container = document.getElementById(this.id);
    container.innerHTML = ''; // Clear previous content

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    var year = selectedDate.getFullYear();
    var month = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay(); // 0-based index of first day of month

    const table = document.createElement('table');
    table.style.backgroundColor = '#4169E1'; // Set table background color to light gray
    const caption = document.createElement('caption');
    caption.textContent = `${monthNames[month]} ${year}`;
    table.appendChild(caption);

    // Create navigation controls
    const navRow = document.createElement('tr');
    const navCell = document.createElement('td');
    navCell.setAttribute('colspan', '7');

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.className = 'nav-button';
    prevButton.style.padding = '5px 10px'; // Added padding
    prevButton.addEventListener('click', () => {
        month -= 1;
        if (month < 0) {
            month = 11;
            year -= 1;
        }
        this.render(new Date(year, month, 1));
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.className = 'nav-button';
    nextButton.style.padding = '5px 10px'; // Added padding
    nextButton.addEventListener('click', () => {
        month += 1;
        if (month > 11) {
            month = 0;
            year += 1;
        }
        this.render(new Date(year, month, 1));
    });

    navCell.appendChild(prevButton);
    navCell.appendChild(nextButton);
    navRow.appendChild(navCell);
    table.appendChild(navRow);

    // Create header row with abbreviations for days of the week
    const headerRow = document.createElement('tr');
    for (const day of daysOfWeek) {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Create calendar cells
    let currentDate = 1;
    const weeksInMonth = Math.ceil((startingDay + daysInMonth) / 7);
    var month1=month;
    var year1=year;
    for (let i = 0; i < weeksInMonth; i++) {
        const weekRow = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if ((i === 0 && j >= startingDay) || (i > 0 && currentDate <= daysInMonth)) {
                cell.textContent = currentDate;
                if (currentDate === selectedDay) {
                    cell.classList.add('selected');
                }
                cell.addEventListener('click', (event) => {
                    const clickedDate = parseInt(event.target.textContent,10);
                    this.callback(this.id, { month: month1 + 1, day: clickedDate, year: year1 });
                    // Remove highlight from previously selected date
                    table.querySelectorAll('.selected').forEach((selectedCell) => {
                        selectedCell.classList.remove('selected');
                    });
                    // Highlight newly selected date
                    event.target.classList.add('selected');
                });
                currentDate++;
            } else {
                const daysFromPrevMonth = (7 * i + j + 1) - startingDay;
                if (daysFromPrevMonth <= 0) {
                    const prevMonthLastDay = new Date(year, month, 0).getDate();
                    cell.textContent = prevMonthLastDay + daysFromPrevMonth;
                } else if (daysFromPrevMonth > daysInMonth) {
                    cell.textContent = daysFromPrevMonth - daysInMonth;
                } else {
                    cell.textContent = daysFromPrevMonth;
                }
                cell.classList.add('other-month');
            }
            weekRow.appendChild(cell);
        }
        table.appendChild(weekRow);
    }

    container.appendChild(table);
}








}
