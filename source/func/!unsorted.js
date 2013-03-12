function getQueryStringParam(name, url) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url == undefined ? window.location.href : url);
	if (results == null) {
		return "";
	} else {
		return results[1];
	}
}

function getUrlString(url, villageId) {
	if (url.indexOf("?") == -1) {
		var link = location.href.substr(0, location.href.indexOf("?"));
		link += "?village=" + (villageId ? villageId : getQueryStringParam("village"));
		var isSit = getQueryStringParam("t");
		if (isSit) {
			link += "&t=" + isSit;
		}

		if (url.indexOf("=") == -1) {
			return link + "&screen=" + url;
		} else {
			return link + "&" + url;
		}
	} else {
		return url;
	}
}

function ajax(screen, strategy, opts) {
	if (!server_settings.ajaxAllowed)
		alert("Ajax is not allowed on German worlds. Adjust configuration.");

	opts = $.extend({}, { villageId: false, contentValue: true }, opts);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange =
		function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var text = xmlhttp.responseText;
				text = opts.contentValue ? $("#content_value", text) : text;
				strategy(text);
			}
		};

	xmlhttp.open("GET", getUrlString(screen, opts.villageId), true);
	xmlhttp.send();
}

function spSpeedCookie(setter) {
	if (setter == undefined) {
		var speedCookie = getCookie("targetVillageSpeed");
		if (speedCookie == '') {
			speedCookie = 'ram';
		}
		return speedCookie;
	} else {
		if (setter.indexOf('_') == 4) {
			setter = setter.substr(setter.indexOf('_') + 1);
		}
		setCookie("targetVillageSpeed", setter);
		return setter;
	}
}

function spTargetVillageCookie(setter) {
	if (setter == undefined) {
		return getCookie("targetVillageCoord");
	} else {
		setCookie("targetVillageCoord", setter);
		return setter;
	}
}

function getDistance(x1, x2, y1, y2, speed) {
	var dist = {};
	dist.fields = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	dist.travelTime = dist.fields * (speed == '' ? world_data.unitsSpeed.unit_ram : world_data.unitsSpeed['unit_' + speed]);
	dist.arrivalTime = getDateFromTW($("#serverTime").text(), true);
	dist.arrivalTime.setTime(dist.arrivalTime.getTime() + (dist.travelTime * 60 * 1000));
	dist.isNightBonus = isDateInNightBonus(dist.arrivalTime);

	if (speed == 'snob' && dist.travelTime > world_config.maxNobleWalkingTime) {
		dist.html = "<font color=red><b>" + twDurationFormat(dist.travelTime) + "</b></font>";
		dist.isNightBonus = true;
	} else {
		var displayTime = twDateFormat(dist.arrivalTime);
		if (speed != 'merchant' && dist.isNightBonus) {
			displayTime = "<font color=red><b>" + displayTime + "</b></font>";
		}
		dist.html = twDurationFormat(dist.travelTime) + ' || ' + displayTime;
	}

	return dist;
}

function resourceColoring() {
	var storage = parseInt($("#storage").text(), 10);
	var wood = $("#wood");
	var iron = $("#iron");
	var stone = $("#stone");

	// Color resources
	if (user_data.gsStorageShow) {
		wood.add(iron).add(stone).each(function () {
			var x = parseInt(this.innerHTML / storage * 10 - 1, 10);
			$(this).css("background-color", user_data.gsStorageBackground[x]);
		});
	}
	// Blink full resources
	if (user_data.overviewBlinkResources) {
		wood.add(iron).add(stone).filter(function () {
			return parseInt(this.innerHTML, 10) == storage;
		}).css({ "font-weight": "bolder", "color": "black" }).fadeOut().fadeIn();
	}
}

function fillRallyPoint(units) {
	var script = "";
	$.each(world_data.units, function (i, v) {
		if (units[v] != undefined && units[v] > 0) {
			script += "document.forms[0]." + v + ".value=\"" + units[v] + "\";";
		} else {
			script += "document.forms[0]." + v + ".value=\"\";";
		}
	});

	return script;
}

function getVillageFromCoords(str, looseMatch) {
	// if str is "villageName (X|Y) C54" then the villageName could be something like "456-321"
	// the regex then thinks that the villageName are the coords
	// looseMatch is thus only true when it was the user entering str.
	var targetMatch = looseMatch != undefined ? str.match(/(\d+)\D(\d+)/g) : str.match(/(\d+)\|(\d+)/g);
	if (targetMatch != null && targetMatch.length > 0) {
		var coordMatch = targetMatch[targetMatch.length - 1].match(/(\d+)\D(\d+)/);
		var village = { "isValid": true, "coord": coordMatch[1] + '|' + coordMatch[2], "x": coordMatch[1], "y": coordMatch[2] };

		village.validName = function () { return this.x + '_' + this.y; };
		village.continent = function () { return this.y.substr(0, 1) + this.x.substr(0, 1); };

		return village;
	}
	return { "isValid": false };
}

function buildAttackString(villageCoord, unitsSent, player, isSupport, seperator, minimum) {
	if (minimum == undefined) {
		minimum = 0;
	}
	if (seperator == undefined) {
		seperator = " ";
	}
	var totalPop = 0;
	var renamed = villageCoord == null ? "" : villageCoord + seperator;
	var sent = "";
	$.each(world_data.units, function (i, val) {
		var amount = unitsSent[val];
		if (amount != 0) {
			if (val == "snob") {
				renamed += trans.tw.units.names[val] + "! ";
			}
			else if (amount >= minimum) {
				sent += ", " + trans.tw.units.shortNames[val] + "=" + amount;
			}
			
			totalPop += amount * world_data.unitsPositionSize[i];
		}
	});

	if (player) {
		renamed += '(' + player + ')' + seperator;
	}
	if (sent.length > 2) {
		sent = sent.substr(2);
	}

	if (isSupport) {
		sent += seperator + "(" + trans.sp.all.populationShort + ": " + formatNumber(totalPop) + ")";
	}

	return renamed + sent;
}

function calcTroops(units) {
	// units is an array of numbers; keys are the unit names (without unit_)
	var x = {};
	x.totalDef = 0;

	function removeElement(arr, element) {
		var idx = arr.indexOf(element);
		if (idx != -1) {
			arr.splice(idx, 1);
		}
		return arr;
	}

	// heavy doesn't count in determining whether the village is def/off (since you got some crazy guys using hc as offense and defense:)
	$.each(removeElement(world_data.units_def, 'heavy'), function (i, v) { x.totalDef += units[v] * world_data.unitsSize['unit_' + v]; });
	x.totalOff = 0;
	$.each(removeElement(world_data.units_off, 'heavy'), function (i, v) { x.totalOff += units[v] * world_data.unitsSize['unit_' + v]; });

	x.isDef = x.totalDef > x.totalOff;
	x.isScout = units.spy * world_data.unitsSize.unit_spy > x.totalDef + x.totalOff;
	x.isMatch = function (type) { return (type == 'all' || (type == 'def' && this.isDef) || (type == 'off' && !this.isDef)); };

	x.getSlowest = 
		function () {
			var slowest_unit = null;
			$.each(world_data.units, function (i, v) {
				if (units[v] > 0 && (slowest_unit == null || world_data.unitsSpeed["unit_" + slowest_unit] < world_data.unitsSpeed["unit_" + v])) {
					slowest_unit = v;
				}
			});
			return slowest_unit;
		};

	x.colorIfNotRightAttackType =
		function (cell, isAttack) {
			var isSet = false;
			if (units.snob != undefined && units.snob > 0) {
				if (isAttack) {
					if (units.snob > 1) {
						isSet = true;
						cell.css("background-color", user_data.colors.error).css("border", "1px solid black");
						cell.animate({
								width: "70%",
								opacity: 0.4,
								marginLeft: "0.6in",
								fontSize: "3em",
								borderWidth: "10px"
							}, 5000, function () {
								// Animation complete.
						});
					} else {
						return;
					}
				} else {
					isSet = true;
				}
			}
			else if (x.totalDef + x.totalOff < user_data.command.filterFakeMaxPop) {
				// fake
				return;
			}

			if (!isSet && (x.isScout || x.isMatch(isAttack ? 'off' : 'def'))) {
				return;
			}
			cell.css("background-color", user_data.colors.error);
		};
		
	return x;
}


function stackDisplay(totalFarm, stackOptions) {
	// TODO: this function is only used on main village overview
	if (stackOptions == undefined) {
		stackOptions = {};
	}
	var farmSize = game_data.village.buildings.farm * world_config.farmLimit;

	var stackDesc = '<b>' + formatNumber(totalFarm);
	if (stackOptions.showFarmLimit && world_config.farmLimit > 0) {
		stackDesc += ' / ' + formatNumber(farmSize);
	}

	if (stackOptions.percentage) {
		stackDesc += ' (' + stackOptions.percentage + ')</b>';
	}

	var bgColor = getStackColor(totalFarm, farmSize);
	if (stackOptions.cell == undefined) {
		return {
			color: bgColor,
			desc: stackDesc,
			cssColor: "style='background-color:" + bgColor + "'"
		};
	} else {
		stackOptions.cell.html(stackDesc);
		if (!stackOptions.skipColoring) {
			stackOptions.cell.css("background-color", bgColor);
		}
	}
}

function getStackColor(totalFarm, farmSize) {
	var color = null;
	if (world_config.farmLimit > 0) {
		$.each(user_data.farmLimit.acceptableOverstack, function (index, val) {
			if (color == null && totalFarm > farmSize * val) {
				color = user_data.farmLimit.stackColors[index];
				return false;
			}
		});

		if (color != null) {
			return color;
		}
		
	} else {
		$.each(user_data.farmLimit.unlimitedStack, function (index, val) {
			if (color == null && totalFarm > val) {
				color = user_data.farmLimit.stackColors[index];
			}
		});

		if (color != null) {
			return color;
		}
	}

	return "transparant";
}