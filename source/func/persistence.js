/*var modernizr = (function() {
	var localstorage = (function supports_html5_storage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	})();
})();*/

//alert(modernizr.localstorage);

//q(supports_html5_storage());

function getCookie(name) {
	var x, cooks, cookie;
	if (document.cookie.match(/;/)) {
		cooks = document.cookie.split("; ");
		for (x = 0; x < cooks.length; x++) {
			cookie = cooks[x];
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

function setCookie(name, value, expireMinutes) {
	if (expireMinutes === 'undefined' || supports_html5_storage())
	var date_obj = new Date(),
		time = date_obj.getTime();
	if (expireMinutes === 'undefined') {
		time += 60 * 1000 * 24 * 356;
	} else {
		time += expireMinutes * 1000 * 60;
	}
	date_obj.setTime(time);

	document.cookie = name + "=" + value + ";expires=" + date_obj.toGMTString() + ";";
}