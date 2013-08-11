// Nice to haves when publishing a report
(function() {
    try {
        if (location.href.indexOf('published=1') == -1 && user_data.other.reportPublish != null) {
            $.each(user_data.other.reportPublish, function (i, v) { $("#" + v).prop("checked", true); });
        } else {
            $("h3~p:nth-child(4)").each(function () {
                var input = $("h3~p a")[0].href;
                if (input.indexOf("?t=") != -1) {
                    input = input.substr(0, input.indexOf("?"));
                }
                $(this).append('<br><input type="text" size="75" onclick="this.select(); this.focus()" value="[url]' + input + '[/url]" />');
                input = input.substr(input.lastIndexOf('/') + 1);
                $(this).append('<br><input type="text" size="75" onclick="this.select(); this.focus()" value="[report_display]' + input + '[/report_display]" />');
                $(this).append('<br><input type="text" size="75" onclick="this.select(); this.focus()" value="[report]' + input + '[/report]" />');
            });
        }
    } catch (e) { handleException(e, "report"); }
}());
