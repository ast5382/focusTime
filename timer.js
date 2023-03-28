//Represents a Timer object. Holds data and methods relating to the Timer
class Timer{
    constructor(mode, h, m, s){
        this.mode = mode;
        this.time = formatTime(h, m, s);

    }
}