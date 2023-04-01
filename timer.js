//Represents a Timer object. Holds data and methods relating to the Timer
class Timer{
     mode;
     time;

    //Mutable variable for interval ID access
    countInterval;

    constructor(mode, time){
        this.mode = mode;
        this.time = time;
        // console.log("timer created: " + this.time.toString() + " u did it! :D")
    }

    get mode(){
        return this.mode;
    }

    get time(){
        return this.time;
    }

    start(){
        // console.log("this.time.min: "+ this.time.getMin());
        // console.log("start: " +this.time.timeInSeconds)

        // console.log(this.time.timeInSeconds);
        console.log("timer.start");
        //If not restarting, start at time left
        if (!restart) {
            // console.log("restart=false")
            this.time.timeInSeconds = timeLeft;
            this.countInterval = setInterval(this.update, 1000);
            
        } else {
            
            // console.log("restart=true")
            // timeInSec = this.time.timeInSeconds;

            this.countInterval = setInterval(this.update, 1000);
        }
        
        // console.log("start: "+this.time.toString());
    }

    pause() {
        timeLeft = this.time.timeInSeconds;
        console.log("paused: " +this.time.timeInSeconds)
        // console.log("time left: " + timeLeft);
        clearInterval(this.countInterval);
        // toggleButtonView(pauseButton, startButton);
        restart = false;
    
    }

    update = () =>{

        
        // console.log("hi");


        // console.log("update: " +this.time.sec);
        // console.log(this.time.toString()); 
        
        // let timeInUnits = parseTime();
        let hours = this.time.hour;
        // let hours = timeInUnits[0]; //will be let hours = <Timer>.timeInUnits[0];
        let mins = this.time.min;
        // console.log(mins)
        let secs = this.time.sec;
        
    
        // toString = () => {
            // secs = secs < 10 ? '0' + secs : secs;
            // mins = mins < 10 ? '0' + mins : mins;
    
        //     if (hours >= 1) {
        //         return `${hours}:${mins}:${secs}`;
        //     } else {
        //         return `${mins}:${secs}`;
        //     }
        // }
    
        this.updateDisplay();
        // //displayTime(hours, mins, secs); //Seperate updateTimer and updateDisplay responsibilities?
        this.time.timeInSeconds--;
    
        if (hours <= 0 && mins <= 0 && secs <= 0) {
            this.end();
        }
    
    
    }

    updateDisplay(){
        timerDiv.innerHTML = this.time.toString()
    };

    end() {
        clearInterval(this.countInterval);
        // console.log("timer ended");
        // playSound();
    }    

}