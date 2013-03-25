// automatically focus OK button when attacking
if (user_data.proStyle && user_data.confirm.autoAttackFocus) {
	$("input[name='submit']").focus();
}

// reorder the page
if (user_data.proStyle) {
	$("#content_value table:first").css("width", 500);

	// Merge nightbonus & tribe claim statements (for OK button placement)
	if (user_data.proStyle && (user_data.confirm.replaceTribeClaim || user_data.confirm.replaceNightBonus)) {
		var header = $("#content_value h2:first");
		var claim = $("h3.error");
		if (claim.size() != 0) {
			claim.each(function() {
				var $this = $(this);
				$this.hide();
				header.addClass("error").text(header.text() + " - " + $this.text());
			});
		}
	}
}

// extra attack button (always on the same place)
if (user_data.confirm.addExtraOkButton) {
	$("#content_value h2:first").prepend("<input type=submit style='font-size: 10pt' id=focusPlaceHolder value='" + $("#troop_confirm_go").val() + "'><br>");
	$("#focusPlaceHolder").click(function () {
		$(this).attr("disabled", "disabled");
		$("#troop_confirm_go").click();
	});
}

// Catapult building images
if (user_data.confirm.addCatapultImages && $("#save_default_attack_building").length == 1) {
	var dropdown = $("select[name='building']");
	var buildingImages = "";
	
	dropdown.find("option").each(function(index, value) {
		buildingImages += "<img class='catapultSwitcher' title='"+trans.sp.command.catapultImageTitle+"' building='"+$(value).val()+"' src='http://cdn2.tribalwars.net/graphic/buildings/" + $(value).val() + ".png'> ";
	});
	
	dropdown.parent().parent().before("<tr><td colspan=4>"+buildingImages+"</td></tr>");
	$("img.catapultSwitcher").click(function() {
		dropdown.val($(this).attr("building"));
	});
}

var attackFrame = $("#content_value");
var infoTable = $("table.vis:first td:odd", attackFrame);
var targetVillage = infoTable.first().text();

// remember last attack
// saved at the confirmation page so that we can't save
// invalid coordinates
var village = getVillageFromCoords(targetVillage);
if (village.isValid) {
	pers.set("lastVil", village.coord);
}

if (user_data.attackAutoRename) {
	var isAttack = $("input[name='attack']").val() == "true";

	var isBarbarian = infoTable.size() == (isAttack ? 4 : 3);
	var player = (isBarbarian ? '' : infoTable.eq(1).text());

	var unitsSent = {};
	$.each(world_data.units, function (i, val) {
		unitsSent[val] = parseInt($("input[name='" + val + "']", attackFrame).val(), 10);
	});
	var unitsCalc = calcTroops(unitsSent);
	
	// compare runtime with dodgetime
	var dodgeCookie = pers.getCookie("sanguDodge" + getQueryStringParam("village"));
	if (dodgeCookie) {
		dodgeCookie = dodgeCookie.split("~");
		var durationCell = $("#content_value table.vis:first td:contains('" + trans.tw.command.walkingTimeTitle + "')").next();
		var attackRunTime = getTimeFromTW(durationCell.text());
		var dodgeTime = getTimeFromTW(dodgeCookie[1]);

		var runtimeIsOk = attackRunTime.totalSecs >= dodgeTime.totalSecs;
		var diffSecs = (attackRunTime.totalSecs - dodgeTime.totalSecs);

		var dodgeCellText = "<table border=0 cellpadding=0 cellspacing=0 width='1%'><tr>";
		dodgeCellText += "<td width='25%' align=center>" + durationCell.text() + "</td>";
		dodgeCellText += "<td width='50%' align=center><b>" + (runtimeIsOk ? "&gt;&gt;&gt;" : "&lt;&lt;&lt;") + "</b></td>";
		dodgeCellText += "<td width='25%' align=center nowrap>" + dodgeCookie[1] + "&nbsp;";
		if (diffSecs > 0) {
			dodgeCellText += trans.sp.command.dodgeMinuteReturn.replace("{minutes}", prettyDate(diffSecs * 2000, true)); // 2000 = Method expects milliseconds and distance is walked 2 times!
		}
		dodgeCellText += "</td>";

		dodgeCellText += "</tr></table>";
		durationCell.html(dodgeCellText);

		if (!runtimeIsOk) {
			durationCell.find("table").attr("title", trans.sp.command.dodgeNotFarEnough).css("background-color", user_data.colors.error).find("td").css("background-color", user_data.colors.error);
		}

		if (dodgeCookie[0] != "unit_" + unitsCalc.getSlowest()) {
			$("h2:first", attackFrame).css("background-color", user_data.colors.error);
		}
	} else {
		// If a dodgecookie is in use, nightbonus etc isn't relevant
		unitsCalc.colorIfNotRightAttackType($("h2:first", attackFrame), isAttack);
		var arrivalTime = getDateFromTodayTomorrowTW($.trim($("#date_arrival").text()));
		if (user_data.proStyle && user_data.confirm.replaceNightBonus && isDateInNightBonus(arrivalTime)) {
			$("#date_arrival").css("background-color", user_data.colors.error).css("font-weight", "bold");
		}
	}
		
	// rename attack command
	var villageCoord = $("input[name='x']", attackFrame).val() + '|' + $("input[name='y']", attackFrame).val();
	var sent = buildAttackString(villageCoord, unitsSent, player, !isAttack);
	document.title = game_data.village.coord + " -> " + sent;
	sent = (isAttack ? trans.tw.command.attackOn : trans.tw.command.supportFor) + targetVillage + "\\" + sent;

	var rand = Math.floor(Math.random() * 1000);
	pers.setCookie("attRen" + rand, game_data.village.id + '_' + sent, 10);
}