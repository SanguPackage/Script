//<!--@@INCLUDE "greasemonkey\imports.txt" INDENT=0 //-->

// The not-one-file source code can be found at:
// https://github.com/Laoujin/SanguPackage

//<!--@@INCLUDE "greasemonkey/sangu_readyStart.txt" INDENT=0 //-->
	//var start_time = new Date();
	//console.time("SanguPackage");
    var sangu_version = '//<!--@@INCLUDE "version.txt" INDENT=0 //-->',
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
        current_page;



    //<!--@@INCLUDE "config\trans.js" INDENT=1 //-->

	//<!--@@INCLUDE "func\debug.js" INDENT=2 //-->
	//<!--@@INCLUDE "func\!unsorted.js" INDENT=1 //-->
	//<!--@@INCLUDE "func\persistence.js" INDENT=1 //-->
	//<!--@@INCLUDE "func\ui.js" INDENT=1 //-->
	//<!--@@INCLUDE "config\server.js" INDENT=1 //-->
    //<!--@@INCLUDE "global\activator.js" INDENT=1 //-->

    // User config
    //<!--@@INCLUDE "config\settings.js" INDENT=1 //-->
    
    if (isSanguActive) {
		//<!--@@INCLUDE "config\world_config.js" INDENT=2 //-->
        //<!--@@INCLUDE "config\worlds.js" INDENT=2 //-->

        //<!--@@INCLUDE "func\number.js" INDENT=2 //-->
        //<!--@@INCLUDE "func\datetime.js" INDENT=2 //-->
		//<!--@@INCLUDE "func\tw_buildings.js" INDENT=2 //-->
		
		//<!--@@INCLUDE "global\jumper.js" INDENT=2 //-->
		//<!--@@INCLUDE "global\ga.js" INDENT=2 //-->
		
		q("-------------------------------------------------------------------- Start: "+sangu_version);

        // BEGIN PAGE PROCESSING
		// MAIN VILLAGE OVERVIEW 
        if (location.href.indexOf('screen=overview') > -1 && location.href.indexOf('screen=overview_villages') === -1) {
            (function() {
                /**
                 * The slowest unit in the village in the form unit_spear
                 */
                var slowest_unit = null;

                //<!--@@INCLUDE "page\overview_mainvillage\supportingunits.js" INDENT=4 //-->
                //<!--@@INCLUDE "page\overview_mainvillage\tagger.js" INDENT=4 //-->
            })();
        }
		
		// MAP
        else if (location.href.indexOf("screen=map") > -1) {
            //<!--@@INCLUDE "page\map\dodge_fromMainTagger.js" INDENT=3 //-->
        }
		// REPORT PUBLISH
        else if (location.href.indexOf('screen=report') > -1 && location.href.indexOf('mode=publish') > -1) {
            //<!--@@INCLUDE "page\report.js" INDENT=3 //-->
        }
		// MAIN
        else if (location.href.indexOf('screen=main') > -1) {
			//<!--@@INCLUDE "page\main_construction\main.js" INDENT=3 //-->
            //<!--@@INCLUDE "page\main_construction\renamevillage.js" INDENT=3 //-->
            //<!--@@INCLUDE "page\main_construction\loyalty.js" INDENT=3 //-->
        }
		// SNOB
        else if (location.href.indexOf('screen=snob') > -1 && location.href.indexOf('mode=reserve') == -1) {
            //<!--@@INCLUDE "page\snob.js" INDENT=3 //-->
        }
		// COMMAND INFO
        else if (location.href.indexOf('screen=info_command') > -1) {
            //<!--@@INCLUDE "page\info_command\info_command.js" INDENT=3 //-->
        }
		// USERPROFIEL++ // INFO_ ALLY/PLAYER
        else if ((location.href.indexOf('screen=info_') > -1 && location.href.indexOf('screen=info_member') == -1) || location.href.indexOf('screen=ally&mode=profile') > -1) {
			//<!--@@INCLUDE "page\info_villageplayertribe.js" INDENT=3 //-->
        }
		// MARKET
        else if (location.href.indexOf('screen=market') > -1) {
            //<!--@@INCLUDE "page\market.js" INDENT=3 //-->
        }
		
		
		
		
		// SETTINGS
        else if (location.href.indexOf('screen=settings') > -1) {
            // Add sangu to the menu
            //<!--@@INCLUDE "page\settings\sangu\menuinject.js" INDENT=3 //-->

            if (location.href.indexOf('mode=vacation') > -1) {
                // VACATION MODE
                //<!--@@INCLUDE "page\settings\vacationmode.js" INDENT=4 //-->
            }
            else if (location.href.indexOf('mode=logins') > -1) {
                // LAST 20 LOGINS
                //<!--@@INCLUDE "page\settings\logins.js" INDENT=4 //-->
            }
			else if (location.href.indexOf('mode=quickbar_edit') > -1) {
				// EDIT/ADD TO QUICKBAR
				//<!--@@INCLUDE "page\settings\quickbar.js" INDENT=4 //-->
			}
            else if (location.href.indexOf('mode=sangu') > -1) {
				// SANGU SCREEN
                //<!--@@INCLUDE "page\settings\sangu\propui.js" INDENT=4 //-->
                //<!--@@INCLUDE "page\settings\sangu\sangu_trans.js" INDENT=4 //-->
                //<!--@@INCLUDE "page\settings\sangu\sangu_config.js" INDENT=4 //-->
				//<!--@@INCLUDE "page\settings\sangu\inject.js" INDENT=4 //-->
            }
        }
		
		
		
		// ALL OVERVIEW PAGES
        else if (location.href.indexOf('screen=overview_villages') > -1) {
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
				current_page = "overviews\\incomings";
                //<!--@@INCLUDE "overviews\incomings.js" INDENT=4 //-->
            }
			
			//<!--@@INCLUDE "overviews\allpages.js" INDENT=3 //-->
        }







		// RALLYPOINT PLACE
        else if (location.href.indexOf('screen=place') > -1) {
			// RALLYPOINT CONFIRM
			if ($("#attack_name").size() > 0) {
				//<!--@@INCLUDE "page\place\confirm.js" INDENT=3 //-->
			}
			// RALLYPOINT UNITS THERE
			else if (location.href.indexOf('mode=units') > -1 && location.href.indexOf('try=back') == -1) {
				//<!--@@INCLUDE "page\place\units_back.js" INDENT=3 //-->
			}
			// RALLY POINT (DEFAULT)
			else {
				//<!--@@INCLUDE "page\place\place.js" INDENT=3 //-->
			}
        }

		$("#footer_left").append(" - <a target='_top' href='"+getUrlString("screen=settings&mode=sangu")+"'>Sangu Package</a>");
		
        //<!--@@INCLUDE "global\resourcecoloring.js" INDENT=2 //-->
		//<!--@@INCLUDE "global\incomingsindicator.js" INDENT=2 //-->
		//<!--@@INCLUDE "global\friends.js" INDENT=2 //-->
		
		//var end_time = new Date();
		//console.timeEnd("SanguPackage");
		//q("" + pad(Math.abs(start_time.getTime() - end_time.getTime()), 3) + " -> " + location.search);
    }
//<!--@@INCLUDE "greasemonkey/sangu_readyEnd.txt" INDENT=0 //-->

//<!--@@INCLUDE "greasemonkey\inject.js" INDENT=0 //-->