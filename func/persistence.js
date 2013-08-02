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
    function getKey(key) {
        return 'sangu_' + key;
    }

	function getWorldKey(key) {
		return 'sangu_' + game_data.world + '_' + key;
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
        key = getKey(key);
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
		return getGlobal(key);
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
        key = getKey(key);
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

    function set(key, value) {
        setGlobal(key, value);
    }
	
	function removeSessionItem(key) {
        key = getKey(key);
		if (modernizr.localstorage) {
			sessionStorage.removeItem(key);
		}
		// fuck cookies
	}

    function clear() {
        if (modernizr.localstorage) {
            sessionStorage.clear();
            localStorage.clear();
        }
    }
	
	pers.removeSessionItem = removeSessionItem;
	pers.getWorldKey = getWorldKey;
    pers.getKey = getKey;
	pers.set = set;
	pers.setCookie = setCookie;
	pers.setGlobal = setGlobal;
	pers.setSession = setSession;
	pers.get = get;
	pers.getCookie = getCookie;
	pers.getGlobal = getGlobal;
	pers.getSession = getSession;
    pers.clear = clear;
})(pers || (pers = {}));