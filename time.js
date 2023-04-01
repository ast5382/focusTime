class Time {
    timeInSeconds;
    hour;
    min = 999;
    sec;

    constructor(h, m, s) {
        this.timeInSeconds = Number(h * 3600) + (Number(m * 60)) + Number(s);
        //    console.log("time created")

    }

    get timeInSeconds() {
        return this.timeInSeconds;
    }

    //Parse time from seconds to hours, minutes, seconds
    parseTime() {
        // console.log("parseTime: "+this.timeInSeconds)
        this.hour = 0;
        this.min = Math.floor(this.timeInSeconds / 60);
        this.sec = this.timeInSeconds % 60;
        if (this.min > 60) {
            this.hour = Math.floor(this.timeInSeconds / 3600);
            this.min = Math.floor(60 * (this.timeInSeconds % 3600) / 3600);
        }

    }

    get hour() {
        this.parseTime();
        return this.hour
    }
    get min() {
        this.parseTime();
        // console.log(min)
        return this.min;
    }
    get sec() {
        this.parseTime();
        return this.sec
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

    //TODO: set to actual 00:00:00 format
    toString() {
        this.parseTime()

        this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
        this.min = this.min < 10 ? '0' + this.min : this.min;

        if (this.hour >= 1) {
            return `${this.hour}:${this.min}:${this.sec}`;
        } else {
            return `${this.min}:${this.sec}`;
        }
        // return "toStringmin: " + this.min;
        // return ("tostring")
    }
}