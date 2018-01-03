class Timer {
	constructor(node, alarm) {
		this.setTime = 10;
		this.ticking = false;
		this.startTime = Date.now();
		this.lastTick = Date.now();
		this.node = node;
		this.alarm = alarm;
		
		this.set();
	}
	set(time = this.setTime) {
		this.setTime = time;
		this.time = time;
		this.display();
	}
	start() {
		// start over if timer has run out
		if (this.time == 0) {
			this.reset();
		}
		this.ticking = true;
	}
	pause() {
		this.ticking = false;
	}
	reset() {
		this.startTime = Date.now();
		this.lastTick = Date.now();
		this.set(this.setTime);
		this.display();
	}
	update() {
		if (this.ticking) {
			if (Date.now() - this.lastTick >= 1000) {
				this.lastTick = Date.now();
				this.time--;
				this.display();
			}
			if (this.time == 0) {
				this.soundAlarm();
				playPauseTimer();
			}
		}
	}
	display() {
		this.node.innerText = this.time;
	}
	soundAlarm() {
		this.alarm.play(); 
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

const timerDiv = document.querySelector('#timer .time');
const alarm = document.getElementById("myAudio"); 
const timer = new Timer(timerDiv, alarm);
const playButtonIcon = document.querySelector('#timer .ui button .fa-play');

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

function makeTimerEditable() {
	timerDiv.setAttribute('contenteditable', 'true');
}

String.prototype.replaceAll = function(needle, haystack) {
    var alteredString = this;
    return alteredString.split(needle).join(haystack);
};

String.prototype.reverse = function() {
	let arr = this.split('');
	arr.reverse();
	return arr.join('')
};
function stringToTime(str) {
	let newStr = str.replaceAll(':', '');
	console.log(newStr);
	console.log(newStr.reverse().match(/.{1,2}/g).reverse().join(':'));
}

// // // // // // // // // // // // // // // // // // // //

timer.display();
// update every 1/10 seconds
setInterval(function() {
	timer.update();
}, 100);

timerDiv.addEventListener('click', function() {
	console.log('click!');
	makeTimerEditable();
});

timerDiv.addEventListener('focusout', function() {
	console.log("focusout!");
	let text = timerDiv.innerText.replace(/\D/g,'');
	timerDiv.innerText = text;
	timer.set(parseInt(text));
});

// timerDiv.addEventListener('keyup', function() {
// 	let text = timerDiv.innerText;
// 	// if (text.length % 2 == 0) {
// 	// 	timerDiv.innerText += ':';
// 	// }
// 	console.log('up!');
// 	// stringToTime(timerDiv.innerText);
// 	timerDiv.innerText.toString();
// });
