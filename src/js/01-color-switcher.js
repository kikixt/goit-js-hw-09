const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyElement = document.querySelector('body');

let intervalId;
let currentColor;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

function startColorChange() {
    clearInterval(intervalId);

    intervalId = setInterval(() => {
        const randomColor = getRandomHexColor(); 
        bodyElement.style.backgroundColor = randomColor;
        currentColor = randomColor; 
    }, 1000); 

    startButton.disabled = true; 
    stopButton.disabled = false; 
}

function stopColorChange() {
    clearInterval(intervalId); 

    startButton.disabled = false;
    stopButton.disabled = true; 
}
