// Recalculate arrival times as the target village changes
$("#targetVillageButton").click(function () {
    trackClickEvent("TargetVillageSet");
    var targetMatch = getVillageFromCoords($('#targetVillage').val(), true);
    $("#units_table").attr("target", targetMatch.isValid);
    if (!targetMatch.isValid) {
        spTargetVillageCookie("");
        alert(trans.sp.troopOverview.setTargetVillageButtonAlert);
        $("#targetVillage").focus();

    } else {
        $(".attackLinks", tableHandler.overviewTable).each(function() {
            // add target coordinates to attack image href which are read in place
            var hrefWithVillageCoords = $(this).attr("href");
            hrefWithVillageCoords = hrefWithVillageCoords.replace(/sanguX=(\d+)&sanguY=(\d+)/, "sanguX="+targetMatch.x+"&sanguY="+targetMatch.y);
            $(this).attr("href", hrefWithVillageCoords);
        });

        spTargetVillageCookie(targetMatch.coord);
        $("#units_table").find(overviewMenuRowFilter).each(function () {
            var unitRow = $(this),
                dist = getDistance(targetMatch.x, unitRow.data("coord-x"), targetMatch.y, unitRow.data("coord-y"), currentPageSpeed);

            $("td:last", unitRow).html(dist.html);
            $(this).attr("arrival", dist.travelTime);
            if (dist.isNightBonus) {
                $("td:eq(1)", unitRow).css("background-color", user_data.colors.error);
            } else {
                $("td:eq(1)", unitRow).css("background-color", '');
            }
        });

        if ($("#sortIt").is(":checked")) {
            $("#units_table").find(overviewMenuRowFilter).sortElements(function (a, b) {
                return parseInt($(a).attr("arrival"), 10) > parseInt($(b).attr("arrival"), 10) ? 1 : -1;
            });
        }
    }
});

// sort can be set with the querystring
if (sort) {
    $("#targetVillageButton").click();
}

// delete a table row
$("#units_table").mouseup(function (e) {
    if (e.target.nodeName === 'IMG') {
        if (e.target.title == trans.sp.troopOverview.removeVillage) {
            setVillageCount(parseInt(pageSize.val(), 10) - 1);
            $(e.target).parent().parent().remove();
        }
    }
});

// remove row or add border to command cell when middle mouse click (open in new tab)
$(".attackLinks", tableHandler.overviewTable).bind("mousedown", function(e) {
    if (e.which == 2) {
        var cell = $(e.target).parent().parent();
        if (user_data.command.middleMouseClickDeletesRow2) {
            cell.parent().remove();
        } else {
            cell.css("border", (parseInt(cell.css("border-width").substr(0, 1), 10) + 1) + "px red solid");
        }
    }
});

// Change active speed by clicking on a unit icon
// ATTN: border style duplicated in trans.troopOverview.help
$('#' + currentPageSpeed).parent().css("border", "2px green dotted");
$('#' + spSpeedCookie()).parent().css("border", "3px red solid");
$("#units_table_header").click(function (e) {
    if (e.target.nodeName === 'IMG' && e.target.id !== "militia") {
        currentPageSpeed = e.target.id;
        $("img", this).parent().css("border", "0px");
        $('#' + currentPageSpeed).parent().css("border", "2px green dotted");
        $('#' + spSpeedCookie()).parent().css("border", "3px red solid");
        $("#targetVillageButton").click();
    }
});

$("#units_table_header").dblclick(function (e) {
    if (e.target.nodeName === 'IMG' && e.target.id !== "militia") {
        currentPageSpeed = e.target.id;
        spSpeedCookie(e.target.id);
        $("img", this).parent().css("border", "0px");
        $('#' + currentPageSpeed).parent().css("border", "2px green dotted");
        $('#' + spSpeedCookie()).parent().css("border", "3px red solid");
        $("#targetVillageButton").click();
    }
});