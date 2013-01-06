function getQueryStringParam(name, url)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url == undefined ? window.location.href : url);
	if (results == null)
		return "";
	else
		return results[1];
}

function getUrlString(url, villageId)
{
	if (url.indexOf("?") == -1)
	{
		var link = location.href.substr(0, location.href.indexOf("?"));
		link += "?village=" + (villageId ? villageId : getQueryStringParam("village"));
		var isSit = getQueryStringParam("t");
		if (isSit) link += "&t=" + isSit;

		if (url.indexOf("=") == -1)
			return link + "&screen=" + url;
		else
			return link + "&" + url;
	}
	else
	{
		return url;
	}
}

function ajax(screen, strategy, opts)
{
	opts = $.extend({}, { villageId: false, contentValue: true }, opts);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange =
	function ()
	{
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var text = xmlhttp.responseText;
			text = opts.contentValue ? $("#content_value", text) : text;
			strategy(text);
		}
	};

	xmlhttp.open("GET", getUrlString(screen, opts.villageId), true);
	xmlhttp.send();
}

function twSnelheidCookie(setter)
{
	if (setter == undefined)
	{
		var snelheidCookie = getCookie("doelwitSpeed");
		if (snelheidCookie == '') snelheidCookie = 'ram';
		return snelheidCookie;
	}
	else
	{
		if (setter.indexOf('_') == 4)
			setter = setter.substr(setter.indexOf('_') + 1);
		setCookie("doelwitSpeed", setter);
		return setter;
	}
}

function getDistance(x1, x2, y1, y2, snelheid)
{
	var dist = {};
	dist.fields = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	dist.travelTime = dist.fields * (snelheid == '' ? world_data.unitsSpeed.unit_ram : world_data.unitsSpeed['unit_' + snelheid]);
	//dist.arrivalTime = new Date();
	dist.arrivalTime = getDateFromTW($("#serverTime").text(), true);
	dist.arrivalTime.setTime(dist.arrivalTime.getTime() + (dist.travelTime * 60 * 1000));
	dist.isNachtbonus = isDateInNachtbonus(dist.arrivalTime);

	if (snelheid == 'snob' && dist.travelTime > world_data.maxNobleWalkingTime)
	{
		dist.html = "<font color=red><b>" + twDurationFormat(dist.travelTime) + "</b></font>";
		dist.isNachtbonus = true;
	}
	else
	{
		var displayTime = twDateFormat(dist.arrivalTime);
		if (snelheid != 'merchant' && dist.isNachtbonus) displayTime = "<font color=red><b>" + displayTime + "</b></font>";
		dist.html = twDurationFormat(dist.travelTime) + ' || ' + displayTime;
	}

	return dist;
}

function resourceColoring()
{
	var storage = $("#storage").text() * 1;
	var wood = $("#wood");
	var iron = $("#iron");
	var stone = $("#stone");
	//alert(wood.text() + " - " + stone.text() + " - " + iron.text());

	// Color resources
	if (user_data.gsStorageShow)
	{
		wood.add(iron).add(stone).each(function ()
		{
			var x = parseInt(this.innerHTML / storage * 10 - 1);
			$(this).css("background-color", user_data.gsStorageBackground[x]);
		});
	}
	// Blink full resources
	if (user_data.overviewBlinkResources)
	{
		wood.add(iron).add(stone).filter(function ()
		{
			return this.innerHTML * 1 == storage;
		}).css({ "font-weight": "bolder", "color": "black" }).fadeOut().fadeIn();
	}
}

function fillRallyPoint(units)
{
	var script = "";
	$.each(world_data.units, function (i, v)
	{
		if (units[v] != undefined && units[v] > 0)
			script += "document.forms[0]." + v + ".value=\"" + units[v] + "\";";
		else
			script += "document.forms[0]." + v + ".value=\"\";";
	});

	return script;
}

function getVillageFromCoords(str, looseMatch)
{
	// strip: als str is "Dorpsnaam (X|Y) C54" dan kan de dorpsnaam zijn "456-321"
	// regex denkt dan dat de dorpsnaam is
	// looseMatch is dus true bij een coord die de gebruiker zelf ingaf
	var doelMatch = looseMatch != undefined ? str.match(/(\d+)\D(\d+)/g) : str.match(/(\d+)\|(\d+)/g);
	//q(str +"\n" + doelMatch);
	if (doelMatch != null && doelMatch.length > 0)
	{
		//alert("isOk: "+doelMatch.length);
		var coordMatch = doelMatch[doelMatch.length - 1].match(/(\d+)\D(\d+)/);
		var village = { "isValid": true, "coord": coordMatch[1] + '|' + coordMatch[2], "x": coordMatch[1], "y": coordMatch[2] };

		// prototype :(
		village.validName = function () { return this.x + '_' + this.y; };
		village.continent = function () { return this.y.substr(0, 1) + this.x.substr(0, 1) };

		return village;
	}
	return { "isValid": false };
}

function buildAttackString(villageCoord, unitsSent, player, isOs, seperator, minimum)
{
	if (minimum == undefined) minimum = 0;
	if (seperator == undefined) seperator = " ";
	var totalPop = 0;
	var renamed = villageCoord == null ? "" : villageCoord + seperator;
	var sent = "";
	$.each(world_data.units, function (i, val)
	{
		var amount = unitsSent[val];
		if (amount != 0)
		{
			if (val == "snob")
				renamed += trans.tw.units.names[val] + "! ";
			else if (amount >= minimum)
				sent += ", " + trans.tw.units.shortNames[val] + "=" + amount;

			totalPop += amount * world_data.unitsPositionSize[i];
		}
	});

	if (player) renamed += '(' + player + ')' + seperator;
	if (sent.length > 2) sent = sent.substr(2);

	if (isOs)
	{
		sent += seperator + "(" + trans.sp.all.populationShort + ": " + formatNumber(totalPop) + ")";
	}

	return renamed + sent;
}

function calcTroops(units)
{
	// units is an array of numbers; keys are the unit names (without unit_)
	var x = {};
	x.totalDef = 0;

	function removeElement(arr, element)
	{
		var idx = arr.indexOf(element);
		if (idx != -1) arr.splice(idx, 1);
		return arr;
	}

	// heavy doesn't count in determining whether the village is def/off
	$.each(removeElement(world_data.units_def, 'heavy'), function (i, v) { x.totalDef += units[v] * world_data.unitsSize['unit_' + v]; });
	x.totalOff = 0;
	$.each(removeElement(world_data.units_off, 'heavy'), function (i, v) { x.totalOff += units[v] * world_data.unitsSize['unit_' + v]; });
	//x.totalOff -= units.spy * world_data.unitsSize['unit_spy'];

	x.isDef = x.totalDef > x.totalOff;
	//alert((units.spy * world_data.unitsSize['unit_spy']) + " > " + x.totalDef +"+"+ x.totalOff);
	x.isScout = units.spy * world_data.unitsSize['unit_spy'] > x.totalDef + x.totalOff;
	x.isMatch = function (type) { return (type == 'all' || (type == 'def' && this.isDef) || (type == 'off' && !this.isDef)) };

	x.getSlowest =
		function ()
		{
			var slowest_unit = null;
			$.each(world_data.units,
				function (i, v)
				{
					//alert(v + ":" + world_data.unitsSpeed[slowest_unit] +"<"+ world_data.unitsSpeed[v]);
					if (units[v] > 0 && (slowest_unit == null || world_data.unitsSpeed["unit_" + slowest_unit] < world_data.unitsSpeed["unit_" + v]))
					{
						slowest_unit = v;
					}
				});
			return slowest_unit;
		};

	x.colorIfNotRightAttackType =
		function (cell, isAttack)
		{
			var isSet = false;
			if (units.snob != undefined && units.snob > 0)
			{
				if (isAttack)
				{
					if (units.snob > 1)
					{
						isSet = true;
						cell.css("background-color", user_data.colors.error).css("border", "1px solid black").animate({
							width: "70%",
							opacity: 0.4,
							marginLeft: "0.6in",
							fontSize: "3em",
							borderWidth: "10px"
						}, 5000, function ()
						{
							// Animation complete.
						});
						//.fadeOut().fadeIn();
					}
					else return;
				}
				else isSet = true;
			}
			else if (x.totalDef + x.totalOff < user_data.command.filterFakeMaxPop)
			{
				// fake
				return;
			}

			if (!isSet && (x.isScout || x.isMatch(isAttack ? 'off' : 'def'))) return;

			cell.css("background-color", user_data.colors.error);
		};

	//alert("Def:" + x.totalDef + " - Off:" + x.totalOff);

	return x;
}


function stackDisplay(totaalFarm, stackOptions)
{
	// only used on main village overview
	if (stackOptions == undefined) stackOptions = {};
	var farmSize = game_data.village.buildings.farm * world_data.farmLimit;

	var stackDesc = '<b>' + formatNumber(totaalFarm);
	if (stackOptions.showFarmLimit && world_data.farmLimit > 0)
	{
		stackDesc += ' / ' + formatNumber(farmSize);
	}

	if (stackOptions.percentage) stackDesc += ' (' + stackOptions.percentage + ')</b>';

	var bgColor = getStackColor(totaalFarm, farmSize);
	if (stackOptions.cell == undefined)
	{
		return {
			color: bgColor,
			desc: stackDesc,
			cssColor: "style='background-color:" + bgColor + "'"
		};
	}
	else
	{
		stackOptions.cell.html(stackDesc);
		if (!stackOptions.skipColoring) stackOptions.cell.css("background-color", bgColor);
	}
}

function getStackColor(totaalFarm, farmSize)
{
	var color = null;
	if (world_data.farmLimit > 0)
	{
		$.each(user_data.farmLimit.acceptableOverstack,
	function (index, val)
	{
		if (color == null && totaalFarm > farmSize * val)
		{
			color = user_data.farmLimit.stackColors[index];
			return false;
		}
	});

		if (color != null) return color;
	}
	else
	{
		$.each(user_data.farmLimit.unlimitedStack,
	function (index, val)
	{
		if (color == null && totaalFarm > val)
		{
			color = user_data.farmLimit.stackColors[index];
		}
	});

		if (color != null) return color;
	}

	return "transparant";
}

