// Sort by attack id (and add extra column)
$("#sortByAttackId").click(function() {
    $(this).attr("disabled", true);
    table.fixTable();
    table.newColumns.after += 2;

    var diffGroups = user_data.incomings.attackIdDescriptions;
    function getFancyAttackIdDiffDescription(diff) {
        var i;
        for (i = 0; i < diffGroups.length; i++) {
            if (diff < diffGroups[i].minValue) {
                return diffGroups[i].text;
            }
        }

        return user_data.incomings.attackIdHigherDescription;
    }

    // new column in header
    tableHandler.overviewTable.find("tr:first").append("<th>"+trans.sp.incomings.attackId+"</th><th>"+trans.sp.incomings.attackIdDifference+"</th>");

    var rows = table.getVillageRows();
    rows.sortElements(function (rowA, rowB) {
        var a = $("input:first", rowA).attr("name").match(/\d+/)[0];
        var b = $("input:first", rowB).attr("name").match(/\d+/)[0];
        //q($("input:first", rowA).attr("name") + "=>" + a);
        return parseInt(a, 10) > parseInt(b, 10) ? 1 : -1;
    });

    var previousRowAttackId = 0;
    rows.each(function() {
        var attackId = parseInt($(this).find("input:first").attr("name").match(/\d+/)[0], 10),
            diff = 0,
            diffDescription = "&nbsp;";

        if (previousRowAttackId != 0) {
            diff = Math.abs(attackId - previousRowAttackId);
            diffDescription = getFancyAttackIdDiffDescription(diff);
        }
        previousRowAttackId = attackId;

        $(this).append("<td align=right>"+attackId+"</td><td>"+diffDescription+"</td>");
    });
});





// QUICK sort: performs faster but also freezes the screen (ie no countdowns)
// --> This might also be good in case the page is refreshing too often otherwise
$("#sortQuick").click(function () {
    trackClickEvent("SortQuick");
    table.fixTable();
    table.hasTotalRows = true;

    var newTable = "";
    var targets = [];
    var commandCounter = 0;
    var addTotalRow = $('#sortShowTotalRow').is(':checked');

    table.getVillageRows().each(function () {
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
                + (villageId == game_data.village.id ? " selected" : "") + ">"
                + row.html() + "</tr>";
            amount++;
        });

        if (addTotalRow) {
            if (amount === 1) {
                newTable += "<tr class='" + rowColor + " total'><td align=right colspan=" + table.getColspan() + ">&nbsp;</td></tr>";
            } else {
                newTable += "<tr class='" + rowColor + " total'><td align=right colspan=" + table.getColspan() + "><b>" + trans.sp.incomings.amount + "&nbsp; " + amount + "</b>&nbsp; &nbsp;</td></tr>";
            }
        }
    });

    var menu = $("tr:first", overviewTable).html();
    var totalRow = $("tr:last", overviewTable).html();
    overviewTable.html("<table id='incomings_table' class='vis'>" + menu + newTable + totalRow + "</table>");

    table.setTotals(commandCounter, targets.length);
});





// DYNAMIC sort incoming attacks
$("#sortIt").click(function () {
    table.fixTable();
    trackClickEvent("Sort");

    var rows = table.getVillageRows();
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
        this.className = "nowrap " + type + (villageId == game_data.village.id ? " selected" : "");
    });

    table.setTotals(rows.size(), amountOfVillages);
});