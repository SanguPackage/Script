/**
 * Log the parameter to the console (print yaye when undefined)
 */
function q(what) { console.log(typeof what === "undefined" ? "yaye" : what); }

/**
 * Alert the parameter (yaye when undefined)
 */
function qa(what) { alert(typeof what === "undefined" ? "yaye" : what); }

/*function getStopWatch(toTime, alertIt) {
	var watch = { start: new Date(), text: toTime };
	watch.getTime = function () { return ((new Date()).getTime() - this.start.getTime()); };
	watch.reset = function () { this.start = new Date(); };
	watch.print = function () { if (alertIt != undefined && alertIt) alert(this.text + ': ' + this.getTime()); };

	//if (alertIt != undefined && alertIt) alert('Start:' + toTime + ':' + watch.start);
	return watch;
}*/

function sangu_alert(e) {
    var position = $("#storage").position(),
        options = {
            left: $(window).width() / 2 - 300,
            top: position.top + 35,
            width: 600,
            showOnce: false
        },
        content = {
            title: trans.sp.sp.packageCrashTitle,
            body: trans.sp.sp.packageCrash
                .replace("{url}", server_settings.helpdeskUrl)
                .replace(/\{error\}/g, e.message)
                .replace("{page}", JSON.stringify(current_page))
                .replace("{version}", sangu_version)
                .replace("{stacktrace}", e.stack ? e.stack + "\n\n" + e.stacktrace : "assertion?")
                .replace("{email}", server_settings.sanguEmail)
        };

    if (user_data.global.showCrashReport && sangu_crash) {
        $("#sangu_activator").attr("src", "graphic/dots/grey.png");
        createFixedTooltip("sanguCrash", content, options);
    }
}

function assert(shouldBeTruthy, message) {
	if (!shouldBeTruthy) {
        sangu_alert({message: message ? message : "broken assertion"});
	}
}

function handleException(e) {
    sangu_alert(e);
}