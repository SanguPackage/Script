overviewTable = $("#units_table");
tableHandler.init("units_table", {
	hasBottomTotalRow: true
});

var isSupport = location.href.indexOf('type=support_detail') > -1;

var menu = "<table class='vis' width='100%'>";
menu += "<tr><th colspan=2>";
menu += "<input type=button id=defTotals value='" + trans.sp.defOverview.stackButton + "' title='" + trans.sp.defOverview.stackTooltip + "'>";
if (isSupport) {
	menu += "&nbsp; <input type=text size=8 id=defFilterTotalPopValue value='" + user_data.restack.defaultPopulationFilterAmount + "'>";
	menu += "<select id=defFilterTotalPopComparer>";
	menu += "<option value=-1>" + trans.sp.all.less + "</option><option value=1 selected>" + trans.sp.all.more + "</option></select>";
	menu += "<input type=button id=defFilterTotalPop value='" + trans.sp.defOverview.stackFilter + "' title='" + trans.sp.defOverview.stackFilterTooltip + "'> &nbsp;| &nbsp;";

	menu += trans.sp.defOverview.village + " <input type=text size=5 id=defFilterDistVillage value=''>";
	menu += "<select id=defFilterDistType>";
	menu += "<option value=1 selected>" + trans.sp.all.closer + "</option><option value=-1>" + trans.sp.all.further + "</option></select>";
	menu += "&nbsp;F <input type=text size=3 id=defFilterDistanceValue value=" + user_data.restack.fieldsDistanceFilterDefault + ">";
	menu += "<input type=button id=defFilterDist value='" + trans.sp.defOverview.distFilter + "' title='" + trans.sp.defOverview.distFilterTooltip + "'> &nbsp;| &nbsp;";

	menu += " <input type=text size=8 id=defRestackTo value=" + user_data.restack.to + "> <input type=button id=defRestack value='" + trans.sp.defOverview.stackBBCodes + "' title='" + trans.sp.defOverview.stackBBCodesTooltip + "'>";
	menu += "<br>";
}
menu += "<input type=button id=defHideEmpty value='" + trans.sp.defOverview.filterNoSupport + "' title='" + trans.sp.defOverview.filterNoSupportTooltip + "'> ";
menu += isSupport ? trans.sp.defOverview.extraFiltersSupport : trans.sp.defOverview.extraFiltersDefense;
menu += "<input type=checkbox id=defReverseFilter title='" + trans.sp.defOverview.extraFiltersReverse + "'" + (user_data.restack.filterReverse ? " checked" : "") + "> " + trans.sp.defOverview.extraFiltersInfo + " | ";
menu += "&nbsp; <input type=text size=3 id=defFilterDistanceValue value=" + user_data.restack.fieldsDistanceFilterDefault + "> <input type=button id=defFilterDistance value='" + trans.sp.defOverview.distFilter2 + "'>";
menu += "&nbsp; <span style='background-color: #ecd19a; border: 1px solid black' id='unitFilterBox'>";
menu += "&nbsp; <img src='graphic/unit/unit_snob.png' id=filtersnob>&nbsp; <img src='graphic/unit/unit_spy.png' id=filterspy>";
menu += "&nbsp; <img src='graphic/buildings/barracks.png' id=filterAttack>&nbsp;<img src='graphic/unit/def.png' id=filterDefense>&nbsp;<img id=filterSupport src='graphic/command/support.png'>&nbsp;";
menu += "</span>";
menu += "&nbsp; <input type=text size=12 id=defFilterTextValue value=''>";
menu += "<input type=button id=defFilterText value='" + trans.sp.defOverview.freeTextFilter + "'>";
menu += "&nbsp; <input type=button id=attackFilter value='" + trans.sp.defOverview.filterUnderAttack + "'>";

if (!isSupport) {
	menu += "&nbsp; <input type=button id=defFilterBarbarian value='" + trans.sp.defOverview.barbarianFilter + "' title='" + trans.sp.defOverview.barbarianFilterTooltip + "'>";
}

menu += "</th></tr></table>";
$("#units_table").before(menu);

$("input.selectAll").replaceWith("<input type=checkbox id=selectAllVisible>");
$("#selectAllVisible").click(function () {
	var isChecked = $(this).attr("checked") == "checked";
	$("#units_table input.village_checkbox:hidden").attr("checked", false);
	$("#units_table input.village_checkbox:visible").attr("checked", isChecked);
});

$("#defReverseFilter").change(function () {
	var isChecked = $(this).is(":checked");
	var defTrans = trans.sp.defOverview;
	$("#unitFilterBox").find("img:eq(0)").attr("title", isChecked ? defTrans.nobleFilter : defTrans.nobleFilterRev);
	$("#unitFilterBox").find("img:eq(1)").attr("title", isChecked ? defTrans.spyFilter : defTrans.spyFilterRev);
	$("#unitFilterBox").find("img:eq(2)").attr("title", isChecked ? defTrans.attackFilter : defTrans.attackFilterRev);
	$("#unitFilterBox").find("img:eq(3)").attr("title", isChecked ? defTrans.supportFilter : defTrans.supportFilterRev);

	$("#unitFilterBox").find("img:eq(4)").attr("title", (isSupport ? defTrans.otherPlayerFilterFrom : defTrans.otherPlayerFilterTo).replace("{action}", isChecked ? defTrans.otherPlayerFilterShow : defTrans.otherPlayerFilterHide));
	$("#defFilterText").attr("title", defTrans.freeTextFilterTooltip.replace("{villageType}", isSupport ? defTrans.filterTooltipVillageTypeSupporting : defTrans.filterTooltipVillageTypeSupported).replace("{filterType}", isChecked ? defTrans.freeTextFilterTooltipFilterTypeWith : defTrans.freeTextFilterTooltipFilterTypeWithout));
	$("#defFilterDistance").attr("title", defTrans.distanceFilterTooltip.replace("{villageType}", isSupport ? defTrans.filterTooltipVillageTypeSupporting : defTrans.filterTooltipVillageTypeSupported).replace("{filterType}", !isChecked ? defTrans.distanceFilterTooltipFilterTypeCloser : defTrans.distanceFilterTooltipFilterTypeFurther));
});
$("#defReverseFilter").change();

function filterMainRows(filterStrategy, reverseFilter, unitsAwayStrategy, tag) {
	if (!$("#defTotals").is(":disabled")) {
		$("#defTotals").click();
	}

	var goners = $();
	$("#units_table tr.grandTotal").each(function () {
		if (!reverseFilter != !filterStrategy($(this), tag)) {
			goners = goners.add($(this)).add($(this).next());

			var prev = $(this).prev();
			while (!prev.hasClass("units_away")) {
				goners = goners.add(prev);
				prev = prev.prev();
			}

			$("input:first", prev).val("");
			goners = goners.add(prev);
		} else if (unitsAwayStrategy != null) {
			var prev = $(this).prev();
			while (!prev.hasClass("units_away")) {
				prev = prev.prev();
			}
			unitsAwayStrategy(prev, tag);
		}
	});
	goners.hide();
	$("#units_table th:first").text(trans.sp.defOverview.totalVillages.replace("{0}", $("#units_table tr.grandTotal:visible").size()));
}

// Hide rows not under attack
$("#attackFilter").click(function () {
	trackClickEvent("FilterAttack");
	var reverseFilter = true; // never reverse this filter!

	if (!$("#defTotals").is(":disabled")) {
		$("#defTotals").click();
	}
		
	var filterStrategy =
		function (row) {
			return $('td:first:not(:has(img[title=\'' + trans.tw.command.attack + '\']))', row).size() == 0;
		};

	var goners = $();
	$("#units_table tr.units_away").each(function () {
		if (!reverseFilter != !filterStrategy($(this))) {
			goners = goners.add($(this));

			var nextRow = $(this).next();
			while (!nextRow.hasClass("grandTotal")) {
				goners = goners.add(nextRow);
				nextRow = nextRow.next();
			}

			$("input:first", this).val("");
			goners = goners.add(nextRow).add(nextRow.next());
		}
	});
	goners.hide();
	$("#units_table th:first").text(trans.sp.defOverview.totalVillages.replace("{0}", $("#units_table tr.grandTotal:visible").size()));
});

$("#defFilterTotalPop").click(function () {
	trackClickEvent("FilterFarm");
	var reverseFilter = $("#defFilterTotalPopComparer").val() != "-1";
	var compareTo = parseInt($("#defFilterTotalPopValue").val(), 10);

	filterMainRows(function (row) { return (parseInt(row.attr("population"), 10) > compareTo); }, reverseFilter);
});

$("#defFilterDist").click(function () {
	trackClickEvent("FilterDistanceToX");
	var targetVillage = getVillageFromCoords($("#defFilterDistVillage").val(), true);
	if (!targetVillage.isValid) {
		alert(trans.sp.defOverview.distanceToVillageNoneEntered);
		return;
	}

	var reverseFilter = !($("#defFilterDistType").val() != "-1");
	var maxDistance = parseInt($("#defFilterDistanceValue").val(), 10);

	$("#units_table").find("th:eq(1)").html(trans.sp.defOverview.distanceToVillage.replace("{0}", targetVillage.coord));

	filterMainRows(
		function (row, tag) {
			var compareVillage = getVillageFromCoords(row.attr("village"));
			tag.distance = getDistance(targetVillage.x, compareVillage.x, targetVillage.y, compareVillage.y, 'ram').fields;
			return tag.distance > maxDistance;
		}, reverseFilter,
		function (mainRow, tag) {
			mainRow.find("td:eq(1)").html("<b>" + trans.sp.defOverview.fieldsPrefix.replace("{0}", parseInt(tag.distance, 10)) + "</b>");
		}, { distance: 0 });
});

function filterTable(rows, filterStrategy) {
	if (!$("#defTotals").is(":disabled")) {
		$("#defTotals").click();
	}

	var reverseFilter = $("#defReverseFilter").is(":checked");
	var goners = $();
	rows.each(function () {
		if ($(this).attr("distance") != undefined) {
			if (!reverseFilter != !filterStrategy($(this))) {
				goners = goners.add($(this));
			}
		}
	});
	goners.hide();
	$("#units_table th:first").text(trans.sp.defOverview.totalVillages.replace("{0}", $("#units_table tr.grandTotal:visible").size()));
}

$("#defRestack").click(function () {
	trackClickEvent("BBCodeOutput");
	if (!$("#defTotals").attr("disabled")) {
		$("#defTotals").click();
	}

	var restackTo = parseInt($("#defRestackTo").val(), 10);
	var counter = 0;

	var request = "";
	$("#units_table tr.grandTotal").each(function () {
		if ($(this).is(":visible")) {
			var total = parseInt($(this).attr('population'), 10);
			if (restackTo - total > user_data.restack.requiredDifference) {
				var villageCoords = $(this).attr("village");
				counter++;
				request += counter + "[village]" + villageCoords + "[/village] (" + parseInt((restackTo - total) / 1000, 10) + trans.sp.defOverview.thousandSuffix + ")\n";
			}
		}
	});

	if ($("#restackArea").size() == 0) {
		$(this).parent().parent().parent().append("<tr><td><textarea cols=50 rows=10 id=restackArea>" + request + "</textarea></td><td>" + trans.sp.defOverview.freeText + "<br><textarea cols=50 rows=9></textarea></td></tr>");
	} else {
		$("#restackArea").val(request);
	}
});

$("#defHideEmpty").click( function () {
	trackClickEvent("FilterEmpty");
	if (!$("#defTotals").is(":disabled")) {
		$("#defTotals").click();
	}

	var goners = $();
	$("#units_table tr.units_away").each(function () {
		var mainRow = $(this);
		var row = mainRow.next();
		var toHide = true;
		while (!row.hasClass("grandTotal")) {
			if (row.is(":visible")) {
				toHide = false;
			}

			row = row.next();
		}

		if (toHide) {
			$("input:first", mainRow).val("");
			goners = goners.add(mainRow).add(row.next()).add(row);
		}
	});
	goners.hide();
	$("#units_table th:first").text(trans.sp.defOverview.totalVillages.replace("{0}", $("#units_table tr.grandTotal:visible").size()));
});

$("#filtersnob, #filterspy").click( function () {
	trackClickEvent("FilterSnobOrSpy");
	var position = $.inArray($(this).attr("id").substr(6), world_data.units) + 1;
	filterTable($("#units_table tr"), function (row) {
		return row.find("td").eq(position).text() != "0";
	});
});

// filter support from other players
$("#filterSupport").click( function () {
	trackClickEvent("FilterSupport");
	filterTable($("#units_table tr"), function (row) {
		return row.find("td:first a").length != 2;
	});
});

$("#filterAttack, #filterDefense").click( function () {
	trackClickEvent("FilterOffOrDef");
	var unitArray = $(this).attr('id') == "filterDefense" ? world_data.units_def : world_data.units_off;
	filterTable($("#units_table tr"), function (row) {
		var hideRow = false;
		$("td:gt(0)", row).each(function (i) {
			if (world_data.units[i] != undefined && world_data.units[i] != "heavy" && parseInt($(this).text(), 10) > 0 && $.inArray(world_data.units[i], unitArray) > -1) {
				hideRow = true;
				return false;
			}
		});

		return hideRow;
	});
});

$("#defFilterBarbarian").click( function () {
	trackClickEvent("FilterBarbarian");
	filterTable($("#units_table tr"), function (row) {
		var text = row.find("td:first").text();
		return text.match(/\(---\)\s+\(F\d+\)$/);
	});
	$("#defHideEmpty").click();
});

$("#defFilterText").click( function () {
	trackClickEvent("FilterText");
	var compareTo = $("#defFilterTextValue").val().toLowerCase();
	if (compareTo.length > 0)
		filterTable($("#units_table tr"), function (row) {
			return row.text().toLowerCase().indexOf(compareTo) == -1;
		});
});

$("#defFilterDistance").click(function () {
	trackClickEvent("FilterDistance");
	var maxDistance = $("#defFilterDistanceValue").val();
	filterTable($("#units_table tr"), function (row) {
		var distance = $(row).attr("distance");
		return (distance != '' && parseInt(distance, 10) < maxDistance);
	});
});

$("#defTotals").click(function () {
	trackClickEvent("FilterTotalDef");
	$(this).attr("disabled", true);
	var rowColor = 0;
	var goners = $();
	$("#units_table").find("tr.units_away").each(function () {
		// calculate total support
		var firstCell = $(this).find("td:first");
		var villageCoord = getVillageFromCoords(firstCell.find("span[id*='label_']").text());

		rowColor++;
		if (rowColor % 2 == 1) {
			$(this).removeClass("row_a").addClass("row_b");
		} else {
			$(this).removeClass("row_b").addClass("row_a");
		}

		var grandTotal = 0;
		var totals = [];
		var nextRow = $(this).next();
		while (nextRow.hasClass("row_a") || nextRow.hasClass("row_b")) {
			var total = 0;
			$("td:gt(0)", nextRow).each(function (i) {
				var cellContent = $.trim($(this).text());
				if (!(cellContent == '0' || i >= world_data.unitsPositionSize.length)) {
					total += cellContent * world_data.unitsPositionSize[i];
					if (totals[i] == undefined) {
						totals[i] = parseInt(cellContent, 10);
					} else {
						totals[i] += parseInt(cellContent, 10);
					}
				}
			});
			grandTotal += total;
			$("td:eq(" + (world_data.unitsPositionSize.length + 1) + ")", nextRow).text(formatNumber(total));

			var supportedCell = $("td:first", nextRow);
			var supportedVillage = getVillageFromCoords(supportedCell.text());
			var distance = parseInt(getDistance(supportedVillage.x, villageCoord.x, supportedVillage.y, villageCoord.y, 'ram').fields, 10);
			supportedCell.html(supportedCell.html() + ' <b>' + trans.sp.all.fieldsSuffix.replace("{0}", distance) + '</b>');
			nextRow.attr("distance", distance);

			if (rowColor % 2 == 1) {
				nextRow.removeClass("row_a").addClass("row_b");
			} else {
				nextRow.removeClass("row_b").addClass("row_a");
			}

			nextRow = nextRow.next();
		}

		if (rowColor % 2 == 1) {
			nextRow.removeClass("row_a").addClass("row_b");
		} else {
			nextRow.removeClass("row_b").addClass("row_a");
		}

		var troopCells = "";
		for (var i = 0; i < world_data.unitsPositionSize.length; i++) {
			if (typeof totals[i] !== 'undefined') {
				troopCells += "<td>" + formatNumber(totals[i]) + "</td>";
			} else {
				troopCells += "<td><span class=hidden>0</span></td>";
			}
		}

		var color = getStackColor(grandTotal);
		color = "<td style='background-color: " + color + "; border:1px solid black'>" + formatNumber(grandTotal) + "</td>";

		nextRow.before("<tr class='grandTotal " + (rowColor % 2 == 1 ? "row_b" : "row_a") + "' village='" + villageCoord.coord + "' population='" + grandTotal + "'><td>&nbsp;</td><td>" + (isSupport ? trans.sp.defOverview.totalFromOtherVillages : trans.sp.defOverview.totalInOtherVillages) + "</td>" + troopCells + color + "</tr><tr height=10></tr>");
	});

	goners.hide();
});