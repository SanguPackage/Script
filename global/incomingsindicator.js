// adjust links to incoming attacks/support
// keep track of current amount of incomings
if (user_data.global.incomings.editLinks || user_data.global.incomings.track) {
    (function() {
        //console.time("incomingsindicator");
        try {
            var incoming = $("table.box:last"),
                incomingAttacksLinks = $("a[href*='subtype=attacks']", incoming),
                variableReplacer = function (text) {
                    var difference = "";
                    if (sinceLastCheckTimeNew > 0) {
                        difference += "+" + sinceLastCheckTimeNew;
                        if (sinceLastCheckTimeArrived > 0) {
                            difference += " ";
                        }
                    }
                    if (sinceLastCheckTimeArrived > 0) {
                        difference += "-" + sinceLastCheckTimeArrived;
                    }

                    return text.replace("{difference}", difference)
                        .replace("{elapsed}", lastCheckTimeElapsed)
                        .replace("{time}", lastCheckTime)
                        .replace("{current}", currentAmountOfIncomings
                        .replace("{saved}", lastKnownAmountOfIncomings));
                };

            if (incomingAttacksLinks.size() > 0) {
                if (user_data.global.incomings.editLinks) {
                    incomingAttacksLinks.attr("href", incomingAttacksLinks.attr("href") + "&page=-1&group=0");
                }
                if (user_data.global.incomings.track) {
                    incomingAttacksLinks.parent().css("white-space", "nowrap");

                    // Split current and new attacks in incomings link
                    var incomingAttacksAmountLink = incomingAttacksLinks.last();
                    var currentAmountOfIncomings = incomingAttacksAmountLink.text().match(/\d+/)[0];
                    var lastKnownAmountOfIncomings = parseInt(pers.get("lastKnownAmountOfIncomings" + game_data.player.sitter), 10) || 0,
                        sinceLastCheckTimeNew = parseInt(pers.get("lastKnownAmountOfIncomingsAdded" + game_data.player.sitter), 10) || 0,
                        sinceLastCheckTimeArrived = parseInt(pers.get("lastKnownAmountOfIncomingsRemoved" + game_data.player.sitter), 10) || 0;

                    var lastCheckTime = pers.get("lastKnownAmountOfIncomingsTime" + game_data.player.sitter);
                    var lastCheckTimeElapsed;
                    if (!lastCheckTime) {
                        lastCheckTime = trans.sp.incomings.indicator.lastTimeCheckNotYetSet;
                        lastCheckTimeElapsed = lastCheckTime;
                    } else {
                        lastCheckTime = new Date().getTime() - parseInt(lastCheckTime, 10);
                        lastCheckTimeElapsed = prettyDate(lastCheckTime);
                        lastCheckTime = twDateFormat(new Date(lastCheckTime));
                    }

                    if (currentAmountOfIncomings != lastKnownAmountOfIncomings || sinceLastCheckTimeNew > 0 || sinceLastCheckTimeArrived > 0) {
                        var newAttacks = currentAmountOfIncomings - lastKnownAmountOfIncomings;
                        if (newAttacks > 0) {
                            sinceLastCheckTimeNew += newAttacks;
                            pers.set("lastKnownAmountOfIncomingsAdded" + game_data.player.sitter, sinceLastCheckTimeNew);

                        } else if (newAttacks < 0) {
                            sinceLastCheckTimeArrived -= newAttacks;
                            pers.set("lastKnownAmountOfIncomingsRemoved" + game_data.player.sitter, sinceLastCheckTimeArrived);
                        }

                        pers.set("lastKnownAmountOfIncomings" + game_data.player.sitter, currentAmountOfIncomings);

                        $("#incomings_amount").html(variableReplacer(user_data.global.incomings.indicator));
                        incomingAttacksLinks.attr("title", variableReplacer(user_data.global.incomings.lastTimeCheckWarning));
                        incomingAttacksLinks.fadeOut("slow").fadeIn("slow");
                    }

                    // extra image to set the lastCheckTime on incomings overview page
                    if (current_page.screen === "overview_villages" && current_page.mode === "incomings") {
                        // Tooltip for first time users
                        if (lastCheckTime == trans.sp.incomings.indicator.lastTimeCheckNotYetSet) {
                            // show info tooltip
                            var position = incomingAttacksAmountLink.position();
                            var options = {
                                left: position.left - 200,
                                top: position.top + 35,
                                width: 250
                            };
                            var content = {body: trans.sp.incomings.indicator.lastTimeCheckHintBoxTooltip.replace("{img}", "<img src='graphic/ally_forum.png'>")};
                            createFixedTooltip("incomingsIndicatorHelp", content, options);
                        }

                        // change last incomings-check time
                        incomingAttacksLinks.last().parent().after(
                            "<td class='box-item' id='changeLastCheckTimeBox' style='white-space: nowrap'><a href='#' id='changeLastCheckTime'>&nbsp;"
                                + "<img src='graphic/ally_forum.png' style='padding-top: 5px' "
                                + "title='"+variableReplacer(user_data.global.incomings.indicatorTooltip)+"'/>&nbsp;</a></td>");

                        // Set last incomings-check time
                        $("#changeLastCheckTime").click(function() {
                            var newCheckTime = new Date();
                            pers.set("lastKnownAmountOfIncomingsTime" + game_data.player.sitter, newCheckTime.getTime());
                            pers.set("lastKnownAmountOfIncomings" + game_data.player.sitter, currentAmountOfIncomings);
                            pers.set("lastKnownAmountOfIncomingsAdded" + game_data.player.sitter, 0);
                            pers.set("lastKnownAmountOfIncomingsRemoved" + game_data.player.sitter, 0);

                            pers.setGlobal("fixedToolTip_incomingsIndicatorHelp", 1);
                            $("#changeLastCheckTimeBox").fadeOut();
                            window.location.href = window.location.href;
                        });
                    }
                }
            } else {
                // When there are no more incomings, stop tracking
                if (user_data.global.incomings.track) {
                    pers.set("lastKnownAmountOfIncomings" + game_data.player.sitter, 0);
                    pers.set("lastKnownAmountOfIncomingsAdded" + game_data.player.sitter, 0);
                    pers.set("lastKnownAmountOfIncomingsRemoved" + game_data.player.sitter, 0);
                }
            }

            // change incoming support link
            if (user_data.global.incomings.editLinks) {
                var incomingSupport = $("a[href*='subtype=supports']", incoming);
                if (incomingSupport.size() > 0) {
                    if (user_data.global.incomings.editLinks) {
                        incomingSupport.attr("href", incomingSupport.attr("href") + "&page=-1&group=0");
                    }
                }
            }
        } catch (e) { handleException(e, "incomingsindicator"); }
        //console.time("incomingsindicator");
    }());
}