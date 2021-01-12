// Calculate Restack BB codes
if (location.href.indexOf('type=there') > -1) {
    $("#defRestack").click(function () {
        trackClickEvent("BBCodeOutput");
        $("#calculateStack").click();

        var request = "";
        $("#units_table").find(overviewMenuRowFilter).each(function () {
            var total = parseInt($("td:eq(1)", $(this)).text().replace(/\./, ''), 10);
            if (user_data.restack.to - total > user_data.restack.requiredDifference) {
                var villageDesc = $(this).find("td:first span[data-text]").text(),
                    villageCoord = getVillageFromCoords(villageDesc);

                request += "[village]" + villageCoord.coord + "[/village] (" + parseInt((user_data.restack.to - total) / 1000, 10) + "k)\n";
            }
        });

        if ($("#textsArea").length == 0) {
            $(this).parent().parent().parent().append("<tr><td id=textsArea colspan=5></td></tr>");
        } else {
            $("#textsArea").html("");
        }

        var title = trans.sp.troopOverview.restackTitle
            .replace("{to}", parseInt(user_data.restack.to / 1000, 10))
            .replace("{requiredDiff}", parseInt(user_data.restack.requiredDifference / 1000, 10));
        $("#textsArea").append(title + "<br><textarea cols=35 rows=10 id=defRestackArea>" + request + "</textarea>");

        $("#textsArea").append("<br><input type=button value='" + trans.sp.all.close + "' id=closeTextsArea>");
        $("#closeTextsArea").click(function() {
            $("#textsArea").parent().remove();
        });
    });
}
