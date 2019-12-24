/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/*eslint no-undef: "error"*/
/*eslint-env browser*/

class Pomodoro {
    constructor(bmins, smins) {
        // instance variables
        this.bmins = bmins;
        this.smins = smins;
        this.isPlayBtn = true;
        this.isSession = true;
        this.playBtn = document.querySelector("#play");
        // add event listeners
        this.playBtn.addEventListener("click", () => this.playBtnPressed());
        // create timers and set
        this.bt = new Timer("#bmin", "#bsec", "#bminus", "#bplus");
        this.st = new Timer("#smin", "#ssec", "#sminus", "#splus");
        this.bt.setMins(this.bmins);
        this.st.setMins(this.smins);
    }
    
    // switches between a pause and play icon
    // invokes play() or pause() accordingly  
    playBtnPressed() {
        if (this.isPlayBtn) {
            this.playBtn.innerHTML = '<i class="fa fa-pause-circle-o" aria-hidden="true"></i>';
            this.play();
            this.isPlayBtn = false;
        } else {
            this.playBtn.innerHTML = '<i class="fa fa-play-circle-o" aria-hidden="true"></i>';
            this.pause();
            this.isPlayBtn = true;
        }
    }
    
    // starts the appropriate timer
    play() {
        if (this.isSession) {
            this.st.start();
        } else {
            this.bt.start();
        }
        setInterval( () => this.checkTime(), 1000);
    }
    
    // pauses the appropriate timer
    pause() {
        if (this.isSession) {
            this.st.stop();
        } else {
            this.bt.stop();
        }
    }
    
    // checks if timer has finished
    // switches if necessary
    // then resets timer to orginal state
    checkTime() {
        if (this.isSession) {
            if (this.st.hasFinished) {
                this.isSession = false;
                this.bt.start();
                this.st.setMins(this.smins);
                this.st.stop();
            }
        } else {
            if (this.bt.hasFinished) {
                this.isSession = true;
                this.st.start();
                this.bt.setMins(this.bmins);
                this.bt.stop();
            }
        }
    }
}

class Timer {
    constructor(minId, secId, minusId, plusId) {
        // instance variables
        this.minId = minId;
        this.secId = secId;
        this.minusId = minusId;
        this.plusId = plusId;
        this.interval = null;
        this.hasFinished = null; 
        this.minusBtn = document.querySelector(this.minusId);
        this.plusBtn = document.querySelector(this.plusId);
        this.minutes = document.querySelector(this.minId);
        this.seconds = document.querySelector(this.secId);
        // add event listeners
        this.minusBtn.addEventListener("click", () => this.decreaseMins());
        this.plusBtn.addEventListener("click", () => this.increaseMins());
    }
    
    // returns number of mins
    getMins() {
        return parseInt(this.minutes.innerHTML);
    }
    
    // returns number of secs
    getSecs() {
        return parseInt(this.seconds.innerHTML);
    }

    // sets number of mins
    setMins(mins) {
        this.minutes.innerHTML = mins; 
    }
    
    // sets number of seconds
    setSecs(secs) {
        if (secs < 10) {
            secs = "0" + secs; 
        }
        this.seconds.innerHTML = secs; 
    }
    
    // used by minus button
    // decreases timer by one minute
    decreaseMins() {
        let mins = this.getMins();
        if (mins > 0) {
            this.setMins(mins - 1);
        }
    }
    
    // used by plus button
    // increases timer by one minute
    increaseMins() {
        let mins = this.getMins();
        this.setMins(mins + 1);
    }
    
    // converts current time to seconds
    calculateSeconds() {
        let mins = this.getMins();
        let secs = this.getSecs();
        secs += (mins * 60);
        return secs;
    }
    
    // decreases the timer by one second if greater than zero
    // switches from '0' to '59' when necessary
    // confirms timer has reached zero
    decrementTimer() {
        let counter = this.calculateSeconds();
        if (counter > 0) {
            let secs = counter % 60;
            if (secs == 0) {
                this.setSecs(59);
                this.setMins(this.getMins() - 1)
            } else {
                this.setSecs(secs - 1);    
            }
        } else {
            this.hasFinished = true;
        }
    }
    
    // begins countdown of timer 
    start() {
        this.interval = setInterval( () => this.decrementTimer(), 1000);
        this.hasFinished = false;
    }
    
    // pauses timer
    stop() {
        clearInterval(this.interval);
    }
}

// create a pomodoro clock
let p = new Pomodoro(5, 25);

