//<!--@@INCLUDE "greasemonkey\imports.txt" INDENT=0 //-->

// The not-one-file source code can be found at:
// https://github.com/Laoujin/SanguPackage

//<!--@@INCLUDE "greasemonkey/sangu_readyStart.txt" INDENT=0 //-->
	//var start_time = new Date();
	//console.time("SanguPackage");
    var sangu_version = '//<!--@@INCLUDE "version.txt" INDENT=0 //-->',
        /**
         * Set to false to log errors to the console (true: popup with crash dump)
         */
        sangu_crash = true,
        /**
         * jQuery element of the cell (td) that contains all page specific widgets
         */
        content_value = $("#content_value"),
        /**
         * Contains all translations except for the setting related translations in sangu_trans
         */
        trans = {},
        /**
         * Contains all user settings
         */
        user_data = {},
        /**
         * Contains all data for this world (like hasArchers, nightbonus, etc)
         */
        world_data = {},
        /**
         * Identifies the current page based on the querystring
         */
        current_page = {
            screen: game_data.screen,
            mode: game_data.mode
        };

    //<!--@@INCLUDE "config\trans.js" INDENT=1 //-->

	//<!--@@INCLUDE "func\debug.js" INDENT=2 //-->
	//<!--@@INCLUDE "func\!unsorted.js" INDENT=1 //-->
	//<!--@@INCLUDE "func\persistence.js" INDENT=1 //-->
	//<!--@@INCLUDE "func\ui.js" INDENT=1 //-->
	//<!--@@INCLUDE "config\server_settings.js" INDENT=1 //-->
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
                if (current_page.mode === "reserve") {
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
                // RALLYPOINT CONFIRM
                if ($("#attack_name").size() > 0) {
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
        if ((current_page.screen.indexOf('info_') === 0 && current_page.screen.indexOf('info_member') === -1)
            || (current_page.screen === "ally" && current_page.mode === "profile")) {

			//<!--@@INCLUDE "page\info_villageplayertribe.js" INDENT=3 //-->
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
                //<!--@@INCLUDE "overviews\units_there_ownhome.js" INDENT=4 //-->
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

                //<!--@@INCLUDE "overviews\units_support_detail.js" INDENT=4 //-->
            }
			// COMMANDS OVERVIEW
            else if (location.href.indexOf('mode=commands') > -1) {
                //<!--@@INCLUDE "overviews\commands.js" INDENT=4 //-->
            }
			// INCOMINGS OVERVIEW
            else if (location.href.indexOf('mode=incomings') > -1) {
                //<!--@@INCLUDE "overviews\incomings.js" INDENT=4 //-->
            }
			
			//<!--@@INCLUDE "overviews\allpages.js" INDENT=3 //-->
        }

		$("#footer_left").append(" - <a target='_top' id='sanguPackageEditSettingsLink' href='"+getUrlString("screen=settings&mode=sangu")+"'>Sangu Package</a>");

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

//<!--@@INCLUDE "greasemonkey\inject.js" INDENT=0 //-->