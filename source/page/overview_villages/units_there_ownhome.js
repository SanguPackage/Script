function makeUnitBox(id, select) {
	var box = "<select id=" + id + ">";
	$.each(world_data.units, function (i, v) {
		box += "<option value=" + i + (v == select ? " selected" : "") + ">" + trans.tw.units.names[v] + "</option>";
	});
	box += "</select>";
	return box;
}

var menu = "";
menu += "<tr>";
menu += "<th colspan=" + (4 + world_data.units.length + (world_config.hasMilitia ? 1 : 0)) + ">";
menu += "<input type=text size=5 id=filterAxeValue value='" + user_data.command.filterMinDefault + "'>";
menu += makeUnitBox("filterAxeType", user_data.command.filterMinDefaultType);
menu += "<input type=button id=filterAxe value='" + trans.sp.troopOverview.filterTroops + "'> &nbsp;";
menu += "<select id=filterPopValueType><option value=1>" + trans.sp.all.more + "</option>";
menu += "<option value=-1>" + trans.sp.all.less + "</option></select>";
menu += "<input type=text size=5 id=filterPopValue value='" + user_data.command.filterMinPopulation + "'><input type=button id=filterPop value='" + trans.sp.troopOverview.filterPopulation + "'> &nbsp; ";
menu += "<input type=button id=calculateStack value='" + trans.sp.troopOverview.calcStack + "'> &nbsp; ";
menu += "<input type=button id=snobFilter value='" + trans.sp.troopOverview.filterNoble + "'> &nbsp; ";
menu += "<input type=button id=attackFilter value='" + trans.sp.troopOverview.filterUnderAttack + "'> &nbsp; ";
menu += "<input type=checkbox id=sortIt " + (user_data.command.filterAutoSort ? " checked" : "") + "> " + trans.sp.troopOverview.sort + " &nbsp; ";

if (location.href.indexOf('type=there') > -1) {
	menu += "<input type=button id=defRestack value='" + trans.sp.troopOverview.restack + "'>";
}
menu += "</th></tr><tr id=units_table_header>";
menu += "<th>" + trans.sp.troopOverview.village + "</th>";
menu += "<th>" + trans.sp.troopOverview.nightBonus + "</th>";
$.each(world_data.units, function (i, v) {
	menu += "<th><img src='/graphic/unit/unit_" + v + ".png' title=\"" + trans.sp.troopOverview.selectUnitSpeed.replace("{0}", trans.tw.units.names[v]) + "\" alt='' id=" + v + " /></th>";
});
if (world_config.hasMilitia) {
	menu += "<th><img src='/graphic/unit/unit_militia.png' title='" + trans.tw.units.militia + "' alt='' id=militia /></th>";
}
menu += "<th>" + trans.sp.troopOverview.commandTitle + "</th>";

var currentPageSpeed = spSpeedCookie();

// Do initial filter? (based on querystring)
var search = window.location.search.substring(1).split("&");
var doFilter = false;
var unitIndex = user_data.command.filterMinDefault, unitAmount = user_data.command.filterMinDefault, sort = false, changeSpeed = false;
for (i = 0; i < search.length; i++) {
	var item = search[i].split("=");
	switch (item[0]) {
		case 'unit':
			doFilter = true;
			unitIndex = item[1];
			break;
		case 'amount':
			doFilter = true;
			unitAmount = parseInt(item[1], 10);
			break;
		case 'changeSpeed':
			changeSpeed = item[1];
			if (changeSpeed != false) {
				//spSpeedCookie(changeSpeed);
				currentPageSpeed = changeSpeed;
			}
			break;

		case 'targetvillage':
			var newTargetVillage = getVillageFromCoords(item[1]);
			spTargetVillageCookie(newTargetVillage.coord);
			break;

		case 'sort':
			sort = item[1] == "true";
			break;
	}
}

var target = getVillageFromCoords(spTargetVillageCookie());
menu += "<th nowrap>" + trans.sp.all.targetEx + " <input type=text id=targetVillage name=targetVillage size=8 value='" + (target.isValid ? target.coord : "") + "'><input type=button id=targetVillageButton value='" + trans.sp.troopOverview.setTargetVillageButton + "'></th>";
menu += "</tr>";

var villageCounter = 0;
var newTable = "";

var theUnits;
var rowSize = world_data.units.length + 1;
if (world_config.hasMilitia) {
	rowSize++;
}

var mod = "row_a";
theUnits = $("#units_table tbody");

theUnits.each(function () {
	//q($(this).html());
	var newRow = "";
	var addThisRow = true;
	var cells = $("td:gt(0)", this);
	var units = {};
	var villageId = $("td:first span[id*='label_text']", this).attr("id").substr(11);

	cells.each(function (index, element) {
		if (doFilter && index - 1 == unitIndex && parseInt(this.innerHTML, 10) < unitAmount) {
			//q("index:" + index + ' == '+ unitIndex + " : " + this.innerHTML + ' * 1 < ' + unitAmount);
			addThisRow = false;
			return false;
		}
		else if (index == rowSize) {
			//q(index + "==" + rowSize);
			newRow += "<td>";
			newRow += "<img src='/graphic/dots/red.png' title='" + trans.sp.troopOverview.removeVillage + "' /> ";
			if (game_data.village.id != villageId) {
				newRow += "<a href='" + $("a", element).attr('href').replace("mode=units", "") + "&target=" + villageId + "'>";
				newRow += "<img src='/graphic/command/attack.png' title='" + trans.sp.troopOverview.toThePlace + "'/>"; // Works only with leftclick onclick='this.src=\"/graphic/command/return.png\";'
				newRow += "</a>";
			}
			newRow += "</td>";
		} else {
			//q("units:" + world_data.units[index - 1]);
			var cellDisplay = this.innerHTML;
			if (cellDisplay == 0) {
				cellDisplay = "&nbsp;";
			}
			else if (cellDisplay.indexOf('="has_tooltip"') > -1)  {
				cellDisplay = cellDisplay.replace('="has_tooltip"', '="has_tooltip" title="'+trans.sp.troopOverview.cheapNobles+'"');
			}
			
			newRow += "<td>" + cellDisplay + "</td>";
			if (index > 0) {
				units[world_data.units[index - 1]] = parseInt(this.innerHTML, 10); 
			}
			// innerHTML can contain a + sign for the nobles: "+" indicates nobles can be rebuild cheaply
			// The snobs are not important here
		}
	});

	if (addThisRow) {
		var villageType = calcTroops(units);
		if (doFilter) {
			mod = villageCounter % 2 == 0 ? "row_a" : "row_b";
		} else {
			mod = !villageType.isDef ? "row_a" : "row_b";
		}

		newTable += "<tbody>";
		newTable += "<tr arrival='0' class='row_marker " + mod + (game_data.village.id == villageId ? " selected" : "") + "'>";
		newTable += "<td>" + $("td:first", this).html() + "</td>";
		newTable += newRow;
		newTable += "<td></td></tr>";
		newTable += "</tbody>";

		villageCounter++;
	}
});

$("#units_table").html("<table width='100%' class='vis' id='units_table' target='false'>" + menu + newTable + "</table>");
$('#targetVillage').click(function () {
	$(this).focus().select();
});

// Recalculate arrival times as the target village changes
$("#targetVillageButton").click(function () {
	trackClickEvent("TargetVillageSet");
	var targetMatch = getVillageFromCoords($('#targetVillage').val(), true);
	$("#units_table").attr("target", targetMatch.isValid);
	if (!targetMatch.isValid) {
		spTargetVillageCookie("");
		
	} else {
		spTargetVillageCookie(targetMatch.coord);
		$("#units_table").find("tr:visible:gt(1)").each(function () {
			var coord = $(this).find("span[id^=label_text_]")[0].innerHTML.match("^.*\\((\\d+)\\|(\\d+)\\) "+trans.tw.all.continentPrefix+"\\d{1,2}$");
			var dist = getDistance(targetMatch.x, coord[1], targetMatch.y, coord[2], currentPageSpeed);

			$("td:last", this).html(dist.html);
			$(this).attr("arrival", dist.travelTime);
			if (dist.isNightBonus) {
				$("td:eq(1)", this).css("background-color", user_data.colors.error);
			} else {
				$("td:eq(1)", this).css("background-color", '');
			}
		});

		if ($("#sortIt").is(":checked")) {
			$("#units_table").find("tr:visible:gt(1)").sortElements(function (a, b) {
				return parseInt($(a).attr("arrival"), 10) > parseInt($(b).attr("arrival"), 10) ? 1 : -1;
			});
		}
	}
});

// "Attacks per page" -> change to # villages in the list
var pageSize = $("input[name='page_size']");
pageSize.parent().prev().text(trans.sp.overviews.totalVillages);
pageSize.val(villageCounter);

// Distance village to target village
// Change active speed by clicking on a unit icon
$('#' + currentPageSpeed).css("border", "2px green dotted");
$('#' + spSpeedCookie()).css("border", "3px red solid");
$("#units_table_header").click(function (e) {
	if (e.target.nodeName === 'IMG') {
		currentPageSpeed = e.target.id;
		$("img", this).css("border", "0px");
		$('#' + currentPageSpeed).css("border", "2px green dotted");
		$('#' + spSpeedCookie()).css("border", "3px red solid");
		$("#targetVillageButton").click();
	}
});

$("#units_table_header").dblclick(function (e) {
	if (e.target.nodeName === 'IMG') {
		currentPageSpeed = e.target.id;
		spSpeedCookie(e.target.id);
		$("img", this).css("border", "0px");
		$('#' + currentPageSpeed).css("border", "2px green dotted");
		$('#' + spSpeedCookie()).css("border", "3px red solid");
		$("#targetVillageButton").click();
	}
});

if (sort) {
	$("#targetVillageButton").click();
}

// delete a table row
// TODO: Opera doesn't recognize right mouse clicks :(.. Perhaps we can implement this now and make it work for Firefox?
$("#units_table").mouseup(function (e) {
	if (e.target.nodeName === 'IMG') {
		if (e.target.title == trans.sp.troopOverview.removeVillage) {
			//if ((!$.browser.msie && e.button == 0) || ($.browser.msie && e.button == 1))
			//	q("Left Button");
			// else if (e.button == 2)
			//	q("Right Button");

			pageSize.val(parseInt(pageSize.val(), 10) - 1);
			$(e.target).parent().parent().parent().hide();
			//img.css("border", (img.css("border-width").substr(0, 1) * 1 + 1) + "px red solid");
		}
	}
});

// change by default selected unit the filter will be active for
$("#filterAxeType").change(function () {
	var unit = world_data.units[$(this).val()];
	if (typeof user_data.command.filterMin[unit] !== 'undefined') {
		$("#filterAxeValue").val(user_data.command.filterMin[unit]);
	} else {
		$("#filterAxeValue").val(user_data.command.filterMinOther);
	}
});

// Filter rows with less than x axemen (or another unit)
$("#filterAxe").click(function () {
	trackClickEvent("FilterUnitAmount");
	var villageCounter = 0;
	var goners = $();
	var minAxeValue = parseInt($("#filterAxeValue").val(), 10);
	var unit = parseInt($('#filterAxeType').val(), 10);
	$("#units_table").find("tr:visible:gt(1)").each(function () {
		var val = $("td:eq(" + (unit + 2) + ")", this).html();
		if (val == '&nbsp;' || parseInt(val, 10) < minAxeValue) {
			goners = goners.add($(this));
			$("input:first", $(this)).val("");
		}
		else
			villageCounter++;
	});
	goners.parent().hide();
	pageSize.val(villageCounter);
});

// Calculate stack
$("#calculateStack").click(function () {
	trackClickEvent("CalculateStack");
	if (!this.disabled) {
		this.disabled = true;
		$("#units_table").find("tr:visible:gt(1)").each(function () {
			var total = 0;
			$("td:gt(1)", this).each(function (i) {
				if (!($.trim(this.innerHTML) == '' || this.innerHTML == '&nbsp;' || i >= world_data.unitsPositionSize.length)) {
					total += this.innerHTML * world_data.unitsPositionSize[i];
				}
			});
			var color = getStackColor(total, 30 * world_config.farmLimit);
			$("td:eq(1)", this).text(formatNumber(total)).css("background-color", color);
		});
	}
});

// Calculate Restack BB codes
if (location.href.indexOf('type=there') > -1) {
	$("#defRestack").click(function () {
		trackClickEvent("BBCodeOutput");
		$("#calculateStack").click();

		var request = "";
		$("#units_table").find("tr:visible:gt(1)").each(function () {
			var total = parseInt($("td:eq(1)", $(this)).text().replace(/\./, ''), 10);
			if (user_data.restack.to - total > user_data.restack.requiredDifference) {
				var villageCoord = getVillageFromCoords($(this).find("td:first span[id*='label_']").text());
				request += "[village]" + villageCoord.coord + "[/village] (" + parseInt((user_data.restack.to - total) / 1000, 10) + "k)\n";
			}
		});

		if ($("#defRestackArea").size() == 0) {
			$(this).after("<textarea cols=35 rows=10 id=defRestackArea>" + request + "</textarea>");
		} else {
			$("#defRestackArea").val(request);
		}
	});
}

// filter rows with less then x population
$("#filterPop").click(function () {
	trackClickEvent("FilterFarm");
	$("#calculateStack").click();
	var villageCounter = 0;
	var goners = $();
	var min = parseInt($("#filterPopValue").val(), 10);
	var reverseFilter = $("#filterPopValueType").val() == "-1";
	$("#units_table").find("tr:visible:gt(1)").each(function () {
		var line = $(this);
		$("td:eq(1)", this).each(function () {
			var amount = parseInt($(this).text().replace('.', ''), 10);
			if ((!reverseFilter && amount < min) || (reverseFilter && amount > min)) {
				goners = goners.add(line);
				$("input:first", line).val("");
			}
			else villageCounter++;
		});
	});
	goners.parent().hide();
	pageSize.val(villageCounter);
});

// Filter rows without snobs/nobles
$("#snobFilter").click(function () {
	trackClickEvent("FilterSnob");
	var villageCounter = 0;
	var goners = $();
	$("#units_table").find("tr:visible:gt(1)").each(function () {
		if ($.trim($("td:eq(" + (world_data.unitsPositionSize.length + 1) + ")", this).text()) === '') {
			goners = goners.add($(this));
			$("input:first", $(this)).val("");
		} else
			villageCounter++;
	});
	goners.parent().hide();
	pageSize.val(villageCounter);
});

// hide rows not under attack
$("#attackFilter").click(function () {
	trackClickEvent("FilterUnderAttack");
	var villageCounter = 0;
	var goners = $();
	$("#units_table").find("tr:visible:gt(1)").each(function () {
		if ($('td:first:not(:has(img[title=\'' + trans.tw.command.attack + '\']))', this).size() != 0) {
			goners = goners.add($(this));
			$("input:first", $(this)).val("");
		} else {
			villageCounter++;
		}
	});
	goners.parent().hide();
	pageSize.val(villageCounter);
});