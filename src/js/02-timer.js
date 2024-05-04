import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

export function initializeTimer() {
  const picker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1
  });

  const startButton = document.querySelector("[data-start]");
  const daysValue = document.querySelector("[data-days]");
  const hoursValue = document.querySelector("[data-hours]");
  const minutesValue = document.querySelector("[data-minutes]");
  const secondsValue = document.querySelector("[data-seconds]");

  startButton.addEventListener("click", () => {
    const selectedDate = picker.selectedDates[0];
    const currentDate = new Date();

    if (!selectedDate || selectedDate < currentDate) {
      Notiflix.Notify.warning("Please select a valid future date");
      return;
    }

    startButton.disabled = true;

    intervalId = setInterval(updateTimer, 1000);
  });

  let intervalId;

  function updateTimer() {
    const targetDate = picker.selectedDates[0];
    const now = new Date();
    let diffMs = targetDate.getTime() - now.getTime();

    if (diffMs < 0) {
      diffMs = 0;
    }

    const { days, hours, minutes, seconds } = convertMs(diffMs);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);

    if (diffMs <= 0) {
      clearInterval(intervalId);
      Notiflix.Notify.success("Countdown finished!");
      startButton.disabled = false;
      return;
    }

    startButton.disabled = true;
  }

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
}
