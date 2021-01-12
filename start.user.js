//<!--@@INCLUDE "greasemonkey\imports.txt" INDENT=0 //-->

// The not-one-file source code can be found at:
// https://github.com/SanguPackage/Script

//<!--@@INCLUDE "greasemonkey/sangu_readyStart.txt" INDENT=0 //-->
	//var start_time = new Date();
	//console.time("SanguPackage");
    var /**
         * When game_data.majorVersion is different from Sangu version then activate sangu 'compatibility' mode (gray icon)
         */
        sangu_version = '//<!--@@INCLUDE "version.txt" INDENT=0 //-->',
        /**
         * true: popup with crash dump, false: don't show the popup
         */
        sangu_crash = sangu_version.split(".").length === 4,
        /**
         * jQuery element of the cell (td) that contains all page specific widgets
         */
        content_value = $("#content_value"),
        /**
         * config/ Configuration per server (nl, de). Contains stuff like ajaxAllowed, etc
         */
            server_settings = {},
        /**
         * config/ Contains all translations except for the setting related translations in sangu_trans
         */
        trans = {},
        /**
         * config/ Contains all user settings
         */
        user_data = {},
        /**
         * config/ The current world configuration. settings like hasArchers, nightbonus, etc
         */
         world_config = {},
        /**
         * config/ Contains all data for this world (resources, units, buildings, units_off, unitsSize, ...)
         * What's in this variable depends on world_config.
         * This variable is a complete and utter mess :)
         */
        world_data = {},
        /**
         * Identifies the current page based on the querystring
         */
        current_page = {
            screen: game_data.screen,
            mode: game_data.mode
        },
        keyCodeMap = {
            8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pausebreak", 20: "capslock", 27: "escape", 32: " ",
            33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "arrow left", 38: "arrow up", 39: "arrow right", 40: "arrow down", 43: "+",
            44: "printscreen", 45: "insert", 46: "delete", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9",
            59: ";", 61: "=", 65: "a",  66: "b", 67: "c", 68: "d", 69: "e", 70: "f", 71: "g", 72: "h", 73: "i", 74: "j", 75: "k", 76: "l", 77: "m",
            78: "n", 79: "o", 80: "p", 81: "q", 82: "r", 83: "s", 84: "t", 85: "u", 86: "v", 87: "w", 88: "x", 89: "y", 90: "z", 96: "0", 97: "1",
            98: "2", 99: "3", 100: "4", 101: "5",  102: "6", 103: "7", 104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 112: "f1",
            113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6",  118: "f7", 119: "f8", 120: "f9",  121: "f10", 122: "f11", 123: "f12", 144: "numlock",
            145: "scrolllock", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"
        };

    //<!--@@INCLUDE "config\server_settings.js" INDENT=1 //-->
    //<!--@@INCLUDE "config\trans.js" INDENT=1 //-->

	//<!--@@INCLUDE "func\debug.js" INDENT=2 //-->
	//<!--@@INCLUDE "func\!unsorted.js" INDENT=1 //-->
	//<!--@@INCLUDE "func\persistence.js" INDENT=1 //-->
	//<!--@@INCLUDE "func\ui.js" INDENT=1 //-->

    //<!--@@INCLUDE "global\activator.js" INDENT=1 //-->

    // User config
    //<!--@@INCLUDE "config\user_data.js" INDENT=1 //-->

    if (isSanguActive) {
		//<!--@@INCLUDE "config\world_config.js" INDENT=2 //-->
        //<!--@@INCLUDE "config\world_data.js" INDENT=2 //-->

        //<!--@@INCLUDE "func\number.js" INDENT=2 //-->
        //<!--@@INCLUDE "func\datetime.js" INDENT=2 //-->
		//<!--@@INCLUDE "func\tw_buildings.js" INDENT=2 //-->

		//<!--@@INCLUDE "global\jumper.js" INDENT=2 //-->
		//<!--@@INCLUDE "global\ga.js" INDENT=2 //-->

		q("-------------------------------------------------------------------- Start: "+sangu_version);

        // BEGIN PAGE PROCESSING
        switch (current_page.screen) {
            case "overview":
                // MAIN VILLAGE OVERVIEW
                (function() {
                    /**
                     * The slowest unit in the village in the form unit_spear
                     */
                    var slowest_unit = null;

                    //<!--@@INCLUDE "page\overview_mainvillage\supportingunits.js" INDENT=4 //-->
                    //<!--@@INCLUDE "page\overview_mainvillage\tagger.js" INDENT=4 //-->
                    //<!--@@INCLUDE "page\overview_mainvillage\layout.js" INDENT=4 //-->
                }());
                break;

            case "map":
                //<!--@@INCLUDE "page\map\dodge_fromMainTagger.js" INDENT=3 //-->
                break;

            case "report":
                if (current_page.mode === 'publish') {
                    //<!--@@INCLUDE "page\report.js" INDENT=3 //-->
                }
                break;

            case "main":
                //<!--@@INCLUDE "page\main_construction\main.js" INDENT=3 //-->
                //<!--@@INCLUDE "page\main_construction\renamevillage.js" INDENT=3 //-->
                //<!--@@INCLUDE "page\main_construction\loyalty.js" INDENT=3 //-->
                break;

            case "snob":
                if (current_page.mode === "train" || current_page.mode === null || current_page.mode === "produce") {
                    //<!--@@INCLUDE "page\snob.js" INDENT=3 //-->
                }
                break;

            case "info_command":
                //<!--@@INCLUDE "page\info_command\info_command.js" INDENT=3 //-->
                break;

            case "market":
                //<!--@@INCLUDE "page\market.js" INDENT=3 //-->
                break;

            case "settings":
                // Add sangu to the menu
                //<!--@@INCLUDE "page\settings\sangu\menuinject.js" INDENT=3 //-->

                switch (current_page.mode) {
                    case "vacation":
                        //<!--@@INCLUDE "page\settings\vacationmode.js" INDENT=4 //-->
                        break;

                    case "quickbar_edit":
                        //<!--@@INCLUDE "page\settings\quickbar.js" INDENT=4 //-->
                        break;
                }

                // SANGU SETTING EDITOR
                if (location.href.indexOf('mode=sangu') > -1) {
                    //<!--@@INCLUDE "page\settings\sangu\propui.js" INDENT=4 //-->
                    //<!--@@INCLUDE "page\settings\sangu\sangu_trans.js" INDENT=4 //-->
                    //<!--@@INCLUDE "page\settings\sangu\sangu_config.js" INDENT=4 //-->
                    //<!--@@INCLUDE "page\settings\sangu\inject.js" INDENT=4 //-->
                }
                break;

            case "place":
                /**
                 * {spVillage} The current village
                 */
                var vilHome = getVillageFromCoords(game_data.village.coord);
                if ($("#attack_name").length > 0) {
                    // RALLYPOINT CONFIRM
                    //<!--@@INCLUDE "page\place\confirm.js" INDENT=3 //-->
                }
                // RALLYPOINT UNITS THERE
                else if (current_page.mode === 'units' && location.href.indexOf('try=back') == -1) {
                    //<!--@@INCLUDE "page\place\units_back.js" INDENT=3 //-->
                }
                // RALLY POINT (DEFAULT)
                else {
                    //<!--@@INCLUDE "page\place\place.js" INDENT=3 //-->
                }
                break;

            case "overview_villages":
                break;
        }

		// USERPROFIEL++ // INFO_ ALLY/PLAYER
        if ((current_page.screen === 'info_ally' || current_page.screen === 'info_player' || current_page.screen === 'info_village')
            || (current_page.screen === "ally" && current_page.mode === "profile")) {

			//<!--@@INCLUDE "page\info_villageplayertribe.js" INDENT=3 //-->
        }
		if (current_page.screen === 'info_village') {
			//<!--@@INCLUDE "page\info_village.js" INDENT=3 //-->
		}

		// ALL OVERVIEW PAGES
        if (current_page.screen === 'overview_villages') {
			var overviewTable;
			//<!--@@INCLUDE "overviews\allpages_tables.js" INDENT=3 //-->

			// PRODUCTION OVERVIEW
            if (location.href.indexOf('mode=prod') > -1) {
				//<!--@@INCLUDE "overviews\production.js" INDENT=4 //-->
            }
			// TROOPS OVERVIEW
            else if (location.href.indexOf('mode=units') > -1
						&& (location.href.indexOf('type=own_home') > -1 || location.href.indexOf('type=there') > -1)) {
                //<!--@@INCLUDE "overviews\units_there_ownhome\loader.js" INDENT=4 //-->
            }
			// BUILDINGS OVERVIEW
            else if (location.href.indexOf('mode=buildings') > -1) {
                //<!--@@INCLUDE "overviews\buildings.js" INDENT=4 //-->
            }
			// TECHS OVERVIEW // SMEDERIJ OVERVIEW // SMITHY OVERVIEW
            else if (location.href.indexOf('mode=tech') > -1) {
                //<!--@@INCLUDE "overviews\techs.js" INDENT=4 //-->
            }
			// GROUPS OVERVIEW
            else if (location.href.indexOf('mode=groups') > -1) {
                //<!--@@INCLUDE "overviews\groups.js" INDENT=4 //-->
            }
            // SUPPORT OVERVIEW
            else if (location.href.indexOf('type=support_detail') > -1
                || location.href.indexOf('type=away_detail') > -1) {

                //<!--@@INCLUDE "overviews\units_support_detail/loader.js" INDENT=4 //-->
            }
			// COMMANDS OVERVIEW
            else if (location.href.indexOf('mode=commands') > -1) {
                //<!--@@INCLUDE "overviews\commands.js" INDENT=4 //-->
            }
			// INCOMINGS OVERVIEW
            else if (location.href.indexOf('mode=incomings') > -1) {
                //<!--@@INCLUDE "overviews\incomings\loader.js" INDENT=4 //-->
            }

			//<!--@@INCLUDE "overviews\allpages.js" INDENT=3 //-->
        }

		var logoffLink = $("#linkContainer a:last");
        if (user_data.global.duplicateLogoffLink) {
            $("#linkContainer a:first").after(" - ").after(logoffLink.clone());
        }

        logoffLink.before(" - <a target='_blank' title='"+trans.sp.sp.moreScriptsTooltip+"' href='"+server_settings.scriptsDatabaseUrl+"'>"+trans.sp.sp.moreScripts+"</a>")
            .before(" - <a target='_top' id='sanguPackageEditSettingsLink' href='"+getUrlString("screen=settings&mode=sangu")+"' title='" + trans.sp.sp.sanguLinkTitle + "'>Sangu Package</a> - ");

        (function() {
            var position = $("#sanguPackageEditSettingsLink").position(),
                options = {
                    left: position.left,
                    top: ($(window).height() - 100)
                },
                content = {
                    body: trans.sp.sp.firstTimeRunEditSettings
                };

            createFixedTooltip("sanguActivatorSettingsTooltip", content, options);
        }());

        //<!--@@INCLUDE "global\resourcecoloring.js" INDENT=2 //-->
		//<!--@@INCLUDE "global\incomingsindicator.js" INDENT=2 //-->
		//<!--@@INCLUDE "global\friends.js" INDENT=2 //-->

		//var end_time = new Date();
		//console.timeEnd("SanguPackage");
		//q("" + pad(Math.abs(start_time.getTime() - end_time.getTime()), 3) + " -> " + location.search);
    }
//<!--@@INCLUDE "greasemonkey/sangu_readyEnd.txt" INDENT=0 //-->

if (location.href.indexOf('sangu.be') !== -1) {
    // sangu.be
    //<!--@@INCLUDE "page\sangube.js" INDENT=0 //-->

} else if (location.href.indexOf('tribalwars.nl') !== -1) {
    // TribalWars page
    //<!--@@INCLUDE "greasemonkey\inject.js" INDENT=0 //-->
}



