(function() {
    //console.time("overview-supportdetail");
    try {
        overviewTable = $("#units_table");
        tableHandler.init("units_table", {
            hasBottomTotalRow: true
        });

        /**
         * true: we're on the support_detail page. false: away_detail page
         * @type {boolean}
         */
        var isSupport = location.href.indexOf('type=support_detail') > -1;

        //<!--@@INCLUDE "overviews\units_support_detail\common.js" INDENT=6 //-->

        //<!--@@INCLUDE "overviews\units_support_detail\menu.js" INDENT=6 //-->
        //<!--@@INCLUDE "overviews\units_support_detail\filter_own_villages.js" INDENT=6 //-->
        //<!--@@INCLUDE "overviews\units_support_detail\bbcodes.js" INDENT=6 //-->
        //<!--@@INCLUDE "overviews\units_support_detail\other_features.js" INDENT=6 //-->
        //<!--@@INCLUDE "overviews\units_support_detail\filter_supporting_villages.js" INDENT=6 //-->

    } catch (e) { handleException(e, "overview-supportdetail"); }
    //console.timeEnd("overview-supportdetail");
}());