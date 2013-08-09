// This file contains the filters on the SECOND row of the menu

/**
 * Loops over all supporting rows and removes the rows that fail the filterStrategy predicate. Where the
 * filterMainRows function loops over the OWN villages, this one loops over all the others.
 * @param {Function} filterStrategy gets each jQuery row that represents a supporting village passed as parameter
 * @param {string=after} [calcDefTotalsTime] is "before" or "after". before if it uses row attributes set by #defTotals
 */
function filterTable(filterStrategy, calcDefTotalsTime) {
    if (typeof calcDefTotalsTime === 'undefined') {
        calcDefTotalsTime = "after";
    }
    if (calcDefTotalsTime === "before" && !$("#defTotals").is(":disabled")) {
        $("#defTotals").click();
    }
    var totalDefCalced = $("#defTotals").is(":disabled");

    var reverseFilter = $("#defReverseFilter").is(":checked");
    var goners = $();
    $("tr", overviewTable).slice(1).each(function () {
        var self = $(this);
        if ((totalDefCalced && self.attr("distance"))
            || (!totalDefCalced && (self.hasClass("row_a") || self.hasClass("row_b")))) {

            if (!reverseFilter != !filterStrategy(self)) {
                goners = goners.add(self);
            }
        }
    });
    goners.remove();
    setTotalCount();
    if (user_data.restack.autohideWithoutSupportAfterFilter) {
        $("#defHideEmpty").click();
    }

    if (user_data.restack.calculateDefTotalsAfterFilter
        && calcDefTotalsTime === "after"
        && !$("#defTotals").is(":disabled")) {

        $("#defTotals").click();
    }
}





// NOBLES and SCOUTS
$("#filtersnob, #filterspy").click( function () {
    trackClickEvent("FilterSnobOrSpy");
    var position = $.inArray($(this).attr("id").substr(6), world_data.units) + 1;
    filterTable(function (row) {
        return row.find("td").eq(position).text() != "0";
    });
});

// OTHER PLAYERS SUPPORT
$("#filterSupport").click( function () {
    trackClickEvent("FilterSupport");
    filterTable(function (row) {
        return row.find("td:first a").length != 2;
    });
});

// DEFENSIVE & OFFENSIVE UNITS
$("#filterAttack, #filterDefense").click( function () {
    trackClickEvent("FilterOffOrDef");
    var unitArray = $(this).attr('id') == "filterDefense" ? world_data.units_def : world_data.units_off;
    filterTable(function (row) {
        var hideRow = false;
        $("td:gt(0)", row).each(function (i) {
            if (world_data.units[i] != undefined
                && world_data.units[i] != "heavy"
                && parseInt($(this).text(), 10) > 0
                && $.inArray(world_data.units[i], unitArray) > -1) {

                hideRow = true;
                return false;
            }
        });

        return hideRow;
    });
});

/// BARBARIAN VILLAGES filter
$("#defFilterBarbarian").click( function () {
    trackClickEvent("FilterBarbarian");
    filterTable(function (row) {
        var text = row.find("td:first").text();
        return text.match(/\(---\)\s+\(F\d+\)$/); // Unlocalized F(ields) string
    });
});

// TEXT FILTER
$("#defFilterText").click( function () {
    trackClickEvent("FilterText");
    var compareTo = $("#defFilterTextValue").val().toLowerCase();
    if (compareTo.length > 0)
        filterTable(function (row) {
            return row.text().toLowerCase().indexOf(compareTo) == -1;
        });
});

// DISTANCE between OWN and supporting village
$("#defFilterDistance").click(function () {
    trackClickEvent("FilterDistance");
    var maxDistance = $("#defFilterDistanceValue").val();
    filterTable(
        function (row) {
            var distance = $(row).attr("distance");
            return (distance != '' && parseInt(distance, 10) < maxDistance);
        },
        "before");
});