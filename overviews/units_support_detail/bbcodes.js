// Calculate villages that don't have x population defense
// and create BBcodes textarea for it
$("#defRestack").click(function () {
    trackClickEvent("BBCodeOutput");
    if (!$("#defTotals").attr("disabled")) {
        $("#defTotals").click();
    }

    var restackTo = parseInt($("#defRestackTo").val(), 10);
    var counter = 0;

    var request = "";
    $("tr.grandTotal", overviewTable).each(function () {
        var self = $(this);
        var total = parseInt(self.attr('population'), 10);
        if (restackTo - total > user_data.restack.requiredDifference) {
            var villageCoords = self.attr("village");
            counter++;
            request += counter + "[village]" + villageCoords + "[/village] (" + parseInt((restackTo - total) / 1000, 10) + trans.sp.defOverview.thousandSuffix + ")\n";
        }
    });

    if ($("#textsArea").length == 0) {
        $(this).parent().parent().parent().parent().after(
            "<table class='vis' width='100%'><tr>"
                + "<td id=textsArea width='50%' valign='top'></td>"
                + "<td id='extraTextsArea' width='50%' valign='top'>"
                + trans.sp.defOverview.freeText
                + "<br><textarea cols=50 rows=9></textarea></td>"
                + "</tr></table>");

        $("#textsArea").parent().after("<tr><td colspan='2'><input type=button value='" + trans.sp.all.close + "' id=closeTextsArea></td></tr>");
    } else {
        $("#textsArea").html("");
    }

    var title = trans.sp.troopOverview.restackTitle
        .replace("{to}", parseInt(restackTo / 1000, 10))
        .replace("{requiredDiff}", parseInt(user_data.restack.requiredDifference / 1000, 10));

    $("#textsArea").append(title + "<br><textarea cols=50 rows=10 id=restackArea>" + request + "</textarea>");

    $("#closeTextsArea").click(function() {
        $("#textsArea").parent().parent().remove();
    });
});
