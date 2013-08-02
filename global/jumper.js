if (user_data.jumper.enabled) {
    (function() {
        //console.time("jumper");
        try {
            var cell = "<span style='display: none;' id=sanguJumperFrame>";
            cell += "<input type=text type=text size=6 id=sangujumper style='height: 16px; border: 0; top: -2px; position: relative'>";
            cell += "</span>";
            cell += "&nbsp;<a href=# id=sangujumperOpen><span class='icon ally internal_forum' title='" + trans.sp.jumper.goToMap + "'></span></a>";
            $("#menu_row2").append("<td>" + cell + "</td>");

            $("#sangujumper").keyup(function (e) {
                if (e.which == 13) {
                    $("#sangujumperOpen").click();
                }
            });

            $("#sangujumperOpen").click(function () {
                trackClickEvent("JumperOpen");
                var input = $("#sangujumper");
                if ($("#sanguJumperFrame").is(":visible")) {
                    var village = getVillageFromCoords(input.val(), true);
                    if (village.isValid) {
                        // Jump to coordinates on the map
                        location.href = location.href.substr(0, location.href.indexOf("&screen")) + "&screen=map&x=" + village.x + "&y=" + village.y;
                    } else {
                        // incorrect coordinates
                        if (!$("#sangujumperpos").is(":visible")) {
                            $("#sangujumperpos").show();
                            input.css("border", "1px solid red");
                        } else
                            $("#sangujumperpos").hide();
                    }
                } else {
                    // activate mapJumper
                    var input = $("#sangujumper");
                    if (input.val() == "") {
                        $("#sanguJumperFrame").fadeIn();
                    } else {
                        $("#sanguJumperFrame").show();
                        $("#sangujumperOpen").click();
                    }
                }

                return false;
            });

            if (user_data.jumper.autoShowInputbox) {
                $("#sangujumperOpen").click();
            }
        } catch (e) { handleException(e, "jumper"); }
        //console.timeEnd("jumper");
    }());
}