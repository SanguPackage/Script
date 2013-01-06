if ($("#running_times").size() > 0)
{
	// ---------------------------------------INCOMING ATTACK
	var link = $("#contentContainer tr:eq(10) a:last");
	link.one('click', function ()
	{
		var infoTable = $("#contentContainer");
		var table = $("#running_times");

		// convert looptijd to seconds
		// er bestaat hiervoor een aparte methode: getTimeFromTW
		function convertTime(cell)
		{
			var time = $(cell).find("td:eq(1)").text();
			time = time.match(/(\d+):(\d+):(\d+)/);

			var obj = {};
			obj.hours = time[1] * 1;
			obj.minutes = time[2] * 1;
			obj.seconds = time[3] * 1;
			obj.totalSeconds = obj.hours * 3600 + obj.minutes * 60 + obj.seconds;

			return obj;
		}

		// Sorteren op looptijd
		var unitRows = $("tr:gt(1)", table);
		unitRows.sortElements(
								function (a, b)
								{
									return convertTime(a).totalSeconds > convertTime(b).totalSeconds ? 1 : -1;
								});

		// header verstuurtijd
		//TODO extraFeature :)
		var extraFeature = true;
		if (extraFeature)
		{
			$("th:first", table).attr("colspan", 5);
			$("th:eq(2)", table).after("<th>" + trans.sp.tagger.sentOn + "</th><th>" + trans.sp.tagger.ago + "</th>");
		}
		else
		{
			$("th:first", table).attr("colspan", 4);
			$("th:eq(2)", table).after("<th>" + trans.sp.tagger.sentOn + "</th>");
		}

		var infoCell = $("td", infoTable);
		var aanvaller = infoCell.eq(5).text();
		var aanvallerDorpNaam = infoCell.eq(7).text();
		var aanvallerDorp = getVillageFromCoords(aanvallerDorpNaam);
		var verdediger = infoCell.eq(10).text();
		var verdedigerDorp = getVillageFromCoords(infoCell.eq(12).text());
		var arrivalTime = getDateFromTW(infoCell.eq(14).text());
		var fields = parseInt(getDistance(aanvallerDorp.x, verdedigerDorp.x, aanvallerDorp.y, verdedigerDorp.y).fields);

		var isInNachtbonus = isDateInNachtbonus(arrivalTime);
		if (isInNachtbonus)
		{
			infoCell.eq(14).css("background-color", user_data.colors.error);
		}

		var resterendeLooptijd = convertTime($("tr:eq(9)", infoTable));
		var toFocusButton = null;
		unitRows.each(function ()
		{
			var unit = $("img:first", this).attr("src");
			unit = unit.substr(unit.lastIndexOf("unit_") + 5);
			unit = unit.substr(0, unit.indexOf("."));

			if (unit == "spear")
			{
				$(this).hide();
			}
			else
			{
				var looptijd = convertTime(this);
				var newDate = new Date(arrivalTime.getTime() - looptijd.totalSeconds * 1000);
				var sendAt = prettyDate((new Date()).getTime() - newDate.getTime());

				// Extra kolom met verstuurtijd
				if (extraFeature) $("td:eq(2)", this).before("<td>" + twDateFormat(newDate, true) + "</td><td>" + sendAt + "</td>");
				else $("td:eq(2)", this).before("<td>" + twDateFormat(newDate, true) + "</td>");

				// Mogelijke tijden in 't vet
				if (looptijd.totalSeconds > resterendeLooptijd.totalSeconds)
				{
					if (toFocusButton == null)
					{
						toFocusButton = $("input:last", this);

						$("#content_value table:first").prepend("<input type=submit id=focusPlaceHolder value='" + trans.sp.tagger.tagIt + " (" + trans.tw.units.names[unit] + ")'>");
						$("#focusPlaceHolder").click(function () { toFocusButton.click(); $(this).val(trans.sp.tagger.tagged).attr("disabled", "disabled"); });

						if (unit == "snob")
							$("tr:last td", table).css("background-color", user_data.colors.error)
					}
					$(this).css("font-weight", "bold");
				}

				// Textvelden hernoemen
				if (user_data.incoming.renameInputTexbox)
				{
					var str = user_data.incoming.renameInputTexbox;
					/*var unit = $(this).find("input:first").val();
					unit = unit.substr(0, unit.indexOf(","));*/
					unit = trans.tw.units.shortNames[unit];

					var aanvalId = $("input:eq(1)", this).parent().html();
					aanvalId = aanvalId.substr(aanvalId.lastIndexOf("id=") + 3);
					aanvalId = aanvalId.substr(0, aanvalId.indexOf("'"));
					//alert();

					str = str.replace("{village}", aanvallerDorpNaam).replace("{c}", aanvallerDorp.continent()).replace("{id}", aanvalId);
					str = str.replace("{player}", aanvaller).replace("{xy}", aanvallerDorp.coord).replace("{unit}", unit);
					str = str.replace("{fields}", fields);
					if (str.indexOf("{night}") != -1)
					{
						if (isInNachtbonus) str = str.replace("{night}", trans.sp.tagger.arrivesInNightBonus);
						else str = str.replace("{night}", "");
					}
					$(this).find("input:first").val(str);
				}
			}
		});

		// nobles can only walk so far
		var nobles = $("tr:last", table);
		if (convertTime(nobles).totalSeconds / 60 > world_data.maxNobleWalkingTime)
		{
			nobles.find("td").css("text-decoration", "line-through");
		}

		if (user_data.incoming.invertSort)
			unitRows.sortElements(
		function (a, b)
		{
			return convertTime(a).totalSeconds < convertTime(b).totalSeconds ? 1 : -1;
		});

		// auto-show input textboxes
		$("span:odd", table).show();
		$("span:even", table).hide();
	});

	// TAGGER
	if (user_data.incoming.forceOpenTagger || (user_data.incoming.autoOpenTagger && $("#labelText").text() == trans.tw.incoming.defaultCommandName))
		link.click();

	if (user_data.proStyle && user_data.incoming.villageBoxSize != null && user_data.incoming.villageBoxSize != false)
		$("#content_value table:first").css("width", user_data.incoming.villageBoxSize);
}
else
{
	// Eigen aanval/os/return ---------------------------------------------------------------------------------- Eigen aanval/os/return
	var table = $("#content_value");
	var infoTable = $("table.vis:first", table);
	var type = $("h2:first", table).text();
	var catapultTargetActive = infoTable.find("tr:eq(5) td:eq(0)").text() == trans.tw.command.catapultTarget;

	infoTable.width(600);

	// Terugkeer en annulatie arriveertijd toevoegen
	var isOs = type.indexOf(trans.tw.command.support) == 0;
	var offset = 5;
	if (catapultTargetActive) offset += 1;
	var arriveerCell = infoTable.find("tr:eq(" + (offset + 1) + ") td:last");

	if (type.indexOf(trans.tw.command.returnText) == -1 && type.indexOf(trans.tw.command.abortedOperation) == -1)
	{
		var duur = getTimeFromTW(infoTable.find("tr:eq(" + offset + ") td:last").text());
		var arriveerTijd = getDateFromTW(arriveerCell.text());
		var imgType = !isOs ? "attack" : "support";
		arriveerCell.prepend("<img src='graphic/command/" + imgType + ".png' title='" + trans.sp.command.arrival + "'>&nbsp; " + trans.tw.all.dateOn + " ").css("font-weight", "bold");
		var nogTeLopen = getTimeFromTW(infoTable.find("tr:eq(" + (offset + 2) + ") td:last").text());

		var cancelCell = infoTable.find("tr:last").prev();
		var canStillCancel = cancelCell.has("a").length;
		if (canStillCancel)
		{
			cancelCell.find("td:first").attr("colspan", "1").attr("nowrap", "nowrap");
			var terugTijd = getDateFromTW($("#serverTime").text(), true);
			terugTijd = new Date(terugTijd.valueOf() + (duur.totalSecs - nogTeLopen.totalSecs) * 1000);
			cancelCell.append("<td>" + trans.sp.command.returnOn + "</td><td id=returnTimer>" + twDateFormat(terugTijd, true, true).substr(3) + "</td>");

			setInterval(
				function timeCounter()
				{
					var timer = $("#returnTimer");
					var newTime = new Date(getDateFromTW(timer.text()).valueOf() + 2000);
					timer.text(twDateFormat(newTime, true, true).substr(3));
				}, 1000);

			cancelCell = cancelCell.prev();
		}

		if (type.indexOf(trans.tw.command.attack) == 0)
		{
			arriveerTijd.setTime(arriveerTijd.valueOf() + duur.totalSecs * 1000);
			cancelCell.after("<tr><td colspan=2>" + trans.sp.command.homeTime + ":</td><td><img src='graphic/command/return.png' title='" + trans.sp.command.homeTime + "'>&nbsp; <b>" + twDateFormat(arriveerTijd, true) + "</b></td></tr>");
		}
	}
	else
	{
		var imgType = type.indexOf(trans.tw.command.abortedOperation) == 0 ? imgType = "cancel" : "return";
		arriveerCell.prepend("<img src='graphic/command/" + imgType + ".png' title='" + trans.sp.command.arrival + "'>&nbsp; " + trans.tw.all.dateOn + " ").css("font-weight", "bold");
	}

	var player = infoTable.find("td:eq(7) a").text();
	var village = getVillageFromCoords(infoTable.find("td:eq(9) a").text());
	var second = infoTable.find("td:eq(" + (13 + (catapultTargetActive ? 2 : 0)) + ")").text();

	if (type.indexOf(trans.tw.command.returnText) == 0)
	{
		infoTable = $("table.vis:last", table);
		if (infoTable.find("td:first").text() == trans.tw.command.haul) infoTable = infoTable.prev();
		infoTable = infoTable.find("tr:last");
	}
	else
	{
		infoTable = $("table.vis:last", table);
	}

	var unitsSent = {};
	$.each(world_data.units, function (i, val)
	{
		unitsSent[val] = $("td:eq(" + i + ")", infoTable).text() * 1;
		//alert(val + ":" + unitsSent[val]);
	});
	var unitsCalc = calcTroops(unitsSent);
	unitsCalc.colorIfNotRightAttackType($("h2:first", table), !isOs);

	if (user_data.attackAutoRename)
	{
		var inputBox = $("#editInput");
		var button = $("input[value='" + trans.tw.command.buttonValue + "']");

		var renamed = buildAttackString(village.coord, unitsSent, player, isOs);
		inputBox.val(renamed);
		button.click();
	}

	// Bij os uitrekenen hoeveel populatie
	if (isOs)
	{
		var totalPop = 0;
		$.each(world_data.units, function (i, val)
		{
			var amount = unitsSent[val];
			if (amount != 0)
			{
				totalPop += amount * world_data.unitsPositionSize[i];
			}
		});

		var unitTable = $("table.vis:last", table);
		unitTable.find("tr:first").append('<th width="50"><img src="graphic/face.png" title="' + trans.sp.all.population + '" alt="" /></th>');
		unitTable.find("tr:last").append('<td>' + formatNumber(totalPop) + '</td>');
	}
}