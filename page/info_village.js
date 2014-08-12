//Written by hardcode
function hide_incommings(){
    var show = true;
    var head = $(".vis:contains('Aankomend')");
    var text = $("th:contains('Aankomst:')").attr("id","text");

    head.on("click", function () {
        if(show === true) {
            $(".no_ignored_command").hide();
            text.html("Hidden");
            show = false;
        }else{
            $(".no_ignored_command").show();
            text.html("Aankomend:");
            show = true;
        }
    });
}