(function() {
    //console.time("overview-incomings");
    try {
        overviewTable = $("#incomings_table");
        tableHandler.init("incomings_table", {
            hasBottomTotalRow: true
        });

        //<!--@@INCLUDE "overviews\incomings\menu.js" INDENT=6 //-->
        //<!--@@INCLUDE "overviews\incomings\support_import.js" INDENT=6 //-->

        function getVillageRows() {
            return overviewTable.find("tr:gt(0)").not("tr:last");
        }

        //<!--@@INCLUDE "overviews\incomings\sorters.js" INDENT=6 //-->
        //<!--@@INCLUDE "overviews\incomings\filters.js" INDENT=6 //-->


    } catch (e) { handleException(e, "overview-incomings"); }
    //console.timeEnd("overview-incomings");
}());