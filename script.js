let timer;
let isRunning = false;
let isWorkSession = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
const alarmSound = document.getElementById('alarm-sound');

// Initialize timer values
let workDuration = parseInt(workDurationInput.value) * 60;
let breakDuration = parseInt(breakDurationInput.value) * 60;
let currentTime = workDuration;

// Update timer display
function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Start/Stop timer
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        timer = setInterval(countdown, 1000);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

// Reset timer
resetButton.addEventListener('click', resetTimer);

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkSession = true;
    startStopButton.textContent = 'Start';
    currentTime = parseInt(workDurationInput.value) * 60;
    updateDisplay();
}

// Countdown logic
function countdown() {
    if (currentTime > 0) {
        currentTime--;
    } else {
        alarmSound.play();
        isWorkSession = !isWorkSession;
        currentTime = isWorkSession ? parseInt(workDurationInput.value) * 60 : parseInt(breakDurationInput.value) * 60;
    }
    updateDisplay();
}

// Update durations
workDurationInput.addEventListener('change', () => {
    workDuration = parseInt(workDurationInput.value) * 60;
    if (isWorkSession && !isRunning) {
        currentTime = workDuration;
        updateDisplay();
    }
});

breakDurationInput.addEventListener('change', () => {
    breakDuration = parseInt(breakDurationInput.value) * 60;
    if (!isWorkSession && !isRunning) {
        currentTime = breakDuration;
        updateDisplay();
    }
});

// Initial display
updateDisplay();
