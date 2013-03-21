// DATETIME FUNCTIONS
function prettyDate(diff, showSeconds) {
	diff = diff / 1000;
	if (diff < 0) {
		return "&nbsp;";
	}
	if (diff < 60) {
		if (showSeconds) {
			return diff + " " + trans.sp.tagger.sentSeconds;
		}
		return trans.sp.tagger.sentNow;
	}
	if (diff < 120) {
		return trans.sp.tagger.sent1Minute;
	}
	if (diff < 3600) {
		return Math.floor(diff / 60) + " " + trans.sp.tagger.sentMinutes;
	}
	if (diff < 7200) {
		return trans.sp.tagger.sent1Hour + ", " + Math.floor((diff - 3600) / 60) + " " + trans.sp.tagger.sentMinutes;
	}
	return Math.floor(diff / 3600) + " " + trans.sp.tagger.sentHours + ", " + Math.floor((diff % 3600) / 60) + " " + trans.sp.tagger.sentMinutes;
}

function twDurationFormat(num) {
	var days = 0;
	if (user_data.displayDays) {
		days = Math.floor(num / 1440);
	}
	num -= days * 1440;
	var hours = Math.floor(num / 60);
	num -= hours * 60;
	var mins = Math.floor(num);
	num -= mins;
	var secs = Math.round(num * 60);

	if (days > 0) {
		return days + '.' + pad(hours, 2) + ':' + pad(mins, 2) + ':' + pad(secs, 2);
	} else {
		return pad(hours, 2) + ':' + pad(mins, 2) + ':' + pad(secs, 2);
	}
}

function twDateFormat(dat, alwaysPrintFullDate, addYear) {
	var day = dat.getDate();
	var cur = new Date().getDate();

	if (!alwaysPrintFullDate && day == cur) {
		return trans.tw.all.today + " " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2);
	}
	else if (!alwaysPrintFullDate && day == cur + 1) {
		return trans.tw.all.tomorrow + " " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2);
	}
	else if (addYear) {
		return trans.tw.all.dateOn + " " + dat.getDate() + "." + pad(dat.getMonth() + 1, 2) + "." + (dat.getFullYear() + '').substr(2) + " " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2); // + "(" + dat.getFullYear() + ")";
	} else {
		return trans.tw.all.dateOn + " " + dat.getDate() + "." + pad(dat.getMonth() + 1, 2) + ". " + pad(dat.getHours(), 2) + ':' + pad(dat.getMinutes(), 2) + ':' + pad(dat.getSeconds(), 2); // + "(" + dat.getFullYear() + ")";
	}
}

function getTimeFromTW(str) {
	// NOTE: huh this actually returns the current date
	// with some new properties with the "str" time
	//17:51:31
	var timeParts = str.split(":");
	var seconds = timeParts[2];
	var val = {};
	val.hours = parseInt(timeParts[0], 10);
	val.minutes = parseInt(timeParts[1], 10);
	if (seconds.length > 2) {
		var temp = seconds.split(".");
		val.seconds = parseInt(temp[0], 10);
		val.milliseconds = parseInt(temp[1], 10);
	} else {
		val.seconds = parseInt(seconds, 10);
	}
	val.totalSecs = val.seconds + val.minutes * 60 + val.hours * 3600;
	return val;
}

function getDateFromTW(str, isTimeOnly) {
	//13.02.11 17:51:31
	var timeParts, seconds;
	if (isTimeOnly) {
		timeParts = str.split(":");
		seconds = timeParts[2];
		var val = new Date();
		val.setHours(timeParts[0]);
		val.setMinutes(timeParts[1]);
		if (seconds.length > 2) {
			var temp = seconds.split(".");
			val.setSeconds(temp[0]);
			val.setMilliseconds(temp[1]);
		} else {
			val.setSeconds(seconds);
		}
		return val;
	} else {
		var parts = str.split(" ");
		var dateParts = parts[0].split(".");
		timeParts = parts[1].split(":");
		seconds = timeParts[2];
		var millis = 0;
		if (seconds.length > 2) {
			var temp = seconds.split(".");
			seconds = temp[0];
			millis = temp[1];
		} if (dateParts[2].length == 2) {
			dateParts[2] = (new Date().getFullYear() + '').substr(0, 2) + dateParts[2];
		}

		return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0], timeParts[0], timeParts[1], seconds, millis);
	}
}

function getDateFromTodayTomorrowTW(str) {
	var currentT = new Date();
	var dateParts = [];
	var parts = $.trim(str).split(" ");
	if (str.indexOf(trans.tw.all.tomorrow) != -1) {
		dateParts[0] = currentT.getDate() + 1;
		dateParts[1] = currentT.getMonth();
	} else if (str.indexOf(trans.tw.all.today) != -1) {
		dateParts[0] = currentT.getDate();
		dateParts[1] = currentT.getMonth();
	} else {
		dateParts = parts[1].split(".");
		dateParts[1] = parseInt(dateParts[1], 10) - 1;
	}

	var timeParts = parts[parts.length - 2].split(":");
	var seconds = timeParts[2];
	var millis = 0;
	if (seconds.length > 2) {
		var temp = seconds.split(".");
		seconds = temp[0];
		millis = temp[1];
	}

	return new Date(new Date().getFullYear(), dateParts[1], dateParts[0], timeParts[0], timeParts[1], seconds, millis);
}

function isDateInNightBonus(date) {
	if (!world_config.nightbonus.active) return false;
	return date.getHours() >= world_config.nightbonus.from && date.getHours() < world_config.nightbonus.till;
}