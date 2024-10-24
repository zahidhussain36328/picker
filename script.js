const centuryCells = document.querySelectorAll('#century .cell');
const tensCells = document.querySelectorAll('#tens .cell');
const onesCells = document.querySelectorAll('#ones .cell');
const monthCells = document.querySelectorAll('#month .cell');
const dayTensCells = document.querySelectorAll('#day-tens .cell');
const dayOnesCells = document.querySelectorAll('#day-ones .cell');

let selectedCentury = '';
let selectedTens = '';
let selectedOnes = '';
let selectedMonth = '';
let selectedDayTens = '';
let selectedDayOnes = '';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function updateSelectedDate() {
  if (selectedCentury && selectedTens !== '' && selectedOnes !== '' && selectedMonth !== '' && selectedDayTens !== '' && selectedDayOnes !== '') {
    const year = selectedCentury + selectedTens + selectedOnes;
    const month = parseInt(selectedMonth); // Month is zero-indexed (0-11)
    const day = parseInt(selectedDayTens + selectedDayOnes); // Day as integer

    // Validate day for months
    if (day > 31 || (month === 1 && day > 29) || (["3", "5", "8", "10"].includes(month.toString()) && day > 30)) {
      document.getElementById('day-of-week').textContent = 'Day of the Week: Invalid Day';
      document.getElementById('selected-date').textContent = `Selected Date: ${month + 1}/${day}/${year}`;
      return;
    }

    const fullDate = `${month + 1}/${day}/${year}`; // Month +1 to correct for zero-indexing
    const date = new Date(year, month, day);
    const dayOfWeek = weekdays[date.getDay()];

    document.getElementById('selected-date').textContent = `Selected Date: ${fullDate}`;
    document.getElementById('day-of-week').textContent = `Day of the Week: ${dayOfWeek}`;
  }
}

function handleSelection(cells, updateFunction) {
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      // Deselect all
      cells.forEach(c => c.classList.remove('active'));
      // Mark the clicked cell as active
      cell.classList.add('active');
      // Set the selected value
      updateFunction(cell.dataset.value);
      updateSelectedDate();
    });
  });
}

// Refresh page when button is clicked
const refreshBtn = document.querySelector('.refresh');
refreshBtn.addEventListener('click', function() {
    location.reload();
})

// Note the value here!!
handleSelection(centuryCells, (value) => { selectedCentury = value; });
handleSelection(tensCells, (value) => { selectedTens = value; });
handleSelection(onesCells, (value) => { selectedOnes = value; });
handleSelection(monthCells, (value) => { selectedMonth = value; });
handleSelection(dayTensCells, (value) => { selectedDayTens = value; });
handleSelection(dayOnesCells, (value) => { selectedDayOnes = value; });


// Function to show the pop-up
let openInstructions = document.getElementById('open')
openInstructions.addEventListener('click', function() {
  document.getElementById("instructionsPopup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
})

// Function to hide the pop-up
let closeInstructions = document.getElementById('close');
closeInstructions.addEventListener('click', function() {
    document.getElementById("instructionsPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
})