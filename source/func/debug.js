function q(what) { console.log(typeof what === "undefined" ? "yaye" : what); }

function qa(what) { alert(typeof what === "undefined" ? "yaye" : what); }

/*function getStopWatch(toTime, alertIt) {
	var watch = { start: new Date(), text: toTime };
	watch.getTime = function () { return ((new Date()).getTime() - this.start.getTime()); };
	watch.reset = function () { this.start = new Date(); };
	watch.print = function () { if (alertIt != undefined && alertIt) alert(this.text + ': ' + this.getTime()); };

	//if (alertIt != undefined && alertIt) alert('Start:' + toTime + ':' + watch.start);
	return watch;
}*/

function assert(shouldBeTruthy, message) {
	if (!shouldBeTruthy) {
		if (message) {
			q(message);
		} else {
			q("broken assertion");
		}
	}
}