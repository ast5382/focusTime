const timer = document.getElementById("timer");
const startButton = document.getElementById("btnStart");
const pauseButton = document.getElementById("btnPause");
const ding = new Audio('sounds/ding.mp3');

const hour = document.getElementById("hhInput");
let hourVal = 99;
let resume = false;
let timeLeft;

//mutable variable for interval ID access
let countInterval;

//mutable variable for global access
let timeInSec;

//when user input entered, set value
hour.addEventListener("input", () => {
    hourVal = document.getElementById("hhInput").value
    resume=false;
});

//start & pause timer on start button click
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
pauseButton.style.visibility = 'hidden';

//interval calls updateTimer every second
//Possibly unnecessary function
function setTimer() {
    // time set by user
    const setTime = hourVal;
    timeInSec = setTime * 60;

    countInterval = setInterval(updateTimer, 1000)
    toggleButtonView(startButton, pauseButton);

    //testing:
    console.log("hour: " + hourVal);
    console.log("setTime: " + setTime);
}

function startTimer() {
    if (resume) {
        timeInSec = timeLeft;
        countInterval = setInterval(updateTimer, 1000)
    } else {
        const setTime = hourVal;
        timeInSec = setTime * 60;
        countInterval = setInterval(updateTimer, 1000)
    }
    toggleButtonView(startButton, pauseButton);
}

//decreses the time shown by 1 second and stops when time hits 0
function updateTimer() {
    let mins = Math.floor(timeInSec / 60);
    let secs = timeInSec % 60;

    displayTime(mins, secs);
    timeInSec--;
    if (mins <= 0 && secs <= 0) {
        clearInterval(countInterval);
        console.log("timer ended");
        playSound();
    }
}

//creates string format of time
function displayTime(min, sec) {
    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;
    timer.innerHTML = `${min}:${sec}`;

}

//is this necessary?
function playSound() {
    ding.play();
}

//pauses timer
function pauseTimer() {
    timeLeft = timeInSec;
    console.log("time left: " + timeLeft);
    clearInterval(countInterval);
    toggleButtonView(pauseButton, startButton);
    resume = true;
}

//toggle visibility status of buttons
function toggleButtonView(btnHide, btnShow) {
    btnHide.style.visibility = 'hidden';
    btnShow.style.visibility = 'visible';
}


