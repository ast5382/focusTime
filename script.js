//HTML element initializations
const timerDiv = document.getElementById("timer");
const startButton = document.getElementById("btnStart");
const pauseButton = document.getElementById("btnPause");
const restartButton = document.getElementById("btnRestart");
const breakButton = document.getElementById("btnBreak");
const inputs = document.querySelectorAll("input");
const container = document.getElementsByClassName("container");
const ding = new Audio('sounds/ding.mp3');

//For focus timer
const hourInput = document.getElementById("inputHour");
const minInput = document.getElementById("inputMin");
const secInput = document.getElementById("inputSec");
let hourVal = "";
let minVal = "";
let secVal = "";

//For break timer
let breakHour = "";
let breakMin = 5;
let breakSec = "";

//Mutable variable for interval ID access
let countInterval;

//Mutable variables for global access
let timeInSec;
let restart = true;
let timeLeft;


//When user input entered, set value
hourInput.addEventListener("input", () => {
    hourVal = document.getElementById("inputHour").value
    restart = true;
});
//For minutes:
minInput.addEventListener("input", () => {
    minVal = document.getElementById("inputMin").value
    restart = true;
});
//For seconds:
secInput.addEventListener("input", () => {
    secVal = document.getElementById("inputSec").value
    restart = true;
});

//Start & pause timer on start button click
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
//*do this in css
pauseButton.style.visibility = 'hidden';

restartButton.addEventListener("click", restartTimer);
breakButton.addEventListener("click", breakTimer);


timerDiv.addEventListener("click", () => {
    // console.log("clicked");
    container[0].style.visibility = 'visible';
    window.addEventListener("click", onClickOutside);
});


//Hides container if click was made outside timer or container
const onClickOutside = (event) => {
    const withinBoundary1 = event.composedPath().includes(timerDiv);
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

//Change color of text input on hover over
inputs.forEach((i) => {
    i.addEventListener("mouseover", () => { i.style.backgroundColor = "#F5F5F5" });
    i.addEventListener("mouseout", () => { i.style.backgroundColor = "white" });
})

// Starts a timer
function startTimer() {
    //If not restarting, start at time left
    if (!restart) {
        timeInSec = timeLeft;
        countInterval = setInterval(updateTimer, 1000)
    } else {
        timeInSec = formatTime(hourVal, minVal, secVal);
        countInterval = setInterval(updateTimer, 1000)
    }
    toggleButtonView(startButton, pauseButton);
    restartButton.style.visibility = 'hidden';
}

//Decreses the time shown by 1 second and stops when time hits 0
function updateTimer() {
    timeInUnits = parseTime();
    let hours = timeInUnits[0]; //will be let hours = <Timer>.timeInUnits[0];
    let mins = timeInUnits[1];
    let secs = timeInUnits[2];

toString = ()=>{
    secs = secs < 10 ? '0' + secs : secs;
    mins = mins < 10 ? '0' + mins : mins;

    if (hours >= 1) {
        return `${hours}:${mins}:${secs}`;
    } else{
        return `${mins}:${secs}`;
    }
}

    update();
    //displayTime(hours, mins, secs); //Seperate updateTimer and updateDisplay responsibilities?
    timeInSec--;

    if (hours <= 0 && mins <= 0 && secs <= 0) {
        timerEnd();
    }
    
}

function update(){
    timerDiv.innerHTML = toString();    //will be <Timer>.toString
}

//Parse time from seconds to hours, minutes, seconds
//Returns array
function parseTime(){
    const arr = [];
    let h = 0;
    let m = Math.floor(timeInSec / 60);
    let s = timeInSec % 60;
    if (m > 60) {
        h = Math.floor(timeInSec / 3600);
        m = Math.floor(60 * (timeInSec % 3600) / 3600);
    }
    arr.push(h, m, s);
    return arr;
}

//Ends timer, plays sound, shows break button
function timerEnd(){
    clearInterval(countInterval);
    console.log("timer ended");
    playSound();
    
    breakButton.style.visibility='visible';
}

//Creates string format of time
function displayTime(hours, min, sec) {
    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;

    if (hours >= 1) {
        // hours = hours < 10 ? '0' + hours : hours;
        timerDiv.innerHTML = `${hours}:${min}:${sec}`;
    }
    else {
        timerDiv.innerHTML = `${min}:${sec}`;
    }
}

//Formats user inputted time into seconds to be compatible with updateTimer
function formatTime(h, m, s) {
    return Number(h * 3600) + (Number(m * 60)) + Number(s);
}

//*is this necessary?
function playSound() {
    ding.play();
}

//Pauses timer, hides pause button and shows play & restart button
function pauseTimer() {
    timeLeft = timeInSec;
    // console.log("time left: " + timeLeft);
    clearInterval(countInterval);
    toggleButtonView(pauseButton, startButton);
    restart = false;
    
    restartButton.style.visibility = 'visible';
    
}

//Toggle visibility status of buttons
//*replace with showElement() and hideElement() functions?
function toggleButtonView(btnHide, btnShow) {
    btnHide.style.visibility = 'hidden';
    btnShow.style.visibility = 'visible';
}

//Resets and starts the timer to original time
function restartTimer(){
    pauseTimer();
    restart = true;
    startTimer();
}

function breakTimer(){

    timeInSec = formatTime(breakHour, breakMin, breakSec);
    countInterval = setInterval(updateTimer, 1000)
    toggleButtonView(breakButton, pauseButton);
}

function setTimerMode(mode){
    switch(mode){
       case "break": const timerMode = "break";
    }
}