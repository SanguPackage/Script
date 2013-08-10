(function() {
    //console.time("overview-thereownhome");
    try {
        var villageCounter = 0;
        var rowSize = world_data.units.length + 1;
        if (world_config.hasMilitia) {
            rowSize++;
        }

        var overviewMenuRowFilter = "tr:gt(0)",
            /**
             * Page speed can be overruled by the querystring
             */
            currentPageSpeed = spSpeedCookie(),
            /**
             * {village} object from target cookie (or by url querystring set)
             */
            target;

        /**
         * Do initial filter? (based on querystring)
         */
        var doFilter = false,
            unitIndex = world_data.units.indexOf(user_data.command.filterMinDefaultType),
            unitAmount = user_data.command.filterMinDefault,
            sort = false,
            changeSpeed = false,
            i;
        //<!--@@INCLUDE "overviews\units_there_ownhome\querystring_filter.js" INDENT=6 //-->

        // Sangu package menu is also built in reinitialize_table
        //<!--@@INCLUDE "overviews\units_there_ownhome\reinitialize_table.js" INDENT=6 //-->

        //<!--@@INCLUDE "overviews\units_there_ownhome\table_actions.js" INDENT=6 //-->
        //<!--@@INCLUDE "overviews\units_there_ownhome\filters.js" INDENT=6 //-->
        //<!--@@INCLUDE "overviews\units_there_ownhome\other_features.js" INDENT=6 //-->
        //<!--@@INCLUDE "overviews\units_there_ownhome\bbcode.js" INDENT=6 //-->

    } catch (e) { handleException(e, "overview-thereownhome"); }
    //console.timeEnd("overview-thereownhome");
}());