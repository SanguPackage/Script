/**
 * Sets the correct rowcount in the first header cell
 */
function setTotalCount() {
    $("th:first", overviewTable).text(
        trans.sp.defOverview.totalVillages.replace(
            "{0}",
            $("tr.units_away", overviewTable).size()));
}

