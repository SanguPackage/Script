// Aanvallen groeperen per dorp
var menu = "";
menu += "<table width='100%'>";
menu += "<tr><th colspan=6>";
menu += "<input type=button id=sorteren value='" + trans.sp.incomings.dynamicGrouping + "'>";
menu += "&nbsp;&nbsp; <input type=checkbox id=sorterenSum " + (user_data.command.sumRow ? "checked" : "") + "> " + trans.sp.incomings.summation + " ";
menu += "<input type=button id=sorterenSnel value='" + trans.sp.incomings.fastGrouping + "'>";
menu += "<input type=button id=filterAanval value='" + trans.sp.incomings.showNewIncomings + "'>";
menu += "</th></tr>";
menu += "</table>";
$("#incomings_table").before(menu);

// Aantal aanvallen
function showAantalAanvallen(aantalDorpen, aantalBevelen)
{
	if ($("#aantalAanvallen").size() == 0)
	{
		var pageSize = $("input[name='page_size']");
		pageSize.parent().prev().text("Aangevallen dorpen:");
		pageSize = pageSize.val(aantalDorpen).parent().parent().parent();
		pageSize.append('<tr><th colspan=2 id="aantalAanvallen">' + trans.sp.incomings.amount + '</th><td>' + aantalBevelen + '</td></tr>');
	}
}

// Binnenkomende aanvallen sorteren
$("#sorteren").bind('click', function ()
{
	this.disabled = true;
	$("#sorterenSnel").attr("disabled", true);

	//builder.reset("DYNAMISCH START");
	var rows = $("#incomings_table").find("tr:gt(0):visible").not("tr:last");
	rows.sortElements(function (a, b)
	{
		a = getVillageFromCoords($("td:eq(1)", a).text());
		b = getVillageFromCoords($("td:eq(1)", b).text());

		return (a.x * 1000 + a.y) > (b.x * 1000 + b.y) ? 1 : -1;
	});

	//builder.add("YAYE");
	var aantalDorpen = "";
	var current = "";
	var mod = 0;
	rows.each(function ()
	{
		var dorp = $("td:eq(1)", this).text();
		if (current != dorp)
		{
			current = dorp;
			mod++
			aantalDorpen++;
		}
		var type = mod % 2 == 0 ? 'row_a' : 'row_b';
		this.className = type;
	});
	//builder.add("done");

	showAantalAanvallen(aantalDorpen, rows.size());
});

$("#sorterenSnel").bind('click', function ()
{
	this.disabled = true;
	$("#sorteren").attr("disabled", true);

	builder.reset("SNEL START");
	var newTable = "";
	var targets = [];
	var aantalCommandos = 0;
	var som = $('#sorterenSum').attr('checked') == "checked";

	$("#incomings_table").find("tr:gt(0)").each(function ()
	{
		var target = $("td:eq(1)", this).text();
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

	//builder.add("ORDERED");
	var mod = 0;
	$.each(targets, function (i, v)
	{
		mod++;
		var aantal = 0;
		$.each(targets[v], function (index, value)
		{
			newTable += "<tr class='nowrap row_" + (mod % 2 == 0 ? 'b' : 'a') + "'>" + value.html() + "</tr>";
			aantal++;
		});

		if (som)
		{
			newTable += "<tr><td align=right colspan=6>" + aantal + "&nbsp;</td></tr>";
		}
	});

	//builder.add("BUILT");
	var menu = $("#incomings_table tr").first().html();
	$("#incomings_table").html("<table id='incomings_table' class='vis'>" + menu + newTable + "</table>");
	//builder.add("REPLACED");

	showAantalAanvallen(targets.length, aantalCommandos);
});

$("#filterAanval").bind('click', function ()
{
	var goners = $();
	$("#incomings_table tr:gt(0)").not("tr:last").each(function()
	{
		if ($.trim($("td:first", this).text()) != trans.tw.command.attack)
		{
			goners = goners.add($(this));
			$(":checkbox", this).attr("checked", false);
		}
	});
	goners.hide();
});