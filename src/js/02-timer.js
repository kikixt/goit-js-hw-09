import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const picker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.warning("Please choose a date in the future");
      return;
    }
    startButton.disabled = false;
  },
});

const startButton = document.querySelector("[data-start]");
const fields = document.querySelectorAll(".field");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

let intervalId;

startButton.addEventListener("click", () => {
  intervalId = setInterval(updateTimer, 1000);
});

function updateTimer() {
  const targetDate = picker.selectedDates[0];
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();

  const { days, hours, minutes, seconds } = convertMs(diffMs);

  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);

  if (diffMs <= 0) {
    clearInterval(intervalId);
    Notiflix.Notify.success("Countdown finished!");
  }
}
