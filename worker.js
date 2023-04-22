

let countInterval;
let action;
let time; 
// time.hour=76;
onmessage = function(e){
   
    // importScripts('time.js');
    // this.postMessage(this.time.timeInSeconds--);
    //ISSUE: cant access the timer object inside this worker :/
    // console.log(e);

    action = e.data[0];
    time = e.data[1];
  

    
    //need time interval insde web worker!!!
    //only need time in seconds to keep counting, dont need display to change
    //> only need to update and post time value

    switch (action) {
        case "start":
            start();
            
            break;
    }
    // console.log("hi");
    // this.postMessage(time.hour);

    //for testing
    // this.postMessage(countInterval);

}

function start(){
    countInterval = setInterval(update, 1000);
}

// function sayHi(){
//     const message = "hi :)";
//     return message;
// }

    //Update time and display. End when timer reaches 0
   let update = () => {
    // importScripts('time.js');
    // console.log()

    //issue: time cant access its getters, the hour/min/sec properties are stuck
    // at their initial values
        if (time.timeInSeconds == 0) {

            //can it access this?? no it cannot
            // timerEnd(this);
            clearInterval(countInterval);
            this.postMessage(["end"]);

        } else {

            //can it access this? no it cannot
            //  updateDisplay();
            
            time.timeInSeconds--;
            postMessage(["update", toString(time.timeInSeconds)])
        }
    }

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