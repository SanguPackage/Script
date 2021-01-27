overviewTable = $("#incomings_table");
tableHandler.init("incomings_table", {
    hasBottomTotalRow: getQueryStringParam("subtype") !== "supports"
});

var table = {
    /**
     * Quick sort adds extra rows with the .total class
     */
    hasTotalRows: false,
    /**
     * Some buttons add extra columns
     */
    newColumns: {
        before: 0,
        after: 0
    },
    getColspan: function() {
        return 7 + this.newColumns.before + this.newColumns.after;
    },
    /**
     * Remove the total rows so that other filters can operate again
     */
    fixTable: function() {
        if (this.hasTotalRows === true) {
            overviewTable.find("tr.total").remove();
            this.hasTotalRows = false;
        }
    },
    getVillageRows: function() {
        var rows = overviewTable.find("tr:gt(0)");
        if (tableHandler.settings.hasBottomTotalRow) {
            rows = rows.not("tr:last");
        }
        return rows;
    },
    /**
     * Set the table total rows count correctly
     * @param {number} rowCount
     * @param {number} [villagesTargeted]
     */
    setTotals: function(rowCount, villagesTargeted) {
        var amountOfCommandsHeaderCell = $("tr:first", overviewTable).find("th:first"),
            amountOfRows = $("#amountOfRows");

        assert(amountOfCommandsHeaderCell.length === 1, "couldn't find the command headercell");
        amountOfCommandsHeaderCell.html(amountOfCommandsHeaderCell.html().replace(/\(\d+\)/, "(" + rowCount + ")"));

        if (typeof villagesTargeted !== "undefined") {
            if (amountOfRows.length === 0) {
                var pageSize = $("input[name='page_size']");
                pageSize.parent().prev().text(trans.sp.commands.totalVillagesAttack);
                pageSize = pageSize.attr("id", "villagesTargeted").parent().parent().parent();
                pageSize.append('<tr><th colspan=2>' + trans.sp.incomings.amount + '</th><td id="amountOfRows">' + rowCount + '</td></tr>');
            } else {
                $("#amountOfRows").text(villagesTargeted);
                $("#villagesTargeted").val(villagesTargeted);
            }
        }
    }
};
