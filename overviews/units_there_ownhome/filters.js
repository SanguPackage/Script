function filterVillageRows(filterStrategy) {
    // return true to hidethe row; false keep row visible (without reverse filter checkbox)
    var reverseFilter = $("#defReverseFilter").is(":checked"),
        goners = $(),
        villageCounter = 0;

    $("#units_table").find(overviewMenuRowFilter).each(function () {
        var self = $(this);
        if (!reverseFilter != !filterStrategy(self)) {
            goners = goners.add(self);
            $("input:eq(1)", self).val("");
        } else {
            villageCounter++;
        }
    });
    goners.remove();

    // Show totals
    setVillageCount(villageCounter);
}

$("#defFilterContinent").click(function () {
    trackClickEvent("FilterContinent");
    var continent = parseInt($("#defFilterContinentText").val(), 10);
    if (!isNaN(continent)) {
        filterVillageRows(function (row) {
            var village = getVillageFromCoords(row.find("td:first").text());
            if (!village.isValid ) {
                return true;
            }
            return village.continent() != continent;
        });
    }
});

$("#defFilterText").click(function () {
    trackClickEvent("FilterText");
    var compareTo = $("#defFilterTextValue").val().toLowerCase();
    if (compareTo.length > 0) {
        filterVillageRows(function (row) {
            return row.text().toLowerCase().indexOf(compareTo) == -1;
        });
    }
});







// Filter rows with less than x axemen (or another unit)
$("#filterAxe").click(function () {
    trackClickEvent("FilterUnitAmount");
    var villageCounter = 0;
    var goners = $();
    var minAxeValue = parseInt($("#filterAxeValue").val(), 10);
    var unit = parseInt($('#filterAxeType').val(), 10);
    $("#units_table").find(overviewMenuRowFilter).each(function () {
        var val = $("td:eq(" + (unit + 2) + ")", this).html();
        if (val == '&nbsp;' || parseInt(val, 10) < minAxeValue) {
            goners = goners.add($(this));
            $("input:first", $(this)).val("");
        }
        else
            villageCounter++;
    });
    goners.remove();
    setVillageCount(villageCounter);
});
// change by default selected unit the filter will be active for
$("#filterAxeType").change(function () {
    var unit = world_data.units[$(this).val()];
    if (typeof user_data.command.filterMin[unit] !== 'undefined') {
        $("#filterAxeValue").val(user_data.command.filterMin[unit]);
    } else {
        $("#filterAxeValue").val(user_data.command.filterMinOther);
    }
});



// Filter rows without snobs/nobles
$("#snobFilter").click(function () {
    trackClickEvent("FilterSnob");
    var villageCounter = 0;
    var goners = $();
    $("#units_table").find(overviewMenuRowFilter).each(function () {
        if ($.trim($("td:eq(" + (world_data.unitsPositionSize.length + 1) + ")", this).text()) === '') {
            goners = goners.add($(this));
            $("input:first", $(this)).val("");
        } else
            villageCounter++;
    });
    goners.remove();
    setVillageCount(villageCounter);
});

// hide rows not under attack
$("#attackFilter").click(function () {
    trackClickEvent("FilterUnderAttack");
    var villageCounter = 0;
    var goners = $();
    $("#units_table").find(overviewMenuRowFilter).each(function () {
        //q("'" + $(this).html() + "'");
        //q("---------------------------------------------------");
        if ($('td:first:not(:has(img[title=\'' + trans.tw.command.attack + '\']))', this).size() != 0) {
            goners = goners.add($(this));
            $("input:first", $(this)).val("");
        } else {
            villageCounter++;
        }
    });
    goners.remove();
    setVillageCount(villageCounter);
});

// filter rows with less then x population
$("#filterPop").click(function () {
    trackClickEvent("FilterFarm");
    $("#calculateStack").click();
    var villageCounter = 0;
    var goners = $();
    var min = parseInt($("#filterPopValue").val(), 10);
    var reverseFilter = $("#filterPopValueType").val() == "-1";
    $("#units_table").find(overviewMenuRowFilter).each(function () {
        var line = $(this);
        $("td:eq(1)", this).each(function () {
            var amount = parseInt($(this).text().replace('.', ''), 10);
            if ((!reverseFilter && amount < min) || (reverseFilter && amount > min)) {
                goners = goners.add(line);
                $("input:first", line).val("");
            }
            else villageCounter++;
        });
    });
    goners.remove();
    setVillageCount(villageCounter);
});