if ($("#running_times").size() > 0) {
	// ---------------------------------------INCOMING ATTACK
	var link = $("#contentContainer tr:eq(10) a:last");
	//<!--@@INCLUDE "page/info_command/incoming.js" INDENT=1 //-->
	
	// AUTO OPEN TAGGER
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
			haulDescription = formatNumber(haulDescription[1]) + " / " + formatNumber(haulDescription[2]);
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
	
	/*if (server_settings.ajaxAllowed) {
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
