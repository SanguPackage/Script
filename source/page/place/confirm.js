// automatisch focus zetten op OK button bij aanvallen
if (user_data.proStyle && user_data.autoAttackFocus)
{
	$("input[name='submit']").focus();
}

// pagina herschikken
if (user_data.proStyle)
{
	$("#content_value table:first").css("width", 500);

	// Merge nightbonus & tribe claim statements (for OK button placement)
	if (user_data.proStyle && (user_data.replaceTribeClaim || user_data.replaceNightBonus))
	{
		var header = $("#content_value h2:first");
		var claim = $("h3.error");
		if (claim.size() != 0)
		{
			claim.each(function() {
				var $this = $(this);
				$this.hide();
				header.addClass("error").text(header.text() + " - " + $this.text());
			});
		}
	}
}

var attackFrame = $("#content_value");
var infoTable = $("table.vis:first td:odd", attackFrame);
var doel = infoTable.first().text();

// laatste aanval onthouden
// op de confirmatie pagina zodat ongeldige doelen nooit de
// laatste aanval kunnen worden
var village = getVillageFromCoords(doel);
if (village.isValid)
{
	setCookie("lastVil", village.coord, 30);
}

if (user_data.attackAutoRename)
{
	var isAttack = $("input[name='attack']").val() == "true";

	var isBarbarian = infoTable.size() == (isAttack ? 4 : 3);
	var speler = (isBarbarian ? '' : infoTable.eq(1).text());
	//var duur = infoTable.eq(2).text();
	//var aankomst =infoTable.eq(3).text();
	//var aankomstSec = aankomst.substr(aankomst.lastIndexOf(':') + 1);
	//aankomstSec = aankomstSec.substr(0, aankomstSec.indexOf(' '));
	//var moraal = infoTable.eq(4).text();

	var unitsSent = {};
	$.each(world_data.units, function (i, val)
	{
		unitsSent[val] = $("input[name='" + val + "']", attackFrame).val() * 1;
	});
	var unitsCalc = calcTroops(unitsSent);

	// looptijd vergelijken met dodgetijd
	var dodgeCookie = getCookie("sanguDodge" + getQueryStringParam("village"));
	if (dodgeCookie)
	{
		dodgeCookie = dodgeCookie.split("~");
		//$("#content_value table.vis:first tbody").append("<tr><td>"+trans.sp.command.dodgeTitle+"</td><td id=dodgeTimeCell><img src=graphic/unit/"+dodgeCookie[0]+".png> <b>"+dodgeCookie[1]+"</b></td></tr>");
		var duurCell = $("#content_value table.vis:first td:contains('" + trans.tw.command.walkingTimeTitle + "')").next();
		var aanvalLooptijd = getTimeFromTW(duurCell.text());
		var dodgeTijd = getTimeFromTW(dodgeCookie[1]);

		var looptijdIsOk = aanvalLooptijd.totalSecs >= dodgeTijd.totalSecs;
		var diffSecs = (aanvalLooptijd.totalSecs - dodgeTijd.totalSecs);

		//trans.sp.command.dodgeTitle
		var dodgeCellText = "<table border=0 cellpadding=0 cellspacing=0 width='1%'><tr>";
		dodgeCellText += "<td width='25%' align=center>" + duurCell.text() + "</td>";
		dodgeCellText += "<td width='50%' align=center><b>" + (looptijdIsOk ? "&gt;&gt;&gt;" : "&lt;&lt;&lt;") + "</b></td>";
		dodgeCellText += "<td width='25%' align=center nowrap>" + dodgeCookie[1] + "&nbsp;";
		if (diffSecs > 0)
			dodgeCellText += trans.sp.command.dodgeMinuteReturn.replace("{minutes}", prettyDate(diffSecs * 2000, true)); // 2000 = Method expects milliseconds and distance is walked 2 times!
		dodgeCellText += "</td>";

		// prettyDate()

		dodgeCellText += "</tr></table>";
		duurCell.html(dodgeCellText);

		//q(aanvalLooptijd.totalSecs +"<"+ dodgeTijd.totalSecs);
		if (!looptijdIsOk)
			duurCell.find("table").attr("title", trans.sp.command.dodgeNotFarEnough).css("background-color", user_data.colors.error).find("td").css("background-color", user_data.colors.error);

		if (dodgeCookie[0] != "unit_" + unitsCalc.getSlowest())
		{
			$("h2:first", attackFrame).css("background-color", user_data.colors.error);
		}
	}
	else
	{
		// If a dodgecookie is in use, nightbonus etc isn't relevant
		unitsCalc.colorIfNotRightAttackType($("h2:first", attackFrame), isAttack);
		var arrivalTime = getDateFromTodayTomorrowTW($.trim($("#date_arrival").text()));
		if (user_data.proStyle && user_data.replaceNightBonus && isDateInNachtbonus(arrivalTime))
		{
			$("#date_arrival").css("background-color", user_data.colors.error).css("font-weight", "bold");
		}
	}
		
	// aanvalsnaam hernoemen
	var villageCoord = $("input[name='x']", attackFrame).val() + '|' + $("input[name='y']", attackFrame).val();
	var sent = buildAttackString(villageCoord, unitsSent, speler, !isAttack);
	document.title = game_data.village.coord + " -> " + sent;
	sent = (isAttack ? trans.tw.command.attackOn : trans.tw.command.osFor) + doel + "\\" + sent;

	var rand = Math.floor(Math.random() * 1000);
	setCookie("attRen" + rand, game_data.village.id + '_' + sent, 10);
}

/*$("input[name='submit']", attackFrame)
.bind("click", 
function()
{

});*/