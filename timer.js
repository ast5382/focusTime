/*Represents a Timer object. Holds data and methods relating to the Timer*/

class Timer {
    time;
    worker = new Worker('worker.js');
    //  timeLeft;

    //Mutable variable for interval ID access
    countInterval;

    //add state as parameter?
    constructor(time) {
        this.time = time;
    }

    get time() {
        return this.time;
    }

    //*currently unused
    resumeTimer() {
        this.time.timeInSeconds = this.timeLeft;
        this.countInterval = setInterval(this.update, 1000);

    }

//**this will be a problem for webworker
    //  access function in script.js that does it?
    //Change text of timerDiv
    updateDisplay(t) {
        timerDiv.innerHTML = this.time.toString(t)
    };

    newWorkerTimer(h, m, s){
        // console.log("new break worker: "+h+m+s)
        this.worker.postMessage(["new",h, m, s ])
    }

    //Set interval to start timer
    start() {
        // this.countInterval = setInterval(this.update, 1000);

        this.worker.postMessage(["start", this.time]);
        // this.worker.onmessage = function (e) {
        //     console.log("postMessage from worker: " + e.data);
        //     // this.time.timeInSeconds = e.data;
        // }

        this.worker.onmessage = function (e) {
            switch (e.data[0]) {
                case "update":
                    //ISSUE: cant get timeInSec to display in the time frmat.
                    // recreate format here? or get access to time class functions in worker?
                    // console.log(e.data[1])
                    // updateDisplay(e.data[1]);
                    timerDiv.innerHTML = e.data[1];
                    // this.timeInSeconds = 
                    //.toString(e.data[1].timeInSeconds);
                    
                    break;
                // case "paused":
                //     time.timeInSeconds = e.data[1];
                    
                case "end":
                    // console.log("end called by worker")
                    timerEnd(this);
                    break;
            }
        }
        

    }

    startExtended(total) {
        // this.countInterval = setInterval(this.countUpUpdate, 1000);
        this.worker.postMessage(["extend", total]);

        this.worker.onmessage = function (e) {
            switch (e.data[0]) {
                case "update":
                    timerDiv.innerHTML = e.data[1];
                    totalTimeDiv.innerHTML = e.data[2];
                    extendedTimer.time.totalTime = e.data[3];
                    break;
            }
        }

    }

    //Clear interval to pause timer
    pause() {
       
        this.worker.postMessage(["pause"]);

    }

    //Update time and display. End when timer reaches 0
    // update = () => {
    //     if (this.time.hour == 0 && this.time.min == 0 && this.time.sec == 0) {
    //         // this.end();
    //         timerEnd(this);
    //     } else {
    //         // console.log("total time: " + this.time.totalTime)
    //         this.updateDisplay();

    //         //ISSUE: cant access "this" timer in the worker
    //         this.worker.postMessage(["start", this.time]);
    //         this.worker.onmessage = function(e){
    //             console.log(e.data);
    //             // this.time.timeInSeconds = e.data;
    //         }
    //         this.time.timeInSeconds--;
    //     }
    // }

    // countUpUpdate = () => {

    //     this.time.timeInSeconds++;
    //     this.time.totalTime++;
    //     this.updateDisplay();

    //     //**this will be a problem for webworker
    //     totalTimeDiv.innerHTML = this.time.toString(this.time.totalTime)

    //     // console.log(this.time.timeInSeconds);

    //     // let totalExtendedTime = this.time.timeInSeconds+focusTimer.time.totalTime;
    //     // console.log("total time: " + this.time.totalTime)
    //     // console.log(this.time.toString(this.time.totalTime))

    // }

    

    //*currently unused
    //Clear interval to end timer
    end() {
        console.log("timer ended");
        clearInterval(this.countInterval);

        // playSound();
        // pauseButton.style.visibility = 'hidden'
        // breakButton.style.visibility = 'visible'
        //state class would handle this w different behavior based on mode 
        state = "ended"
    }

}