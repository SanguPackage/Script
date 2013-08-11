// DYNAMIC sort incoming attacks
$("#sortIt").click(function () {
    this.disabled = true;
    $("#sortQuick").attr("disabled", true);
    trackClickEvent("Sort");

    var rows = getVillageRows();
    rows.sortElements(function (a, b) {
        a = getVillageFromCoords($("td:eq(1)", a).text());
        b = getVillageFromCoords($("td:eq(1)", b).text());

        return (a.x * 1000 + a.y) > (b.x * 1000 + b.y) ? 1 : -1;
    });

    var amountOfVillages = 0;
    var current = "";
    rows.each(function () {
        var village = $("td:eq(1)", this);
        if (current != village.text()) {
            current = village.text();
            amountOfVillages++;
        }
        var type = amountOfVillages % 2 == 0 ? 'row_a' : 'row_b';

        var villageId = village.find("a:first").attr("href").match(/village=(\d+)/)[1];
        this.className = type + (villageId == game_data.village.id ? " selected" : "");
    });

    showAmountOfAttacks(amountOfVillages, rows.size());
});



// QUICK sort: performs faster but also freezes the screen (ie no countdowns)
// --> This might also be good in case the page is refreshing too often otherwise
$("#sortQuick").click(function () {
    trackClickEvent("SortQuick");
    this.disabled = true;
    $("#sortIt").attr("disabled", true);

    var newTable = "";
    var targets = [];
    var commandCounter = 0;
    var addTotalRow = $('#sortShowTotalRow').is(':checked');

    getVillageRows().each(function () {
        var target = $("td:eq(1)", this).text();
        var village = getVillageFromCoords(target);
        if (village.isValid) {
            commandCounter++;
            if (targets[village.coord] == undefined) {
                targets.push(village.coord);
                targets[village.coord] = [];
            }
            targets[village.coord].push($(this));
        }
    });

    var mod = 0;
    $.each(targets, function (i, v) {
        mod++;
        var rowColor = "row_" + (mod % 2 == 0 ? 'b' : 'a');
        var amount = 0;
        $.each(targets[v], function (index, row) {
            var villageId = row.find("td:eq(1) a:first").attr("href").match(/village=(\d+)/)[1];
            newTable += "<tr class='nowrap " + rowColor + "'"
                + (villageId == game_data.village.id ? " selected" : "") + "'>"
                + row.html() + "</tr>";
            amount++;
        });

        if (addTotalRow) {
            if (amount === 1) {
                newTable += "<tr class='" + rowColor + "'><td align=right colspan=7>&nbsp;</td></tr>";
            } else {
                newTable += "<tr class='" + rowColor + "'><td align=right colspan=7><b>" + trans.sp.incomings.amount + "&nbsp; " + amount + "</b>&nbsp; &nbsp;</td></tr>";
            }
        }
    });

    var menu = $("tr:first", overviewTable).html();
    var totalRow = $("tr:last", overviewTable).html();
    overviewTable.html("<table id='incomings_table' class='vis'>" + menu + newTable + totalRow + "</table>");

    showAmountOfAttacks(targets.length, commandCounter);
});