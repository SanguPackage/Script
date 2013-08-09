// Check all villages checkbox replacement
$("input.selectAll").replaceWith("<input type=checkbox id=selectAllVisible>");
$("#selectAllVisible").click(function () {
    var isChecked = $(this).is(":checked");
    $("input.village_checkbox:hidden", overviewTable).attr("checked", false);
    $("input.village_checkbox:visible", overviewTable).attr("checked", isChecked);
});


// Hide all OWN rows/villages that don't have any support rows anymore
$("#defHideEmpty").click( function () {
    trackClickEvent("FilterEmpty");
    var goners = $();
    if ($("#defTotals").is(":disabled")) {
        $("tr.units_away", overviewTable).each(function () {
            var mainRow = $(this),
                nextRow = mainRow.next();

            if (nextRow.hasClass("grandTotal")) {
                goners = goners.add(mainRow).add(nextRow.next()).add(nextRow);
            }
            else if (nextRow.hasClass("units_away")) {
                goners = goners.add(mainRow);
            }
        });
    } else {
        $("tr.units_away", overviewTable).each(function () {
            var mainRow = $(this),
                nextRow = mainRow.next();

            if (nextRow.hasClass("units_away")) {
                goners = goners.add(mainRow);
            }
        });
    }

    goners.remove();
    setTotalCount();
});


// Calculate the amount of def in each village
// Give sensible background row colors
// Add attributes to the grandTotal class rows 'village' (coords) and 'population'
// Add attribute 'distance' the distance between OWN and supporting villages, in fields
$("#defTotals").click(function () {
    trackClickEvent("FilterTotalDef");
    $(this).attr("disabled", true);
    var rowColor = 0;
    var goners = $();
    overviewTable.find("tr.units_away").each(function () {
        var self = $(this);
        var firstCell = self.find("td:first");
        var villageCoord = getVillageFromCoords(firstCell.find("span[id*='label_']").text());

        // ensure row color swapping for each own village
        rowColor++;
        if (rowColor % 2 == 1) {
            self.removeClass("row_a").addClass("row_b");
        } else {
            self.removeClass("row_b").addClass("row_a");
        }

        // village attribute both to .units_away and .grandTotal rows ;)
        self.attr("village", villageCoord.coord);

        var nextRow = self.next();
        if (nextRow.hasClass("units_away")) {
            if (user_data.restack.removeRowsWithoutSupport) {
                goners = goners.add(self);
            }
        } else {
            // calculate total support
            var grandTotal = 0;
            var totals = [];
            while (nextRow.hasClass("row_a") || nextRow.hasClass("row_b")) {
                var total = 0;
                $("td:gt(0)", nextRow).each(function (i) {
                    var cellSelf = $(this);
                    var cellContent = $.trim(cellSelf.text());
                    if (!(cellContent == '0' || i >= world_data.unitsPositionSize.length)) {
                        total += cellContent * world_data.unitsPositionSize[i];
                        if (totals[i] == undefined) {
                            totals[i] = parseInt(cellContent, 10);
                        } else {
                            totals[i] += parseInt(cellContent, 10);
                        }
                    }
                });
                grandTotal += total;
                $("td:eq(" + (world_data.unitsPositionSize.length + 1) + ")", nextRow).text(formatNumber(total));

                var supportedCell = $("td:first", nextRow);
                var supportedVillage = getVillageFromCoords(supportedCell.text());
                var distance = parseInt(getDistance(supportedVillage.x, villageCoord.x, supportedVillage.y, villageCoord.y, 'ram').fields, 10);
                supportedCell.html(supportedCell.html() + ' <b>' + trans.sp.all.fieldsSuffix.replace("{0}", distance) + '</b>');
                nextRow.attr("distance", distance);

                if (rowColor % 2 == 1) {
                    nextRow.removeClass("row_a").addClass("row_b");
                } else {
                    nextRow.removeClass("row_b").addClass("row_a");
                }

                nextRow = nextRow.next();
            }

            // row colors for the support villages
            if (rowColor % 2 == 1) {
                nextRow.removeClass("row_a").addClass("row_b");
            } else {
                nextRow.removeClass("row_b").addClass("row_a");
            }

            var troopCells = "";
            for (var i = 0; i < world_data.unitsPositionSize.length; i++) {
                if (typeof totals[i] !== 'undefined') {
                    troopCells += "<td>" + formatNumber(totals[i]) + "</td>";
                } else {
                    troopCells += "<td><span class=hidden>0</span></td>";
                }
            }

            self.attr("population", grandTotal);
            var color = getStackColor(grandTotal);
            color = "<td style='background-color: " + color + "; border:1px solid black'>" + formatNumber(grandTotal) + "</td>";

            nextRow.before("<tr class='grandTotal " + (rowColor % 2 == 1 ? "row_b" : "row_a") + "' village='" + villageCoord.coord + "' population='" + grandTotal + "'><td>&nbsp;</td><td>" + (isSupport ? trans.sp.defOverview.totalFromOtherVillages : trans.sp.defOverview.totalInOtherVillages) + "</td>" + troopCells + color + "</tr><tr height=10></tr>");
        }
    });

    goners.remove();
});