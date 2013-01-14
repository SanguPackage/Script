function getCookie(name, isGlobalWorld)
{
	var x;
	if (document.cookie.match(/;/)) {
		var cooks = document.cookie.split("; ");
		for (x = 0; x < cooks.length; x++) {
			var cookie = cooks[x];
			if (cookie.match(name + "=")) {
				return cookie.replace(name + "=", "");
			}
		}
	} else {
		if (document.cookie.match(name + "=")) {
			return document.cookie.replace(name + "=", "");
		}
	}

	return '';
}

function setCookie(name, value, expireMinutes)
{
	var date_obj = new Date();
	time = date_obj.getTime();
	if (expireMinutes == undefined) {
		time += 60 * 1000 * 24 * 356;
	} else {
		time += expireMinutes * 1000 * 60;
	}
	date_obj.setTime(time);

	var expires = "expires=" + date_obj.toGMTString() + ";";
	document.cookie = name + "=" + value + ";" + expires;
}