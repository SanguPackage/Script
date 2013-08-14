// Show new attacks only
$("#filterAttack").click(function () {
    trackClickEvent("FilterNewAttacks");
    var goners = $();
    var remainingVillages = 0;
    getVillageRows().each(function() {
        var self = $(this);
        if ($.trim($("td:first", self).text()) != trans.tw.command.attack) {
            goners = goners.add(self);
        } else {
            remainingVillages++;
        }
    });
    goners.remove();

    var amountOfCommandsHeaderCell = $("tr:first", overviewTable).find("th:first");
    assert(amountOfCommandsHeaderCell.length === 1, "couldn't find the command headercell");
    amountOfCommandsHeaderCell.html(amountOfCommandsHeaderCell.html().replace(/\(\d+\)/, "(" + remainingVillages + ")"));
});

