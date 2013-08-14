function allowSortOnce() {
    $("#sortQuick").attr("disabled", true);
    $("#sortIt").attr("disabled", true);
    $("#sortByAttackId").attr("disabled", true);
}

function sortWrapper(settings) {
    trackClickEvent(settings.gaTrackerName);

    var allCommandRows =
        tableHandler.sort(settings.sorter);

    var amountOfVillages = 0;
    var current = "";
    var currentAttacksNumber = 0;
    var currentSupportsNumber = 0;
    var currentVillageName = "";

    allCommandRows.each(function () {
        var village = $("td:eq(1)", this);
        if (current != village.text()) {
            if (current != "") {
                printVillageAttacksSummary(currentVillageName, currentAttacksNumber, currentSupportsNumber);

                currentAttacksNumber = 0;
                currentSupportsNumber = 0;
            }

            current = village.text();
            amountOfVillages++;
            currentVillageName = getVillageFromCoords(village.text()).validName();
            $(this).before("<tr><th colspan=2 id=totalRow"+currentVillageName+">&nbsp;</th></tr>");
        }

        var isAttack = $("a.attack-icon", this).length > 0;
        if (isAttack) currentAttacksNumber++;
        else currentSupportsNumber++;

        var type = amountOfVillages % 2 == 0 ? 'row_a' : 'row_b';

        var villageId = village.find("a:first").attr("href").match(/village=(\d+)/)[1];
        this.className = type + (villageId == game_data.village.id ? " selected" : "");
    });
    printVillageAttacksSummary(currentVillageName, currentAttacksNumber, currentSupportsNumber);

    if (typeof settings.action !== 'undefined') {
        var villageRows = tableHandler.getVillageRows();
        villageRows.each(settings.action);
    }

    tableHandler.showAmountOfRows([
        {text: trans.sp.commands.totalVillagesAttack, value: amountOfVillages},
        {text: trans.sp.incomings.amountOfCommands, value: allCommandRows.size()}
    ], allCommandRows.size());
}

// Sort by attack id (and add extra column)
$("#sortByAttackId").click(function() {
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

    allowSortOnce();
    tableHandler.overviewTable.find("tr:first").append("<th>"+trans.sp.incomings.attackId+"</th><th>"+trans.sp.incomings.attackIdDifference+"</th>");

    var rows = getVillageRows();
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

// DYNAMIC sort incoming attacks
$("#sortIt").click(function () {
    allowSortOnce();
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
    allowSortOnce();

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