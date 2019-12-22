/*eslint no-unused-vars: ["error", { "vars": "local" }]*/
/*eslint no-undef: "error"*/
/*eslint-env browser*/

class Timer {
    
    constructor(minId, secId) {
        this.minId = minId;
        this.secId = secId;
    }
    
    getMins() {
        return parseInt(document.getElementById(this.minId).innerHTML);
    }
    
    getSecs() {
        return parseInt(document.getElementById(this.secId).innerHTML);
    }

    setMins(mins) {
        document.getElementById(this.minId).innerHTML = mins; 
    }
    
    setSecs(secs) {
        if (secs < 10) {
            secs = "0" + secs; 
        }
        document.getElementById(this.secId).innerHTML = secs; 
    }
    
    decreaseMins() {
        let mins = this.getMins();
        if (mins > 0) {
            this.setMins(mins - 1);
        };
    }
    
    decreaseSecs() {
        let secs = this.getSecs();
        this.setSecs(secs - 1);
    }
    
    increaseMins() {
        let mins = this.getMins();
        this.setMins(mins + 1);
    }
    
    calculateSeconds() {
        let mins = this.getMins();
        let secs = this.getSecs();
        secs += (mins * 60);
        return secs;
    }
    
    decrementTimer() {
        let counter = this.calculateSeconds();
        if (counter > 0) {
            let secs = counter % 60;
            if (secs == 0) {
                this.setSecs(59);
                this.setMins(this.getMins() - 1)
            } else {
                this.setSecs(secs - 1);    
            };
        };
    }
    
    start() {
        setInterval( () => this.decrementTimer(), 1000);
    }
}

let bt = new Timer("bmin", "bsec");

document.getElementById("bminus").onclick = function() {
    bt.decreaseMins();
};
document.getElementById("bplus").onclick = function() {
    bt.increaseMins();
};

let st = new Timer("smin", "ssec");
document.getElementById("sminus").onclick = function() {
    st.decreaseMins();
};
document.getElementById("splus").onclick = function() {
    st.increaseMins();
};

st.start();
bt.start();
