//Represents a Timer object. Holds data and methods relating to the Timer
class Timer{
     mode;
     time;

    constructor(mode, time){
        this.mode = mode;
        this.time = time;
        console.log("timer created: " + this.time.toString() + " u did it! :D")
    }

    get mode(){
        return this.mode;
    }

    get time(){
        return this.time;
    }
}