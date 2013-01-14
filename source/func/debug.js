function q(what) { console.log(what == undefined ? "yaye" : what); }

/*function getStopWatch(toTime, alertIt) {
	var watch = { start: new Date(), text: toTime };
	watch.getTime = function () { return ((new Date()).getTime() - this.start.getTime()); };
	watch.reset = function () { this.start = new Date(); };
	watch.print = function () { if (alertIt != undefined && alertIt) alert(this.text + ': ' + this.getTime()); };

	//if (alertIt != undefined && alertIt) alert('Start:' + toTime + ':' + watch.start);
	return watch;
}*/