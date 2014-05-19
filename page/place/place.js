(function() {
    //console.time("place-place");
    try {
    // Auto rename attacks
    if (user_data.attackAutoRename.active) {
        // Less than ideal solution:
        // Does not work properly when sending many attacks (ie snobtrain)
        // In confirm.js the cookies are saved

        var hasAttackRenamingCookieNeedle = pers.getWorldKey('attRen_' + game_data.village.id + '_');
        for (var i = 0; i  <  sessionStorage.length; i++) {
            var key = sessionStorage.key(i);
            if (key.indexOf(hasAttackRenamingCookieNeedle) == 0) {
                var twInitialCommandName = key.substr(hasAttackRenamingCookieNeedle.length);
                // ' is an invalid village name character so we don't need to escape
                var commandLabel = $('.quickedit-label:contains("' + twInitialCommandName + '")');
                if (commandLabel.length > 0 && server_settings.ajaxAllowed) {
                    var sanguCommandName = sessionStorage.getItem(key),
                        renameCommand = function() {
                            // Open the rename command form:
                            commandLabel.parent().next().click();

                            // Fill in new command name and click rename button
                            var commandWrapper = commandLabel.parent().parent().parent(),
                                commandForm = commandWrapper.find(".quickedit-edit");

                            commandForm.find("input:first").val(sanguCommandName);
                            commandForm.find("input:last").click();

                            pers.removeSessionItem(key);

                            if (commandLabel.closest("table").find("tr").length > 2) {
                                commandLabel.closest("td").addClass("selected");
                            }
                        };

                    if (typeof InstallTrigger !== 'undefined') {
                        // InstallTrigger = Firefox's API to install add-ons
                        // need to wait a little for FireFox for some reason
                        setTimeout(function() {
                            renameCommand();
                        }, 1000);

                    } else {
                        renameCommand();
                    }
                }
            }
        }
    }

    $("#inputx,#inputy").focus(function() {
        $(this).select();
    });

    // fill in coordinates? (links from troops overview page)
    if (server_settings.autoFillCoordinatesAllowed && window.location.search.indexOf("&sanguX=") != -1) {
        var match = window.location.search.match(/sanguX=(\d+)&sanguY=(\d+)/);
        if (typeof match[1] !== "undefined") {
            $("#inputx").val(match[1]);
            $("#inputy").val(match[2]);
        }
    }

    // Spice up rally point:
    var speedCookie = spSpeedCookie();

    //<!--@@INCLUDE "page\place\activespeed.js" INDENT=0 //-->
    //<!--@@INCLUDE "page\place\lastandtargetvillage.js" INDENT=0 //-->
    //<!--@@INCLUDE "page\place\extratrooplinks.js" INDENT=0 //-->

    } catch (e) { handleException(e, "place-place"); }
    //console.timeEnd("place-place");
}());