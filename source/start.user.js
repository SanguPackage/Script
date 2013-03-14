//<!--@@INCLUDE "\greasemonkey\imports.txt" //-->
function sangu_ready() {
    var sangu_version = "//<!--@@INCLUDE "\version.txt" //-->";

    // User config
    var user_data = {};
    //<!--@@INCLUDE "\config\settings_world.js" INDENT+ //-->
    //<!--@@INCLUDE "\config\settings.js" //-->
    //<!--@@INCLUDE "\config\settings_world2.js" //-->
	
	var trans =
	//<!--@@INCLUDE "\config\trans.js" //-->
	
	//<!--@@INCLUDE "\func\persistence.js" //-->
	//<!--@@INCLUDE "\func\ui.js" //-->
    //<!--@@INCLUDE "\feature\activator.js" //-->
    if (isSanguActive) {
		var world_data = {};
		//<!--@@INCLUDE "\config\server.js" INDENT+ //-->
		//<!--@@INCLUDE "\config\world_config.js" //-->
        //<!--@@INCLUDE "\config\worlds.js" //-->

		//<!--@@INCLUDE "\func\!unsorted.js" //-->
        //<!--@@INCLUDE "\func\number.js" //-->
        //<!--@@INCLUDE "\func\datetime.js" //-->
		//<!--@@INCLUDE "\func\tw_buildings.js" //-->
		
		//<!--@@INCLUDE "\feature\jumper.js" //-->
		
		//<!--@@INCLUDE "\func\debug.js" //-->

        // BEGIN PAGE PROCESSING
		// MAIN VILLAGE OVERVIEW 
        if (location.href.indexOf('screen=overview') > -1 && location.href.indexOf('screen=overview_villages') == -1) {
            var content_value = $("#content_value");
            var slowest_unit = null;

            //<!--@@INCLUDE "\page\overview_mainvillage\supportingunits.js" INDENT+ //-->
			//<!--@@INCLUDE "\page\overview_mainvillage\tagger.js" //-->
        }
		
		// MAP
        else if (location.href.indexOf("screen=map") > -1) {
            //<!--@@INCLUDE "\page\map\dodge_fromMainTagger.js" //-->
        }
		// REPORT PUBLISH
        else if (location.href.indexOf('screen=report') > -1 && location.href.indexOf('mode=publish') > -1) {
            //<!--@@INCLUDE "\page\report.js" //-->
        }
		// MAIN
        else if (location.href.indexOf('screen=main') > -1) {
			//<!--@@INCLUDE "\page\main_construction\main.js" //-->
            //<!--@@INCLUDE "\page\main_construction\renamevillage.js" //-->
            //<!--@@INCLUDE "\page\main_construction\loyalty.js" //-->
        }
		// SNOB
        else if (location.href.indexOf('screen=snob') > -1 && location.href.indexOf('mode=reserve') == -1) {
            //<!--@@INCLUDE "\page\snob.js" //-->
        }
		// COMMAND INFO
        else if (location.href.indexOf('screen=info_command') > -1) {
            //<!--@@INCLUDE "\page\info_command\info_command.js" //-->
        }
		// USERPROFIEL++ // INFO_ ALLY/PLAYER
        else if ((location.href.indexOf('screen=info_') > -1 && location.href.indexOf('screen=info_member') == -1) || location.href.indexOf('screen=ally&mode=profile') > -1) {
			//<!--@@INCLUDE "\page\info_villageplayertribe\info_all.js" //-->
        }
		// TRIBAL WAR STATS
        else if (location.href.indexOf('screen=wars') > -1 && (location.href.indexOf('mode=running') > -1 || location.href.indexOf('mode=') == -1)) {
			// Wars don't really work anymore after changes by Innogames
			// To get the same result, many ajax calls would now be needed
			// Remove space between // and <!-- to include the code again
            // <!--@@INCLUDE "\page\wars.js" //-->
        }
		// MARKET
        else if (location.href.indexOf('screen=market') > -1) {
            //<!--@@INCLUDE "\page\market.js" //-->
        }
		
		
		
		
		// SETTINGS
        else if (location.href.indexOf('screen=settings') > -1) {
            // Add sangu to the menu
            //$("#content_value table.vis:first").append("<tr><td>&nbsp;</td></tr><tr><th><a href='" + getUrlString("screen=settings&mode=sangu") + "'>Sangu</a></th></tr>");

            if (location.href.indexOf('mode=vacation') > -1) {
                // VACATION MODE
                //<!--@@INCLUDE "\page\settings\vacationmode.js" INDENT+ //-->
            }
			else if (location.href.indexOf('mode=quickbar_edit') > -1) {
				// EDIT/ADD TO QUICKBAR
				//<!--@@INCLUDE "\page\settings\quickbar.js" //-->
			}
            else if (location.href.indexOf('mode=sangu') > -1) {
				// SANGU SCREEN
				//<!--@@INCLUDE "\page\settings\sangu.js" //-->
            }
        }
		
		
		
		// ALL OVERVIEW PAGES
        else if (location.href.indexOf('screen=overview_villages') > -1) {
            //<!--@@INCLUDE "\page\overview_villages\allpages_groups.js" //-->

			// PRODUCTION OVERVIEW
            if (location.href.indexOf('mode=prod') > -1) {
                //<!--@@INCLUDE "\page\overview_villages\production.js" //-->
            }
			// TROOPS OVERVIEW
            else if (location.href.indexOf('mode=units') > -1
						&& (location.href.indexOf('type=own_home') > -1 || location.href.indexOf('type=there') > -1)) {
                //<!--@@INCLUDE "\page\overview_villages\units_there_ownhome.js" //-->
            }
			// BUILDINGS OVERVIEW
            else if (location.href.indexOf('mode=buildings') > -1) {
                //<!--@@INCLUDE "\page\overview_villages\buildings.js" //-->
            }
			// TECHS OVERVIEW // SMEDERIJ OVERVIEW // SMITHY OVERVIEW
            else if (location.href.indexOf('mode=tech') > -1) {
                //<!--@@INCLUDE "\page\overview_villages\techs.js" //-->
            }
			// GROUPS OVERVIEW
            else if (location.href.indexOf('mode=groups') > -1) {
                //<!--@@INCLUDE "\page\overview_villages\groups.js" //-->
            }
			 // SUPPORT OVERVIEW
            else if (location.href.indexOf('type=support_detail') > -1 || location.href.indexOf('type=away_detail') > -1) {
                //<!--@@INCLUDE "\page\overview_villages\support_detail.js" //-->
            }
			// COMMANDS OVERVIEW
            else if (location.href.indexOf('mode=commands') > -1) {
                //<!--@@INCLUDE "\page\overview_villages\commands.js" //-->
            }
			// INCOMINGS OVERVIEW
            else if (location.href.indexOf('mode=incomings') > -1) {
                //<!--@@INCLUDE "\page\overview_villages\incomings.js" //-->
            }
        }







		// RALLYPOINT PLACE
        else if (location.href.indexOf('screen=place') > -1) {
			// RALLYPOINT CONFIRM
			if ($("#attack_name").size() > 0) {
				//<!--@@INCLUDE "\page\place\confirm.js" //-->
			}
			// RALLYPOINT UNITS THERE
			else if (location.href.indexOf('mode=units') > -1 && location.href.indexOf('try=back') == -1) {
				//<!--@@INCLUDE "\page\place\units_back.js" //-->
			}
			// RALLY POINT (DEFAULT)
			else {
				//<!--@@INCLUDE "\page\place\place.js" //-->
			}
        }

        //<!--@@INCLUDE "\page\global.js" //-->
    }
};

//<!--@@INCLUDE "\greasemonkey\inject.js" //-->