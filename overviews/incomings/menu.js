var columnsToFilterCount = 5;

// build sangu menu
var menu = "";
menu += "<table width='100%' class='vis' id='sangu_menu'>";
menu += "<tr><th width='1%'>";
menu += "<input type=button id=sortIt value='" + trans.sp.incomings.dynamicGrouping + "' title='" + trans.sp.incomings.dynamicGroupingTooltip + "'>";
menu += "</th><th width='1%' nowrap>";
menu += "<input type=checkbox id=sortShowTotalRow " + (user_data.command.sumRow ? "checked" : "") + "> " + trans.sp.incomings.summation + " ";
menu += "<input type=button id=sortQuick value='" + trans.sp.incomings.fastGrouping + "' title='" + trans.sp.incomings.fastGroupingTooltip + "'>";
menu += "</th><th width='1%'>";

menu += "<input type=button id=sortByAttackId value='" + trans.sp.incomings.sortByAttackId + "' title='" + trans.sp.incomings.sortByAttackIdTooltip + "'>";

menu += "</th><th width='96%'>";
menu += "<input type=button id=filterAttack value='" + trans.sp.incomings.showNewIncomings + "'>";

menu += "</th><th width='1%' nowrap>";
menu += "<input type=button id=commandsImport value='" + trans.sp.incomings.commandsImport + "' title='" + trans.sp.incomings.commandsImportTooltip + "'>";
menu += "</th></tr>";
menu += "</table>";

// second row
menu += "<table width='100%' class=vis>";
menu += "<tr><th width='1%' nowrap>";

menu += "<input type=checkbox id=defReverseFilter title='" + trans.sp.commands.filtersReverse + "'> " + trans.sp.commands.filtersReverseInfo + ": ";
menu += "</th>";

// generate one input field/button filter with a select for the first cells
var defaultColumnFilters = (function() {
    var headerCells = $("tr:first th", overviewTable),
        cols = [],
        headerCellText;

    for (i = 0; i < columnsToFilterCount; i++) {
        headerCellText = headerCells.eq(i).text();
        if (headerCellText.indexOf(" ") !== -1) {
            headerCellText = $.trim(headerCellText.substr(0, headerCellText.indexOf(" ")));
        }
        cols.push(headerCellText);
    }
    return cols;
}());

/**
* builds a textinput+select+button filter that filters rows based on table column index
*/
function buildColumnFilter() {
    var i,
        menu = "<th width='99%' nowrap>";
    menu += "<input type='text' size='12' id='filterColumnValue'>";
    menu += "<select id='filterColumnIndex'>";
    for (i = 0; i < defaultColumnFilters.length; i++) {
        menu += "<option value='" + i + "'>" + defaultColumnFilters[i] + "</option>";
    }
    menu += "</select>";
    menu += "<input type='button' id='filterColumn' value='"
        + trans.sp.incomings.filterColumnButton + "'"
        + "'>";
    menu += "</th>";
    return menu;
}

menu += buildColumnFilter();

//menu += "<th width='97%' nowrap>";
//menu += "<input type=textbox size=3 id=defFilterContinentText maxlength=2><input type=button id=defFilterContinent value='" + trans.sp.commands.continentFilter + "'>";
//menu += "</th></tr>";


menu += "</table>";
overviewTable.before(menu);

$("#filterColumnIndex").change(function() {
    
});

// switch tooltips on reverse filter checkbox change
$("#defReverseFilter").change( function () {
    var isChecked = $(this).is(":checked"),
        overviewTrans = trans.sp.incomings;

    //$("#").attr("title", isChecked ? overviewTrans.continentFilterTooltip : overviewTrans.continentFilterTooltipReverse);

    $("#filterColumn").attr(
        "title",
        overviewTrans.filterColumnButtonTooltip.replace(
            "{type}",
            isChecked ? overviewTrans.filterColumnButtonTooltipHide : overviewTrans.filterColumnButtonTooltipShow));
}).change();


// select all checkbox
$("#select_all").replaceWith("<input type='checkbox' id='selectAll'>");
$("#selectAll").change(function() {
    var isChecked = $("#selectAll").is(":checked");
    $("tr", overviewTable).find(":checkbox").prop("checked", isChecked);
});