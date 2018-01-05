class Timer {
	constructor() {
		this.div = document.querySelector('#timer .time');
		this.clock = new Clock();
		this.alarm = document.getElementById("myAudio");
		this.playButton = document.querySelector('#timer .ui button .play');
		this.resetButton = document.querySelector('#timer .ui button .reset');
		this.playIcon = document.querySelector('#timer .ui button i.fa-play');
	}
	stop() {
		this.playIcon.classList.remove('fa-pause')
		this.playIcon.classList.add('fa-play')
		this.clock.stop();
	}
	start() {
		this.playIcon.classList.remove('fa-play')
		this.playIcon.classList.add('fa-pause')
		this.clock.start();
	}
	toggle() {
		if (this.playIcon.classList.contains('fa-play')) {
			this.start();
		} else {
			this.stop();
		}
	}
	update() {
		this.clock.update();
		if (this.clock.time == 0 && this.clock.ticking) {
			this.soundAlarm();
		}
	}
	soundAlarm() {
		this.alarm.play(); 
	}
	display() {
		this.div.innerText = this.clock.time;
	}
	reset() {
		this.clock.reset();
		this.display();
	}
	save() {
		let text = this.div.innerText.replace(/\D/g,'');
		this.div.innerText = text;
		this.clock.setTime = parseInt(text);
		this.clock.reset();
	}

}
