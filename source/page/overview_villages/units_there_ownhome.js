// units tabel veranderen
function makeUnitBox(id, select)
{
	var box = "<select id=" + id + ">";
	$.each(world_data.units, function (i, v)
	{
		box += "<option value=" + i + (v == select ? " selected" : "") + ">" + trans.tw.units.names[v] + "</option>";
	});
	box += "</select>";
	return box;
}

var menu = "";
menu += "<tr>";
menu += "<th colspan=" + (4 + world_data.units.length + (world_data.hasMilitia ? 1 : 0)) + ">";
menu += "<input type=text size=5 id=filterAxeValue value='" + user_data.command.filterMinDefault + "'>";
menu += makeUnitBox("filterAxeType", user_data.command.filterMinDefaultType);
menu += "<input type=button id=filterAxe value='" + trans.sp.troopOverview.filterTroops + "'> &nbsp;";
menu += "<select id=filterPopValueType><option value=1>" + trans.sp.all.more + "</option>";
menu += "<option value=-1>" + trans.sp.all.less + "</option></select>";
menu += "<input type=text size=5 id=filterPopValue value='" + user_data.command.filterMinPopulation + "'><input type=button id=filterPop value='" + trans.sp.troopOverview.filterPopulation + "'> &nbsp; ";
menu += "<input type=button id=calculateStack value='" + trans.sp.troopOverview.calcStack + "'> &nbsp; ";
menu += "<input type=button id=edelFilter value='" + trans.sp.troopOverview.filterNoble + "'> &nbsp; ";
menu += "<input type=button id=aanvalFilter value='" + trans.sp.troopOverview.filterUnderAttack + "'> &nbsp; ";
menu += "<input type=checkbox id=sorteer " + (user_data.command.filterAutoSort ? " checked" : "") + "> " + trans.sp.troopOverview.sort + " &nbsp; ";

if (location.href.indexOf('type=there') > -1) menu += "<input type=button id=defRestack value='" + trans.sp.troopOverview.restack + "'>";
menu += "</th></tr><tr id=units_table_header>";
menu += "<th>" + trans.sp.troopOverview.village + "</th>";
menu += "<th>" + trans.sp.troopOverview.nightBonus + "</th>";
$.each(world_data.units, function (i, v)
{
	menu += "<th><img src='/graphic/unit/unit_" + v + ".png' title='" + trans.sp.troopOverview.selectUnitSpeed.replace("{0}", trans.tw.units.names[v]) + "' alt='' id=" + v + " /></th>";
});
if (world_data.hasMilitia) menu += "<th><img src='/graphic/unit/unit_militia.png' title='" + trans.tw.units.militia + "' alt='' id=militia /></th>";
menu += "<th>" + trans.sp.troopOverview.commandTitle + "</th>";

//builder.add("BEGIN TABLE BUILD");

// Do initial filter? (gebaseerd op querystring)
var search = window.location.search.substring(1).split("&");
var doFilter = false;
var unitIndex = user_data.command.filterMinDefault, unitAmount = user_data.command.filterMinDefault, sort = false, changeSpeed = false;
for (i = 0; i < search.length; i++)
{
	var item = search[i].split("=");
	switch (item[0])
	{
		case 'unit':
			doFilter = true;
			unitIndex = item[1];
			break;
		case 'amount':
			doFilter = true;
			unitAmount = parseInt(item[1], 0);
			break;
		case 'changeSpeed':
			changeSpeed = item[1];
			if (changeSpeed != false) setCookie("doelwitSpeed", changeSpeed);
			//alert(changeSpeed);
			break;

		case 'doelvillage':
			var newDoelwit = getVillageFromCoords(item[1]);
			setCookie("doelwit", newDoelwit.coord);
			break;

		case 'sort':
			sort = item[1] == "true";
			break;
	}
}

var doel = getVillageFromCoords(getCookie("doelwit"));
menu += "<th nowrap>" + trans.sp.all.targetEx + " <input type=text id=doelwit name=doelwit size=8 value='" + (doel.isValid ? doel.coord : "") + "'><input type=button id=doelwitButton value='" + trans.sp.troopOverview.setTargetVillageButton + "'></th>";
menu += "</tr>";

var dorpenCounter = 0;
var newTable = "";

var theUnits;
var rowSize = world_data.units.length + 1;
if (world_data.hasMilitia) rowSize++;

var mod = "row_a";
theUnits = $("#units_table tbody");

theUnits.each(function ()
{
	//q($(this).html());
	var newRow = "";
	var addThisRow = true;
	var cells = $("td:gt(0)", this);
	var units = {};

	cells.each(function (index, element)
	{
		if (doFilter && index - 1 == unitIndex && this.innerHTML * 1 < unitAmount)
		{
			//q("index:" + index + ' == '+ unitIndex + " : " + this.innerHTML + ' * 1 < ' + unitAmount);
			addThisRow = false;
			return false;
		}
		else if (index == rowSize)
		{
			//q(index + "==" + rowSize);
			//q("COMMANDS:" + world_data.hasMilitia + ":" + $(this).html());
			newRow += "<td>";
			newRow += "<img src='/graphic/dots/red.png' title='" + trans.sp.troopOverview.removeVillage + "' /> ";
			newRow += "<a href='" + $("a", element).attr('href').replace("mode=units", "") + "'>";
			newRow += "<img src='/graphic/command/attack.png' title='" + trans.sp.troopOverview.toThePlace + "'/>"; // Werkt enkel met leftclick onclick='this.src=\"/graphic/command/return.png\";'
			newRow += "</a></td>";
		}
		else
		{
			//q("units:" + world_data.units[index - 1]);
			var cellDisplay = this.innerHTML;
			if (cellDisplay == 0) cellDisplay = "&nbsp;";
			else if (cellDisplay.indexOf('="has_tooltip"') > -1) 
				cellDisplay = cellDisplay.replace('="has_tooltip"', '="has_tooltip" title="'+trans.sp.troopOverview.cheapNobles+'"');
			
			newRow += "<td>" + cellDisplay + "</td>";
			if (index > 0) units[world_data.units[index - 1]] = this.innerHTML * 1; 
			// innerHTML can contain a + sign for the nobles: "+" indicates nobles can be rebuild cheaply
			// The snobs are not important here
		}
	});

	if (addThisRow)
	{
		var villageType = calcTroops(units);
		//q(villageType.isDef);
		if (doFilter)
		{
			mod = dorpenCounter % 2 == 0 ? "row_a" : "row_b";
		}
		else
		{
			mod = !villageType.isDef ? "row_a" : "row_b";
		}

		newTable += "<tbody class='row_marker " + mod + "'>";
		newTable += "<tr aankomst='0'>";
		newTable += "<td>" + $("td:first", this).html() + "</td>";
		//newTable += "<td align=right></td>";
		newTable += newRow;
		newTable += "<td></td></tr>";
		newTable += "</tbody>";

		dorpenCounter++;
	}
});

//builder.add("END TABLE BUILD");
$("#units_table").html("<table width='100%' class='vis' id='units_table' doel='false'>" + menu + newTable + "</table>");
//builder.add("END TABLE REPLACE");

$('#doelwit').click(
function ()
{
	$(this).focus().select();
});

// Change event van doelwit: opnieuw aankomsttijden uitrekenen
$("#doelwitButton").bind("click", function ()
{
	var doelMatch = getVillageFromCoords($('#doelwit').val(), true);
	$("#units_table").attr("doel", doelMatch.isValid);
	if (!doelMatch.isValid)
	{
		setCookie("doelwit", "");
	}
	else
	{
		setCookie("doelwit", doelMatch.coord);
		$("#units_table").find("tr:visible:gt(1)").each(function ()
		{
			var coord = $(this).find("span[id^=label_text_]")[0].innerHTML.match(/^.*\((\d+)\|(\d+)\) C\d{1,2}$/);
			var dist = getDistance(doelMatch.x, coord[1], doelMatch.y, coord[2], twSnelheidCookie());

			$("td:last", this).html(dist.html);
			$(this).attr("aankomst", dist.travelTime);
			if (dist.isNachtbonus)
				$("td:eq(1)", this).css("background-color", user_data.colors.error);
			else
				$("td:eq(1)", this).css("background-color", '');
		});

		if ($("#sorteer").is(":checked"))
		{
			$("#units_table").find("tr:visible:gt(1)").sortElements(function (a, b)
			{
				return $(a).attr("aankomst") * 1 > $(b).attr("aankomst") * 1 ? 1 : -1;
			});
		}
	}
});

// "Aanvallen per pagina" wijzigen in aantal dorpen dat er in de lijst staan
var pageSize = $("input[name='page_size']");
pageSize.parent().prev().text(trans.sp.overviews.totalVillages);
pageSize.val(dorpenCounter);

// Afstand van dorp tot doelwit
// snelheid veranderen door op unit img te klikken
var snelheidCookie = twSnelheidCookie();
$('#' + snelheidCookie).css("border", "3px red solid");
$("#units_table_header").bind('click', function (e)
{
	if (e.target.nodeName === 'IMG')
	{
		setCookie("doelwitSpeed", e.target.id);
		$("img", this).css("border", "0px");
		$(e.target).css("border", "3px red solid");
		$("#doelwitButton").click();
	}
});

// Sorteren op aankomsttijd
/*$("#sorteer").click(function() {
if ($("#units_table").attr("doel") == "true")
{
$("#units_table").find("tr:visible:gt(1)").sortElements(function(a, b){
return $(a).attr("aankomst") * 1 > $(b).attr("aankomst") * 1 ? 1 : -1;
});
}
});*/

if (sort)
{
	$("#doelwitButton").click();
}

// deleten van een lijn
// border wordt groter naarmate er op het rallypoint geklikt wordt
// Opera herkent middel en rechter muiskliks niet... :(
$("#units_table").mouseup(function (e)
{
	if (e.target.nodeName === 'IMG')
	{
		if (e.target.title == trans.sp.troopOverview.removeVillage)
		{
			//if ((!$.browser.msie && e.button == 0) || ($.browser.msie && e.button == 1))
			//	alert("Left Button");
			// else if (e.button == 2)
			//	alert("Right Button");

			pageSize.val(pageSize.val() * 1 - 1);
			$(e.target).parent().parent().parent().hide();
			//img.css("border", (img.css("border-width").substr(0, 1) * 1 + 1) + "px red solid");
		}
	}
});

// default te filteren aantal zetten voor bepaalde unit
$("#filterAxeType").change(function ()
{
	var unit = world_data.units[$(this).val()];
	if (user_data.command.filterMin[unit] !== undefined)
	{
		$("#filterAxeValue").val(user_data.command.filterMin[unit]);
	}
	else
	{
		$("#filterAxeValue").val(user_data.command.filterMinOther);
	}
});

// rijen met minder dan x axemen wegfilteren
$("#filterAxe").bind("click", function ()
{
	//builder.reset("BEGIN FILTER AXE");
	var dorpenCounter = 0;
	var goners = $();
	var minBijl = $("#filterAxeValue").val() * 1;
	var unit = $('#filterAxeType').val() * 1;
	$("#units_table").find("tr:visible:gt(1)").each(function ()
	{
		var val = $("td:eq(" + (unit + 2) + ")", this).html();
		if (val == '&nbsp;' || val * 1 < minBijl)
		{
			goners = goners.add($(this));
			$("input:first", $(this)).val("");
		}
		else
			dorpenCounter++;
	});
	goners.parent().hide();
	pageSize.val(dorpenCounter);
	//builder.add("END FILTER AXE");
});

// Stack berekenen
$("#calculateStack").bind("click", function ()
{
	if (!this.disabled)
	{
		this.disabled = true;
		$("#units_table").find("tr:visible:gt(1)").each(function ()
		{
			var totaal = 0;
			$("td:gt(1)", this).each(function (i)
			{
				if (!($.trim(this.innerHTML) == '' || this.innerHTML == '&nbsp;' || i >= world_data.unitsPositionSize.length))
				{
					totaal += this.innerHTML * world_data.unitsPositionSize[i];
				}
			});
			var color = getStackColor(totaal, 30 * world_data.farmLimit);
			$("td:eq(1)", this).text(formatNumber(totaal)).css("background-color", color);
		});
	}
});

// Restack BB codes berekenen
if (location.href.indexOf('type=there') > -1)
	$("#defRestack").click(function ()
	{
		$("#calculateStack").click();

		var request = "";
		$("#units_table").find("tr:visible:gt(1)").each(function ()
		{
			var totaal = $("td:eq(1)", $(this)).text().replace(/\./, '') * 1;
			if (user_data.restack.to - totaal > user_data.restack.requiredDifference)
			{
				var villageCoord = getVillageFromCoords($(this).find("td:first span[id*='label_']").text());
				request += "[village]" + villageCoord.coord + "[/village] (" + parseInt((user_data.restack.to - totaal) / 1000, 0) + "k)\n";
			}
		});

		if ($("#defRestackArea").size() == 0)
			$(this).after("<textarea cols=35 rows=10 id=defRestackArea>" + request + "</textarea>");
		else
			$("#defRestackArea").val(request);
	});

// rijen met minder x population wegfilteren
$("#filterPop").bind("click", function ()
{
	$("#calculateStack").click();
	var dorpenCounter = 0;
	var goners = $();
	var min = $("#filterPopValue").val() * 1;
	var reverseFilter = $("#filterPopValueType").val() == "-1";
	$("#units_table").find("tr:visible:gt(1)").each(function ()
	{
		var lijn = $(this);
		$("td:eq(1)", this).each(function ()
		{
			var amount = $(this).text().replace('.', '') * 1;
			if ((!reverseFilter && amount < min) || (reverseFilter && amount > min))
			{
				goners = goners.add(lijn);
				$("input:first", lijn).val("");
			}
			else dorpenCounter++;
		});
	});
	goners.parent().hide();
	pageSize.val(dorpenCounter);
});

// rijen zonder edels wegfilteren
$("#edelFilter").bind("click", function ()
{
	var dorpenCounter = 0;
	var goners = $();
	$("#units_table").find("tr:visible:gt(1)").each(function ()
	{
		if ($("td:eq(" + (world_data.unitsPositionSize.length + 1) + ")", this).text() * 1 == 0)
		{
			goners = goners.add($(this));
			$("input:first", $(this)).val("");
		}
		else
			dorpenCounter++;
	});
	goners.parent().hide();
	pageSize.val(dorpenCounter);
});

// rijen niet onder aanval wegfilteren
$("#aanvalFilter").bind("click", function ()
{
	//builder.reset("BEGIN FILTER ATTACK");
	var dorpenCounter = 0;
	var goners = $();
	$("#units_table").find("tr:visible:gt(1)").each(function ()
	{
		if ($('td:first:not(:has(img[title=\'' + trans.tw.command.attack + '\']))', this).size() != 0)
		{
			goners = goners.add($(this));
			$("input:first", $(this)).val("");
		}
		else
			dorpenCounter++;
	});
	goners.parent().hide();
	pageSize.val(dorpenCounter);
	//builder.add("DONE FILTER ATTACK");
});