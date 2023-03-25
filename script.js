const timer = document.getElementById("timer");
const startButton = document.getElementById("btnStart");
const pauseButton = document.getElementById("btnPause");
const ding = new Audio('sounds/ding.mp3');

const hour = document.getElementById("inputHour");
const min = document.getElementById("inputMin");
const sec = document.getElementById("inputSec");

let hourVal ="";
let minVal ="";
let secVal ="";

let resume = false;
let timeLeft;

//mutable variable for interval ID access
let countInterval;

//mutable variable for global access
let timeInSec;

//when user input entered, set value
hour.addEventListener("input", () => {
    hourVal = document.getElementById("inputHour").value
    resume=false;
});
//for minutes:
min.addEventListener("input", () => {
    minVal = document.getElementById("inputMin").value
    resume=false;
});
//for seconds:
sec.addEventListener("input", () => {
    secVal = document.getElementById("inputSec").value
    resume=false;
});

//start & pause timer on start button click
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
pauseButton.style.visibility = 'hidden';

//interval calls updateTimer every second
//Possibly unnecessary function
function setTimer() {

    // format time set by user
  // const setTime = (hourVal*3600) + (minVal*60) + secVal;
    timeInSec = formatTime(hourVal, minVal, secVal);

    countInterval = setInterval(updateTimer, 1000)
    toggleButtonView(startButton, pauseButton);

    //testing:
    console.log("minutes: " + minVal);
    console.log("setTime: " + setTime);
}

function startTimer() {
    //testing
    console.log(hourVal);
    console.log(minVal);
    console.log(secVal);
    console.log(timeInSec)

    if (resume) {
        timeInSec = timeLeft;
        countInterval = setInterval(updateTimer, 1000)
    } else {
        const setTime = minVal;
        timeInSec = formatTime(hourVal, minVal, secVal);
        countInterval = setInterval(updateTimer, 1000)
    }
    toggleButtonView(startButton, pauseButton);
}

//decreses the time shown by 1 second and stops when time hits 0
function updateTimer() {
    let hours = 0;
    let mins = Math.floor(timeInSec / 60);
    let secs = timeInSec % 60;
    if(mins>60){
        hours = Math.floor(timeInSec/3600);
        mins = Math.floor(60*(timeInSec%3600)/3600);
    }
    console.log(`${hours},${mins},${secs}`)
    displayTime(hours, mins, secs);
    timeInSec--;
    if (hour<=0 && mins <= 0 && secs <= 0) {
        clearInterval(countInterval);
        console.log("timer ended");
        playSound();
    }
}

//creates string format of time
function displayTime(hours, min, sec) {
    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;
    
    if(hours>=1){
        // hours = hours < 10 ? '0' + hours : hours;
        timer.innerHTML = `${hours}:${min}:${sec}`;
    }
    else{
        timer.innerHTML = `${min}:${sec}`;
    }
    
    

}

function formatTime(h,m,s){
    return (h*3600) + (m*60) + s;
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


