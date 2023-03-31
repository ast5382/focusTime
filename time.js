class Time{
    timeInSeconds
    hour;
    min;
    sec;

    constructor(h, m, s){
        this.timeInSeconds = Number(h * 3600) + (Number(m * 60)) + Number(s);
    //    console.log("time created")

    }

    get timeInSeconds(){
        return this.timeInSeconds;
    }

//Parse time from seconds to hours, minutes, seconds
 parseTime(){
    console.log(this.timeInSeconds)
    this.hour = 0;
    this.min = Math.floor(this.timeInSeconds / 60);
    this.sec = this.timeInSeconds % 60;
    if (this.min > 60) {
        this.hour = Math.floor(this.timeInSeconds / 3600);
        this.min = Math.floor(60 * (this.timeInSeconds % 3600) / 3600);
    }
    // console.log("min: " +this.min)
}

    // toString(){
    //     sec = sec < 10 ? '0' + sec : sec;
    //     min = min < 10 ? '0' + min : min;
    
    //     if (hour >= 1) {
    //         return `${hour}:${min}:${sec}`;
    //     } else{
    //         return `${min}:${sec}`;
    //     }
    // }
    
    toString(){
        this.parseTime()
        return "hi" + this.min
    }
}