//Wider table
if (user_data.rallyPointAttackBoxWidth != null && user_data.rallyPointAttackBoxWidth > 0)
{
	var commandsTable = $("h3:contains('" + trans.tw.place.troopMovements + "')");
	if (commandsTable.size() > 0)
	{
		commandsTable = commandsTable.next();
		$("th[width='250']", commandsTable).attr("width", user_data.rallyPointAttackBoxWidth);
	}
}

// Auto rename attacks
//setCookie("attRen", "", 0);
if (user_data.attackAutoRename)
{
	var cooks = document.cookie.split("; ");
	for (var x = 0; x < cooks.length; x++)
	{
		var cookie = cooks[x];
		if (cookie.indexOf("attRen") == 0)
		{
			var val = cookie.substr(cookie.indexOf("=") + 1);
			var thisVil = val.substr(0, val.indexOf('_'));
			val = val.substr(val.indexOf('_') + 1);
			var id = val.substr(0, val.indexOf("\\"));
			var msg = val.substr(val.indexOf("\\") + 1);

			if (id.length > 0 && thisVil == game_data.village.id)
			{
				var rename = $("input[value='" + id + "']");
				if (rename.size() > 0)
				{
					setCookie(cookie.substr(0, cookie.indexOf("=")), "", 0);
					rename.val(msg).next().click();
				}
			}
		}
	}
}

// Spice up rally point:
// troepen beschikbaar
var units = [];
units['total'] = 0;
$("#units_form .unitsInput").each(function ()
{
	var amount = $(this).next().text().substr(1);
	units[this.name] = amount.replace(")", "") * 1;
	units['total'] += units[this.name] * world_data.unitsSize['unit_'+this.name];
});

// Nieuwe menu elementen toevoegen
/*if (user_data.place.newWindow.active)
{
	var menuTable = $("#content_value table.vis:first");
	var newMenu = "<br><table class=vis width='100%'><tr><th>Sangu</th></tr>";
	newMenu += "<tr><td><a href='#'>" + trans.sp.place.newWindow +"</a></td></tr>";
	newMenu += "</table>";
	menuTable.after(newMenu);
}*/

// snelheid kunnen wijzigen & tonen!
var vilHome = getVillageFromCoords(game_data.village.coord);
var snelheidCookie = twSnelheidCookie();
$("#units_form a img").bind("click", function ()
{
	var unit = this.src;
	unit = unit.substr(unit.lastIndexOf('/') + 1);
	unit = unit.substr(0, unit.lastIndexOf('.'))
	snelheidCookie = twSnelheidCookie(unit);
	$("#units_form a img").css("border", "0px").filter("img[src*='" + unit + "']").css("border", "3px red solid");

	// lastvil
	var coord = getVillageFromCoords(getCookie("lastVil"));
	if (coord.isValid)
	{
		var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, snelheidCookie);
		$("#lastVilTime")[0].innerHTML = dist.html;
	}

	// doelvil
	coord = getVillageFromCoords(getCookie("doelwit"));
	if (coord.isValid)
	{
		dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, snelheidCookie);
		$("#doelVilTime")[0].innerHTML = dist.html;
	}

}).filter("img[src*='" + snelheidCookie + "']").css("border", "3px red solid");

var cookie = getCookie("lastVil");
var coord = getVillageFromCoords(cookie);
if (coord.isValid)
{
	var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, snelheidCookie);
	var htmlStr = printCoord(coord, "&raquo; " + trans.sp.all.last + ": " + coord.x + "|" + coord.y);
	htmlStr += " &nbsp; <span id=lastVilTime>" + dist.html + "</span>";
	$("#units_form").append(htmlStr);
}

// naam van bestaande "Laatste" vervangen
var existingLastLink = $("#target_attack").parent().prev().find("a:last");
if (existingLastLink.size() != 0)
{
	var regXY = existingLastLink.attr("onclick").toString().match(/val\((\d+)\);\$\('#inputy'\)\.val\((\d+)\)/);
	if (regXY != null)
	{
		htmlStr = printCoord(coord, "&raquo; " + regXY[1] + "|" + regXY[2]);
		existingLastLink.attr("title", existingLastLink.text().substr(2)).html(htmlStr);
	}
}

// doelwit erbij zetten
var doel = getVillageFromCoords(getCookie('doelwit'));
if (doel.isValid)
{
	var dist = getDistance(doel.x, vilHome.x, doel.y, vilHome.y, snelheidCookie);
	$("#units_form").append("<br>" + printCoord(doel, "&raquo; " + trans.sp.all.target + ": " + doel.x + "|" + doel.y) + " &nbsp;<span id=doelVilTime>" + dist.html + "</span>");

	if (user_data.alternativeTargetPosition)
	{
		var htmlStr = printCoord(doel, "&raquo; " + doel.x + "|" + doel.y);
		$("#target_attack").parent().prev().append(htmlStr);
	}
}

// Extra links bij "Alle troepen"
function createRallyPointScript(linksVak, unitLoop, naam, min, checkFunction, tag)
{
	send = {};
	$.each(unitLoop, function (i, v)
	{
		//if (v == 'light') alert(v + ' UNITS: ' + units[v] + ' >= MIN: ' + min + " ;; " + tag);
		if (units[v] >= min)
		{
			send[v] = checkFunction(units[v], v, tag);
			//if (v == 'light') alert(send[v]);
		}
	});
	linksVak.append("&nbsp; &nbsp;<a href='#' onclick='" + fillRallyPoint(send) + "; return false'>" + naam + "</a>");
}

var villageType = calcTroops(units);
//alert("Def:" + totalDef + " - Off:" + totalOff);
var linksVak = $('#selectAllUnits').parent().attr("colspan", 4)

// add fake attack
var minFake = 0;
if (world_data.hasMinFakeLimit)
{
	minFake = getBuildingPoints();
	minFake *= world_data.minFake;
	if (units.ram > 0) minFake -= world_data.unitsSize['unit_ram'];
}
 
if (user_data.fakePlaceLink && units['total'] >= minFake)
{
	createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.fake, 0, function (amount, v, tag)
	{
		if ((v == 'ram' || v == 'catapult') && !tag.rammed && amount > 0)
		{
			tag.rammed = true;
			return 1;
		}
		
		//alert(v + " // " + tag.toSend + " // " + amount);
		if (v == 'snob' || tag.toSend <= 0 || amount == 0) return 0;

		if (user_data.fakePlaceExcludeTroops.indexOf(v) > -1) return 0;

		//alert('unit_'+v);
		var farmSize = world_data.unitsSize['unit_' + v];
		//alert(v + ' sends ' + amount + ' // toSend: ' + tag.toSend + " // farmSize: " + farmSize);
		if (amount * farmSize > tag.toSend) amount = Math.ceil(tag.toSend / farmSize);
		tag.toSend -= amount * farmSize;
		if (v == 'sword' && amount > 0)
		{
			tag.toSend++;
			amount--;
		}

		return amount;
	}, { toSend: minFake, rammed: false });
}

if (units['total'] > 0)
$.each(user_data.customPlaceLinks, function (i, v)
{
	if (v.active && villageType.isMatch(v.type)) // villageType: off, def, all
	{
		if (v.required == undefined || units[v.required[0]] >= v.required[1]) // requires certain amount of troops
		{
			if (v.totalPop == undefined) // work with absolute numbers
			{
				createRallyPointScript(linksVak, world_data.units, v.name, 0, function (amount, unitVal, tag)
				{
					//alert(v + ' - SEND:' + tag[v] + '; amount=' + amount + ';');
					var send = tag[unitVal];
					if (send != undefined && amount > 0)
					{
						//alert("send: " + send + " // amount: " + amount + " // unitVal: " + unitVal); 
						if (send < 0)
						{
							send = amount + send;
							if (send < 0) send = 1;
						}
						if ((amount - send) * world_data.unitsSize['unit_' + unitVal] < tag.sendAlong) send = amount;
						if (send > 0 && !tag.ignoreNobles)
						{
							$.each(user_data.nobleSupport, function (i, val)
							{
								if (unitVal == val.Unit && villageType.isMatch(val.VillageType))
									send -= Math.ceil(units.snob * (val.Population / world_data.unitsSize['unit_' + unitVal]));
							});
						}
						//if (unitVal == 'light') alert(send);

						if (send > amount) return amount;
						if (send > 0) return send;
					}
					return 0;
				}, v);
			}
			else // do automatic calculation which division of troops to select
			{
				////{ active: true, type: 'def', name: 'HelftZc', totalPop: 10000, divideOver: ['spear', 'heavy'] },
				//TODO we zaten hier
				var totalPop = 0;
				$.each(v.divideOver, function (i, val) { totalPop += units[val] * world_data.unitsSize['unit_' + val]; });

				createRallyPointScript(linksVak, world_data.units, v.name, 0, function (amount, unitVal, tag)
				{
					if ($.inArray(unitVal, tag.divideOver) == -1) return 0;
					if (totalPop < tag.totalPop) return amount;

					var currentUnitPercentage = (amount * world_data.unitsSize['unit_' + unitVal]) / totalPop;
					//alert(unitVal + ' - %:' + (currentUnitPercentage) + '; amount=' + amount + ' * ' + world_data.unitsSize['unit_' + unitVal] + " / " + totalPop);

					return Math.floor(amount * currentUnitPercentage);
				}, v);
			}
		}
	}
});

if (units.spy >= user_data.scoutVillage && user_data.scoutPlaceLinks != null && user_data.scoutPlaceLinks.length > 0)
{
	$.each(user_data.scoutPlaceLinks, function (i, v)
	{
		if (units.spy >= v)
			createRallyPointScript(linksVak, ["spy"], user_data.attackLinkNames.scout + v, 0, function (amount, v, tag)
			{
				return tag;
			}, v);
	});
}

if (units.snob > 0 && user_data.noblePlaceLink)
{
	createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.nobleMax, 0, function (amount, v, tag)
	{
		if (v == 'snob') return 1;
		if (tag > 0)
		{
			var returned = null;
			$.each(user_data.nobleSupport, function (i, val)
			{
				if (v == val.Unit && villageType.isMatch(val.VillageType))
					returned = amount - Math.ceil((tag - 1) * (val.Population / world_data.unitsSize['unit_' + v]));
			});
			if (returned != null) return returned;
		}
		return amount;
	}, units.snob);

	if (units.snob > 1 || user_data.noblePlaceLinksForceShow)
	{
		createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.nobleMin, 0, function (amount, v, tag)
		{
			if (v == 'snob') return 1;
			var returned = 0;
			$.each(user_data.nobleSupport, function (i, val)
			{
				if (v == val.Unit && villageType.isMatch(val.VillageType))
					returned = Math.ceil(1 * (val.Population / world_data.unitsSize['unit_' + v]));
			});
			return returned;
		});
	}

	if (units.snob > 0)
		createRallyPointScript(linksVak, world_data.units, user_data.attackLinkNames.nobleDivide, 0, function (amount, v, tag)
		{
			if (v == 'snob') return 1;
			if (v == 'catapult') return 0;
			if (v == 'ram' && !user_data.noblePlaceLinkDivideAddRam) return 0;
			return Math.floor(amount / units.snob);
		});
}