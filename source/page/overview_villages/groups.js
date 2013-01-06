// TODO: groepen bewerken: maak die div floatable en onthoud positie
var menu = "";
menu += "<table class=vis width='100%'><tr><th>";

menu += trans.sp.defOverview.village + " <input type=text size=5 id=defFilterDistDorp value=''>";
menu += "<select id=defFilterDistType>";
menu += "<option value=1 selected>" + trans.sp.all.closer + "</option><option value=-1>" + trans.sp.all.further + "</option></select>";
menu += "&nbsp;F <input type=text size=3 id=defFilterDistAfstand value=" + user_data.restack.fieldsDistanceFilterDefault + ">";
menu += "<input type=button id=defFilterDist value='" + trans.sp.defOverview.distFilter + "' title='" + trans.sp.defOverview.distFilterTooltip + "'>";

menu += "&nbsp; | &nbsp;";
menu += "<input type=button id=aanvalFilter value='" + trans.sp.defOverview.filterUnderAttack + "'>";

menu += "<br>";

menu += "<input type=checkbox id=defReverseFilter title='" + trans.sp.commands.filtersReverse + "'> " + trans.sp.commands.filtersReverseInfo + ": ";

menu += "&nbsp; <input type=text size=12 id=defFilterTextValue value=''>";
menu += "<input type=button id=defFilterText value='" + trans.sp.groups.villageFilter + "'>";

menu += "&nbsp; <input type=textbox size=3 id=defFilterContinentText maxlength=2><input type=button id=defFilterContinent value='" + trans.sp.commands.continentFilter + "'>";

menu += "&nbsp; <input type=textbox size=3 id=defFilterAmountText maxlength=2><input type=button id=defFilterAmount value='" + trans.sp.groups.amountFilter + "'>";
menu += "&nbsp; <input type=textbox size=3 id=defFilterPointsText maxlength=5><input type=button id=defFilterPoints value='" + trans.sp.groups.pointsFilter + "'>";
menu += "&nbsp; <input type=textbox size=3 id=defFilterFarmText maxlength=5><input type=button id=defFilterFarm value='" + trans.tw.all.farm + "'>";

menu += "&nbsp; <input type=text size=12 id=defFilterGroupValue value=''>";
menu += "<input type=button id=defFilterGroup value='" + trans.sp.groups.groupNameFilter + "'>";
menu += "</th></tr></table>";

var selectAllRow = $("#group_assign_table tr:last");
$("#group_assign_table").before(menu).after("<table class=vis width='100%'><tr><th><input type=checkbox id=selectAllVisible> " + selectAllRow.text() + "</th></tr></table>");
selectAllRow.remove();

$("#selectAllVisible").click(
	function ()
	{
		var isChecked = $(this).attr("checked") == "checked";
		$("#group_assign_table input:hidden").attr("checked", false);
		$("#group_assign_table input:visible").attr("checked", isChecked);
	});

$("#defReverseFilter").change(
	function ()
	{
		var isChecked = $(this).is(":checked");
		var defTrans = trans.sp.groups;
		$("#defFilterText").attr("title", isChecked ? defTrans.villageFilterTitle : defTrans.villageFilterTitleRev);
		$("#defFilterContinent").attr("title", isChecked ? trans.sp.commands.continentFilterTooltip : trans.sp.commands.continentFilterTooltipReverse);

		$("#defFilterAmount").attr("title", isChecked ? defTrans.amountFilterTitle : defTrans.amountFilterTitleRev);
		$("#defFilterPoints").attr("title", isChecked ? defTrans.pointsFilterTitle : defTrans.pointsFilterTitleRev);
		$("#defFilterFarm").attr("title", isChecked ? defTrans.farmFilterTitle : defTrans.farmFilterTitleRev);

		$("#defFilterGroup").attr("title", isChecked ? defTrans.groupNameFilterTitle : defTrans.groupNameFilterTitleRev);
	});
$("#defReverseFilter").change();

function filterGroupRows(filterStrategy, reverseFilter, keepRowStrategy, tag)
{
	if (reverseFilter == undefined || reverseFilter == null)
		reverseFilter = !$("#defReverseFilter").attr("checked");

	var goners = $();
	var totalVisible = 0;
	$("#group_assign_table tr:gt(0):visible").each(
		function ()
		{
			var row = $(this);
			if (!reverseFilter != !filterStrategy(row, tag))
			{
				goners = goners.add(row);
				$("input:eq(1)", row).val("");
			}
			else
			{
				totalVisible++;
				if (keepRowStrategy != null)
					keepRowStrategy(row, tag);
			}
		});
	goners.hide();
	var firstHeaderCell = $("#group_assign_table th:first");
	var firstHeaderCellHtml = firstHeaderCell.html();
	firstHeaderCell.html(firstHeaderCellHtml.substr(0, firstHeaderCellHtml.lastIndexOf(" ")) + " (" + totalVisible + ")");
}

// filteren op afstand tot ingegeven dorp
$("#defFilterDist").click(
	function ()
	{
		var doelDorp = getVillageFromCoords($("#defFilterDistDorp").val(), true);
		if (!doelDorp.isValid)
		{
			alert(trans.sp.defOverview.distanceToVillageNoneEntered);
			return;
		}

		var reverseFilter = !($("#defFilterDistType").val() != "-1");
		var maxAfstand = $("#defFilterDistAfstand").val() * 1;

		var isAlreadyVisible = $("#filterContext").size() == 1;
		if (isAlreadyVisible) $("#filterContext").html(trans.sp.defOverview.distanceToVillage.replace("{0}", doelDorp.coord));
		else
		{
			$("#group_assign_table").find("th:first").after("<th><span id=filterContext>" + trans.sp.defOverview.distanceToVillage.replace("{0}", doelDorp.coord) + "</span> <img src='graphic/oben.png' class=sortDistance direction=up> <img src='graphic/unten.png' class=sortDistance direction=down></th>");
			$(".sortDistance").click(
				function ()
				{
					if ($(this).attr("direction") == "up")
					{
						$("#group_assign_table").find("tr:gt(0):visible").sortElements(
							function (a, b)
							{
								return $(a).attr("fieldAmount") * 1 > $(b).attr("fieldAmount") * 1 ? 1 : -1;
							});
					}
					else
					{
						$("#group_assign_table").find("tr:gt(0):visible").sortElements(
							function (a, b)
							{
								return $(a).attr("fieldAmount") * 1 < $(b).attr("fieldAmount") * 1 ? 1 : -1;
							});
					}
				});
		}

		filterGroupRows(
			function (row, tag)
			{
				var compareVillage = getVillageFromCoords(row.find("td:first").text());
				tag.distance = getDistance(doelDorp.x, compareVillage.x, doelDorp.y, compareVillage.y, 'ram').fields;
				return tag.distance > maxAfstand;

			}, reverseFilter,
			function (mainRow, tag)
			{
				mainRow.attr("fieldAmount", tag.distance);
				if (!isAlreadyVisible) mainRow.find("td:first").after("<td><b>" + trans.sp.defOverview.fieldsPrefix.replace("{0}", parseInt(tag.distance)) + "</b></td>");
				else mainRow.find("td:eq(1)").html("<b>" + trans.sp.defOverview.fieldsPrefix.replace("{0}", parseInt(tag.distance)) + "</b>");
			}, { distance: 0 });
});

// filteren op binnenkomende aanvallen
$("#aanvalFilter").click(
	function ()
	{
		filterGroupRows(
			function (row)
			{
				return $('td:first:not(:has(img[title=\'' + trans.tw.command.attack + '\']))', row).size() == 0;
			});
	});

// filteren op dorpsnaam
$("#defFilterText").click(
	function ()
	{
		var compareTo = $("#defFilterTextValue").val().toLowerCase();
		if (compareTo.length > 0)
			filterGroupRows(
				function (row)
				{
					return row.find("td:first").text().toLowerCase().indexOf(compareTo) != -1;
				});
	});

// filter op groepsnaam
$("#defFilterGroup").click(
	function ()
	{
		var compareTo = $("#defFilterGroupValue").val().toLowerCase();
		if (compareTo.length > 0)
			filterGroupRows(
				function (row)
				{
					return row.find("td:eq(4)").text().toLowerCase().indexOf(compareTo) != -1;
				});
	});

$("#defFilterContinent").click(
	function ()
	{
		var compareTo = $("#defFilterContinentText").val() * 1;
		if (compareTo >= 0)
			filterGroupRows(
				function (row)
				{
					var village = getVillageFromCoords(row.find("td:eq(0)").text());
					return village.continent() == compareTo;
				});
	});

// filter op aantal groepen
$("#defFilterAmount").click(
	function ()
	{
		var compareTo = $("#defFilterAmountText").val() * 1;
		if (compareTo >= 0)
		{
			if (!$("#defReverseFilter").attr("checked"))
			{
				//wtf?
				filterGroupRows(
					function (row)
					{
						return row.find("td:eq(1)").text() * 1 > compareTo;
					}, false);
			}
			else
			{
				filterGroupRows(
					function (row)
					{
						return row.find("td:eq(1)").text() * 1 < compareTo;
					}, false);
			}
		}
	});

$("#defFilterPoints").click(
	function ()
	{
		var compareTo = $("#defFilterPointsText").val() * 1;
		if (compareTo >= 0)
			filterGroupRows(
				function (row)
				{
					return row.find("td:eq(2)").text().replace(".", "") * 1 < compareTo;
				});
	});

$("#defFilterFarm").click(
	function ()
	{
		var compareTo = $("#defFilterFarmText").val() * 1;
		if (compareTo >= 0)
			filterGroupRows(
				function (row)
				{
					var farmValue = row.find("td:eq(3)").text();
					farmValue = farmValue.substr(0, farmValue.indexOf("/")) * 1;
					return farmValue * 1 < compareTo;
				});
	});