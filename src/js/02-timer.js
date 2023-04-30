import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const allTimerFields = document.querySelectorAll('div.field>.value');

let intervalTimeId = null;
const calendar = flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'd-m-Y H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startBtn.disabled = false;
    const dateNow = (this.config.defaultDate = new Date());
    const past = selectedDates[0] <= dateNow;
    if (past) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
});
let {
  config: { defaultDate: calendarPresentDate },
} = calendar;
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

function addLeadingZero(value) {
  if (value < 10) {
    return value.padStart(2, '0');
  }
  return value;
}

function timerEndValidation(timeArray) {
  const finished = timeArray.every(el => el === 0);
  if (finished) {
    Notiflix.Report.success('Success', "Now it's time to shine");
    clearInterval(intervalTimeId);
    calendar.element.disabled = false;
  }
}

function renderArray(arrayOfElements, arrayToRender) {
  arrayOfElements.forEach((el, idx) => {
    const stringifyArray = arrayToRender.map(unit => unit.toString());
    el.textContent = addLeadingZero(stringifyArray[idx]);
  });
  timerEndValidation(arrayToRender);
}

function getTimeValuesFormMs(timeInMs) {
  let timeObject = convertMs(timeInMs);

  return Object.values(timeObject);
}

function handleTimeRender() {
  calendarPresentDate = new Date();

  startBtn.disabled = true;
  calendar.element.disabled = true;

  let TimeUntilNowInMs =
    calendar.selectedDates[0].getTime() - calendarPresentDate.getTime();

  renderArray(allTimerFields, getTimeValuesFormMs(TimeUntilNowInMs));

  intervalTimeId = setInterval(() => {
    renderArray(allTimerFields, getTimeValuesFormMs(TimeUntilNowInMs));
    TimeUntilNowInMs -= 1000;
  }, 1000);
}

startBtn.addEventListener('click', handleTimeRender);
