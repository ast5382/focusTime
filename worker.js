importScripts('time.js');

let countInterval;
let action;
let time;
let updatedTime = 0;
// time.hour=76;
onmessage = function (e) {

    
    // importScripts('script.js');
    // this.postMessage(this.time.timeInSeconds--);
    //ISSUE: cant access the timer object inside this worker :/
    // console.log(e);

    action = e.data[0];

    //Issue: every time a message is posted from timer.js,
    //  the time object gets overwritten and timeinseconds resets
    
    //Option?: rework timer creation, create time object inside worker?
    // time = new Time(getFocusVals[0], getFocusVals(1), getFocusVals(2));
    
    // time = e.data[1]
    // if(updatedTime){
    //     time.timeInSeconds = updatedTime;
    // }


    //need time interval insde web worker!!!
    //only need time in seconds to keep counting, dont need display to change
    //> only need to update and post time value

    switch (action) {
        case "new":
            time = new Time(e.data[1], e.data[2], e.data[3])
            // console.log(time.timeInSeconds)
            break;
        case "start":
            // updatedTime? time.timeInSeconds = updatedTime: time = e.data[1];
            start();
            break;
        case "pause":
            pause();
            break;
        case "extend":
            extend();
            time.totalTime = e.data[1];
            break;
        default:
            console.log("default");
            break;
    }
    // console.log("hi");
    // this.postMessage(time.hour);

    //for testing
    this.postMessage(time.timeInSeconds);

}

function start() {
    // time.timeInSeconds++
    postMessage(["update", toString(time.timeInSeconds)])
    console.log("in start: " + time.timeInSeconds);
    countInterval = setInterval(update, 1000);
}

// function sayHi(){
//     const message = "hi :)";
//     return message;
// }

//Update time and display. End when timer reaches 0
let update = () => {
    
    console.log("in update: " + time.timeInSeconds);
    if (time.timeInSeconds == 0) {
        clearInterval(countInterval);
        this.postMessage(["end"]);

    } 
    //else if(time.timeInSeconds > time.totalTime){
    //     time.timeInSeconds--;
    //      postMessage(["update", toString(time.timeInSeconds)])
        
    //     //This skips one second so the timer appears to start with the correct time
           //(it makes starting after pause take too long)
    // }
     else {
        
        time.timeInSeconds--;
        postMessage(["update", toString(time.timeInSeconds)])
        
    }
}

//Clear interval to pause timer
function pause() {
    // postMessage(["paused", time.timeInSeconds])
    // console.log("in pause: " + time.timeInSeconds);
    updatedTime = time.timeInSeconds;
    clearInterval(countInterval);
}

function extend(){
    countInterval = setInterval(countUpUpdate, 1000);
}

let countUpUpdate = () => {
    // time.totalTime = total;

    time.timeInSeconds++;
    time.totalTime++;
    postMessage(["update", toString(time.timeInSeconds), toString(time.totalTime), time.totalTime ])
    
    console.log(time.timeInSeconds);
    console.log("total time: " + time.totalTime)

    // this.updateDisplay();
    // totalTimeDiv.innerHTML = this.time.toString(this.time.totalTime)

}


//time.js functions

//Parse time from seconds to hours, minutes, seconds
function parseTime(t) {
    // console.log("parseTime: "+this.timeInSeconds)
    time.hour = 0;
    time.min = Math.floor(t / 60);
    time.sec = t % 60;
    if (time.min > 60) {
        time.hour = Math.floor(t / 3600);
        time.min = Math.floor(60 * (t % 3600) / 3600);
    }

}
function toString(t) {
    parseTime(t)

    time.sec = time.sec < 10 ? '0' + time.sec : time.sec;
    time.min = time.min < 10 ? '0' + time.min : time.min;

    if (time.hour >= 1) {
        return `${time.hour}:${time.min}:${time.sec}`;
    } else {
        return `${time.min}:${time.sec}`;
    }
    // return "toStringmin: " + this.min;
    // return ("tostring")
}