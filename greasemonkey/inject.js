(function (func) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    if (window.mozInnerScreenX !== undefined) {
        // Firefox has troubles with renaming commands, villages, ... (it works some of the time)
        // But waiting for document.ready slows down the script so only wait for this on FF
        // An optimization could be to put document.readys only around those blocks that are
        // problematic.
        script.textContent = '$(document).ready(' + func + ');';

    } else {
        script.textContent = '(' + func + ')();';
    }

    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}(sangu_ready));


