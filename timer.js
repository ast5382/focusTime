//Represents a Timer object. Holds data and methods relating to the Timer
class Timer{
    //  mode;
     time;
     timeLeft;

    //Mutable variable for interval ID access
    countInterval;

    //add state as parameter?
    constructor(time){
        // this.mode = mode;
        this.time = time;
        // console.log("timer created: " + this.time.toString() + " u did it! :D")
    }

    // get mode(){
    //     return this.mode;
    // }

    get time(){
        return this.time;
    }

    //currently unused
    resumeTimer(){
        this.time.timeInSeconds = this.timeLeft;
        this.countInterval = setInterval(this.update, 1000);
        // state = "running"
    }

    start(){
        //check state, perform <State>.start(this)  ??


        // console.log("this.time.min: "+ this.time.getMin());
        // console.log("start: " +this.time.timeInSeconds)

        // console.log(this.time.timeInSeconds);
        // console.log("timer.start");
        //If not restarting, start at time left
        // if (state == "paused") {
        //     // console.log("restart=false")
        //     console.log("issue in in timer.start")
            
        // } else { //if state = unstarted
            
        //     // console.log("restart=true")
        //     // timeInSec = this.time.timeInSeconds;

            this.countInterval = setInterval(this.update, 1000);
            // state = "running";
        // }
        
        // console.log("start: "+this.time.toString());
    }

    pause() {
        this.timeLeft = this.time.timeInSeconds;
        console.log("paused: " +this.time.timeInSeconds)
        // console.log("time left: " + timeLeft);
        clearInterval(this.countInterval);
        // toggleButtonView(pauseButton, startButton);
       
    
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
         if (hours == 0 && mins == 0 && secs == 0) {
            this.end();
            // timerEnd();
        } else{
            this.updateDisplay();
             this.time.timeInSeconds--;
        }
    
        
        // //displayTime(hours, mins, secs); //Seperate updateTimer and updateDisplay responsibilities?
       
    
    
    
    }

    updateDisplay(){
        timerDiv.innerHTML = this.time.toString()
    };

    end() {
        console.log("timer ended");
        clearInterval(this.countInterval);
        playSound();
        breakButton.style.visibility = 'visible'
        //state class would handle this w different behavior based on mode 
        state = "unstarted"
    }    

}