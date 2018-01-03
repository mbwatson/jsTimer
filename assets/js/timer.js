
class Timer {
	constructor(node) {
		this.remainingTime = 300;
		this.ticking = false;
		this.lastSetTime = 300;
		this.node = node;
		this.startTime = Date.now();
		this.lastTick = Date.now();
		this.display();
	}
	set(time = this.lastSetTime) {
		this.remainingTime = time;
		this.display();
	}
	start() {
		this.startTime = Date.now();
		this.ticking = true;
	}
	pause() {
		this.ticking = false;
	}
	reset() {
		this.startTime = Date.now();
		this.lastTick = Date.now();
		this.set(this.lastSetTime);
		this.display();
	}
	update() {
		if (this.ticking && Date.now() - this.lastTick >= 1000) {
			this.lastTick = Date.now();
			this.remainingTime--;
			this.display();
		}
		// console.log(`${this.remainingTime} seconds on the clock`);
	}
	display() {
		this.node.innerText = this.remainingTime.toHHMMSS();
	}
}

Number.prototype.toHHMMSS = function() {
	return this.toString().toHHMMSS();
}

String.prototype.toHHMMSS = function() {
  let s = parseInt(this, 10);
  let h = Math.floor(s / 3600);
  let m = Math.floor((s - (h * 3600)) / 60);
  s = s - (h * 3600) - (m * 60);
  if ( h < 10 ) { h = `0${h}`; }
  if ( m < 10 ) { m = `0${m}`; }
  if ( s < 10 ) { s = `0${s}`; }
  return `${h}:${m}:${s}`;
}

// // // // // // // // // // // // // // // // // // // //

const $timerDiv = document.querySelector('.timer');
const timer = new Timer($timerDiv);
const playButtonIcon = document.querySelector('.fa-play');

document.onload = function() {
	timer.display();
}

setInterval(function() {
	timer.update();
}, 100);

function playPauseTimer() {
	if (playButtonIcon.classList.contains('fa-play')) {
		playButtonIcon.classList.remove('fa-play')
		playButtonIcon.classList.add('fa-pause')
		timer.start();
	} else {
		playButtonIcon.classList.remove('fa-pause')
		playButtonIcon.classList.add('fa-play')
		timer.pause();
	}
}

function resetTimer() {
	timer.reset();
}
