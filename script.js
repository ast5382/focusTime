
/* script.js uses HTML DOM to facilitate communication between html view and javascript model.*/

//HTML element initializations
const timerDiv = document.getElementById("timer");
const totalTimeDiv = document.getElementById("totalTime");
const plusSignDiv = document.getElementById("plusSign");
const totalTextDiv = document.getElementById("totalText");
const startButton = document.getElementById("btnStart");
const pauseButton = document.getElementById("btnPause");
const restartButton = document.getElementById("btnRestart");
const breakButton = document.getElementById("btnBreak");
const extendButton = document.getElementById("btnExtend");
const inputs = document.querySelectorAll("input");
const containerClass = document.getElementsByClassName("container");
const bContainer = document.getElementById("breakInputContainer");
const fContainer = document.getElementById("focusInputContainer");
const rightArrow = document.getElementById("rightArrow");
const leftArrow = document.getElementById("leftArrow");

//soounds
const ding = new Audio('sounds/ding.mp3');
const clearly = new Audio('sounds/clearly-602.mp3')

//Focus timer
//rename focusHrInput ?
const hourInput = document.getElementById("inputHourF");
const minInput = document.getElementById("inputMinF");
const secInput = document.getElementById("inputSecF");
let hourVal = "";
let minVal = "";
let secVal = "";

//Break timer
const hourInputB = document.getElementById("inputHourB");
const minInputB = document.getElementById("inputMinB");
const secInputB = document.getElementById("inputSecB");
let breakHourVal = "";
let breakMinVal = "";
let breakSecVal = "";
let proportionalBreak = false;

//Mutable variables for global access
let state = "new";
let mode = "focus";
let focusTimer;
let breakTimer;
let extendedTimer; 

/* Event handler initializations */

//When user input entered, set value
hourInput.addEventListener("input", () => {
    hourVal = document.getElementById("inputHourF").value
    state = "new";
    timerDiv.innerHTML = showSetTime();
});
minInput.addEventListener("input", () => {
    minVal = document.getElementById("inputMinF").value
    state = "new";
    timerDiv.innerHTML = showSetTime();
});
secInput.addEventListener("input", () => {
    secVal = document.getElementById("inputSecF").value
    state = "new";
    timerDiv.innerHTML = showSetTime();
});

//break
hourInputB.addEventListener("input", () => {
    breakHourVal = document.getElementById("inputHourB").value
    state = "new";
});
minInputB.addEventListener("input", () => {
    breakMinVal = document.getElementById("inputMinB").value
    state = "new";
});
secInputB.addEventListener("input", () => {
    breakSecVal = document.getElementById("inputSecB").value
    state = "new";
});

//Buttons
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
restartButton.addEventListener("click", restartTimer);
breakButton.addEventListener("click", () => {
    // console.log("break button clicked");
    doBreakTimer();
});
extendButton.addEventListener("click", ()=>{
    // console.log("extend btn clicked")
    // console.log(state);
    extendTimer();
})

//Show timer input form on click
timerDiv.addEventListener("click", () => {
    // console.log("timerDiv clicked")
    containerClass[0].style.visibility = 'visible';
    window.addEventListener("click", onClickOutside);
});

//Hides container if click was made outside timerDiv or container
const onClickOutside = (event) => {
    const withinBoundary1 = event.composedPath().includes(timerDiv);
    const withinBoundary2 = event.composedPath().includes(containerClass[0]);
    const withinBoundary3 = event.composedPath().includes(containerClass[1]);

    if (withinBoundary1) {
        // console.log("Click happened inside element")
    } else if (withinBoundary2) {
        // console.log("Click happened inside element")
    }  else if (withinBoundary3) {
        // console.log("Click happened inside element")
    }
    else {
        containerClass[0].style.visibility = 'hidden';
        containerClass[1].style.visibility = 'hidden';
        // console.log("Click happened **OUTSIDE** element");
        window.removeEventListener("click", onClickOutside);
    }
}

//Change color of text input on hover over
inputs.forEach((i) => {
    i.addEventListener("mouseover", () => { i.style.backgroundColor = "#F5F5F5" });
    i.addEventListener("mouseout", () => { i.style.backgroundColor = "white" });
})

rightArrow.addEventListener("click", ()=>{
    // console.log("right arrow clicked")
    toggleButtonView(fContainer, bContainer);
})

leftArrow.addEventListener("click", ()=>{
    // console.log("left arrow clicked")
    toggleButtonView(bContainer, fContainer);
})


/* Business Logic: */

//Returns true if focus time set
function focusTimeSet() {
    if (hourVal >= 1 || minVal >= 1 || secVal >= 1) {
        return true;
    } else {
        // alert("Timer not set! Please enter a time.");
        return false;
    }
}

//Returns true if break time set
function breakTimeSet() {
    if (breakHourVal >= 1 || breakMinVal >= 1 || breakSecVal >= 1) {
        return true;
    } else {
        // alert("Timer not set! Please enter a time.");
        return false;
    }
}

//Creates timer for modes whose time inputs recieved UI
function createTimers() {
    if (focusTimeSet() && breakTimeSet()) {
        focusTimer = new Timer(new Time(hourVal, minVal, secVal));
        breakTimer = new Timer(new Time(breakHourVal, breakMinVal, breakSecVal));
        console.log("focus & break timer created")

    } else if (focusTimeSet()) {
        // alert("Break timer not set")
        breakTimer = new Timer(new Time(breakHourVal, breakMinVal, breakSecVal));
        alert("Break timer not set. Setting proportional break timer.");
        console.log("Break timer not set. Setting proportional break timer.");
        proportionalBreak = true;

        focusTimer = new Timer(new Time(hourVal, minVal, secVal));
        console.log("focus timer created")
    }
    else if (breakTimeSet()) {
        alert("focus time not set")
        console.log("focus time not set")
        breakTimer = new Timer(new Time(breakHourVal, breakMinVal, breakSecVal));
        console.log("break timer created")
    }
    else {
        console.log("Please set timers")
    }
}


// Starts a timer. Action varies on state and mode of timer. 
function startTimer() {

    switch (state) {
        case "new":
            createTimers();
            mode = "focus";
        case "unstarted":
            if (mode == "focus") {
                focusTimer.start();
            } else if(mode == "extend"){
                extendedTimer.startExtended();
            } else { 
                // if(extendedTimer){
                //     setProportinalBreak(extendedTimer);
                // }
                console.log('breaktimer seconds: ' + breakTimer.time.timeInSeconds);
                breakTimer.start();
            }
            console.log("state set to running, mode: "+mode)
            state = "running";
            break;
        case "running":
            //Break button is visible while extended timer running
            if(mode == 'break'){
                extendedTimer.pause();
                setProportinalBreak(extendedTimer)
                breakTimer.start();
            }
            // console.log("running: start button shouldnt be visible")
            break;
        case "paused":
            if (mode == "focus") {
                focusTimer.start();
            } else if(mode == "extend"){
                extendedTimer.startExtended();
                setProportinalBreak(extendedTimer)
                // console.log(extendedTimer.time.totalTime);
            } else { 
                breakTimer.start();
            }
            state = "running";
            // console.log("paused: start button shouldnt be visible")
            break;
        case "ended":
            // console.log("ended: start button shouldnt be visible")
            break;
        default:
            console.log("state not set");
            console.log("state: " + state);
            break;

    }

    toggleButtonView(startButton, pauseButton);
    restartButton.style.visibility = 'hidden';
    extendButton.style.visibility = 'hidden'
    toggleButtonPosition(pauseButton)
    toggleButtonPosition(startButton)

    if(mode != 'extend'){
        plusSignDiv.style.visibility = 'hidden'
        totalTextDiv.style.visibility = 'hidden'
        totalTimeDiv.style.visibility = 'hidden'
    }

}

//*Currently unused
//Decreses the time shown by 1 second and stops when time hits 0
function updateTimer() {
    console.log("updateTimer")
    focusTimer.update();
}


//Ends timer, plays sound, shows break button
function timerEnd(t) {
    // console.log(t.time.toString());
    clearInterval(t.countInterval);
    console.log("timer ended");
    playSound();

    if (mode == "focus") {
        pauseButton.style.visibility = 'hidden'
        extendButton.style.visibility = 'visible'
        breakButton.style.visibility = 'visible'
        state = "unstarted"
        mode = "break"
        // calculateBreak()
        if(proportionalBreak){
            setProportinalBreak(focusTimer)
        }
        timerDiv.innerHTML = showSetTime();
    } else {
        toggleButtonView(pauseButton, startButton);
        state = "new"
        mode = "focus"
        timerDiv.innerHTML = showSetTime();
      
    }
}

//*is this necessary?
function playSound() {
    // ding.play();
    clearly.play();
}

//Pauses timer, Action varies on state and mode of timer.
function pauseTimer() {

    switch (state) {
        case "new":
            console.log("new: pause button shouldnt be visible");
            break;
        case "unstarted":
            console.log("unstarted: pause button shouldnt be visible");
            break;
        case "running":
            if (mode == "focus") {
                focusTimer.pause();
                restartButton.style.visibility = 'visible';
                // console.log("pauseTimer")
            } else if(mode == "extend"){
                extendedTimer.pause();
                setProportinalBreak(extendedTimer)
                // console.log(extendTimer.time.totalTime);
            } else { 
                breakTimer.pause();
            }
            state = "paused";
            break;
        case "paused":  //used for restart
            if (mode == "focus") {
                focusTimer.pause();
            } else {
                breakTimer.pause();
            }
            console.log("restarting timer");
            break;
        case "ended":   //*is this state necesary
            console.log("ended: pause button shouldnt be visible")
            break;
        default:
            console.log("state not set");
            console.log("state: " + state);
            break;
    }
    toggleButtonView(pauseButton, startButton);

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
    state = "new";
    startTimer();
}

//
function doBreakTimer() {
    mode = "break";
    startTimer()
    breakButton.style.visibility = "hidden";
}

//Displays time before timer starts
function showSetTime(){
    if (mode == "focus"){

        if(secVal == 0){
            secVal = '00'
        } else if(secVal < 10){
            secVal = Number(secVal).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })
        }
        if(minVal == 0){
            minVal = '00'
        } else if(minVal < 10){
            minVal = Number(minVal).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })
        }

        if (hourVal >= 1) {
            return `${hourVal}:${minVal}:${secVal}`;
        } else {
            return `${minVal}:${secVal}`;
        }
    } else if(mode=="break"){

        if(breakSecVal == 0){
            breakSecVal = '00'
        } else if(breakSecVal < 10){
            breakSecVal = Number(breakSecVal).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })
        }
        if(breakMinVal == 0){
            breakMinVal = '00'
        } else if(breakMinVal < 10){
            breakMinVal = Number(breakMinVal).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })

        }

        if (breakHourVal >= 1) {
            return `${breakHourVal}:${breakMinVal}:${breakSecVal}`;
        } else {
            return `${breakMinVal}:${breakSecVal}`;
        }
        
    }else{
        console.log("time not set")
    }
}

function calculateBreak(){
    let breakInSeconds = focusTimer.time.totalTime / 5
    console.log("break in seconds: " +breakInSeconds);
}

function setProportinalBreak(timer){
    breakTimer.time.timeInSeconds = Math.floor(timer.time.totalTime / 5);
}

function extendTimer(){
    mode= "extend";
    //the same as focus timer
    extendedTimer = new Timer(new Time(0, 0, 0));
    extendedTimer.time.totalTime = focusTimer.time.totalTime;

    plusSignDiv.style.visibility = 'visible'
    totalTextDiv.style.visibility = 'visible'
    totalTimeDiv.style.visibility = 'visible'

    startTimer();

    // console.log(extendedTimer.time.totalTime);
    // extendedTimer.time.timeInSeconds += focusTimer.time.totalTime;
    

    extendButton.style.visibility = 'hidden';
    // pauseButton.style.position= 'absolute';
    // pauseButton.style.transform='translate(-210px, 190px)';
    toggleButtonPosition(pauseButton)
    toggleButtonPosition(startButton)

    // breakButton.style.visibility = 'hidden'
}

function toggleButtonPosition(btn){
    if(mode == "extend"){
        btn.style.position= 'absolute';
        btn.style.transform='translate(-210px, 190px)';
    } else{
        btn.style.position= 'absolute';
        btn.style.left = 'left: 50%';
        btn.style.transform= 'translate(-70px, 190px)';
    }
}

// function setMode(m) {
//     mode = m;

//     // switch (mode) {
//     //     case "break": const timerMode = "break";
//     // }
// }