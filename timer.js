/*Represents a Timer object. Holds data and methods relating to the Timer*/

class Timer {
    time;
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

    //Set interval to start timer
    start() {
        this.countInterval = setInterval(this.update, 1000);
    }
    startExtended() {
        this.countInterval = setInterval(this.countUpUpdate, 1000);

    }

    //Clear interval to pause timer
    pause() {
        // this.timeLeft = this.time.timeInSeconds;
        // console.log("paused: " +this.time.timeInSeconds)
        clearInterval(this.countInterval);
    }

    //Update time and display. End when timer reaches 0
    update = () => {
        if (this.time.hour == 0 && this.time.min == 0 && this.time.sec == 0) {
            // this.end();
            timerEnd(this);
        } else {
            // console.log("total time: " + this.time.totalTime)
            this.updateDisplay();
            this.time.timeInSeconds--;
        }
    }

    countUpUpdate = () => {
        this.updateDisplay();
        this.time.timeInSeconds++;
        this.time.totalTime++;
        console.log(this.time.timeInSeconds);

        // let totalExtendedTime = this.time.timeInSeconds+focusTimer.time.totalTime;
        // console.log("total time: " + this.time.totalTime)
        console.log(this.time.toString(this.time.totalTime))

    }

    //Change text of timerDiv
    updateDisplay() {
        timerDiv.innerHTML = this.time.toString(this.time.timeInSeconds)
    };

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