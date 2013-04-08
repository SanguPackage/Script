var modernizr = (function () {
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

var pers;
(function (pers) {
	function getWorldKey(key) {
		return game_data.world + '_' + key;
	}

	function getCookie(key) {
		key = getWorldKey(key);
		return (function() {
			var x, cooks, cookie;
			if (document.cookie.match(/;/)) {
				cooks = document.cookie.split("; ");
				for (x = 0; x < cooks.length; x++) {
					cookie = cooks[x];
					if (cookie.match(key + "=")) {
						return cookie.replace(key + "=", "");
					}
				}
			} else {
				if (document.cookie.match(key + "=")) {
					return document.cookie.replace(key + "=", "");
				}
			}

			return '';
		})();
	}
	
	function getGlobal(key) {
		if (modernizr.localstorage) {
			var value = localStorage[key];
			return typeof value === 'undefined' ? '' : value;
		} else {
			return getCookie(key);
		}
	}
	
	function getSession(key) {
		key = getWorldKey(key);
		if (modernizr.localstorage) {
			var value = sessionStorage[key];
			return typeof value === 'undefined' ? '' : value;
		} else {
			return getCookie(key);
		}
	}
	
	function get(key) {
		return getGlobal(getWorldKey(key));
	}
	
	function setCookie(key, value, expireMinutes) {
		key = getWorldKey(key);
		(function() {
			var date_obj = new Date(),
				time = date_obj.getTime();
			if (typeof expireMinutes === 'undefined') {
				time += 60 * 1000 * 24 * 356;
			} else {
				time += expireMinutes * 1000 * 60;
			}
			date_obj.setTime(time);

			document.cookie = key + "=" + value + ";expires=" + date_obj.toGMTString() + ";";
		})();
	}
	
	function setGlobal(key, value) {
		if (modernizr.localstorage) {
			localStorage[key] = value;
		} else {
			setCookie(key, value);
		}
	}
	
	function setSession(key, value) {
		key = getWorldKey(key);
		if (modernizr.localstorage) {
			sessionStorage[key] = value;
		} else {
			setCookie(key, value);
		}
	}
	
	function removeSessionItem(key) {
		if (modernizr.localstorage) {
			sessionStorage.removeItem(key);
		}
		// fuck cookies
	}
	
	function set(key, value) {
		setGlobal(getWorldKey(key), value);
	}
	
	pers.removeSessionItem = removeSessionItem;
	pers.getWorldKey = getWorldKey;
	pers.set = set;
	pers.setCookie = setCookie;
	pers.setGlobal = setGlobal;
	pers.setSession = setSession;
	pers.get = get;
	pers.getCookie = getCookie;
	pers.getGlobal = getGlobal;
	pers.getSession = getSession;
})(pers || (pers = {}));