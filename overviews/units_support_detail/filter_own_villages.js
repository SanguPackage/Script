// This file contains the filters on the FIRST row of the menu

// UNDER ATTACK FILTER
$("#attackFilter").click(function () {
    trackClickEvent("FilterAttack");
    var reverseFilter = true; // never reverse this filter!

    var filterStrategy =
        function (row) {
            return $('td:first:not(:has(img[title=\'' + trans.tw.command.attack + '\']))', row).size() == 0;
        };

    var lastRow = $("tr:last", overviewTable).get(0);
    var goners = $();
    $("tr.units_away", overviewTable).each(function () {
        var self = $(this);
        if (!reverseFilter != !filterStrategy(self)) {
            goners = goners.add(self);

            var nextRow = self.next();
            while (!nextRow.hasClass("units_away") && nextRow.get(0) !== lastRow) {
                goners = goners.add(nextRow);
                nextRow = nextRow.next();
            }
        }
    });
    goners.remove();
    setTotalCount();

    // this is already done in the code above :)
    //$("#defHideEmpty").click();

    if (user_data.restack.calculateDefTotalsAfterFilter
        && !$("#defTotals").is(":disabled")) {

        $("#defTotals").click();
    }
});



/**
 * Performs a filter on the OWN villages (ie not the villages supporting the OWN villages)
 * The 'row' parameter are the rows with class grandTotal. These are the rows that get added after (below) all
 * supporting os rows when the total def is being calculated.
 * @param {function} filterStrategy return a boolean to filter all rows for the OWN away. first parameter is the (jQuery) row with the OWN village
 * @param {boolean} reverseFilter reverse the above strategy
 * @param {function} [survivorRowStrategy] execute on all rows that are not being removed (gets passed the row and optional tag)
 * @param {*} [tag] this value is passed onto filterStrategy and survivorRowStrategy as the second parameter (row is the first param)
 */
function filterMainRows(filterStrategy, reverseFilter, survivorRowStrategy, tag) {
    if (!$("#defTotals").is(":disabled")) {
        $("#defTotals").click();
    }

    /*var goners = $();
    $("tr.grandTotal", overviewTable).each(function () {
        var self = $(this),
            prev;
        if (!reverseFilter != !filterStrategy(self, tag)) {
            goners = goners.add(self).add(self.next());

            prev = self.prev();
            while (!prev.hasClass("units_away")) {
                goners = goners.add(prev);
                prev = prev.prev();
            }

            goners = goners.add(prev);
        } else if (survivorRowStrategy != null) {
            prev = self.prev();
            while (!prev.hasClass("units_away")) {
                prev = prev.prev();
            }
            survivorRowStrategy(prev, tag);
        }
    });
     goners.remove();
     setTotalCount();*/

    var lastRow = $("tr:last", overviewTable).get(0);
    var goners = $();
    $("tr.units_away", overviewTable).each(function () {
        var self = $(this);
        if (!reverseFilter != !filterStrategy(self, tag)) {
            goners = goners.add(self);

            var nextRow = self.next();
            while (!nextRow.hasClass("units_away") && nextRow.get(0) !== lastRow) {
                goners = goners.add(nextRow);
                nextRow = nextRow.next();
            }
        }
        else if (survivorRowStrategy != null) {
            /*prev = self.prev();
            while (!prev.hasClass("units_away")) {
                prev = prev.prev();
            }*/
            survivorRowStrategy(self, tag);
        }
    });
    goners.remove();
    setTotalCount();
}



// filter the OWN villages on less/more population (requires total calculation)
$("#defFilterTotalPop").click(function () {
    trackClickEvent("FilterFarm");
    var reverseFilter = $("#defFilterTotalPopComparer").val() != "-1";
    var compareTo = parseInt($("#defFilterTotalPopValue").val(), 10);

    filterMainRows(
        function (row) { q(row.attr("village") + "is:" + row.attr("population")); return (parseInt(row.attr("population"), 10) > compareTo); },
        reverseFilter);
});

// filter the OWN villages on less/more distance to given coordinates (requires total calculation)
$("#defFilterDist").click(function () {
    var targetVillage = getVillageFromCoords($("#defFilterDistVillage").val(), true);
    if (!targetVillage.isValid) {
        alert(trans.sp.defOverview.distanceToVillageNoneEntered);
        return;
    }

    trackClickEvent("FilterDistanceToX");
    var reverseFilter = !($("#defFilterDistType").val() != "-1");
    var maxDistance = parseInt($("#defFilterDistanceValue").val(), 10);

    // Change text of th cell to 'distance to ' + given village
    overviewTable.find("th:eq(1)").html(
        trans.sp.defOverview.distanceToVillage.replace(
            "{0}",
            "<a href='"
                + getUrlString("&screen=map&x=" + targetVillage.x + "&y=" + targetVillage.y + "'>")
                + targetVillage.coord + "</a>"));

    filterMainRows(
        function (row, tag) {
            var compareVillage = getVillageFromCoords(row.attr("village"));
            tag.distance = getDistance(targetVillage.x, compareVillage.x, targetVillage.y, compareVillage.y, 'ram').fields;
            return tag.distance > maxDistance;
        },
        reverseFilter,
        function (mainRow, tag) {
            // Adds the distance between OWN village and the user given coordinates
            mainRow.find("td:eq(1)").html("<b>" + trans.sp.defOverview.fieldsPrefix.replace("{0}", parseInt(tag.distance, 10)) + "</b>");
        },
        { distance: 0 });
});