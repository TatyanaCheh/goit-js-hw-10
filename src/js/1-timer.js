import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  datePickField: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
   days: document.querySelector('[data-days]'),
   hours: document.querySelector('[data-hours]'),
   minutes: document.querySelector('[data-minutes]'),
   seconds: document.querySelector('[data-seconds]'),
};

refs.startButton.disabled = true;

let userSelectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.show({
      title: 'Error',
      message: "Please choose a date in the future",
      titleColor: '#fff',
      titleSize: '16px',
      position: 'topRight',
      backgroundColor: '#ef4040',
      progressBarColor: '#B51B1B',
      });  
      refs.startButton.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      refs.startButton.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);


refs.startButton.addEventListener('click', () => {
  intervalId = setInterval(() => {
    const differenceInTime = userSelectedDate - Date.now();
    if(differenceInTime > 0) {
    const time = convertMs(differenceInTime);
    refs.days.textContent = time.days.toString().padStart(2, 0);
    refs.hours.textContent = time.hours.toString().padStart(2, 0);
    refs.minutes.textContent = time.minutes.toString().padStart(2, 0);
    refs.seconds.textContent = time.seconds.toString().padStart(2, 0);
  }else {
    clearInterval(intervalId);
  }
    refs.datePickField.disabled = true;
    refs.startButton.disabled = true;
}, 1000)
});

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


  
