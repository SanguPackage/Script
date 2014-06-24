// adjust links to incoming attacks/support
// keep track of current amount of incomings
if (user_data.global.incomings.editLinks || user_data.global.incomings.track) {
    (function() {
        //console.time("incomingsindicator");
        try {
            var incoming = $("table.box:last"),
                incomingAttacksLinks = $("a[href*='subtype=attacks']", incoming),
                variableReplacer = function (text) {
                    return text.replace("{difference}", newAttacks)
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
                    var lastKnownAmountOfIncomings = pers.get("lastKnownAmountOfIncomings" + game_data.player.sitter) || 0;

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

                    if (currentAmountOfIncomings != lastKnownAmountOfIncomings) {
                        var newAttacks = currentAmountOfIncomings - lastKnownAmountOfIncomings;
                        if (newAttacks >= 0) {
                            newAttacks = "+" + newAttacks;
                            incomingAttacksLinks.attr("title", variableReplacer(user_data.global.incomings.lastTimeCheckWarningMore));
                        } else {
                            incomingAttacksLinks.attr("title", variableReplacer(user_data.global.incomings.lastTimeCheckWarningLess));
                        }

                        $("#incomings_amount").html(variableReplacer(user_data.global.incomings.indicator));
                        incomingAttacksLinks.fadeOut("slow").fadeIn("slow");
                    }

                    // Set last incomings-check time
                    if (current_page.screen === "overview_villages" && current_page.mode === "incomings") {
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

                        $("#changeLastCheckTime").click(function() {
                            var newCheckTime = new Date();
                            pers.set("lastKnownAmountOfIncomingsTime" + game_data.player.sitter, newCheckTime.getTime());
                            pers.set("lastKnownAmountOfIncomings" + game_data.player.sitter, currentAmountOfIncomings);

                            pers.setGlobal("fixedToolTip_incomingsIndicatorHelp", 1);
                            $("#changeLastCheckTimeBox").fadeOut();
                            window.location.href = window.location.href;
                        });
                    }
                }
            } else {
                if (user_data.global.incomings.track) {
                    pers.set("lastKnownAmountOfIncomings" + game_data.player.sitter, 0);
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