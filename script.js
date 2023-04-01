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
//rename focusHrInput ?
const hourInput = document.getElementById("inputHour");
const minInput = document.getElementById("inputMin");
const secInput = document.getElementById("inputSec");
let hourVal = "";
let minVal = "";
let secVal = "";

//For break timer
let breakHourVal = "";
let breakMinVal = 5;
let breakSecVal = "";

// //Mutable variable for interval ID access
// let countInterval;

//Mutable variables for global access
// let timeInSec;
let state = "new";
let mode;
let timeLeft;


//When user input entered, set value
hourInput.addEventListener("input", () => {
    hourVal = document.getElementById("inputHour").value
    state = "new";
});
//For minutes:
minInput.addEventListener("input", () => {
    minVal = document.getElementById("inputMin").value
    state = "new";
});
//For seconds:
secInput.addEventListener("input", () => {
    secVal = document.getElementById("inputSec").value
    state = "new";
});





//***** how is this starting & running without any Start() function?????
//its bc i basically put the whole start function into the lambda
//rn it creates a new time & timer everytime start button clicked
//need to implement states to check if timer already created?

//issue: need 

//Start & pause timer on start button click
startButton.addEventListener("click", startTimer);

// () => {
//     createTimer();
//     // Timer.prototype.start();
//     //countInterval in script.js and not timer.js to display timer on innerhtml
//     countInterval = setInterval(updateTimer, 1000)
//     toggleButtonView(startButton, pauseButton);
//     restartButton.style.visibility = 'hidden';

// });


pauseButton.addEventListener("click", pauseTimer);
//*do this in css
pauseButton.style.visibility = 'hidden';

restartButton.addEventListener("click", restartTimer);
breakButton.addEventListener("click", ()=>{
    console.log("break button clicked");
});


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

let focusTimer;
function focusTimeSet() {
    // isSet = false;
    if (hourVal >= 1 || minVal >= 1 || secVal >= 1) {
        // console.log("focus time set")
        return true;
        // isSet = true;
        // console.log("Timer set!")
    } else {
        // alert("Timer not set! Please enter a time.");
        return false;
    }
    // return isSet;
    ;
}

let breakTimer;
function breakTimeSet() {
    // isSet = false;
    if (breakHourVal >= 1 || breakMinVal >= 1 || breakSecVal >= 1) {
        return true;
        // isSet = true;
        // console.log("Timer set!")
    } else {
        // alert("Timer not set! Please enter a time.");
        return false;
    }
    // return isSet;
    // console.log("break timer created")
    // return breakTimer;
}


//Creates timer for modes whose time inputs recieved UI
//if focusHr || focusMin || focusSec recieved input, then
// create focusTimer and focusTime
//Issue: creates ONLY a focusTimer. 
//Set different html attributes for focus input & break input
//then use switch case 
function createTimers() {
    if (focusTimeSet() && breakTimeSet()) {
        // console.log(`focusTimer set: ${focusTimeSet().time.toString()}
        // breakTimer set: ${breakTimeSet().time.toString()}`)

        focusTimer = new Timer("focus", new Time(hourVal, minVal, secVal));
        breakTimer = new Timer("break", new Time(breakHourVal, breakMinVal, breakSecVal));
        console.log("focus&break timer created")
       
    } else if(focusTimeSet()){
        // alert("Break timer not set")
        console.log("Break timer not set")
        focusTimer = new Timer("focus", new Time(hourVal, minVal, secVal));
        console.log("focus timer created")
        //ToDo:
        //Prevent pauseButton showing
        //Prevent timer from going off
    }
    else if(breakTimeSet()){
        alert("focus time not set")
        console.log("focus time not set")
        breakTimer = new Timer("break", new Time(breakHourVal, breakMinVal, breakSecVal));
        console.log("break timer created")
        
        // console.log(`focusTime set: ${setFocusTimer().toString()}`);

        //ToDo:
        //Prevent pauseButton showing
        //Prevent timer from going off
    }
    else{
        console.log("Please set timers")
        
    }
}


// Starts a timer
function startTimer() {
   
    //****TODO:issue: will need to identify which timer mode to start and individually start it
    // how to make start work for all timer modes? keep start functionality inside timer.js
    // if(state = "new"){}

    //how to create timers before start button clicked
    // if( state = "new"){
    //     createTimers();
    // } else{
    //     timer.start();
    // }

    switch (state){
        case "new":
            createTimers();
            mode = "focus";
        case "unstarted":
            if (mode == "focus"){
                focusTimer.start();
            } else{
                breakTimer.start();
            }
            break;
        case "running":
            console.log("running: start button shouldnt be visible")
            break;
        case "paused":
            if (mode == "focus"){
                focusTimer.start();
            } else{
                breakTimer.start();
            }
            // console.log("paused: start button shouldnt be visible")
            break;
        case "ended":
            console.log("ended")
            break;
        default:
            console.log("state not set");
            console.log("state: " +state);
            break;

    }
     
    // console.log("hi")
    
    // console.log("startTimer")
    // //If not restarting, start at time left
    // if (!restart) {
    //     timeInSec = timeLeft;
    //     countInterval = setInterval(updateTimer, 1000)
    // } else {
    //     timeInSec = formatTime(hourVal, minVal, secVal);

    //     countInterval = setInterval(updateTimer, 1000)
    // }

    // countInterval = setInterval(updateTimer, 1000)
    toggleButtonView(startButton, pauseButton);
    restartButton.style.visibility = 'hidden';
    
}

//Decreses the time shown by 1 second and stops when time hits 0
function updateTimer() {
console.log("updateTimer")

    // let timeInUnits = parseTime();
    // let hours = timeInUnits[0]; //will be let hours = <Timer>.timeInUnits[0];
    // let mins = timeInUnits[1];
    // let secs = timeInUnits[2];

    // toString = () => {
    //     secs = secs < 10 ? '0' + secs : secs;
    //     mins = mins < 10 ? '0' + mins : mins;

    //     if (hours >= 1) {
    //         return `${hours}:${mins}:${secs}`;
    //     } else {
    //         return `${mins}:${secs}`;
    //     }
    // }
    focusTimer.update();

    //not being called
    // updateDisplay();
    
    //displayTime(hours, mins, secs); //Seperate updateTimer and updateDisplay responsibilities?
    // timeInSec--;

    // if (hours <= 0 && mins <= 0 && secs <= 0) {
    //     timerEnd();
    // }


}

// function updateDisplay() {
//     timerDiv.innerHTML = toString();    //will be <Timer>.toString
// }

//Parse time from seconds to hours, minutes, seconds
//Returns array
// function parseTime() {
//     const arr = [];
//     let h = 0;
//     let m = Math.floor(timeInSec / 60);
//     let s = timeInSec % 60;
//     if (m > 60) {
//         h = Math.floor(timeInSec / 3600);
//         m = Math.floor(60 * (timeInSec % 3600) / 3600);
//     }
//     arr.push(h, m, s);
//     return arr;
// }

//Ends timer, plays sound, shows break button
function timerEnd() {
    clearInterval(countInterval);
    console.log("timer ended");
    playSound();

    breakButton.style.visibility = 'visible';
}

//Creates string format of time
// function displayTime(hours, min, sec) {
//     sec = sec < 10 ? '0' + sec : sec;
//     min = min < 10 ? '0' + min : min;

//     if (hours >= 1) {
//         // hours = hours < 10 ? '0' + hours : hours;
//         timerDiv.innerHTML = `${hours}:${min}:${sec}`;
//     }
//     else {
//         timerDiv.innerHTML = `${min}:${sec}`;
//     }
// }

// //Formats user inputted time into seconds to be compatible with updateTimer
// function formatTime(h, m, s) {
//     return Number(h * 3600) + (Number(m * 60)) + Number(s);
// }

//*is this necessary?
function playSound() {
    ding.play();
}

//Pauses timer, hides pause button and shows play & restart button
function pauseTimer() {
    switch (state){
        case "new":
            console.log("new: pause button shouldnt be visible");
            break;
        case "unstarted":
            console.log("unstarted: pause button shouldnt be visible");
            break;
        case "running":
            if (mode == "focus"){
                focusTimer.pause();
            } else{
                breakTimer.pause();
            }
            break;
        case "paused":
            console.log("paused: pause button shouldnt be visible");
            // console.log("paused: start button shouldnt be visible")
            break;
        case "ended":
            console.log("ended")
            break;
        default:
            console.log("state not set");
            console.log("state: " +state);
            break;
        }

    focusTimer.pause();

    // timeLeft = timeInSec;
    // // console.log("time left: " + timeLeft);
    // clearInterval(countInterval);
    toggleButtonView(pauseButton, startButton);
    // restart = false;

    restartButton.style.visibility = 'visible';

}

//Toggle visibility status of buttons
//*replace with showElement() and hideElement() functions?
function toggleButtonView(btnHide, btnShow) {
    btnHide.style.visibility = 'hidden';
    btnShow.style.visibility = 'visible';
}

//Resets and starts the timer to original time
function restartTimer() {
    pauseTimer();
    state = "unstarted";
    startTimer();
}

// function breakTimer() {
// //do breaktimer
//     // timeInSec = formatTime(breakHour, breakMin, breakSec);
//     // countInterval = setInterval(updateTimer, 1000)
//     // toggleButtonView(breakButton, pauseButton);
// }

function setTimerMode(mode) {
    switch (mode) {
        case "break": const timerMode = "break";
    }
}