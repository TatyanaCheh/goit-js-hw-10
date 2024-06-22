
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('button [data-start]');
const datePickField = document.querySelector('#datetime-picker');
const daysSelect = document.querySelector('[data-days]');
const hoursSelect = document.querySelector('[data-hours]');
const minutesSelect = document.querySelector('[data-minutes]');
const secondsSelect = document.querySelector('[data-seconds]');

let userSelectedDate = null;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date) {
      iziToast.error({
title: 'Error',
message: "Please choose a date in the future",
      });  
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datePickField, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }