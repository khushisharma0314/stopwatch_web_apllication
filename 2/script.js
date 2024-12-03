// Initialize variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

// Get HTML elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps');

// Start button functionality
document.getElementById('start').addEventListener('click', () => {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
    }
});

// Pause button functionality
document.getElementById('pause').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// Reset button functionality
document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    laps = [];
    updateDisplay(0, 0, 0);
    lapsList.innerHTML = '';
});

// Lap button functionality
document.getElementById('lap').addEventListener('click', () => {
    if (timerInterval) {
        laps.push(formatTime(elapsedTime));
        updateLaps();
    }
});

// Update the timer display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    updateDisplay(
        time.getMinutes(),
        time.getSeconds(),
        Math.floor(time.getMilliseconds() / 10)
    );
}

// Update the display
function updateDisplay(minutes, seconds, milliseconds) {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    millisecondsDisplay.textContent = String(milliseconds).padStart(2, '0');
}

// Format lap time
function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

// Update laps list
function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}
