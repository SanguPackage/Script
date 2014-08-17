//Written by hardcode
(function() {
    var show = true;
    var head = $(".vis:contains('Aankomend')");
    var text = $("th:contains('Aankomst:')").attr({id:"text"}).html('Aankomend: <img src="http://nlp1.tribalwars.nl/graphic/minus.png" style=" float: right;">');

    head.on("click", function () {
        if(show === true) {
            $(".no_ignored_command").hide();
            text.html('Hidden <img src="http://nlp1.tribalwars.nl/graphic/plus.png" style=" float: right;">');
            show = false;
        }else{
            $(".no_ignored_command").show();
            text.html('Aankomend: <img src="http://nlp1.tribalwars.nl/graphic/minus.png" style=" float: right;">');
            show = true;
        }
    });
}());