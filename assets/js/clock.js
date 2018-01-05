class Clock {
	constructor(div, alarm) {
		this.setTime = 10;
		this.ticking = false;
		this.startTime = Date.now();
		this.lastTick = Date.now();
		this.time = this.setTime;
		this.div = div;
		this.alarm = alarm;
		this.reset();
	}
	start() {
		// start over if timer has run out
		if (this.time == 0) {
			this.reset();
		}
		this.ticking = true;
	}
	stop() {
		this.ticking = false;
	}
	reset() {
		this.startTime = Date.now();
		this.lastTick = Date.now();
		this.time = this.setTime;
	}
	update() {
		if (this.ticking) {
			if (this.time > 0) {
				// if a second has elapsed since the last tick
				if (Date.now() - this.lastTick >= 1000) {
					this.lastTick = Date.now();
					this.time--;
				}
			}
		}
	}
}
