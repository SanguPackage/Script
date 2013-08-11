// build sangu menu
var menu = "";
menu += "<table width='100%' class=vis>";
menu += "<tr><th width='1%'>";
menu += "<input type=button id=sortIt value='" + trans.sp.incomings.dynamicGrouping + "'>";
menu += "</th><th width='1%' nowrap>";
menu += "<input type=checkbox id=sortShowTotalRow " + (user_data.command.sumRow ? "checked" : "") + "> " + trans.sp.incomings.summation + " ";
menu += "<input type=button id=sortQuick value='" + trans.sp.incomings.fastGrouping + "'>";
menu += "</th><th width='97%'>";
menu += "<input type=button id=filterAttack value='" + trans.sp.incomings.showNewIncomings + "'>";
menu += "</th><th width='1%' nowrap>";
menu += "<input type=button id=commandsImport value='" + trans.sp.incomings.commandsImport + "' title='" + trans.sp.incomings.commandsImportTooltip + "'>";
menu += "</th></tr>";
menu += "</table>";
overviewTable.before(menu);

$("#select_all").replaceWith("<input type='checkbox' id='selectAll'>");
$("#selectAll").change(function() {
    var isChecked = $("#selectAll").is(":checked");
    $("tr", overviewTable).find(":checkbox").prop("checked", isChecked);
});

// total row stuff
function showAmountOfAttacks(amountOfVillages, amountOfCommands) {
    if ($("#amountOfAttacks").size() == 0) {
        var pageSize = $("input[name='page_size']");
        pageSize.parent().prev().text(trans.sp.commands.totalVillagesAttack);
        pageSize = pageSize.val(amountOfVillages).parent().parent().parent();
        pageSize.append('<tr><th colspan=2 id="amountOfAttacks">' + trans.sp.incomings.amount + '</th><td>' + amountOfCommands + '</td></tr>');
    }
}