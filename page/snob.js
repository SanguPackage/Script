if (user_data.other.calculateSnob && !world_config.coins) {
	// Calculate for how many nobles/snobs we've got packages
    (function() {
        try {
            //var table = $("table.vis:eq(1)", content_value);
            var table = $("table.vis[width='100%']", content_value).first();
            var cost = $("td:eq(1)", table).html();
            cost = parseInt(cost.substr(0, cost.indexOf(" ")), 10);
            var stored = $("tr:eq(1) td:eq(1)", table).html();
            stored = parseInt(stored.substr(0, stored.indexOf(" ")), 10);
            var canProduce = 0;
            while (stored > cost) {
                stored -= cost;
                cost++;
                canProduce++;
            }

            var sumtable = $("table.main table.vis:last");
            assert(sumtable.length, "no snob sumtable");
            sumtable.append("<tr><th>" + trans.sp.snob.canProduce
                + "</th><td style='border: 1px solid black'><img src='/graphic/unit/unit_snob.png'><b>"
                + canProduce + "</b> " +
                "+ <img src='graphic/res.png'>"
                + stored + "</td></tr>");

        } catch (e) { handleException(e, "snob"); }
    }());
}