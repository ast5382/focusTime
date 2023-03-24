const timer = document.getElementById("timer");
const startButton = document.getElementById("btnStart");
const pauseButton = document.getElementById("btnPause");
const ding = new Audio('sounds/ding.mp3');


const hour = document.getElementById("hhInput"); 
let hourVal = 99;

hour.addEventListener("input", setHour);

function setHour(){
    hourVal = document.getElementById("hhInput").value
}



//mutable variable for interval ID access
let countInterval; 

//start timer on start button click
startButton.addEventListener("click", setTimer);
//pause timer on button click, pause button starts off hidden
pauseButton.addEventListener("click", pauseTimer);
pauseButton.style.visibility = 'hidden';
let timeInSec;
//interval calls updateTimer every second
//Possibly unnecessary function
function setTimer(){
// time set by user
const setTime = hourVal;
 timeInSec = setTime * 60;

 countInterval= setInterval(updateTimer, 1000)
 toggleButtonView(startButton, pauseButton);

 //testing:
 console.log("hour: " + hourVal);
 console.log("setTime: " + setTime);
}

//decreses the time shown by 1 second and stops when time hits 0
function updateTimer(){
    let mins = Math.floor(timeInSec/60);
    let secs = timeInSec%60;

    displayTime(mins, secs);
    timeInSec--;
    if(mins<=0 && secs <=0){
        clearInterval(countInterval);
        console.log("timer ended");
        playSound();
    }
   }

//creates string format of time
function displayTime(min, sec){
    sec = sec < 10 ?  '0' + sec : sec;
    min = min < 10 ?  '0' + min : min;
    timer.innerHTML = `${min}:${sec}`;
    
}

//is this necessary?
function playSound(){
    ding.play();
}

//pauses timer
function pauseTimer(){
    const timeLeft = timeInSec;
    clearInterval(countInterval);
    toggleButtonView(pauseButton, startButton);
}

//toggle visibility status of buttons
function toggleButtonView(btnHide, btnShow){
    btnHide.style.visibility = 'hidden';
    btnShow.style.visibility = 'visible';
}


 