function q(what) { console.log(what == undefined ? "yaye" : what); }

function getStopWatch(toTime, alertIt)
{
	var watch = { start: new Date(), text: toTime };
	watch.getTime = function () { return ((new Date()).getTime() - this.start.getTime()); };
	watch.reset = function () { this.start = new Date(); };
	watch.print = function () { if (alertIt != undefined && alertIt) alert(this.text + ': ' + this.getTime()); };

	//if (alertIt != undefined && alertIt) alert('Start:' + toTime + ':' + watch.start);
	return watch;
}

function getTextBuilder(isActive)
{
	var builder = { active: isActive, log: "", watch: new getStopWatch("getTextBuilder", false), box: null };
	builder.add = function (text, supressTime)
	{
		var time = supressTime == undefined ? this.watch.getTime() + ': ' : "";
		if (this.box == null)
			this.log += time + text + "\n";
		else
			this.box.val(this.box.val() + time + text + "\n");
	};
	builder.build = function ()
	{
		if (this.active)
		{
			$("#content_value").prepend("<textarea cols=50 rows=20 id=textBuilder>" + this.log + "</textarea>");
			this.box = $("#textBuilder");
		}
	};
	builder.reset = function (text) { this.watch.reset(); this.add("------------\n", true); this.add(text); };
	return builder;
}
