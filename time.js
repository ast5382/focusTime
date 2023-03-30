class Time{

    constructor(h, m, s){
       let timeInSeconds = Number(h * 3600) + (Number(m * 60)) + Number(s);
       console.log("time created")

    }

    get timeInSeconds(){
        return this.timeInSeconds;
    }

    
}