const timer = new Timer();
const allowedNonNumericKeyCodes = [8, 13, 17, 37, 38, 39, 40, 46];

// // // // // // // // // // // // // // // // // // // //

// character code tests
function isANumberCode(code) { return ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)); }
function isALetterCode(code) { return (65 <= code && code<= 90); }

// // // // // // // // // // // // // // // // // // // //

// allow clicking into time div to change time
timer.div.addEventListener('click', () => {
	timer.clock.ticking = false;
	timer.div.setAttribute('contenteditable', 'true');
	timer.div.focus();
	timer.stop();
});
// save entered time on (1) click outside of timer div or (2) pressing enter
timer.div.addEventListener('focusout', () => {
	timer.save();
});
timer.div.addEventListener('keydown', (e) => {
	// was a number key or an allowed non-numeric key pressed?
	if (isANumberCode(e.which) || allowedNonNumericKeyCodes.includes(e.which)) {
		// was Enter pressed?
		if (e.keyCode == 13) {
			e.preventDefault();
			timer.save();
	    timer.div.blur();
		}
	} else {
		// was ctrl-A (not) pressed?
		if (e.which != 65 || e.ctrlKey != true) { 
			e.preventDefault();
		}
	}
});
// start/stop on spacebar & reset on r
// document.addEventListener('keydown', (e) => {
// 	if (e.which == 32) { timer.toggle(); }
// 	if (e.which == 82) { timer.reset(); }
// });

// show timer initially
timer.display();
// update every 0.1 seconds
setInterval(function() {
	timer.update();
	if (timer.clock.ticking) {
		timer.display();
	}
}, 100);
