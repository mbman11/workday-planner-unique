$(function () {
  // Function to save user input in local storage
  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  // Function to get user input from local storage
  function getFromLocalStorage(key) {
    return localStorage.getItem(key);
  }



  // Function to update the time block classes based on the current time
  function updateClasses() {
    // Get the current hour in 24-hour format using Day.js
    const currentHour = dayjs().format('H');

    // Loop through each time block
    $('.time-block').each(function () {
      const blockHour = parseInt($(this).attr('id').split('-')[1]);

      // Add or remove past, present, and future classes based on the current hour
      if (blockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (blockHour == currentHour) {
        $(this).addClass('present').removeClass('past future');
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }

  // Function to set user input to the corresponding textarea elements
  function setUserInput() {
    $('.time-block').each(function () {
      const blockId = $(this).attr('id');
      const userInput = getFromLocalStorage(blockId);
      $(this).find('.description').val(userInput);
    });
  }

  // Function to display the current date in the header of the page
  function displayCurrentDate() {
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  }

  // Event listener for click events on the save button
  $('.saveBtn').on('click', function () {
    const timeBlockId = $(this).closest('.time-block').attr('id');
    const userInput = $(this).siblings('.description').val();

    // Save user input in local storage
    saveToLocalStorage(timeBlockId, userInput);
  });

  // Call functions to initialize the page
  updateClasses();
  setUserInput();
  displayCurrentDate();
});
