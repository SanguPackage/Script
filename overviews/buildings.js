(function() {
    //console.time("overview-buildings");
    try {
        // Highlight everything not conform
        overviewTable = $("#buildings_table");
        tableHandler.init("buildings_table");

        var menu = "<table class='vis' width='100%'>";
        menu += "<tr><th>";
        menu += "<input type=checkbox id=buildingOpti> " + trans.sp.buildOverview.optimistic + " ";
        menu += "<input type=button id=buildingHighlight value='" + trans.sp.buildOverview.mark + "'>";
        menu += "<input type=button id=buildingFilter value='" + trans.sp.buildOverview.filter + "'>";
        menu += "</th></tr></table>";
        overviewTable.before(menu);

        function filterBuildings(cellAction, hideRows) {
            var buildings = [];
            overviewTable.find("tr:first img").each(function (i, v) {
                buildings[i] = this.src.substr(this.src.lastIndexOf('/') + 1);
                buildings[i] = buildings[i].substr(0, buildings[i].indexOf('.'));
            });

            var goners = $();
            var opti = $("#buildingOpti").is(":checked");
            overviewTable.find("tr:gt(0)").each(function () {
                var isOk = true;
                $(this).find("td:gt(3)").each(function (i, v) {
                    var range = user_data.buildings[buildings[i]];
                    if (range != undefined) {
                        var text = parseInt($(this).text(), 10);
                        if (text < range[0]) {
                            $(this).css("background-color", user_data.colors.error);
                            isOk = false;
                        } else if (text > range[1] && !opti) {
                            $(this).css("background-color", user_data.colors.good);
                            isOk = false;
                        } else
                            $(this).css("background-color", "");
                    }
                });
                if (hideRows && isOk) {
                    goners = goners.add($(this));
                    $("input:first", $(this)).val("");
                }
            });
            goners.remove();
        }

        $("#buildingHighlight").click(function () {
            trackClickEvent("TableHighlight");
            filterBuildings(function (cell, isOk) {
                cell.css("background-color", isOk ? "" : user_data.colors.neutral);
            }, false);
        });

        $("#buildingFilter").click(function () {
            trackClickEvent("TableRemove");
            filterBuildings(function (cell, isOk) {
                cell.css("background-color", isOk ? "" : user_data.colors.neutral);
            }, true);
        });
    } catch (e) { handleException(e, "overview-buildings"); }
    //console.timeEnd("overview-buildings");
}());