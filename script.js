const timer = document.getElementById("timer");
const startButton = document.getElementById("btnStart");
const pauseButton = document.getElementById("btnPause");
const restartButton = document.getElementById("btnRestart");
const input = document.querySelectorAll("input");
const container = document.getElementsByClassName("container");
const ding = new Audio('sounds/ding.mp3');

const hour = document.getElementById("inputHour");
const min = document.getElementById("inputMin");
const sec = document.getElementById("inputSec");

let hourVal = "";
let minVal = "";
let secVal = "";

let resume = false;
let timeLeft;

//mutable variable for interval ID access
let countInterval;

//mutable variable for global access
let timeInSec;

//when user input entered, set value
hour.addEventListener("input", () => {
    hourVal = document.getElementById("inputHour").value
    resume = false;
});
//for minutes:
min.addEventListener("input", () => {
    minVal = document.getElementById("inputMin").value
    resume = false;
});
//for seconds:
sec.addEventListener("input", () => {
    secVal = document.getElementById("inputSec").value
    resume = false;
});

//start & pause timer on start button click
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
//do this in css
pauseButton.style.visibility = 'hidden';

restartButton.addEventListener("click", restartTimer);

// container.style.visibility='hidden';
timer.addEventListener("click", () => {
    // console.log("clicked");
    container[0].style.visibility = 'visible';
    window.addEventListener("click", onClickOutside);
});


//hides container if click was made outside timer or container
const onClickOutside = (event) => {
    const withinBoundary1 = event.composedPath().includes(timer);
    const withinBoundary2 = event.composedPath().includes(container[0]);


    if (withinBoundary1) {
        // console.log("Click happened inside element")
    } else if (withinBoundary2) {
        // console.log("Click happened inside element")
    } else {
        container[0].style.visibility = 'hidden';
        // console.log("Click happened **OUTSIDE** element");
        window.removeEventListener("click", onClickOutside);
    }
}


// document.addEventListener('click', (event) => {
//     document.removeEventListener})

//change color on hover over textinput
input.forEach((i) => {
    i.addEventListener("mouseover", () => { i.style.backgroundColor = "#F5F5F5" });
    i.addEventListener("mouseout", () => { i.style.backgroundColor = "white" });
})

function startTimer() {
    if (resume) {
        timeInSec = timeLeft;
        countInterval = setInterval(updateTimer, 1000)
    } else {
        // const setTime = minVal;

        timeInSec = formatTime(hourVal, minVal, secVal);
        countInterval = setInterval(updateTimer, 1000)
    }
    toggleButtonView(startButton, pauseButton);
    restartButton.style.visibility = 'hidden';
}

//decreses the time shown by 1 second and stops when time hits 0
function updateTimer() {
    let hours = 0;
    let mins = Math.floor(timeInSec / 60);
    let secs = timeInSec % 60;
    if (mins > 60) {
        hours = Math.floor(timeInSec / 3600);
        mins = Math.floor(60 * (timeInSec % 3600) / 3600);
    }

    displayTime(hours, mins, secs);
    timeInSec--;

    if (hours <= 0 && mins <= 0 && secs <= 0) {
        clearInterval(countInterval);
        console.log("timer ended");
        playSound();
    }


}

//creates string format of time
function displayTime(hours, min, sec) {
    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;

    if (hours >= 1) {
        // hours = hours < 10 ? '0' + hours : hours;
        timer.innerHTML = `${hours}:${min}:${sec}`;
    }
    else {
        timer.innerHTML = `${min}:${sec}`;
    }
}

function formatTime(h, m, s) {

    return Number(h * 3600) + (Number(m * 60)) + Number(s);
}

//is this necessary?
function playSound() {
    ding.play();
}

//pauses timer
function pauseTimer() {
    timeLeft = timeInSec;
    // console.log("time left: " + timeLeft);
    clearInterval(countInterval);
    toggleButtonView(pauseButton, startButton);
    restartButton.style.visibility = 'visible';
    resume = true;
}

//toggle visibility status of buttons
function toggleButtonView(btnHide, btnShow) {
    btnHide.style.visibility = 'hidden';
    btnShow.style.visibility = 'visible';
}

function restartTimer(){
    pauseTimer();
    resume = false
    startTimer();
}


