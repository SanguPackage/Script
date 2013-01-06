// Aanvallen groeperen per dorp
var menu = "";
menu += "<table class=vis width='100%'>";
menu += "<tr><th colspan=" + (3 + world_data.units.length) + ">";
if (location.href.indexOf('type=all') > -1 || location.href.indexOf('&type=') == -1)
{
	menu += "<input type=button id=filterReturning value='" + trans.sp.commands.filterReturn + "'>&nbsp;";
}
menu += "<input type=checkbox id=sorterenSum " + (user_data.command.sumRow ? "checked" : "") + "> " + trans.sp.commands.totalRows + " ";
var isSupport = location.href.indexOf('type=support') > -1;
menu += "<input type=button id=sorteren value='" + trans.sp.commands.group + "'>";
menu += "&nbsp; <input type=button id=defRestack value='" + trans.sp.commands.bbCodeExport + "' title='" + trans.sp.commands.bbCodeExportTooltip + "'>";

menu += "<br>";
menu += "<input type=checkbox id=defReverseFilter title='" + trans.sp.commands.filtersReverse + "'> " + trans.sp.commands.filtersReverseInfo + ": ";
menu += "&nbsp; <span style='background-color: #ecd19a; border: 1px solid black' id='unitFilterBox'>";
menu += "&nbsp; <img src='graphic/unit/unit_snob.png' id=filtersnob>&nbsp; <img src='graphic/unit/unit_spy.png' id=filterspy>&nbsp; <img src='graphic/face.png' id=filterFake>&nbsp;";
menu += "</span>";
menu += "&nbsp; <input type=text size=12 id=defFilterTextValue value=''>";
menu += "<input type=button id=defFilterText value='" + trans.sp.commands.freeTextFilter + "'>";

menu += "&nbsp; <input type=textbox size=3 id=defFilterContinentText maxlength=2><input type=button id=defFilterContinent value='" + trans.sp.commands.continentFilter + "'>";

var commandListType = getQueryStringParam("type");
if (commandListType == "attack")
{
	menu += "&nbsp; <input type=button id=defFilterBarbaar value='" + trans.sp.commands.barbarianFilter + "'>";
}

menu += "</th></tr>";
menu += "</table>";
$("#commands_table").before(menu);
var offsetToUnits = 3;

$("#defReverseFilter").change( function () {
	var isChecked = $(this).is(":checked");
	var defTrans = trans.sp.commands;
	$("#unitFilterBox").find("img:eq(0)").attr("title", !isChecked ? defTrans.nobleFilter : defTrans.nobleFilterRev);
	$("#unitFilterBox").find("img:eq(1)").attr("title", isChecked ? defTrans.spyFilter : defTrans.spyFilterRev);
	$("#unitFilterBox").find("img:eq(2)").attr("title", !isChecked ? defTrans.fakeFilter : defTrans.fakeFilterRev);

	$("#defFilterBarbaar").attr("title", !isChecked ? defTrans.barbarianFilterTooltip : defTrans.barbarianFilterTooltipReverse);
	$("#defFilterContinent").attr("title", isChecked ? defTrans.continentFilterTooltip : defTrans.continentFilterTooltipReverse);

	$("#defFilterText").attr("title", defTrans.freeTextFilterTooltip.replace("{filterType}", isChecked ? defTrans.freeTextFilterTooltipFilterTypeWith : defTrans.freeTextFilterTooltipFilterTypeWithout));
});
	
$("#defReverseFilter").change();
var hasGrouped = false;

// generate bb code export
$("#defRestack").click( function () {
	var villages = [];
	var request = {};
	var filter = hasGrouped ? "tr.command:visible" : "tr:gt(0):visible";
	$("#commands_table " + filter).each( function () {
		var row = $(this);
		var cells = $("td", row);
		var firstCellText = $.trim(cells.first().text());
		if (firstCellText.indexOf(trans.tw.command.returnFull) != 0 && firstCellText.indexOf(trans.tw.command.sentBackBy) != 0 && firstCellText.indexOf(trans.tw.command.returnFrom) != 0)
		{
			var village = getVillageFromCoords(firstCellText);
			if (village.isValid)
			{
				if (request[village.coord] == undefined)
				{
					request[village.coord] = { village: village.coord, attacks: [], hasOs: false, hasAttack: false };
					villages.push(village.coord);
				}

				var unitsSent = {};
				$.each(world_data.units,
					function (i, val)
					{
						unitsSent[val] = cells.eq(offsetToUnits + i).text() * 1;
					});

				//alert(village.coord + ":" + buildAttackString(village.coord, unitsSent, null, false));
				var isOs = false;
				if (commandListType == "support") isOs = true;
				else if (commandListType == "attack") isOs = false;
				else isOs = cells.first().has("img[src*='command/support.png']").size() == 1;

				if (isOs) request[village.coord].hasOs = true;
				else request[village.coord].hasAttack = true;

				request[village.coord].attacks.push(
					{
						isOs: isOs,
						units: unitsSent,
						unitsString: buildAttackString(null, unitsSent, null, isOs, " ", user_data.command.bbCodeExport.requiredTroopAmount),
						arrival: cells.eq(2).text(),
						arrivalDate: getDateFromTodayTomorrowTW(cells.eq(2).text())
					});
			}
		}
	});

	var requestsPer500 = [""];
	var requestComposed = "";
	for (var i = 0; i < villages.length; i++)
	{
		var currentVillage = request[villages[i]];
		var currentText = "";
		currentText += "[spoiler][code]";
		var attackCount = 0;
		var osCount = 0;
		var lastAttack = null;
		var largestAttack = 0;
		var totalPop = 0;
		for (var attackId = 0; attackId < currentVillage.attacks.length; attackId++)
		{
			var currentAttack = currentVillage.attacks[attackId];
			if (currentAttack.isOs)
			{
				osCount++;
				$.each(world_data.units, function (i, val)
				{
					totalPop += currentAttack.units[val] * world_data.unitsPositionSize[i];
				});
			}
			else
			{
				attackCount++;
				if (lastAttack == null || lastAttack < currentAttack.arrivalDate)
					lastAttack = currentAttack.arrivalDate;
			}
			if (largestAttack < currentAttack.unitsString.length)
			{
				largestAttack = currentAttack.unitsString.length;
			}
		}

		for (var attackId = 0; attackId < currentVillage.attacks.length; attackId++)
		{
			var currentAttack = currentVillage.attacks[attackId];
			currentText += currentAttack.unitsString;
			var extraTabs = (largestAttack - currentAttack.unitsString.length) / 1;
			if (Math.ceil(extraTabs) == extraTabs) extraTabs = Math.ceil(extraTabs);
			for (var tabs = 0; tabs < extraTabs + 1; tabs++) currentText += " ";
			currentText += "\t" + twDateFormat(currentAttack.arrivalDate, true) + "\n";
		}
		currentText += "[/code][/spoiler]\n";

		var headerTemplate;
		if (!currentVillage.hasOs && currentVillage.hasAttack) headerTemplate = trans.sp.commands.exportAttackHeader;
		else if (currentVillage.hasOs && !currentVillage.hasAttack) headerTemplate = trans.sp.commands.exportDefenseHeader;
		else headerTemplate = trans.sp.commands.exportCompleteHeader;

		requestComposed +=
			headerTemplate
				.replace("{#}", attackCount)
				.replace("{os#}", osCount)
				.replace("{totalStack}", formatNumber(totalPop))
				.replace("{lastAttack}", currentVillage.hasAttack ? twDateFormat(lastAttack, true) : "")
				.replace("{village}", "[village]" + villages[i] + "[/village]")
				+ "\n " + currentText;

		// splitsen per 500 [ karakters
		var amountBracket = requestsPer500[requestsPer500.length - 1].match(/\[/g);
		if (amountBracket != null && (requestComposed.match(/\[/g).length + amountBracket.length > 500))
		{
			requestsPer500.push("");
		}
		requestsPer500[requestsPer500.length - 1] += requestComposed;
		requestComposed = "";
	}

	if ($("#textsArea").size() == 0) $(this).parent().parent().parent().append("<tr><td id=textsArea></td></tr>");
	else $("#textsArea").html("");
	for (var i = 0; i < requestsPer500.length; i++)
	{
		$("#textsArea").append("<textarea cols=50 rows=10 class=restackArea>" + requestsPer500[i] + "</textarea>");
	}
});

function filterCommandRows(filterStrategy)
{
	// true = wegfilteren; false = laten staan (zonder reverse filter)
	var reverseFilter = $("#defReverseFilter").is(":checked");
	var goners = $();
	var filter = hasGrouped ? "tr.command:visible" : "tr:gt(0):visible";
	$("#commands_table " + filter).each( function () {
		if ($("th", this).size() != 0) return;
		if (!reverseFilter != !filterStrategy($(this)))
		{
			goners = goners.add($(this));
			$("input:eq(1)", this).val("");
		}
	});
	goners.hide();

	// Totalen correct zetten
	var aantalCommandos = $("#commands_table " + filter).size();
	if (hasGrouped) $("#commands_table tr.somLijn").hide();
	else aantalCommandos--;

	$("#commands_table th:first").text(trans.sp.commands.tableTotal.replace("{0}", aantalCommandos));
	$("#aantalAanvallen").text(aantalCommandos);
	if ($("#aantalAanvallen").size() == 1) $("#aantalTargets").val("???");
}

// Terugkerende troepen filteren
$("#filterReturning").bind('click', function ()
{
	$(this).attr("disabled", "disabled");
	filterCommandRows( function (row) {
		var firstCell = $("td:first", row).html();
		return firstCell.indexOf(">" + trans.tw.command.returnFull) != -1 || firstCell.indexOf(">" + trans.tw.command.sentBackBy) != -1 || firstCell.indexOf(">" + trans.tw.command.returnFrom) != -1;
	});
});

$("#defFilterText").click( function () {
	var compareTo = $("#defFilterTextValue").val().toLowerCase();
	if (compareTo.length > 0)
		filterCommandRows(
			function (row)
			{
				return row.text().toLowerCase().indexOf(compareTo) == -1;
			});
});

$("#filterspy").click( function () {
	var position = $.inArray($(this).attr("id").substr(6), world_data.units);
	filterCommandRows(
		function (row)
		{
			if (row.find("td").eq(position + offsetToUnits).text() == "0") return false;
			var totalScout = row.find("td").eq(position + offsetToUnits).text();

			var cell = row.find("td:eq(" + (offsetToUnits - 1) + ")");
			for (var i = 0; i < world_data.units.length; i++)
			{
				cell = cell.next();
				if (totalScout < cell.text()) return false;
			}
			return true;
		});
});

$("#filtersnob").click( function () {
	var position = $.inArray($(this).attr("id").substr(6), world_data.units) + offsetToUnits;
	filterCommandRows(
		function (row)
		{
			return row.find("td").eq(position).text() == "0";
		});
});

$("#filterFake").click( function () {
	var maxPop = user_data.command.filterFakeMaxPop;
	filterCommandRows(
		function (row)
		{
			var total = 0;
			var cell = row.find("td:eq(" + (offsetToUnits - 1) + ")");
			for (var i = 0; i < world_data.units.length; i++)
			{
				cell = cell.next();
				total += cell.text() * 1;

				// Een edel aanval is nooit een fake:
				if (i == world_data.units.length - 1 && cell.text() != "0") return false;

				if (total > maxPop) return false;
			}
			return true;
		});
});

$("#defFilterBarbaar").click( function () {
	filterCommandRows(
		function (row)
		{
			var tekst = $.trim(row.find("td:first").text());
			return !tekst.match(/^\d{1,3}\|\d{1,3} \(/) && tekst.match(/^\d{1,3}\|\d{1,3}/);
		});
});

$("#defFilterContinent").click( function () {
	var continent = parseInt($("#defFilterContinentText").val());
	if (!isNaN(continent))
		filterCommandRows(
			function (row)
			{
				var village = getVillageFromCoords(row.find("td:first").text());
				if (!village.isValid) return true;
				return village.continent() != continent;
			});
});

// Binnenkomende aanvallen sorteren
$("#sorteren").bind('click', function () {
	hasGrouped = true;
	var newTable = "";
	var targets = [];
	var aantalCommandos = 0;
	var som = $('#sorterenSum').attr('checked') == "checked";
	$("#filterReturning").attr("disabled", true);

	$("#commands_table").find("tr:gt(0):visible").each(function ()
	{
		var target = $("span[id*='labelText']", this).text();
		var village = getVillageFromCoords(target);
		if (village.isValid)
		{
			aantalCommandos++;
			if (targets[village.coord] == undefined)
			{
				targets.push(village.coord);
				targets[village.coord] = new Array();
			}
			targets[village.coord].push($(this));
		}
	});

	var mod = 0;
	if (isSupport)
	{
		$.each(targets, function (i, v)
		{
			mod++;
			var aantal = 0;
			var totaalDef = new Array();
			totaalDef['pop'] = 0;
			$.each(world_data.units, function (index, value) { totaalDef[value] = 0; });

			$.each(targets[v], function (index, value)
			{
				newTable += "<tr class='command nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>" + value.html() + "</tr>";
				aantal++;

				var unitAmounts = $("td:gt(2)", value);
				$.each(world_data.units, function (iUnit, vUnit)
				{
					var amount = unitAmounts.eq(iUnit).html() * 1;
					if (aantal == 1)
					{
						totaalDef[vUnit] = amount;
					}
					else
					{
						totaalDef[vUnit] += amount;
					}
					totaalDef['pop'] += amount * world_data.unitsSize['unit_' + vUnit];
				});
			});

			if (som)
			{
				newTable += "<tr class='somLijn'><td align=right colspan=3><b>" + trans.sp.commands.totalRowsText.replace("{0}", aantal).replace("{1}", formatNumber(totaalDef['pop'])) + "&nbsp;</b></td>";
				$.each(world_data.units, function (iUnit, vUnit)
				{
					newTable += "<td>" + (totaalDef[vUnit] == 0 ? "&nbsp;" : formatNumber(totaalDef[vUnit])) + "</td>";
				});
				newTable += "</tr>";
			}
		});
	}
	else
	{
		// Aanvallen (dus niet OS bevelen)
		$.each(targets, function (i, v)
		{
			mod++;
			var aantal = 0;
			var laatsteAankomst = '';
			$.each(targets[v], function (index, value)
			{
				var huidigeAankomst = $(value).find("td:eq(2)").text();
				if (laatsteAankomst == huidigeAankomst)
				{
					// Op zelfde seconde de aankomsttijd niet tonen
					newTable += "<tr class='command nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>";
					$(this).find("td").each(function (i)
					{
						if (i == 2) newTable += "<td>&nbsp;</td>";
						else if ($(this).text() == 0) newTable += "<td class=hidden>0</td>";
						else newTable += "<td>" + $(this).html() + "</td>";
					});
					newTable += "</tr>";
				}
				else
				{
					newTable += "<tr class='command nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>" + value.html() + "</tr>";
				}
				laatsteAankomst = huidigeAankomst;
				aantal++;
			});

			if (som)
			{
				newTable += "<tr class='somLijn'><td align=right colspan=" + (3 + world_data.units.length) + ">" + aantal + "&nbsp;</td></tr>";
			}
		});
	}

	var menu = $("#commands_table tr").first().html();
	$("#commands_table").html("<table id='commands_table' class='vis'>" + menu + newTable + "</table>");

	// Aantal aanvallen
	if ($("#aantalAanvallen").size() == 0)
	{
		var totalDesc = (isSupport ? trans.sp.commands.totalOS : trans.sp.commands.totalAttack);
		var totalVillagesDesc = isSupport ? trans.sp.commands.totalVillagesOS : trans.sp.commands.totalVillagesAttack;
		var pageSize = $("input[name='page_size']");
		if (pageSize.size() == 0)
		{
			pageSize = $("input[type='submit']:last");
			pageSize.after("<table class=vis><tr class='row_a'><th>" + totalVillagesDesc + "</th><td><input type=text size=5 value=" + targets.length + " id=aantalTargets></td></tr><tr class='row_a'><th>" + totalDesc + ":</th><td id='aantalAanvallen'>" + aantalCommandos + "</td></tr></table>");
		}
		else
		{
			pageSize[0].id = "aantalTargets";
			pageSize.parent().prev().text(totalVillagesDesc);
			pageSize = pageSize.val(targets.length).parent().parent().parent();
			pageSize.append('<tr><th colspan=2>' + totalDesc + ':</th><td id="aantalAanvallen">' + aantalCommandos + '</td></tr>');
		}
	}
	else
	{
		$("#aantalTargets").val(targets.length);
		$("#aantalAanvallen").text(aantalCommandos);
	}
});