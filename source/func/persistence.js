var modernizr = (function() {
	// Difference in capital letter with the Modernizr library
	// So nothing will break should TW start making use of it
	return {
		localstorage: (function supports_html5_storage() {
			try {
				return 'localStorage' in window && window['localStorage'] !== null;
			} catch (e) {
				return false;
			}
		})()
	};
})();

function getCookie(name, forceCookieUse) {
	name = game_data.world + '_' + name;
	if (modernizr.localstorage && (forceCookieUse === undefined || !forceCookieUse)) {
		var value = localStorage[name];
		return value === undefined ? '' : value;
	} else {
		// Use cookies
		return (function() {
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
		})();
	}
}

function setCookie(name, value, expireMinutes) {
	name = game_data.world + '_' + name;
	if (modernizr.localstorage && expireMinutes === undefined) {
		localStorage[name] = value;
	} else {
		// Use cookies
		(function() {
			var date_obj = new Date(),
				time = date_obj.getTime();
			if (expireMinutes === 'undefined') {
				time += 60 * 1000 * 24 * 356;
			} else {
				time += expireMinutes * 1000 * 60;
			}
			date_obj.setTime(time);

			document.cookie = name + "=" + value + ";expires=" + date_obj.toGMTString() + ";";
		})();
	}
}