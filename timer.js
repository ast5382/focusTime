/*Represents a Timer object. Holds data and methods relating to the Timer*/

class Timer{
     time;
    //  timeLeft;

    //Mutable variable for interval ID access
    countInterval;

    //add state as parameter?
    constructor(time){
        this.time = time;
    }

    get time(){
        return this.time;
    }

    //*currently unused
    resumeTimer(){
        this.time.timeInSeconds = this.timeLeft;
        this.countInterval = setInterval(this.update, 1000);
   
    }

    //Set interval to start timer
    start(){
        this.countInterval = setInterval(this.update, 1000);
    }

    //Clear interval to pause timer
    pause() {
        // this.timeLeft = this.time.timeInSeconds;
        // console.log("paused: " +this.time.timeInSeconds)
        clearInterval(this.countInterval);
    }

    //Update time and display. End when timer reaches 0
    update = () =>{
         if (this.time.hour == 0 && this.time.min == 0 && this.time.sec == 0) {
            this.end();
            // timerEnd();
        } else{
            this.updateDisplay();
             this.time.timeInSeconds--;
        }
    }

    //Change text of timerDiv
    updateDisplay(){
        timerDiv.innerHTML = this.time.toString()
    };

    //Clear interval to end timer
    end() {
        console.log("timer ended");
        clearInterval(this.countInterval);

        playSound();
        pauseButton.style.visibility = 'hidden'
        breakButton.style.visibility = 'visible'
        //state class would handle this w different behavior based on mode 
        state = "unstarted"
    }    

}