var menu = "<table class='vis' width='100%'>";
menu += "<tr><th width='1%' nowrap>";
menu += "<input type=button id=defTotals value='" + trans.sp.defOverview.stackButton + "' title='" + trans.sp.defOverview.stackTooltip + "'>";
menu += "<input type=button id=defHideEmpty value='" + trans.sp.defOverview.filterNoSupport + "' title='" + trans.sp.defOverview.filterNoSupportTooltip + "'> ";

menu += "</th><th width='96%' nowrap>";
menu += "<input type=button id=attackFilter value='" + trans.sp.defOverview.filterUnderAttack + "'>";
if (!isSupport) {
    menu += "&nbsp; <input type=button id=defFilterBarbarian value='" + trans.sp.defOverview.barbarianFilter + "' title='" + trans.sp.defOverview.barbarianFilterTooltip + "'>";
} else {
    menu += "</th><th width='1%' nowrap>";
    menu += "<input type=text size=8 id=defFilterTotalPopValue value='" + user_data.restack.defaultPopulationFilterAmount + "'>";
    menu += "<select id=defFilterTotalPopComparer>";
    menu += "<option value=-1>" + trans.sp.all.less + "</option><option value=1 selected>" + trans.sp.all.more + "</option></select>";
    menu += "<input type=button id=defFilterTotalPop value='" + trans.sp.defOverview.stackFilter + "' title='" + trans.sp.defOverview.stackFilterTooltip + "'>";

    menu += "</th><th width='1%' nowrap>";
    menu += trans.sp.defOverview.village + " <input type=text size=5 id=defFilterDistVillage value=''>";
    menu += "<select id=defFilterDistType>";
    menu += "<option value=1 selected>" + trans.sp.all.closer + "</option><option value=-1>" + trans.sp.all.further + "</option></select>";
    // TODO: untranslated F(ields)
    menu += "&nbsp;F <input type=text size=3 id=defFilterDistanceValue value=" + user_data.restack.fieldsDistanceFilterDefault + ">";
    menu += "<input type=button id=defFilterDist value='" + trans.sp.defOverview.distFilter + "' title='" + trans.sp.defOverview.distFilterTooltip + "'>";

    menu += "</th><th width='1%' nowrap>";
    menu += " <input type=text size=8 id=defRestackTo value=" + user_data.restack.to + "> <input type=button id=defRestack value='" + trans.sp.defOverview.stackBBCodes + "' title='" + trans.sp.defOverview.stackBBCodesTooltip + "'>";
    //menu += "</th></tr></table>";
}

menu += "</th></tr></table>";
menu += "<table class='vis' width='100%'><tr><th width='1%' nowrap>";
menu += isSupport ? trans.sp.defOverview.extraFiltersSupport : trans.sp.defOverview.extraFiltersDefense;

menu += "</th><th width='1%' nowrap>";
menu += "<input type=checkbox id=defReverseFilter title='" + trans.sp.defOverview.extraFiltersReverse + "'" + (user_data.restack.filterReverse ? " checked" : "") + "> " + trans.sp.defOverview.extraFiltersInfo;

menu += "</th><th width='1%' nowrap>";
menu += "<input type=text size=3 id=defFilterDistanceValue value=" + user_data.restack.fieldsDistanceFilterDefault + "> <input type=button id=defFilterDistance value='" + trans.sp.defOverview.distFilter2 + "'>";

menu += "</th><th width='1%' nowrap>";
menu += "&nbsp; <span style='background-color: #ecd19a; border: 1px solid black' id='unitFilterBox'>";
menu += "&nbsp; <img src='graphic/unit/unit_snob.png' id=filtersnob>&nbsp; <img src='graphic/unit/unit_spy.png' id=filterspy>";
menu += "&nbsp; <img src='graphic/buildings/barracks.png' id=filterAttack>&nbsp;<img src='graphic/unit/def.png' id=filterDefense>&nbsp;<img id=filterSupport src='graphic/command/support.png'>&nbsp;";
menu += "</span>&nbsp;&nbsp;";

menu += "</th><th width='96%' nowrap>";
menu += "<input type=text size=12 id=defFilterTextValue value=''>";
menu += "<input type=button id=defFilterText value='" + trans.sp.defOverview.freeTextFilter + "'>";
menu += "</th></tr></table>";

overviewTable.before(menu);

$("#defReverseFilter").change(function () {
    var isChecked = $(this).is(":checked");
    var defTrans = trans.sp.defOverview;
    $("#unitFilterBox").find("img:eq(0)").attr("title", isChecked ? defTrans.nobleFilter : defTrans.nobleFilterRev);
    $("#unitFilterBox").find("img:eq(1)").attr("title", isChecked ? defTrans.spyFilter : defTrans.spyFilterRev);
    $("#unitFilterBox").find("img:eq(2)").attr("title", isChecked ? defTrans.attackFilter : defTrans.attackFilterRev);
    $("#unitFilterBox").find("img:eq(3)").attr("title", isChecked ? defTrans.supportFilter : defTrans.supportFilterRev);

    $("#unitFilterBox").find("img:eq(4)").attr("title", (isSupport ? defTrans.otherPlayerFilterFrom : defTrans.otherPlayerFilterTo).replace("{action}", isChecked ? defTrans.otherPlayerFilterShow : defTrans.otherPlayerFilterHide));
    $("#defFilterText").attr("title", defTrans.freeTextFilterTooltip.replace("{villageType}", isSupport ? defTrans.filterTooltipVillageTypeSupporting : defTrans.filterTooltipVillageTypeSupported).replace("{filterType}", isChecked ? defTrans.freeTextFilterTooltipFilterTypeWith : defTrans.freeTextFilterTooltipFilterTypeWithout));
    $("#defFilterDistance").attr("title", defTrans.distanceFilterTooltip.replace("{villageType}", isSupport ? defTrans.filterTooltipVillageTypeSupporting : defTrans.filterTooltipVillageTypeSupported).replace("{filterType}", !isChecked ? defTrans.distanceFilterTooltipFilterTypeCloser : defTrans.distanceFilterTooltipFilterTypeFurther));
});
$("#defReverseFilter").change();