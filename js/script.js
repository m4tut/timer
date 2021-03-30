class Timer {
    constructor(date, launch) {
        let diffSeconds = Math.floor((launch.getTime() - date.getTime()) / 1000);
        this.days = Math.floor(diffSeconds / (3600 * 24));
        diffSeconds = diffSeconds % (3600 * 24);
        this.hours = Math.floor(diffSeconds / 3600);
        this.minutes = Math.floor((diffSeconds % 3600) / 60);
        this.seconds = Math.floor((diffSeconds % 3600) % 60);
        this.launched = this.days == 0 && this.hours == 0 && this.minutes == 0 && this.seconds == 0;
    }
    countDown() {
        if (this.days == 0 && this.hours == 0 && this.minutes == 0 && this.seconds == 0) {
            this.launched = true;
        } else if (!this.launched) {
            this.seconds--;
            if (this.seconds <= 0 && (this.minutes > 0 || this.hours > 0 || this.days > 0)) {
                this.seconds = 59;
                this.minutes--;
                if (this.minutes <= 0 && (this.hours > 0 || this.days > 0)) {
                    if (this.hours) this.minutes = 59;
                    this.hours--;
                    if (this.hours <= 0 && this.days > 0) {
                        this.hours = 23;
                        this.days--;
                    }
                }
            }
        }
    }
    getCountDown() {
        return [this.days, this.hours, this.minutes, this.seconds];
    }
    getLaunched() {
        return this.launched;
    }
}

// Init global values
const date = new Date();
let launch = new Date('2022-01-01'); // initial countdown timer
launch.setTime(launch); // initial countdown timer
console.log(launch);
const timer = new Timer(date, launch);

// Begin looping onload
let cards;
window.addEventListener('load', () => {
    cards = document.getElementsByClassName('card');
    const time = timer.getCountDown();
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const text = ('' + time[i]).length == 1 ? '0' + time[i] : time[i];
        card.children[0].firstChild.innerText = text;
        card.children[1].firstChild.innerText = text;
    }
    //requestAnimationFrame(loop);
    loop();
    setInterval(() => loop(), 2000);
});
const pastTime = timer.getCountDown();
const loop = () => {
    timer.countDown();
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const time = timer.getCountDown();
        // Remove animated cards
        if (card.children.length == 4) {
            card.removeChild(card.firstChild);
            card.removeChild(card.lastChild);
        }
        const top = card.children[0].firstChild;
        const bottom = card.children[1].firstChild;
        const text = [
            ('' + pastTime[i]).length == 1 ? '0' + pastTime[i] : pastTime[i],
            ('' + time[i]).length == 1 ? '0' + time[i] : time[i],
        ];
        // Animate the card
        if (pastTime[i] != time[i]) {
            pastTime[i] = time[i];
            const copyTop = document.createElement('div');
            copyTop.className = 'top animate';
            copyTop.innerHTML = `<h2>${text[0]}</h2>`;
            card.prepend(copyTop);
            const copyBottom = document.createElement('div');
            copyBottom.className = 'bottom animate';
            copyBottom.innerHTML = `<h2>${text[1]}</h2>`;
            card.appendChild(copyBottom);
        }
        top.innerText = text[1];
        setTimeout(() => {
            bottom.innerText = text[1];
        }, 1000);
        //setTimeout(() => (bottom.innerText = text[0]), 500);
    }
    //if (!timer.getLaunched()) requestAnimationFrame(loop);
};
