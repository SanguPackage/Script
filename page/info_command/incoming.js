link.one('click', function () {
	var infoTable = $("#contentContainer");
	var table = $("#running_times");

	// convert runningtime to seconds
	// TODO: there is a function for this: getTimeFromTW
	function convertTime(cell) {
		var time = $(cell).find("td:eq(1)").text();
		time = time.match(/(\d+):(\d+):(\d+)/);

		var obj = {};
		obj.hours = parseInt(time[1], 10);
		obj.minutes = parseInt(time[2], 10);
		obj.seconds = parseInt(time[3], 10);
		obj.totalSeconds = obj.hours * 3600 + obj.minutes * 60 + obj.seconds;

		return obj;
	}

	// Sort on runningtime
	var unitRows = $("tr:gt(1)", table);
	unitRows.sortElements(function (a, b) {
			return convertTime(a).totalSeconds > convertTime(b).totalSeconds ? 1 : -1;
		});

	// header sent times
	$("th:first", table).attr("colspan", 5);
	$("th:eq(2)", table).after("<th>" + trans.sp.tagger.sentOn + "</th><th>" + trans.sp.tagger.ago + "</th>");

	var infoCell = $("td", infoTable);
	var attacker = infoCell.eq(5).text();
	var attackerVillageName = infoCell.eq(7).text();
	var attackerVillage = getVillageFromCoords(attackerVillageName);
	var defender = infoCell.eq(10).text();
	var defenderVillage = getVillageFromCoords(infoCell.eq(12).text());
	var arrivalTime = getDateFromTW(infoCell.eq(14).text());
	var fields = parseInt(getDistance(attackerVillage.x, defenderVillage.x, attackerVillage.y, defenderVillage.y).fields, 10);

	var isNightbonus = isDateInNightBonus(arrivalTime);
	if (isNightbonus) {
		infoCell.eq(14).css("background-color", user_data.colors.error);
	}

	var remainingRunningTime = convertTime($("tr:eq(9)", infoTable)),
	    plausibleSpeedFound = false;

	unitRows.each(function () {
		var unit = $("img:first", this).attr("src");
		unit = unit.substr(unit.lastIndexOf("unit_") + 5);
		unit = unit.substr(0, unit.indexOf("."));

		if (unit == "spear") {
			$(this).hide();
		} else {
			var runningTime = convertTime(this),
			    newDate = new Date(arrivalTime.getTime() - runningTime.totalSeconds * 1000),
			    sendAt = prettyDate((new Date()).getTime() - newDate.getTime()),
                troopsRow = this,
                str;

			// Extra column with time sent
			$("td:eq(2)", troopsRow).before("<td>" + twDateFormat(newDate, true) + "</td><td>" + sendAt + "</td>");

            // Rename default command name for each speed
            if (user_data.incoming.renameInputTexbox) {
                str = user_data.incoming.renameInputTexbox;

                var attackId = $("span.quickedit", this).attr("data-id");
                str = str.replace("{village}", attackerVillageName).replace("{c}", attackerVillage.continent()).replace("{id}", attackId);
                str = str.replace("{player}", attacker).replace("{xy}", attackerVillage.coord).replace("{unit}", trans.tw.units.shortNames[unit]);
                str = str.replace("{fields}", fields);
                if (str.indexOf("{night}") != -1) {
                    if (isNightbonus) {
                        str = str.replace("{night}", trans.sp.tagger.arrivesInNightBonus);
                    } else {
                        str = str.replace("{night}", "");
                    }
                }

                if (false) {
                    // don't show rename inputs, just the labels
                    $("span.quickedit-label", troopsRow).text(str).show();
                } else {
                    // show the rename inputboxes on form load
                    $("span.quickedit-label", troopsRow).text(str);
                    setTimeout(function() {
                        $("a.rename-icon", troopsRow).click();
                        $("#focusPlaceHolder").focus();
                    }, 1);
                }

                if (runningTime.totalSeconds > remainingRunningTime.totalSeconds && !plausibleSpeedFound) {
                    plausibleSpeedFound = true;

                    $("table:first", content_value).prepend(
                        "<input type=submit class='btn' id=focusPlaceHolder value='"
                            + trans.sp.tagger.tagIt
                            + " (" + trans.tw.units.names[unit] + ")'"
                            + " data-command-name='" + str + "'"
                            + ">");

                    $("#focusPlaceHolder").click(function () {
                        trackClickEvent("TagDefault");
                        $("#command_comment").text($(this).attr("data-command-name"));
                        $("#command_comment+a").click();
                        setTimeout(function() {
                            $("#quickedit-rename input:last").click();
                        }, 1);
                        $(this).val(trans.sp.tagger.tagged).attr("disabled", "disabled");
                    });

                    if (unit == "snob") {
                        $("tr:last td", table).css("background-color", user_data.colors.error);
                    }
                }
            }

			// Possible send times (now) in bold
			if (runningTime.totalSeconds > remainingRunningTime.totalSeconds) {
				$(this).css("font-weight", "bold");
			}
		}
	});

	// nobles can only walk so far
	var nobles = $("tr:last", table);
	if (convertTime(nobles).totalSeconds / 60 > world_config.maxNobleWalkingTime) {
		nobles.find("td").css("text-decoration", "line-through");
	}

	if (user_data.incoming.invertSort) {
		unitRows.sortElements(function (a, b) {
			return convertTime(a).totalSeconds < convertTime(b).totalSeconds ? 1 : -1;
        });
    }
});