(function() {
    // Check current version with version on the sangu.be site
    var lastVersion = $("#sanguPackageVersion"),
        resultBox = $("#versionCheckResult");

    if (lastVersion.length === 1) {
        resultBox.show();
        resultBox.css("padding", "20px");
        resultBox.css("margin", "10px");
        resultBox.css("font-size", 18);
        resultBox.css("height", 30);
        resultBox.css("text-align", "center");

        if ('//<!--@@INCLUDE "version.txt" INDENT=0 //-->'.indexOf(lastVersion.text()) === 0) {
            resultBox.css("background-color", "green");
            resultBox.text("Je hebt de laatste versie!");
        } else {
            resultBox.css("background-color", "red");
            resultBox.text("Er is een nieuwe versie beschikbaar!");
        }
    }
}());