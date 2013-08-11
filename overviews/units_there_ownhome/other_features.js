// One time help display
(function() {
    if ($("#targetVillageButton").length === 0) {
        // group without villages
        return;
    }

    var position = $("#targetVillageButton").position(),
        options = {
            left: position.left - 300,
            top: position.top + 35
        },
        content = {
            title: trans.sp.troopOverview.helpTitle,
            body: trans.sp.troopOverview.help.replace("{unitIcon}", "<img src='graphic/unit/unit_ram.png'>, <img src='graphic/unit/unit_spear.png'>, ...")
        };

    createFixedTooltip("troopOverviewTooltip", content, options);
}());

// Calculate stack
$("#calculateStack").click(function () {
    trackClickEvent("CalculateStack");
    if (!this.disabled) {
        this.disabled = true;
        $("#units_table").find(overviewMenuRowFilter).each(function () {
            var total = 0;
            $("td:gt(1)", this).each(function (i) {
                if (!($.trim(this.innerHTML) == '' || this.innerHTML == '&nbsp;' || i >= world_data.unitsPositionSize.length)) {
                    total += this.innerHTML * world_data.unitsPositionSize[i];
                }
            });
            $("td:eq(1)", this).text(formatNumber(total)).css("background-color", getStackColor(total));
        });
    }
});