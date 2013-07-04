(function() {
    try {
        if (location.href.indexOf('try=confirm_send') > -1) {
            if (user_data.proStyle && user_data.market.autoFocus) {
                $("input[type='submit']").focus();
            }
        }
        else if (location.href.indexOf('&mode=') == -1 || location.href.indexOf('&mode=send') > -1) {
            if (location.href.indexOf('try=confirm_send') == -1) {
                // Spice up market:
                // 120 x 106 pixels: There are market images that are smaller
                // Making all images equally large results in the OK button remaining on the same place
                if (user_data.proStyle && user_data.market.resizeImage) {
                    $("img[src*='big_buildings/market']").width(120).height(106);
                }

                // New last village:
                $("input[type='submit']").click(function () {
                    var village = getVillageFromCoords($("#inputx").val() + "|" + $("#inputy").val());
                    if (village.isValid) {
                        pers.set("lastVil", village.coord);
                    }
                });

                // Add last & target
                var vilHome = getVillageFromCoords(game_data.village.coord);

                var targetLocation = $("#inputx").parent().parent().parent();
                var cookie = pers.get("lastVil");
                var coord = getVillageFromCoords(cookie);
                var htmlStr = '';
                if (coord.isValid) {
                    var dist = getDistance(coord.x, vilHome.x, coord.y, vilHome.y, 'merchant');
                    htmlStr = printCoord(coord, "&raquo; " + trans.sp.all.last + ": " + coord.x + "|" + coord.y);
                    htmlStr += "&nbsp; <span id=lastVilTime>" + dist.html + "</span>";
                }

                // Add target village
                var target = getVillageFromCoords(spTargetVillageCookie());
                if (target.isValid) {
                    var dist = getDistance(target.x, vilHome.x, target.y, vilHome.y, 'merchant');
                    if (htmlStr.length > 0) {
                        htmlStr += "<br>";
                    }
                    htmlStr += printCoord(target, "&raquo; " + trans.sp.all.target + ": " + target.x + "|" + target.y) + " &nbsp;<span id=targetVilTime>" + dist.html + "</span>";
                }

                if (htmlStr.length > 0) {
                    targetLocation.append("<tr><td colspan=2>" + htmlStr + "</td></tr>");
                }

                // Calculate total resources sent
                var table = $("table.vis:last");
                if (table.prev().text() == trans.tw.market.incomingTransports) {
                    var sent = { stone: 0, wood: 0, iron: 0 };
                    table.find("tr:gt(0)").each(function () {
                        var cell = $(this).find("td:eq(1)");
                        var resources = $.trim(cell.text().replace(/\./g, "").replace(/\s+/g, " ")).split(" ");

                        for (var i = 0; i < resources.length; i++) {
                            if (resources[i]) {
                                var restype = cell.find("span.icon:eq(" + i + ")");
                                for (var resIndex = 0; resIndex < world_data.resources_en.length; resIndex++) {
                                    if (restype.hasClass(world_data.resources_en[resIndex])) {
                                        sent[world_data.resources_en[resIndex]] += parseInt(resources[i], 10);
                                    }
                                }
                            }
                        }
                    });

                    table.append("<tr><th>" + trans.sp.all.total + ":</th><td colspan=3><img src=graphic/holz.png> " + formatNumber(sent.wood) + "&nbsp; <img src=graphic/lehm.png> " + formatNumber(sent.stone) + "&nbsp; <img src=graphic/eisen.png> " + formatNumber(sent.iron) + "</td></tr>");
                }
            }
        }
    } catch (e) { handleException(e, "market"); }
}());