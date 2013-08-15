/**
 *
 * @param {function} filterStrategy return true to hidethe row; false keep row visible (without reverse filter checkbox)
 * @param {Object} options
 */
function filterVillageRows(filterStrategy, options) {
    options = $.extend({}, {
        checkboxReverses: true
    }, options);

    var reverseFilter = options.checkboxReverses && $("#defReverseFilter").is(":checked"),
        goners = $(),
        villageCounter = 0;

    trackClickEvent(options.gaEventName);

    table.fixTable();

    table.getVillageRows().each(function () {
        var self = $(this);
        if (!reverseFilter != !filterStrategy(self)) {
            goners = goners.add(self);
        } else {
            villageCounter++;
        }
    });
    goners.remove();

    // Show totals
    table.setTotals(villageCounter);
}

// Show new attacks only
$("#filterAttack").click(function () {
    var strategy = function(row) {
        return $.trim($("td:first", row).text()) != trans.tw.command.attack;
    };

    filterVillageRows(strategy, {
        gaEventName: "FilterNewAttacks",
        checkboxReverses: false
    });
});


// Filter rows on column 0 - 3 (command, target, origin, player)
$("#filterColumn").click(function() {
    var filter = {
        index: $("#filterColumnIndex").val(),
        searchText: $.trim($("#filterColumnValue").val()).toLowerCase()
    };

    var filterStrategy = function(row) {
        return row.find("td").eq(filter.index).text().toLowerCase().indexOf(filter.searchText) === -1;
    };

    filterVillageRows(filterStrategy, {
        gaEventName: "column-" + $("#filterColumnIndex").text()
    });
});