if ($("#running_times").size() > 0) {
	// ---------------------------------------INCOMING ATTACK
	var link = $("#contentContainer tr:eq(10) a:last");
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

		// Sort op runningtime
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

		var remainingRunningTime = convertTime($("tr:eq(9)", infoTable));
		var toFocusButton = null;
		unitRows.each(function () {
			var unit = $("img:first", this).attr("src");
			unit = unit.substr(unit.lastIndexOf("unit_") + 5);
			unit = unit.substr(0, unit.indexOf("."));

			if (unit == "spear") {
				$(this).hide();
			} else {
				var runningTime = convertTime(this);
				var newDate = new Date(arrivalTime.getTime() - runningTime.totalSeconds * 1000);
				var sendAt = prettyDate((new Date()).getTime() - newDate.getTime());

				// Extra column with time sent
				$("td:eq(2)", this).before("<td>" + twDateFormat(newDate, true) + "</td><td>" + sendAt + "</td>");

				// Possible send times (now) in bold
				if (runningTime.totalSeconds > remainingRunningTime.totalSeconds) {
					if (toFocusButton == null) {
						toFocusButton = $("input:last", this);

						$("#content_value table:first").prepend("<input type=submit id=focusPlaceHolder value='" + trans.sp.tagger.tagIt + " (" + trans.tw.units.names[unit] + ")'>");
						$("#focusPlaceHolder").click(function () {
							trackClickEvent("TagDefault");
							toFocusButton.click();
							$(this).val(trans.sp.tagger.tagged).attr("disabled", "disabled");
						});

						if (unit == "snob") {
							$("tr:last td", table).css("background-color", user_data.colors.error)
						}
					}
					$(this).css("font-weight", "bold");
				}

				// Rename default command name
				if (user_data.incoming.renameInputTexbox) {
					var str = user_data.incoming.renameInputTexbox;
					unit = trans.tw.units.shortNames[unit];

					var attackId = $("input:eq(1)", this).parent().html();
					attackId = attackId.substr(attackId.lastIndexOf("id=") + 3);
					attackId = attackId.substr(0, attackId.indexOf("'"));

					str = str.replace("{village}", attackerVillageName).replace("{c}", attackerVillage.continent()).replace("{id}", attackId);
					str = str.replace("{player}", attacker).replace("{xy}", attackerVillage.coord).replace("{unit}", unit);
					str = str.replace("{fields}", fields);
					if (str.indexOf("{night}") != -1) {
						if (isNightbonus) {
							str = str.replace("{night}", trans.sp.tagger.arrivesInNightBonus);
						} else {
							str = str.replace("{night}", "");
						}
					}
					$(this).find("input:first").val(str);
				}
			}
		});

		// nobles can only walk so far
		var nobles = $("tr:last", table);
		if (convertTime(nobles).totalSeconds / 60 > world_config.maxNobleWalkingTime) {
			nobles.find("td").css("text-decoration", "line-through");
		}

		if (user_data.incoming.invertSort)
			unitRows.sortElements(function (a, b) {
				return convertTime(a).totalSeconds < convertTime(b).totalSeconds ? 1 : -1;
			});

		// auto-show input textboxes
		$("span:odd", table).show();
		$("span:even", table).hide();
	});

	// TAGGER
	if (user_data.incoming.forceOpenTagger || (user_data.incoming.autoOpenTagger && $("#labelText").text() == trans.tw.incoming.defaultCommandName)) {
		link.click();
	}

	if (user_data.proStyle && user_data.incoming.villageBoxSize != null && user_data.incoming.villageBoxSize != false) {
		$("#content_value table:first").css("width", user_data.incoming.villageBoxSize);
	}
	
} else {
	// Own attack/support/return ---------------------------------------------------------------------------------- Own attack/support/return
	var table = $("#content_value");
	var infoTable = $("table.vis:first", table);
	var type = $("h2:first", table).text();
	var catapultTargetActive = infoTable.find("tr:eq(5) td:eq(0)").text() == trans.tw.command.catapultTarget;

	infoTable.width(600);

	// Add troop returntime and annulation return time
	var isSupport = type.indexOf(trans.tw.command.support) == 0;
	var offset = 5;
	if (catapultTargetActive) {
		offset += 1;
	}
	var arrivalCell = infoTable.find("tr:eq(" + (offset + 1) + ") td:last");

	if (type.indexOf(trans.tw.command.returnText) == -1 
		&& type.indexOf(trans.tw.command.abortedOperation) == -1) {
		
		var duration = getTimeFromTW(infoTable.find("tr:eq(" + offset + ") td:last").text());
		var imgType = !isSupport ? "attack" : "support";
		arrivalCell.prepend("<img src='graphic/command/" + imgType + ".png' title='" + trans.sp.command.arrival + "'>&nbsp; " + trans.tw.all.dateOn + " ").css("font-weight", "bold");
		var stillToRun = getTimeFromTW(infoTable.find("tr:eq(" + (offset + 2) + ") td:last").text());

		var cancelCell = infoTable.find("tr:last").prev();
		var canStillCancel = cancelCell.has("a").length;
		if (canStillCancel) {
			cancelCell.find("td:first").attr("colspan", "1").attr("nowrap", "nowrap");
			var returnTime = getDateFromTW($("#serverTime").text(), true);
			returnTime = new Date(returnTime.valueOf() + (duration.totalSecs - stillToRun.totalSecs) * 1000);
			cancelCell.append("<td>" + trans.sp.command.returnOn + "</td><td id=returnTimer>" + twDateFormat(returnTime, true, true).substr(3) + "</td>");

			setInterval(function timeCounter() {
				var timer = $("#returnTimer");
				var newTime = new Date(getDateFromTW(timer.text()).valueOf() + 2000);
				timer.text(twDateFormat(newTime, true, true).substr(3));
			}, 1000);

			cancelCell = cancelCell.prev();
		}

		if (type.indexOf(trans.tw.command.attack) == 0) {
			var returnTimeCell = cancelCell.find("td:last");
			returnTimeCell.html("<img src='graphic/command/return.png' title='" + cancelCell.find("td:first").text() + "'>&nbsp; <b>" + returnTimeCell.text() + "</b>");
		}
	} else {
		var imgType = type.indexOf(trans.tw.command.abortedOperation) == 0 ? imgType = "cancel" : "return";
		arrivalCell.prepend("<img src='graphic/command/" + imgType + ".png' title='" + trans.sp.command.arrival + "'>&nbsp; " + trans.tw.all.dateOn + " ").css("font-weight", "bold");
	}

	var player = infoTable.find("td:eq(7) a").text();
	var village = getVillageFromCoords(infoTable.find("td:eq(9) a").text());
	var second = infoTable.find("td:eq(" + (13 + (catapultTargetActive ? 2 : 0)) + ")").text();
	var haulDescription = "";

	if (type.indexOf(trans.tw.command.returnText) == 0) {
		infoTable = $("table.vis:last", table);
		if (infoTable.find("td:first").text() == trans.tw.command.haul) {
			haulDescription = infoTable.find("td:last").text().match(/\s(\d+)\/(\d+)$/);
			haulDescription = formatnumber(haulDescription[1]) + " / " + formatnumber(haulDescription[2]);
			infoTable = infoTable.prev();
		}
		infoTable = infoTable.find("tr:last");
	} else {
		infoTable = $("table.vis:last", table);
	}

	var unitsSent = {};
	$.each(world_data.units, function (i, val) {
		unitsSent[val] = parseInt($("td:eq(" + i + ")", infoTable).text(), 10);
	});
	var unitsCalc = calcTroops(unitsSent);
	unitsCalc.colorIfNotRightAttackType($("h2:first", table), !isSupport);

	if (user_data.attackAutoRename.active) {
		var inputBox = $("#editInput");
		var button = $("input[value='" + trans.tw.command.buttonValue + "']");

		var renamed = buildAttackString(village.coord, unitsSent, player, isSupport, 0, haulDescription);
		inputBox.val(renamed);
		button.click();
	}
		ajax("overview", function(overviewtext) {
			var idnumberlist = [];
			var index = 0;
			var links = $(overviewtext).find("#show_outgoing_units").find("table").find("td:first-child").find("a:first-child").find("span");
			//^enkel 'find codes, dus alles wegselecteren wat onnodig is. 
			
			links.each(function(){
				var idgetal = $(this).attr('id').match(/\d+/);
				idnumberlist[index]=idgetal[0];
				index++;
				$.trim(idnumberlist[index]);
			});
			
			idthisattack= location.href.match(/id=(\d+)/);// deze aanval ophalen
			var idthisattacktrim = $.trim(idthisattack[1]); //eerste callback: Datgeen tussen haakjes dus. En gelijk maar trimmen, voor het geval dat.
			var counter=$.inArray(idthisattacktrim, idnumberlist);
			var arraylength = idnumberlist.length;
			var arraylengthminusone = arraylength -1;
			if (counter != arraylengthminusone) {
			var nextcommandID = idnumberlist[(counter +1)];}
			if (counter != 0) {
			var lastcommandID = idnumberlist[(counter - 1)];
			}
			villageid = location.href.match(/village=(\d+)/);
			//alert(villageid[1]);
			if (counter != 0) {
				$("#content_value").find("h2").after('<table><tr><td id="lastattack" style="width:83%"><a href="/game.php?village=' + villageid + '&id=' + lastcommandID + '&type=own&screen=info_command">'+ trans.sp.command.precedingAttack + '</a></td> </tr> </table>');
			}
			else {
			$("#content_value").find("h2").after('<table><tr><td id="lastattack" style="width:83%"><b> XX</b></td> </tr> </table>');
			}
			if (counter != arraylengthminusone){
			$("#lastattack").after('<td id="nextcommand" ><a href="/game.php?village=' + villageid + '&id=' + nextcommandID + '&type=own&screen=info_command">'+ trans.sp.command.nextAttack+ '</a></td>');
			}
			else {
			$("#lastattack").after('<td id="nextcommand"><b>XX</b></td>');
			}
			
			//alert("Hoi");
		}, {});
	}*/
	
	// When sending os, calculate how much population in total is sent
	if (isSupport) {
		var totalPop = 0;
		$.each(world_data.units, function (i, val) {
			var amount = unitsSent[val];
			if (amount != 0) {
				totalPop += amount * world_data.unitsPositionSize[i];
			}
		});

		var unitTable = $("table.vis:last", table);
		unitTable.find("tr:first").append('<th width="50"><img src="graphic/face.png" title="' + trans.sp.all.population + '" alt="" /></th>');
		unitTable.find("tr:last").append('<td>' + formatNumber(totalPop) + '</td>');
	}
}
