const timer = document.getElementById("timer");
const startButton = document.getElementById("btnStart");
const ding = new Audio('sounds/ding.mp3');

//time will be set by user in html form
const setTime = .1;
let timeInSec = setTime * 60;

//mutable variable for interval ID access
let countInterval; 

//start timer on start button click
startButton.addEventListener("click", setTimer);

//interval calls updateTimer every second
//Possibly unnecessary function
function setTimer(){
 countInterval= setInterval(updateTimer, 1000)
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


function pauseTimer(){
    updateTimer
}



 